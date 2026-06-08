import { describe, it, expect } from 'vitest';
import {
  validateEmail,
  validatePassword,
  validatePasswordMatch,
  validateRequiredField,
  validateTermsAccepted,
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

  describe('validateRequiredField', () => {
    it('should return true for non-empty values', () => {
      expect(validateRequiredField('Diego')).toBe(true);
    });

    it('should return false for empty values', () => {
      expect(validateRequiredField('')).toBe(false);
      expect(validateRequiredField('   ')).toBe(false);
    });
  });

  describe('validatePasswordMatch', () => {
    it('should return true when passwords match', () => {
      expect(validatePasswordMatch('password123', 'password123')).toBe(true);
    });

    it('should return false when passwords do not match', () => {
      expect(validatePasswordMatch('password123', 'password321')).toBe(false);
    });
  });

  describe('validateTermsAccepted', () => {
    it('should return true when terms are accepted', () => {
      expect(validateTermsAccepted(true)).toBe(true);
    });

    it('should return false when terms are not accepted', () => {
      expect(validateTermsAccepted(false)).toBe(false);
    });
  });
});
