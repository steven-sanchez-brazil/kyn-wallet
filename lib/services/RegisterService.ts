import { RegisterCredentials, RegisterResult } from '../types/Register';

export interface IRegisterService {
  register(credentials: RegisterCredentials): Promise<RegisterResult>;
  emailExists(email: string): boolean;
}

// Simulated in-memory user store (persists within session)
const registeredEmails: string[] = ['tucorreo@ejemplo.com'];

export const RegisterService: IRegisterService = {
  async register(credentials: RegisterCredentials): Promise<RegisterResult> {
    // Simulate API delay
    await new Promise((resolve) => setTimeout(resolve, 500));

    if (RegisterService.emailExists(credentials.Email)) {
      return { success: false, error: 'Este correo ya está registrado.' };
    }

    // Simulate storing the new user
    registeredEmails.push(credentials.Email.toLowerCase());
    return { success: true };
  },

  emailExists(email: string): boolean {
    return registeredEmails.includes(email.toLowerCase());
  },
};
