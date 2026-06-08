import { RegisterPayload } from '../types/Auth';

/**
 * Valida si un string tiene formato de correo electrónico válido.
 */
export const validateEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email.trim());
};

/**
 * Valida si una contraseña cumple con el mínimo de 8 caracteres.
 */
export const validatePassword = (password: string): boolean => {
  return password.length >= 8;
};

export const validateFullName = (fullName: string): boolean => {
  const trimmed = fullName.trim();
  return trimmed.length >= 2 && trimmed.length <= 80;
};

export const validateConfirmPassword = (password: string, confirmPassword: string): boolean => {
  return password === confirmPassword;
};

export const validateAcceptTerms = (acceptTerms: boolean): boolean => {
  return acceptTerms;
};

export const validateRegisterPayload = (payload: RegisterPayload): Record<string, string> => {
  const errors: Record<string, string> = {};

  if (!validateFullName(payload.FullName)) {
    errors.FullName = 'El nombre debe tener entre 2 y 80 caracteres.';
  }

  if (!validateEmail(payload.Email)) {
    errors.Email = 'Formato de correo invalido.';
  }

  if (!validatePassword(payload.Password)) {
    errors.Password = 'La contrasena debe tener al menos 8 caracteres.';
  }

  if (!validateConfirmPassword(payload.Password, payload.ConfirmPassword)) {
    errors.ConfirmPassword = 'Las contrasenas no coinciden.';
  }

  if (!validateAcceptTerms(payload.AcceptTerms)) {
    errors.AcceptTerms = 'Debes aceptar los terminos y condiciones.';
  }

  return errors;
};
