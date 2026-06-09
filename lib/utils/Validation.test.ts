import { describe, it, expect } from 'vitest';
import {
  validateEmail,
  validatePassword,
  validateFullName,
  validatePasswordConfirmation,
  validateRegisterRequest,
} from './Validation';

describe('Validation Utils', () => {
  describe('validateEmail', () => {
    it('should return true for valid emails', () => {
      expect(validateEmail('test@example.com')).toBe(true);
      expect(validateEmail('user.name@domain.co')).toBe(true);
    });

    it('should return false for invalid emails', () => {
      expect(validateEmail('invalid-email')).toBe(false);
      expect(validateEmail('@domain.com')).toBe(false);
      expect(validateEmail('test@')).toBe(false);
    });
  });

  describe('validatePassword', () => {
    it('should return true for passwords with 8+ characters', () => {
      expect(validatePassword('password123')).toBe(true);
      expect(validatePassword('12345678')).toBe(true);
    });

    it('should return false for passwords with less than 8 characters', () => {
      expect(validatePassword('short')).toBe(false);
      expect(validatePassword('')).toBe(false);
    });
  });

  describe('validateFullName', () => {
    it('should return true for valid full names', () => {
      expect(validateFullName('Juan Perez')).toBe(true);
      expect(validateFullName("María O'Connor")).toBe(true);
    });

    it('should return false for invalid full names', () => {
      expect(validateFullName('Juan')).toBe(false);
      expect(validateFullName('')).toBe(false);
      expect(validateFullName('12 Juan')).toBe(false);
    });
  });

  describe('validatePasswordConfirmation', () => {
    it('should return true when passwords match', () => {
      expect(validatePasswordConfirmation('password123', 'password123')).toBe(true);
    });

    it('should return false when passwords do not match', () => {
      expect(validatePasswordConfirmation('password123', 'password124')).toBe(false);
    });
  });

  describe('validateRegisterRequest', () => {
    it('should return valid for full valid payload', () => {
      const result = validateRegisterRequest({
        NombreCompleto: 'Juan Perez',
        CorreoElectronico: 'juan@example.com',
        Contrasena: 'password123',
        ConfirmarContrasena: 'password123',
        AceptaTerminos: true,
      });

      expect(result.EsValido).toBe(true);
      expect(result.Errores).toEqual({});
    });

    it('should return field errors for invalid payload', () => {
      const result = validateRegisterRequest({
        NombreCompleto: 'Juan',
        CorreoElectronico: 'mail',
        Contrasena: 'short',
        ConfirmarContrasena: 'different',
        AceptaTerminos: false,
      });

      expect(result.EsValido).toBe(false);
      expect(result.Errores.NombreCompleto).toBeDefined();
      expect(result.Errores.CorreoElectronico).toBeDefined();
      expect(result.Errores.Contrasena).toBeDefined();
      expect(result.Errores.ConfirmarContrasena).toBeDefined();
      expect(result.Errores.AceptaTerminos).toBeDefined();
    });
  });
});
