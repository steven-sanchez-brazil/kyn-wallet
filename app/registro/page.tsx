import BrandPanel from '@/components/BrandPanel';
import RegisterForm from '@/components/RegisterForm';

export default function RegisterPage() {
  return (
    <main className="min-h-screen flex">
      <BrandPanel 
        headline={(
          <>
            <p className="mb-0">Comienza tu</p>
            <p>camino financiero.</p>
          </>
        )}
        description="Crea tu cuenta en minutos y empieza a enviar, recibir y administrar tu dinero desde cualquier lugar."
      />
      <div className="w-full lg:w-1/2 flex flex-col justify-center items-center p-8 bg-white overflow-y-auto py-12">
        <RegisterForm />
      </div>
    </main>
  );
}
