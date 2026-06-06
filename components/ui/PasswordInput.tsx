import React, { useState } from 'react';

interface PasswordInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
}

/**
 * Campo de contraseña que compone la estética de `ui/Input` y añade un botón
 * para alternar la visibilidad (password ↔ text). Enmascarado por defecto.
 */
export const PasswordInput: React.FC<PasswordInputProps> = ({
  label,
  error,
  className = '',
  ...props
}) => {
  const [visible, setVisible] = useState(false);

  return (
    <div className="w-full space-y-1">
      {label && (
        <label
          htmlFor={props.id}
          className="block text-sm font-medium text-neutral-900"
        >
          {label}
        </label>
      )}
      <div className="relative">
        <input
          type={visible ? 'text' : 'password'}
          className={`w-full px-4 py-3 pr-12 border rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-primary focus:border-transparent transition-all duration-200 ${
            error ? 'border-red-500' : 'border-neutral-300'
          } ${className}`}
          {...props}
        />
        <button
          type="button"
          onClick={() => setVisible((v) => !v)}
          aria-label={visible ? 'Ocultar contraseña' : 'Mostrar contraseña'}
          className="absolute inset-y-0 right-0 flex items-center pr-4 text-neutral-500 hover:text-neutral-900"
        >
          {visible ? '🙈' : '👁️'}
        </button>
      </div>
      {error && <p className="text-xs text-red-500 mt-1">{error}</p>}
    </div>
  );
};
