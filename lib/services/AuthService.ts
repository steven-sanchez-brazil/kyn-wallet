import { AuthCredentials, RegisterCredentials, User } from '../types/Auth';

export interface IAuthService {
  login(credentials: AuthCredentials): Promise<boolean>;
  register(credentials: RegisterCredentials): Promise<boolean>;
  isAuthenticated(): boolean;
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

  async register(credentials: RegisterCredentials): Promise<boolean> {
    // Simulating API delay
    await new Promise((resolve) => setTimeout(resolve, 500));

    // Check if user already exists
    const exists = MOCK_USERS.some((u) => u.Email === credentials.Email);
    if (exists) return false;

    // Add user to mock database
    MOCK_USERS.push({
      Email: credentials.Email,
      Password: credentials.Password,
    });

    return true;
  },

  isAuthenticated(): boolean {
    return currentUser !== null;
  },
};
