'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Input } from './ui/Input';
import { Button } from './ui/Button';
import { AuthService } from '../lib/services/AuthService';
import { validateEmail, validatePassword, validateName } from '../lib/utils/Validation';

const RegisterForm: React.FC = () => {
  const router = useRouter();
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [agreeTerms, setAgreeTerms] = useState(false);

  const [fullNameError, setFullNameError] = useState<string | null>(null);
  const [emailError, setEmailError] = useState<string | null>(null);
  const [passwordError, setPasswordError] = useState<string | null>(null);
  const [confirmPasswordError, setConfirmPasswordError] = useState<string | null>(null);
  const [registerError, setRegisterError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  // Real-time validation for Full Name
  useEffect(() => {
    if (fullName && !validateName(fullName)) {
      setFullNameError('El nombre debe tener al menos 3 caracteres');
    } else {
      setFullNameError(null);
    }
  }, [fullName]);

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

  // Real-time validation for password confirmation
  useEffect(() => {
    if (confirmPassword && confirmPassword !== password) {
      setConfirmPasswordError('Las contraseñas no coinciden');
    } else {
      setConfirmPasswordError(null);
    }
  }, [confirmPassword, password]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setRegisterError(null);

    const isNameValid = validateName(fullName);
    const isEmailValid = validateEmail(email);
    const isPasswordValid = validatePassword(password);
    const isConfirmValid = password === confirmPassword;

    if (!isNameValid || !isEmailValid || !isPasswordValid || !isConfirmValid || !agreeTerms) {
      if (!isNameValid) setFullNameError('El nombre debe tener al menos 3 caracteres');
      if (!isEmailValid) setEmailError('Formato de correo inválido');
      if (!isPasswordValid) setPasswordError('La contraseña debe tener al menos 8 caracteres');
      if (!isConfirmValid) setConfirmPasswordError('Las contraseñas no coinciden');
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
        router.push('/login?registered=success');
      } else {
        setRegisterError('El correo electrónico ya se encuentra registrado.');
      }
    } catch (err) {
      setRegisterError('Ocurrió un error inesperado al procesar el registro.');
    } finally {
      setLoading(false);
    }
  };

  const handleSocialClick = (provider: string) => {
    alert('Próximamente');
  };

  const isFormInvalid = 
    !fullName || 
    !email || 
    !password || 
    !confirmPassword || 
    !agreeTerms || 
    !!fullNameError || 
    !!emailError || 
    !!passwordError || 
    !!confirmPasswordError;

  return (
    <div className="w-full max-w-md space-y-8">
      <div className="text-center lg:text-left">
        <h2 className="text-3xl font-bold text-neutral-900">
          Crea tu cuenta
        </h2>
        <p className="mt-2 text-neutral-500">
          Completa tus datos para comenzar
        </p>
      </div>

      <form onSubmit={handleSubmit} className="mt-8 space-y-5">
        <div className="space-y-4">
          <Input
            id="fullName"
            label="Nombre completo"
            type="text"
            placeholder="Ej: Diego Martínez"
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
            showTogglePassword={true}
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
            showTogglePassword={true}
            required
            autoComplete="new-password"
          />
        </div>

        <div className="flex items-center">
          <input
            id="agree-terms"
            name="agree-terms"
            type="checkbox"
            className="h-4 w-4 text-brand-primary focus:ring-brand-primary border-neutral-300 rounded cursor-pointer"
            checked={agreeTerms}
            onChange={(e) => setAgreeTerms(e.target.checked)}
          />
          <label htmlFor="agree-terms" className="ml-2 block text-sm text-neutral-900 cursor-pointer">
            Acepto los <span className="font-medium text-brand-primary hover:text-opacity-80 underline">términos y condiciones</span>
          </label>
        </div>

        {registerError && (
          <div className="bg-red-50 text-red-500 p-3 rounded-lg text-sm border border-red-100">
            {registerError}
          </div>
        )}

        <Button type="submit" disabled={loading || isFormInvalid}>
          {loading ? 'Creando cuenta...' : 'Crear cuenta'}
        </Button>
      </form>

      <div className="mt-6">
        <div className="relative">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-neutral-300"></div>
          </div>
          <div className="relative flex justify-center text-sm">
            <span className="px-2 bg-white text-neutral-500">o regístrate con</span>
          </div>
        </div>

        <div className="mt-6 grid grid-cols-2 gap-4">
          <Button 
            variant="secondary" 
            onClick={() => handleSocialClick('Google')}
            className="flex items-center justify-center space-x-2"
          >
            <span className="text-lg">G</span>
            <span>Google</span>
          </Button>
          <Button 
            variant="secondary" 
            onClick={() => handleSocialClick('Apple')}
            className="flex items-center justify-center space-x-2"
          >
            <span className="text-lg"></span>
            <span>Apple</span>
          </Button>
        </div>
      </div>

      <div className="text-center text-sm text-neutral-500">
        ¿Ya tienes cuenta?{' '}
        <Link href="/login" className="font-medium text-brand-primary hover:text-opacity-80 underline">
          Inicia sesión
        </Link>
      </div>
    </div>
  );
};

export default RegisterForm;
