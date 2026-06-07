import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import RegisterForm from '../../components/RegisterForm';
import React from 'react';

// Mock the router
const mockPush = vi.fn();
vi.mock('next/navigation', () => ({
  useRouter: () => ({
    push: mockPush,
  }),
}));

// Mock window.alert
const mockAlert = vi.spyOn(window, 'alert').mockImplementation(() => {});

describe('RegisterForm Integration Audit', () => {
  it('should audit all interactive elements and success flow', async () => {
    render(<RegisterForm />);

    // 1. Audit Form Fields Presence
    const nameInput = screen.getByLabelText(/Nombre completo/i);
    const emailInput = screen.getByLabelText(/Correo electrónico/i);
    const passwordInput = screen.getByLabelText(/^Contraseña$/i);
    const confirmPasswordInput = screen.getByLabelText(/Confirmar contraseña/i);
    const termsCheckbox = screen.getByRole('checkbox', { name: /Acepto los términos y condiciones/i });
    const registerButton = screen.getByRole('button', { name: /Crear cuenta/i });

    expect(nameInput).toBeInTheDocument();
    expect(emailInput).toBeInTheDocument();
    expect(passwordInput).toBeInTheDocument();
    expect(confirmPasswordInput).toBeInTheDocument();
    expect(termsCheckbox).toBeInTheDocument();
    expect(registerButton).toBeInTheDocument();

    // 2. Audit Navigation Link to /login
    const loginLink = screen.getByRole('link', { name: /Inicia sesión/i });
    expect(loginLink).toBeInTheDocument();
    expect(loginLink.getAttribute('href')).toBe('/login');

    // 3. Audit Social Buttons and Alerts
    const googleButton = screen.getByRole('button', { name: /Google/i });
    const appleButton = screen.getByRole('button', { name: /Apple/i });

    fireEvent.click(googleButton);
    expect(mockAlert).toHaveBeenCalledWith('Próximamente');
    
    fireEvent.click(appleButton);
    expect(mockAlert).toHaveBeenCalledWith('Próximamente');

    // 4. Audit Happy Path Registration and Redirection
    fireEvent.change(nameInput, { target: { value: 'Audit User' } });
    fireEvent.change(emailInput, { target: { value: 'audit@ejemplo.com' } });
    fireEvent.change(passwordInput, { target: { value: 'Password123!' } });
    fireEvent.change(confirmPasswordInput, { target: { value: 'Password123!' } });
    fireEvent.click(termsCheckbox);
    fireEvent.click(registerButton);

    await waitFor(() => {
      expect(screen.getByText(/Usuario registrado con éxito/i)).toBeInTheDocument();
    });

    await waitFor(() => {
      expect(mockPush).toHaveBeenCalledWith('/construction');
    }, { timeout: 3000 });
  });

  it('should show validation errors for new complexity (numeric required)', async () => {
    render(<RegisterForm />);

    const passwordInput = screen.getByLabelText(/^Contraseña$/i);
    const confirmPasswordInput = screen.getByLabelText(/Confirmar contraseña/i);
    const registerButton = screen.getByRole('button', { name: /Crear cuenta/i });

    // Test password without number
    fireEvent.change(passwordInput, { target: { value: 'Password!!' } });
    fireEvent.change(confirmPasswordInput, { target: { value: 'Password!!' } });
    fireEvent.click(registerButton);

    await waitFor(() => {
      // Use getAllByText and check the one with error class or specific position if needed, 
      // or just ensure at least one of them is the error message.
      // Better: search for the error message specifically in the form.
      const errorMessages = screen.getAllByText(/un número/i);
      expect(errorMessages.length).toBeGreaterThan(1); // One instruction, one error
    });
  });

  it('should show error when email already exists', async () => {
    render(<RegisterForm />);

    const nameInput = screen.getByLabelText(/Nombre completo/i);
    const emailInput = screen.getByLabelText(/Correo electrónico/i);
    const passwordInput = screen.getByLabelText(/^Contraseña$/i);
    const confirmPasswordInput = screen.getByLabelText(/Confirmar contraseña/i);
    const termsCheckbox = screen.getByRole('checkbox', { name: /Acepto los términos y condiciones/i });
    const registerButton = screen.getByRole('button', { name: /Crear cuenta/i });

    fireEvent.change(nameInput, { target: { value: 'Duplicate User' } });
    fireEvent.change(emailInput, { target: { value: 'tucorreo@ejemplo.com' } });
    fireEvent.change(passwordInput, { target: { value: 'Password123!' } });
    fireEvent.change(confirmPasswordInput, { target: { value: 'Password123!' } });
    fireEvent.click(termsCheckbox);
    fireEvent.click(registerButton);

    await waitFor(() => {
      expect(screen.getByText(/El correo electrónico ya está en uso/i)).toBeInTheDocument();
    }, { timeout: 3000 });
  });
});
