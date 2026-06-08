import { describe, it, expect, vi, beforeEach } from 'vitest';
import { AuthService } from './AuthService';

describe('AuthService', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('should return true for valid credentials', async () => {
    // Mock successful response
    (global.fetch as any).mockResolvedValueOnce({
      ok: true,
      json: async () => ({ 
        success: true, 
        user: { Nombre: 'Diego', Email: 'tucorreo@ejemplo.com' } 
      }),
    });

    const result = await AuthService.login({
      Email: 'tucorreo@ejemplo.com',
      Password: 'password123',
    });
    expect(result).toBe(true);
    expect(AuthService.isAuthenticated()).toBe(true);
    expect(AuthService.getUser()?.Nombre).toBe('Diego');
  });

  it('should return false for invalid credentials', async () => {
    // Mock failed response
    (global.fetch as any).mockResolvedValueOnce({
      ok: false,
      json: async () => ({ success: false, message: 'Credenciales inválidas' }),
    });

    const result = await AuthService.login({
      Email: 'wrong@example.com',
      Password: 'wrongpassword',
    });
    expect(result).toBe(false);
  });
});

