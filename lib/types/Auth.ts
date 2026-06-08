export interface AuthCredentials {
  Email: string;
  Password: string;
}

export interface User {
  FullName: string;
  Email: string;
  Password: string;
  AcceptTerms: boolean;
}

export interface RegisterPayload {
  FullName: string;
  Email: string;
  Password: string;
  ConfirmPassword: string;
  AcceptTerms: boolean;
}

export interface RegisterResult {
  Success: boolean;
  Message: string;
  FieldErrors?: Record<string, string>;
}
