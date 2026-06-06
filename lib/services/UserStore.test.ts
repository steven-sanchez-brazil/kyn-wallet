import { describe, it, expect } from 'vitest';
import { UserStore } from './UserStore';

describe('UserStore', () => {
  it('should be seeded with the existing mock user', () => {
    const user = UserStore.findByEmail('tucorreo@ejemplo.com');
    expect(user).toBeDefined();
    expect(user?.Password).toBe('password123');
  });

  it('should find emails case-insensitively and trimming whitespace', () => {
    expect(UserStore.findByEmail('  TUCORREO@EJEMPLO.COM  ')).toBeDefined();
  });

  it('should return undefined for unknown emails', () => {
    expect(UserStore.findByEmail('desconocido@ejemplo.com')).toBeUndefined();
  });

  it('should add a new user that can then be found', () => {
    UserStore.add({
      Email: 'nuevo@ejemplo.com',
      Password: 'password123',
      FullName: 'Nuevo Usuario',
    });
    const user = UserStore.findByEmail('nuevo@ejemplo.com');
    expect(user).toBeDefined();
    expect(user?.FullName).toBe('Nuevo Usuario');
  });
});
