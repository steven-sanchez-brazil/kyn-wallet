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

  it('should register a new user successfully', async () => {
    const newUser = {
      FullName: 'John Doe',
      Email: 'john@example.com',
      Password: 'password123',
    };
    const result = await AuthService.register(newUser);
    expect(result).toBe(true);

    // Verify we can login with the new user
    const loginResult = await AuthService.login({
      Email: 'john@example.com',
      Password: 'password123',
    });
    expect(loginResult).toBe(true);
  });
});
