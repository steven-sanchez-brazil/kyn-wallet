import React from 'react';

interface BrandPanelProps {
  headline?: React.ReactNode;
  description?: string;
}

const BrandPanel: React.FC<BrandPanelProps> = ({ 
  headline = (
    <>
      <p className="mb-0">Tu dinero,</p>
      <p>sin fronteras.</p>
    </>
  ),
  description = "Envía, recibe y paga en segundos. Una billetera pensada para tu día a día."
}) => {
  return (
    <div 
      className="hidden lg:flex flex-col items-start justify-between w-1/2 px-[56px] py-[64px] relative bg-gradient-to-br from-[#FF8A65] to-[#EF5226]"
    >
      {/* Logo */}
      <div className="flex gap-[12px] items-center relative shrink-0">
        <div className="flex gap-[2px] items-center">
            <div className="w-[10px] h-[28px] bg-white rounded-full opacity-80" />
            <div className="w-[14px] h-[14px] bg-white rounded-full opacity-60 ml-[-8px] mt-[10px]" />
        </div>
        <p className="font-bold leading-[normal] not-italic relative shrink-0 text-[26px] text-white whitespace-nowrap">
          KynWallet
        </p>
      </div>

      {/* Headline */}
      <div className="flex flex-col gap-[18px] items-start not-italic relative shrink-0 w-full mb-auto mt-[238px]">
        <div className="font-bold leading-[1.08] relative shrink-0 text-[44px] text-white w-full">
          {headline}
        </div>
        <p className="font-normal leading-[1.5] relative shrink-0 text-[17px] text-white/85 w-[500px]">
          {description}
        </p>
      </div>

      {/* Card Mockup */}
      <div className="bg-white/16 border border-white/35 flex flex-col h-[210px] items-start justify-between px-[26px] py-[24px] relative rounded-[22px] shrink-0 w-[360px]">
        <div className="flex items-center justify-between relative shrink-0 w-full">
          <p className="font-semibold leading-[normal] not-italic relative shrink-0 text-[15px] text-white whitespace-nowrap">
            Kyn Card
          </p>
          <div className="bg-[#ffd980e6] h-[28px] relative rounded-[6px] shrink-0 w-[38px]" />
        </div>
        <p className="font-medium leading-[normal] not-italic relative shrink-0 text-[20px] text-white tracking-[1px] whitespace-pre">
          {`5294  ••••  ••••  4827`}
        </p>
        <div className="flex font-medium items-center justify-between leading-[normal] not-italic relative shrink-0 text-[13px] text-white/90 w-full whitespace-nowrap">
          <p className="relative shrink-0">STEVEN LUNA</p>
          <p className="relative shrink-0">12/29</p>
        </div>
      </div>
    </div>
  );
};

export default BrandPanel;
