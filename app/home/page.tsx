'use client';
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { AuthService } from '@/lib/services/AuthService';
import Sidebar from '@/components/home/Sidebar';
import SummaryCards from '@/components/home/SummaryCards';
import QuickActions from '@/components/home/QuickActions';
import Movements from '@/components/home/Movements';
import CardVisual from '@/components/home/CardVisual';
import MonthlySummary from '@/components/home/MonthlySummary';
import MobileHeader from '@/components/home/MobileHeader';
import BottomNav from '@/components/home/BottomNav';

export default function HomePage() {
  const router = useRouter();
  const [user, setUser] = useState<{ Nombre: string; Email: string } | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!AuthService.isAuthenticated()) {
      router.push('/login');
    } else {
      setUser(AuthService.getUser());
      setLoading(false);
    }
  }, [router]);

  if (loading) {
    return <div className="min-h-screen flex items-center justify-center bg-[#f4f5f9]">Cargando...</div>;
  }

  const firstName = user?.Nombre.split(' ')[0] || 'Usuario';

  return (
    <main className="min-h-screen bg-[#f4f5f9] flex">
      {/* Desktop Sidebar */}
      <Sidebar />

      {/* Main Content */}
      <div className="flex-1 lg:ml-[260px] pb-24 lg:pb-8">
        {/* Mobile Header */}
        <div className="lg:hidden">
            <MobileHeader />
            {/* Actions Card for Mobile (floating over header) */}
            <div className="px-4 mt-[-48px] relative z-10">
                <div className="bg-white border border-[#d7d9e6] rounded-[20px] p-6 shadow-sm">
                    <QuickActions />
                </div>
            </div>
        </div>

        {/* Desktop Header */}
        <header className="hidden lg:flex justify-between items-center px-10 py-6 bg-white border-b border-[#d7d9e6]">
          <div>
            <h1 className="text-[22px] font-bold text-[#16182c]">Inicio</h1>
            <p className="text-[13px] text-[#8a8ca8]">Bienvenido de nuevo, {firstName}</p>
          </div>
          <div className="flex items-center gap-4">
            <div className="w-[40px] h-[40px] bg-[#f4f5f9] border border-[#d7d9e6] rounded-[20px] flex items-center justify-center relative cursor-pointer hover:bg-neutral-50 transition-colors">
               <div className="w-2.5 h-2.5 bg-[#ef5226] rounded-full absolute top-[6px] right-[10px] border border-white" />
               <span className="text-xl">🔔</span>
            </div>
            <div className="w-[40px] h-[40px] bg-[#f4f5f9] rounded-full flex items-center justify-center font-bold text-[#3d3f5c] border border-[#d7d9e6]">
                {firstName[0]}
            </div>
          </div>
        </header>

        {/* Scrollable Content */}
        <div className="px-6 lg:px-10 py-8 space-y-8">
          {/* Summary Section (Desktop Only) */}
          <div className="hidden lg:block">
            <SummaryCards />
          </div>

          <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
            <div className="xl:col-span-2 space-y-8">
              {/* Actions Section (Desktop Only) */}
              <section className="hidden lg:block">
                <h2 className="text-[16px] font-bold text-[#16182c] mb-4">Acciones rápidas</h2>
                <QuickActions />
              </section>

              {/* Movements Section */}
              <section>
                <div className="flex justify-between items-center mb-4 lg:hidden">
                    <h2 className="text-[17px] font-bold text-[#16182c]">Movimientos</h2>
                    <button className="text-[13px] font-semibold text-[#ff6b3d]">ver todo →</button>
                </div>
                <Movements />
              </section>
            </div>

            <div className="space-y-8">
              {/* Card Section */}
              <section>
                <h2 className="text-[16px] font-bold text-[#16182c] mb-4">Mi tarjeta</h2>
                <CardVisual />
              </section>

              {/* Monthly Summary */}
              <section>
                <MonthlySummary />
              </section>
            </div>
          </div>
        </div>

        {/* Mobile Bottom Nav */}
        <BottomNav />
      </div>
    </main>
  );
}
