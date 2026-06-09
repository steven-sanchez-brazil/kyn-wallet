import { describe, expect, it } from 'vitest';
import { validateRegisterPayload } from './RegisterValidation';

describe('validateRegisterPayload', () => {
  it('should return no errors for a valid payload', () => {
    const errors = validateRegisterPayload({
      NombreCompleto: 'Diego Martinez',
      CorreoElectronico: 'diego@ejemplo.com',
      Contrasena: 'password123',
      ConfirmacionContrasena: 'password123',
      AceptaTerminos: true,
    });

    expect(errors).toEqual({});
  });

  it('should validate required fields and terms', () => {
    const errors = validateRegisterPayload({
      NombreCompleto: '',
      CorreoElectronico: '',
      Contrasena: '',
      ConfirmacionContrasena: '',
      AceptaTerminos: false,
    });

    expect(errors.NombreCompleto?.Mensaje).toContain('obligatorio');
    expect(errors.CorreoElectronico?.Mensaje).toContain('obligatorio');
    expect(errors.Contrasena?.Mensaje).toContain('obligatoria');
    expect(errors.ConfirmacionContrasena?.Mensaje).toContain('confirmar');
    expect(errors.AceptaTerminos?.Mensaje).toContain('términos');
  });

  it('should validate email format and password constraints', () => {
    const errors = validateRegisterPayload({
      NombreCompleto: 'Nombre Válido',
      CorreoElectronico: 'correo-invalido',
      Contrasena: '123',
      ConfirmacionContrasena: '1234',
      AceptaTerminos: true,
    });

    expect(errors.CorreoElectronico?.Mensaje).toContain('Formato de correo inválido');
    expect(errors.Contrasena?.Mensaje).toContain('al menos 8 caracteres');
    expect(errors.ConfirmacionContrasena?.Mensaje).toContain('no coinciden');
  });
});