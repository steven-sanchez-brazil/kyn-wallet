import { describe, it, expect } from 'vitest';
import { RegistrationService } from './RegistrationService';
import { AuthService } from './AuthService';
import { UserStore } from './UserStore';
import { RegistrationData } from '../types/Auth';

const validData = (overrides: Partial<RegistrationData> = {}): RegistrationData => ({
  FullName: 'Diego Martínez',
  Email: 'diego@ejemplo.com',
  Password: 'password123',
  PasswordConfirmation: 'password123',
  AcceptedTerms: true,
  ...overrides,
});

describe('RegistrationService.register', () => {
  it('C1: registers a new user with valid data and stores it', async () => {
    const email = 'c1-nuevo@ejemplo.com';
    const result = await RegistrationService.register(validData({ Email: email }));
    expect(result).toEqual({ Success: true, ErrorCode: null });
    expect(UserStore.findByEmail(email)).toBeDefined();
  });

  it('C2: rejects an already registered email without changing the store', async () => {
    const result = await RegistrationService.register(
      validData({ Email: 'tucorreo@ejemplo.com' })
    );
    expect(result).toEqual({ Success: false, ErrorCode: 'EMAIL_TAKEN' });
  });

  it('C3: rejects an invalid email format', async () => {
    const result = await RegistrationService.register(
      validData({ Email: 'correo-invalido' })
    );
    expect(result).toEqual({ Success: false, ErrorCode: 'INVALID' });
  });

  it('C4: rejects a password shorter than 8 characters', async () => {
    const result = await RegistrationService.register(
      validData({ Email: 'c4@ejemplo.com', Password: 'short', PasswordConfirmation: 'short' })
    );
    expect(result).toEqual({ Success: false, ErrorCode: 'INVALID' });
  });

  it('C5: rejects when password and confirmation differ', async () => {
    const result = await RegistrationService.register(
      validData({ Email: 'c5@ejemplo.com', PasswordConfirmation: 'password124' })
    );
    expect(result).toEqual({ Success: false, ErrorCode: 'INVALID' });
  });

  it('C6: rejects when terms are not accepted', async () => {
    const result = await RegistrationService.register(
      validData({ Email: 'c6@ejemplo.com', AcceptedTerms: false })
    );
    expect(result).toEqual({ Success: false, ErrorCode: 'INVALID' });
  });

  it('C7: a registered user can then log in via AuthService (shared UserStore)', async () => {
    const email = 'c7@ejemplo.com';
    await RegistrationService.register(validData({ Email: email }));
    const loggedIn = await AuthService.login({ Email: email, Password: 'password123' });
    expect(loggedIn).toBe(true);
  });
});
