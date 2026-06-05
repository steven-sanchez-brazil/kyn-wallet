import { describe, it, expect } from 'vitest';
import { validateEmail, validatePassword, validatePasswordsMatch } from './Validation';

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

  describe('validatePasswordsMatch', () => {
    it('should return true if passwords match', () => {
      expect(validatePasswordsMatch('password123', 'password123')).toBe(true);
    });

    it('should return false if passwords do not match', () => {
      expect(validatePasswordsMatch('password123', 'different')).toBe(false);
    });
  });
});
