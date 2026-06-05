import BrandPanel from '@/components/BrandPanel';
import LoginForm from '@/components/LoginForm';

interface LoginPageProps {
  searchParams: { registered?: string };
}

export default function LoginPage({ searchParams }: LoginPageProps) {
  const showSuccess = searchParams.registered === 'true';

  return (
    <main className="min-h-screen flex">
      <BrandPanel />

      <div className="w-full lg:w-1/2 flex flex-col justify-center items-center p-8 bg-white">
        <div className="w-full max-w-md space-y-4">
          {showSuccess && (
            <div className="bg-green-50 text-green-700 p-4 rounded-lg text-sm border border-green-200">
              ¡Cuenta creada exitosamente! Inicia sesión para continuar.
            </div>
          )}
          <LoginForm />
        </div>
      </div>
    </main>
  );
}
