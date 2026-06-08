import React from 'react';
import { render, screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import RegisterPage from './register/page';

vi.mock('next/navigation', () => ({
  useRouter: () => ({ push: vi.fn() }),
}));

describe('Register page responsive behavior', () => {
  it('keeps register form accessible in mobile-first render', () => {
    render(<RegisterPage />);

    expect(screen.getByRole('heading', { name: /Crea tu cuenta/i })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /Crear cuenta/i })).toBeInTheDocument();
  });
});
