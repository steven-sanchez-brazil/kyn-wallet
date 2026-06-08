import React from 'react';
import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import RegisterForm from '@/components/RegisterForm';
import { UserStore } from '@/lib/services/UserStore';

const mockPush = vi.fn();

vi.mock('next/navigation', () => ({
  useRouter: () => ({
    push: mockPush,
  }),
}));

describe('Register integration', () => {
  beforeEach(() => {
    mockPush.mockReset();
    UserStore.reset();
  });

  it('registers a user successfully and redirects to login', async () => {
    render(<RegisterForm />);

    fireEvent.change(screen.getByLabelText(/Nombre completo/i), {
      target: { value: 'Maria Perez' },
    });
    fireEvent.change(screen.getByLabelText(/Correo electronico/i), {
      target: { value: 'maria@ejemplo.com' },
    });
    fireEvent.change(screen.getByLabelText(/^Contrasena$/i), {
      target: { value: 'password123' },
    });
    fireEvent.change(screen.getByLabelText(/Confirmar contrasena/i), {
      target: { value: 'password123' },
    });
    fireEvent.click(screen.getByLabelText(/Acepto los terminos y condiciones/i));

    fireEvent.click(screen.getByRole('button', { name: /Crear cuenta/i }));

    await waitFor(() => {
      expect(screen.getByText(/Cuenta creada exitosamente/i)).toBeInTheDocument();
    });

    await waitFor(() => {
      expect(mockPush).toHaveBeenCalledWith('/');
    });
  });

  it('shows field errors when payload is invalid', async () => {
    render(<RegisterForm />);

    fireEvent.change(screen.getByLabelText(/Correo electronico/i), {
      target: { value: 'correo-invalido' },
    });

    fireEvent.click(screen.getByRole('button', { name: /Crear cuenta/i }));

    await waitFor(() => {
      expect(screen.getByText(/Formato de correo invalido/i)).toBeInTheDocument();
    });
  });
});
