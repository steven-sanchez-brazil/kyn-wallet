import React from 'react';
import { describe, expect, it, vi } from 'vitest';
import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import RegisterPage from './page';

const mockPush = vi.fn();

vi.mock('next/navigation', () => ({
  useRouter: () => ({
    push: mockPush,
  }),
}));

describe('RegisterPage Integration', () => {
  it('should render register-specific BrandPanel copy', () => {
    render(<RegisterPage />);

    expect(screen.getByText('Comienza tu camino financiero.')).toBeInTheDocument();
    expect(
      screen.getByText(
        'Crea tu cuenta en minutos y empieza a enviar, recibir y administrar tu dinero desde cualquier lugar.'
      )
    ).toBeInTheDocument();
  });

  it('should redirect to /login?registered=1 after successful registration', async () => {
    render(<RegisterPage />);

    fireEvent.change(screen.getByLabelText(/Nombre completo/i), {
      target: { value: 'Diego Martinez' },
    });
    fireEvent.change(screen.getByLabelText(/Correo electrónico/i), {
      target: { value: 'diego@ejemplo.com' },
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
});