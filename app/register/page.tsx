import React from 'react';
import BrandPanel from '../../components/BrandPanel';
import { RegisterForm } from '../../components/RegisterForm';
import { SocialLogins } from '../../components/SocialLogins';
import Link from 'next/link';

export default function RegisterPage() {
  return (
    <main className="min-h-screen flex animate-fade-in">
      {/* Brand Panel (Left on Desktop) */}
      <BrandPanel />

      {/* Form Panel (Right on Desktop, Full on Mobile) */}
      <div className="flex-1 flex flex-col justify-center px-6 lg:px-24 py-12 bg-white overflow-y-auto">
        <div className="w-full max-w-md mx-auto">
          <div className="mb-10 text-center lg:text-left">
            <h1 className="text-3xl font-bold text-neutral-900 mb-3">
              Crea tu cuenta
            </h1>
            <p className="text-neutral-500">
              Únete a miles de usuarios que ya simplificaron sus finanzas.
            </p>
          </div>

          <RegisterForm />

          <SocialLogins />
        </div>
      </div>
    </main>
  );
}
