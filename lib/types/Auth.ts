export interface AuthCredentials {
  Email: string;
  Password: string;
}

export interface User {
  FullName?: string;
  Email: string;
  Password: string;
  TermsAccepted?: boolean;
  CreatedAt?: string;
}

export interface RegisterInput {
  FullName: string;
  Email: string;
  Password: string;
  ConfirmPassword: string;
  TermsAccepted: boolean;
}

export interface RegisterResult {
  Success: boolean;
  ErrorCode: 'EMAIL_EXISTS' | 'VALIDATION_ERROR' | null;
  Message: string;
}
