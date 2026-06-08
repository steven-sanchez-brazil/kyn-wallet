'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Input } from './ui/Input';
import { Button } from './ui/Button';
import SocialLogins from './SocialLogins';
import { AuthService } from '../lib/services/AuthService';
import { validateEmail, validatePassword } from '../lib/utils/Validation';

const LoginForm: React.FC = () => {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);
  const [emailError, setEmailError] = useState<string | null>(null);
  const [passwordError, setPasswordError] = useState<string | null>(null);
  const [authError, setAuthError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  // Real-time validation for email
  useEffect(() => {
    if (email && !validateEmail(email)) {
      setEmailError('Formato de correo inválido');
    } else {
      setEmailError(null);
    }
  }, [email]);

  // Real-time validation for password
  useEffect(() => {
    if (password && !validatePassword(password)) {
      setPasswordError('La contraseña debe tener al menos 8 caracteres');
    } else {
      setPasswordError(null);
    }
  }, [password]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setAuthError(null);

    const isEmailValid = validateEmail(email);
    const isPasswordValid = validatePassword(password);

    if (!isEmailValid || !isPasswordValid) {
      if (!isEmailValid) setEmailError('Formato de correo inválido');
      if (!isPasswordValid) setPasswordError('La contraseña debe tener al menos 8 caracteres');
      return;
    }

    setLoading(true);

    try {
      const success = await AuthService.login({
        Email: email,
        Password: password,
      });

      if (success) {
        router.push('/construction');
      } else {
        setAuthError('Credenciales inválidas. Por favor, intenta de nuevo.');
      }
    } catch (err) {
      setAuthError('Ocurrió un error inesperado.');
    } finally {
      setLoading(false);
    }
  };

  const handleForgotPassword = () => {
    alert('Recuperación de contraseña estará disponible próximamente.');
  };

  return (
    <div className="w-full max-w-[400px] space-y-[22px]">
      <div className="text-left">
        <h2 className="text-[30px] font-bold text-neutral-900">
          Bienvenido de nuevo
        </h2>
        <p className="mt-2 text-[16px] font-normal text-neutral-500">
          Ingresa a tu cuenta para continuar
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-[22px]">
        <div className="space-y-[22px]">
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
            autoComplete="current-password"
            showToggle
          />
        </div>

        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <input
              id="remember-me"
              name="remember-me"
              type="checkbox"
              className="w-5 h-5 border-[1.5px] border-neutral-300 rounded-[6px] accent-brand-primary cursor-pointer"
              checked={rememberMe}
              onChange={(e) => setRememberMe(e.target.checked)}
            />
            <label htmlFor="remember-me" className="text-[14px] font-medium text-neutral-700">
              Recordarme
            </label>
          </div>

          <button
            type="button"
            onClick={handleForgotPassword}
            className="text-[14px] font-semibold text-brand-600 hover:opacity-80"
          >
            ¿Olvidaste tu contraseña?
          </button>
        </div>

        {authError && (
          <div className="bg-red-50 text-red-500 p-3 rounded-lg text-sm border border-red-100">
            {authError}
          </div>
        )}

        <Button type="submit" disabled={loading || !!emailError || !!passwordError}>
          {loading ? 'Iniciando sesión...' : 'Iniciar sesión'}
        </Button>
      </form>

      <div className="flex items-center gap-[14px]">
        <div className="flex-1 h-px bg-neutral-300" />
        <span className="text-[13px] font-normal text-neutral-500">o continúa con</span>
        <div className="flex-1 h-px bg-neutral-300" />
      </div>

      <SocialLogins />

      <div className="flex items-center justify-center gap-[5px] text-[14px]">
        <span className="font-normal text-neutral-500">¿No tienes cuenta?</span>
        <Link href="/register" className="font-semibold text-brand-600 hover:opacity-80">
          Regístrate
        </Link>
      </div>
    </div>
  );
};

export default LoginForm;
