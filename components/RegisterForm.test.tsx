import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import RegisterForm from './RegisterForm';
import React from 'react';

// Mock the router
vi.mock('next/navigation', () => ({
  useRouter: () => ({
    push: vi.fn(),
  }),
}));

describe('RegisterForm UI', () => {
  it('should show real-time validation error for invalid email', async () => {
    render(<RegisterForm />);
    
    const emailInput = screen.getByLabelText(/Correo electrónico/i);
    fireEvent.change(emailInput, { target: { value: 'invalid-email' } });

    await waitFor(() => {
      expect(screen.getByText(/Formato de correo inválido/i)).toBeInTheDocument();
    });
  });

  it('should show error when passwords do not match', async () => {
    render(<RegisterForm />);
    
    const passwordInput = screen.getByLabelText(/^Contraseña$/i);
    const confirmInput = screen.getByLabelText(/Confirmar contraseña/i);

    fireEvent.change(passwordInput, { target: { value: 'password123' } });
    fireEvent.change(confirmInput, { target: { value: 'different' } });

    await waitFor(() => {
      expect(screen.getByText(/Las contraseñas no coinciden/i)).toBeInTheDocument();
    });
  });

  it('should disable submit button when terms are not accepted', () => {
    render(<RegisterForm />);
    const submitButton = screen.getByRole('button', { name: /Crear cuenta/i });
    expect(submitButton).toBeDisabled();
  });

  it('should enable submit button when form is valid and terms are accepted', async () => {
    render(<RegisterForm />);
    
    fireEvent.change(screen.getByLabelText(/Nombre completo/i), { target: { value: 'John Doe' } });
    fireEvent.change(screen.getByLabelText(/Correo electrónico/i), { target: { value: 'john@example.com' } });
    fireEvent.change(screen.getByLabelText(/^Contraseña$/i), { target: { value: 'password123' } });
    fireEvent.change(screen.getByLabelText(/Confirmar contraseña/i), { target: { value: 'password123' } });
    fireEvent.click(screen.getByRole('checkbox'));

    const submitButton = screen.getByRole('button', { name: /Crear cuenta/i });
    
    await waitFor(() => {
      expect(submitButton).not.toBeDisabled();
    });
  });
});
