import { AuthCredentials, User, RegisterCredentials, RegisterResult } from '../types/Auth';

export interface IAuthService {
  login(credentials: AuthCredentials): Promise<boolean>;
  register(credentials: RegisterCredentials): Promise<RegisterResult>;
  isAuthenticated(): boolean;
}

const MOCK_USERS: User[] = [
  {
    FullName: 'Steven Luna',
    Email: 'tucorreo@ejemplo.com',
    Password: 'password123',
  },
];

const LOCALSTORAGE_KEY = 'kynwallet_users';

let currentUser: User | null = null;
let registeredUsers: User[] = [];

// Load registered users from localStorage on initialization
const loadRegisteredUsers = (): User[] => {
  if (typeof window === 'undefined') return [];
  try {
    const stored = localStorage.getItem(LOCALSTORAGE_KEY);
    return stored ? JSON.parse(stored) : [];
  } catch {
    return [];
  }
};

// Save registered users to localStorage
const saveRegisteredUsers = (users: User[]): void => {
  if (typeof window === 'undefined') return;
  try {
    localStorage.setItem(LOCALSTORAGE_KEY, JSON.stringify(users));
  } catch {
    // Silently fail if localStorage is not available
  }
};

// Initialize registered users on module load
registeredUsers = loadRegisteredUsers();

const getAllUsers = (): User[] => {
  return [...MOCK_USERS, ...registeredUsers];
};

export const AuthService: IAuthService = {
  async login(credentials: AuthCredentials): Promise<boolean> {
    // Simulating API delay
    await new Promise((resolve) => setTimeout(resolve, 500));

    const allUsers = getAllUsers();
    const user = allUsers.find(
      (u) => u.Email === credentials.Email && u.Password === credentials.Password
    );

    if (user) {
      currentUser = user;
      return true;
    }

    return false;
  },

  async register(credentials: RegisterCredentials): Promise<RegisterResult> {
    // Simulating API delay
    await new Promise((resolve) => setTimeout(resolve, 500));

    const allUsers = getAllUsers();
    
    // Check if email already exists
    if (allUsers.some((u) => u.Email === credentials.Email)) {
      return { success: false, error: 'EMAIL_TAKEN' };
    }

    // Create new user
    const newUser: User = {
      FullName: credentials.FullName,
      Email: credentials.Email,
      Password: credentials.Password,
    };

    // Add to registered users
    registeredUsers.push(newUser);
    saveRegisteredUsers(registeredUsers);

    return { success: true };
  },

  isAuthenticated(): boolean {
    return currentUser !== null;
  },
};

