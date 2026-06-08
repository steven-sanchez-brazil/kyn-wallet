import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import LoginForm from './LoginForm';
import React from 'react';

// Mock the router
const mockPush = vi.fn();
vi.mock('next/navigation', () => ({
  useRouter: () => ({
    push: mockPush,
  }),
}));

describe('LoginForm UI', () => {
  it('should show real-time validation error for invalid email', async () => {
    render(<LoginForm />);
    
    const emailInput = screen.getByLabelText(/Correo electrónico/i);
    fireEvent.change(emailInput, { target: { value: 'invalid-email' } });

    await waitFor(() => {
      expect(screen.getByText(/Formato de correo inválido/i)).toBeInTheDocument();
    });
  });

  it('should show real-time validation error for short password', async () => {
    render(<LoginForm />);
    
    const passwordInput = screen.getByPlaceholderText('••••••••');
    fireEvent.change(passwordInput, { target: { value: 'short' } });

    await waitFor(() => {
      expect(screen.getByText(/La contraseña debe tener al menos 8 caracteres/i)).toBeInTheDocument();
    });
  });

  it('should disable submit button when there are validation errors', async () => {
    render(<LoginForm />);
    
    const emailInput = screen.getByLabelText(/Correo electrónico/i);
    const loginButton = screen.getByRole('button', { name: /Iniciar sesión/i });

    fireEvent.change(emailInput, { target: { value: 'invalid-email' } });

    await waitFor(() => {
      expect(loginButton).toBeDisabled();
    });
  });
});

describe('LoginForm - US4: Navigation to Register', () => {
  it('should render "Regístrate" link that navigates to /register', () => {
    render(<LoginForm />);

    const registerLink = screen.getByRole('link', { name: /Regístrate/i });
    expect(registerLink).toBeInTheDocument();
    expect(registerLink).toHaveAttribute('href', '/register');
  });

  it('should render "¿No tienes cuenta?" text next to the register link', () => {
    render(<LoginForm />);

    expect(screen.getByText(/¿No tienes cuenta\?/i)).toBeInTheDocument();
  });

  it('should show alert when "¿Olvidaste tu contraseña?" is clicked', () => {
    const alertSpy = vi.spyOn(window, 'alert').mockImplementation(() => {});
    render(<LoginForm />);

    const forgotLink = screen.getByText(/¿Olvidaste tu contraseña\?/i);
    fireEvent.click(forgotLink);

    expect(alertSpy).toHaveBeenCalledWith(expect.stringContaining('próximamente'));
    alertSpy.mockRestore();
  });

  it('should style action links with brand-600 color', () => {
    render(<LoginForm />);

    const forgotLink = screen.getByText(/¿Olvidaste tu contraseña\?/i);
    expect(forgotLink).toHaveClass('text-brand-600');
  });
});

describe('LoginForm - US5: Password Visibility Toggle', () => {
  it('should render password toggle button with aria-label', () => {
    render(<LoginForm />);

    const toggleButton = screen.getByLabelText(/Mostrar\/Ocultar contraseña/i);
    expect(toggleButton).toBeInTheDocument();
  });

  it('should toggle password input type from password to text', () => {
    render(<LoginForm />);

    const passwordInput = screen.getByPlaceholderText('••••••••');
    const toggleButton = screen.getByLabelText(/Mostrar\/Ocultar contraseña/i);

    expect(passwordInput).toHaveAttribute('type', 'password');

    fireEvent.click(toggleButton);
    expect(passwordInput).toHaveAttribute('type', 'text');

    fireEvent.click(toggleButton);
    expect(passwordInput).toHaveAttribute('type', 'password');
  });
});
