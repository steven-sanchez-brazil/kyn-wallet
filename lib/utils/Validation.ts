/**
 * Valida si un string tiene formato de correo electrónico válido.
 */
export const validateEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

/**
 * Valida si una contraseña cumple con el mínimo de 8 caracteres.
 */
export const validatePassword = (password: string): boolean => {
  return password.length >= 8;
};

/**
 * Valida que un campo obligatorio tenga contenido.
 */
export const validateRequiredField = (value: string): boolean => {
  return value.trim().length > 0;
};

/**
 * Valida que la confirmación de contraseña coincida.
 */
export const validatePasswordMatch = (
  password: string,
  confirmPassword: string
): boolean => {
  return password === confirmPassword;
};

/**
 * Valida aceptación de términos y condiciones.
 */
export const validateTermsAccepted = (isAccepted: boolean): boolean => {
  return isAccepted;
};
