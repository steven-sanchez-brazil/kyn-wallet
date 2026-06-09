import BrandPanel from '@/components/BrandPanel';
import LoginForm from '@/components/LoginForm';

interface LoginRoutePageProps {
  searchParams?: {
    registered?: string;
  };
}

export default function LoginRoutePage({ searchParams }: LoginRoutePageProps) {
  const successMessage =
    searchParams?.registered === '1'
      ? 'Cuenta creada exitosamente. Ahora puedes iniciar sesión.'
      : undefined;

  return (
    <main className="min-h-screen flex">
      <BrandPanel />

      <div className="w-full lg:w-1/2 flex flex-col justify-center items-center p-8 bg-white">
        <LoginForm successMessage={successMessage} />
      </div>
    </main>
  );
}