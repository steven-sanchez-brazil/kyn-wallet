import { describe, it, expect } from 'vitest';
import {
  validateEmail,
  validatePassword,
  validateRequired,
  validateFullName,
  validatePasswordsMatch,
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

  describe('validateRequired', () => {
    it('should return true for non-empty values', () => {
      expect(validateRequired('Diego')).toBe(true);
      expect(validateRequired('a')).toBe(true);
    });

    it('should return false for empty or whitespace-only values', () => {
      expect(validateRequired('')).toBe(false);
      expect(validateRequired('   ')).toBe(false);
    });
  });

  describe('validateFullName', () => {
    it('should return true for a non-empty trimmed name', () => {
      expect(validateFullName('Diego Martínez')).toBe(true);
      expect(validateFullName('  Ana  ')).toBe(true);
    });

    it('should return false for empty or whitespace-only names', () => {
      expect(validateFullName('')).toBe(false);
      expect(validateFullName('   ')).toBe(false);
    });
  });

  describe('validatePasswordsMatch', () => {
    it('should return true when both passwords are identical', () => {
      expect(validatePasswordsMatch('password123', 'password123')).toBe(true);
    });

    it('should return false when passwords differ', () => {
      expect(validatePasswordsMatch('password123', 'password124')).toBe(false);
      expect(validatePasswordsMatch('password123', '')).toBe(false);
    });
  });
});
