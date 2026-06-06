import { render, screen } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import RegisterPage from './register/page';
import React from 'react';

vi.mock('next/navigation', () => ({
  useRouter: () => ({ push: vi.fn() }),
}));

describe('Register route (/register)', () => {
  it('renders Brand Panel + Form Panel with key elements', () => {
    render(<RegisterPage />);

    // Brand Panel
    expect(screen.getByText('KynWallet')).toBeInTheDocument();
    expect(screen.getByText('camino financiero.')).toBeInTheDocument();

    // Form Panel
    expect(
      screen.getByRole('heading', { name: 'Crea tu cuenta' })
    ).toBeInTheDocument();
    expect(screen.getByLabelText('Nombre completo')).toBeInTheDocument();
    expect(screen.getByLabelText('Correo electrónico')).toBeInTheDocument();
    expect(
      screen.getByRole('button', { name: /Crear cuenta/i })
    ).toBeInTheDocument();
    expect(screen.getByText('o regístrate con')).toBeInTheDocument();
  });
});
