import { isKnownDemoEmail } from '@/lib/auth/demoUsers';
import type { RegistrationValues, ValidationErrors } from '@/lib/auth/session';

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const PASSWORD_PATTERN = /^(?=.*[A-Za-z])(?=.*\d).{8,}$/;

export function normalizeRegistrationValues(values: RegistrationValues): RegistrationValues {
  return {
    fullName: values.fullName.trim(),
    email: values.email.trim().toLowerCase(),
    password: values.password,
    confirmPassword: values.confirmPassword,
    acceptTerms: values.acceptTerms
  };
}

export function validateRegistrationForm(values: RegistrationValues, knownEmails: readonly string[] = []) {
  const normalized = normalizeRegistrationValues(values);
  const errors: ValidationErrors = {};

  if (!normalized.fullName) {
    errors.fullName = 'Ingresa tu nombre completo.';
  } else if (normalized.fullName.length < 3) {
    errors.fullName = 'El nombre debe tener al menos 3 caracteres.';
  }

  if (!normalized.email) {
    errors.email = 'Ingresa tu correo electrónico.';
  } else if (!EMAIL_PATTERN.test(normalized.email)) {
    errors.email = 'Ingresa un correo electrónico válido.';
  } else if (knownEmails.some((email) => email.toLowerCase() === normalized.email) || isKnownDemoEmail(normalized.email)) {
    errors.email = 'Este correo ya está registrado en la demo.';
  }

  if (!normalized.password) {
    errors.password = 'Ingresa una contraseña.';
  } else if (!PASSWORD_PATTERN.test(normalized.password)) {
    errors.password = 'La contraseña debe tener al menos 8 caracteres, una letra y un número.';
  }

  if (!normalized.confirmPassword) {
    errors.confirmPassword = 'Confirma tu contraseña.';
  } else if (normalized.password !== normalized.confirmPassword) {
    errors.confirmPassword = 'Las contraseñas no coinciden.';
  }

  if (!normalized.acceptTerms) {
    errors.acceptTerms = 'Debes aceptar los términos y condiciones.';
  }

  if (Object.keys(errors).length > 0) {
    return {
      isValid: false,
      errors,
      normalized
    };
  }

  return {
    isValid: true,
    errors,
    normalized
  };
}
