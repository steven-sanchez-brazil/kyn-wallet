import { SESSION_COOKIE_NAME } from '@/lib/routes';

export type RegistrationValues = {
  fullName: string;
  email: string;
  password: string;
  confirmPassword: string;
  acceptTerms: boolean;
};

export type AuthSession = {
  isAuthenticated: boolean;
  fullName: string;
  email: string;
  createdAt: string;
};

export type ValidationErrors = Partial<Record<keyof RegistrationValues | 'form', string>>;

export function buildAuthSession(input: Pick<AuthSession, 'fullName' | 'email'>): AuthSession {
  return {
    isAuthenticated: true,
    fullName: input.fullName,
    email: input.email,
    createdAt: new Date().toISOString()
  };
}

export function serializeAuthSession(session: AuthSession) {
  return encodeURIComponent(JSON.stringify(session));
}

export function parseAuthSession(serialized?: string | null): AuthSession | null {
  if (!serialized) {
    return null;
  }

  try {
    const decoded = JSON.parse(decodeURIComponent(serialized)) as AuthSession;
    if (!decoded || decoded.isAuthenticated !== true) {
      return null;
    }
    return decoded;
  } catch {
    return null;
  }
}

export function parseAuthSessionFromCookieHeader(cookieHeader?: string | null) {
  if (!cookieHeader) {
    return null;
  }

  const cookie = cookieHeader
    .split(';')
    .map((item) => item.trim())
    .find((item) => item.startsWith(`${SESSION_COOKIE_NAME}=`));

  if (!cookie) {
    return null;
  }

  const [, value] = cookie.split('=');
  return parseAuthSession(value);
}

export function persistAuthSession(session: AuthSession) {
  if (typeof document === 'undefined') {
    return;
  }

  const value = serializeAuthSession(session);
  document.cookie = `${SESSION_COOKIE_NAME}=${value}; path=/; max-age=86400; samesite=lax`;
}

export function clearAuthSession() {
  if (typeof document === 'undefined') {
    return;
  }

  document.cookie = `${SESSION_COOKIE_NAME}=; path=/; max-age=0; samesite=lax`;
}
