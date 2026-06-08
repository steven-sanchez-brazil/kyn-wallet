import React, { useState } from 'react';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  showToggle?: boolean;
}

export const Input: React.FC<InputProps> = ({ 
  label, 
  error, 
  showToggle = false,
  className = '',
  type,
  ...props 
}) => {
  const [showPassword, setShowPassword] = useState(false);

  const resolvedType = showToggle ? (showPassword ? 'text' : 'password') : type;

  return (
    <div className="w-full space-y-2">
      {label && (
        <label 
          htmlFor={props.id}
          className="block text-[14px] font-medium text-neutral-700"
        >
          {label}
        </label>
      )}
      <div className="relative">
        <input
          className={`w-full px-4 h-input border-[1.5px] rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-primary focus:border-transparent transition-all duration-200 text-[15px] placeholder:text-neutral-400 placeholder:font-normal ${
            error ? 'border-red-500' : 'border-neutral-300'
          } ${className}`}
          type={resolvedType}
          {...props}
        />
        {showToggle && (
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            aria-label="Mostrar/Ocultar contraseña"
            className="absolute right-4 top-1/2 -translate-y-1/2 text-neutral-400 hover:text-neutral-700 transition-colors"
          >
            {showPassword ? (
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94" />
                <path d="M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19" />
                <line x1="1" y1="1" x2="23" y2="23" />
              </svg>
            ) : (
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
                <circle cx="12" cy="12" r="3" />
              </svg>
            )}
          </button>
        )}
      </div>
      {error && (
        <p className="text-xs text-red-500 mt-1">
          {error}
        </p>
      )}
    </div>
  );
};
