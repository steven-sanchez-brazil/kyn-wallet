'use client';
import React from 'react';

const MonthlySummary: React.FC = () => {
  const items = [
    { label: 'Suscripciones', amount: '$55.80', color: '#ef5226', progress: 30 },
    { label: 'Transferencias', amount: '$1,450.00', color: '#0f6e56', progress: 65 },
    { label: 'Recargas', amount: '$500.00', color: '#a9abc2', progress: 18 },
  ];

  return (
    <div className="bg-white border border-[#d7d9e6] rounded-[18px] p-5 space-y-4">
      <h3 className="font-bold text-[#16182c] text-[16px]">Resumen del mes</h3>
      <div className="space-y-4">
        {items.map((item) => (
          <div key={item.label} className="space-y-2">
            <div className="flex justify-between items-center text-[13px]">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full" style={{ backgroundColor: item.color }} />
                <span className="font-medium text-[#3d3f5c]">{item.label}</span>
              </div>
              <span className="font-semibold text-[#16182c]">{item.amount}</span>
            </div>
            <div className="h-[6px] w-full bg-[#d7d9e6] rounded-full overflow-hidden">
              <div 
                className="h-full rounded-full" 
                style={{ backgroundColor: item.color, width: `${item.progress}%` }} 
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MonthlySummary;
