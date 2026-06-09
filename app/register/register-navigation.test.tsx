import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import RegisterForm from '@/components/RegisterForm';

const mockPush = vi.fn();

vi.mock('next/navigation', () => ({
  useRouter: () => ({
    push: mockPush,
  }),
}));

describe('Register navigation', () => {
  beforeEach(() => {
    mockPush.mockReset();
  });

  it('navigates to /login from link', () => {
    render(<RegisterForm />);

    fireEvent.click(screen.getByRole('button', { name: /inicia sesión/i }));

    expect(mockPush).toHaveBeenCalledWith('/login');
  });

  it('redirects to /login with query on successful register', async () => {
    render(<RegisterForm />);

    fireEvent.change(screen.getByLabelText(/nombre completo/i), {
      target: { value: 'Usuario Exito' },
    });
    fireEvent.change(screen.getByLabelText(/correo electrónico/i), {
      target: { value: 'usuario.exito@ejemplo.com' },
    });
    fireEvent.change(screen.getByLabelText(/^contraseña$/i), {
      target: { value: 'password123' },
    });
    fireEvent.change(screen.getByLabelText(/confirmar contraseña/i), {
      target: { value: 'password123' },
    });
    fireEvent.click(screen.getByLabelText(/acepto términos y condiciones/i));

    fireEvent.click(screen.getByRole('button', { name: /crear cuenta/i }));

    await waitFor(() => {
      expect(mockPush).toHaveBeenCalledWith('/login?registered=1');
    });
  });
});
