import BrandPanel from '@/components/BrandPanel';
import RegisterForm from '@/components/RegisterForm';

export default function RegisterPage() {
  return (
    <main className="min-h-screen flex bg-[#f7f8fc]">
      <BrandPanel
        title="Comienza tu camino financiero."
        subtitle="Crea tu cuenta en minutos y empieza a enviar, recibir y administrar tu dinero desde cualquier lugar."
      />

      <div className="w-full lg:w-1/2 flex flex-col justify-center items-center px-6 py-10 sm:px-8 bg-[#f7f8fc]">
        <RegisterForm />
      </div>
    </main>
  );
}