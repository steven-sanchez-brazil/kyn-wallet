'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Input } from './ui/Input';
import { Button } from './ui/Button';
import SocialLogins from './SocialLogins';
import { AuthService } from '../lib/services/AuthService';
import { 
  validateEmail, 
  validatePassword, 
  validateFullName, 
  passwordsMatch 
} from '../lib/utils/Validation';

const RegisterForm: React.FC = () => {
  const router = useRouter();
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [acceptTerms, setAcceptTerms] = useState(false);

  const [fullNameError, setFullNameError] = useState<string | null>(null);
  const [emailError, setEmailError] = useState<string | null>(null);
  const [passwordError, setPasswordError] = useState<string | null>(null);
  const [confirmPasswordError, setConfirmPasswordError] = useState<string | null>(null);
  const [registerError, setRegisterError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  // Real-time validations
  useEffect(() => {
    if (fullName && !validateFullName(fullName)) {
      setFullNameError('El nombre es obligatorio');
    } else {
      setFullNameError(null);
    }
  }, [fullName]);

  useEffect(() => {
    if (email && !validateEmail(email)) {
      setEmailError('Formato de correo inválido');
    } else {
      setEmailError(null);
    }
  }, [email]);

  useEffect(() => {
    if (password && !validatePassword(password)) {
      setPasswordError('La contraseña debe tener al menos 8 caracteres');
    } else {
      setPasswordError(null);
    }
  }, [password]);

  useEffect(() => {
    if (confirmPassword && !passwordsMatch(password, confirmPassword)) {
      setConfirmPasswordError('Las contraseñas no coinciden');
    } else {
      setConfirmPasswordError(null);
    }
  }, [password, confirmPassword]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setRegisterError(null);

    const isFullNameValid = validateFullName(fullName);
    const isEmailValid = validateEmail(email);
    const isPasswordValid = validatePassword(password);
    const isMatch = passwordsMatch(password, confirmPassword);

    if (!isFullNameValid || !isEmailValid || !isPasswordValid || !isMatch || !acceptTerms) {
      if (!isFullNameValid) setFullNameError('El nombre es obligatorio');
      if (!isEmailValid) setEmailError('Formato de correo inválido');
      if (!isPasswordValid) setPasswordError('La contraseña debe tener al menos 8 caracteres');
      if (!isMatch) setConfirmPasswordError('Las contraseñas no coinciden');
      return;
    }

    setLoading(true);

    try {
      const success = await AuthService.register({
        FullName: fullName,
        Email: email,
        Password: password,
        ConfirmPassword: confirmPassword,
      });

      if (success) {
        router.push('/login?registro=exitoso');
      } else {
        setRegisterError('Ocurrió un error durante el registro. Intenta de nuevo.');
      }
    } catch (err) {
      setRegisterError('Ocurrió un error inesperado.');
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
          Únete a KynWallet y maneja tu dinero sin fronteras
        </p>
      </div>

      <form onSubmit={handleSubmit} className="mt-8 space-y-6">
        <div className="space-y-4">
          <Input
            id="full-name"
            label="Nombre completo"
            type="text"
            placeholder="Ej. Steven Luna"
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
            error={fullNameError || undefined}
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
            id="confirm-password"
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
              className="h-4 w-4 text-brand-primary focus:ring-brand-primary border-neutral-300 rounded-md"
              checked={acceptTerms}
              onChange={(e) => setAcceptTerms(e.target.checked)}
              required
            />
          </div>
          <div className="ml-3 text-sm">
            <label htmlFor="terms" className="font-medium text-neutral-900">
              Acepto los términos y condiciones
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
          disabled={loading || !acceptTerms || !!fullNameError || !!emailError || !!passwordError || !!confirmPasswordError}
        >
          {loading ? 'Creando cuenta...' : 'Crear cuenta'}
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

      <div className="text-center mt-8">
        <p className="text-sm text-neutral-500">
          ¿Ya tienes cuenta?{' '}
          <Link href="/login" className="font-medium text-brand-primary hover:text-opacity-80">
            Inicia sesión
          </Link>
        </p>
      </div>
    </div>
  );
};

export default RegisterForm;
