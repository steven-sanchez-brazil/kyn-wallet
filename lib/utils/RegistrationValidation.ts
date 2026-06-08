import {
  RegistrationCredentials,
  RegistrationValidationErrors,
  RegistrationValidationResult,
} from '../types/Registration';

export const validateRegistrationEmail = (email: string): string | null => {
  if (!email.trim()) {
    return 'El correo electrónico es obligatorio';
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    return 'Formato de correo inválido';
  }

  return null;
};

export const validateRegistrationPassword = (password: string): string | null => {
  if (!password) {
    return 'La contraseña es obligatoria';
  }

  if (password.length < 8) {
    return 'La contraseña debe tener al menos 8 caracteres';
  }

  return null;
};

export const validateRegistrationConfirmation = (
  password: string,
  confirmPassword: string
): string | null => {
  if (!confirmPassword) {
    return 'La confirmación de contraseña es obligatoria';
  }

  if (password !== confirmPassword) {
    return 'Las contraseñas no coinciden';
  }

  return null;
};

export const validateRegistrationCredentials = (
  credentials: RegistrationCredentials
): RegistrationValidationResult => {
  const errors: RegistrationValidationErrors = {};

  const emailError = validateRegistrationEmail(credentials.Email);
  const passwordError = validateRegistrationPassword(credentials.Password);
  const confirmationError = validateRegistrationConfirmation(
    credentials.Password,
    credentials.ConfirmPassword
  );

  if (emailError) {
    errors.Email = emailError;
  }

  if (passwordError) {
    errors.Password = passwordError;
  }

  if (confirmationError) {
    errors.ConfirmPassword = confirmationError;
  }

  return {
    IsValid: Object.keys(errors).length === 0,
    Errors: errors,
  };
};
