import { describe, expect, it, beforeEach } from 'vitest';
import { RegisterService } from './RegisterService';
import { UserStore } from './UserStore';

describe('RegisterService contract', () => {
  beforeEach(() => {
    UserStore.reset();
  });

  it('returns success and persists user for valid payload', async () => {
    const result = await RegisterService.register({
      FullName: 'Maria Perez',
      Email: 'maria@ejemplo.com',
      Password: 'password123',
      ConfirmPassword: 'password123',
      AcceptTerms: true,
    });

    expect(result.Success).toBe(true);
    expect(UserStore.findByEmail('maria@ejemplo.com')).toBeDefined();
  });

  it('returns validation errors for invalid payload', async () => {
    const result = await RegisterService.register({
      FullName: 'A',
      Email: 'correo-invalido',
      Password: '123',
      ConfirmPassword: '999',
      AcceptTerms: false,
    });

    expect(result.Success).toBe(false);
    expect(result.FieldErrors).toBeDefined();
    expect(result.FieldErrors?.Email).toBeTruthy();
    expect(result.FieldErrors?.Password).toBeTruthy();
  });

  it('returns explicit message when email already exists', async () => {
    await RegisterService.register({
      FullName: 'Maria Perez',
      Email: 'maria@ejemplo.com',
      Password: 'password123',
      ConfirmPassword: 'password123',
      AcceptTerms: true,
    });

    const duplicate = await RegisterService.register({
      FullName: 'Maria Perez',
      Email: 'maria@ejemplo.com',
      Password: 'password123',
      ConfirmPassword: 'password123',
      AcceptTerms: true,
    });

    expect(duplicate.Success).toBe(false);
    expect(duplicate.Message).toContain('correo');
  });
});
