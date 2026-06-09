import { render, screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import RegisterPage from './page';

vi.mock('next/navigation', () => ({
  useRouter: () => ({
    push: vi.fn(),
  }),
}));

describe('Register page layout', () => {
  it('renders desktop/mobile layout containers and form', () => {
    const { container } = render(<RegisterPage />);

    expect(screen.getByRole('heading', { name: /crear cuenta/i })).toBeInTheDocument();
    expect(container.querySelector('main')).toHaveClass('min-h-screen', 'flex');
    expect(container.querySelector('.w-full')).toBeTruthy();
  });
});
