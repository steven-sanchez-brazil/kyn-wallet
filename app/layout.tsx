import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'KynWallet',
  description: 'Registro y acceso para billetera virtual'
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="es">
      <body>{children}</body>
    </html>
  );
}
