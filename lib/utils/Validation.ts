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
 * Valida si el nombre completo no está vacío.
 */
export const validateFullName = (name: string): boolean => {
  return name.trim().length > 0;
};

/**
 * Valida si las contraseñas coinciden.
 */
export const passwordsMatch = (password: string, confirm: string): boolean => {
  return password === confirm;
};
