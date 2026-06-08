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
 * Valida si dos contraseñas son idénticas y no están vacías.
 */
export const validatePasswordMatch = (password: string, confirm: string): boolean => {
  return password.length > 0 && password === confirm;
};

/**
 * Valida si un nombre completo contiene al menos dos palabras.
 */
export const validateFullName = (name: string): boolean => {
  const trimmed = name.trim();
  const parts = trimmed.split(/\s+/);
  return parts.length >= 2 && parts.every((part) => part.length > 0);
};
