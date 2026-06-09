import { render, screen } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import LoginPage from './page';
import React from 'react';

const mockParams = new URLSearchParams();

vi.mock('next/navigation', () => ({
  useRouter: () => ({ push: vi.fn() }),
  useSearchParams: () => mockParams,
}));

describe('LoginPage success banner', () => {
  it('should show a success message when registered=true', () => {
    mockParams.set('registered', 'true');
    render(<LoginPage />);
    expect(
      screen.getByText(/¡Cuenta creada exitosamente!/i)
    ).toBeInTheDocument();
  });

  it('should not show the success message without the query param', () => {
    mockParams.delete('registered');
    render(<LoginPage />);
    expect(
      screen.queryByText(/¡Cuenta creada exitosamente!/i)
    ).not.toBeInTheDocument();
  });
});
