export interface AuthCredentials {
  Email: string;
  Password: string;
}

export interface User {
  FullName: string;
  Email: string;
  Password: string;
}

export interface RegisterPayload {
  FullName: string;
  Email: string;
  Password: string;
}

export interface RegisterResult {
  Success: boolean;
  Error?: 'EMAIL_EXISTS' | 'UNKNOWN';
}
