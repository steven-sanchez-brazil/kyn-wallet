import { describe, it, expect } from 'vitest';
import { validateEmail, validatePassword, validateFullName, passwordsMatch } from './Validation';

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
    it('should return true for non-empty names', () => {
      expect(validateFullName('John Doe')).toBe(true);
      expect(validateFullName('A')).toBe(true);
    });

    it('should return false for empty or whitespace names', () => {
      expect(validateFullName('')).toBe(false);
      expect(validateFullName('   ')).toBe(false);
    });
  });

  describe('passwordsMatch', () => {
    it('should return true when passwords match', () => {
      expect(passwordsMatch('pass123', 'pass123')).toBe(true);
    });

    it('should return false when passwords do not match', () => {
      expect(passwordsMatch('pass123', 'other')).toBe(false);
    });
  });
});
