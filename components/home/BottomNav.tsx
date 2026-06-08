'use client';
import React from 'react';

const BottomNav: React.FC = () => {
  return (
    <div className="lg:hidden fixed bottom-0 left-0 w-full h-[80px] bg-white border-t border-[#d7d9e6] flex justify-around items-center px-4 pb-4">
      <NavItem label="Inicio" active />
      <NavItem label="Historial" />
      <NavItem label="QR" />
      <NavItem label="Perfil" />
    </div>
  );
};

const NavItem = ({ label, active = false }: { label: string; active?: boolean }) => (
  <div className="flex flex-col items-center gap-1 cursor-pointer">
    {active && <div className="w-9 h-[2px] bg-[#ff6b3d] rounded-full mb-1" />}
    {!active && <div className="h-[2px] mb-1" />}
    <span className={`text-[11px] font-semibold ${active ? 'text-[#ff6b3d]' : 'text-[#a9abc2]'}`}>{label}</span>
  </div>
);

export default BottomNav;
