export interface RegistrationData {
  FullName: string;
  Email: string;
  Password: string;
  ConfirmPassword: string;
  AcceptsTerms: boolean;
}

export interface IRegistrationService {
  register(data: RegistrationData): Promise<boolean>;
}
