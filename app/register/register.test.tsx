import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import RegisterForm from '@/components/RegisterForm';

const mockPush = vi.fn();

vi.mock('next/navigation', () => ({
  useRouter: () => ({
    push: mockPush,
  }),
}));

describe('RegisterForm validation and submit states', () => {
  beforeEach(() => {
    mockPush.mockReset();
  });

  it('shows inline errors for invalid input', async () => {
    render(<RegisterForm />);

    fireEvent.click(screen.getByRole('button', { name: /crear cuenta/i }));

    await waitFor(() => {
      expect(screen.getByText(/ingresa nombre y apellido válidos/i)).toBeInTheDocument();
      expect(screen.getByText(/formato de correo inválido/i)).toBeInTheDocument();
      expect(screen.getByText(/la contraseña debe tener al menos 8 caracteres/i)).toBeInTheDocument();
      expect(screen.getByText(/debes aceptar términos y condiciones/i)).toBeInTheDocument();
    });
  });

  it('disables submit and shows loading while submitting', async () => {
    render(<RegisterForm />);

    fireEvent.change(screen.getByLabelText(/nombre completo/i), {
      target: { value: 'Persona Nueva' },
    });
    fireEvent.change(screen.getByLabelText(/correo electrónico/i), {
      target: { value: 'persona.unica@ejemplo.com' },
    });
    fireEvent.change(screen.getByLabelText(/^contraseña$/i), {
      target: { value: 'password123' },
    });
    fireEvent.change(screen.getByLabelText(/confirmar contraseña/i), {
      target: { value: 'password123' },
    });
    fireEvent.click(screen.getByLabelText(/acepto términos y condiciones/i));

    fireEvent.click(screen.getByRole('button', { name: /crear cuenta/i }));

    await waitFor(() => {
      expect(screen.getByRole('button', { name: /creando cuenta/i })).toBeDisabled();
    });
  });

  it('shows transient error and allows retry', async () => {
    render(<RegisterForm />);

    fireEvent.change(screen.getByLabelText(/nombre completo/i), {
      target: { value: 'Persona Nueva' },
    });
    fireEvent.change(screen.getByLabelText(/correo electrónico/i), {
      target: { value: 'timeout@ejemplo.com' },
    });
    fireEvent.change(screen.getByLabelText(/^contraseña$/i), {
      target: { value: 'password123' },
    });
    fireEvent.change(screen.getByLabelText(/confirmar contraseña/i), {
      target: { value: 'password123' },
    });
    fireEvent.click(screen.getByLabelText(/acepto términos y condiciones/i));

    fireEvent.click(screen.getByRole('button', { name: /crear cuenta/i }));

    await waitFor(() => {
      expect(screen.getByText(/no pudimos crear tu cuenta\. intenta nuevamente\./i)).toBeInTheDocument();
      expect(screen.getByRole('button', { name: /crear cuenta/i })).toBeEnabled();
    });
  });
});
