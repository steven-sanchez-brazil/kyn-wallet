import { RegistrationFormData, RegistrationValidationErrors } from '../types/Registration';

export const NormalizeEmail = (email: string): string => {
  return email.trim().toLowerCase();
};

const NormalizeText = (value: string): string => {
  return value.trim();
};

export const ValidateEmailFormat = (email: string): boolean => {
  const EmailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return EmailRegex.test(NormalizeEmail(email));
};

export const ValidatePasswordLength = (password: string): boolean => {
  return password.length >= 8;
};

export const ValidatePasswordMatch = (password: string, confirmPassword: string): boolean => {
  return password === confirmPassword;
};

export const ValidateTermsAccepted = (acceptTerms: boolean): boolean => {
  return acceptTerms;
};

export const ValidateRequiredFields = (
  data: RegistrationFormData
): RegistrationValidationErrors => {
  const Errors: RegistrationValidationErrors = {};

  if (!NormalizeText(data.FullName)) {
    Errors.FullName = 'El nombre completo es obligatorio';
  }

  if (!NormalizeEmail(data.Email)) {
    Errors.Email = 'El correo electrónico es obligatorio';
  }

  if (!data.Password) {
    Errors.Password = 'La contraseña es obligatoria';
  }

  if (!data.ConfirmPassword) {
    Errors.ConfirmPassword = 'Debes confirmar la contraseña';
  }

  return Errors;
};

export const ValidateRegistrationData = (
  data: RegistrationFormData
): RegistrationValidationErrors => {
  const Errors = ValidateRequiredFields(data);

  if (!Errors.Email && !ValidateEmailFormat(data.Email)) {
    Errors.Email = 'Correo electrónico inválido';
  }

  if (!Errors.Password && !ValidatePasswordLength(data.Password)) {
    Errors.Password = 'La contraseña debe tener al menos 8 caracteres';
  }

  if (!Errors.ConfirmPassword && !ValidatePasswordMatch(data.Password, data.ConfirmPassword)) {
    Errors.ConfirmPassword = 'Las contraseñas no coinciden';
  }

  if (!ValidateTermsAccepted(data.AcceptTerms)) {
    Errors.AcceptTerms = 'Debes aceptar los términos y condiciones';
  }

  return Errors;
};
