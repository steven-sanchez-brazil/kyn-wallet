'use client';
import React from 'react';

import { AuthService } from '@/lib/services/AuthService';
import { useRouter } from 'next/navigation';

const Sidebar: React.FC = () => {
  const router = useRouter();
  const user = AuthService.getUser();

  const handleLogout = () => {
    AuthService.logout();
    router.push('/login');
  };

  return (
    <aside className="hidden lg:flex flex-col w-[260px] h-screen fixed left-0 top-0 bg-gradient-to-b from-[#FF8A65] to-[#EF5226] text-white p-6">
      <div className="flex gap-[12px] items-center mb-12">
        <div className="flex gap-[2px] items-center">
            <div className="w-[10px] h-[22px] bg-white rounded-full opacity-80" />
            <div className="w-[14px] h-[14px] bg-white rounded-full opacity-60 ml-[-8px] mt-[8px]" />
        </div>
        <p className="font-bold text-[22px]">KynWallet</p>
      </div>

      <nav className="flex-1 space-y-2">
        <NavItem label="Inicio" active />
        <NavItem label="Historial" />
        <NavItem label="Tarjetas" />
        <NavItem label="Pagos" />
        <NavItem label="Perfil" />
      </nav>

      <div className="mt-auto space-y-4 pt-6 border-t border-white/20">
        <div className="flex items-center gap-3 bg-white/14 p-3 rounded-[14px]">
          <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center font-bold text-sm">
            {user?.Nombre?.[0] || 'U'}
          </div>
          <div className="overflow-hidden">
            <p className="font-semibold text-sm leading-tight truncate">{user?.Nombre || 'Usuario'}</p>
            <p className="text-[11px] text-white/70 leading-tight truncate">{user?.Email || 'email@kynwallet.mx'}</p>
          </div>
        </div>
        
        <button 
          onClick={handleLogout}
          className="w-full flex items-center gap-3 px-4 py-3 rounded-[12px] hover:bg-white/10 transition-all text-white/90 font-medium text-[15px]"
        >
          <span className="text-lg">Logout</span>
          <span>Cerrar sesión</span>
        </button>
      </div>
    </aside>
  );
};

const NavItem = ({ label, active = false }: { label: string; active?: boolean }) => (
  <div className={`flex items-center gap-3 px-4 py-3 rounded-[12px] cursor-pointer relative transition-all ${active ? 'bg-white/18' : 'hover:bg-white/10 opacity-70'}`}>
    {active && <div className="w-[4px] h-full absolute left-[-24px] bg-white rounded-r-[2px]" />}
    <div className={`w-2 h-2 rounded-full ${active ? 'bg-white' : 'bg-white/55'}`} />
    <span className="text-[15px] font-medium">{label}</span>
  </div>
);

export default Sidebar;
