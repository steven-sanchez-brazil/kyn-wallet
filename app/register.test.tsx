import { render, screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import RegistrationPage from './register/page';
import React from 'react';

vi.mock('next/navigation', () => ({
  useRouter: () => ({
    push: vi.fn(),
  }),
}));

describe('Register page integration', () => {
  it('renders registration page with brand panel and form', () => {
    const { container } = render(<RegistrationPage />);

    expect(screen.getByRole('heading', { name: /Crea tu cuenta/i })).toBeInTheDocument();

    const MainElement = container.querySelector('main');
    expect(MainElement).not.toBeNull();
    expect(MainElement?.className).toContain('flex');

    const BrandPanel = container.querySelector('.hidden.lg\\:flex');
    expect(BrandPanel).not.toBeNull();
  });

  it('keeps responsive structure for desktop and mobile behavior', () => {
    const { container } = render(<RegistrationPage />);

    const Sections = Array.from(container.querySelectorAll('section'));
    const FormContainer = Sections.find((section) => section.className.includes('lg:w-1/2'));
    expect(FormContainer).not.toBeNull();
    expect(FormContainer?.className).toContain('w-full');
    expect(FormContainer?.className).toContain('lg:w-1/2');

    const BrandPanel = container.querySelector('.hidden.lg\\:flex');
    expect(BrandPanel?.className).toContain('hidden');
    expect(BrandPanel?.className).toContain('lg:flex');
  });
});
