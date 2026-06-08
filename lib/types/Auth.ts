export interface AuthCredentials {
  Email: string;
  Password: string;
}

export interface User {
  FullName?: string;
  Email: string;
  Password: string;
}

export interface UserRegistrationDTO {
  FullName: string;
  Email: string;
  Password: string;
}
