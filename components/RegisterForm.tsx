'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Input } from './ui/Input';
import { Button } from './ui/Button';
import SocialLogins from './SocialLogins';
import { AuthService } from '../lib/services/AuthService';
import {
  validateEmail,
  validatePassword,
  validateName,
  validatePasswordsMatch,
} from '../lib/utils/Validation';

const RegisterForm: React.FC = () => {
  const router = useRouter();

  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [acceptedTerms, setAcceptedTerms] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const [fullNameError, setFullNameError] = useState<string | null>(null);
  const [emailError, setEmailError] = useState<string | null>(null);
  const [passwordError, setPasswordError] = useState<string | null>(null);
  const [confirmPasswordError, setConfirmPasswordError] = useState<string | null>(null);
  const [authError, setAuthError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const validateAll = (): boolean => {
    let valid = true;

    if (!validateName(fullName)) {
      setFullNameError('Este campo es obligatorio');
      valid = false;
    } else {
      setFullNameError(null);
    }

    if (!email) {
      setEmailError('Este campo es obligatorio');
      valid = false;
    } else if (!validateEmail(email)) {
      setEmailError('Formato de correo inválido');
      valid = false;
    } else {
      setEmailError(null);
    }

    if (!password) {
      setPasswordError('Este campo es obligatorio');
      valid = false;
    } else if (!validatePassword(password)) {
      setPasswordError('La contraseña debe tener al menos 8 caracteres');
      valid = false;
    } else {
      setPasswordError(null);
    }

    if (!confirmPassword) {
      setConfirmPasswordError('Este campo es obligatorio');
      valid = false;
    } else if (!validatePasswordsMatch(password, confirmPassword)) {
      setConfirmPasswordError('Las contraseñas no coinciden');
      valid = false;
    } else {
      setConfirmPasswordError(null);
    }

    return valid;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setAuthError(null);

    if (!validateAll()) return;

    setLoading(true);
    try {
      const result = await AuthService.register({
        FullName: fullName,
        Email: email,
        Password: password,
        ConfirmPassword: confirmPassword,
        AcceptedTerms: acceptedTerms,
      });

      if (result.success) {
        router.push('/login?registered=true');
      } else {
        setAuthError(result.error ?? 'Ocurrió un error al crear la cuenta.');
      }
    } catch {
      setAuthError('Ocurrió un error inesperado.');
    } finally {
      setLoading(false);
    }
  };

  const isSubmitDisabled = loading || !acceptedTerms;

  return (
    <div className="w-full max-w-md space-y-6">
      <div className="text-center lg:text-left">
        <h2 className="text-3xl font-bold text-neutral-900">Crea tu cuenta</h2>
        <p className="mt-1 text-sm text-neutral-500">Completa tus datos para comenzar</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
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

        <div className="relative">
          <Input
            id="password"
            label="Contraseña"
            type={showPassword ? 'text' : 'password'}
            placeholder="••••••••"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            error={passwordError || undefined}
            required
            autoComplete="new-password"
          />
          <button
            type="button"
            onClick={() => setShowPassword((v) => !v)}
            className="absolute right-3 top-[34px] text-neutral-500 hover:text-neutral-900 text-sm"
            aria-label={showPassword ? 'Ocultar contraseña' : 'Mostrar contraseña'}
          >
            {showPassword ? '🙈' : '👁'}
          </button>
        </div>

        <div className="relative">
          <Input
            id="confirmPassword"
            label="Confirmar contraseña"
            type={showConfirmPassword ? 'text' : 'password'}
            placeholder="••••••••"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            error={confirmPasswordError || undefined}
            required
            autoComplete="new-password"
          />
          <button
            type="button"
            onClick={() => setShowConfirmPassword((v) => !v)}
            className="absolute right-3 top-[34px] text-neutral-500 hover:text-neutral-900 text-sm"
            aria-label={showConfirmPassword ? 'Ocultar contraseña' : 'Mostrar contraseña'}
          >
            {showConfirmPassword ? '🙈' : '👁'}
          </button>
        </div>

        <div className="flex items-start gap-2 pt-1">
          <input
            id="terms"
            type="checkbox"
            checked={acceptedTerms}
            onChange={(e) => setAcceptedTerms(e.target.checked)}
            className="mt-0.5 h-4 w-4 rounded border-neutral-300 text-brand-primary focus:ring-brand-primary"
          />
          <label htmlFor="terms" className="text-sm text-neutral-500">
            Acepto los{' '}
            <button
              type="button"
              className="text-brand-primary hover:underline font-medium"
              onClick={() => alert('Términos y condiciones próximamente.')}
            >
              términos y condiciones
            </button>
          </label>
        </div>

        {authError && (
          <div className="bg-red-50 text-red-500 p-3 rounded-lg text-sm border border-red-100">
            {authError}
          </div>
        )}

        <Button type="submit" disabled={isSubmitDisabled}>
          {loading ? 'Creando cuenta...' : 'Crear cuenta'}
        </Button>
      </form>

      <div className="relative">
        <div className="absolute inset-0 flex items-center">
          <div className="w-full border-t border-neutral-300" />
        </div>
        <div className="relative flex justify-center text-sm">
          <span className="px-2 bg-white text-neutral-500">o regístrate con</span>
        </div>
      </div>

      <SocialLogins />

      <p className="text-center text-sm text-neutral-500">
        ¿Ya tienes cuenta?{' '}
        <a href="/login" className="text-brand-primary font-medium hover:underline">
          Inicia sesión
        </a>
      </p>
    </div>
  );
};

export default RegisterForm;
