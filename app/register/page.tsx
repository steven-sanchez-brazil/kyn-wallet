import React from 'react';
import BrandPanel from '@/components/BrandPanel';
import RegisterForm from '@/components/RegisterForm';

export default function RegisterPage() {
  const registerHeadline = (
    <>
      <p className="mb-0">Comienza tu</p>
      <p>camino financiero.</p>
    </>
  );

  const registerDescription = 'Crea tu cuenta en minutos y empieza a enviar, recibir y administrar tu dinero desde cualquier lugar.';

  return (
    <main className="min-h-screen flex">
      {/* Brand Side (Left on Desktop) */}
      <BrandPanel headline={registerHeadline} description={registerDescription} />

      {/* Form Side (Right on Desktop, Full on Mobile) */}
      <div className="w-full lg:w-1/2 flex flex-col justify-center items-center p-8 bg-white">
        <RegisterForm />
      </div>
    </main>
  );
}
