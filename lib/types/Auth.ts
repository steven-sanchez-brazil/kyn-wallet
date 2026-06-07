export interface AuthCredentials {
  Email: string;
  Password: string;
}

export interface User {
  FullName: string;
  Email: string;
  Password: string;
}

export interface RegisterData extends User {
  ConfirmPassword: string;
  TermsAccepted: boolean;
}
