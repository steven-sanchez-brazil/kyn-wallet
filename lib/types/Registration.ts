export interface RegistrationFormData {
  FullName: string;
  Email: string;
  Password: string;
  ConfirmPassword: string;
  AcceptTerms: boolean;
}

export interface RegistrationValidationErrors {
  FullName?: string;
  Email?: string;
  Password?: string;
  ConfirmPassword?: string;
  AcceptTerms?: string;
  General?: string;
}

export interface RegistrationApiValidationErrors {
  fullName?: string;
  email?: string;
  password?: string;
  confirmPassword?: string;
  acceptTerms?: string;
  general?: string;
}

export interface RegistrationSuccessResponse {
  success: true;
  message: string;
  data: {
    userId: string;
    email: string;
    redirectTo: '/login?registered=true';
  };
}

export interface RegistrationErrorResponse {
  success: false;
  message: string;
  errors?: RegistrationApiValidationErrors;
  code: 'VALIDATION_ERROR' | 'EMAIL_ALREADY_REGISTERED' | 'REQUEST_TIMEOUT' | 'UNEXPECTED_ERROR';
}

export type RegistrationApiResponse = RegistrationSuccessResponse | RegistrationErrorResponse;
