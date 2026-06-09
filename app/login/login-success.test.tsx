import { render, screen, waitFor } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import LoginForm from '@/components/LoginForm';

const mockReplace = vi.fn();

vi.mock('next/navigation', () => ({
  useRouter: () => ({
    push: vi.fn(),
    replace: mockReplace,
  }),
  useSearchParams: () => ({
    get: (key: string) => (key === 'registered' ? '1' : null),
  }),
}));

describe('Login success message from register redirect', () => {
  it('renders success message and clears query', async () => {
    render(<LoginForm />);

    await waitFor(() => {
      expect(screen.getByText(/tu cuenta fue creada con éxito/i)).toBeInTheDocument();
      expect(mockReplace).toHaveBeenCalledWith('/login');
    });
  });
});
