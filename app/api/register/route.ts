import { NextRequest, NextResponse } from 'next/server';
import {
  RegistrationApiResponse,
  RegistrationApiValidationErrors,
  RegistrationErrorResponse,
  RegistrationFormData,
  RegistrationValidationErrors,
  RegistrationSuccessResponse,
} from '@/lib/types/Registration';
import { NormalizeEmail, ValidateRegistrationData } from '@/lib/utils/RegistrationValidation';

interface RegistrationRequestBody {
  fullName?: string;
  email?: string;
  password?: string;
  confirmPassword?: string;
  acceptTerms?: boolean;
}

const RegisteredEmails = new Set<string>(['tucorreo@ejemplo.com']);

const BuildValidationError = (
  errors: RegistrationApiValidationErrors
): RegistrationErrorResponse => ({
  success: false,
  message: 'Error de validación',
  code: 'VALIDATION_ERROR',
  errors,
});

const ToApiValidationErrors = (
  errors: RegistrationValidationErrors
): RegistrationApiValidationErrors => ({
  fullName: errors.FullName,
  email: errors.Email,
  password: errors.Password,
  confirmPassword: errors.ConfirmPassword,
  acceptTerms: errors.AcceptTerms,
  general: errors.General,
});

const BuildDuplicateEmailError = (): RegistrationErrorResponse => ({
  success: false,
  message: 'Este correo ya está registrado',
  code: 'EMAIL_ALREADY_REGISTERED',
});

const BuildSuccessResponse = (email: string): RegistrationSuccessResponse => ({
  success: true,
  message: 'Registro exitoso',
  data: {
    userId: `usr_${Date.now()}`,
    email,
    redirectTo: '/login?registered=true',
  },
});

const MapBodyToRegistrationData = (body: RegistrationRequestBody): RegistrationFormData => ({
  FullName: (body.fullName ?? '').trim(),
  Email: body.email ?? '',
  Password: body.password ?? '',
  ConfirmPassword: body.confirmPassword ?? '',
  AcceptTerms: body.acceptTerms ?? false,
});

export async function POST(request: NextRequest): Promise<NextResponse<RegistrationApiResponse>> {
  const body = (await request.json()) as RegistrationRequestBody;
  const registrationData = MapBodyToRegistrationData(body);

  const validationErrors = ValidateRegistrationData(registrationData);

  if (Object.keys(validationErrors).length > 0) {
    return NextResponse.json(BuildValidationError(ToApiValidationErrors(validationErrors)), {
      status: 400,
    });
  }

  const normalizedEmail = NormalizeEmail(registrationData.Email);

  if (RegisteredEmails.has(normalizedEmail)) {
    return NextResponse.json(BuildDuplicateEmailError(), { status: 400 });
  }

  RegisteredEmails.add(normalizedEmail);

  return NextResponse.json(BuildSuccessResponse(normalizedEmail), { status: 201 });
}
