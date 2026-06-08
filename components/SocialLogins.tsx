'use client';

import React from 'react';
import { Button } from './ui/Button';

export const SocialLogins: React.FC = () => {
  const handleSoon = () => {
    alert('Próximamente');
  };

  return (
    <div className="space-y-4">
      <div className="relative flex items-center py-5">
        <div className="flex-grow border-t border-neutral-300"></div>
        <div className="flex-grow border-t border-neutral-300"></div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <Button 
          variant="secondary" 
          onClick={handleSoon}
          className="flex items-center justify-center gap-2 py-2.5"
          aria-label="Google"
        >
          <div className="w-5 h-5 bg-neutral-200 rounded-full" /> {/* Placeholder Icon */}
          <span className="text-sm">Google</span>
        </Button>
        
        <Button 
          variant="secondary" 
          onClick={handleSoon}
          className="flex items-center justify-center gap-2 py-2.5"
          aria-label="Apple"
        >
          <div className="w-5 h-5 bg-neutral-200 rounded-full" /> {/* Placeholder Icon */}
          <span className="text-sm">Apple</span>
        </Button>
      </div>
    </div>
  );
};
