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
 * Valida si un nombre completo contiene al menos dos palabras.
 */
export const validateFullName = (name: string): boolean => {
  const words = name.trim().split(/\s+/);
  return words.length >= 2 && words.every(word => word.length > 0);
};

/**
 * Valida si dos contraseñas coinciden exactamente.
 */
export const validatePasswordMatch = (password: string, confirm: string): boolean => {
  return password.length > 0 && confirm.length > 0 && password === confirm;
};
