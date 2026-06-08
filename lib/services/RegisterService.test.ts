import { describe, it, expect } from 'vitest';
import { RegisterService } from './RegisterService';

describe('RegisterService', () => {
  describe('emailExists', () => {
    it('should return true for the pre-seeded mock email', () => {
      expect(RegisterService.emailExists('tucorreo@ejemplo.com')).toBe(true);
    });

    it('should return false for a non-registered email', () => {
      expect(RegisterService.emailExists('nuevo@usuario.com')).toBe(false);
    });

    it('should be case-insensitive', () => {
      expect(RegisterService.emailExists('TUCORREO@EJEMPLO.COM')).toBe(true);
    });
  });

  describe('register', () => {
    it('should return success for a new email', async () => {
      const result = await RegisterService.register({
        FullName: 'Test User',
        Email: 'testuser@kynwallet.com',
        Password: 'password123',
        ConfirmPassword: 'password123',
        AcceptsTerms: true,
      });
      expect(result.success).toBe(true);
      expect(result.error).toBeUndefined();
    });

    it('should return error for an already registered email', async () => {
      const result = await RegisterService.register({
        FullName: 'Existing User',
        Email: 'tucorreo@ejemplo.com',
        Password: 'password123',
        ConfirmPassword: 'password123',
        AcceptsTerms: true,
      });
      expect(result.success).toBe(false);
      expect(result.error).toBe('Este correo ya está registrado.');
    });
  });
});
