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
 * Valida si un nombre completo tiene al menos 2 caracteres no-blancos.
 */
export const validateFullName = (name: string): boolean => {
  return name.trim().length >= 2;
};

/**
 * Valida que dos contraseñas sean idénticas y no estén vacías.
 */
export const validatePasswordMatch = (password: string, confirm: string): boolean => {
  return password.length > 0 && password === confirm;
};
