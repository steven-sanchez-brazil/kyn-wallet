import React from 'react';
import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import RegisterForm from './RegisterForm';

vi.mock('next/navigation', () => ({
  useRouter: () => ({ push: vi.fn() }),
}));

describe('RegisterForm validation UI', () => {
  it('shows inline error for invalid email', async () => {
    render(<RegisterForm />);

    fireEvent.change(screen.getByLabelText(/Correo electronico/i), {
      target: { value: 'correo-invalido' },
    });

    await waitFor(() => {
      expect(screen.getByText(/Formato de correo invalido/i)).toBeInTheDocument();
    });
  });

  it('shows terms error when checkbox is not selected', async () => {
    render(<RegisterForm />);

    fireEvent.change(screen.getByLabelText(/Nombre completo/i), { target: { value: 'Maria Perez' } });
    fireEvent.change(screen.getByLabelText(/Correo electronico/i), { target: { value: 'maria@ejemplo.com' } });
    fireEvent.change(screen.getByLabelText(/^Contrasena$/i), { target: { value: 'password123' } });
    fireEvent.change(screen.getByLabelText(/Confirmar contrasena/i), { target: { value: 'password123' } });

    fireEvent.click(screen.getByRole('button', { name: /Crear cuenta/i }));

    await waitFor(() => {
      expect(screen.getByText(/Debes aceptar los terminos y condiciones/i)).toBeInTheDocument();
    });
  });
});
