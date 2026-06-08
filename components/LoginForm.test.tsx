import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import LoginForm from './LoginForm';
import React from 'react';

// Mock the router
vi.mock('next/navigation', () => ({
  useRouter: () => ({
    push: vi.fn(),
  }),
  useSearchParams: vi.fn(),
}));

import { useSearchParams } from 'next/navigation';

describe('LoginForm UI', () => {
  it('should show real-time validation error for invalid email', async () => {
    (useSearchParams as any).mockReturnValue(new URLSearchParams());
    render(<LoginForm />);
    
    const emailInput = screen.getByLabelText(/Correo electrónico/i);
    fireEvent.change(emailInput, { target: { value: 'invalid-email' } });

    await waitFor(() => {
      expect(screen.getByText(/Formato de correo inválido/i)).toBeInTheDocument();
    });
  });

  it('should show real-time validation error for short password', async () => {
    (useSearchParams as any).mockReturnValue(new URLSearchParams());
    render(<LoginForm />);
    
    const passwordInput = screen.getByLabelText(/Contraseña/i);
    fireEvent.change(passwordInput, { target: { value: 'short' } });

    await waitFor(() => {
      expect(screen.getByText(/La contraseña debe tener al menos 8 caracteres/i)).toBeInTheDocument();
    });
  });

  it('should disable submit button when there are validation errors', async () => {
    (useSearchParams as any).mockReturnValue(new URLSearchParams());
    render(<LoginForm />);
    
    const emailInput = screen.getByLabelText(/Correo electrónico/i);
    const loginButton = screen.getByRole('button', { name: /Iniciar sesión/i });

    fireEvent.change(emailInput, { target: { value: 'invalid-email' } });

    await waitFor(() => {
      expect(loginButton).toBeDisabled();
    });
  });

  describe('T023: Registration success banner', () => {
    it('should display success banner when URL contains ?registered=true', () => {
      const mockParams = new URLSearchParams('registered=true');
      (useSearchParams as any).mockReturnValue(mockParams);

      render(<LoginForm />);

      const banner = screen.getByText(/¡Cuenta creada exitosamente!/i);
      expect(banner).toBeInTheDocument();
      expect(banner.closest('div')).toHaveClass(/bg-green|success|registered/);
    });

    it('should not display banner when URL does not contain ?registered=true', () => {
      (useSearchParams as any).mockReturnValue(new URLSearchParams());
      render(<LoginForm />);

      const banner = screen.queryByText(/¡Cuenta creada exitosamente!/i);
      expect(banner).not.toBeInTheDocument();
    });
  });

  describe('T052: Sign Up Link (US7)', () => {
    it('should render "Regístrate" link with href="/register"', () => {
      (useSearchParams as any).mockReturnValue(new URLSearchParams());
      render(<LoginForm />);

      const link = screen.getByRole('link', { name: /Regístrate/i });
      expect(link).toHaveAttribute('href', '/register');
    });

    it('should display "¿No tienes cuenta?" text with sign up link', () => {
      (useSearchParams as any).mockReturnValue(new URLSearchParams());
      render(<LoginForm />);

      expect(screen.getByText(/¿No tienes cuenta\?/)).toBeInTheDocument();
    });
  });
});
