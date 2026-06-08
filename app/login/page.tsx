import BrandPanel from '@/components/BrandPanel';
import LoginForm from '@/components/LoginForm';

export default function LoginPage({
  searchParams,
}: {
  searchParams: { registered?: string };
}) {
  return (
    <main className="min-h-screen flex">
      <BrandPanel />
      <div className="w-full lg:w-1/2 flex flex-col justify-center items-center p-8 bg-white">
        {searchParams.registered === 'true' && (
          <div className="w-full max-w-md mb-4 p-3 rounded-lg bg-orange-50 border border-orange-200 text-orange-700 text-sm">
            ¡Cuenta creada exitosamente! Inicia sesión para continuar.
          </div>
        )}
        <LoginForm />
      </div>
    </main>
  );
}
