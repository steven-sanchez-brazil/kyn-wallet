import assert from 'node:assert/strict';
import test from 'node:test';
import { CONSTRUCTION_PATH, isProtectedPath, LOGIN_PATH, REGISTER_PATH } from '@/lib/routes';

test('route constants remain stable', () => {
  assert.equal(REGISTER_PATH, '/register');
  assert.equal(LOGIN_PATH, '/login');
  assert.equal(CONSTRUCTION_PATH, '/construction');
});

test('isProtectedPath only protects the construction page', () => {
  assert.equal(isProtectedPath('/construction'), true);
  assert.equal(isProtectedPath('/login'), false);
  assert.equal(isProtectedPath('/register'), false);
});
