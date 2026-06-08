import { describe, expect, it } from 'vitest';
import {
  validateRegistrationConfirmation,
  validateRegistrationCredentials,
  validateRegistrationEmail,
  validateRegistrationPassword,
} from './RegistrationValidation';

describe('RegistrationValidation', () => {
  describe('validateRegistrationEmail', () => {
    it('should return no error for valid email', () => {
      expect(validateRegistrationEmail('usuario@ejemplo.com')).toBeNull();
    });

    it('should return error for empty or invalid email', () => {
      expect(validateRegistrationEmail('')).toContain('obligatorio');
      expect(validateRegistrationEmail('invalido')).toContain('Formato');
    });
  });

  describe('validateRegistrationPassword', () => {
    it('should return no error for 8+ character password', () => {
      expect(validateRegistrationPassword('password123')).toBeNull();
    });

    it('should return error for empty or short password', () => {
      expect(validateRegistrationPassword('')).toContain('obligatoria');
      expect(validateRegistrationPassword('short')).toContain('al menos 8');
    });
  });

  describe('validateRegistrationConfirmation', () => {
    it('should return no error when passwords match', () => {
      expect(validateRegistrationConfirmation('password123', 'password123')).toBeNull();
    });

    it('should return error when confirmation is empty or mismatched', () => {
      expect(validateRegistrationConfirmation('password123', '')).toContain('obligatoria');
      expect(validateRegistrationConfirmation('password123', 'password456')).toContain(
        'no coinciden'
      );
    });
  });

  describe('validateRegistrationCredentials', () => {
    it('should return IsValid true and empty errors for valid credentials', () => {
      const result = validateRegistrationCredentials({
        Email: 'ok@ejemplo.com',
        Password: 'password123',
        ConfirmPassword: 'password123',
      });

      expect(result.IsValid).toBe(true);
      expect(result.Errors).toEqual({});
    });

    it('should return IsValid false with field errors for invalid credentials', () => {
      const result = validateRegistrationCredentials({
        Email: '',
        Password: 'short',
        ConfirmPassword: 'different',
      });

      expect(result.IsValid).toBe(false);
      expect(result.Errors.Email).toBeDefined();
      expect(result.Errors.Password).toBeDefined();
      expect(result.Errors.ConfirmPassword).toBeDefined();
    });
  });
});
