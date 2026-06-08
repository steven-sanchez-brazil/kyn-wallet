import { AuthCredentials, User, UserRegistrationData, RegistrationResponse } from '../types/Auth';

export interface IAuthService {
  login(credentials: AuthCredentials): Promise<boolean>;
  register(data: UserRegistrationData): Promise<RegistrationResponse>;
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

  async register(data: UserRegistrationData): Promise<RegistrationResponse> {
    // Simulating API delay
    await new Promise((resolve) => setTimeout(resolve, 500));

    const existingUser = MOCK_USERS.find((u) => u.Email === data.Email);
    if (existingUser) {
      return { Success: false, ErrorMessage: 'El correo electrónico ya está registrado.' };
    }

    const newUser: User = {
      Email: data.Email,
      Password: data.Password,
      FullName: data.FullName,
    };

    MOCK_USERS.push(newUser);
    return { Success: true };
  },

  isAuthenticated(): boolean {
    return currentUser !== null;
  },

  getCurrentUser(): User | null {
    return currentUser;
  },
};
