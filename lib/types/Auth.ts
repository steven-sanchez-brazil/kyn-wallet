export interface AuthCredentials {
  Email: string;
  Password: string;
}

export interface RegistrationRequest {
  FullName: string;
  Email: string;
  Password: string;
  AcceptedTerms: boolean;
}

export interface RegistrationResponse {
  Success: boolean;
  Message: string;
  UserId?: string;
}

export interface User {
  Email: string;
  Password: string;
}
