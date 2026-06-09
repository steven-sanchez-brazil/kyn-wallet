import BrandPanel from '@/components/BrandPanel';
import LoginForm from '@/components/LoginForm';

interface LoginPageProps {
  searchParams?: {
    success?: string;
  };
}

export default function LoginPage({ searchParams }: LoginPageProps) {
  const registrationSuccess = searchParams?.success === 'registration';

  return (
    <main className="min-h-screen flex bg-white">
      <BrandPanel />

      <div className="w-full lg:w-1/2 flex flex-col justify-center items-center px-6 py-10 sm:p-8 bg-white">
        {registrationSuccess && (
          <div className="w-full max-w-md mb-6 rounded-lg border border-green-200 bg-green-50 px-4 py-3 text-sm font-medium text-green-700">
            Cuenta creada exitosamente. Ahora puedes iniciar sesión.
          </div>
        )}
        <LoginForm />
      </div>
    </main>
  );
}
