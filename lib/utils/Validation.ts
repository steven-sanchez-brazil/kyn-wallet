import { UsuarioRegistro, ValidationResult } from '../types/Auth';

/**
 * Valida si un string tiene formato de correo electrónico válido (texto@texto.texto).
 */
export const validateEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

/**
 * Valida si una contraseña cumple con:
 * - Mínimo 8 caracteres
 * - Al menos una mayúscula
 * - Al menos un carácter especial
 */
export const validatePassword = (password: string): boolean => {
  const hasMinLength = password.length >= 8;
  const hasUppercase = /[A-Z]/.test(password);
  const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(password);
  
  return hasMinLength && hasUppercase && hasSpecialChar;
};

/**
 * Valida el formulario completo de registro.
 */
export const validateRegistro = (data: UsuarioRegistro): ValidationResult => {
  const errors: ValidationResult['Errors'] = {};

  // Validar Nombre Completo
  if (!data.NombreCompleto || data.NombreCompleto.trim() === '') {
    errors.NombreCompleto = 'El nombre completo es obligatorio';
  }

  // Validar Email
  if (!validateEmail(data.CorreoElectronico)) {
    errors.CorreoElectronico = 'El formato de correo electrónico no es válido';
  } else {
    // Validar Dominios Prohibidos
    const prohibitedDomains = ['root', 'system', 'administrator', 'guest', 'nobody'];
    const localPart = data.CorreoElectronico.split('@')[0].toLowerCase();
    
    if (prohibitedDomains.includes(localPart)) {
      errors.CorreoElectronico = 'El nombre de usuario no es permitido';
    }
  }

  // Validar Contraseña (Regla estricta para Registro: +Número)
  const passwordHasNumber = /\d/.test(data.Contrasena);
  if (!validatePassword(data.Contrasena) || !passwordHasNumber) {
    errors.Contrasena = 'La contraseña debe tener al menos 8 caracteres, una mayúscula, un número y un carácter especial';
  }

  // Validar Confirmación de Contraseña
  if (data.Contrasena !== data.ConfirmarContrasena) {
    errors.ConfirmarContrasena = 'Las contraseñas no coinciden';
  }

  // Validar Términos
  if (!data.AceptoTerminos) {
    errors.AceptoTerminos = 'Debe aceptar los términos y condiciones';
  }

  return {
    IsValid: Object.keys(errors).length === 0,
    Errors: errors,
  };
};
