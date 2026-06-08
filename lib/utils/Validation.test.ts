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
    it('should return false for empty string', () => {
      expect(validateFullName('')).toBe(false);
    });

    it('should return false for single word', () => {
      expect(validateFullName('Ana')).toBe(false);
    });

    it('should return true for two words', () => {
      expect(validateFullName('Ana García')).toBe(true);
    });

    it('should return true for multiple words', () => {
      expect(validateFullName('Ana María García López')).toBe(true);
    });

    it('should handle extra spaces', () => {
      expect(validateFullName('  Ana   García  ')).toBe(true);
    });

    it('should return false for only spaces', () => {
      expect(validateFullName('   ')).toBe(false);
    });
  });

  describe('validatePasswordMatch', () => {
    it('should return true for matching passwords', () => {
      expect(validatePasswordMatch('mipassword123', 'mipassword123')).toBe(true);
    });

    it('should return false for non-matching passwords', () => {
      expect(validatePasswordMatch('mipassword123', 'mipassword124')).toBe(false);
    });

    it('should return false when first password is empty', () => {
      expect(validatePasswordMatch('', 'mipassword123')).toBe(false);
    });

    it('should return false when second password is empty', () => {
      expect(validatePasswordMatch('mipassword123', '')).toBe(false);
    });

    it('should return false when both are empty', () => {
      expect(validatePasswordMatch('', '')).toBe(false);
    });

    it('should be case-sensitive', () => {
      expect(validatePasswordMatch('MiPassword123', 'mipassword123')).toBe(false);
    });
  });
});
