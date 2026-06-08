import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import React from 'react';
import RegisterForm from './RegisterForm';

// Mock next/navigation
const mockPush = vi.fn();
vi.mock('next/navigation', () => ({
  useRouter: () => ({
    push: mockPush,
  }),
}));

// Mock RegistrationService
vi.mock('../lib/services/RegistrationService', () => ({
  RegistrationService: {
    register: vi.fn(),
  },
}));

import { RegistrationService } from '../lib/services/RegistrationService';

// Helper: fill form with valid data
const fillValidForm = () => {
  fireEvent.change(screen.getByLabelText(/Nombres y Apellidos/i), {
    target: { value: 'Ana García' },
  });
  fireEvent.change(screen.getByLabelText(/Correo Electrónico/i), {
    target: { value: 'ana@ejemplo.com' },
  });
  fireEvent.change(screen.getByLabelText(/^Contraseña$/i), {
    target: { value: 'password123' },
  });
  fireEvent.change(screen.getByLabelText(/Confirmar Contraseña/i), {
    target: { value: 'password123' },
  });
  fireEvent.click(screen.getByLabelText(/Acepto los términos/i));
};

describe('RegisterForm', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    mockPush.mockClear();
  });

  // ─── Real-time validation ───────────────────────────────────────────────────

  describe('Real-time validation', () => {
    it('should show "Formato de correo inválido" for invalid email', async () => {
      render(<RegisterForm />);
      fireEvent.change(screen.getByLabelText(/Correo Electrónico/i), {
        target: { value: 'correo-invalido' },
      });
      await waitFor(() => {
        expect(screen.getByText('Formato de correo inválido')).toBeInTheDocument();
      });
    });

    it('should show "La contraseña debe tener al menos 8 caracteres" for short password', async () => {
      render(<RegisterForm />);
      fireEvent.change(screen.getByLabelText(/^Contraseña$/i), {
        target: { value: 'corta' },
      });
      await waitFor(() => {
        expect(
          screen.getByText('La contraseña debe tener al menos 8 caracteres')
        ).toBeInTheDocument();
      });
    });

    it('should show "Las contraseñas no coinciden" when confirmPassword differs', async () => {
      render(<RegisterForm />);
      fireEvent.change(screen.getByLabelText(/^Contraseña$/i), {
        target: { value: 'password123' },
      });
      fireEvent.change(screen.getByLabelText(/Confirmar Contraseña/i), {
        target: { value: 'diferente99' },
      });
      await waitFor(() => {
        expect(screen.getByText('Las contraseñas no coinciden')).toBeInTheDocument();
      });
    });

    it('should show trim error for email with leading space', async () => {
      render(<RegisterForm />);
      fireEvent.change(screen.getByLabelText(/Correo Electrónico/i), {
        target: { value: ' ana@ejemplo.com' },
      });
      await waitFor(() => {
        expect(
          screen.getByText('Hay espacios al inicio o al final. Por favor corrígelo.')
        ).toBeInTheDocument();
      });
    });
  });

  // ─── Submit with empty fields ───────────────────────────────────────────────

  describe('Submit with empty fields', () => {
    it('should show "Este campo es obligatorio" for all empty fields on submit', async () => {
      render(<RegisterForm />);
      const form = document.querySelector('form')!;
      fireEvent.submit(form);
      await waitFor(() => {
        const errors = screen.getAllByText('Este campo es obligatorio');
        expect(errors.length).toBeGreaterThanOrEqual(4);
      });
    });
  });

  // ─── Submit without checkbox ────────────────────────────────────────────────

  describe('Submit without accepting terms', () => {
    it('should show "Debes aceptar los términos y condiciones" when terms not accepted', async () => {
      render(<RegisterForm />);
      // Fill all fields except terms
      fireEvent.change(screen.getByLabelText(/Nombres y Apellidos/i), {
        target: { value: 'Ana García' },
      });
      fireEvent.change(screen.getByLabelText(/Correo Electrónico/i), {
        target: { value: 'ana@ejemplo.com' },
      });
      fireEvent.change(screen.getByLabelText(/^Contraseña$/i), {
        target: { value: 'password123' },
      });
      fireEvent.change(screen.getByLabelText(/Confirmar Contraseña/i), {
        target: { value: 'password123' },
      });
      // Do NOT check terms
      fireEvent.click(screen.getByRole('button', { name: /Crear Cuenta/i }));
      await waitFor(() => {
        expect(
          screen.getByText('Debes aceptar los términos y condiciones')
        ).toBeInTheDocument();
      });
    });
  });

  // ─── Loading state ──────────────────────────────────────────────────────────

  describe('Loading state', () => {
    it('should show "Creando cuenta..." and disable button during submit', async () => {
      let resolveRegister: (v: boolean) => void;
      (RegistrationService.register as ReturnType<typeof vi.fn>).mockImplementation(
        () => new Promise((resolve) => { resolveRegister = resolve; })
      );

      render(<RegisterForm />);
      fillValidForm();

      const submitBtn = screen.getByRole('button', { name: /Crear Cuenta/i });
      fireEvent.click(submitBtn);

      await waitFor(() => {
        expect(screen.getByRole('button', { name: /Creando cuenta/i })).toBeDisabled();
      });

      // Resolve to avoid unhandled promise
      resolveRegister!(true);
    });
  });

  // ─── Successful flow ────────────────────────────────────────────────────────

  describe('Successful registration flow', () => {
    it('should call router.push with /login?registered=true on success', async () => {
      (RegistrationService.register as ReturnType<typeof vi.fn>).mockResolvedValue(true);

      render(<RegisterForm />);
      fillValidForm();

      fireEvent.click(screen.getByRole('button', { name: /Crear Cuenta/i }));

      await waitFor(() => {
        expect(mockPush).toHaveBeenCalledWith('/login?registered=true');
      }, { timeout: 2000 });
    });
  });

  // ─── Service error ──────────────────────────────────────────────────────────

  describe('Service error', () => {
    it('should show error message when service returns false', async () => {
      (RegistrationService.register as ReturnType<typeof vi.fn>).mockResolvedValue(false);

      render(<RegisterForm />);
      fillValidForm();

      fireEvent.click(screen.getByRole('button', { name: /Crear Cuenta/i }));

      await waitFor(() => {
        expect(
          screen.getByText('Ocurrió un error al crear la cuenta. Intenta de nuevo.')
        ).toBeInTheDocument();
      }, { timeout: 2000 });
    });
  });

  // ─── Navigation link ────────────────────────────────────────────────────────

  describe('Navigation', () => {
    it('should render link "¿Ya tienes una cuenta? Inicia Sesión" pointing to /login', () => {
      render(<RegisterForm />);
      const link = screen.getByRole('link', { name: /Inicia Sesión/i });
      expect(link).toBeInTheDocument();
      expect(link).toHaveAttribute('href', '/login');
    });
  });
});
