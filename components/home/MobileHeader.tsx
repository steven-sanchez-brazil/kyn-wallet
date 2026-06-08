'use client';
import React from 'react';

import { AuthService } from '@/lib/services/AuthService';

const MobileHeader: React.FC = () => {
  const user = AuthService.getUser();
  const firstName = user?.Nombre.split(' ')[0] || 'Usuario';

  return (
    <div className="lg:hidden w-full h-[260px] bg-gradient-to-br from-[#FF8A65] to-[#EF5226] p-6 text-white relative overflow-hidden">
      <div className="flex justify-between items-start">
        <div>
          <p className="text-[11px] font-medium opacity-75">HOLA</p>
          <p className="text-[24px] font-bold">{firstName}</p>
        </div>
        <div className="w-[40px] h-[40px] bg-white/18 border border-white/35 rounded-full flex items-center justify-center relative">
          <div className="w-2 h-2 bg-[#ff6b3d] rounded-full absolute top-1 right-1 border border-white" />
          <span className="text-xl">🔔</span>
        </div>
      </div>
      
      <div className="mt-8">
        <p className="text-[11px] font-medium opacity-75 uppercase">Saldo disponible</p>
        <p className="text-[36px] font-bold">$1,922.90</p>
      </div>
      
      <div className="mt-4 flex items-center gap-2">
        <div className="px-2 py-0.5 bg-white/20 border border-white/30 rounded-[6px] text-[11px] font-semibold">MXN</div>
        <p className="text-[13px] opacity-80">· cuenta principal</p>
      </div>
    </div>
  );
};

export default MobileHeader;
