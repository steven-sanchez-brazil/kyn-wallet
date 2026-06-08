import { render, screen } from '@testing-library/react';
import RegisterPage from './page';

vi.mock('next/navigation', () => ({
  useRouter: () => ({ push: vi.fn() }),
}));

describe('RegisterPage', () => {
  it('renders BrandPanel component', () => {
    render(<RegisterPage />);
    expect(screen.getByText('KynWallet')).toBeInTheDocument();
  });

  it('renders RegisterForm component', () => {
    render(<RegisterPage />);
    expect(screen.getByText('Crea tu cuenta')).toBeInTheDocument();
  });

  it('BrandPanel has hidden class for mobile and visible for desktop', () => {
    render(<RegisterPage />);
    const brandPanel = screen.getByText('KynWallet').closest('div[class*="hidden"]');
    expect(brandPanel).toBeInTheDocument();
    expect(brandPanel?.className).toContain('lg:flex');
  });

  it('form container takes full width on mobile and half on desktop', () => {
    const { container } = render(<RegisterPage />);
    const mainEl = container.querySelector('main');
    const formDiv = mainEl?.querySelector('div.w-full.lg\\:w-1\\/2');
    expect(formDiv).toBeInTheDocument();
  });
});
