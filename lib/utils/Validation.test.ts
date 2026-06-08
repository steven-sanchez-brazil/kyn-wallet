import { describe, it, expect } from 'vitest';
import { validateEmail, validatePassword, validatePasswordMatch, validateFullName } from './Validation';

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

  describe('validatePasswordMatch', () => {
    it('should return true when passwords match', () => {
      expect(validatePasswordMatch('password123', 'password123')).toBe(true);
    });

    it('should return false when passwords do not match', () => {
      expect(validatePasswordMatch('password123', 'different')).toBe(false);
    });

    it('should return false when both are empty strings', () => {
      expect(validatePasswordMatch('', '')).toBe(false);
    });
  });

  describe('validateFullName', () => {
    it('should return true for names with at least 2 words', () => {
      expect(validateFullName('John Doe')).toBe(true);
      expect(validateFullName('María José García')).toBe(true);
    });

    it('should return false for single word names', () => {
      expect(validateFullName('John')).toBe(false);
      expect(validateFullName('')).toBe(false);
    });

    it('should return false for names with only spaces', () => {
      expect(validateFullName('   ')).toBe(false);
    });
  });
});
