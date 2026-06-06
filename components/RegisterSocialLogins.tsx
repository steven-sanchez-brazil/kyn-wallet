'use client';

import React from 'react';
import { Button } from '@/components/ui/Button';

const RegisterSocialLogins: React.FC = () => {
  const handleComingSoon = () => {
    alert('Proximamente');
  };

  return (
    <div className="grid grid-cols-2 gap-4">
      <Button
        type="button"
        variant="secondary"
        onClick={handleComingSoon}
        className="flex items-center justify-center space-x-2"
      >
        <span className="text-lg">G</span>
        <span>Google</span>
      </Button>
      <Button
        type="button"
        variant="secondary"
        onClick={handleComingSoon}
        className="flex items-center justify-center space-x-2"
      >
        <span className="text-lg">A</span>
        <span>Apple</span>
      </Button>
    </div>
  );
};

export default RegisterSocialLogins;
