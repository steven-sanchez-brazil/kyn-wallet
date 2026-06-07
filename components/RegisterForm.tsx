'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Input } from './ui/Input';
import { Button } from './ui/Button';
import SocialLogins from './SocialLogins';
import { registerAction } from '../lib/actions/authActions';
import { validateEmail, validatePassword, validateFullName, passwordsMatch } from '../lib/utils/Validation';
import Link from 'next/link';

const RegisterForm: React.FC = () => {
  const router = useRouter();
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [termsAccepted, setTermsAccepted] = useState(false);
  
  const [fullNameError, setFullNameError] = useState<string | null>(null);
  const [emailError, setEmailError] = useState<string | null>(null);
  const [passwordError, setPasswordError] = useState<string | null>(null);
  const [confirmPasswordError, setConfirmPasswordError] = useState<string | null>(null);
  const [termsError, setTermsError] = useState<string | null>(null);
  const [authError, setAuthError] = useState<string | null>(null);
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
    setAuthError(null);

    const isFullNameValid = validateFullName(fullName);
    const isEmailValid = validateEmail(email);
    const isPasswordValid = validatePassword(password);
    const isConfirmMatch = passwordsMatch(password, confirmPassword);
    
    if (!isFullNameValid || !isEmailValid || !isPasswordValid || !isConfirmMatch || !termsAccepted) {
      if (!isFullNameValid) setFullNameError('El nombre es obligatorio');
      if (!isEmailValid) setEmailError('Formato de correo inválido');
      if (!isPasswordValid) setPasswordError('La contraseña debe tener al menos 8 caracteres');
      if (!isConfirmMatch) setConfirmPasswordError('Las contraseñas no coinciden');
      if (!termsAccepted) setTermsError('Debes aceptar los términos y condiciones');
      return;
    }

    setLoading(true);

    try {
      const result = await registerAction({
        FullName: fullName,
        Email: email,
        Password: password,
        ConfirmPassword: confirmPassword,
        TermsAccepted: termsAccepted,
      });

      if (result.success) {
        router.push('/?registered=true');
      } else {
        setAuthError(result.error || 'Ocurrió un error al registrar el usuario.');
      }
    } catch (err) {
      setAuthError('Ocurrió un error inesperado.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full max-w-md space-y-8">
      {/* Mobile-only Logo */}
      <div className="lg:hidden flex justify-center mb-8">
        <div className="flex gap-[12px] items-center">
          <div className="w-8 h-8 bg-brand-primary rounded-lg flex items-center justify-center text-white font-bold">K</div>
          <p className="font-bold text-2xl text-neutral-900 tracking-tight">
            KynWallet
          </p>
        </div>
      </div>

      <div className="text-center lg:text-left">
        <h2 className="text-3xl font-bold text-neutral-900">
          Crea tu cuenta
        </h2>
        <p className="mt-2 text-neutral-500">
          Únete a KynWallet y empieza a transaccionar
        </p>
      </div>

      <form onSubmit={handleSubmit} className="mt-8 space-y-4">
        <Input
          id="fullName"
          label="Nombre completo"
          type="text"
          placeholder="Ej: Juan Pérez"
          value={fullName}
          onChange={(e) => setFullName(e.target.value)}
          error={fullNameError || undefined}
          required
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

        <div className="flex items-start">
          <div className="flex items-center h-5">
            <input
              id="terms"
              name="terms"
              type="checkbox"
              className="h-4 w-4 text-brand-primary focus:ring-brand-primary border-neutral-300 rounded"
              checked={termsAccepted}
              onChange={(e) => {
                setTermsAccepted(e.target.checked);
                if (e.target.checked) setTermsError(null);
              }}
            />
          </div>
          <div className="ml-3 text-sm">
            <label htmlFor="terms" className="text-neutral-700">
              Acepto los <span className="text-brand-primary font-medium cursor-pointer">términos y condiciones</span>
            </label>
            {termsError && <p className="text-xs text-red-500 mt-1">{termsError}</p>}
          </div>
        </div>

        {authError && (
          <div className="bg-red-50 text-red-500 p-3 rounded-lg text-sm border border-red-100">
            {authError}
          </div>
        )}

        <Button 
          type="submit" 
          disabled={loading || !!fullNameError || !!emailError || !!passwordError || !!confirmPasswordError}
          className="mt-4"
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
            <span className="px-2 bg-white text-neutral-500">o regístrate con</span>
          </div>
        </div>

        <div className="mt-6">
          <SocialLogins />
        </div>
      </div>

      <div className="mt-8 text-center text-sm">
        <span className="text-neutral-500">¿Ya tienes una cuenta? </span>
        <Link 
          href="/" 
          className="font-semibold text-brand-primary hover:text-opacity-80"
        >
          Inicia sesión
        </Link>
      </div>
    </div>
  );
};

export default RegisterForm;
