import { User } from '../types/Auth';

const SeedUsers: User[] = [
  {
    FullName: 'Usuario Demo',
    Email: 'tucorreo@ejemplo.com',
    Password: 'password123',
    TermsAccepted: true,
    CreatedAt: new Date().toISOString(),
  },
];

let Users: User[] = [...SeedUsers];

export const UserStore = {
  list(): User[] {
    return [...Users];
  },

  findByEmail(email: string): User | undefined {
    return Users.find((user) => user.Email.toLowerCase() === email.toLowerCase());
  },

  add(user: User): void {
    Users.push(user);
  },

  reset(): void {
    Users = [...SeedUsers];
  },
};
