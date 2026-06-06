export interface RegisterFormData {
  fullName: string;
  email: string;
  password: string;
  confirmPassword: string;
  acceptTerms: boolean;
}

export interface RegisterFormErrors {
  fullName: string | null;
  email: string | null;
  password: string | null;
  confirmPassword: string | null;
  acceptTerms: string | null;
}

export interface RegisterResult {
  success: boolean;
  message: string;
  redirectTo: '/login';
}
