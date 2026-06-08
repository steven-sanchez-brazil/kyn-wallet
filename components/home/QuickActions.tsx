'use client';
import React from 'react';

const QuickActions: React.FC = () => {
  const actions = [
    { label: 'Enviar', sub: 'Transferir dinero' },
    { label: 'Recibir', sub: 'Compartir QR' },
    { label: 'Recargar', sub: 'Añadir saldo' },
    { label: 'Pagar', sub: 'Servicios y más' },
  ];

  return (
    <div className="flex flex-wrap gap-4">
      {actions.map((action) => (
        <button key={action.label} className="bg-white border border-[#d7d9e6] rounded-[14px] p-4 flex items-center gap-3 min-w-[136px] hover:bg-neutral-50 transition-colors">
          <div className="w-[36px] h-[36px] bg-[#ff6b3d1f] rounded-[10px] flex items-center justify-center">
            <div className="w-4 h-4 bg-[#ef5226b3] rounded-[4px]" />
          </div>
          <div className="text-left">
            <p className="text-[14px] font-semibold text-[#16182c] leading-tight">{action.label}</p>
            <p className="text-[11px] text-[#8a8ca8] leading-tight">{action.sub}</p>
          </div>
        </button>
      ))}
    </div>
  );
};

export default QuickActions;
