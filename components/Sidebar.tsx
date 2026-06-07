'use client';

import React from 'react';
import { useRouter } from 'next/navigation';

interface SidebarItemProps {
  label: string;
  icon: string;
  active?: boolean;
  onClick?: () => void;
}

const SidebarItem: React.FC<SidebarItemProps> = ({ label, icon, active, onClick }) => (
  <div 
    onClick={onClick}
    className={`flex items-center gap-3 px-4 py-3 rounded-xl cursor-pointer transition-colors ${active ? 'bg-brand-primary/10 text-brand-primary' : 'text-neutral-500 hover:bg-neutral-100'}`}
  >
    <span className="text-xl">{icon}</span>
    <span className="font-semibold text-[15px]">{label}</span>
  </div>
);

const Sidebar: React.FC = () => {
  const router = useRouter();

  const handleLogout = () => {
    // En un sistema real aquí se limpiarían cookies/tokens
    router.push('/');
  };

  return (
    <aside className="hidden lg:flex flex-col w-[280px] h-screen bg-white border-r border-neutral-300 p-6 fixed left-0 top-0">
      <div className="flex items-center gap-3 mb-10 px-2">
        <div className="w-8 h-8 bg-brand-primary rounded-lg flex items-center justify-center text-white font-bold">K</div>
        <span className="text-xl font-bold text-neutral-900">KynWallet</span>
      </div>
      
      <nav className="flex flex-col gap-2 flex-1">
        <SidebarItem label="Inicio" icon="🏠" active />
        <SidebarItem label="Historial" icon="📄" />
        <SidebarItem label="Mis Tarjetas" icon="💳" />
        <SidebarItem label="Contactos" icon="👥" />
        <SidebarItem label="Servicios" icon="⚡" />
      </nav>

      <div className="mt-auto border-t border-neutral-200 pt-6">
        <SidebarItem label="Configuración" icon="⚙️" />
        <div className="mt-2 text-red-500">
          <SidebarItem label="Cerrar sesión" icon="🚪" onClick={handleLogout} />
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
