import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import RegistroForm from './RegistroForm';
import React from 'react';

const mockPush = vi.fn();
vi.mock('next/navigation', () => ({
  useRouter: () => ({ push: mockPush }),
}));

vi.mock('../lib/services/AuthService', () => ({
  AuthService: {
    register: vi.fn(),
  },
}));

import { AuthService } from '../lib/services/AuthService';

describe('RegistroForm', () => {
  it('should render all 4 fields and the submit button', () => {
    render(<RegistroForm />);
    expect(screen.getByLabelText(/Nombre completo/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Correo electrónico/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/^Contraseña/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Confirmar contraseña/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /Crear cuenta/i })).toBeInTheDocument();
  });

  it('should render "¿Ya tenés cuenta? Iniciá sesión" link pointing to /', () => {
    render(<RegistroForm />);
    const link = screen.getByRole('link', { name: /Iniciá sesión/i });
    expect(link).toBeInTheDocument();
    expect(link).toHaveAttribute('href', '/');
  });

  it('should show error for invalid full name on blur', async () => {
    render(<RegistroForm />);
    const input = screen.getByLabelText(/Nombre completo/i);
    fireEvent.change(input, { target: { value: 'Juan' } });
    fireEvent.blur(input);
    await waitFor(() => {
      expect(screen.getByText(/Ingresá tu nombre y apellido/i)).toBeInTheDocument();
    });
  });

  it('should show error for invalid email on blur', async () => {
    render(<RegistroForm />);
    const input = screen.getByLabelText(/Correo electrónico/i);
    fireEvent.change(input, { target: { value: 'no-es-email' } });
    fireEvent.blur(input);
    await waitFor(() => {
      expect(screen.getByText(/Ingresá un correo electrónico válido/i)).toBeInTheDocument();
    });
  });

  it('should show error for password shorter than 8 chars on blur', async () => {
    render(<RegistroForm />);
    const input = screen.getByLabelText(/^Contraseña/i);
    fireEvent.change(input, { target: { value: 'corta' } });
    fireEvent.blur(input);
    await waitFor(() => {
      expect(screen.getByText(/al menos 8 caracteres/i)).toBeInTheDocument();
    });
  });

  it('should show error when passwords do not match on blur', async () => {
    render(<RegistroForm />);
    const pass = screen.getByLabelText(/^Contraseña/i);
    const confirm = screen.getByLabelText(/Confirmar contraseña/i);
    fireEvent.change(pass, { target: { value: 'password123' } });
    fireEvent.change(confirm, { target: { value: 'diferente' } });
    fireEvent.blur(confirm);
    await waitFor(() => {
      expect(screen.getByText(/Las contraseñas no coinciden/i)).toBeInTheDocument();
    });
  });

  it('should render terms checkbox and link', () => {
    render(<RegistroForm />);
    expect(screen.getByRole('checkbox')).toBeInTheDocument();
    expect(screen.getByText(/Acepto los/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /términos y condiciones/i })).toBeInTheDocument();
  });

  it('should disable submit button when terms not accepted', () => {
    render(<RegistroForm />);
    expect(screen.getByRole('button', { name: /Crear cuenta/i })).toBeDisabled();
  });

  it('should enable submit button when terms are accepted', () => {
    render(<RegistroForm />);
    fireEvent.click(screen.getByRole('checkbox'));
    expect(screen.getByRole('button', { name: /Crear cuenta/i })).not.toBeDisabled();
  });

  it('should open terms modal when clicking the link', () => {
    render(<RegistroForm />);
    fireEvent.click(screen.getByRole('button', { name: /términos y condiciones/i }));
    expect(screen.getByRole('dialog')).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: /Términos y Condiciones/i })).toBeInTheDocument();
  });

  it('should close terms modal when clicking the close button', () => {
    render(<RegistroForm />);
    fireEvent.click(screen.getByRole('button', { name: /términos y condiciones/i }));
    fireEvent.click(screen.getByRole('button', { name: 'Cerrar' }));
    expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
  });

  it('should show success message and redirect to / on successful registration', async () => {
    (AuthService.register as ReturnType<typeof vi.fn>).mockResolvedValueOnce({ Exitoso: true });
    render(<RegistroForm />);

    fireEvent.change(screen.getByLabelText(/Nombre completo/i), { target: { value: 'Juan Perez' } });
    fireEvent.change(screen.getByLabelText(/Correo electrónico/i), { target: { value: 'nuevo@ejemplo.com' } });
    fireEvent.change(screen.getByLabelText(/^Contraseña/i), { target: { value: 'password123' } });
    fireEvent.change(screen.getByLabelText(/Confirmar contraseña/i), { target: { value: 'password123' } });
    fireEvent.click(screen.getByRole('checkbox'));
    fireEvent.click(screen.getByRole('button', { name: /Crear cuenta/i }));

    await waitFor(() => {
      expect(screen.getByText(/¡Cuenta creada!/i)).toBeInTheDocument();
      expect(screen.getByText(/Tu cuenta fue creada exitosamente/i)).toBeInTheDocument();
    }, { timeout: 2000 });
  });

  it('should show general error when email is already registered', async () => {
    (AuthService.register as ReturnType<typeof vi.fn>).mockResolvedValueOnce({
      Exitoso: false,
      MensajeError: 'El correo ya está registrado. Intentá con otro.',
    });
    render(<RegistroForm />);

    fireEvent.change(screen.getByLabelText(/Nombre completo/i), { target: { value: 'Juan Perez' } });
    fireEvent.change(screen.getByLabelText(/Correo electrónico/i), { target: { value: 'tucorreo@ejemplo.com' } });
    fireEvent.change(screen.getByLabelText(/^Contraseña/i), { target: { value: 'password123' } });
    fireEvent.change(screen.getByLabelText(/Confirmar contraseña/i), { target: { value: 'password123' } });
    fireEvent.click(screen.getByRole('checkbox'));
    fireEvent.click(screen.getByRole('button', { name: /Crear cuenta/i }));

    await waitFor(() => {
      expect(screen.getByText(/El correo ya está registrado/i)).toBeInTheDocument();
    });
  });
});
