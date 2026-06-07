import { describe, expect, it } from 'vitest';
import { POST } from './route';

const BuildRequest = (body: Record<string, unknown>) => {
  return new Request('http://localhost:3000/api/register', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(body),
  });
};

describe('POST /api/register', () => {
  it('returns 201 for a valid registration request', async () => {
    const email = `nuevo_${Date.now()}@ejemplo.com`;
    const request = BuildRequest({
      fullName: 'Diego Martinez',
      email,
      password: '12345678',
      confirmPassword: '12345678',
      acceptTerms: true,
    });

    const response = await POST(request as never);
    const payload = await response.json();

    expect(response.status).toBe(201);
    expect(payload.success).toBe(true);
    expect(payload.data.email).toBe(email);
    expect(payload.data.redirectTo).toBe('/login?registered=true');
  });

  it('returns 400 validation error for invalid fields', async () => {
    const request = BuildRequest({
      fullName: '',
      email: 'correo-invalido',
      password: '1234',
      confirmPassword: '0000',
      acceptTerms: false,
    });

    const response = await POST(request as never);
    const payload = await response.json();

    expect(response.status).toBe(400);
    expect(payload.success).toBe(false);
    expect(payload.code).toBe('VALIDATION_ERROR');
    expect(payload.errors.email).toBe('Correo electrónico inválido');
    expect(payload.errors.password).toBe('La contraseña debe tener al menos 8 caracteres');
    expect(payload.errors.confirmPassword).toBe('Las contraseñas no coinciden');
    expect(payload.errors.acceptTerms).toBe('Debes aceptar los términos y condiciones');
  });

  it('returns 400 duplicate error for already registered email', async () => {
    const request = BuildRequest({
      fullName: 'Usuario Duplicado',
      email: 'TuCorreo@Ejemplo.Com',
      password: '12345678',
      confirmPassword: '12345678',
      acceptTerms: true,
    });

    const response = await POST(request as never);
    const payload = await response.json();

    expect(response.status).toBe(400);
    expect(payload.success).toBe(false);
    expect(payload.code).toBe('EMAIL_ALREADY_REGISTERED');
    expect(payload.message).toBe('Este correo ya está registrado');
  });

  it('returns 400 with required-field errors when payload is missing fields', async () => {
    const request = BuildRequest({});

    const response = await POST(request as never);
    const payload = await response.json();

    expect(response.status).toBe(400);
    expect(payload.success).toBe(false);
    expect(payload.code).toBe('VALIDATION_ERROR');
    expect(payload.errors.fullName).toBe('El nombre completo es obligatorio');
    expect(payload.errors.email).toBe('El correo electrónico es obligatorio');
    expect(payload.errors.password).toBe('La contraseña es obligatoria');
    expect(payload.errors.confirmPassword).toBe('Debes confirmar la contraseña');
  });
});
