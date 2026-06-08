// @vitest-environment node
import { describe, it, expect, beforeEach } from 'vitest';
import { AuthService } from './AuthService';
import { NuevoUsuario } from '../types/Auth';

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

  describe('register', () => {
    const nuevoUsuario: NuevoUsuario = {
      NombreCompleto: 'Juan Perez',
      Email: 'nuevo@ejemplo.com',
      Contrasena: 'password123',
      ConfirmarContrasena: 'password123',
    };

    it('should register a new user successfully', async () => {
      const result = await AuthService.register(nuevoUsuario);
      expect(result.Exitoso).toBe(true);
      expect(result.MensajeError).toBeUndefined();
    });

    it('should return error when email is already registered', async () => {
      const duplicado: NuevoUsuario = {
        ...nuevoUsuario,
        Email: 'tucorreo@ejemplo.com',
      };
      const result = await AuthService.register(duplicado);
      expect(result.Exitoso).toBe(false);
      expect(result.MensajeError).toBeTruthy();
    });

    it('should allow login after successful registration', async () => {
      const uniqueEmail = `test_${Date.now()}@ejemplo.com`;
      const datos: NuevoUsuario = {
        NombreCompleto: 'Test User',
        Email: uniqueEmail,
        Contrasena: 'password123',
        ConfirmarContrasena: 'password123',
      };
      await AuthService.register(datos);
      const loginResult = await AuthService.login({ Email: uniqueEmail, Password: 'password123' });
      expect(loginResult).toBe(true);
    });
  });
});
