import { describe, it, expect } from 'vitest';
import { validateEmail, validatePassword } from './Validation';

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
});

import { validateFullName, validatePasswordMatch } from './Validation';

describe('validateFullName', () => {
  it('should return true for names with 2+ characters', () => {
    expect(validateFullName('Diego Martínez')).toBe(true);
    expect(validateFullName('Ana')).toBe(true);
    expect(validateFullName('Jo')).toBe(true);
  });

  it('should return false for empty or single-character names', () => {
    expect(validateFullName('')).toBe(false);
    expect(validateFullName('A')).toBe(false);
    expect(validateFullName('   ')).toBe(false);
  });
});

describe('validatePasswordMatch', () => {
  it('should return true when passwords match', () => {
    expect(validatePasswordMatch('password123', 'password123')).toBe(true);
    expect(validatePasswordMatch('', '')).toBe(true);
  });

  it('should return false when passwords do not match', () => {
    expect(validatePasswordMatch('password123', 'password456')).toBe(false);
    expect(validatePasswordMatch('Password123', 'password123')).toBe(false);
  });
});
