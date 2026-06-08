import { User } from '../types/Auth';

const DEFAULT_USERS: User[] = [
  {
    FullName: 'Usuario Demo',
    Email: 'tucorreo@ejemplo.com',
    Password: 'password123',
    AcceptTerms: true,
  },
];

let users: User[] = [...DEFAULT_USERS];

const normalizeEmail = (email: string): string => email.trim().toLowerCase();

export const UserStore = {
  getAll(): User[] {
    return [...users];
  },

  findByEmail(email: string): User | undefined {
    const normalized = normalizeEmail(email);
    return users.find((user) => normalizeEmail(user.Email) === normalized);
  },

  add(user: User): void {
    const normalizedEmail = normalizeEmail(user.Email);

    if (this.findByEmail(normalizedEmail)) {
      throw new Error('El correo ya se encuentra registrado.');
    }

    users.push({
      ...user,
      Email: normalizedEmail,
      FullName: user.FullName.trim(),
    });
  },

  reset(): void {
    users = [...DEFAULT_USERS];
  },
};
