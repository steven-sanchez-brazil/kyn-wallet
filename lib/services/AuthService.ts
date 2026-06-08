import { AuthCredentials, User, RegisterCredentials } from '../types/Auth';

export interface IAuthService {
  login(credentials: AuthCredentials): Promise<boolean>;
  register(credentials: RegisterCredentials): Promise<boolean>;
  isAuthenticated(): boolean;
  getMockUsers(): User[];
}

const MOCK_USERS: User[] = [
  {
    Name: 'Steven Luna',
    Email: 'tucorreo@ejemplo.com',
    Password: 'password123',
  },
  {
    Name: 'Luke Skywalker',
    Email: 'luke@skywalker.com',
    Password: 'password123',
  },
  {
    Name: 'Leia Organa',
    Email: 'leia@organa.com',
    Password: 'password123',
  },
  {
    Name: 'Han Solo',
    Email: 'han@solo.com',
    Password: 'password123',
  },
  {
    Name: 'Obi-Wan Kenobi',
    Email: 'obiwan@kenobi.com',
    Password: 'password123',
  },
  {
    Name: 'Darth Vader',
    Email: 'darth@vader.com',
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

    const emailLower = credentials.Email.toLowerCase();
    const exists = MOCK_USERS.some((u) => u.Email.toLowerCase() === emailLower);

    if (exists) {
      throw new Error('Este correo electrónico ya se encuentra registrado');
    }

    const newUser: User = {
      Name: credentials.Name,
      Email: credentials.Email,
      Password: credentials.Password,
    };

    MOCK_USERS.push(newUser);
    currentUser = newUser;
    return true;
  },

  isAuthenticated(): boolean {
    return currentUser !== null;
  },

  getMockUsers(): User[] {
    return MOCK_USERS;
  },
};
