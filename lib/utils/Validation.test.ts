import { describe, it, expect } from 'vitest';
import { validateEmail, validatePassword, validateFullName, validateComplexPassword } from './Validation';

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
    it('should return true for valid full names (min 3 chars, letters and spaces)', () => {
      expect(validateFullName('Steven Luna')).toBe(true);
      expect(validateFullName('Ana María')).toBe(true);
    });

    it('should return false for invalid full names', () => {
      expect(validateFullName('ST')).toBe(false); // short
      expect(validateFullName('Steven123')).toBe(false); // numbers
      expect(validateFullName('   ')).toBe(false); // empty spaces
      expect(validateFullName('Steven!')).toBe(false); // special char
    });
  });

  describe('validateComplexPassword', () => {
    it('should return true for passwords with 8+ chars, lowercase, uppercase, and digit', () => {
      expect(validateComplexPassword('KynSecure2026!')).toBe(true);
      expect(validateComplexPassword('Password123')).toBe(true);
    });

    it('should return false for invalid complex passwords', () => {
      expect(validateComplexPassword('short1!')).toBe(false); // too short
      expect(validateComplexPassword('nouppercase123')).toBe(false); // no uppercase
      expect(validateComplexPassword('NOLOWERCASE123')).toBe(false); // no lowercase
      expect(validateComplexPassword('NoDigitsHere!')).toBe(false); // no digit
    });
  });
});
