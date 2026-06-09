import { describe, expect, it } from 'vitest';
import { RegisterService } from './RegisterService';
import { RegistroUsuario } from '../types/Register';

const validPayload: RegistroUsuario = {
  NombreCompleto: 'Diego Martinez',
  CorreoElectronico: 'diego@ejemplo.com',
  Contrasena: 'password123',
  ConfirmacionContrasena: 'password123',
  AceptaTerminos: true,
};

describe('RegisterService', () => {
  it('should return an empty error map for valid payload', () => {
    const errors = RegisterService.validar(validPayload);
    expect(errors).toEqual({});
  });

  it('should return field errors for invalid payload', () => {
    const errors = RegisterService.validar({
      NombreCompleto: '',
      CorreoElectronico: 'bad-email',
      Contrasena: '123',
      ConfirmacionContrasena: '456',
      AceptaTerminos: false,
    });

    expect(errors.NombreCompleto?.Mensaje).toContain('obligatorio');
    expect(errors.CorreoElectronico?.Mensaje).toContain('Formato de correo');
    expect(errors.Contrasena?.Mensaje).toContain('al menos 8 caracteres');
    expect(errors.ConfirmacionContrasena?.Mensaje).toContain('no coinciden');
    expect(errors.AceptaTerminos?.Mensaje).toContain('términos');
  });

  it('should return success result when payload is valid', async () => {
    const result = await RegisterService.registrar(validPayload);

    expect(result.Exitoso).toBe(true);
    expect(result.RutaDestino).toBe('/login');
  });

  it('should return failure result when payload is invalid', async () => {
    const result = await RegisterService.registrar({
      ...validPayload,
      CorreoElectronico: 'bad-email',
    });

    expect(result.Exitoso).toBe(false);
    expect(result.RutaDestino).toBe('/register');
  });
});