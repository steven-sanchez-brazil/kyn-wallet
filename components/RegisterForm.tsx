'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Input } from './ui/Input';
import { Button } from './ui/Button';
import SocialLogins from './SocialLogins';
import { AuthService } from '../lib/services/AuthService';
import { validateEmail, validatePassword, validateFullName, validatePasswordMatch } from '../lib/utils/Validation';

interface RegisterFormProps {
  onSuccess: () => void;
}

interface FormErrors {
  fullName?: string;
  email?: string;
  password?: string;
  confirmPassword?: string;
  submit?: string;
}

interface TouchedFields {
  fullName: boolean;
  email: boolean;
  password: boolean;
  confirmPassword: boolean;
}

const RegisterForm: React.FC<RegisterFormProps> = ({ onSuccess }) => {
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [termsAccepted, setTermsAccepted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState<FormErrors>({});
  const [touched, setTouched] = useState<TouchedFields>({
    fullName: false,
    email: false,
    password: false,
    confirmPassword: false,
  });

  const isFormValid =
    validateFullName(fullName) &&
    validateEmail(email) &&
    validatePassword(password) &&
    validatePasswordMatch(password, confirmPassword) &&
    termsAccepted &&
    !isSubmitting;

  const validateField = (field: keyof TouchedFields, value: string, compareValue?: string): string | undefined => {
    switch (field) {
      case 'fullName':
        if (!value.trim()) return 'El nombre completo es obligatorio';
        if (!validateFullName(value)) return 'El nombre debe tener al menos 2 caracteres';
        return undefined;
      case 'email':
        if (!value.trim()) return 'El correo electrónico es obligatorio';
        if (!validateEmail(value)) return 'Ingresa un correo electrónico válido';
        return undefined;
      case 'password':
        if (!value) return 'La contraseña es obligatoria';
        if (!validatePassword(value)) return 'La contraseña debe tener al menos 8 caracteres';
        return undefined;
      case 'confirmPassword':
        if (!value) return 'Confirma tu contraseña';
        if (!validatePasswordMatch(compareValue ?? '', value)) return 'Las contraseñas no coinciden';
        return undefined;
    }
  };

  const handleBlur = (field: keyof TouchedFields, value: string, compareValue?: string) => {
    setTouched((prev) => ({ ...prev, [field]: true }));
    const error = validateField(field, value, compareValue);
    setErrors((prev) => ({ ...prev, [field]: error }));
  };

  const handleConfirmPasswordChange = (value: string) => {
    setConfirmPassword(value);
    if (touched.confirmPassword) {
      const error = validateField('confirmPassword', value, password);
      setErrors((prev) => ({ ...prev, confirmPassword: error }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrors((prev) => ({ ...prev, submit: undefined }));
    setIsSubmitting(true);

    try {
      const result = await AuthService.register({ FullName: fullName, Email: email, Password: password });
      if (result.Success) {
        onSuccess();
      } else if (result.Error === 'EMAIL_EXISTS') {
        setErrors((prev) => ({ ...prev, submit: 'Este correo ya está registrado. ¿Ya tienes cuenta?' }));
      } else {
        setErrors((prev) => ({ ...prev, submit: 'Ocurrió un error inesperado. Intenta de nuevo.' }));
      }
    } catch {
      setErrors((prev) => ({ ...prev, submit: 'Ocurrió un error inesperado. Intenta de nuevo.' }));
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="w-full max-w-md space-y-8">
      <div className="text-center lg:text-left">
        <h2 className="text-3xl font-bold text-neutral-900">Crea tu cuenta</h2>
        <p className="mt-2 text-neutral-500">Únete a KynWallet y gestiona tu dinero sin fronteras</p>
      </div>

      <form onSubmit={handleSubmit} className="mt-8 space-y-5" noValidate>
        <Input
          id="fullName"
          label="Nombre completo"
          type="text"
          placeholder="Juan Pérez"
          value={fullName}
          onChange={(e) => setFullName(e.target.value)}
          onBlur={() => handleBlur('fullName', fullName)}
          error={errors.fullName}
          aria-invalid={!!errors.fullName}
          aria-describedby={errors.fullName ? 'fullName-error' : undefined}
          autoComplete="name"
          required
        />

        <Input
          id="email"
          label="Correo electrónico"
          type="email"
          placeholder="ejemplo@correo.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          onBlur={() => handleBlur('email', email)}
          error={errors.email}
          aria-invalid={!!errors.email}
          aria-describedby={errors.email ? 'email-error' : undefined}
          autoComplete="email"
          required
        />

        <Input
          id="password"
          label="Contraseña"
          type="password"
          placeholder="••••••••"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          onBlur={() => handleBlur('password', password)}
          error={errors.password}
          aria-invalid={!!errors.password}
          aria-describedby={errors.password ? 'password-error' : undefined}
          autoComplete="new-password"
          required
        />

        <Input
          id="confirmPassword"
          label="Confirmar contraseña"
          type="password"
          placeholder="••••••••"
          value={confirmPassword}
          onChange={(e) => handleConfirmPasswordChange(e.target.value)}
          onBlur={() => handleBlur('confirmPassword', confirmPassword, password)}
          error={errors.confirmPassword}
          aria-invalid={!!errors.confirmPassword}
          aria-describedby={errors.confirmPassword ? 'confirmPassword-error' : undefined}
          autoComplete="new-password"
          required
        />

        <div className="flex items-start gap-3">
          <input
            id="terms"
            type="checkbox"
            checked={termsAccepted}
            onChange={(e) => setTermsAccepted(e.target.checked)}
            className="mt-1 h-4 w-4 text-brand-primary focus:ring-brand-primary border-neutral-300 rounded"
          />
          <label htmlFor="terms" className="text-sm text-neutral-500 leading-snug">
            Acepto los{' '}
            <span className="text-brand-primary font-medium cursor-pointer hover:underline">
              términos y condiciones
            </span>
          </label>
        </div>

        {errors.submit && (
          <div className="bg-red-50 text-red-500 p-3 rounded-lg text-sm border border-red-100">
            {errors.submit}
          </div>
        )}

        <Button type="submit" disabled={!isFormValid}>
          {isSubmitting ? 'Creando cuenta...' : 'Crear cuenta'}
        </Button>
      </form>

      <div className="mt-6">
        <div className="relative">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-neutral-300" />
          </div>
          <div className="relative flex justify-center text-sm">
            <span className="px-2 bg-white text-neutral-500">o continúa con</span>
          </div>
        </div>
        <div className="mt-6">
          <SocialLogins />
        </div>
      </div>

      <p className="text-center text-sm text-neutral-500">
        ¿Ya tienes cuenta?{' '}
        <Link href="/login" className="font-medium text-brand-primary hover:underline">
          Inicia sesión
        </Link>
      </p>
    </div>
  );
};

export default RegisterForm;

