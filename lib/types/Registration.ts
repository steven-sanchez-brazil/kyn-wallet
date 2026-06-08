export interface RegistrationCredentials {
  Email: string;
  Password: string;
  ConfirmPassword: string;
  DisplayName?: string;
}

export interface RegistrationValidationErrors {
  Email?: string;
  Password?: string;
  ConfirmPassword?: string;
}

export interface RegistrationValidationResult {
  IsValid: boolean;
  Errors: RegistrationValidationErrors;
}

export interface RegistrationResult {
  Success: boolean;
  Message: string;
  RedirectTarget: string | null;
}
