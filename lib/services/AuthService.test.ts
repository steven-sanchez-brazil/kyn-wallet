import { describe, it, expect } from 'vitest';
import { AuthService } from './AuthService';

describe('AuthService', () => {
  it('should return true for valid credentials', async () => {
    const result = await AuthService.login({
      Email: 'tucorreo@ejemplo.com',
      Password: 'password123',
    });
    expect(result).toBe(true);
    expect(AuthService.isAuthenticated()).toBe(true);
  });

  it('should register a new user successfully', async () => {
    const newUser = {
      FullName: 'Alex Mena',
      Email: 'nuevo@ejemplo.com',
      Password: 'password123',
      ConfirmPassword: 'password123',
      TermsAccepted: true,
    };

    const result = await AuthService.register(newUser);
    expect(result.Success).toBe(true);
    
    // Verify user can login after registration
    const loginResult = await AuthService.login({
      Email: newUser.Email,
      Password: newUser.Password,
    });
    expect(loginResult).toBe(true);
  });
});
