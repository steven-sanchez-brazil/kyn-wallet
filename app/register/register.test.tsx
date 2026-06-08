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

describe('RegisterPage', () => {
  it('renders register form and keeps brand panel hidden on mobile by class', () => {
    const { container } = render(<RegisterPage />);

    expect(screen.getByRole('heading', { name: /Crea tu cuenta/i })).toBeInTheDocument();
    expect(container.querySelector('.hidden.lg\\:flex')).toBeInTheDocument();
  });

  it('registers and redirects to /login with success query parameter', async () => {
    render(<RegisterPage />);

    fireEvent.change(screen.getByLabelText(/Nombre completo/i), {
      target: { value: 'Alicia Torres' },
    });
    fireEvent.change(screen.getByLabelText(/Correo electrónico/i), {
      target: { value: 'alicia.torres@example.com' },
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

  it('shows social coming soon alert text', () => {
    vi.spyOn(window, 'alert').mockImplementation(() => undefined);

    render(<RegisterPage />);

    fireEvent.click(screen.getByRole('button', { name: /Google/i }));

    expect(window.alert).toHaveBeenCalledWith('Próximamente');
  });
});
