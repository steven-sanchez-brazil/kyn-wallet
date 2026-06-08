'use client';
import React from 'react';

const CardVisual: React.FC = () => {
  return (
    <div className="relative w-full max-w-[380px] h-[210px] rounded-[22px] bg-gradient-to-br from-[#FF8A65] to-[#EF5226] p-6 text-white overflow-hidden shadow-lg">
      <div className="absolute top-[-40px] right-[-40px] w-40 h-40 bg-white/10 rounded-full blur-xl" />
      <div className="absolute bottom-[-40px] left-[-40px] w-24 h-24 bg-white/10 rounded-full blur-lg" />
      
      <div className="relative flex justify-between items-start">
        <p className="font-semibold text-[15px]">Kyn Card</p>
        <div className="w-[38px] h-[28px] bg-[#ffd980e6] rounded-[6px] relative overflow-hidden">
           <div className="absolute top-[2px] w-full h-[4px] bg-[#16182c26]" />
        </div>
      </div>
      
      <p className="relative mt-8 text-[18px] font-medium tracking-[1px]">5294  ••••  ••••  4827</p>
      
      <div className="relative mt-10 flex justify-between items-center text-[13px] text-white/90">
        <p className="font-medium">STEVEN LUNA</p>
        <p className="font-medium">12/29</p>
      </div>
    </div>
  );
};

export default CardVisual;
