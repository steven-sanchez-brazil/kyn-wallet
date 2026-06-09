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
 * Valida si un campo obligatorio tiene contenido (ignora espacios en blanco).
 */
export const validateRequired = (value: string): boolean => {
  return value.trim().length > 0;
};

/**
 * Valida si un nombre completo no está vacío tras recortar espacios.
 */
export const validateFullName = (name: string): boolean => {
  return validateRequired(name);
};

/**
 * Valida si la contraseña y su confirmación coinciden.
 */
export const validatePasswordsMatch = (
  password: string,
  confirmPassword: string
): boolean => {
  return password.length > 0 && password === confirmPassword;
};
