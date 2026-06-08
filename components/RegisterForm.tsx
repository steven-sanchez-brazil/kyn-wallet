'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Input } from './ui/Input';
import { Button } from './ui/Button';
import { AuthService } from '@/lib/services/AuthService';
import {
  validateFullName,
  validateEmail,
  validatePassword,
  validatePasswordMatch,
} from '@/lib/utils/Validation';

interface RegisterFormState {
  fullName: string;
  email: string;
  password: string;
  confirmPassword: string;
  acceptTerms: boolean;
  errors: Record<string, string>;
  loading: boolean;
}

export const RegisterForm: React.FC = () => {
  const router = useRouter();
  const [state, setState] = useState<RegisterFormState>({
    fullName: '',
    email: '',
    password: '',
    confirmPassword: '',
    acceptTerms: false,
    errors: {},
    loading: false,
  });

  const validateForm = (): boolean => {
    const newErrors: Record<string, string> = {};

    if (!state.fullName.trim()) {
      newErrors.fullName = 'El nombre completo es requerido';
    } else if (!validateFullName(state.fullName)) {
      newErrors.fullName = 'Ingresa tu nombre y apellido';
    }

    if (!state.email.trim()) {
      newErrors.email = 'El correo electrónico es requerido';
    } else if (!validateEmail(state.email)) {
      newErrors.email = 'Correo electrónico inválido';
    }

    if (!state.password.trim()) {
      newErrors.password = 'La contraseña es requerida';
    } else if (!validatePassword(state.password)) {
      newErrors.password = 'La contraseña debe tener al menos 8 caracteres';
    }

    if (!state.confirmPassword.trim()) {
      newErrors.confirmPassword = 'Debes confirmar tu contraseña';
    } else if (!validatePasswordMatch(state.password, state.confirmPassword)) {
      newErrors.confirmPassword = 'Las contraseñas no coinciden';
    }

    if (!state.acceptTerms) {
      newErrors.acceptTerms = 'Debes aceptar los términos y condiciones';
    }

    setState((prev) => ({ ...prev, errors: newErrors }));
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setState((prev) => ({ ...prev, loading: true }));

    try {
      const result = await AuthService.register({
        FullName: state.fullName,
        Email: state.email,
        Password: state.password,
        ConfirmPassword: state.confirmPassword,
      });

      if (result.success) {
        router.push('/login?registered=true');
      } else {
        setState((prev) => ({
          ...prev,
          errors: {
            ...prev.errors,
            email:
              result.error === 'EMAIL_TAKEN'
                ? 'Este correo ya está registrado'
                : 'Error al registrar. Intenta nuevamente.',
          },
        }));
      }
    } catch (error) {
      setState((prev) => ({
        ...prev,
        errors: {
          ...prev.errors,
          submit: 'Error al registrar. Intenta nuevamente.',
        },
      }));
    } finally {
      setState((prev) => ({ ...prev, loading: false }));
    }
  };

  const handleInputChange = (field: string, value: string | boolean) => {
    setState((prev) => ({
      ...prev,
      [field]: value,
      errors: { ...prev.errors, [field]: '', submit: '' },
    }));
  };

  return (
    <div className="flex flex-col w-full max-w-[360px] gap-8">
      {/* Heading */}
      <div className="space-y-2">
        <h1 className="text-[#16182c] font-bold text-[30px] leading-[1.08]">
          Crea tu cuenta
        </h1>
        <p className="text-[#8a8ca8] text-[16px] leading-[1.5]">
          Completa tus datos para comenzar
        </p>
      </div>

      {/* Form */}
      <form onSubmit={handleSubmit} noValidate className="space-y-4">
        {/* Full Name */}
        <Input
          id="fullName"
          label="Nombre Completo"
          type="text"
          placeholder="Ana García"
          value={state.fullName}
          onChange={(e) => handleInputChange('fullName', e.target.value)}
          error={state.errors.fullName}
          className="text-[#3d3f5c]"
        />

        {/* Email */}
        <Input
          id="email"
          label="Correo Electrónico"
          type="email"
          placeholder="ana@test.com"
          value={state.email}
          onChange={(e) => handleInputChange('email', e.target.value)}
          error={state.errors.email}
          className="text-[#3d3f5c]"
        />

        {/* Password */}
        <Input
          id="password"
          label="Contraseña"
          type="password"
          placeholder="• • • • • • • •"
          value={state.password}
          onChange={(e) => handleInputChange('password', e.target.value)}
          error={state.errors.password}
          showPasswordToggle={true}
          className="text-[#3d3f5c]"
        />

        {/* Confirm Password */}
        <Input
          id="confirmPassword"
          label="Confirmar Contraseña"
          type="password"
          placeholder="• • • • • • • •"
          value={state.confirmPassword}
          onChange={(e) => handleInputChange('confirmPassword', e.target.value)}
          error={state.errors.confirmPassword}
          showPasswordToggle={true}
          className="text-[#3d3f5c]"
        />

        {/* Terms & Conditions */}
        <div className="flex items-start gap-3 pt-2">
          <input
            id="acceptTerms"
            type="checkbox"
            checked={state.acceptTerms}
            onChange={(e) => handleInputChange('acceptTerms', e.target.checked)}
            className="w-5 h-5 mt-0.5 border-[#d7d9e6] rounded cursor-pointer"
            aria-label="Acepto los términos y condiciones"
          />
          <label htmlFor="acceptTerms" className="text-[#3d3f5c] text-[14px] leading-[1.5]">
            Acepto los{' '}
            <a href="#" className="text-[#ef5226] font-semibold hover:underline">
              términos y condiciones
            </a>
          </label>
        </div>
        {state.errors.acceptTerms && (
          <p className="text-xs text-red-500 -mt-2">{state.errors.acceptTerms}</p>
        )}

        {/* Error message */}
        {state.errors.submit && (
          <p className="text-xs text-red-500">{state.errors.submit}</p>
        )}

        {/* Submit Button */}
        <Button
          type="submit"
          disabled={state.loading}
          className="w-full h-[52px] mt-6"
        >
          {state.loading ? 'Creando cuenta...' : 'Crear cuenta'}
        </Button>
      </form>

      {/* Social Login Divider */}
      <div className="relative my-6">
        <div className="absolute inset-0 flex items-center">
          <div className="w-full border-t border-[#d7d9e6]"></div>
        </div>
        <div className="relative flex justify-center text-sm">
          <span className="px-2 bg-white text-[#a9abc2]">o regístrate con</span>
        </div>
      </div>

      {/* Social Login Buttons */}
      <div className="space-y-3">
        <button
          type="button"
          onClick={() => alert('Próximamente')}
          className="w-full h-[48px] border border-[#d7d9e6] rounded-[12px] text-[#16182c] font-semibold hover:bg-neutral-50 transition-colors"
        >
          Google
        </button>
        <button
          type="button"
          onClick={() => alert('Próximamente')}
          className="w-full h-[48px] border border-[#d7d9e6] rounded-[12px] text-[#16182c] font-semibold hover:bg-neutral-50 transition-colors"
        >
          Apple
        </button>
      </div>

      {/* Link to Login */}
      <div className="text-center text-[14px] text-[#3d3f5c] pt-4">
        ¿Ya tienes cuenta?{' '}
        <a href="/login" className="text-[#ef5226] font-semibold hover:underline">
          Inicia sesión
        </a>
      </div>
    </div>
  );
};
