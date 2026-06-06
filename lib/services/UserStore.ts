import { User } from '../types/Auth';

export interface IUserStore {
  findByEmail(email: string): User | undefined;
  add(user: User): void;
}

const normalizeEmail = (email: string): string => email.trim().toLowerCase();

const users: User[] = [
  {
    Email: 'tucorreo@ejemplo.com',
    Password: 'password123',
  },
];

/**
 * Fuente única de verdad de usuarios simulados (en memoria), compartida
 * por el flujo de Login (AuthService) y el de Registro (RegistrationService).
 */
export const UserStore: IUserStore = {
  findByEmail(email: string): User | undefined {
    const target = normalizeEmail(email);
    return users.find((u) => normalizeEmail(u.Email) === target);
  },

  add(user: User): void {
    users.push(user);
  },
};
