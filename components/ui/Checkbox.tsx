import React from 'react';

interface CheckboxProps {
  id: string;
  label: string;
  checked: boolean;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  error?: string;
}

export const Checkbox: React.FC<CheckboxProps> = ({
  id,
  label,
  checked,
  onChange,
  error,
}) => {
  return (
    <div className="w-full space-y-1">
      <div
        className={`flex items-center gap-2 p-2 rounded border ${
          error ? 'border-red-500' : 'border-transparent'
        }`}
        style={{ borderRadius: '6px' }}
      >
        <input
          id={id}
          type="checkbox"
          checked={checked}
          onChange={onChange}
          className="h-4 w-4 text-brand-primary focus:ring-brand-primary border-neutral-300 rounded cursor-pointer"
        />
        <label
          htmlFor={id}
          className="text-sm text-neutral-900 cursor-pointer select-none"
        >
          {label}
        </label>
      </div>
      {error && (
        <p className="text-xs text-red-500 mt-1">{error}</p>
      )}
    </div>
  );
};
