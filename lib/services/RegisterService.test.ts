import { describe, it, expect } from 'vitest';
import { RegisterService } from './RegisterService';

describe('RegisterService', () => {
  it('should return success for valid registration data', async () => {
    const result = await RegisterService.register({
      FullName: 'Juan Pérez',
      Email: 'juan@ejemplo.com',
      Password: 'password123',
    });

    expect(result.Success).toBe(true);
    expect(result.Message).toBe('Cuenta creada exitosamente');
  });

  it('should always return success (simulated registration)', async () => {
    const result = await RegisterService.register({
      FullName: 'Otro Usuario',
      Email: 'otro@ejemplo.com',
      Password: 'otropass123',
    });

    expect(result.Success).toBe(true);
  });

  it('should simulate async behavior (non-instant)', async () => {
    const start = Date.now();
    await RegisterService.register({
      FullName: 'Test',
      Email: 'test@test.com',
      Password: 'testpass123',
    });
    const elapsed = Date.now() - start;
    expect(elapsed).toBeGreaterThanOrEqual(100);
  });
});
