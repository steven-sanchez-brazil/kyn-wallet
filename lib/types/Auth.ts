export interface AuthCredentials {
  Email: string;
  Password: string;
}

export interface User {
  Email: string;
  Password: string;
}

export interface RegisterData {
  FullName: string;
  Email: string;
  Password: string;
}

export interface RegisterResult {
  Success: boolean;
  Message: string;
}
