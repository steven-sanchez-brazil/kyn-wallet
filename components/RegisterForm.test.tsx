import React from 'react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import RegisterForm from './RegisterForm';
import * as AuthServiceModule from '../lib/services/AuthService';

vi.mock('next/navigation', () => ({
  useRouter: () => ({ push: vi.fn() }),
  useSearchParams: () => ({ get: vi.fn() }),
}));

vi.mock('../lib/services/AuthService', () => ({
  AuthService: {
    register: vi.fn(),
  },
}));

const fillValidForm = () => {
  fireEvent.change(screen.getByLabelText(/nombre completo/i), { target: { value: 'Ana García' } });
  fireEvent.change(screen.getByLabelText(/correo electrónico/i), { target: { value: 'ana@test.com' } });
  fireEvent.change(screen.getByLabelText(/^contraseña$/i), { target: { value: 'secure123' } });
  fireEvent.change(screen.getByLabelText(/confirmar contraseña/i), { target: { value: 'secure123' } });
  fireEvent.click(screen.getByRole('checkbox'));
};

describe('RegisterForm', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  // ── US1: Registro exitoso ──────────────────────────────────────────────────

  it('renders all form fields', () => {
    render(<RegisterForm onSuccess={vi.fn()} />);
    expect(screen.getByLabelText(/nombre completo/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/correo electrónico/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/^contraseña$/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/confirmar contraseña/i)).toBeInTheDocument();
    expect(screen.getByRole('checkbox')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /crear cuenta/i })).toBeInTheDocument();
  });

  it('calls AuthService.register and onSuccess on valid submission', async () => {
    const mockRegister = vi.spyOn(AuthServiceModule.AuthService, 'register').mockResolvedValue({ Success: true });
    const onSuccess = vi.fn();
    render(<RegisterForm onSuccess={onSuccess} />);

    fillValidForm();
    fireEvent.click(screen.getByRole('button', { name: /crear cuenta/i }));

    await waitFor(() => {
      expect(mockRegister).toHaveBeenCalledWith({
        FullName: 'Ana García',
        Email: 'ana@test.com',
        Password: 'secure123',
      });
      expect(onSuccess).toHaveBeenCalledTimes(1);
    });
  });

  it('shows inline error when email already exists', async () => {
    vi.spyOn(AuthServiceModule.AuthService, 'register').mockResolvedValue({
      Success: false,
      Error: 'EMAIL_EXISTS',
    });
    render(<RegisterForm onSuccess={vi.fn()} />);

    fillValidForm();
    fireEvent.click(screen.getByRole('button', { name: /crear cuenta/i }));

    await waitFor(() => {
      expect(screen.getByText(/correo ya está registrado/i)).toBeInTheDocument();
    });
  });

  // ── US2: Validaciones inline ──────────────────────────────────────────────

  it('shows fullName error on blur when empty', () => {
    render(<RegisterForm onSuccess={vi.fn()} />);
    const input = screen.getByLabelText(/nombre completo/i);
    fireEvent.blur(input);
    expect(screen.getByText(/nombre completo es obligatorio/i)).toBeInTheDocument();
  });

  it('shows fullName error on blur when too short', () => {
    render(<RegisterForm onSuccess={vi.fn()} />);
    const input = screen.getByLabelText(/nombre completo/i);
    fireEvent.change(input, { target: { value: 'A' } });
    fireEvent.blur(input);
    expect(screen.getByText(/al menos 2 caracteres/i)).toBeInTheDocument();
  });

  it('shows email error on blur when empty', () => {
    render(<RegisterForm onSuccess={vi.fn()} />);
    fireEvent.blur(screen.getByLabelText(/correo electrónico/i));
    expect(screen.getByText(/correo electrónico es obligatorio/i)).toBeInTheDocument();
  });

  it('shows email error on blur when invalid format', () => {
    render(<RegisterForm onSuccess={vi.fn()} />);
    const input = screen.getByLabelText(/correo electrónico/i);
    fireEvent.change(input, { target: { value: 'notanemail' } });
    fireEvent.blur(input);
    expect(screen.getByText(/correo electrónico válido/i)).toBeInTheDocument();
  });

  it('shows password error on blur when too short', () => {
    render(<RegisterForm onSuccess={vi.fn()} />);
    const input = screen.getByLabelText(/^contraseña$/i);
    fireEvent.change(input, { target: { value: 'short' } });
    fireEvent.blur(input);
    expect(screen.getByText(/al menos 8 caracteres/i)).toBeInTheDocument();
  });

  it('shows confirmPassword mismatch error on change', () => {
    render(<RegisterForm onSuccess={vi.fn()} />);
    fireEvent.change(screen.getByLabelText(/^contraseña$/i), { target: { value: 'secure123' } });
    const confirm = screen.getByLabelText(/confirmar contraseña/i);
    fireEvent.change(confirm, { target: { value: 'different' } });
    fireEvent.blur(confirm);
    expect(screen.getByText(/contraseñas no coinciden/i)).toBeInTheDocument();
  });

  // ── US3: Habilitación del botón ───────────────────────────────────────────

  it('button is disabled by default', () => {
    render(<RegisterForm onSuccess={vi.fn()} />);
    expect(screen.getByRole('button', { name: /crear cuenta/i })).toBeDisabled();
  });

  it('button is disabled when fields are valid but checkbox is unchecked', () => {
    render(<RegisterForm onSuccess={vi.fn()} />);
    fireEvent.change(screen.getByLabelText(/nombre completo/i), { target: { value: 'Ana García' } });
    fireEvent.change(screen.getByLabelText(/correo electrónico/i), { target: { value: 'ana@test.com' } });
    fireEvent.change(screen.getByLabelText(/^contraseña$/i), { target: { value: 'secure123' } });
    fireEvent.change(screen.getByLabelText(/confirmar contraseña/i), { target: { value: 'secure123' } });
    expect(screen.getByRole('button', { name: /crear cuenta/i })).toBeDisabled();
  });

  it('button is enabled when all fields are valid and checkbox is checked', () => {
    render(<RegisterForm onSuccess={vi.fn()} />);
    fillValidForm();
    expect(screen.getByRole('button', { name: /crear cuenta/i })).not.toBeDisabled();
  });

  it('button becomes disabled again when checkbox is unchecked', () => {
    render(<RegisterForm onSuccess={vi.fn()} />);
    fillValidForm();
    fireEvent.click(screen.getByRole('checkbox'));
    expect(screen.getByRole('button', { name: /crear cuenta/i })).toBeDisabled();
  });

  // ── US4: Social login ─────────────────────────────────────────────────────

  it('shows alert with "Próximamente" when Google button is clicked', () => {
    const alertSpy = vi.spyOn(window, 'alert').mockImplementation(() => {});
    render(<RegisterForm onSuccess={vi.fn()} />);
    fireEvent.click(screen.getByRole('button', { name: /google/i }));
    expect(alertSpy).toHaveBeenCalledWith(expect.stringMatching(/próximamente/i));
    alertSpy.mockRestore();
  });

  it('shows alert with "Próximamente" when Apple button is clicked', () => {
    const alertSpy = vi.spyOn(window, 'alert').mockImplementation(() => {});
    render(<RegisterForm onSuccess={vi.fn()} />);
    fireEvent.click(screen.getByRole('button', { name: /apple/i }));
    expect(alertSpy).toHaveBeenCalledWith(expect.stringMatching(/próximamente/i));
    alertSpy.mockRestore();
  });

  // ── US5: Navegación ───────────────────────────────────────────────────────

  it('renders a link to the login page', () => {
    render(<RegisterForm onSuccess={vi.fn()} />);
    const link = screen.getByRole('link', { name: /inicia sesión/i });
    expect(link).toBeInTheDocument();
    expect(link).toHaveAttribute('href', '/login');
  });
});
