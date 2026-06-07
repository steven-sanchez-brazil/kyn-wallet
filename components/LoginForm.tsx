'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import { Input } from './ui/Input';
import { Button } from './ui/Button';
import SocialLogins from './SocialLogins';
import { AuthService } from '../lib/services/AuthService';
import { validateEmail, validatePassword } from '../lib/utils/Validation';

const LoginForm: React.FC = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);
  const [emailError, setEmailError] = useState<string | null>(null);
  const [passwordError, setPasswordError] = useState<string | null>(null);
  const [authError, setAuthError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const isRegistered = searchParams.get('registered') === 'true';

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
    <div className="w-full max-w-md space-y-8">
      <div className="text-center lg:text-left">
        <h2 className="text-3xl font-bold text-neutral-900">
          Bienvenido de nuevo
        </h2>
        <p className="mt-2 text-neutral-500">
          Ingresa tus credenciales para acceder a tu billetera
        </p>
      </div>

      <form onSubmit={handleSubmit} className="mt-8 space-y-6">
        {isRegistered && (
          <div className="bg-green-50 text-green-700 p-3 rounded-lg text-sm border border-green-100">
            Registro exitoso. Ahora puedes iniciar sesión.
          </div>
        )}

        <div className="space-y-4">
          <Input
            id="email"
            label="Correo electrónico"
            type="email"
            placeholder="ejemplo@correo.com"
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
          />
        </div>

        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <input
              id="remember-me"
              name="remember-me"
              type="checkbox"
              className="h-4 w-4 text-brand-primary focus:ring-brand-primary border-neutral-300 rounded"
              checked={rememberMe}
              onChange={(e) => setRememberMe(e.target.checked)}
            />
            <label htmlFor="remember-me" className="ml-2 block text-sm text-neutral-900">
              Recordarme
            </label>
          </div>

          <div className="text-sm">
            <button
              type="button"
              onClick={handleForgotPassword}
              className="font-medium text-brand-primary hover:text-opacity-80"
            >
              ¿Olvidaste tu contraseña?
            </button>
          </div>
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

      <div className="mt-6">
        <div className="relative">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-neutral-300"></div>
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
        ¿No tienes cuenta?{' '}
        <Link href="/register" className="font-medium text-brand-primary hover:text-opacity-80">
          Regístrate
        </Link>
      </p>
    </div>
  );
};

export default LoginForm;
