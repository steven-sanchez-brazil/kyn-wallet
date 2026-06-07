import {
  RegistrationApiResponse,
  RegistrationApiValidationErrors,
  RegistrationFormData,
  RegistrationValidationErrors,
} from '../types/Registration';
import { NormalizeEmail } from '../utils/RegistrationValidation';

export interface IRegistrationService {
  Register(data: RegistrationFormData, timeoutMs?: number): Promise<RegistrationApiResponse>;
}

const BuildTimeoutResponse = (): RegistrationApiResponse => ({
  success: false,
  message: 'La solicitud excedió el tiempo de espera',
  code: 'REQUEST_TIMEOUT',
});

const BuildUnexpectedErrorResponse = (): RegistrationApiResponse => ({
  success: false,
  message: 'Ocurrió un error inesperado',
  code: 'UNEXPECTED_ERROR',
});

const NormalizePayload = (data: RegistrationFormData) => ({
  fullName: data.FullName.trim(),
  email: NormalizeEmail(data.Email),
  password: data.Password,
  confirmPassword: data.ConfirmPassword,
  acceptTerms: data.AcceptTerms,
});

const ParseErrorPayload = (
  status: number,
  payload: Partial<RegistrationApiResponse>
): RegistrationApiResponse => {
  const message = typeof payload.message === 'string' ? payload.message : 'Error de validación';

  const errors =
    payload && typeof payload === 'object' && 'errors' in payload
      ? (payload.errors as RegistrationApiValidationErrors)
      : undefined;

  const codeFromPayload =
    payload && typeof payload === 'object' && 'code' in payload
      ? (payload.code as RegistrationApiResponse extends infer T
          ? T extends { code: infer C }
            ? C
            : never
          : never)
      : undefined;

  if (status === 400) {
    return {
      success: false,
      message,
      code: codeFromPayload ?? 'VALIDATION_ERROR',
      errors,
    };
  }

  return BuildUnexpectedErrorResponse();
};

export const MapApiErrorsToFormErrors = (
  errors?: RegistrationApiValidationErrors
): RegistrationValidationErrors => ({
  FullName: errors?.fullName,
  Email: errors?.email,
  Password: errors?.password,
  ConfirmPassword: errors?.confirmPassword,
  AcceptTerms: errors?.acceptTerms,
  General: errors?.general,
});

export const RegistrationService: IRegistrationService = {
  async Register(data: RegistrationFormData, timeoutMs = 5000): Promise<RegistrationApiResponse> {
    const Controller = new AbortController();
    const TimeoutId = setTimeout(() => Controller.abort(), timeoutMs);

    try {
      const response = await fetch('/api/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(NormalizePayload(data)),
        signal: Controller.signal,
      });

      const payload = (await response.json()) as RegistrationApiResponse;

      if (response.ok) {
        return payload;
      }

      return ParseErrorPayload(response.status, payload);
    } catch (error) {
      if (error instanceof DOMException && error.name === 'AbortError') {
        return BuildTimeoutResponse();
      }

      return BuildUnexpectedErrorResponse();
    } finally {
      clearTimeout(TimeoutId);
    }
  },
};
