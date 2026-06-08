import { describe, it, expect, beforeEach } from 'vitest';
import { AuthService } from './AuthService';

describe('AuthService', () => {
  beforeEach(() => {
    // Clear dynamic registered users if any utility exists
    if (typeof AuthService.clearRegisteredUsers === 'function') {
      AuthService.clearRegisteredUsers();
    }
  });

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

  it('should successfully register a unique user and allow them to login', async () => {
    const signupResult = await AuthService.register({
      FullName: 'Steven Luna',
      Email: 'steven@kynwallet.com',
      Password: 'KynSecure2026!',
    });
    expect(signupResult).toBe(true);

    const loginResult = await AuthService.login({
      Email: 'steven@kynwallet.com',
      Password: 'KynSecure2026!',
    });
    expect(loginResult).toBe(true);
    expect(AuthService.isAuthenticated()).toBe(true);
  });

  it('should fail to register a user with an already registered email', async () => {
    // Try registering default mock user
    const signupResultDefault = await AuthService.register({
      FullName: 'Duplicate User',
      Email: 'tucorreo@ejemplo.com',
      Password: 'password123',
    });
    expect(signupResultDefault).toBe(false);

    // Register a new user
    const signupResultVal = await AuthService.register({
      FullName: 'First User',
      Email: 'first@test.com',
      Password: 'Password123!',
    });
    expect(signupResultVal).toBe(true);

    // Try registering same email
    const signupResultDup = await AuthService.register({
      FullName: 'Another User',
      Email: 'first@test.com',
      Password: 'Password456!',
    });
    expect(signupResultDup).toBe(false);
  });
});
