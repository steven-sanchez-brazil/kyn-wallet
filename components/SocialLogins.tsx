import React from 'react';
import { Button } from './ui/Button';

interface SocialLoginsProps {
  mode?: 'login' | 'register';
}

const SocialLogins: React.FC<SocialLoginsProps> = ({ mode = 'login' }) => {
  const handleComingSoon = () => {
    alert('Próximamente');
  };

  const dividerText = mode === 'register' ? 'o regístrate con' : 'o continúa con';

  return (
    <div className="mt-6">
      <div className="relative">
        <div className="absolute inset-0 flex items-center">
          <div className="w-full border-t border-neutral-300"></div>
        </div>
        <div className="relative flex justify-center text-sm">
          <span className="px-2 bg-white text-neutral-500">{dividerText}</span>
        </div>
      </div>

      <div className="mt-6 grid grid-cols-2 gap-4">
        <Button
          type="button"
          variant="secondary"
          onClick={handleComingSoon}
          className="flex items-center justify-center space-x-2"
        >
          <span className="h-4 w-4 rounded-full bg-neutral-300" />
          <span>Google</span>
        </Button>
        <Button
          type="button"
          variant="secondary"
          onClick={handleComingSoon}
          className="flex items-center justify-center space-x-2"
        >
          <span className="h-4 w-4 rounded-full bg-neutral-300" />
          <span>Apple</span>
        </Button>
      </div>
    </div>
  );
};

export default SocialLogins;
