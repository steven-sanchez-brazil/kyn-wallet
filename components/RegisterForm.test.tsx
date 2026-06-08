import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import RegisterForm from './RegisterForm';

// Mock Next.js router
vi.mock('next/navigation', () => ({
  useRouter: () => ({ push: vi.fn() }),
}));

// Mock Next.js Link
vi.mock('next/link', () => ({
  default: ({ children, href }: { children: React.ReactNode; href: string }) => (
    <a href={href}>{children}</a>
  ),
}));

describe('RegisterForm', () => {
  it('renders all form fields', () => {
    render(<RegisterForm />);
    expect(screen.getByLabelText(/nombre completo/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/correo electrónico/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/^contraseña$/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/confirmar contraseña/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/términos/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /crear cuenta/i })).toBeInTheDocument();
  });

  it('shows error when submitting empty form', async () => {
    render(<RegisterForm />);
    fireEvent.click(screen.getByRole('button', { name: /crear cuenta/i }));
    await waitFor(() => {
      expect(screen.getByText('El nombre es obligatorio')).toBeInTheDocument();
    });
  });

  it('shows inline email error for invalid format', async () => {
    render(<RegisterForm />);
    const emailInput = screen.getByLabelText(/correo electrónico/i);
    fireEvent.change(emailInput, { target: { value: 'not-an-email' } });
    await waitFor(() => {
      expect(screen.getByText('Formato de correo inválido')).toBeInTheDocument();
    });
  });

  it('shows error when passwords do not match', async () => {
    render(<RegisterForm />);
    const passwordInput = screen.getByLabelText(/^contraseña$/i);
    const confirmInput = screen.getByLabelText(/confirmar contraseña/i);
    fireEvent.change(passwordInput, { target: { value: 'password123' } });
    fireEvent.change(confirmInput, { target: { value: 'different123' } });
    await waitFor(() => {
      expect(screen.getByText('Las contraseñas no coinciden')).toBeInTheDocument();
    });
  });

  it('shows error when terms are not accepted on submit', async () => {
    render(<RegisterForm />);
    // Fill all fields correctly
    fireEvent.change(screen.getByLabelText(/nombre completo/i), {
      target: { value: 'Diego Mujica' },
    });
    fireEvent.change(screen.getByLabelText(/correo electrónico/i), {
      target: { value: 'diego@test.com' },
    });
    fireEvent.change(screen.getByLabelText(/^contraseña$/i), {
      target: { value: 'password123' },
    });
    fireEvent.change(screen.getByLabelText(/confirmar contraseña/i), {
      target: { value: 'password123' },
    });
    // Do NOT check terms
    fireEvent.click(screen.getByRole('button', { name: /crear cuenta/i }));
    await waitFor(() => {
      expect(
        screen.getByText('Debes aceptar los términos y condiciones')
      ).toBeInTheDocument();
    });
  });

  it('renders link to login page', () => {
    render(<RegisterForm />);
    const loginLink = screen.getByRole('link', { name: /inicia sesión/i });
    expect(loginLink).toHaveAttribute('href', '/');
  });
});
