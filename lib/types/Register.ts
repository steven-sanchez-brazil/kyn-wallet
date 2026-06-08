export interface RegisterCredentials {
  FullName: string;
  Email: string;
  Password: string;
  ConfirmPassword: string;
  AcceptsTerms: boolean;
}

export interface RegisterResult {
  success: boolean;
  error?: string;
}
