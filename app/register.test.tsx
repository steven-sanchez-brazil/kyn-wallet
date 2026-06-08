import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
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
  it('should redirect to /construction on successful register', async () => {
    render(<RegisterForm />);

    const nameInput = screen.getByLabelText(/Nombre completo/i);
    const emailInput = screen.getByLabelText(/Correo electrónico/i);
    const passwordInput = screen.getByLabelText(/^Contraseña/i);
    const confirmPasswordInput = screen.getByLabelText(/Confirmar contraseña/i);
    const agreeCheckbox = screen.getByLabelText(/Acepto los/i);
    const registerButton = screen.getByRole('button', { name: /Registrarse/i });

    fireEvent.change(nameInput, { target: { value: 'Ahsoka Tano' } });
    fireEvent.change(emailInput, { target: { value: 'ahsoka@tano.com' } });
    fireEvent.change(passwordInput, { target: { value: 'password123' } });
    fireEvent.change(confirmPasswordInput, { target: { value: 'password123' } });
    fireEvent.click(agreeCheckbox);
    fireEvent.click(registerButton);

    await waitFor(() => {
      expect(mockPush).toHaveBeenCalledWith('/construction');
    }, { timeout: 2000 });
  });

  it('should show error message when email is already registered', async () => {
    render(<RegisterForm />);

    const nameInput = screen.getByLabelText(/Nombre completo/i);
    const emailInput = screen.getByLabelText(/Correo electrónico/i);
    const passwordInput = screen.getByLabelText(/^Contraseña/i);
    const confirmPasswordInput = screen.getByLabelText(/Confirmar contraseña/i);
    const agreeCheckbox = screen.getByLabelText(/Acepto los/i);
    const registerButton = screen.getByRole('button', { name: /Registrarse/i });

    // luke@skywalker.com is prepopulated in MOCK_USERS
    fireEvent.change(nameInput, { target: { value: 'Luke Skywalker Copy' } });
    fireEvent.change(emailInput, { target: { value: 'luke@skywalker.com' } });
    fireEvent.change(passwordInput, { target: { value: 'password123' } });
    fireEvent.change(confirmPasswordInput, { target: { value: 'password123' } });
    fireEvent.click(agreeCheckbox);
    fireEvent.click(registerButton);

    await waitFor(() => {
      expect(screen.getByText(/Este correo electrónico ya se encuentra registrado/i)).toBeInTheDocument();
    });
  });
});
