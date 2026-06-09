import { describe, expect, it } from 'vitest';
import { RegisterService } from '../../lib/services/RegisterService';

describe('RegisterService contract', () => {
  it('returns duplicate email contract', async () => {
    const result = await RegisterService.register({
      NombreCompleto: 'Nuevo Usuario',
      CorreoElectronico: 'tucorreo@ejemplo.com',
      Contrasena: 'password123',
      ConfirmarContrasena: 'password123',
      AceptaTerminos: true,
    });

    expect(result.Exitoso).toBe(false);
    expect(result.TipoError).toBe('CorreoExistente');
    expect(result.Errores?.CorreoElectronico).toBeDefined();
  });

  it('returns transient error contract', async () => {
    const result = await RegisterService.register({
      NombreCompleto: 'Nuevo Usuario',
      CorreoElectronico: 'timeout@ejemplo.com',
      Contrasena: 'password123',
      ConfirmarContrasena: 'password123',
      AceptaTerminos: true,
    });

    expect(result.Exitoso).toBe(false);
    expect(result.TipoError).toBe('TecnicoTransitorio');
    expect(result.Mensaje).toContain('No pudimos crear tu cuenta');
  });

  it('returns success contract', async () => {
    const result = await RegisterService.register({
      NombreCompleto: 'Persona Nueva',
      CorreoElectronico: 'persona.nueva@ejemplo.com',
      Contrasena: 'password123',
      ConfirmarContrasena: 'password123',
      AceptaTerminos: true,
    });

    expect(result.Exitoso).toBe(true);
    expect(result.RutaSiguiente).toBe('/login');
  });
});
