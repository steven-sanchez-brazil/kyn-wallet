'use client';

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { AuthService } from '../../lib/services/AuthService';
import { User } from '../../lib/types/Auth';
import { Button } from '../../components/ui/Button';

export default function WelcomePage() {
  const router = useRouter();
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    if (!AuthService.isAuthenticated()) {
      router.push('/');
      return;
    }
    setUser(AuthService.getCurrentUser());
  }, [router]);

  if (!user) return null;

  return (
    <main className="min-h-screen flex items-center justify-center bg-neutral-50 p-6">
      <div className="bg-white p-8 rounded-2xl shadow-sm border border-neutral-200 w-full max-w-sm text-center">
        <h1 className="text-2xl font-bold text-neutral-900 mb-2">¡Bienvenido!</h1>
        <p className="text-neutral-500 mb-6">Has iniciado sesión correctamente.</p>
        
        <div className="bg-neutral-50 p-4 rounded-lg mb-6 text-left space-y-2">
          <p className="text-sm text-neutral-500">Nombre:</p>
          <p className="font-semibold text-neutral-900">{user.FullName || 'Usuario'}</p>
          <p className="text-sm text-neutral-500 pt-2">Correo:</p>
          <p className="font-semibold text-neutral-900">{user.Email}</p>
        </div>

        <Button onClick={() => router.push('/')}>Ir a inicio</Button>
      </div>
    </main>
  );
}
