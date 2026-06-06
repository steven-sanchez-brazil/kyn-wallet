import React from 'react';
import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import RegisterPage from '@/app/register/page';
import { RegisterService } from '@/lib/services/RegisterService';

const mockPush = vi.fn();

vi.mock('next/navigation', () => ({
  useRouter: () => ({
    push: mockPush,
  }),
}));

describe('RegisterPage integration', () => {
  it('renderiza pantalla de registro con formulario', () => {
    render(<RegisterPage />);

    expect(screen.getByRole('heading', { name: /Crear cuenta/i })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /Google/i })).toBeInTheDocument();
  });

  it('mantiene estructura responsive de dos paneles en desktop', () => {
    const { container } = render(<RegisterPage />);

    const main = container.querySelector('main');
    expect(main).toHaveClass('min-h-screen', 'flex');

    const brandPanel = container.querySelector('.hidden.lg\\:flex');
    expect(brandPanel).toBeInTheDocument();

    let formContainer: HTMLElement | null = screen
      .getByRole('heading', { name: /Crear cuenta/i })
      .closest('div');

    while (formContainer && !formContainer.className.includes('lg:w-1/2')) {
      formContainer = formContainer.parentElement;
    }

    expect(formContainer).toBeInTheDocument();
    expect(formContainer).toHaveClass('w-full', 'lg:w-1/2');
  });

  it('completa registro valido y redirige a login', async () => {
    vi.spyOn(RegisterService, 'register').mockResolvedValue({
      success: true,
      message: 'Cuenta creada con exito para Leo Diaz',
      redirectTo: '/login',
    });

    render(<RegisterPage />);

    fireEvent.change(screen.getByLabelText(/Nombre completo/i), {
      target: { value: 'Leo Diaz' },
    });
    fireEvent.change(screen.getByLabelText(/Correo electronico/i), {
      target: { value: 'leo@correo.com' },
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
  });
});
