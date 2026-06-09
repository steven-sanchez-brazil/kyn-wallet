import { Suspense } from 'react';
import BrandPanel from '@/components/BrandPanel';
import LoginForm from '@/components/LoginForm';

interface LoginPageProps {
  searchParams: { registered?: string };
}

export default function LoginPage({ searchParams }: LoginPageProps) {
  const showRegisteredBanner = searchParams.registered === 'true';

  return (
    <main className="min-h-screen flex">
      <BrandPanel />
      <div className="w-full lg:w-1/2 flex flex-col justify-center items-center p-8 bg-white">
        <Suspense>
          <LoginForm showRegisteredBanner={showRegisteredBanner} />
        </Suspense>
      </div>
    </main>
  );
}
