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
 * Valida si un nombre contiene solo letras del alfabeto latino (incluyendo ñ y tildes) y espacios.
 * Retorna false si está vacío tras trim o contiene caracteres no permitidos.
 */
export const validateName = (name: string): boolean => {
  if (name.trim().length === 0) return false;
  const nameRegex = /^[a-zA-ZÀ-ÿ\u00f1\u00d1\s]+$/;
  return nameRegex.test(name);
};

/**
 * Valida que dos contraseñas sean exactamente iguales.
 * Retorna true solo si password === confirmPassword (comparación estricta).
 */
export const validatePasswordMatch = (password: string, confirmPassword: string): boolean => {
  return password === confirmPassword;
};

/**
 * Valida que un valor no tenga espacios al inicio o al final.
 * Retorna false si value !== value.trim(), true en caso contrario.
 */
export const validateTrimmed = (value: string): boolean => {
  return value === value.trim();
};
