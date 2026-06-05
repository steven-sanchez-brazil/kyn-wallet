'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Input } from './ui/Input';
import { Button } from './ui/Button';
import SocialLogins from './SocialLogins';
import { AuthService } from '../lib/services/AuthService';
import { validateEmail, validatePassword, validatePasswordsMatch } from '../lib/utils/Validation';

const RegisterForm: React.FC = () => {
  const router = useRouter();
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [acceptTerms, setAcceptTerms] = useState(false);

  const [emailError, setEmailError] = useState<string | null>(null);
  const [passwordError, setPasswordError] = useState<string | null>(null);
  const [confirmPasswordError, setConfirmPasswordError] = useState<string | null>(null);
  const [registerError, setRegisterError] = useState<string | null>(null);
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

  // Real-time validation for confirm password
  useEffect(() => {
    if (confirmPassword && !validatePasswordsMatch(password, confirmPassword)) {
      setConfirmPasswordError('Las contraseñas no coinciden');
    } else {
      setConfirmPasswordError(null);
    }
  }, [password, confirmPassword]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setRegisterError(null);

    if (!validateEmail(email) || !validatePassword(password) || !validatePasswordsMatch(password, confirmPassword) || !acceptTerms || !fullName) {
      return;
    }

    setLoading(true);

    try {
      const success = await AuthService.register({
        FullName: fullName,
        Email: email,
        Password: password,
      });

      if (success) {
        alert('Registro exitoso. Ahora puedes iniciar sesión.');
        router.push('/login');
      } else {
        setRegisterError('El correo ya está registrado.');
      }
    } catch (err) {
      setRegisterError('Ocurrió un error inesperado.');
    } finally {
      setLoading(false);
    }
  };

  const isFormValid = fullName && email && password && confirmPassword && acceptTerms && !emailError && !passwordError && !confirmPasswordError;

  return (
    <div className="w-full max-w-md space-y-8">
      <div className="text-center lg:text-left">
        <h2 className="text-3xl font-bold text-neutral-900">
          Crea tu cuenta
        </h2>
        <p className="mt-2 text-neutral-500">
          Únete a KynWallet y empieza a gestionar tu dinero
        </p>
      </div>

      <form onSubmit={handleSubmit} className="mt-8 space-y-6">
        <div className="space-y-4">
          <Input
            id="fullName"
            label="Nombre completo"
            type="text"
            placeholder="Juan Pérez"
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
            required
          />
          <Input
            id="email"
            label="Correo electrónico"
            type="email"
            placeholder="ejemplo@correo.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            error={emailError || undefined}
            required
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
          />
        </div>

        <div className="flex items-start">
          <div className="flex items-center h-5">
            <input
              id="terms"
              name="terms"
              type="checkbox"
              className="h-4 w-4 text-brand-primary focus:ring-brand-primary border-neutral-300 rounded"
              checked={acceptTerms}
              onChange={(e) => setAcceptTerms(e.target.checked)}
              required
            />
          </div>
          <div className="ml-3 text-sm">
            <label htmlFor="terms" className="text-neutral-500">
              Acepto los{' '}
              <button type="button" className="text-brand-primary font-medium hover:text-opacity-80">
                Términos y Condiciones
              </button>
            </label>
          </div>
        </div>

        {registerError && (
          <div className="bg-red-50 text-red-500 p-3 rounded-lg text-sm border border-red-100">
            {registerError}
          </div>
        )}

        <Button type="submit" disabled={loading || !isFormValid}>
          {loading ? 'Creando cuenta...' : 'Crear cuenta'}
        </Button>
      </form>

      <div className="mt-4 text-center">
        <p className="text-sm text-neutral-500">
          ¿Ya tienes cuenta?{' '}
          <Link href="/login" className="font-medium text-brand-primary hover:text-opacity-80">
            Inicia sesión
          </Link>
        </p>
      </div>

      <div className="mt-6">
        <div className="relative">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-neutral-300"></div>
          </div>
          <div className="relative flex justify-center text-sm">
            <span className="px-2 bg-white text-neutral-500">o regístrate con</span>
          </div>
        </div>

        <div className="mt-6">
          <SocialLogins />
        </div>
      </div>
    </div>
  );
};

export default RegisterForm;
