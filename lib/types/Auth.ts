export interface AuthCredentials {
  Email: string;
  Password: string;
}

export interface User {
  FullName: string;
  Email: string;
  Password: string;
}

export interface RegisterCredentials {
  FullName: string;
  Email: string;
  Password: string;
  ConfirmPassword: string;
}

export type RegisterErrorCode = 'EMAIL_TAKEN' | 'UNKNOWN';

export interface RegisterResult {
  success: boolean;
  error?: RegisterErrorCode;
}
