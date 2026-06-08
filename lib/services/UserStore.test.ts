import { beforeEach, describe, expect, it } from 'vitest';
import { UserStore } from './UserStore';

describe('UserStore', () => {
  beforeEach(() => {
    UserStore.reset();
  });

  it('starts with default login user', () => {
    expect(UserStore.findByEmail('tucorreo@ejemplo.com')).toBeDefined();
  });

  it('adds and finds a registered user', () => {
    UserStore.add({
      FullName: 'Juan Soto',
      Email: 'juan@ejemplo.com',
      Password: 'password123',
      AcceptTerms: true,
    });

    expect(UserStore.findByEmail('juan@ejemplo.com')).toMatchObject({
      FullName: 'Juan Soto',
      Email: 'juan@ejemplo.com',
    });
  });

  it('does not allow duplicate emails', () => {
    UserStore.add({
      FullName: 'Juan Soto',
      Email: 'juan@ejemplo.com',
      Password: 'password123',
      AcceptTerms: true,
    });

    expect(() =>
      UserStore.add({
        FullName: 'Otra Persona',
        Email: 'juan@ejemplo.com',
        Password: 'password123',
        AcceptTerms: true,
      })
    ).toThrow();
  });
});
