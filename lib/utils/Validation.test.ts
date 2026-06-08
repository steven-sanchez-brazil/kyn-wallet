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
    it('should return true for non-empty names after trim', () => {
      expect(validateFullName('Juan Pérez')).toBe(true);
      expect(validateFullName('A')).toBe(true);
    });

    it('should return false for empty or whitespace-only names', () => {
      expect(validateFullName('')).toBe(false);
      expect(validateFullName('   ')).toBe(false);
      expect(validateFullName('\t')).toBe(false);
    });
  });

  describe('validatePasswordMatch', () => {
    it('should return true when passwords match', () => {
      expect(validatePasswordMatch('abc123456', 'abc123456')).toBe(true);
      expect(validatePasswordMatch('', '')).toBe(true);
    });

    it('should return false when passwords do not match', () => {
      expect(validatePasswordMatch('abc123456', 'xyz789012')).toBe(false);
      expect(validatePasswordMatch('password', 'Password')).toBe(false);
    });
  });
});
