'use client';

import React, { useEffect, useState } from 'react';
import Sidebar from '@/components/Sidebar';
import { useRouter, useSearchParams } from 'next/navigation';

const TRANSACTIONS = [
  { id: 1, name: 'María González', date: 'Hoy 14:23', amount: 250.00, type: 'incoming' },
  { id: 2, name: 'Netflix', date: 'Hoy 09:15', amount: -35.90, type: 'outgoing' },
  { id: 3, name: 'Recarga BBVA', date: 'Ayer 18:42', amount: 500.00, type: 'incoming' },
  { id: 4, name: 'Spotify', date: 'Ayer 08:00', amount: -19.90, type: 'outgoing' },
];

export default function InicioPage() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const [userName, setUserName] = useState('Usuario');

  useEffect(() => {
    const name = searchParams.get('name');
    if (name) {
      setUserName(decodeURIComponent(name));
    }
  }, [searchParams]);

  const handleLogout = () => {
    router.push('/');
  };

  return (
    <div className="min-h-screen bg-[#f4f5f9] flex flex-col lg:flex-row">
      {/* Desktop Sidebar */}
      <Sidebar />

      {/* Main Content Area */}
      <main className="flex-1 lg:ml-[280px] min-h-screen pb-20 lg:pb-0">
        
        {/* Mobile Header (Hidden on Desktop) */}
        <div 
          className="lg:hidden h-[260px] w-full p-6 flex flex-col justify-between"
          style={{ backgroundImage: "linear-gradient(49.11deg, rgb(255, 138, 101) 31.7%, rgb(239, 82, 38) 83.46%)" }}
        >
          <div className="flex justify-between items-start pt-8">
            <div>
              <p className="text-[11px] font-medium text-white/75 uppercase tracking-wider">Hola</p>
              <h1 className="text-2xl font-bold text-white">{userName}</h1>
            </div>
            <div className="flex gap-4">
              <div className="bg-white/18 border border-white/35 rounded-[20px] p-2.5 relative">
                <span className="text-white text-xl">🔔</span>
                <div className="absolute top-2.5 right-2.5 w-2 h-2 bg-[#ff6b3d] rounded-full border-2 border-[#ef5226]"></div>
              </div>
              <button 
                onClick={handleLogout}
                className="bg-white/18 border border-white/35 rounded-[20px] p-2.5 text-white"
              >
                🚪
              </button>
            </div>
          </div>

          <div className="mb-8">
            <p className="text-[11px] font-medium text-white/75 uppercase tracking-wider">Saldo disponible</p>
            <p className="text-4xl font-bold text-white mt-1">$1,922.90</p>
            <div className="flex items-center gap-2 mt-4">
              <span className="bg-white/20 border border-white/30 rounded-md px-2 py-0.5 text-[11px] font-semibold text-white">MXN</span>
              <span className="text-[13px] text-white/80">· cuenta principal</span>
            </div>
          </div>
        </div>

        {/* Desktop Top Bar (Hidden on Mobile) */}
        <div className="hidden lg:flex items-center justify-between px-10 py-6 bg-white border-b border-neutral-300">
          <h2 className="text-xl font-bold text-neutral-900">Panel de Control</h2>
          <div className="flex items-center gap-6">
            <div className="relative cursor-pointer">
              <span className="text-2xl">🔔</span>
              <div className="absolute top-0 right-0 w-2.5 h-2.5 bg-[#ff6b3d] rounded-full border-2 border-white"></div>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-brand-primary/20 rounded-full flex items-center justify-center text-brand-primary font-bold">
                {userName.charAt(0)}
              </div>
              <span className="font-semibold text-neutral-900">{userName}</span>
            </div>
          </div>
        </div>

        {/* Responsive Content Grid */}
        <div className="px-4 lg:px-10 py-8 max-w-6xl mx-auto w-full">
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            
            {/* Left Column: Balance & Actions (Desktop) / Actions (Mobile) */}
            <div className="lg:col-span-2 space-y-8">
              
              {/* Desktop Balance Card (Hidden on Mobile) */}
              <div 
                className="hidden lg:flex flex-col justify-between p-8 rounded-[24px] text-white h-[220px]"
                style={{ backgroundImage: "linear-gradient(49.11deg, rgb(255, 138, 101) 31.7%, rgb(239, 82, 38) 83.46%)" }}
              >
                <div>
                  <p className="text-sm font-medium text-white/80 uppercase tracking-widest">Saldo Total</p>
                  <p className="text-5xl font-bold mt-2">$1,922.90 <span className="text-2xl font-normal opacity-80">MXN</span></p>
                </div>
                <div className="flex items-center gap-4">
                  <span className="text-white/80 text-sm italic">Cuenta principal verificada</span>
                </div>
              </div>

              {/* Actions Section */}
              <div className={`bg-white rounded-[20px] lg:rounded-[24px] shadow-sm border border-[#d7d9e6] p-5 lg:p-8 flex justify-between items-center ${'-mt-12 lg:mt-0 relative z-10 lg:z-0'}`}>
                <ActionIcon label="Enviar" icon="↗" />
                <ActionIcon label="Recibir" icon="↙" />
                <ActionIcon label="Recargar" icon="+" />
                <ActionIcon label="Más" icon="•••" />
              </div>

              {/* Transaction List */}
              <div className="bg-white lg:bg-transparent rounded-[24px] p-6 lg:p-0 border lg:border-0 border-[#d7d9e6]">
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-[17px] lg:text-xl font-bold text-[#16182c]">Movimientos Recientes</h2>
                  <button className="text-[13px] lg:text-sm font-semibold text-[#ff6b3d] hover:underline">ver todo →</button>
                </div>

                <div className="space-y-4">
                  {TRANSACTIONS.map((tx) => (
                    <TransactionItem key={tx.id} {...tx} />
                  ))}
                </div>
              </div>
            </div>

            {/* Right Column: Card Mockup (Only Desktop) */}
            <div className="hidden lg:block space-y-8">
              <h3 className="text-lg font-bold text-neutral-900">Tu Tarjeta Kyn</h3>
              <div className="bg-gradient-to-br from-neutral-800 to-neutral-900 rounded-[22px] h-[210px] w-full p-6 text-white flex flex-col justify-between shadow-xl">
                <div className="flex justify-between items-start">
                  <span className="font-semibold text-lg italic">Kyn Card</span>
                  <div className="w-10 h-7 bg-white/20 rounded-md"></div>
                </div>
                <p className="text-xl tracking-[4px] font-medium">5294  ••••  ••••  4827</p>
                <div className="flex justify-between items-end text-sm opacity-80 uppercase">
                  <div>
                    <p className="text-[10px] opacity-60">Card Holder</p>
                    <p>Diego</p>
                  </div>
                  <div>
                    <p className="text-[10px] opacity-60">Expires</p>
                    <p>12/29</p>
                  </div>
                </div>
              </div>

              <div className="bg-brand-primary/5 rounded-[20px] p-6 border border-brand-primary/10">
                <p className="text-brand-primary font-bold text-sm uppercase mb-2">Tip del día</p>
                <p className="text-neutral-700 text-sm leading-relaxed">Configura el ahorro automático y alcanza tus metas financieras más rápido.</p>
              </div>
            </div>

          </div>
        </div>

        {/* Mobile Bottom Nav (Hidden on Desktop) */}
        <div className="lg:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-[#d7d9e6] h-[72px] flex items-center justify-around px-4 z-50">
          <MobileNavItem label="Inicio" icon="🏠" active />
          <MobileNavItem label="Historial" icon="📄" />
          <MobileNavItem label="QR" icon="🔲" />
          <MobileNavItem label="Perfil" icon="👤" />
        </div>
      </main>
    </div>
  );
}

function ActionIcon({ label, icon }: { label: string, icon: string }) {
  return (
    <div className="flex flex-col items-center gap-2 group cursor-pointer">
      <div className="w-[52px] h-[52px] lg:w-[64px] lg:h-[64px] bg-[#fff5f0] border border-[#ffd4c5] rounded-[14px] lg:rounded-[18px] flex items-center justify-center text-[#ff6b3d] text-xl lg:text-2xl font-bold transition-all group-hover:bg-brand-primary group-hover:text-white">
        {icon}
      </div>
      <span className="text-[12px] lg:text-[14px] font-medium text-[#3d3f5c]">{label}</span>
    </div>
  );
}

function TransactionItem({ name, date, amount, type }: any) {
  const isIncoming = type === 'incoming';
  return (
    <div className="bg-white border border-[#d7d9e6] lg:border-neutral-200 rounded-[16px] lg:rounded-[20px] p-4 flex items-center justify-between hover:shadow-md transition-shadow cursor-pointer">
      <div className="flex items-center gap-4">
        <div className={`w-[42px] h-[42px] lg:w-[48px] lg:h-[48px] rounded-full flex items-center justify-center text-lg lg:text-xl ${isIncoming ? 'bg-[#e7f6f2] text-[#0f6e56]' : 'bg-[#fff5f0] text-[#ff6b3d]'}`}>
          {isIncoming ? '↙' : '↗'}
        </div>
        <div>
          <p className="text-[14px] lg:text-[15px] font-bold text-[#16182c]">{name}</p>
          <p className="text-[12px] lg:text-[13px] text-[#8a8ba8]">{date}</p>
        </div>
      </div>
      <p className={`text-[14px] lg:text-[16px] font-bold ${isIncoming ? 'text-[#0f6e56]' : 'text-[#ff6b3d]'}`}>
        {isIncoming ? '+' : '-'}${Math.abs(amount).toFixed(2)}
      </p>
    </div>
  );
}

function MobileNavItem({ label, icon, active = false }: { label: string, icon: string, active?: boolean }) {
  return (
    <div className="flex flex-col items-center relative py-2 cursor-pointer">
      {active && <div className="absolute top-0 w-9 h-[2px] bg-[#ff6b3d] rounded-full"></div>}
      <span className={`text-xl ${active ? 'opacity-100' : 'opacity-40 grayscale'}`}>{icon}</span>
      <span className={`text-[11px] font-semibold mt-1 ${active ? 'text-[#ff6b3d]' : 'text-[#a9abc2]'}`}>{label}</span>
    </div>
  );
}
