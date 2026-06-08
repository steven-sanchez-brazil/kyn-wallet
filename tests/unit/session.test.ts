import assert from 'node:assert/strict';
import test from 'node:test';
import { buildAuthSession, parseAuthSession, parseAuthSessionFromCookieHeader, serializeAuthSession } from '@/lib/auth/session';

test('serializeAuthSession round-trips an auth session', () => {
  const session = buildAuthSession({ fullName: 'Diego Martínez', email: 'diego@kynwallet.com' });
  const serialized = serializeAuthSession(session);
  const parsed = parseAuthSession(serialized);

  assert.ok(parsed);
  assert.equal(parsed?.isAuthenticated, true);
  assert.equal(parsed?.fullName, 'Diego Martínez');
  assert.equal(parsed?.email, 'diego@kynwallet.com');
});

test('parseAuthSessionFromCookieHeader reads the protected session cookie', () => {
  const serialized = serializeAuthSession(buildAuthSession({ fullName: 'Steven Luna', email: 'steven@kynwallet.com' }));
  const parsed = parseAuthSessionFromCookieHeader(`kw_session=${serialized}; path=/`);

  assert.ok(parsed);
  assert.equal(parsed?.isAuthenticated, true);
  assert.equal(parsed?.email, 'steven@kynwallet.com');
});
