import React from 'react';

const SocialLogins: React.FC = () => {
  const handleComingSoon = (provider: string) => {
    alert(`${provider} estará disponible próximamente.`);
  };

  return (
    <div className="space-y-[22px]">
      {/* Social Buttons */}
      <div className="flex gap-3">
        <button
          type="button"
          onClick={() => handleComingSoon('Google')}
          className="flex-1 flex items-center justify-center gap-2 h-social-btn border-[1.5px] border-neutral-300 rounded-lg bg-white hover:bg-neutral-50 transition-colors"
        >
          <span className="text-lg">G</span>
          <span className="text-[15px] font-semibold text-neutral-900">Google</span>
        </button>
        <button
          type="button"
          onClick={() => handleComingSoon('Apple')}
          className="flex-1 flex items-center justify-center gap-2 h-social-btn border-[1.5px] border-neutral-300 rounded-lg bg-white hover:bg-neutral-50 transition-colors"
        >
          <span className="text-lg">&#xF8FF;</span>
          <span className="text-[15px] font-semibold text-neutral-900">Apple</span>
        </button>
      </div>
    </div>
  );
};

export default SocialLogins;
