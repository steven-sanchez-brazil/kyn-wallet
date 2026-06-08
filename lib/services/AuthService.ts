import { AuthCredentials, User } from '../types/Auth';

export interface IAuthService {
  login(credentials: AuthCredentials): Promise<boolean>;
  register(user: User): Promise<boolean>;
  isAuthenticated(): boolean;
  getUser(): { Nombre: string; Email: string } | null;
  logout(): void;
}

let currentUser: { Nombre: string; Email: string } | null = null;

// Try to recover session from localStorage (client-side only)
if (typeof window !== 'undefined') {
  const savedUser = localStorage.getItem('kyn_user');
  if (savedUser) {
    currentUser = JSON.parse(savedUser);
  }
}

export const AuthService: IAuthService = {
  async login(credentials: AuthCredentials): Promise<boolean> {
    const response = await fetch('/api/auth/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(credentials),
    });

    if (response.ok) {
      const data = await response.json();
      currentUser = data.user;
      if (typeof window !== 'undefined') {
        localStorage.setItem('kyn_user', JSON.stringify(currentUser));
      }
      return true;
    }

    return false;
  },

  async register(user: User): Promise<boolean> {
    const response = await fetch('/api/auth/register', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(user),
    });

    return response.ok;
  },

  isAuthenticated(): boolean {
    return currentUser !== null;
  },

  getUser() {
    return currentUser;
  },

  logout() {
    currentUser = null;
    if (typeof window !== 'undefined') {
      localStorage.removeItem('kyn_user');
    }
  }
};
