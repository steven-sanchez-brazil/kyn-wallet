import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import RegisterForm from './RegisterForm';
import React from 'react';

const mockPush = vi.fn();
vi.mock('next/navigation', () => ({
  useRouter: () => ({
    push: mockPush,
  }),
}));

const fillValidForm = (emailValue = 'nuevo-form@ejemplo.com') => {
  fireEvent.change(screen.getByLabelText('Nombre completo'), {
    target: { value: 'Diego Martínez' },
  });
  fireEvent.change(screen.getByLabelText('Correo electrónico'), {
    target: { value: emailValue },
  });
  fireEvent.change(screen.getByLabelText('Contraseña'), {
    target: { value: 'password123' },
  });
  fireEvent.change(screen.getByLabelText('Confirmar contraseña'), {
    target: { value: 'password123' },
  });
  fireEvent.click(screen.getByLabelText(/Acepto los/i));
};

describe('RegisterForm', () => {
  beforeEach(() => {
    mockPush.mockClear();
  });

  it('redirects to /construction on successful registration (US1)', async () => {
    render(<RegisterForm />);
    fillValidForm('exitoso@ejemplo.com');
    fireEvent.click(screen.getByRole('button', { name: /Crear cuenta/i }));

    await waitFor(
      () => expect(mockPush).toHaveBeenCalledWith('/construction'),
      { timeout: 2000 }
    );
  });

  it('blocks submit and shows message when name is empty (US2)', async () => {
    render(<RegisterForm />);
    fireEvent.click(screen.getByRole('button', { name: /Crear cuenta/i }));

    expect(await screen.findByText('El nombre es obligatorio')).toBeInTheDocument();
    expect(mockPush).not.toHaveBeenCalled();
  });

  it('shows invalid email message (US2)', async () => {
    render(<RegisterForm />);
    fillValidForm('correo-invalido');
    fireEvent.click(screen.getByRole('button', { name: /Crear cuenta/i }));

    expect(await screen.findByText('Formato de correo inválido')).toBeInTheDocument();
    expect(mockPush).not.toHaveBeenCalled();
  });

  it('shows password-mismatch message (US2)', async () => {
    render(<RegisterForm />);
    fillValidForm('mismatch@ejemplo.com');
    fireEvent.change(screen.getByLabelText('Confirmar contraseña'), {
      target: { value: 'password124' },
    });
    fireEvent.click(screen.getByRole('button', { name: /Crear cuenta/i }));

    expect(await screen.findByText('Las contraseñas no coinciden')).toBeInTheDocument();
    expect(mockPush).not.toHaveBeenCalled();
  });

  it('shows short-password message (US2)', async () => {
    render(<RegisterForm />);
    fireEvent.change(screen.getByLabelText('Nombre completo'), {
      target: { value: 'Diego' },
    });
    fireEvent.change(screen.getByLabelText('Correo electrónico'), {
      target: { value: 'corto@ejemplo.com' },
    });
    fireEvent.change(screen.getByLabelText('Contraseña'), {
      target: { value: 'short' },
    });
    fireEvent.change(screen.getByLabelText('Confirmar contraseña'), {
      target: { value: 'short' },
    });
    fireEvent.click(screen.getByLabelText(/Acepto los/i));
    fireEvent.click(screen.getByRole('button', { name: /Crear cuenta/i }));

    expect(
      await screen.findByText('La contraseña debe tener al menos 8 caracteres')
    ).toBeInTheDocument();
    expect(mockPush).not.toHaveBeenCalled();
  });

  it('requires accepting terms (US2)', async () => {
    render(<RegisterForm />);
    fireEvent.change(screen.getByLabelText('Nombre completo'), {
      target: { value: 'Diego Martínez' },
    });
    fireEvent.change(screen.getByLabelText('Correo electrónico'), {
      target: { value: 'sinterminos@ejemplo.com' },
    });
    fireEvent.change(screen.getByLabelText('Contraseña'), {
      target: { value: 'password123' },
    });
    fireEvent.change(screen.getByLabelText('Confirmar contraseña'), {
      target: { value: 'password123' },
    });
    fireEvent.click(screen.getByRole('button', { name: /Crear cuenta/i }));

    expect(
      await screen.findByText('Debes aceptar los términos y condiciones')
    ).toBeInTheDocument();
    expect(mockPush).not.toHaveBeenCalled();
  });

  it('shows duplicate-email message for an already registered email (US2)', async () => {
    render(<RegisterForm />);
    fillValidForm('tucorreo@ejemplo.com');
    fireEvent.click(screen.getByRole('button', { name: /Crear cuenta/i }));

    expect(
      await screen.findByText('Este correo ya está registrado')
    ).toBeInTheDocument();
    expect(mockPush).not.toHaveBeenCalled();
  });

  it('renders the login link pointing to / (US3)', () => {
    render(<RegisterForm />);
    const link = screen.getByRole('link', { name: /Inicia sesión/i });
    expect(link).toHaveAttribute('href', '/');
  });

  it('renders the social-login divider (US3)', () => {
    render(<RegisterForm />);
    expect(screen.getByText('o regístrate con')).toBeInTheDocument();
  });
});
