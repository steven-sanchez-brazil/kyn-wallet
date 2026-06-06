import { AuthCredentials, User, RegisterData } from '../types/Auth';

export interface IAuthService {
  login(credentials: AuthCredentials): Promise<boolean>;
  register(data: RegisterData): Promise<boolean>;
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

  async register(data: RegisterData): Promise<boolean> {
    // Simulating API delay
    await new Promise((resolve) => setTimeout(resolve, 500));

    // Persist the user in memory for this session
    MOCK_USERS.push({
      Email: data.Email,
      Password: data.Password,
    });

    return true;
  },

  isAuthenticated(): boolean {
    return currentUser !== null;
  },
};
