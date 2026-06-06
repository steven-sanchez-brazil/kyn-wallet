import { AuthCredentials, User, RegisterPayload, RegisterResult } from '../types/Auth';

export interface IAuthService {
  login(credentials: AuthCredentials): Promise<boolean>;
  register(payload: RegisterPayload): Promise<RegisterResult>;
  isAuthenticated(): boolean;
}

const INITIAL_USERS: User[] = [
  { FullName: 'Usuario Demo', Email: 'tucorreo@ejemplo.com', Password: 'password123' },
];

let MOCK_USERS: User[] = [...INITIAL_USERS];
let currentUser: User | null = null;

export const resetAuthState = (): void => {
  MOCK_USERS = [...INITIAL_USERS];
  currentUser = null;
};

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

  async register(payload: RegisterPayload): Promise<RegisterResult> {
    await new Promise((resolve) => setTimeout(resolve, 500));
    const exists = MOCK_USERS.find((u) => u.Email === payload.Email);
    if (exists) return { Success: false, Error: 'EMAIL_EXISTS' };
    MOCK_USERS.push({ FullName: payload.FullName, Email: payload.Email, Password: payload.Password });
    return { Success: true };
  },

  isAuthenticated(): boolean {
    return currentUser !== null;
  },
};
