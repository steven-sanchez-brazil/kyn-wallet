import React from 'react';
import { describe, expect, it, vi } from 'vitest';
import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import RegisterForm from './RegisterForm';
import { AuthService } from '../lib/services/AuthService';

const mockPush = vi.fn();

vi.mock('next/navigation', () => ({
  useRouter: () => ({
    push: mockPush,
  }),
}));

describe('RegisterForm', () => {
  it('shows inline validation errors on invalid submit', async () => {
    render(<RegisterForm />);

    fireEvent.click(screen.getByRole('button', { name: /Crear cuenta/i }));

    await waitFor(() => {
      expect(screen.getByText(/El nombre completo es obligatorio/i)).toBeInTheDocument();
      expect(screen.getByText(/El correo electrónico es obligatorio/i)).toBeInTheDocument();
      expect(screen.getByText(/La contraseña es obligatoria/i)).toBeInTheDocument();
      expect(screen.getByText(/Debes confirmar la contraseña/i)).toBeInTheDocument();
      expect(screen.getByText(/Debes aceptar términos y condiciones/i)).toBeInTheDocument();
    });
  });

  it('redirects to /login after successful registration', async () => {
    AuthService.resetForTests();

    render(<RegisterForm />);

    fireEvent.change(screen.getByLabelText(/Nombre completo/i), {
      target: { value: 'Diego Martínez' },
    });
    fireEvent.change(screen.getByLabelText(/Correo electrónico/i), {
      target: { value: 'diego.martinez@example.com' },
    });
    fireEvent.change(screen.getByLabelText(/^Contraseña$/i), {
      target: { value: 'password123' },
    });
    fireEvent.change(screen.getByLabelText(/Confirmar contraseña/i), {
      target: { value: 'password123' },
    });
    fireEvent.click(screen.getByLabelText(/Acepto los términos y condiciones/i));

    fireEvent.click(screen.getByRole('button', { name: /Crear cuenta/i }));

    await waitFor(() => {
      expect(mockPush).toHaveBeenCalledWith('/login?registered=1');
    });
  });

  it('allows retrying registration after validation errors without page refresh', async () => {
    AuthService.resetForTests();

    render(<RegisterForm />);

    fireEvent.click(screen.getByRole('button', { name: /Crear cuenta/i }));

    await waitFor(() => {
      expect(screen.getByText(/El nombre completo es obligatorio/i)).toBeInTheDocument();
    });

    const submitButton = screen.getByRole('button', { name: /Crear cuenta/i });
    expect(submitButton).toBeEnabled();

    fireEvent.change(screen.getByLabelText(/Nombre completo/i), {
      target: { value: 'Diego Martínez' },
    });
    fireEvent.change(screen.getByLabelText(/Correo electrónico/i), {
      target: { value: 'diego.retry@example.com' },
    });
    fireEvent.change(screen.getByLabelText(/^Contraseña$/i), {
      target: { value: 'password123' },
    });
    fireEvent.change(screen.getByLabelText(/Confirmar contraseña/i), {
      target: { value: 'password123' },
    });
    fireEvent.click(screen.getByLabelText(/Acepto los términos y condiciones/i));

    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(mockPush).toHaveBeenCalledWith('/login?registered=1');
    });
  });
});
