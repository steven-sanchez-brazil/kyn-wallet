import React from 'react';
import Link from 'next/link';

export default function ConstructionPage() {
  return (
    <div className="min-h-screen flex flex-col justify-center items-center p-8 bg-neutral-50 text-center">
      <div className="max-w-md space-y-6">
        <span className="text-6xl">🚧</span>
        <h1 className="text-3xl font-bold text-neutral-900">
          Página en construcción
        </h1>
        <p className="text-neutral-500 text-lg">
          Esta sección de la billetera está actualmente en desarrollo. Pronto estará disponible.
        </p>
        <div className="pt-4">
          <Link 
            href="/"
            className="text-brand-primary font-semibold hover:underline"
          >
            ← Volver al inicio
          </Link>
        </div>
      </div>
    </div>
  );
}
