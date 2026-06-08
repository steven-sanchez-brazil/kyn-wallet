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
  it('should show real-time validation error for short name', async () => {
    render(<RegisterForm />);
    
    const nameInput = screen.getByLabelText(/Nombre completo/i);
    fireEvent.change(nameInput, { target: { value: 'Lu' } });

    await waitFor(() => {
      expect(screen.getByText(/El nombre debe tener al menos 3 caracteres/i)).toBeInTheDocument();
    });
  });

  it('should show real-time validation error for invalid email', async () => {
    render(<RegisterForm />);
    
    const emailInput = screen.getByLabelText(/Correo electrónico/i);
    fireEvent.change(emailInput, { target: { value: 'invalid-email' } });

    await waitFor(() => {
      expect(screen.getByText(/Formato de correo inválido/i)).toBeInTheDocument();
    });
  });

  it('should show real-time validation error for short password', async () => {
    render(<RegisterForm />);
    
    const passwordInput = screen.getByLabelText(/^Contraseña/i);
    fireEvent.change(passwordInput, { target: { value: 'short' } });

    await waitFor(() => {
      expect(screen.getByText(/La contraseña debe tener al menos 8 caracteres/i)).toBeInTheDocument();
    });
  });

  it('should show real-time validation error for non-matching passwords', async () => {
    render(<RegisterForm />);
    
    const passwordInput = screen.getByLabelText(/^Contraseña/i);
    const confirmPasswordInput = screen.getByLabelText(/Confirmar contraseña/i);
    
    fireEvent.change(passwordInput, { target: { value: 'password123' } });
    fireEvent.change(confirmPasswordInput, { target: { value: 'different123' } });

    await waitFor(() => {
      expect(screen.getByText(/Las contraseñas no coinciden/i)).toBeInTheDocument();
    });
  });

  it('should disable submit button when there are validation errors or terms not agreed', async () => {
    render(<RegisterForm />);
    
    const registerButton = screen.getByRole('button', { name: /Registrarse/i });
    expect(registerButton).toBeDisabled(); // Disabled initially because terms is not checked and fields empty

    const nameInput = screen.getByLabelText(/Nombre completo/i);
    const emailInput = screen.getByLabelText(/Correo electrónico/i);
    const passwordInput = screen.getByLabelText(/^Contraseña/i);
    const confirmPasswordInput = screen.getByLabelText(/Confirmar contraseña/i);
    const agreeCheckbox = screen.getByLabelText(/Acepto los/i);

    fireEvent.change(nameInput, { target: { value: 'Luke Skywalker' } });
    fireEvent.change(emailInput, { target: { value: 'luke@skywalker.com' } });
    fireEvent.change(passwordInput, { target: { value: 'password123' } });
    fireEvent.change(confirmPasswordInput, { target: { value: 'password123' } });
    
    // Fields valid, but checkbox is not checked yet
    expect(registerButton).toBeDisabled();

    // Check terms
    fireEvent.click(agreeCheckbox);

    await waitFor(() => {
      expect(registerButton).not.toBeDisabled();
    });
  });
});
