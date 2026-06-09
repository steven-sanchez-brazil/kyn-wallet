import { RegisterRequest, RegisterValidationResult } from '../types/Auth';

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

/**
 * Requiere al menos nombre y apellido; permite letras acentuadas y separadores comunes.
 */
export const validateFullName = (fullName: string): boolean => {
  const normalized = fullName.trim();
  const fullNameRegex = /^[A-Za-zÀ-ÖØ-öø-ÿ'\- ]{3,}$/;
  return normalized.split(/\s+/).length >= 2 && fullNameRegex.test(normalized);
};

export const validatePasswordConfirmation = (
  password: string,
  confirmPassword: string
): boolean => {
  return password === confirmPassword;
};

export const validateRegisterRequest = (
  payload: RegisterRequest
): RegisterValidationResult => {
  const Errores: RegisterValidationResult['Errores'] = {};

  if (!validateFullName(payload.NombreCompleto)) {
    Errores.NombreCompleto = 'Ingresa nombre y apellido válidos';
  }

  if (!validateEmail(payload.CorreoElectronico)) {
    Errores.CorreoElectronico = 'Formato de correo inválido';
  }

  if (!validatePassword(payload.Contrasena)) {
    Errores.Contrasena = 'La contraseña debe tener al menos 8 caracteres';
  }

  if (!validatePasswordConfirmation(payload.Contrasena, payload.ConfirmarContrasena)) {
    Errores.ConfirmarContrasena = 'Las contraseñas no coinciden';
  }

  if (!payload.AceptaTerminos) {
    Errores.AceptaTerminos = 'Debes aceptar términos y condiciones';
  }

  return {
    EsValido: Object.keys(Errores).length === 0,
    Errores,
  };
};
