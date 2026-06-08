import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import LoginForm from '../components/LoginForm';
import React from 'react';
import LoginPage from './page';

// Mock the router
const mockPush = vi.fn();
vi.mock('next/navigation', () => ({
  useRouter: () => ({
    push: mockPush,
  }),
}));

describe('LoginForm Integration', () => {
  it('should redirect to /construction on successful login', async () => {
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

describe('LoginPage — banner de registro', () => {
  it('should show success banner when searchParams.registered === "true"', () => {
    render(<LoginPage searchParams={{ registered: 'true' }} />);
    expect(
      screen.getByText('¡Cuenta creada exitosamente! Inicia sesión para continuar.')
    ).toBeInTheDocument();
  });

  it('should NOT show success banner when searchParams.registered is undefined', () => {
    render(<LoginPage searchParams={{}} />);
    expect(
      screen.queryByText('¡Cuenta creada exitosamente! Inicia sesión para continuar.')
    ).not.toBeInTheDocument();
  });

  it('should NOT show success banner when searchParams.registered is a different value', () => {
    render(<LoginPage searchParams={{ registered: 'false' }} />);
    expect(
      screen.queryByText('¡Cuenta creada exitosamente! Inicia sesión para continuar.')
    ).not.toBeInTheDocument();
  });
});
