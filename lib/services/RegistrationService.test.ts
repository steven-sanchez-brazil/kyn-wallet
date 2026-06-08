import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { RegistrationService } from './RegistrationService';
import { RegistrationData } from '../types/Registration';

const validData: RegistrationData = {
  FullName: 'Ana García',
  Email: 'ana@ejemplo.com',
  Password: 'password123',
  ConfirmPassword: 'password123',
  AcceptsTerms: true,
};

describe('RegistrationService', () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it('should return true for valid data with AcceptsTerms: true', async () => {
    const promise = RegistrationService.register(validData);
    await vi.runAllTimersAsync();
    const result = await promise;
    expect(result).toBe(true);
  });

  it('should return false when AcceptsTerms is false', async () => {
    const promise = RegistrationService.register({ ...validData, AcceptsTerms: false });
    await vi.runAllTimersAsync();
    const result = await promise;
    expect(result).toBe(false);
  });

  it('should return false when Email is empty', async () => {
    const promise = RegistrationService.register({ ...validData, Email: '' });
    await vi.runAllTimersAsync();
    const result = await promise;
    expect(result).toBe(false);
  });

  it('should return false when FullName is empty', async () => {
    const promise = RegistrationService.register({ ...validData, FullName: '' });
    await vi.runAllTimersAsync();
    const result = await promise;
    expect(result).toBe(false);
  });

  it('should resolve with ~500ms delay', async () => {
    const promise = RegistrationService.register(validData);
    // Not resolved yet before advancing timers
    let resolved = false;
    promise.then(() => { resolved = true; });

    // Advance timers by 499ms — should not be resolved yet
    vi.advanceTimersByTime(499);
    await Promise.resolve(); // flush microtask queue
    expect(resolved).toBe(false);

    // Advance remaining 1ms — should now resolve
    vi.advanceTimersByTime(1);
    await vi.runAllTimersAsync();
    const result = await promise;
    expect(result).toBe(true);
  });
});
