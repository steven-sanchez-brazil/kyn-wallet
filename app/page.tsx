import BrandPanel from '@/components/BrandPanel';
import LoginForm from '@/components/LoginForm';

interface LoginPageProps {
  searchParams?: {
    registered?: string;
  };
}

export default function LoginPage({ searchParams }: LoginPageProps) {
  const showRegistrationSuccess = searchParams?.registered === '1';

  return (
    <main className="min-h-screen flex">
      {/* Brand Side (Left on Desktop) */}
      <BrandPanel />

      {/* Form Side (Right on Desktop, Full on Mobile) */}
      <div className="w-full lg:w-1/2 flex flex-col justify-center items-center p-8 bg-white">
        <LoginForm showRegistrationSuccess={showRegistrationSuccess} />
      </div>
    </main>
  );
}
