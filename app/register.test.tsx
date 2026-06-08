import { render, screen } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import React from 'react';

// Stub BrandPanel and RegisterForm
vi.mock('@/components/BrandPanel', () => ({
  default: () => <div data-testid="brand-panel">BrandPanel</div>,
}));

vi.mock('@/components/RegisterForm', () => ({
  default: () => <div data-testid="register-form">RegisterForm</div>,
}));

import RegisterPage from './register/page';

describe('RegisterPage', () => {
  it('should render without errors', () => {
    expect(() => render(<RegisterPage />)).not.toThrow();
  });

  it('should render BrandPanel', () => {
    render(<RegisterPage />);
    expect(screen.getByTestId('brand-panel')).toBeInTheDocument();
  });

  it('should render RegisterForm', () => {
    render(<RegisterPage />);
    expect(screen.getByTestId('register-form')).toBeInTheDocument();
  });

  it('should have correct layout structure (min-h-screen flex)', () => {
    render(<RegisterPage />);
    const main = screen.getByRole('main');
    expect(main).toHaveClass('min-h-screen');
    expect(main).toHaveClass('flex');
  });
});
