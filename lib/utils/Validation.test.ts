import { describe, it, expect } from 'vitest';
import { validateEmail, validatePassword, validateName, validatePasswordMatch, validateTrimmed } from './Validation';

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

  describe('validateName', () => {
    it('should return true for valid names with tildes and ñ', () => {
      expect(validateName('Ana García')).toBe(true);
      expect(validateName('José Martínez')).toBe(true);
      expect(validateName('Ñoño López')).toBe(true);
      expect(validateName('María')).toBe(true);
    });

    it('should return false for empty name after trim', () => {
      expect(validateName('')).toBe(false);
      expect(validateName('   ')).toBe(false);
    });

    it('should return false for names with numbers or symbols', () => {
      expect(validateName('Ana123')).toBe(false);
      expect(validateName('Ana@García')).toBe(false);
      expect(validateName('Ana-García')).toBe(false);
    });

    it('should return true for names with leading spaces (validateName checks chars, not trim)', () => {
      // validateName checks the regex against the full string — spaces are allowed by the regex
      expect(validateName(' Ana García')).toBe(true);
    });
  });

  describe('validatePasswordMatch', () => {
    it('should return true when passwords are identical', () => {
      expect(validatePasswordMatch('password123', 'password123')).toBe(true);
      expect(validatePasswordMatch('abc12345', 'abc12345')).toBe(true);
    });

    it('should return false when passwords differ', () => {
      expect(validatePasswordMatch('password123', 'password456')).toBe(false);
      expect(validatePasswordMatch('abc12345', 'ABC12345')).toBe(false);
    });

    it('should return false when one is empty', () => {
      expect(validatePasswordMatch('password123', '')).toBe(false);
      expect(validatePasswordMatch('', 'password123')).toBe(false);
    });
  });

  describe('validateTrimmed', () => {
    it('should return true for values without leading or trailing spaces', () => {
      expect(validateTrimmed('hola')).toBe(true);
      expect(validateTrimmed('hola mundo')).toBe(true);
      expect(validateTrimmed('')).toBe(true);
    });

    it('should return false for values with leading space', () => {
      expect(validateTrimmed(' hola')).toBe(false);
    });

    it('should return false for values with trailing space', () => {
      expect(validateTrimmed('hola ')).toBe(false);
    });

    it('should return false for values with only spaces', () => {
      expect(validateTrimmed('   ')).toBe(false);
    });
  });
});
