import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import RegisterForm from './RegisterForm';
import { AuthService } from '../lib/services/AuthService';
import React from 'react';

const mockPush = vi.fn();
vi.mock('next/navigation', () => ({
  useRouter: () => ({
    push: mockPush,
  }),
}));

const fillValidForm = () => {
  fireEvent.change(screen.getByLabelText(/Nombre completo/i), {
    target: { value: 'Diego Martínez' },
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
  fireEvent.click(screen.getByLabelText(/Acepto los/i));
};

describe('RegisterForm - US1 Crear cuenta', () => {
  beforeEach(() => {
    mockPush.mockClear();
  });

  it('should render the registration heading and subheading', () => {
    render(<RegisterForm />);
    expect(screen.getByText(/Crea tu cuenta/i)).toBeInTheDocument();
    expect(
      screen.getByText(/Completa tus datos para comenzar/i)
    ).toBeInTheDocument();
  });

  it('should register and redirect to /login?registered=true on success', async () => {
    const registerSpy = vi
      .spyOn(AuthService, 'register')
      .mockResolvedValueOnce({ Success: true });

    render(<RegisterForm />);
    fillValidForm();
    fireEvent.click(screen.getByRole('button', { name: /Crear cuenta/i }));

    await waitFor(() => {
      expect(registerSpy).toHaveBeenCalled();
      expect(mockPush).toHaveBeenCalledWith('/login?registered=true');
    });
    registerSpy.mockRestore();
  });
});

describe('RegisterForm - US2 Validación inline', () => {
  beforeEach(() => {
    mockPush.mockClear();
  });

  it('should show inline errors and not submit when fields are empty', async () => {
    const registerSpy = vi.spyOn(AuthService, 'register');
    render(<RegisterForm />);

    fireEvent.click(screen.getByRole('button', { name: /Crear cuenta/i }));

    await waitFor(() => {
      expect(
        screen.getByText(/El nombre completo es obligatorio/i)
      ).toBeInTheDocument();
    });
    expect(registerSpy).not.toHaveBeenCalled();
    registerSpy.mockRestore();
  });

  it('should show inline error for invalid email', async () => {
    render(<RegisterForm />);
    fireEvent.change(screen.getByLabelText(/Correo electrónico/i), {
      target: { value: 'correo-invalido' },
    });
    await waitFor(() => {
      expect(screen.getByText(/Formato de correo inválido/i)).toBeInTheDocument();
    });
  });

  it('should show inline error for short password', async () => {
    render(<RegisterForm />);
    fireEvent.change(screen.getByLabelText(/^Contraseña$/i), {
      target: { value: 'corta' },
    });
    await waitFor(() => {
      expect(
        screen.getByText(/La contraseña debe tener al menos 8 caracteres/i)
      ).toBeInTheDocument();
    });
  });

  it('should show inline error when passwords do not match', async () => {
    render(<RegisterForm />);
    fireEvent.change(screen.getByLabelText(/^Contraseña$/i), {
      target: { value: 'password123' },
    });
    fireEvent.change(screen.getByLabelText(/Confirmar contraseña/i), {
      target: { value: 'password124' },
    });
    await waitFor(() => {
      expect(screen.getByText(/Las contraseñas no coinciden/i)).toBeInTheDocument();
    });
  });

  it('should show inline error when terms are not accepted', async () => {
    const registerSpy = vi.spyOn(AuthService, 'register');
    render(<RegisterForm />);
    fireEvent.change(screen.getByLabelText(/Nombre completo/i), {
      target: { value: 'Diego Martínez' },
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
      expect(
        screen.getByText(/Debes aceptar los términos y condiciones/i)
      ).toBeInTheDocument();
    });
    expect(registerSpy).not.toHaveBeenCalled();
    registerSpy.mockRestore();
  });

  it('should show inline error when email is already registered', async () => {
    const registerSpy = vi
      .spyOn(AuthService, 'register')
      .mockResolvedValueOnce({
        Success: false,
        Error: 'Este correo ya está registrado',
      });

    render(<RegisterForm />);
    fillValidForm();
    fireEvent.click(screen.getByRole('button', { name: /Crear cuenta/i }));

    await waitFor(() => {
      expect(
        screen.getByText(/Este correo ya está registrado/i)
      ).toBeInTheDocument();
    });
    expect(mockPush).not.toHaveBeenCalled();
    registerSpy.mockRestore();
  });
});

describe('RegisterForm - US4 Accesos secundarios', () => {
  it('should alert "Próximamente" when clicking Google or Apple', () => {
    const alertSpy = vi.spyOn(window, 'alert').mockImplementation(() => {});
    render(<RegisterForm />);

    fireEvent.click(screen.getByRole('button', { name: /Google/i }));
    expect(alertSpy).toHaveBeenCalledWith('Próximamente');

    fireEvent.click(screen.getByRole('button', { name: /Apple/i }));
    expect(alertSpy).toHaveBeenCalledWith('Próximamente');

    alertSpy.mockRestore();
  });

  it('should render a link to /login', () => {
    render(<RegisterForm />);
    const link = screen.getByRole('link', { name: /Inicia sesión/i });
    expect(link).toHaveAttribute('href', '/login');
  });
});
