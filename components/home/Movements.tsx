'use client';
import React from 'react';

const Movements: React.FC = () => {
  const movements = [
    { name: 'María González', type: 'Transferencia', date: 'Hoy 14:23', amount: '+250.00', positive: true },
    { name: 'Netflix', type: 'Suscripción', date: 'Hoy 09:15', amount: '-35.90', positive: false },
    { name: 'Recarga BBVA', type: 'Depósito', date: 'Ayer 18:42', amount: '+500.00', positive: true },
    { name: 'Spotify', type: 'Suscripción', date: 'Ayer 08:00', amount: '-19.90', positive: false },
    { name: 'Carlos Méndez', type: 'Transferencia', date: '29 May', amount: '+1,200.00', positive: true },
  ];

  return (
    <div className="bg-white border border-[#d7d9e6] rounded-[18px] overflow-hidden">
      <div className="p-5 flex justify-between items-center border-b border-[#d7d9e6]">
        <h3 className="font-bold text-[#16182c]">Movimientos recientes</h3>
        <button className="text-[13px] font-semibold text-[#ef5226]">ver todo →</button>
      </div>
      <div className="divide-y divide-[#d7d9e699]">
        {movements.map((m, idx) => (
          <div key={idx} className="p-4 flex items-center justify-between hover:bg-neutral-50 transition-colors">
            <div className="flex items-center gap-4">
              <div className="w-[44px] h-[44px] bg-[#f4f5f9] rounded-full flex items-center justify-center relative">
                <div className={`w-3 h-3 rounded-[3px] absolute top-1 left-1 ${m.positive ? 'bg-[#0f6e56cc]' : 'bg-[#ef5226cc]'}`} />
                <span className="text-xl">{m.positive ? '↙' : '↗'}</span>
              </div>
              <div>
                <p className="text-[15px] font-semibold text-[#16182c]">{m.name}</p>
                <p className="text-[12px] text-[#8a8ca8]">{m.type} · {m.date}</p>
              </div>
            </div>
            <p className={`font-bold text-[15px] ${m.positive ? 'text-[#0f6e56]' : 'text-[#ef5226]'}`}>
              {m.amount}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Movements;
