import { beforeEach, describe, it, expect } from 'vitest';
import { AuthService } from './AuthService';
import { UserStore } from './UserStore';

describe('AuthService', () => {
  beforeEach(() => {
    UserStore.reset();
  });

  it('should return true for valid credentials', async () => {
    const result = await AuthService.login({
      Email: 'tucorreo@ejemplo.com',
      Password: 'password123',
    });
    expect(result).toBe(true);
    expect(AuthService.isAuthenticated()).toBe(true);
  });

  it('should return false for invalid credentials', async () => {
    const result = await AuthService.login({
      Email: 'wrong@example.com',
      Password: 'wrongpassword',
    });
    expect(result).toBe(false);
  });
});
