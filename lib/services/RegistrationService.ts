import { RegistrationData, RegistrationResult } from '../types/Auth';
import {
  validateEmail,
  validatePassword,
  validateRequired,
  validatePasswordsMatch,
} from '../utils/Validation';
import { UserStore } from './UserStore';

export interface IRegistrationService {
  register(data: RegistrationData): Promise<RegistrationResult>;
}

const isValid = (data: RegistrationData): boolean => {
  return (
    validateRequired(data.FullName) &&
    validateEmail(data.Email) &&
    validatePassword(data.Password) &&
    validatePasswordsMatch(data.Password, data.PasswordConfirmation) &&
    data.AcceptedTerms === true
  );
};

export const RegistrationService: IRegistrationService = {
  async register(data: RegistrationData): Promise<RegistrationResult> {
    // Simulating API delay (coherente con AuthService)
    await new Promise((resolve) => setTimeout(resolve, 500));

    // Defensa en profundidad: la UI valida, el servicio revalida.
    if (!isValid(data)) {
      return { Success: false, ErrorCode: 'INVALID' };
    }

    if (UserStore.findByEmail(data.Email)) {
      return { Success: false, ErrorCode: 'EMAIL_TAKEN' };
    }

    UserStore.add({
      Email: data.Email,
      Password: data.Password,
      FullName: data.FullName,
    });

    return { Success: true, ErrorCode: null };
  },
};
