import assert from 'node:assert/strict';
import test from 'node:test';
import { validateRegistrationForm } from '@/lib/auth/validation';
import { DEMO_USERS } from '@/lib/auth/demoUsers';

test('validateRegistrationForm rejects an email already present in demo users', () => {
  const known = DEMO_USERS[0].email;
  const result = validateRegistrationForm({
    fullName: 'Test User',
    email: known,
    password: 'Validpass1',
    confirmPassword: 'Validpass1',
    acceptTerms: true
  }, [known]);

  assert.equal(result.isValid, false);
  assert.equal(result.errors.email, 'Este correo ya está registrado en la demo.');
});
