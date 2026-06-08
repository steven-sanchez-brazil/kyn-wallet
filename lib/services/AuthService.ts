import { AuthCredentials, User } from '../types/Auth';
import { UserStore } from './UserStore';

export interface IAuthService {
  login(credentials: AuthCredentials): Promise<boolean>;
  isAuthenticated(): boolean;
}

let currentUser: User | null = null;

export const AuthService: IAuthService = {
  async login(credentials: AuthCredentials): Promise<boolean> {
    // Simulating API delay
    await new Promise((resolve) => setTimeout(resolve, 500));

    const user = UserStore.findByEmail(credentials.Email.trim().toLowerCase());

    if (user && user.Password === credentials.Password) {
      currentUser = user;
      return true;
    }

    return false;
  },

  isAuthenticated(): boolean {
    return currentUser !== null;
  },
};
