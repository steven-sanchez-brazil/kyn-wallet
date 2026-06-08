import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { vi } from 'vitest';
import RegisterForm from './RegisterForm';

const mockPush = vi.fn();
vi.mock('next/navigation', () => ({
  useRouter: () => ({ push: mockPush }),
}));

describe('RegisterForm', () => {
  beforeEach(() => {
    mockPush.mockClear();
  });

  it('renders all form fields', () => {
    render(<RegisterForm />);
    expect(screen.getByLabelText('Nombre completo')).toBeInTheDocument();
    expect(screen.getByLabelText('Correo electrónico')).toBeInTheDocument();
    expect(screen.getByLabelText('Contraseña')).toBeInTheDocument();
    expect(screen.getByLabelText('Confirmar contraseña')).toBeInTheDocument();
    expect(screen.getByRole('checkbox')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /crear cuenta/i })).toBeInTheDocument();
  });

  it('renders heading and subtitle', () => {
    render(<RegisterForm />);
    expect(screen.getByText('Crea tu cuenta')).toBeInTheDocument();
    expect(screen.getByText('Completa tus datos para comenzar')).toBeInTheDocument();
  });

  it('shows errors when submitting empty form', async () => {
    render(<RegisterForm />);
    fireEvent.click(screen.getByRole('button', { name: /crear cuenta/i }));

    await waitFor(() => {
      expect(screen.getByText('El nombre completo es obligatorio')).toBeInTheDocument();
      expect(screen.getByText('El correo electrónico es obligatorio')).toBeInTheDocument();
      expect(screen.getByText('La contraseña es obligatoria')).toBeInTheDocument();
      expect(screen.getByText('Confirmar contraseña es obligatorio')).toBeInTheDocument();
      expect(screen.getByText('Debes aceptar los términos y condiciones')).toBeInTheDocument();
    });
  });

  it('submits valid form and redirects to /login?registered=true', async () => {
    render(<RegisterForm />);

    fireEvent.change(screen.getByLabelText('Nombre completo'), { target: { value: 'Juan Pérez' } });
    fireEvent.change(screen.getByLabelText('Correo electrónico'), { target: { value: 'juan@ejemplo.com' } });
    fireEvent.change(screen.getByLabelText('Contraseña'), { target: { value: 'password123' } });
    fireEvent.change(screen.getByLabelText('Confirmar contraseña'), { target: { value: 'password123' } });
    fireEvent.click(screen.getByRole('checkbox'));

    fireEvent.click(screen.getByRole('button', { name: /crear cuenta/i }));

    await waitFor(() => {
      expect(mockPush).toHaveBeenCalledWith('/login?registered=true');
    });
  });

  it('does not redirect when form has validation errors', async () => {
    render(<RegisterForm />);

    fireEvent.change(screen.getByLabelText('Nombre completo'), { target: { value: 'Juan' } });
    fireEvent.change(screen.getByLabelText('Correo electrónico'), { target: { value: 'invalid' } });
    fireEvent.change(screen.getByLabelText('Contraseña'), { target: { value: 'short' } });
    fireEvent.change(screen.getByLabelText('Confirmar contraseña'), { target: { value: 'different' } });

    fireEvent.click(screen.getByRole('button', { name: /crear cuenta/i }));

    await waitFor(() => {
      expect(mockPush).not.toHaveBeenCalled();
    });
  });

  // US2: Validation on blur tests
  describe('on blur validations', () => {
    it('shows email error on blur with invalid email', () => {
      render(<RegisterForm />);
      const emailInput = screen.getByLabelText('Correo electrónico');
      fireEvent.change(emailInput, { target: { value: 'invalido' } });
      fireEvent.blur(emailInput);
      expect(screen.getByText('Formato de correo inválido')).toBeInTheDocument();
    });

    it('shows password error on blur with short password', () => {
      render(<RegisterForm />);
      const passwordInput = screen.getByLabelText('Contraseña');
      fireEvent.change(passwordInput, { target: { value: '123' } });
      fireEvent.blur(passwordInput);
      expect(screen.getByText('La contraseña debe tener al menos 8 caracteres')).toBeInTheDocument();
    });

    it('shows confirm password error on blur when passwords do not match', () => {
      render(<RegisterForm />);
      const passwordInput = screen.getByLabelText('Contraseña');
      const confirmInput = screen.getByLabelText('Confirmar contraseña');
      fireEvent.change(passwordInput, { target: { value: 'password123' } });
      fireEvent.change(confirmInput, { target: { value: 'different123' } });
      fireEvent.blur(confirmInput);
      expect(screen.getByText('Las contraseñas no coinciden')).toBeInTheDocument();
    });

    it('shows full name error on blur when empty', () => {
      render(<RegisterForm />);
      const nameInput = screen.getByLabelText('Nombre completo');
      fireEvent.change(nameInput, { target: { value: '   ' } });
      fireEvent.blur(nameInput);
      expect(screen.getByText('El nombre completo es obligatorio')).toBeInTheDocument();
    });

    it('clears error when valid value is entered and blurred', () => {
      render(<RegisterForm />);
      const emailInput = screen.getByLabelText('Correo electrónico');
      fireEvent.change(emailInput, { target: { value: 'invalido' } });
      fireEvent.blur(emailInput);
      expect(screen.getByText('Formato de correo inválido')).toBeInTheDocument();

      fireEvent.change(emailInput, { target: { value: 'valido@ejemplo.com' } });
      fireEvent.blur(emailInput);
      expect(screen.queryByText('Formato de correo inválido')).not.toBeInTheDocument();
    });

    it('shows terms error on submit without accepting terms', async () => {
      render(<RegisterForm />);
      fireEvent.change(screen.getByLabelText('Nombre completo'), { target: { value: 'Juan' } });
      fireEvent.change(screen.getByLabelText('Correo electrónico'), { target: { value: 'juan@ej.com' } });
      fireEvent.change(screen.getByLabelText('Contraseña'), { target: { value: 'password123' } });
      fireEvent.change(screen.getByLabelText('Confirmar contraseña'), { target: { value: 'password123' } });
      // Do NOT check the terms checkbox
      fireEvent.click(screen.getByRole('button', { name: /crear cuenta/i }));

      await waitFor(() => {
        expect(screen.getByText('Debes aceptar los términos y condiciones')).toBeInTheDocument();
        expect(mockPush).not.toHaveBeenCalled();
      });
    });
  });

  // US4: Social buttons and login link tests
  describe('social buttons and login link', () => {
    it('renders SocialLogins component', () => {
      render(<RegisterForm />);
      expect(screen.getByText('Google')).toBeInTheDocument();
      expect(screen.getByText('Apple')).toBeInTheDocument();
    });

    it('renders login link', () => {
      render(<RegisterForm />);
      expect(screen.getByText('¿Ya tienes cuenta?')).toBeInTheDocument();
      expect(screen.getByText('Inicia sesión')).toBeInTheDocument();
    });

    it('navigates to /login when login link is clicked', () => {
      render(<RegisterForm />);
      fireEvent.click(screen.getByText('Inicia sesión'));
      expect(mockPush).toHaveBeenCalledWith('/login');
    });

    it('shows alert when Google button is clicked', () => {
      const alertMock = vi.spyOn(window, 'alert').mockImplementation(() => {});
      render(<RegisterForm />);
      fireEvent.click(screen.getByText('Google'));
      expect(alertMock).toHaveBeenCalledWith('Google estará disponible próximamente.');
      alertMock.mockRestore();
    });

    it('shows alert when Apple button is clicked', () => {
      const alertMock = vi.spyOn(window, 'alert').mockImplementation(() => {});
      render(<RegisterForm />);
      fireEvent.click(screen.getByText('Apple'));
      expect(alertMock).toHaveBeenCalledWith('Apple estará disponible próximamente.');
      alertMock.mockRestore();
    });
  });

  // FR-013: Password visibility toggle
  describe('password visibility toggle', () => {
    it('toggles password field visibility when eye icon is clicked', () => {
      render(<RegisterForm />);
      const passwordInput = screen.getByLabelText('Contraseña');
      expect(passwordInput).toHaveAttribute('type', 'password');

      const toggleButtons = screen.getAllByLabelText('Mostrar/Ocultar contraseña');
      fireEvent.click(toggleButtons[0]);
      expect(passwordInput).toHaveAttribute('type', 'text');

      fireEvent.click(toggleButtons[0]);
      expect(passwordInput).toHaveAttribute('type', 'password');
    });

    it('toggles confirmPassword field visibility when eye icon is clicked', () => {
      render(<RegisterForm />);
      const confirmInput = screen.getByLabelText('Confirmar contraseña');
      expect(confirmInput).toHaveAttribute('type', 'password');

      const toggleButtons = screen.getAllByLabelText('Mostrar/Ocultar contraseña');
      fireEvent.click(toggleButtons[1]);
      expect(confirmInput).toHaveAttribute('type', 'text');

      fireEvent.click(toggleButtons[1]);
      expect(confirmInput).toHaveAttribute('type', 'password');
    });
  });

  // FR-015: Terms and conditions link
  describe('terms and conditions link', () => {
    it('shows alert "Próximamente" when términos y condiciones is clicked', () => {
      const alertMock = vi.spyOn(window, 'alert').mockImplementation(() => {});
      render(<RegisterForm />);
      fireEvent.click(screen.getByText('términos y condiciones'));
      expect(alertMock).toHaveBeenCalledWith('Próximamente');
      alertMock.mockRestore();
    });

    it('does not toggle checkbox when T&C link is clicked', () => {
      const alertMock = vi.spyOn(window, 'alert').mockImplementation(() => {});
      render(<RegisterForm />);
      const checkbox = screen.getByRole('checkbox');
      expect(checkbox).not.toBeChecked();
      fireEvent.click(screen.getByText('términos y condiciones'));
      expect(checkbox).not.toBeChecked();
      alertMock.mockRestore();
    });
  });
});
