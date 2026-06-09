import { describe, it, expect, beforeEach } from 'vitest';
import { AuthService, resetAuthState } from './AuthService';

describe('AuthService', () => {
  beforeEach(() => {
    resetAuthState();
  });

  describe('login', () => {
    it('should return true for valid credentials', async () => {
      const result = await AuthService.login({
        Email: 'tucorreo@ejemplo.com',
        Password: 'password123',
      });
      expect(result).toBe(true);
      expect(AuthService.isAuthenticated()).toBe(true);
    });

    it('should return false for invalid credentials', async () => {
      const result = await AuthService.login({
        Email: 'wrong@example.com',
        Password: 'wrongpassword',
      });
      expect(result).toBe(false);
    });
  });

  describe('register', () => {
    it('should return Success:true for a new email', async () => {
      const result = await AuthService.register({
        FullName: 'Ana García',
        Email: 'nueva@ejemplo.com',
        Password: 'securepass123',
      });
      expect(result.Success).toBe(true);
      expect(result.Error).toBeUndefined();
    });

    it('should return EMAIL_EXISTS for a duplicate email', async () => {
      const result = await AuthService.register({
        FullName: 'Clon',
        Email: 'tucorreo@ejemplo.com',
        Password: 'otraclave123',
      });
      expect(result.Success).toBe(false);
      expect(result.Error).toBe('EMAIL_EXISTS');
    });

    it('should allow login after successful registration', async () => {
      await AuthService.register({
        FullName: 'Nuevo Usuario',
        Email: 'nuevo@test.com',
        Password: 'clave12345',
      });
      const loginResult = await AuthService.login({
        Email: 'nuevo@test.com',
        Password: 'clave12345',
      });
      expect(loginResult).toBe(true);
    });
  });
});
