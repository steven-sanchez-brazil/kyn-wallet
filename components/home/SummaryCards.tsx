'use client';
import React from 'react';

const SummaryCards: React.FC = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      <Card 
        label="Saldo disponible" 
        value="$1,922.90" 
        sub="MXN · cuenta principal" 
        highlight 
      />
      <Card 
        label="Ingresos del mes" 
        value="+$4,250.00" 
        sub="vs mes anterior ↑12%" 
      />
      <Card 
        label="Gastos del mes" 
        value="-$1,840.50" 
        sub="vs mes anterior ↑5%" 
      />
      <Card 
        label="Movimientos" 
        value="24" 
        sub="Este mes" 
      />
    </div>
  );
};

const Card = ({ label, value, sub, highlight = false }: any) => (
  <div className={`bg-white border ${highlight ? 'border-[#ff6b3d] border-2' : 'border-[#d7d9e6]'} rounded-[16px] p-5 relative overflow-hidden`}>
    {highlight && <div className="absolute top-0 left-0 w-full h-1 bg-[#ff6b3d]" />}
    <p className="text-[#8a8ba8] text-[12px] font-medium mb-1">{label}</p>
    <p className={`text-[24px] font-bold ${highlight ? 'text-[#ef5226]' : 'text-[#16182c]'} mb-2`}>{value}</p>
    <p className={`text-[12px] ${highlight ? 'text-[#ff6b3d]' : 'text-[#a9abc2]'}`}>{sub}</p>
  </div>
);

export default SummaryCards;
