import type { ReactNode } from 'react';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import { REGISTER_PATH, SESSION_COOKIE_NAME } from '@/lib/routes';
import { parseAuthSession } from '@/lib/auth/session';

type ProtectedRouteProps = {
  children: ReactNode;
  fallbackPath?: string;
};

export function ProtectedRoute({ children, fallbackPath = REGISTER_PATH }: ProtectedRouteProps) {
  const sessionCookie = cookies().get(SESSION_COOKIE_NAME)?.value;
  const session = parseAuthSession(sessionCookie);

  if (!session?.isAuthenticated) {
    redirect(fallbackPath);
  }

  return <>{children}</>;
}
