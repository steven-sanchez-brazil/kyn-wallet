import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import RegisterPage from './page';

// Mock useRouter
import { vi } from 'vitest';
vi.mock('next/navigation', () => ({
  useRouter: () => ({
    push: vi.fn(),
  }),
}));

describe('RegisterPage Integration', () => {
  it('should render the registration page with brand panel and form', () => {
    render(<RegisterPage />);
    
    // Check for BrandPanel content (assuming it has some identifiable text or role)
    // For now, just check if the form is there
    expect(screen.getByRole('button', { name: /crear cuenta/i })).toBeInTheDocument();
  });
});
