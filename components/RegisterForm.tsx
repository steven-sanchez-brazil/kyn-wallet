'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Input } from './ui/Input';
import { Button } from './ui/Button';
import SocialLogins from './SocialLogins';
import { AuthService } from '../lib/services/AuthService';
import { validateEmail, validatePassword } from '../lib/utils/Validation';

const RegisterForm: React.FC = () => {
  const router = useRouter();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [agreeTerms, setAgreeTerms] = useState(false);

  const [nameError, setNameError] = useState<string | null>(null);
  const [emailError, setEmailError] = useState<string | null>(null);
  const [passwordError, setPasswordError] = useState<string | null>(null);
  const [confirmPasswordError, setConfirmPasswordError] = useState<string | null>(null);
  const [registerError, setRegisterError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  // Real-time validation for name
  useEffect(() => {
    if (name && name.trim().length < 3) {
      setNameError('El nombre debe tener al menos 3 caracteres');
    } else {
      setNameError(null);
    }
  }, [name]);

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
    if (confirmPassword && password !== confirmPassword) {
      setConfirmPasswordError('Las contraseñas no coinciden');
    } else {
      setConfirmPasswordError(null);
    }
  }, [password, confirmPassword]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setRegisterError(null);

    const isNameValid = name.trim().length >= 3;
    const isEmailValid = validateEmail(email);
    const isPasswordValid = validatePassword(password);
    const isConfirmPasswordValid = password === confirmPassword;

    if (!isNameValid || !isEmailValid || !isPasswordValid || !isConfirmPasswordValid || !agreeTerms) {
      if (!isNameValid) setNameError('El nombre debe tener al menos 3 caracteres');
      if (!isEmailValid) setEmailError('Formato de correo inválido');
      if (!isPasswordValid) setPasswordError('La contraseña debe tener al menos 8 caracteres');
      if (!isConfirmPasswordValid) setConfirmPasswordError('Las contraseñas no coinciden');
      if (!agreeTerms) setRegisterError('Debes aceptar los términos y condiciones');
      return;
    }

    setLoading(true);

    try {
      const success = await AuthService.register({
        Name: name.trim(),
        Email: email.trim(),
        Password: password,
      });

      if (success) {
        router.push('/construction');
      } else {
        setRegisterError('Ocurrió un error inesperado al registrar el usuario.');
      }
    } catch (err: any) {
      setRegisterError(err.message || 'Ocurrió un error inesperado.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full max-w-md space-y-8">
      <div className="text-center lg:text-left">
        <h2 className="text-3xl font-bold text-neutral-900">
          Crea tu cuenta
        </h2>
        <p className="mt-2 text-neutral-500">
          Completa tus datos para registrarte en la billetera
        </p>
      </div>

      <form onSubmit={handleSubmit} className="mt-8 space-y-6">
        <div className="space-y-4">
          <Input
            id="name"
            label="Nombre completo"
            type="text"
            placeholder="Luke Skywalker"
            value={name}
            onChange={(e) => setName(e.target.value)}
            error={nameError || undefined}
            required
            autoComplete="name"
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

        <div className="flex items-start">
          <div className="flex items-center h-5">
            <input
              id="agree-terms"
              name="agree-terms"
              type="checkbox"
              className="h-4 w-4 text-brand-primary focus:ring-brand-primary border-neutral-300 rounded"
              checked={agreeTerms}
              onChange={(e) => setAgreeTerms(e.target.checked)}
              required
            />
          </div>
          <div className="ml-3 text-sm">
            <label htmlFor="agree-terms" className="font-medium text-neutral-900">
              Acepto los{' '}
              <span className="text-brand-primary hover:underline cursor-pointer">
                Términos de servicio
              </span>{' '}
              y la{' '}
              <span className="text-brand-primary hover:underline cursor-pointer">
                Política de privacidad
              </span>
            </label>
          </div>
        </div>

        {registerError && (
          <div className="bg-red-50 text-red-500 p-3 rounded-lg text-sm border border-red-100">
            {registerError}
          </div>
        )}

        <Button 
          type="submit" 
          disabled={loading || !!nameError || !!emailError || !!passwordError || !!confirmPasswordError || !agreeTerms}
        >
          {loading ? 'Creando cuenta...' : 'Registrarse'}
        </Button>
      </form>

      <div className="text-center lg:text-left text-sm">
        <span className="text-neutral-500">¿Ya tienes una cuenta? </span>
        <Link href="/" className="font-medium text-brand-primary hover:text-opacity-80 hover:underline">
          Inicia sesión
        </Link>
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
