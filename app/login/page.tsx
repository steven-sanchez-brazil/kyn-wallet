'use client';

import { useSearchParams } from 'next/navigation';
import BrandPanel from '@/components/BrandPanel';
import LoginForm from '@/components/LoginForm';

export default function LoginPage() {
  const searchParams = useSearchParams();
  const registered = searchParams.get('registered');

  return (
    <main className="min-h-screen flex">
      <BrandPanel />

      <div className="w-full lg:w-1/2 flex flex-col justify-center items-center p-8 bg-white">
        {registered === 'true' && (
          <div className="w-full max-w-[400px] mb-4 p-3 bg-green-50 border border-green-200 rounded-lg text-green-700 text-sm text-center">
            ¡Cuenta creada exitosamente! Inicia sesión con tus credenciales.
          </div>
        )}
        <LoginForm />
      </div>
    </main>
  );
}
