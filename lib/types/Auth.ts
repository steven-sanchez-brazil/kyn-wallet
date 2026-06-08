export interface AuthCredentials {
  Email: string;
  Password: string;
}

export interface RegisterCredentials extends AuthCredentials {
  Name: string;
}

export interface User {
  Name: string;
  Email: string;
  Password: string;
}
