import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { RegisterForm } from './RegisterForm';
import { AuthService } from '@/lib/services/AuthService';
import { useRouter } from 'next/navigation';

// Mock next/navigation
vi.mock('next/navigation', () => ({
  useRouter: vi.fn(),
}));

// Mock AuthService module - mirrors the named export structure
vi.mock('@/lib/services/AuthService', () => ({
  AuthService: {
    register: vi.fn(),
  },
}));

describe('RegisterForm Component', () => {
  const mockPush = vi.fn();

  beforeEach(() => {
    vi.clearAllMocks();
    (useRouter as any).mockReturnValue({
      push: mockPush,
    });
  });

  describe('T021: Initial Render', () => {
    it('should render initial RegisterForm with title "Crea tu cuenta" and all fields', () => {
      render(<RegisterForm />);
      
      expect(screen.getByText('Crea tu cuenta')).toBeInTheDocument();
      expect(screen.getByText(/Completa tus datos para comenzar/)).toBeInTheDocument();
      
      // Check for all input labels
      expect(screen.getByLabelText(/Nombre Completo/)).toBeInTheDocument();
      expect(screen.getByLabelText(/Correo Electrónico/)).toBeInTheDocument();
      expect(screen.getByLabelText('Contraseña')).toBeInTheDocument();
      expect(screen.getByLabelText('Confirmar Contraseña')).toBeInTheDocument();
      
      // Check for terms checkbox
      expect(screen.getByRole('checkbox', { name: /Acepto los términos/ })).toBeInTheDocument();
      
      // Check for submit button
      expect(screen.getByRole('button', { name: /Crear cuenta/ })).toBeInTheDocument();
    });
  });

  describe('T022: Submit with valid data', () => {
    it('should call AuthService.register() and redirect to /login?registered=true on success', async () => {
      vi.mocked(AuthService.register).mockResolvedValue({ success: true });

      render(<RegisterForm />);

      // Fill form with valid data
      fireEvent.change(screen.getByLabelText(/Nombre Completo/), {
        target: { value: 'Ana García' },
      });
      fireEvent.change(screen.getByLabelText(/Correo Electrónico/), {
        target: { value: 'ana@test.com' },
      });
      fireEvent.change(screen.getByLabelText('Contraseña'), {
        target: { value: 'mipassword123' },
      });
      fireEvent.change(screen.getByLabelText('Confirmar Contraseña'), {
        target: { value: 'mipassword123' },
      });

      // Check the T&C checkbox
      const checkbox = screen.getByRole('checkbox', { name: /Acepto los términos/ });
      fireEvent.click(checkbox);

      // Submit form
      const submitButton = screen.getByRole('button', { name: /Crear cuenta/ });
      fireEvent.click(submitButton);

      await waitFor(() => {
        expect(AuthService.register).toHaveBeenCalledWith({
          FullName: 'Ana García',
          Email: 'ana@test.com',
          Password: 'mipassword123',
          ConfirmPassword: 'mipassword123',
        });
      });

      await waitFor(() => {
        expect(mockPush).toHaveBeenCalledWith('/login?registered=true');
      });
    });
  });

  describe('T031: Full Name Validation (US2)', () => {
    it('should show error "El nombre completo es requerido" when fullName is empty', async () => {
      render(<RegisterForm />);

      const submitButton = screen.getByRole('button', { name: /Crear cuenta/ });
      fireEvent.click(submitButton);

      await waitFor(() => {
        expect(screen.getByText(/El nombre completo es requerido/)).toBeInTheDocument();
      });
    });

    it('should show error "Ingresa tu nombre y apellido" when fullName has only one word', async () => {
      render(<RegisterForm />);

      fireEvent.change(screen.getByLabelText(/Nombre Completo/), {
        target: { value: 'Ana' },
      });

      const submitButton = screen.getByRole('button', { name: /Crear cuenta/ });
      fireEvent.click(submitButton);

      await waitFor(() => {
        expect(screen.getByText(/Ingresa tu nombre y apellido/)).toBeInTheDocument();
      });
    });
  });

  describe('T032: Email Validation (US2)', () => {
    it('should show error "El correo electrónico es requerido" when email is empty', async () => {
      render(<RegisterForm />);

      const submitButton = screen.getByRole('button', { name: /Crear cuenta/ });
      fireEvent.click(submitButton);

      await waitFor(() => {
        expect(screen.getByText(/El correo electrónico es requerido/)).toBeInTheDocument();
      });
    });

    it('should show error "Correo electrónico inválido" when email format is invalid', async () => {
      render(<RegisterForm />);

      fireEvent.change(screen.getByLabelText(/Correo Electrónico/), {
        target: { value: 'abc' },
      });

      const submitButton = screen.getByRole('button', { name: /Crear cuenta/ });
      fireEvent.click(submitButton);

      await waitFor(() => {
        expect(screen.getByText(/Correo electrónico inválido/)).toBeInTheDocument();
      });
    });
  });

  describe('T033: Password Validation (US2)', () => {
    it('should show error "La contraseña es requerida" when password is empty', async () => {
      render(<RegisterForm />);

      const submitButton = screen.getByRole('button', { name: /Crear cuenta/ });
      fireEvent.click(submitButton);

      await waitFor(() => {
        expect(screen.getByText(/La contraseña es requerida/)).toBeInTheDocument();
      });
    });

    it('should show error "La contraseña debe tener al menos 8 caracteres" when password < 8', async () => {
      render(<RegisterForm />);

      fireEvent.change(screen.getByLabelText('Contraseña'), {
        target: { value: 'short' },
      });

      const submitButton = screen.getByRole('button', { name: /Crear cuenta/ });
      fireEvent.click(submitButton);

      await waitFor(() => {
        expect(screen.getByText(/La contraseña debe tener al menos 8 caracteres/)).toBeInTheDocument();
      });
    });
  });

  describe('T034: Password Confirmation Validation (US3)', () => {
    it('should show error "Debes confirmar tu contraseña" when confirmPassword is empty', async () => {
      render(<RegisterForm />);

      const submitButton = screen.getByRole('button', { name: /Crear cuenta/ });
      fireEvent.click(submitButton);

      await waitFor(() => {
        expect(screen.getByText(/Debes confirmar tu contraseña/)).toBeInTheDocument();
      });
    });

    it('should show error "Las contraseñas no coinciden" when passwords don\'t match', async () => {
      render(<RegisterForm />);

      fireEvent.change(screen.getByLabelText('Contraseña'), {
        target: { value: 'mipassword123' },
      });
      fireEvent.change(screen.getByLabelText('Confirmar Contraseña'), {
        target: { value: 'mipassword124' },
      });

      const submitButton = screen.getByRole('button', { name: /Crear cuenta/ });
      fireEvent.click(submitButton);

      await waitFor(() => {
        expect(screen.getByText(/Las contraseñas no coinciden/)).toBeInTheDocument();
      });
    });
  });

  describe('T035: Terms & Conditions Validation (US4)', () => {
    it('should show error "Debes aceptar los términos y condiciones" when T&C is unchecked', async () => {
      render(<RegisterForm />);

      // Fill form with valid data but don't check T&C
      fireEvent.change(screen.getByLabelText(/Nombre Completo/), {
        target: { value: 'Ana García' },
      });
      fireEvent.change(screen.getByLabelText(/Correo Electrónico/), {
        target: { value: 'ana@test.com' },
      });
      fireEvent.change(screen.getByLabelText('Contraseña'), {
        target: { value: 'mipassword123' },
      });
      fireEvent.change(screen.getByLabelText('Confirmar Contraseña'), {
        target: { value: 'mipassword123' },
      });

      const submitButton = screen.getByRole('button', { name: /Crear cuenta/ });
      fireEvent.click(submitButton);

      await waitFor(() => {
        expect(screen.getByText(/Debes aceptar los términos y condiciones/)).toBeInTheDocument();
      });
    });

    it('should not show T&C error when checkbox is checked', async () => {
      render(<RegisterForm />);

      const checkbox = screen.getByRole('checkbox', { name: /Acepto los términos/ });
      fireEvent.click(checkbox);

      // The component should not show the T&C error
      expect(screen.queryByText(/Debes aceptar los términos y condiciones/)).not.toBeInTheDocument();
    });
  });

  describe('T044: Social Login Buttons (US5)', () => {
    it('should call window.alert with "Próximamente" when Google button is clicked', () => {
      const alertSpy = vi.spyOn(window, 'alert').mockImplementation(() => {});
      render(<RegisterForm />);

      const googleButton = screen.getByRole('button', { name: /Google/i });
      fireEvent.click(googleButton);

      expect(alertSpy).toHaveBeenCalledWith(expect.stringContaining('Próximamente'));
      alertSpy.mockRestore();
    });

    it('should call window.alert with "Próximamente" when Apple button is clicked', () => {
      const alertSpy = vi.spyOn(window, 'alert').mockImplementation(() => {});
      render(<RegisterForm />);

      const appleButton = screen.getByRole('button', { name: /Apple/i });
      fireEvent.click(appleButton);

      expect(alertSpy).toHaveBeenCalledWith(expect.stringContaining('Próximamente'));
      alertSpy.mockRestore();
    });
  });

  describe('T045: Navigation Link (US6)', () => {
    it('should render "Inicia sesión" link with href="/login"', () => {
      render(<RegisterForm />);

      const link = screen.getByRole('link', { name: /Inicia sesión/i });
      expect(link).toHaveAttribute('href', '/login');
    });
  });
});

