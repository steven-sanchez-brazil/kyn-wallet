import { AuthCredentials, User, RegisterCredentials, RegisterResult } from '../types/Auth';

export interface IAuthService {
  login(credentials: AuthCredentials): Promise<boolean>;
  isAuthenticated(): boolean;
  register(credentials: RegisterCredentials): Promise<RegisterResult>;
}

const MOCK_USERS: User[] = [
  {
    Email: 'tucorreo@ejemplo.com',
    Password: 'password123',
  },
];

let currentUser: User | null = null;

export const AuthService: IAuthService = {
  async login(credentials: AuthCredentials): Promise<boolean> {
    // Simulating API delay
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

  isAuthenticated(): boolean {
    return currentUser !== null;
  },

  async register(credentials: RegisterCredentials): Promise<RegisterResult> {
    // Simulating API delay
    await new Promise((resolve) => setTimeout(resolve, 500));

    const exists = MOCK_USERS.some(
      (u) => u.Email.toLowerCase() === credentials.Email.toLowerCase()
    );

    if (exists) {
      return { Success: false, Error: 'Este correo ya está registrado' };
    }

    MOCK_USERS.push({
      Email: credentials.Email,
      Password: credentials.Password,
    });

    return { Success: true };
  },
};
