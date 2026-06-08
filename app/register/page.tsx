import React from 'react';
import BrandPanel from '@/components/BrandPanel';
import { RegisterForm } from '@/components/RegisterForm';

export default function RegisterPage() {
  return (
    <div className="flex min-h-screen bg-white">
      {/* Left Panel - Brand */}
      <BrandPanel
        headline="Comienza tu\ncamino financiero."
        subheadline="Envía, recibe y gestiona dinero sin límites geográficos. Controla tu dinero desde donde sea."
      />

      {/* Right Panel - Form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center px-6 py-8 sm:px-8">
        <RegisterForm />
      </div>
    </div>
  );
}
