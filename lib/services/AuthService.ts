import { AuthCredentials, User, UserRegistrationDTO } from '../types/Auth';

export interface IAuthService {
  login(credentials: AuthCredentials): Promise<boolean>;
  register(newUser: UserRegistrationDTO): Promise<boolean>;
  isAuthenticated(): boolean;
  clearRegisteredUsers(): void;
}

const MOCK_USERS: User[] = [
  {
    Email: 'tucorreo@ejemplo.com',
    Password: 'password123',
  },
];

let currentUser: User | null = null;
let inMemoryRegisteredUsers: User[] = [];

const STORAGE_KEY = 'kyn_wallet_registered_users';

const getRegisteredUsers = (): User[] => {
  if (typeof window !== 'undefined' && window.localStorage) {
    try {
      const stored = window.localStorage.getItem(STORAGE_KEY);
      return stored ? JSON.parse(stored) : [];
    } catch {
      return inMemoryRegisteredUsers;
    }
  }
  return inMemoryRegisteredUsers;
};

const saveRegisteredUsers = (users: User[]): void => {
  if (typeof window !== 'undefined' && window.localStorage) {
    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(users));
    } catch {
      inMemoryRegisteredUsers = users;
    }
  } else {
    inMemoryRegisteredUsers = users;
  }
};

export const AuthService: IAuthService = {
  async login(credentials: AuthCredentials): Promise<boolean> {
    // Simulating API delay
    await new Promise((resolve) => setTimeout(resolve, 500));

    // Check fixed mock users list
    let user = MOCK_USERS.find(
      (u) => u.Email === credentials.Email && u.Password === credentials.Password
    );

    // If not found, check registered users
    if (!user) {
      const registered = getRegisteredUsers();
      user = registered.find(
        (u) => u.Email === credentials.Email && u.Password === credentials.Password
      );
    }

    if (user) {
      currentUser = user;
      return true;
    }

    return false;
  },

  async register(newUser: UserRegistrationDTO): Promise<boolean> {
    // Simulating API delay
    await new Promise((resolve) => setTimeout(resolve, 500));

    // Check duplicate in fixed mock users list
    const isMockDup = MOCK_USERS.some(
      (u) => u.Email.toLowerCase() === newUser.Email.toLowerCase()
    );

    const registered = getRegisteredUsers();
    const isRegDup = registered.some(
      (u) => u.Email.toLowerCase() === newUser.Email.toLowerCase()
    );

    if (isMockDup || isRegDup) {
      return false;
    }

    const createdUser: User = {
      FullName: newUser.FullName,
      Email: newUser.Email,
      Password: newUser.Password,
    };

    saveRegisteredUsers([...registered, createdUser]);
    return true;
  },

  isAuthenticated(): boolean {
    return currentUser !== null;
  },

  clearRegisteredUsers(): void {
    inMemoryRegisteredUsers = [];
    if (typeof window !== 'undefined' && window.localStorage) {
      try {
        window.localStorage.removeItem(STORAGE_KEY);
      } catch {}
    }
    currentUser = null;
  },
};
