import { describe, it, expect } from 'vitest';
import { AuthService } from './AuthService';

describe('AuthService', () => {
  it('should register a new user successfully', async () => {
    AuthService.resetForTests();

    const result = await AuthService.register({
      FullName: 'Diego Martinez',
      Email: 'diego@example.com',
      Password: 'password123',
      ConfirmPassword: 'password123',
      TermsAccepted: true,
    });

    expect(result.Success).toBe(true);
    expect(result.ErrorCode).toBeNull();
  });

  it('should reject duplicated email on registration', async () => {
    AuthService.resetForTests();

    await AuthService.register({
      FullName: 'Primer Usuario',
      Email: 'duplicado@example.com',
      Password: 'password123',
      ConfirmPassword: 'password123',
      TermsAccepted: true,
    });

    const result = await AuthService.register({
      FullName: 'Segundo Usuario',
      Email: 'duplicado@example.com',
      Password: 'password123',
      ConfirmPassword: 'password123',
      TermsAccepted: true,
    });

    expect(result.Success).toBe(false);
    expect(result.ErrorCode).toBe('EMAIL_EXISTS');
  });

  it('should return true for valid credentials', async () => {
    AuthService.resetForTests();

    const result = await AuthService.login({
      Email: 'tucorreo@ejemplo.com',
      Password: 'password123',
    });
    expect(result).toBe(true);
    expect(AuthService.isAuthenticated()).toBe(true);
  });

  it('should return false for invalid credentials', async () => {
    AuthService.resetForTests();

    const result = await AuthService.login({
      Email: 'wrong@example.com',
      Password: 'wrongpassword',
    });
    expect(result).toBe(false);
  });

  it('should authenticate a user registered in the same shared source', async () => {
    AuthService.resetForTests();

    await AuthService.register({
      FullName: 'Nuevo Usuario',
      Email: 'nuevo@example.com',
      Password: 'password123',
      ConfirmPassword: 'password123',
      TermsAccepted: true,
    });

    const loginResult = await AuthService.login({
      Email: 'nuevo@example.com',
      Password: 'password123',
    });

    expect(loginResult).toBe(true);
  });
});
