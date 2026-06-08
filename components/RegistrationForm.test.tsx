import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import RegistrationForm from './RegistrationForm';
import React from 'react';

vi.mock('next/navigation', () => ({
  useRouter: () => ({
    push: vi.fn(),
  }),
}));

describe('RegistrationForm UI', () => {
  it('should show validation error for invalid email', async () => {
    render(<RegistrationForm />);

    const emailInput = screen.getByLabelText(/Correo electrónico/i);
    fireEvent.change(emailInput, { target: { value: 'correo-invalido' } });

    await waitFor(() => {
      expect(screen.getByText(/Formato de correo inválido/i)).toBeInTheDocument();
    });
  });

  it('should show validation error when passwords do not match', async () => {
    render(<RegistrationForm />);

    fireEvent.change(screen.getByLabelText(/^Contraseña$/i), {
      target: { value: 'password123' },
    });
    fireEvent.change(screen.getByLabelText(/Confirmar contraseña/i), {
      target: { value: 'password456' },
    });

    await waitFor(() => {
      expect(screen.getByText(/Las contraseñas no coinciden/i)).toBeInTheDocument();
    });
  });

  it('should disable submit button when there are validation errors', async () => {
    render(<RegistrationForm />);

    fireEvent.change(screen.getByLabelText(/Correo electrónico/i), {
      target: { value: 'correo-invalido' },
    });

    const submitButton = screen.getByRole('button', { name: /Crear cuenta/i });

    await waitFor(() => {
      expect(submitButton).toBeDisabled();
    });
  });

  it('should keep responsive form container classes', () => {
    const { container } = render(<RegistrationForm />);
    const wrapper = container.querySelector('div.w-full.max-w-md.space-y-8');
    expect(wrapper).toBeInTheDocument();
  });
});
