import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import { afterEach, describe, expect, it, vi } from 'vitest';
import RegistrationForm from './RegistrationForm';
import React from 'react';
import { RegistrationService } from '@/lib/services/RegistrationService';

const MockPush = vi.fn();

vi.mock('next/navigation', () => ({
  useRouter: () => ({
    push: MockPush,
  }),
}));

vi.mock('@/lib/services/RegistrationService', () => ({
  RegistrationService: {
    Register: vi.fn(),
  },
  MapApiErrorsToFormErrors: (errors: Record<string, string>) => ({
    FullName: errors?.fullName,
    Email: errors?.email,
    Password: errors?.password,
    ConfirmPassword: errors?.confirmPassword,
    AcceptTerms: errors?.acceptTerms,
    General: errors?.general,
  }),
}));

describe('RegistrationForm', () => {
  afterEach(() => {
    vi.clearAllMocks();
  });

  it('renders required fields', () => {
    render(<RegistrationForm />);

    expect(screen.getByLabelText(/Nombre completo/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Correo electrónico/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/^Contraseña$/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Confirmar contraseña/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /Crear cuenta/i })).toBeInTheDocument();
  });

  it('shows inline email validation error', async () => {
    render(<RegistrationForm />);

    fireEvent.change(screen.getByLabelText(/Correo electrónico/i), {
      target: { value: 'correo-invalido' },
    });

    await waitFor(() => {
      expect(screen.getByText(/Correo electrónico inválido/i)).toBeInTheDocument();
    });
  });

  it('shows required error for full name when blank spaces are entered', async () => {
    render(<RegistrationForm />);

    fireEvent.change(screen.getByLabelText(/Nombre completo/i), {
      target: { value: '   ' },
    });

    await waitFor(() => {
      expect(screen.getByText(/El nombre completo es obligatorio/i)).toBeInTheDocument();
    });
  });

  it('shows mismatch error when confirm password is different', async () => {
    render(<RegistrationForm />);

    fireEvent.change(screen.getByLabelText(/^Contraseña$/i), {
      target: { value: '12345678' },
    });
    fireEvent.change(screen.getByLabelText(/Confirmar contraseña/i), {
      target: { value: '87654321' },
    });

    await waitFor(() => {
      expect(screen.getByText(/Las contraseñas no coinciden/i)).toBeInTheDocument();
    });
  });

  it('disables submit button when there are validation errors', async () => {
    render(<RegistrationForm />);

    const SubmitButton = screen.getByRole('button', { name: /Crear cuenta/i });

    fireEvent.change(screen.getByLabelText(/Correo electrónico/i), {
      target: { value: 'correo-invalido' },
    });

    await waitFor(() => {
      expect(SubmitButton).toBeDisabled();
    });
  });

  it('redirects to /login?registered=true on successful register', async () => {
    vi.mocked(RegistrationService.Register).mockResolvedValue({
      success: true,
      message: 'Registro exitoso',
      data: {
        userId: 'usr_001',
        email: 'diego@ejemplo.com',
        redirectTo: '/login?registered=true',
      },
    });

    render(<RegistrationForm />);

    fireEvent.change(screen.getByLabelText(/Nombre completo/i), {
      target: { value: 'Diego Martinez' },
    });
    fireEvent.change(screen.getByLabelText(/Correo electrónico/i), {
      target: { value: 'diego@ejemplo.com' },
    });
    fireEvent.change(screen.getByLabelText(/^Contraseña$/i), {
      target: { value: '12345678' },
    });
    fireEvent.change(screen.getByLabelText(/Confirmar contraseña/i), {
      target: { value: '12345678' },
    });
    fireEvent.click(screen.getByLabelText(/Acepto los/i));

    fireEvent.click(screen.getByRole('button', { name: /Crear cuenta/i }));

    await waitFor(() => {
      expect(MockPush).toHaveBeenCalledWith('/login?registered=true');
    });
  });

  it('shows terms error when user submits without accepting terms', async () => {
    vi.mocked(RegistrationService.Register).mockResolvedValue({
      success: true,
      message: 'Registro exitoso',
      data: {
        userId: 'usr_001',
        email: 'diego@ejemplo.com',
        redirectTo: '/login?registered=true',
      },
    });

    render(<RegistrationForm />);

    fireEvent.change(screen.getByLabelText(/Nombre completo/i), {
      target: { value: 'Diego Martinez' },
    });
    fireEvent.change(screen.getByLabelText(/Correo electrónico/i), {
      target: { value: 'diego@ejemplo.com' },
    });
    fireEvent.change(screen.getByLabelText(/^Contraseña$/i), {
      target: { value: '12345678' },
    });
    fireEvent.change(screen.getByLabelText(/Confirmar contraseña/i), {
      target: { value: '12345678' },
    });

    fireEvent.click(screen.getByRole('button', { name: /Crear cuenta/i }));

    await waitFor(() => {
      expect(screen.getByText(/Debes aceptar los términos y condiciones/i)).toBeInTheDocument();
    });
    expect(RegistrationService.Register).not.toHaveBeenCalled();
  });

  it('renders duplicate email message when service returns EMAIL_ALREADY_REGISTERED', async () => {
    vi.mocked(RegistrationService.Register).mockResolvedValue({
      success: false,
      message: 'Este correo ya está registrado',
      code: 'EMAIL_ALREADY_REGISTERED',
    });

    render(<RegistrationForm />);

    fireEvent.change(screen.getByLabelText(/Nombre completo/i), {
      target: { value: 'Diego Martinez' },
    });
    fireEvent.change(screen.getByLabelText(/Correo electrónico/i), {
      target: { value: 'diego@ejemplo.com' },
    });
    fireEvent.change(screen.getByLabelText(/^Contraseña$/i), {
      target: { value: '12345678' },
    });
    fireEvent.change(screen.getByLabelText(/Confirmar contraseña/i), {
      target: { value: '12345678' },
    });
    fireEvent.click(screen.getByLabelText(/Acepto los/i));
    fireEvent.click(screen.getByRole('button', { name: /Crear cuenta/i }));

    await waitFor(() => {
      expect(screen.getByText(/Este correo ya está registrado/i)).toBeInTheDocument();
    });
  });

  it('renders mapped field errors when service returns errors payload', async () => {
    vi.mocked(RegistrationService.Register).mockResolvedValue({
      success: false,
      message: 'Error de validación',
      code: 'VALIDATION_ERROR',
      errors: {
        fullName: 'El nombre completo es obligatorio',
        email: 'Correo electrónico inválido',
      },
    });

    render(<RegistrationForm />);

    fireEvent.change(screen.getByLabelText(/Nombre completo/i), {
      target: { value: 'Diego Martinez' },
    });
    fireEvent.change(screen.getByLabelText(/Correo electrónico/i), {
      target: { value: 'diego@ejemplo.com' },
    });
    fireEvent.change(screen.getByLabelText(/^Contraseña$/i), {
      target: { value: '12345678' },
    });
    fireEvent.change(screen.getByLabelText(/Confirmar contraseña/i), {
      target: { value: '12345678' },
    });
    fireEvent.click(screen.getByLabelText(/Acepto los/i));
    fireEvent.click(screen.getByRole('button', { name: /Crear cuenta/i }));

    await waitFor(() => {
      expect(screen.getByText(/El nombre completo es obligatorio/i)).toBeInTheDocument();
      expect(screen.getByText(/Correo electrónico inválido/i)).toBeInTheDocument();
    });
  });

  it('renders general error when service returns unexpected failure without errors', async () => {
    vi.mocked(RegistrationService.Register).mockResolvedValue({
      success: false,
      message: 'Ocurrió un error inesperado',
      code: 'UNEXPECTED_ERROR',
    });

    render(<RegistrationForm />);

    fireEvent.change(screen.getByLabelText(/Nombre completo/i), {
      target: { value: 'Diego Martinez' },
    });
    fireEvent.change(screen.getByLabelText(/Correo electrónico/i), {
      target: { value: 'diego@ejemplo.com' },
    });
    fireEvent.change(screen.getByLabelText(/^Contraseña$/i), {
      target: { value: '12345678' },
    });
    fireEvent.change(screen.getByLabelText(/Confirmar contraseña/i), {
      target: { value: '12345678' },
    });
    fireEvent.click(screen.getByLabelText(/Acepto los/i));
    fireEvent.click(screen.getByRole('button', { name: /Crear cuenta/i }));

    await waitFor(() => {
      expect(screen.getByText(/Ocurrió un error inesperado/i)).toBeInTheDocument();
    });
  });

  it('shows social upcoming alert for Google and Apple', () => {
    const AlertSpy = vi.spyOn(window, 'alert').mockImplementation(() => undefined);

    render(<RegistrationForm />);

    fireEvent.click(screen.getByRole('button', { name: /Google/i }));
    fireEvent.click(screen.getByRole('button', { name: /Apple/i }));

    expect(AlertSpy).toHaveBeenCalledTimes(2);
    expect(AlertSpy).toHaveBeenCalledWith('Próximamente');
  });
});
