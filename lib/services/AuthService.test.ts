import { describe, it, expect } from 'vitest';
import { AuthService } from './AuthService';

describe('AuthService', () => {
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
    it('should return true when registration is successful', async () => {
      const result = await AuthService.register({
        FullName: 'Test User',
        Email: 'test@example.com',
        Password: 'password123',
        ConfirmPassword: 'password123',
      });
      expect(result).toBe(true);
    });

    it('should allow a registered user to log in', async () => {
      const email = `newuser_${Date.now()}@example.com`;
      const password = 'password123';

      await AuthService.register({
        FullName: 'New User',
        Email: email,
        Password: password,
        ConfirmPassword: password,
      });

      const loginResult = await AuthService.login({
        Email: email,
        Password: password,
      });

      expect(loginResult).toBe(true);
    });
  });
});
