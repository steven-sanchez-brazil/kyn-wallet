import { describe, it, expect } from 'vitest';
import { validateEmail, validatePassword, validateFullName, validatePasswordMatch } from './Validation';

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
    it('should return true for names with 2+ non-whitespace characters', () => {
      expect(validateFullName('Ana')).toBe(true);
      expect(validateFullName('Juan Pérez')).toBe(true);
      expect(validateFullName('AB')).toBe(true);
    });

    it('should return false for empty or whitespace-only strings', () => {
      expect(validateFullName('')).toBe(false);
      expect(validateFullName('   ')).toBe(false);
    });

    it('should return false for single-character names', () => {
      expect(validateFullName('A')).toBe(false);
      expect(validateFullName(' A ')).toBe(false);
    });
  });

  describe('validatePasswordMatch', () => {
    it('should return true when both non-empty passwords are identical', () => {
      expect(validatePasswordMatch('secret123', 'secret123')).toBe(true);
      expect(validatePasswordMatch('abc12345', 'abc12345')).toBe(true);
    });

    it('should return false when passwords differ', () => {
      expect(validatePasswordMatch('secret123', 'different')).toBe(false);
      expect(validatePasswordMatch('abc', 'ABC')).toBe(false);
    });

    it('should return false when either password is empty', () => {
      expect(validatePasswordMatch('', '')).toBe(false);
      expect(validatePasswordMatch('secret123', '')).toBe(false);
      expect(validatePasswordMatch('', 'secret123')).toBe(false);
    });
  });
});
