import { describe, it, expect } from 'vitest';
import { AuthService } from './AuthService';

describe('AuthService', () => {
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

  describe('register', () => {
    it('should register a new user successfully and allow them to login', async () => {
      const uniqueEmail = `newuser_${Date.now()}@example.com`;
      const registerResult = await AuthService.register({
        FullName: 'New User',
        Email: uniqueEmail,
        Password: 'newpassword123',
      });
      expect(registerResult).toBe(true);

      const loginResult = await AuthService.login({
        Email: uniqueEmail,
        Password: 'newpassword123',
      });
      expect(loginResult).toBe(true);
      expect(AuthService.isAuthenticated()).toBe(true);
    });

    it('should return false if registering an already existing email', async () => {
      const registerResult = await AuthService.register({
        FullName: 'Steven Luna Clone',
        Email: 'tucorreo@ejemplo.com',
        Password: 'password123',
      });
      expect(registerResult).toBe(false);
    });
  });
});
