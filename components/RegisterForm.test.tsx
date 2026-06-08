import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { RegisterForm } from './RegisterForm';
import { AuthService } from '../lib/services/AuthService';

// Mock useRouter
vi.mock('next/navigation', () => ({
  useRouter: () => ({
    push: vi.fn(),
  }),
}));

describe('RegisterForm', () => {
  it('should render all registration fields', () => {
    render(<RegisterForm />);
    
    expect(screen.getByLabelText(/nombre completo/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/correo electrónico/i)).toBeInTheDocument();
    expect(screen.getAllByLabelText(/contraseña/i)).toHaveLength(2);
    expect(screen.getByLabelText(/aceptar términos/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /crear cuenta/i })).toBeInTheDocument();
  });

  it('should call AuthService.register and redirect on success', async () => {
    const registerSpy = vi.spyOn(AuthService, 'register').mockResolvedValue({ Success: true });
    
    render(<RegisterForm />);
    
    fireEvent.change(screen.getByLabelText(/nombre completo/i), { target: { value: 'Alex Mena' } });
    fireEvent.change(screen.getByLabelText(/correo electrónico/i), { target: { value: 'alex@ejemplo.com' } });
    
    const passwordInputs = screen.getAllByLabelText(/contraseña/i);
    fireEvent.change(passwordInputs[0], { target: { value: 'password123' } });
    fireEvent.change(passwordInputs[1], { target: { value: 'password123' } });
    
    fireEvent.click(screen.getByLabelText(/aceptar términos/i));
    
    fireEvent.click(screen.getByRole('button', { name: /crear cuenta/i }));
    
    // Accept modal
    const acceptButton = await screen.findByRole('button', { name: /aceptar/i });
    fireEvent.click(acceptButton);
    
    await waitFor(() => {
      expect(registerSpy).toHaveBeenCalledWith(expect.objectContaining({
        FullName: 'Alex Mena',
        Email: 'alex@ejemplo.com',
        Password: 'password123',
      }));
    });
  });

  it('should show error message if passwords do not match', async () => {
    render(<RegisterForm />);
    
    const passwordInputs = screen.getAllByLabelText(/contraseña/i);
    fireEvent.change(passwordInputs[0], { target: { value: 'password123' } });
    fireEvent.change(passwordInputs[1], { target: { value: 'mismatch' } });
    fireEvent.blur(passwordInputs[1]);
    
    await waitFor(() => {
      expect(screen.getByText(/las contraseñas deben coincidir/i)).toBeInTheDocument();
    });
  });

  it('should show error for invalid email', async () => {
    render(<RegisterForm />);
    
    const emailInput = screen.getByLabelText(/correo electrónico/i);
    fireEvent.change(emailInput, { target: { value: 'invalid-email' } });
    fireEvent.blur(emailInput);
    
    await waitFor(() => {
      expect(screen.getByText(/correo no válido/i)).toBeInTheDocument();
    });
  });

  it('should have a link to the login page', () => {
    // Note: The link might be in the page.tsx or within the form.
    // If it's in page.tsx, we might need to test the page component instead.
    // But since T020 says to add it to RegisterForm, let's assume it belongs there.
    render(<RegisterForm />);
    const link = screen.getByRole('link', { name: /inicia sesión/i });
    expect(link).toBeInTheDocument();
    expect(link).toHaveAttribute('href', '/');
  });
});
