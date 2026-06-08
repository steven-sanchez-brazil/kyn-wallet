import { render, screen } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import RegistryPage from './page';
import React from 'react';

// Mock the RegisterForm component
vi.mock('../../components/RegisterForm', () => {
  return {
    default: () => <div data-testid="mock-register-form">Mocked Register Form</div>,
  };
});

describe('RegistryPage Route', () => {
  it('should render the mocked register form on the page', () => {
    render(<RegistryPage />);
    expect(screen.getByTestId('mock-register-form')).toBeInTheDocument();
  });
});