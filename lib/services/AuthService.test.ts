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
    const email = 'anakin@skywalker.com';
    const password = 'password123';
    const name = 'Anakin Skywalker';

    const result = await AuthService.register({
      Name: name,
      Email: email,
      Password: password,
    });

    expect(result).toBe(true);
    expect(AuthService.isAuthenticated()).toBe(true);

    // Should also be able to login now
    const loginResult = await AuthService.login({
      Email: email,
      Password: password,
    });
    expect(loginResult).toBe(true);
  });

  it('should throw an error when registering with an existing email', async () => {
    await expect(AuthService.register({
      Name: 'Duplicate Luke',
      Email: 'luke@skywalker.com',
      Password: 'password123',
    })).rejects.toThrow('Este correo electrónico ya se encuentra registrado');
  });
});
