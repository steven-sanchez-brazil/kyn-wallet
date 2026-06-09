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
});

describe('AuthService.register', () => {
  it('should register a new email successfully (C1)', async () => {
    const result = await AuthService.register({
      FullName: 'Nuevo Usuario',
      Email: 'nuevo@ejemplo.com',
      Password: 'password123',
      ConfirmPassword: 'password123',
      AcceptedTerms: true,
    });
    expect(result.Success).toBe(true);
  });

  it('should reject an already registered email (C2)', async () => {
    const result = await AuthService.register({
      FullName: 'Duplicado',
      Email: 'tucorreo@ejemplo.com',
      Password: 'password123',
      ConfirmPassword: 'password123',
      AcceptedTerms: true,
    });
    expect(result.Success).toBe(false);
    expect(result.Error).toBe('Este correo ya está registrado');
  });

  it('should allow login with a newly registered email (C3)', async () => {
    await AuthService.register({
      FullName: 'Login Posterior',
      Email: 'posterior@ejemplo.com',
      Password: 'password123',
      ConfirmPassword: 'password123',
      AcceptedTerms: true,
    });
    const loginResult = await AuthService.login({
      Email: 'posterior@ejemplo.com',
      Password: 'password123',
    });
    expect(loginResult).toBe(true);
  });
});
