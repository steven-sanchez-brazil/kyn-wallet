import React from 'react';

interface CheckboxProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  error?: string;
}

export const Checkbox: React.FC<CheckboxProps> = ({ 
  label, 
  error, 
  className = '', 
  ...props 
}) => {
  return (
    <div className="w-full space-y-1">
      <div className="flex items-start space-x-3">
        <input
          type="checkbox"
          className={`mt-1 h-4 w-4 rounded border-neutral-300 text-brand-primary focus:ring-brand-primary cursor-pointer ${
            error ? 'border-red-500' : ''
          } ${className}`}
          {...props}
        />
        <label 
          htmlFor={props.id}
          className="text-sm text-neutral-900 cursor-pointer"
        >
          {label}
        </label>
      </div>
      {error && (
        <p className="text-xs text-red-500 mt-1">
          {error}
        </p>
      )}
    </div>
  );
};
