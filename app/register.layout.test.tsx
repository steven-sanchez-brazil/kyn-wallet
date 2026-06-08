import React from 'react';
import { render, screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import RegisterPage from './register/page';

vi.mock('next/navigation', () => ({
  useRouter: () => ({ push: vi.fn() }),
}));

describe('Register page layout (desktop intent)', () => {
  it('renders split layout with brand panel and register form', () => {
    render(<RegisterPage />);

    expect(screen.getByRole('heading', { name: /crea tu cuenta/i })).toBeInTheDocument();
    expect(screen.getByTestId('brand-panel')).toBeInTheDocument();
    expect(screen.getByTestId('register-form')).toBeInTheDocument();
    expect(screen.getByTestId('brand-headlines')).toBeInTheDocument();
    expect(screen.getByTestId('card-mockup')).toBeInTheDocument();
  });
});
