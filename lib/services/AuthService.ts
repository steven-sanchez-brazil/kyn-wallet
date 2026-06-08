import { AuthCredentials, RegisterInput, RegisterResult, User } from '../types/Auth';
import { UserStore } from './UserStore';
import {
  validateEmail,
  validatePassword,
  validatePasswordMatch,
  validateRequiredField,
  validateTermsAccepted,
} from '../utils/Validation';

export interface IAuthService {
  login(credentials: AuthCredentials): Promise<boolean>;
  register(input: RegisterInput): Promise<RegisterResult>;
  isAuthenticated(): boolean;
  resetForTests(): void;
}

let currentUser: User | null = null;

export const AuthService: IAuthService = {
  async login(credentials: AuthCredentials): Promise<boolean> {
    await new Promise((resolve) => setTimeout(resolve, 100));

    const user = UserStore.list().find(
      (u) => u.Email === credentials.Email && u.Password === credentials.Password
    );

    if (user) {
      currentUser = user;
      return true;
    }

    return false;
  },

  isAuthenticated(): boolean {
    return currentUser !== null;
  },

  async register(input: RegisterInput): Promise<RegisterResult> {
    await new Promise((resolve) => setTimeout(resolve, 100));

    const hasRequiredFields =
      validateRequiredField(input.FullName) &&
      validateRequiredField(input.Email) &&
      validateRequiredField(input.Password) &&
      validateRequiredField(input.ConfirmPassword);

    const isValid =
      hasRequiredFields &&
      validateEmail(input.Email) &&
      validatePassword(input.Password) &&
      validatePasswordMatch(input.Password, input.ConfirmPassword) &&
      validateTermsAccepted(input.TermsAccepted);

    if (!isValid) {
      return {
        Success: false,
        ErrorCode: 'VALIDATION_ERROR',
        Message: 'Datos de registro inválidos.',
      };
    }

    if (UserStore.findByEmail(input.Email)) {
      return {
        Success: false,
        ErrorCode: 'EMAIL_EXISTS',
        Message: 'El correo ya se encuentra registrado.',
      };
    }

    const user: User = {
      FullName: input.FullName,
      Email: input.Email,
      Password: input.Password,
      TermsAccepted: true,
      CreatedAt: new Date().toISOString(),
    };

    UserStore.add(user);

    return {
      Success: true,
      ErrorCode: null,
      Message: 'Usuario registrado correctamente.',
    };
  },

  resetForTests(): void {
    currentUser = null;
    UserStore.reset();
  },
};
