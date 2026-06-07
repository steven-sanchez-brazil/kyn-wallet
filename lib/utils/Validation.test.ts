import { describe, it, expect } from 'vitest';
import { validateRegistro } from './Validation';
import { UsuarioRegistro } from '../types/Auth';

describe('Validation Utility', () => {
  const validData: UsuarioRegistro = {
    NombreCompleto: 'Juan Perez',
    CorreoElectronico: 'juan@perez.com',
    Contrasena: 'Password123!',
    ConfirmarContrasena: 'Password123!',
    AceptoTerminos: true,
  };

  it('should return valid true for correct data', () => {
    const result = validateRegistro(validData);
    expect(result.IsValid).toBe(true);
    expect(Object.keys(result.Errors).length).toBe(0);
  });

  describe('Email Validation', () => {
    it('should fail for invalid email format', () => {
      const result = validateRegistro({ ...validData, CorreoElectronico: 'invalid-email' });
      expect(result.IsValid).toBe(false);
      expect(result.Errors.CorreoElectronico).toBeDefined();
    });

    it('should fail for email without domain extension', () => {
      const result = validateRegistro({ ...validData, CorreoElectronico: 'user@domain' });
      expect(result.IsValid).toBe(false);
    });

    it('should fail for prohibited domains (case-insensitive)', () => {
      const prohibited = ['root@kyn.com', 'SYSTEM@kyn.com', 'Administrator@kyn.com', 'guest@kyn.com', 'nobody@kyn.com'];
      prohibited.forEach(email => {
        const result = validateRegistro({ ...validData, CorreoElectronico: email });
        expect(result.IsValid).toBe(false);
        expect(result.Errors.CorreoElectronico).toContain('permitido');
      });
    });
  });

  describe('Password Validation', () => {
    it('should fail for password shorter than 8 characters', () => {
      const result = validateRegistro({ ...validData, Contrasena: 'Pass1!' });
      expect(result.IsValid).toBe(false);
    });

    it('should fail for password without uppercase', () => {
      const result = validateRegistro({ ...validData, Contrasena: 'password123!' });
      expect(result.IsValid).toBe(false);
    });

    it('should fail for password without special character', () => {
      const result = validateRegistro({ ...validData, Contrasena: 'Password123' });
      expect(result.IsValid).toBe(false);
    });

    it('should fail for password without number (Registration requirement)', () => {
      const result = validateRegistro({ ...validData, Contrasena: 'Password!!', ConfirmarContrasena: 'Password!!' });
      expect(result.IsValid).toBe(false);
      expect(result.Errors.Contrasena).toContain('número');
    });

    it('should fail if passwords do not match', () => {
      const result = validateRegistro({ ...validData, ConfirmarContrasena: 'Different123!' });
      expect(result.IsValid).toBe(false);
      expect(result.Errors.ConfirmarContrasena).toBeDefined();
    });
  });

  describe('Terms and Conditions', () => {
    it('should fail if terms are not accepted', () => {
      const result = validateRegistro({ ...validData, AceptoTerminos: false });
      expect(result.IsValid).toBe(false);
      expect(result.Errors.AceptoTerminos).toBeDefined();
    });
  });

  describe('Required Fields', () => {
    it('should fail if NombreCompleto is empty', () => {
      const result = validateRegistro({ ...validData, NombreCompleto: '' });
      expect(result.IsValid).toBe(false);
      expect(result.Errors.NombreCompleto).toBeDefined();
    });
  });
});
