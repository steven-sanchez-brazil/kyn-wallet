import { RegistrationCredentials, RegistrationResult } from '../types/Registration';
import { validateRegistrationCredentials } from '../utils/RegistrationValidation';

export interface IRegistrationService {
  register(credentials: RegistrationCredentials): Promise<RegistrationResult>;
  isEmailAvailable(email: string): Promise<boolean>;
}

const MOCK_REGISTERED_EMAILS = new Set<string>(['tucorreo@ejemplo.com']);

export const RegistrationService: IRegistrationService = {
  async register(credentials: RegistrationCredentials): Promise<RegistrationResult> {
    await new Promise((resolve) => setTimeout(resolve, 500));

    const validation = validateRegistrationCredentials(credentials);
    if (!validation.IsValid) {
      const firstError = Object.values(validation.Errors)[0] ?? 'Datos inválidos';
      return {
        Success: false,
        Message: firstError,
        RedirectTarget: null,
      };
    }

    const isAvailable = await this.isEmailAvailable(credentials.Email);
    if (!isAvailable) {
      return {
        Success: false,
        Message: 'El correo electrónico ya está asociado a otra cuenta',
        RedirectTarget: null,
      };
    }

    MOCK_REGISTERED_EMAILS.add(credentials.Email.toLowerCase());

    return {
      Success: true,
      Message: 'Cuenta creada correctamente',
      RedirectTarget: '/construction',
    };
  },

  async isEmailAvailable(email: string): Promise<boolean> {
    await new Promise((resolve) => setTimeout(resolve, 100));
    return !MOCK_REGISTERED_EMAILS.has(email.toLowerCase());
  },
};
