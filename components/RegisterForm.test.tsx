import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import RegisterForm from './RegisterForm';
import { AuthService } from '../lib/services/AuthService';
import React from 'react';

// Mock the router
const mockPush = vi.fn();
vi.mock('next/navigation', () => ({
  useRouter: () => ({
    push: mockPush,
  }),
}));

// Mock window.alert
const mockAlert = vi.fn();
if (typeof window !== 'undefined') {
  window.alert = mockAlert;
} else {
  global.window = { alert: mockAlert } as any;
}

describe('RegisterForm', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    AuthService.clearRegisteredUsers();
  });

  it('should render all input fields and submit button', () => {
    render(<RegisterForm />);

    expect(screen.getByLabelText(/Nombre completo/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Correo electrónico/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/^Contraseña/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Confirmar contraseña/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Acepto los términos/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /Crear cuenta/i })).toBeInTheDocument();
  });

  it('should show real-time error for invalid full name', async () => {
    render(<RegisterForm />);

    const nameInput = screen.getByLabelText(/Nombre completo/i);
    fireEvent.change(nameInput, { target: { value: 'ST' } }); // too short
    fireEvent.blur(nameInput);

    await waitFor(() => {
      expect(screen.getByText(/Ingresa tu nombre y apellido reales/i)).toBeInTheDocument();
    });
  });

  it('should show real-time error for invalid email', async () => {
    render(<RegisterForm />);

    const emailInput = screen.getByLabelText(/Correo electrónico/i);
    fireEvent.change(emailInput, { target: { value: 'invalid-email' } });
    fireEvent.blur(emailInput);

    await waitFor(() => {
      expect(screen.getByText(/Correo electrónico inválido/i)).toBeInTheDocument();
    });
  });

  it('should show real-time error for non-complex password', async () => {
    render(<RegisterForm />);

    const passwordInput = screen.getByLabelText(/^Contraseña/i);
    fireEvent.change(passwordInput, { target: { value: 'short' } });
    fireEvent.blur(passwordInput);

    await waitFor(() => {
      expect(screen.getByText(/mínimo de 8 caracteres, al menos una letra mayúscula/i)).toBeInTheDocument();
    });
  });

  it('should show real-time error for mismatched passwords', async () => {
    render(<RegisterForm />);

    const passwordInput = screen.getByLabelText(/^Contraseña/i);
    const confirmInput = screen.getByLabelText(/Confirmar contraseña/i);

    fireEvent.change(passwordInput, { target: { value: 'Password123' } });
    fireEvent.change(confirmInput, { target: { value: 'Password456' } });
    fireEvent.blur(confirmInput);

    await waitFor(() => {
      expect(screen.getByText(/La confirmación no coincide/i)).toBeInTheDocument();
    });
  });

  it('should successfully submit form, register user on AuthService and redirect', async () => {
    render(<RegisterForm />);

    const nameInput = screen.getByLabelText(/Nombre completo/i);
    const emailInput = screen.getByLabelText(/Correo electrónico/i);
    const passwordInput = screen.getByLabelText(/^Contraseña/i);
    const confirmInput = screen.getByLabelText(/Confirmar contraseña/i);
    const termsCheckbox = screen.getByLabelText(/Acepto los términos/i);
    const submitButton = screen.getByRole('button', { name: /Crear cuenta/i });

    fireEvent.change(nameInput, { target: { value: 'Steven Luna' } });
    fireEvent.change(emailInput, { target: { value: 'steven@kynwallet.com' } });
    fireEvent.change(passwordInput, { target: { value: 'KynSecure2026!' } });
    fireEvent.change(confirmInput, { target: { value: 'KynSecure2026!' } });
    fireEvent.click(termsCheckbox);

    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(mockPush).toHaveBeenCalledWith('/?registered=success');
    }, { timeout: 2000 });
  });

  it('should alert coming soon for Google and Apple social buttons', () => {
    render(<RegisterForm />);

    const googleBtn = screen.getByRole('button', { name: /Google/i });
    const appleBtn = screen.getByRole('button', { name: /Apple/i });

    fireEvent.click(googleBtn);
    expect(mockAlert).toHaveBeenCalledWith('Google estará disponible próximamente.');

    fireEvent.click(appleBtn);
    expect(mockAlert).toHaveBeenCalledWith('Apple estará disponible próximamente.');
  });
});