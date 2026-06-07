import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import RegisterForm from '../../components/RegisterForm';
import { AuthService } from '../../lib/services/AuthService';
import React from 'react';

// Mock the router
const mockPush = vi.fn();
const mockSearchParams = new URLSearchParams();
vi.mock('next/navigation', () => ({
  useRouter: () => ({
    push: mockPush,
  }),
  useSearchParams: () => mockSearchParams,
}));

describe('RegisterForm Integration', () => {
  it('should redirect to /login?registro=exitoso on successful registration', async () => {
    // We'll implement RegisterForm next, assuming these labels based on spec.md
    render(<RegisterForm />);

    const nameInput = screen.getByLabelText(/Nombre completo/i);
    const emailInput = screen.getByLabelText(/Correo electrónico/i);
    const passwordInput = screen.getByLabelText(/^Contraseña$/i);
    const confirmInput = screen.getByLabelText(/Confirmar contraseña/i);
    const termsCheckbox = screen.getByLabelText(/Acepto los términos y condiciones/i);
    const submitButton = screen.getByRole('button', { name: /Crear cuenta/i });

    fireEvent.change(nameInput, { target: { value: 'Steven Luna' } });
    fireEvent.change(emailInput, { target: { value: 'steven@example.com' } });
    fireEvent.change(passwordInput, { target: { value: 'password123' } });
    fireEvent.change(confirmInput, { target: { value: 'password123' } });
    fireEvent.click(termsCheckbox);
    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(mockPush).toHaveBeenCalledWith('/login?registro=exitoso');
    }, { timeout: 2000 });
  });

  it('should show error if passwords do not match', async () => {
    render(<RegisterForm />);

    const passwordInput = screen.getByLabelText(/^Contraseña$/i);
    const confirmInput = screen.getByLabelText(/Confirmar contraseña/i);

    fireEvent.change(passwordInput, { target: { value: 'password123' } });
    fireEvent.change(confirmInput, { target: { value: 'different' } });

    await waitFor(() => {
      expect(screen.getByText(/Las contraseñas no coinciden/i)).toBeInTheDocument();
    });
  });

  it('should disable submit button if terms are not accepted', () => {
    render(<RegisterForm />);
    const submitButton = screen.getByRole('button', { name: /Crear cuenta/i });
    expect(submitButton).toBeDisabled();
  });
});
