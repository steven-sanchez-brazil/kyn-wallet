import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import RegisterForm from '../components/RegisterForm';
import { AuthService } from '../lib/services/AuthService';
import React from 'react';

// Mock the router
const mockPush = vi.fn();
vi.mock('next/navigation', () => ({
  useRouter: () => ({
    push: mockPush,
  }),
}));

describe('RegisterForm Integration', () => {
  beforeEach(() => {
    mockPush.mockClear();
    vi.restoreAllMocks();
  });

  it('should render all inputs, checkbox and button', () => {
    render(<RegisterForm />);

    expect(screen.getByLabelText(/Nombre completo/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Correo electrónico/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/^Contraseña$/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Confirmar contraseña/i)).toBeInTheDocument();
    expect(screen.getByRole('checkbox', { name: /Acepto los términos/i })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /Crear cuenta/i })).toBeInTheDocument();
  });

  it('should show error on invalid email format', async () => {
    render(<RegisterForm />);

    const emailInput = screen.getByLabelText(/Correo electrónico/i);
    fireEvent.change(emailInput, { target: { value: 'invalid-email' } });

    // Focus out to trigger validation feedback or wait for real-time
    await waitFor(() => {
      expect(screen.getByText(/Formato de correo inválido/i)).toBeInTheDocument();
    });
  });

  it('should show error on short password', async () => {
    render(<RegisterForm />);

    const passwordInput = screen.getByLabelText(/^Contraseña$/i);
    fireEvent.change(passwordInput, { target: { value: '123' } });

    await waitFor(() => {
      expect(screen.getByText(/La contraseña debe tener al menos 8 caracteres/i)).toBeInTheDocument();
    });
  });

  it('should show error when passwords do not match', async () => {
    render(<RegisterForm />);

    const passwordInput = screen.getByLabelText(/^Contraseña$/i);
    const confirmInput = screen.getByLabelText(/Confirmar contraseña/i);

    fireEvent.change(passwordInput, { target: { value: 'password123' } });
    fireEvent.change(confirmInput, { target: { value: 'password456' } });

    await waitFor(() => {
      expect(screen.getByText(/Las contraseñas no coinciden/i)).toBeInTheDocument();
    });
  });

  it('should require terms and conditions checkbox to be checked', async () => {
    const registerSpy = vi.spyOn(AuthService, 'register');
    render(<RegisterForm />);

    const nameInput = screen.getByLabelText(/Nombre completo/i);
    const emailInput = screen.getByLabelText(/Correo electrónico/i);
    const passwordInput = screen.getByLabelText(/^Contraseña$/i);
    const confirmInput = screen.getByLabelText(/Confirmar contraseña/i);
    const submitButton = screen.getByRole('button', { name: /Crear cuenta/i });

    fireEvent.change(nameInput, { target: { value: 'Diego Martinez' } });
    fireEvent.change(emailInput, { target: { value: 'diego@example.com' } });
    fireEvent.change(passwordInput, { target: { value: 'password123' } });
    fireEvent.change(confirmInput, { target: { value: 'password123' } });

    // Try to submit without checking terms
    fireEvent.click(submitButton);

    expect(registerSpy).not.toHaveBeenCalled();
  });

  it('should redirect to /login?registered=success on successful registration', async () => {
    const uniqueEmail = `diego_${Date.now()}@example.com`;
    render(<RegisterForm />);

    const nameInput = screen.getByLabelText(/Nombre completo/i);
    const emailInput = screen.getByLabelText(/Correo electrónico/i);
    const passwordInput = screen.getByLabelText(/^Contraseña$/i);
    const confirmInput = screen.getByLabelText(/Confirmar contraseña/i);
    const termsCheckbox = screen.getByRole('checkbox', { name: /Acepto los términos/i });
    const submitButton = screen.getByRole('button', { name: /Crear cuenta/i });

    fireEvent.change(nameInput, { target: { value: 'Diego Martinez' } });
    fireEvent.change(emailInput, { target: { value: uniqueEmail } });
    fireEvent.change(passwordInput, { target: { value: 'password123' } });
    fireEvent.change(confirmInput, { target: { value: 'password123' } });
    fireEvent.click(termsCheckbox);

    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(mockPush).toHaveBeenCalledWith('/login?registered=success');
    }, { timeout: 2000 });
  });
});
