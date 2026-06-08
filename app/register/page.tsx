import { BrandPanel } from '@/components/BrandPanel';
import { RegistrationForm } from '@/components/RegistrationForm';
import { SocialButtons } from '@/components/SocialButtons';

export default function RegisterPage() {
  return (
    <main className="min-h-screen bg-white lg:grid lg:grid-cols-[minmax(0,620px)_1fr]">
      <BrandPanel />
      <section className="flex min-h-screen items-center justify-center bg-white px-6 py-10 sm:px-10 lg:px-16">
        <div className="w-full max-w-[400px] p-0 sm:p-0">
          <p className="text-sm font-medium text-[#8a8ba8]">KynWallet</p>
          <h1 className="mt-5 text-[30px] font-bold tracking-tight text-[#16182c]">Crea tu cuenta</h1>
          <p className="mt-2 text-[16px] leading-6 text-[#8a8ba8]">Completa tus datos para comenzar</p>

          <div className="mt-8">
            <RegistrationForm />
          </div>

          <SocialButtons className="mt-8" />
        </div>
      </section>
    </main>
  );
}
