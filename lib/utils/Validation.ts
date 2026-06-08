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
 * Valida si un nombre completo tiene al menos 3 caracteres y contiene solo letras y espacios.
 */
export const validateFullName = (name: string): boolean => {
  const trimmed = name.trim();
  if (trimmed.length < 3) return false;
  // Solo letras (incluidos acentos y ñ) y espacios simples entre palabras, sin números ni símbolos especiales
  const nameRegex = /^[a-zA-ZáéíóúÁÉÍÓÚñÑüÜ]+(?:\s+[a-zA-ZáéíóúÁÉÍÓÚñÑüÜ]+)*$/;
  return nameRegex.test(trimmed);
};

/**
 * Valida si una contraseña tiene al menos 8 caracteres, una mayúscula, una minúscula y un número.
 */
export const validateComplexPassword = (password: string): boolean => {
  if (password.length < 8) return false;
  const hasLowercase = /[a-z]/.test(password);
  const hasUppercase = /[A-Z]/.test(password);
  const hasDigit = /[0-9]/.test(password);
  return hasLowercase && hasUppercase && hasDigit;
};
