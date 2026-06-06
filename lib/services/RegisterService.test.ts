import { describe, expect, it } from 'vitest';
import { RegisterService } from '@/lib/services/RegisterService';

describe('RegisterService', () => {
  it('debe simular registro exitoso y devolver ruta de login', async () => {
    const result = await RegisterService.register({
      fullName: 'Ana Perez',
      email: 'ana@example.com',
      password: 'password123',
      confirmPassword: 'password123',
      acceptTerms: true,
    });

    expect(result.success).toBe(true);
    expect(result.redirectTo).toBe('/login');
    expect(result.message).toContain('Cuenta creada con exito');
  });
});
