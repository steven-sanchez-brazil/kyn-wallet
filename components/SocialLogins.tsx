import React from 'react';
import { Button } from './ui/Button';

const SocialLogins: React.FC = () => {
  const handleComingSoon = (provider: string) => {
    alert(`${provider} estará disponible próximamente.`);
  };

  return (
    <div className="grid grid-cols-2 gap-4">
      <Button 
        variant="secondary" 
        onClick={() => handleComingSoon('Google')}
        className="flex items-center justify-center space-x-2 border-[1.5px]"
      >
        <span className="text-lg">G</span>
        <span>Google</span>
      </Button>
      <Button 
        variant="secondary" 
        onClick={() => handleComingSoon('Apple')}
        className="flex items-center justify-center space-x-2 border-[1.5px]"
      >
        <span className="text-lg"></span>
        <span>Apple</span>
      </Button>
    </div>
  );
};

export default SocialLogins;
