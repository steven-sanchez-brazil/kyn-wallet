import { describe, expect, it } from 'vitest';
import {
  NormalizeEmail,
  ValidateEmailFormat,
  ValidatePasswordLength,
  ValidatePasswordMatch,
  ValidateRegistrationData,
  ValidateRequiredFields,
  ValidateTermsAccepted,
} from './RegistrationValidation';
import { RegistrationFormData } from '../types/Registration';

const ValidData: RegistrationFormData = {
  FullName: 'Diego Martinez',
  Email: 'diego@ejemplo.com',
  Password: '12345678',
  ConfirmPassword: '12345678',
  AcceptTerms: true,
};

describe('RegistrationValidation', () => {
  it('normalizes email with trim and lowercase', () => {
    expect(NormalizeEmail('  Usuario@Ejemplo.Com ')).toBe('usuario@ejemplo.com');
  });

  it('validates email format', () => {
    expect(ValidateEmailFormat('valid@example.com')).toBe(true);
    expect(ValidateEmailFormat('invalid-email')).toBe(false);
  });

  it('validates password length minimum of 8', () => {
    expect(ValidatePasswordLength('12345678')).toBe(true);
    expect(ValidatePasswordLength('1234')).toBe(false);
  });

  it('validates password confirmation matching', () => {
    expect(ValidatePasswordMatch('12345678', '12345678')).toBe(true);
    expect(ValidatePasswordMatch('12345678', '87654321')).toBe(false);
  });

  it('validates terms acceptance', () => {
    expect(ValidateTermsAccepted(true)).toBe(true);
    expect(ValidateTermsAccepted(false)).toBe(false);
  });

  it('returns required field errors', () => {
    const Errors = ValidateRequiredFields({
      FullName: ' ',
      Email: ' ',
      Password: '',
      ConfirmPassword: '',
      AcceptTerms: false,
    });

    expect(Errors.FullName).toBe('El nombre completo es obligatorio');
    expect(Errors.Email).toBe('El correo electrónico es obligatorio');
    expect(Errors.Password).toBe('La contraseña es obligatoria');
    expect(Errors.ConfirmPassword).toBe('Debes confirmar la contraseña');
  });

  it('returns field-level errors for invalid registration payload', () => {
    const Errors = ValidateRegistrationData({
      ...ValidData,
      Email: 'correo-invalido',
      Password: '1234',
      ConfirmPassword: '0000',
      AcceptTerms: false,
    });

    expect(Errors.Email).toBe('Correo electrónico inválido');
    expect(Errors.Password).toBe('La contraseña debe tener al menos 8 caracteres');
    expect(Errors.ConfirmPassword).toBe('Las contraseñas no coinciden');
    expect(Errors.AcceptTerms).toBe('Debes aceptar los términos y condiciones');
  });

  it('returns no errors for valid registration payload', () => {
    const Errors = ValidateRegistrationData(ValidData);
    expect(Object.keys(Errors)).toHaveLength(0);
  });
});
