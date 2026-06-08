import assert from 'node:assert/strict';
import test from 'node:test';
import { validateRegistrationForm } from '@/lib/auth/validation';

test('validateRegistrationForm rejects whitespace-only and empty fields', () => {
  const result = validateRegistrationForm({
    fullName: '   ',
    email: '   ',
    password: '',
    confirmPassword: '',
    acceptTerms: false
  });

  assert.equal(result.isValid, false);
  assert.equal(result.errors.fullName, 'Ingresa tu nombre completo.');
  assert.equal(result.errors.email, 'Ingresa tu correo electrónico.');
  assert.equal(result.errors.password, 'Ingresa una contraseña.');
  assert.equal(result.errors.confirmPassword, 'Confirma tu contraseña.');
  assert.equal(result.errors.acceptTerms, 'Debes aceptar los términos y condiciones.');
});
