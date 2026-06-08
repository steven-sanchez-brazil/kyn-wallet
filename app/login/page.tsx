import { LoginForm } from '@/components/LoginForm';
import { LoginPanel } from '@/components/LoginPanel';

export default function LoginPage() {
  return (
    <main className="min-h-screen bg-white lg:grid lg:grid-cols-[minmax(0,620px)_1fr]">
      <LoginPanel />
      <section className="flex min-h-screen items-center justify-center bg-white px-6 py-10 sm:px-10 lg:px-16">
        <div className="w-full max-w-[400px]">
          <p className="text-sm font-medium text-[#8a8ba8]">KynWallet</p>
          <h1 className="mt-5 text-[32px] font-bold tracking-tight text-[#16182c]">Bienvenido de nuevo</h1>
          <p className="mt-2 text-base leading-6 text-[#8a8ba8]">Ingresa a tu cuenta para continuar</p>

          <div className="mt-8">
            <LoginForm />
          </div>
        </div>
      </section>
    </main>
  );
}
