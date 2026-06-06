import BrandPanel from '@/components/BrandPanel';
import LoginForm from '@/components/LoginForm';

interface LoginPageProps {
  searchParams?: {
    mensaje?: string;
    registroExitoso?: string;
  };
}

export default function LoginPage({ searchParams }: LoginPageProps) {
  const successMessage =
    searchParams?.registroExitoso === '1' && searchParams?.mensaje
      ? decodeURIComponent(searchParams.mensaje)
      : null;

  return (
    <main className="min-h-screen flex">
      <BrandPanel />
      <div className="w-full lg:w-1/2 flex flex-col justify-center items-center p-8 bg-white">
        <LoginForm successMessage={successMessage ?? undefined} />
      </div>
    </main>
  );
}
