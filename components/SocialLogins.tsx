'use client';

import React from 'react';

const SocialLogins: React.FC = () => {
  const handleSocialLogin = () => {
    alert('En Construccion');
  };

  return (
    <div className="grid grid-cols-2 gap-4">
      <button
        type="button"
        onClick={handleSocialLogin}
        className="flex items-center justify-center gap-2 px-4 py-3 border border-neutral-300 rounded-xl hover:bg-neutral-50 transition-colors"
      >
        <div className="w-5 h-5 rounded-full bg-neutral-200" />
        <span className="text-sm font-semibold text-neutral-900">Google</span>
      </button>
      <button
        type="button"
        onClick={handleSocialLogin}
        className="flex items-center justify-center gap-2 px-4 py-3 border border-neutral-300 rounded-xl hover:bg-neutral-50 transition-colors"
      >
        <div className="w-5 h-5 rounded-full bg-neutral-200" />
        <span className="text-sm font-semibold text-neutral-900">Apple</span>
      </button>
    </div>
  );
};

export default SocialLogins;
