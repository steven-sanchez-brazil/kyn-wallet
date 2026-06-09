import React from 'react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import RegisterForm from './RegisterForm';
import { RegisterService } from '../lib/services/RegisterService';

const mockPush = vi.fn();

vi.mock('next/navigation', () => ({
  useRouter: () => ({
    push: mockPush,
  }),
}));

describe('RegisterForm', () => {
  beforeEach(() => {
    vi.restoreAllMocks();
    mockPush.mockReset();
  });

  it('should render all required fields and submit button', () => {
    render(<RegisterForm />);

    expect(screen.getByLabelText(/Nombre completo/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Correo electrónico/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/^Contraseña$/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Confirmar contraseña/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Acepto los términos y condiciones/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /Crear cuenta/i })).toBeInTheDocument();
  });

  it('should block submit and show required field errors when form is empty', async () => {
    render(<RegisterForm />);

    fireEvent.click(screen.getByRole('button', { name: /Crear cuenta/i }));

    await waitFor(() => {
      expect(screen.getByText(/nombre completo es obligatorio/i)).toBeInTheDocument();
      expect(screen.getByText(/correo electrónico es obligatorio/i)).toBeInTheDocument();
      expect(screen.getByText(/contraseña es obligatoria/i)).toBeInTheDocument();
      expect(screen.getByText(/Debes confirmar la contraseña/i)).toBeInTheDocument();
    });
  });

  it('should require terms acceptance before submit', async () => {
    render(<RegisterForm />);

    fireEvent.change(screen.getByLabelText(/Nombre completo/i), {
      target: { value: 'Diego Martinez' },
    });
    fireEvent.change(screen.getByLabelText(/Correo electrónico/i), {
      target: { value: 'diego@ejemplo.com' },
    });
    fireEvent.change(screen.getByLabelText(/^Contraseña$/i), {
      target: { value: 'password123' },
    });
    fireEvent.change(screen.getByLabelText(/Confirmar contraseña/i), {
      target: { value: 'password123' },
    });

    fireEvent.click(screen.getByRole('button', { name: /Crear cuenta/i }));

    await waitFor(() => {
      expect(screen.getByText(/Debes aceptar los términos y condiciones/i)).toBeInTheDocument();
    });
  });

  it('should show inline error for invalid email', async () => {
    render(<RegisterForm />);

    const email = screen.getByLabelText(/Correo electrónico/i);
    fireEvent.change(email, { target: { value: 'correo-invalido' } });
    fireEvent.blur(email);

    await waitFor(() => {
      expect(screen.getByText(/Formato de correo inválido/i)).toBeInTheDocument();
    });
  });

  it('should show inline errors for password length and mismatch confirmation', async () => {
    render(<RegisterForm />);

    const password = screen.getByLabelText(/^Contraseña$/i);
    const confirm = screen.getByLabelText(/Confirmar contraseña/i);

    fireEvent.change(password, { target: { value: '123' } });
    fireEvent.blur(password);
    fireEvent.change(confirm, { target: { value: '1234' } });
    fireEvent.blur(confirm);

    await waitFor(() => {
      expect(screen.getByText(/al menos 8 caracteres/i)).toBeInTheDocument();
      expect(screen.getByText(/Las contraseñas no coinciden/i)).toBeInTheDocument();
    });
  });

  it('should show coming soon alert on Google and Apple buttons', () => {
    const alertSpy = vi.spyOn(window, 'alert').mockImplementation(() => undefined);
    render(<RegisterForm />);

    fireEvent.click(screen.getByRole('button', { name: /^Google$/i }));
    fireEvent.click(screen.getByRole('button', { name: /^Apple$/i }));

    expect(alertSpy).toHaveBeenNthCalledWith(1, 'Próximamente');
    expect(alertSpy).toHaveBeenNthCalledWith(2, 'Próximamente');
  });

  it('should render login link to /login', () => {
    render(<RegisterForm />);

    const link = screen.getByRole('link', { name: /Inicia sesión/i });
    expect(link).toHaveAttribute('href', '/login');
  });

  it('should redirect to /login after successful registration', async () => {
    vi.spyOn(RegisterService, 'registrar').mockResolvedValue({
      Exitoso: true,
      Mensaje: 'Cuenta creada exitosamente',
      RutaDestino: '/login',
    });

    render(<RegisterForm />);

    fireEvent.change(screen.getByLabelText(/Nombre completo/i), {
      target: { value: 'Diego Martinez' },
    });
    fireEvent.change(screen.getByLabelText(/Correo electrónico/i), {
      target: { value: 'diego@ejemplo.com' },
    });
    fireEvent.change(screen.getByLabelText(/^Contraseña$/i), {
      target: { value: 'password123' },
    });
    fireEvent.change(screen.getByLabelText(/Confirmar contraseña/i), {
      target: { value: 'password123' },
    });
    fireEvent.click(screen.getByLabelText(/Acepto los términos y condiciones/i));

    fireEvent.click(screen.getByRole('button', { name: /Crear cuenta/i }));

    await waitFor(() => {
      expect(mockPush).toHaveBeenCalledWith('/login?registered=1');
    });
  });
});