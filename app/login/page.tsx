'use client';

import { Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import BrandPanel from '@/components/BrandPanel';
import LoginForm from '@/components/LoginForm';

function SuccessBanner() {
  const searchParams = useSearchParams();
  const registered = searchParams.get('registered') === 'true';

  if (!registered) {
    return null;
  }

  return (
    <div
      role="status"
      className="w-full max-w-md mb-6 bg-green-50 text-green-700 p-3 rounded-lg text-sm border border-green-200"
    >
      ¡Cuenta creada exitosamente! Ahora puedes iniciar sesión.
    </div>
  );
}

export default function LoginPage() {
  return (
    <main className="min-h-screen flex">
      {/* Brand Side (Left on Desktop) */}
      <BrandPanel />

      {/* Form Side (Right on Desktop, Full on Mobile) */}
      <div className="w-full lg:w-1/2 flex flex-col justify-center items-center p-8 bg-white">
        <Suspense fallback={null}>
          <SuccessBanner />
        </Suspense>
        <LoginForm />
      </div>
    </main>
  );
}
