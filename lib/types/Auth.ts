export interface AuthCredentials {
  Email: string;
  Password: string;
}

export interface User {
  Email: string;
  Password: string;
  FullName?: string;
}

export interface UserRegistrationData {
  FullName: string;
  Email: string;
  Password: string;
  ConfirmPassword: string;
  TermsAccepted: boolean;
}

export interface RegistrationResponse {
  Success: boolean;
  ErrorMessage?: string;
}
