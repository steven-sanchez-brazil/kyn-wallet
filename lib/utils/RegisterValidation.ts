import { RegisterFormData, RegisterFormErrors } from '@/lib/types/Register';
import { validateEmail } from '@/lib/utils/Validation';

export const getEmptyRegisterErrors = (): RegisterFormErrors => ({
  fullName: null,
  email: null,
  password: null,
  confirmPassword: null,
  acceptTerms: null,
});

export const validateRegisterData = (data: RegisterFormData): RegisterFormErrors => {
  const errors = getEmptyRegisterErrors();
  const trimmedFullName = data.fullName.trim();
  const trimmedEmail = data.email.trim();

  if (!trimmedFullName) {
    errors.fullName = 'El nombre completo es obligatorio';
  }

  if (!trimmedEmail) {
    errors.email = 'El correo electronico es obligatorio';
  } else if (!validateEmail(trimmedEmail)) {
    errors.email = 'Ingresa un correo electronico valido';
  }

  if (!data.password) {
    errors.password = 'La contrasena es obligatoria';
  } else if (data.password.length < 8) {
    errors.password = 'La contrasena debe tener minimo 8 caracteres';
  }

  if (!data.confirmPassword) {
    errors.confirmPassword = 'Debes confirmar la contrasena';
  } else if (data.confirmPassword !== data.password) {
    errors.confirmPassword = 'Las contrasenas no coinciden';
  }

  if (!data.acceptTerms) {
    errors.acceptTerms = 'Debes aceptar los terminos y condiciones';
  }

  return errors;
};

export const hasRegisterErrors = (errors: RegisterFormErrors): boolean =>
  Object.values(errors).some((value) => value !== null);
