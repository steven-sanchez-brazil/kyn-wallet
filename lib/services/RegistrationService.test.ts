import { describe, expect, it } from 'vitest';
import { RegistrationService } from './RegistrationService';

describe('RegistrationService', () => {
  it('should register successfully with valid and available credentials', async () => {
    const email = `nuevo-${Date.now()}@ejemplo.com`;

    const result = await RegistrationService.register({
      Email: email,
      Password: 'password123',
      ConfirmPassword: 'password123',
    });

    expect(result.Success).toBe(true);
    expect(result.RedirectTarget).toBe('/construction');
  });

  it('should reject invalid email format', async () => {
    const result = await RegistrationService.register({
      Email: 'correo-invalido',
      Password: 'password123',
      ConfirmPassword: 'password123',
    });

    expect(result.Success).toBe(false);
    expect(result.Message).toContain('Formato de correo inválido');
  });

  it('should reject non-matching passwords', async () => {
    const result = await RegistrationService.register({
      Email: `diff-${Date.now()}@ejemplo.com`,
      Password: 'password123',
      ConfirmPassword: 'password456',
    });

    expect(result.Success).toBe(false);
    expect(result.Message).toContain('Las contraseñas no coinciden');
  });

  it('should reject already-registered email', async () => {
    const result = await RegistrationService.register({
      Email: 'tucorreo@ejemplo.com',
      Password: 'password123',
      ConfirmPassword: 'password123',
    });

    expect(result.Success).toBe(false);
    expect(result.Message).toContain('ya está asociado');
    expect(result.RedirectTarget).toBeNull();
  });
});
