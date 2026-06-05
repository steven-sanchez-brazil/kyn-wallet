import { AuthCredentials, User, RegisterCredentials, RegisterResult } from '../types/Auth';

export interface IAuthService {
  login(credentials: AuthCredentials): Promise<boolean>;
  register(credentials: RegisterCredentials): Promise<RegisterResult>;
  isAuthenticated(): boolean;
}

const MOCK_USERS: User[] = [
  {
    Email: 'tucorreo@ejemplo.com',
    Password: 'password123',
    FullName: 'Usuario Demo',
  },
];

let currentUser: User | null = null;

export const AuthService: IAuthService = {
  async login(credentials: AuthCredentials): Promise<boolean> {
    await new Promise((resolve) => setTimeout(resolve, 500));

    const user = MOCK_USERS.find(
      (u) => u.Email === credentials.Email && u.Password === credentials.Password
    );

    if (user) {
      currentUser = user;
      return true;
    }

    return false;
  },

  async register(credentials: RegisterCredentials): Promise<RegisterResult> {
    await new Promise((resolve) => setTimeout(resolve, 500));

    const exists = MOCK_USERS.some((u) => u.Email === credentials.Email);
    if (exists) {
      return { success: false, error: 'Este correo ya está registrado.' };
    }

    MOCK_USERS.push({
      Email: credentials.Email,
      Password: credentials.Password,
      FullName: credentials.FullName,
    });

    return { success: true };
  },

  isAuthenticated(): boolean {
    return currentUser !== null;
  },
};
