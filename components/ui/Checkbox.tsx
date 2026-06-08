import React from 'react';

interface CheckboxProps {
  label: string | React.ReactNode;
  checked: boolean;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  error?: string;
  id?: string;
}

export const Checkbox: React.FC<CheckboxProps> = ({
  label,
  checked,
  onChange,
  error,
  id,
}) => {
  return (
    <div className="w-full space-y-1">
      <div className="flex items-center gap-3">
        <input
          type="checkbox"
          id={id}
          checked={checked}
          onChange={onChange}
          className="w-5 h-5 border-[1.5px] border-neutral-300 rounded-[6px] accent-brand-primary cursor-pointer"
        />
        <label
          htmlFor={id}
          className="text-sm font-medium text-[#3d3f5c] cursor-pointer"
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
