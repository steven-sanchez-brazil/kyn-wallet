import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import RegistroPage from './page';
import React from 'react';

const mockPush = vi.fn();

vi.mock('next/navigation', () => ({
  useRouter: () => ({
    push: mockPush,
  }),
}));

describe('RegistroPage Integration', () => {
  it('should redirect to /construction on successful registration', async () => {
    render(<RegistroPage />);

    fireEvent.change(screen.getByLabelText(/Correo electrónico/i), {
      target: { value: `registro-${Date.now()}@ejemplo.com` },
    });
    fireEvent.change(screen.getByLabelText(/^Contraseña$/i), {
      target: { value: 'password123' },
    });
    fireEvent.change(screen.getByLabelText(/Confirmar contraseña/i), {
      target: { value: 'password123' },
    });
    fireEvent.click(screen.getByRole('button', { name: /Crear cuenta/i }));

    await waitFor(
      () => {
        expect(mockPush).toHaveBeenCalledWith('/construction');
      },
      { timeout: 2500 }
    );
  });

  it('should show a visible return-to-login action', () => {
    render(<RegistroPage />);

    const loginLink = screen.getByRole('link', { name: /Inicia sesión/i });
    expect(loginLink).toBeInTheDocument();
    expect(loginLink).toHaveAttribute('href', '/');
  });
});
