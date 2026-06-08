import Link from 'next/link';
import { ProtectedRoute } from '@/components/ProtectedRoute';
import { LOGIN_PATH, REGISTER_PATH } from '@/lib/routes';

export default function ConstructionPage() {
  return (
    <ProtectedRoute>
      <main className="flex min-h-screen items-center justify-center bg-[#f6f7fb] px-6 py-12">
        <section className="w-full max-w-xl rounded-[28px] bg-white p-10 text-center shadow-soft ring-1 ring-slate-200/80">
          <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-[#fff1ea] text-3xl">🚧</div>
          <h1 className="mt-6 text-3xl font-bold text-[#16182c]">Pantalla en construcción</h1>
          <p className="mt-3 text-base leading-7 text-[#8a8ba8]">
            Tu registro fue exitoso y ya tienes acceso simulado a la sesión demo.
          </p>

          <div className="mt-8 flex flex-wrap items-center justify-center gap-4 text-sm font-semibold">
            <Link className="rounded-full bg-[#ef5226] px-5 py-3 text-white transition hover:bg-[#d9431a]" href={REGISTER_PATH}>
              Volver al registro
            </Link>
            <Link className="rounded-full border border-[#d7d9e6] px-5 py-3 text-[#16182c] transition hover:bg-[#f6f7fb]" href={LOGIN_PATH}>
              Ir al login
            </Link>
          </div>
        </section>
      </main>
    </ProtectedRoute>
  );
}
