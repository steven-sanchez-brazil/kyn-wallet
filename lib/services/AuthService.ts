import { AuthCredentials, RegisterCredentials, User } from '../types/Auth';

export interface IAuthService {
  login(credentials: AuthCredentials): Promise<boolean>;
  register(credentials: RegisterCredentials): Promise<boolean>;
  isAuthenticated(): boolean;
}

const MOCK_USERS: User[] = [
  {
    FullName: 'STEVEN LUNA',
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
      (u) => u.Email.toLowerCase() === credentials.Email.toLowerCase() && u.Password === credentials.Password
    );

    if (user) {
      currentUser = user;
      return true;
    }

    return false;
  },

  async register(credentials: RegisterCredentials): Promise<boolean> {
    // Simulating API delay
    await new Promise((resolve) => setTimeout(resolve, 500));

    const exists = MOCK_USERS.some(
      (u) => u.Email.toLowerCase() === credentials.Email.toLowerCase()
    );

    if (exists) {
      return false;
    }

    MOCK_USERS.push({
      FullName: credentials.FullName,
      Email: credentials.Email,
      Password: credentials.Password,
    });

    return true;
  },

  isAuthenticated(): boolean {
    return currentUser !== null;
  },
};
