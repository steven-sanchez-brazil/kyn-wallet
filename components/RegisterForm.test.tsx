import React from 'react';
import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import RegisterForm from '@/components/RegisterForm';
import { RegisterService } from '@/lib/services/RegisterService';

const mockPush = vi.fn();

vi.mock('next/navigation', () => ({
  useRouter: () => ({
    push: mockPush,
  }),
}));

describe('RegisterForm', () => {
  it('muestra errores inline y bloquea submit con datos invalidos', async () => {
    const registerSpy = vi.spyOn(RegisterService, 'register');

    render(<RegisterForm />);

    fireEvent.click(screen.getByRole('button', { name: /Crear cuenta/i }));

    expect(
      await screen.findByText(/El nombre completo es obligatorio/i)
    ).toBeInTheDocument();
    expect(
      screen.getByText(/Debes aceptar los terminos y condiciones/i)
    ).toBeInTheDocument();
    expect(registerSpy).not.toHaveBeenCalled();
  });

  it('redirige a /login con mensaje al registrar datos validos', async () => {
    vi.spyOn(RegisterService, 'register').mockResolvedValue({
      success: true,
      message: 'Cuenta creada con exito para Ana Perez',
      redirectTo: '/login',
    });

    render(<RegisterForm />);

    fireEvent.change(screen.getByLabelText(/Nombre completo/i), {
      target: { value: 'Ana Perez' },
    });
    fireEvent.change(screen.getByLabelText(/Correo electronico/i), {
      target: { value: 'ana@correo.com' },
    });
    fireEvent.change(screen.getByLabelText(/^Contrasena$/i), {
      target: { value: 'password123' },
    });
    fireEvent.change(screen.getByLabelText(/Confirmar contrasena/i), {
      target: { value: 'password123' },
    });
    fireEvent.click(screen.getByLabelText(/Acepto los terminos y condiciones/i));

    fireEvent.click(screen.getByRole('button', { name: /Crear cuenta/i }));

    await waitFor(() => {
      expect(mockPush).toHaveBeenCalled();
    });

    expect(mockPush.mock.calls[0][0]).toContain('/login?registroExitoso=1&mensaje=');
  });
});
