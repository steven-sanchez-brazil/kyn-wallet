'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Input } from './ui/Input';
import { Button } from './ui/Button';
import SocialLogins from './SocialLogins';
import { AuthService } from '../lib/services/AuthService';
import { validateEmail, validateFullName, validateComplexPassword } from '../lib/utils/Validation';

const RegisterForm: React.FC = () => {
  const router = useRouter();

  // Field states
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [agreedToTerms, setAgreedToTerms] = useState(false);

  // Error states
  const [fullNameError, setFullNameError] = useState<string | null>(null);
  const [emailError, setEmailError] = useState<string | null>(null);
  const [passwordError, setPasswordError] = useState<string | null>(null);
  const [confirmPasswordError, setConfirmPasswordError] = useState<string | null>(null);
  const [generalError, setGeneralError] = useState<string | null>(null);

  // Eye toggle visibility states
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const [loading, setLoading] = useState(false);

  // Real-time validations
  useEffect(() => {
    if (fullName) {
      if (!validateFullName(fullName)) {
        setFullNameError('Ingresa tu nombre y apellido reales (mínimo 3 caracteres, sin números)');
      } else {
        setFullNameError(null);
      }
    }
  }, [fullName]);

  useEffect(() => {
    if (email) {
      if (!validateEmail(email)) {
        setEmailError('Correo electrónico inválido');
      } else {
        setEmailError(null);
      }
    }
  }, [email]);

  useEffect(() => {
    if (password) {
      if (!validateComplexPassword(password)) {
        setPasswordError('La contraseña debe tener un mínimo de 8 caracteres, al menos una letra mayúscula, una minúscula y un número');
      } else {
        setPasswordError(null);
      }
    }
  }, [password]);

  useEffect(() => {
    if (confirmPassword) {
      if (confirmPassword !== password) {
        setConfirmPasswordError('La confirmación no coincide con la contraseña');
      } else {
        setConfirmPasswordError(null);
      }
    }
  }, [confirmPassword, password]);

  // Clean blur handlers
  const handleFullNameBlur = () => {
    if (!validateFullName(fullName)) {
      setFullNameError('Ingresa tu nombre y apellido reales (mínimo 3 caracteres, sin números)');
    }
  };

  const handleEmailBlur = () => {
    if (!validateEmail(email)) {
      setEmailError('Correo electrónico inválido');
    }
  };

  const handlePasswordBlur = () => {
    if (!validateComplexPassword(password)) {
      setPasswordError('La contraseña debe tener un mínimo de 8 caracteres, al menos una letra mayúscula, una minúscula y un número');
    }
  };

  const handleConfirmPasswordBlur = () => {
    if (confirmPassword !== password) {
      setConfirmPasswordError('La confirmación no coincide con la contraseña');
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setGeneralError(null);

    // Initial validations trigger
    const isNameValid = validateFullName(fullName);
    const isEmailValid = validateEmail(email);
    const isPasswordValid = validateComplexPassword(password);
    const isConfirmValid = confirmPassword === password;

    if (!isNameValid || !isEmailValid || !isPasswordValid || !isConfirmValid || !agreedToTerms) {
      if (!isNameValid) setFullNameError('Ingresa tu nombre y apellido reales (mínimo 3 caracteres, sin números)');
      if (!isEmailValid) setEmailError('Correo electrónico inválido');
      if (!isPasswordValid) setPasswordError('La contraseña debe tener un mínimo de 8 caracteres, al menos una letra mayúscula, una minúscula y un número');
      if (!isConfirmValid) setConfirmPasswordError('La confirmación no coincide con la contraseña');
      if (!agreedToTerms) setGeneralError('Debes aceptar los términos y condiciones de uso para registrarte');
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
        router.push('/?registered=success');
      } else {
        setGeneralError('Este correo electrónico ya está registrado.');
      }
    } catch (err) {
      setGeneralError('Ocurrió un error inesperado al procesar tu registro.');
    } finally {
      setLoading(false);
    }
  };

  // SVG Eye open & closed icons for Password visibility toggle
  const renderEyeIcon = (visible: boolean, onClick: () => void) => {
    return (
      <button
        type="button"
        tabIndex={-1}
        onClick={onClick}
        className="absolute right-4 top-1/2 -translate-y-1/2 text-neutral-500 hover:text-neutral-700 focus:outline-none"
      >
        {visible ? (
          // Eye closed SVG
          <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l18 18" />
          </svg>
        ) : (
          // Eye open SVG
          <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
          </svg>
        )}
      </button>
    );
  };

  const isFormValid = 
    fullName && !fullNameError && 
    email && !emailError && 
    password && !passwordError && 
    confirmPassword && !confirmPasswordError;

  return (
    <div className="w-full max-w-md space-y-8">
      <div className="text-center lg:text-left">
        <h2 className="text-3xl font-bold text-neutral-900">
          Crear cuenta
        </h2>
        <p className="mt-2 text-neutral-500">
          Regístrate para comenzar a administrar tu dinero
        </p>
      </div>

      <form onSubmit={handleSubmit} className="mt-8 space-y-6">
        <div className="space-y-4">
          <Input
            id="fullName"
            label="Nombre completo"
            type="text"
            placeholder="Steven Luna"
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
            onBlur={handleFullNameBlur}
            error={fullNameError || undefined}
            required
          />

          <Input
            id="email"
            label="Correo electrónico"
            type="email"
            placeholder="steven@kynwallet.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            onBlur={handleEmailBlur}
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
              onBlur={handlePasswordBlur}
              error={passwordError || undefined}
              required
              autoComplete="new-password"
            />
            {renderEyeIcon(showPassword, () => setShowPassword(!showPassword))}
          </div>

          <div className="relative">
            <Input
              id="confirmPassword"
              label="Confirmar contraseña"
              type={showConfirmPassword ? 'text' : 'password'}
              placeholder="••••••••"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              onBlur={handleConfirmPasswordBlur}
              error={confirmPasswordError || undefined}
              required
              autoComplete="new-password"
            />
            {renderEyeIcon(showConfirmPassword, () => setShowConfirmPassword(!showConfirmPassword))}
          </div>
        </div>

        <div className="flex items-start">
          <div className="flex items-center h-5">
            <input
              id="agreedToTerms"
              name="agreedToTerms"
              type="checkbox"
              className="h-4 w-4 text-brand-primary focus:ring-brand-primary border-neutral-300 rounded"
              checked={agreedToTerms}
              onChange={(e) => setAgreedToTerms(e.target.checked)}
            />
          </div>
          <div className="ml-3 text-sm">
            <label htmlFor="agreedToTerms" className="text-neutral-500">
              Acepto los{' '}
              <a href="#" className="font-semibold text-brand-primary hover:text-opacity-80">
                Términos y condiciones de uso
              </a>
            </label>
          </div>
        </div>

        {generalError && (
          <div className="bg-red-50 text-red-500 p-3 rounded-lg text-sm border border-red-100">
            {generalError}
          </div>
        )}

        <Button 
          type="submit" 
          disabled={loading || !isFormValid}
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

        <div className="mt-6 font-sans">
          <SocialLogins />
        </div>
      </div>

      <div className="text-center text-sm text-neutral-500 mt-6">
        ¿Ya tienes cuenta?{' '}
        <a href="/" className="font-semibold text-brand-primary hover:text-opacity-80">
          Inicia sesión
        </a>
      </div>
    </div>
  );
};

export default RegisterForm;