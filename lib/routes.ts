export const REGISTER_PATH = '/register';
export const LOGIN_PATH = '/login';
export const CONSTRUCTION_PATH = '/construction';
export const SESSION_COOKIE_NAME = 'kw_session';

export function isProtectedPath(pathname: string) {
  return pathname === CONSTRUCTION_PATH;
}
