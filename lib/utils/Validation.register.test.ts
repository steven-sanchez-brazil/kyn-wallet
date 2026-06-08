import { describe, expect, it } from 'vitest';
import {
  validateAcceptTerms,
  validateConfirmPassword,
  validateFullName,
  validateRegisterPayload,
} from './Validation';

describe('Register validation helpers', () => {
  it('validates full name length', () => {
    expect(validateFullName('A')).toBe(false);
    expect(validateFullName('Maria Perez')).toBe(true);
  });

  it('validates confirm password equality', () => {
    expect(validateConfirmPassword('password123', 'password123')).toBe(true);
    expect(validateConfirmPassword('password123', 'otro')).toBe(false);
  });

  it('requires accepted terms', () => {
    expect(validateAcceptTerms(false)).toBe(false);
    expect(validateAcceptTerms(true)).toBe(true);
  });

  it('returns errors map for invalid payload', () => {
    const errors = validateRegisterPayload({
      FullName: 'A',
      Email: 'correo',
      Password: '123',
      ConfirmPassword: '456',
      AcceptTerms: false,
    });

    expect(errors.FullName).toBeTruthy();
    expect(errors.Email).toBeTruthy();
    expect(errors.Password).toBeTruthy();
    expect(errors.ConfirmPassword).toBeTruthy();
    expect(errors.AcceptTerms).toBeTruthy();
  });
});
