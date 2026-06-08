'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Input } from './ui/Input';
import { Button } from './ui/Button';
import SocialLogins from './SocialLogins';
import { RegisterService } from '../lib/services/RegisterService';
import {
  validateEmail,
  validatePassword,
  validateFullName,
  validatePasswordMatch,
} from '../lib/utils/Validation';

const RegisterForm: React.FC = () => {
  const router = useRouter();

  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [acceptsTerms, setAcceptsTerms] = useState(false);

  const [fullNameError, setFullNameError] = useState<string | null>(null);
  const [emailError, setEmailError] = useState<string | null>(null);
  const [passwordError, setPasswordError] = useState<string | null>(null);
  const [confirmPasswordError, setConfirmPasswordError] = useState<string | null>(null);
  const [termsError, setTermsError] = useState<string | null>(null);
  const [serverError, setServerError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  // Real-time validation
  useEffect(() => {
    if (fullName && !validateFullName(fullName)) {
      setFullNameError('El nombre debe tener al menos 2 caracteres');
    } else if (fullName) {
      setFullNameError(null);
    }
  }, [fullName]);

  useEffect(() => {
    if (email && !validateEmail(email)) {
      setEmailError('Formato de correo inválido');
    } else if (email) {
      setEmailError(null);
    }
  }, [email]);

  useEffect(() => {
    if (password && !validatePassword(password)) {
      setPasswordError('La contraseña debe tener al menos 8 caracteres');
    } else if (password) {
      setPasswordError(null);
    }
  }, [password]);

  useEffect(() => {
    if (confirmPassword && !validatePasswordMatch(password, confirmPassword)) {
      setConfirmPasswordError('Las contraseñas no coinciden');
    } else if (confirmPassword) {
      setConfirmPasswordError(null);
    }
  }, [password, confirmPassword]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setServerError(null);

    // Full validation on submit
    let hasError = false;

    if (!validateFullName(fullName)) {
      setFullNameError('El nombre es obligatorio');
      hasError = true;
    }
    if (!validateEmail(email)) {
      setEmailError('Formato de correo inválido');
      hasError = true;
    }
    if (!validatePassword(password)) {
      setPasswordError('La contraseña debe tener al menos 8 caracteres');
      hasError = true;
    }
    if (!validatePasswordMatch(password, confirmPassword)) {
      setConfirmPasswordError('Las contraseñas no coinciden');
      hasError = true;
    }
    if (!acceptsTerms) {
      setTermsError('Debes aceptar los términos y condiciones');
      hasError = true;
    }

    if (hasError) return;

    setLoading(true);

    try {
      const result = await RegisterService.register({
        FullName: fullName,
        Email: email,
        Password: password,
        ConfirmPassword: confirmPassword,
        AcceptsTerms: acceptsTerms,
      });

      if (result.success) {
        router.push('/?registered=true');
      } else {
        setServerError(result.error || 'Ocurrió un error al crear la cuenta.');
      }
    } catch {
      setServerError('Ocurrió un error inesperado. Intenta de nuevo.');
    } finally {
      setLoading(false);
    }
  };

  const isSubmitDisabled =
    loading ||
    !!fullNameError ||
    !!emailError ||
    !!passwordError ||
    !!confirmPasswordError;

  return (
    <div className="w-full max-w-md space-y-6">
      {/* Header */}
      <div>
        <h2 className="text-3xl font-bold text-neutral-900">Crea tu cuenta</h2>
        <p className="mt-2 text-sm text-neutral-500">
          Completa tus datos para comenzar
        </p>
      </div>

      <form onSubmit={handleSubmit} noValidate className="space-y-5">
        {/* Fields */}
        <div className="space-y-4">
          <Input
            id="fullName"
            label="Nombre completo"
            type="text"
            placeholder="Ej. Diego Martínez"
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
            error={fullNameError || undefined}
            required
            autoComplete="name"
          />
          <Input
            id="email"
            label="Correo electrónico"
            type="email"
            placeholder="tucorreo@ejemplo.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            error={emailError || undefined}
            required
            autoComplete="email"
          />
          <Input
            id="password"
            label="Contraseña"
            type="password"
            placeholder="••••••••"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            error={passwordError || undefined}
            required
            autoComplete="new-password"
          />
          <Input
            id="confirmPassword"
            label="Confirmar contraseña"
            type="password"
            placeholder="••••••••"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            error={confirmPasswordError || undefined}
            required
            autoComplete="new-password"
          />
        </div>

        {/* Terms Checkbox */}
        <div className="space-y-1">
          <div className="flex items-start gap-3">
            <input
              id="terms"
              type="checkbox"
              className="mt-0.5 h-4 w-4 text-brand-primary focus:ring-brand-primary border-neutral-300 rounded cursor-pointer"
              checked={acceptsTerms}
              onChange={(e) => {
                setAcceptsTerms(e.target.checked);
                if (e.target.checked) setTermsError(null);
              }}
            />
            <label htmlFor="terms" className="text-sm text-neutral-900 cursor-pointer">
              Acepto los{' '}
              <span className="text-brand-primary font-medium hover:underline cursor-pointer">
                términos y condiciones
              </span>
            </label>
          </div>
          {termsError && (
            <p className="text-xs text-red-500 ml-7">{termsError}</p>
          )}
        </div>

        {/* Server Error */}
        {serverError && (
          <div className="bg-red-50 text-red-500 p-3 rounded-lg text-sm border border-red-100">
            {serverError}
          </div>
        )}

        {/* Submit */}
        <Button type="submit" disabled={isSubmitDisabled}>
          {loading ? 'Creando cuenta...' : 'Crear cuenta'}
        </Button>
      </form>

      {/* Divider + Social */}
      <div>
        <div className="relative">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-neutral-300" />
          </div>
          <div className="relative flex justify-center text-sm">
            <span className="px-2 bg-white text-neutral-500">o regístrate con</span>
          </div>
        </div>
        <div className="mt-4">
          <SocialLogins />
        </div>
      </div>

      {/* Login Link */}
      <p className="text-center text-sm text-neutral-500">
        ¿Ya tienes cuenta?{' '}
        <Link
          href="/"
          className="font-medium text-brand-primary hover:underline"
        >
          Inicia sesión
        </Link>
      </p>
    </div>
  );
};

export default RegisterForm;
