import { afterEach, describe, expect, it, vi } from 'vitest';
import { MapApiErrorsToFormErrors, RegistrationService } from './RegistrationService';
import { RegistrationFormData } from '../types/Registration';

const ValidRegistrationData: RegistrationFormData = {
  FullName: 'Diego Martinez',
  Email: 'diego@ejemplo.com',
  Password: '12345678',
  ConfirmPassword: '12345678',
  AcceptTerms: true,
};

afterEach(() => {
  vi.restoreAllMocks();
});

describe('RegistrationService', () => {
  it('parses success payload from 201 response', async () => {
    vi.spyOn(globalThis, 'fetch').mockResolvedValue({
      ok: true,
      status: 201,
      json: async () => ({
        success: true,
        message: 'Registro exitoso',
        data: {
          userId: 'usr_001',
          email: 'diego@ejemplo.com',
          redirectTo: '/login?registered=true',
        },
      }),
    } as Response);

    const Result = await RegistrationService.Register(ValidRegistrationData);

    expect(Result.success).toBe(true);
    if (Result.success) {
      expect(Result.data.redirectTo).toBe('/login?registered=true');
    }
  });

  it('maps 400 error payload', async () => {
    vi.spyOn(globalThis, 'fetch').mockResolvedValue({
      ok: false,
      status: 400,
      json: async () => ({
        success: false,
        message: 'Error de validación',
        code: 'VALIDATION_ERROR',
        errors: {
          email: 'Correo electrónico inválido',
        },
      }),
    } as Response);

    const Result = await RegistrationService.Register(ValidRegistrationData);

    expect(Result.success).toBe(false);
    if (!Result.success) {
      expect(Result.code).toBe('VALIDATION_ERROR');
      expect(Result.errors?.email).toBe('Correo electrónico inválido');
    }
  });

  it('defaults to VALIDATION_ERROR code when 400 payload omits code', async () => {
    vi.spyOn(globalThis, 'fetch').mockResolvedValue({
      ok: false,
      status: 400,
      json: async () => ({
        success: false,
        message: 'Error de validación',
        errors: {
          email: 'Correo electrónico inválido',
        },
      }),
    } as Response);

    const Result = await RegistrationService.Register(ValidRegistrationData);

    expect(Result.success).toBe(false);
    if (!Result.success) {
      expect(Result.code).toBe('VALIDATION_ERROR');
    }
  });

  it('returns UNEXPECTED_ERROR for non-400 http status', async () => {
    vi.spyOn(globalThis, 'fetch').mockResolvedValue({
      ok: false,
      status: 500,
      json: async () => ({
        success: false,
        message: 'Server error',
        code: 'UNEXPECTED_ERROR',
      }),
    } as Response);

    const Result = await RegistrationService.Register(ValidRegistrationData);

    expect(Result.success).toBe(false);
    if (!Result.success) {
      expect(Result.code).toBe('UNEXPECTED_ERROR');
    }
  });

  it('returns REQUEST_TIMEOUT when fetch is aborted', async () => {
    vi.spyOn(globalThis, 'fetch').mockImplementation((input, init) => {
      const signal = init?.signal;

      return new Promise<Response>((_resolve, reject) => {
        signal?.addEventListener('abort', () => {
          reject(new DOMException('Aborted', 'AbortError'));
        });
      });
    });

    const Result = await RegistrationService.Register(ValidRegistrationData, 5);

    expect(Result.success).toBe(false);
    if (!Result.success) {
      expect(Result.code).toBe('REQUEST_TIMEOUT');
    }
  });

  it('returns UNEXPECTED_ERROR for generic fetch failure', async () => {
    vi.spyOn(globalThis, 'fetch').mockRejectedValue(new Error('Network failure'));

    const Result = await RegistrationService.Register(ValidRegistrationData);

    expect(Result.success).toBe(false);
    if (!Result.success) {
      expect(Result.code).toBe('UNEXPECTED_ERROR');
    }
  });

  it('maps api error fields to form errors', () => {
    const FormErrors = MapApiErrorsToFormErrors({
      email: 'Correo electrónico inválido',
      password: 'La contraseña debe tener al menos 8 caracteres',
    });

    expect(FormErrors.Email).toBe('Correo electrónico inválido');
    expect(FormErrors.Password).toBe('La contraseña debe tener al menos 8 caracteres');
  });
});
