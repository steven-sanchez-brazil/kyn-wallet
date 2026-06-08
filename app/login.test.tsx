import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import LoginForm from '../components/LoginForm';
import { AuthService } from '../lib/services/AuthService';
import React from 'react';

// Mock the router
const mockPush = vi.fn();
vi.mock('next/navigation', () => ({
  useRouter: () => ({
    push: mockPush,
  }),
}));

describe('LoginForm Integration', () => {
  it('should authenticate a user created in registration flow', async () => {
    AuthService.resetForTests();

    await AuthService.register({
      FullName: 'Usuario Integrado',
      Email: 'integrado@example.com',
      Password: 'password123',
      ConfirmPassword: 'password123',
      TermsAccepted: true,
    });

    render(<LoginForm />);

    const emailInput = screen.getByLabelText(/Correo electrónico/i);
    const passwordInput = screen.getByLabelText(/Contraseña/i);
    const loginButton = screen.getByRole('button', { name: /Iniciar sesión/i });

    fireEvent.change(emailInput, { target: { value: 'integrado@example.com' } });
    fireEvent.change(passwordInput, { target: { value: 'password123' } });
    fireEvent.click(loginButton);

    await waitFor(() => {
      expect(mockPush).toHaveBeenCalledWith('/construction');
    });
  });

  it('should redirect to /construction on successful login', async () => {
    AuthService.resetForTests();

    render(<LoginForm />);

    const emailInput = screen.getByLabelText(/Correo electrónico/i);
    const passwordInput = screen.getByLabelText(/Contraseña/i);
    const loginButton = screen.getByRole('button', { name: /Iniciar sesión/i });

    fireEvent.change(emailInput, { target: { value: 'tucorreo@ejemplo.com' } });
    fireEvent.change(passwordInput, { target: { value: 'password123' } });
    fireEvent.click(loginButton);

    await waitFor(() => {
      expect(mockPush).toHaveBeenCalledWith('/construction');
    }, { timeout: 2000 });
  });

  it('should show error message on failed login (valid format but wrong credentials)', async () => {
    AuthService.resetForTests();

    render(<LoginForm />);

    const emailInput = screen.getByLabelText(/Correo electrónico/i);
    const passwordInput = screen.getByLabelText(/Contraseña/i);
    const loginButton = screen.getByRole('button', { name: /Iniciar sesión/i });

    fireEvent.change(emailInput, { target: { value: 'wrong@example.com' } });
    fireEvent.change(passwordInput, { target: { value: 'wrongpassword' } }); // 8+ chars to pass client-side validation
    fireEvent.click(loginButton);

    await waitFor(() => {
      expect(screen.getByText(/Credenciales inválidas/i)).toBeInTheDocument();
    });
  });
});
