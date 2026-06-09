import { render, screen } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import RegisterPage from './page';
import React from 'react';

vi.mock('next/navigation', () => ({
  useRouter: () => ({ push: vi.fn() }),
}));

describe('RegisterPage (/)', () => {
  it('should render the registration form on the home route', () => {
    render(<RegisterPage />);
    expect(
      screen.getByRole('heading', { name: /Crea tu cuenta/i })
    ).toBeInTheDocument();
    expect(
      screen.getByRole('button', { name: /Crear cuenta/i })
    ).toBeInTheDocument();
  });
});
