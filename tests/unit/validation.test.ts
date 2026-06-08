import assert from 'node:assert/strict';
import test from 'node:test';
import { validateRegistrationForm } from '@/lib/auth/validation';

test('validateRegistrationForm accepts valid registration data', () => {
  const result = validateRegistrationForm({
    fullName: 'María López',
    email: 'maria@newwallet.com',
    password: 'Wallet123',
    confirmPassword: 'Wallet123',
    acceptTerms: true
  });

  assert.equal(result.isValid, true);
  assert.deepEqual(result.errors, {});
});

test('validateRegistrationForm rejects invalid registration data', () => {
  const result = validateRegistrationForm({
    fullName: '',
    email: 'bad-email',
    password: 'short',
    confirmPassword: 'different',
    acceptTerms: false
  });

  assert.equal(result.isValid, false);
  assert.equal(result.errors.fullName, 'Ingresa tu nombre completo.');
  assert.equal(result.errors.email, 'Ingresa un correo electrónico válido.');
  assert.equal(result.errors.password, 'La contraseña debe tener al menos 8 caracteres, una letra y un número.');
  assert.equal(result.errors.confirmPassword, 'Las contraseñas no coinciden.');
  assert.equal(result.errors.acceptTerms, 'Debes aceptar los términos y condiciones.');
});
