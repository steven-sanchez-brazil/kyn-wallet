export type DemoUser = {
  fullName: string;
  email: string;
  password: string;
};

export const DEMO_USERS: readonly DemoUser[] = [
  {
    fullName: 'Diego Martínez',
    email: 'diego@kynwallet.com',
    password: 'KynWallet123'
  },
  {
    fullName: 'Steven Luna',
    email: 'steven@kynwallet.com',
    password: 'WalletDemo123'
  }
] as const;

export function getDemoEmails(users: readonly DemoUser[] = DEMO_USERS) {
  return users.map((user) => user.email.toLowerCase());
}

export function isKnownDemoEmail(email: string, users: readonly DemoUser[] = DEMO_USERS) {
  const normalizedEmail = email.trim().toLowerCase();
  return users.some((user) => user.email.toLowerCase() === normalizedEmail);
}
