export interface AuthCredentials {
  Email: string;
  Password: string;
}

export interface User {
  Email: string;
  Password: string;
  FullName?: string;
}

export interface RegistrationData {
  FullName: string;
  Email: string;
  Password: string;
  PasswordConfirmation: string;
  AcceptedTerms: boolean;
}

export type RegistrationResult =
  | { Success: true; ErrorCode: null }
  | { Success: false; ErrorCode: 'EMAIL_TAKEN' | 'INVALID' };
