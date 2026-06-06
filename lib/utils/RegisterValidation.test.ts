import { describe, expect, it } from 'vitest';
import { hasRegisterErrors, validateRegisterData } from '@/lib/utils/RegisterValidation';

describe('RegisterValidation', () => {
  it('debe validar un formulario correcto sin errores', () => {
    const errors = validateRegisterData({
      fullName: 'Maria Lopez',
      email: 'maria@correo.com',
      password: 'password123',
      confirmPassword: 'password123',
      acceptTerms: true,
    });

    expect(hasRegisterErrors(errors)).toBe(false);
  });

  it('debe marcar errores de obligatorios y formato', () => {
    const errors = validateRegisterData({
      fullName: ' ',
      email: 'correo-invalido',
      password: '123',
      confirmPassword: '999',
      acceptTerms: false,
    });

    expect(errors.fullName).toBeTruthy();
    expect(errors.email).toBeTruthy();
    expect(errors.password).toBeTruthy();
    expect(errors.confirmPassword).toBeTruthy();
    expect(errors.acceptTerms).toBeTruthy();
    expect(hasRegisterErrors(errors)).toBe(true);
  });
});
