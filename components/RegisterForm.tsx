'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Input } from './ui/Input';
import { Button } from './ui/Button';
import { AuthService } from '../lib/services/AuthService';
import {
  validateEmail,
  validatePassword,
  validateFullName,
  validatePasswordsMatch,
} from '../lib/utils/Validation';

interface PasswordFieldProps {
  id: string;
  label: string;
  value: string;
  onChange: (value: string) => void;
  error?: string;
  autoComplete?: string;
}

const PasswordField: React.FC<PasswordFieldProps> = ({
  id,
  label,
  value,
  onChange,
  error,
  autoComplete,
}) => {
  const [visible, setVisible] = useState(false);

  return (
    <div className="w-full space-y-1">
      <label htmlFor={id} className="block text-sm font-medium text-neutral-700">
        {label}
      </label>
      <div className="relative">
        <input
          id={id}
          type={visible ? 'text' : 'password'}
          placeholder="••••••••"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          autoComplete={autoComplete}
          required
          className={`w-full px-4 py-3 pr-12 border rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-primary focus:border-transparent transition-all duration-200 ${
            error ? 'border-red-500' : 'border-neutral-300'
          }`}
        />
        <button
          type="button"
          onClick={() => setVisible((v) => !v)}
          aria-label={visible ? 'Ocultar contraseña' : 'Mostrar contraseña'}
          className="absolute right-3 top-1/2 -translate-y-1/2 text-neutral-500 hover:text-neutral-900"
        >
          {visible ? '🙈' : '👁'}
        </button>
      </div>
      {error && <p className="text-xs text-red-500 mt-1">{error}</p>}
    </div>
  );
};

const RegisterForm: React.FC = () => {
  const router = useRouter();
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [acceptedTerms, setAcceptedTerms] = useState(false);

  const [fullNameError, setFullNameError] = useState<string | null>(null);
  const [emailError, setEmailError] = useState<string | null>(null);
  const [passwordError, setPasswordError] = useState<string | null>(null);
  const [confirmPasswordError, setConfirmPasswordError] = useState<string | null>(
    null
  );
  const [termsError, setTermsError] = useState<string | null>(null);
  const [authError, setAuthError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  // Real-time validation
  useEffect(() => {
    if (fullName && !validateFullName(fullName)) {
      setFullNameError('El nombre completo es obligatorio');
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
    if (confirmPassword && !validatePasswordsMatch(password, confirmPassword)) {
      setConfirmPasswordError('Las contraseñas no coinciden');
    } else {
      setConfirmPasswordError(null);
    }
  }, [password, confirmPassword]);

  useEffect(() => {
    if (acceptedTerms) {
      setTermsError(null);
    }
  }, [acceptedTerms]);

  const handleSocial = () => {
    alert('Próximamente');
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setAuthError(null);

    const isFullNameValid = validateFullName(fullName);
    const isEmailValid = validateEmail(email);
    const isPasswordValid = validatePassword(password);
    const isConfirmValid = validatePasswordsMatch(password, confirmPassword);
    const isTermsValid = acceptedTerms;

    if (!isFullNameValid)
      setFullNameError('El nombre completo es obligatorio');
    if (!isEmailValid) setEmailError('Formato de correo inválido');
    if (!isPasswordValid)
      setPasswordError('La contraseña debe tener al menos 8 caracteres');
    if (!isConfirmValid)
      setConfirmPasswordError('Las contraseñas no coinciden');
    if (!isTermsValid)
      setTermsError('Debes aceptar los términos y condiciones');

    if (
      !isFullNameValid ||
      !isEmailValid ||
      !isPasswordValid ||
      !isConfirmValid ||
      !isTermsValid
    ) {
      return;
    }

    setLoading(true);

    try {
      const result = await AuthService.register({
        FullName: fullName,
        Email: email,
        Password: password,
        ConfirmPassword: confirmPassword,
        AcceptedTerms: acceptedTerms,
      });

      if (result.Success) {
        router.push('/login?registered=true');
      } else {
        setAuthError(result.Error || 'No se pudo crear la cuenta.');
      }
    } catch (err) {
      setAuthError('Ocurrió un error inesperado.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full max-w-md space-y-8">
      <div className="text-center lg:text-left">
        <h2 className="text-3xl font-bold text-neutral-900">Crea tu cuenta</h2>
        <p className="mt-2 text-neutral-500">
          Completa tus datos para comenzar
        </p>
      </div>

      <form onSubmit={handleSubmit} className="mt-8 space-y-6" noValidate>
        <div className="space-y-4">
          <Input
            id="fullName"
            label="Nombre completo"
            type="text"
            placeholder="Diego Martínez"
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
            error={fullNameError || undefined}
            labelClassName="text-neutral-700"
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
            labelClassName="text-neutral-700"
            required
            autoComplete="email"
          />
          <PasswordField
            id="password"
            label="Contraseña"
            value={password}
            onChange={setPassword}
            error={passwordError || undefined}
            autoComplete="new-password"
          />
          <PasswordField
            id="confirmPassword"
            label="Confirmar contraseña"
            value={confirmPassword}
            onChange={setConfirmPassword}
            error={confirmPasswordError || undefined}
            autoComplete="new-password"
          />
        </div>

        <div>
          <div className="flex items-start">
            <input
              id="accept-terms"
              name="accept-terms"
              type="checkbox"
              className="h-4 w-4 mt-0.5 text-brand-primary focus:ring-brand-primary border-neutral-300 rounded"
              checked={acceptedTerms}
              onChange={(e) => setAcceptedTerms(e.target.checked)}
            />
            <label
              htmlFor="accept-terms"
              className="ml-2 block text-sm text-neutral-700"
            >
              Acepto los{' '}
              <span className="font-medium text-brand-link">
                términos y condiciones
              </span>
            </label>
          </div>
          {termsError && (
            <p className="text-xs text-red-500 mt-1">{termsError}</p>
          )}
        </div>

        {authError && (
          <div className="bg-red-50 text-red-500 p-3 rounded-lg text-sm border border-red-100">
            {authError}
          </div>
        )}

        <Button type="submit" disabled={loading}>
          {loading ? 'Creando cuenta...' : 'Crear cuenta'}
        </Button>
      </form>

      <div className="mt-6">
        <div className="relative">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-neutral-300"></div>
          </div>
          <div className="relative flex justify-center text-sm">
            <span className="px-2 bg-white text-neutral-500">
              o regístrate con
            </span>
          </div>
        </div>

        <div className="mt-6 grid grid-cols-2 gap-4">
          <Button
            variant="secondary"
            type="button"
            onClick={handleSocial}
            className="flex items-center justify-center space-x-2"
          >
            <span className="text-lg">G</span>
            <span>Google</span>
          </Button>
          <Button
            variant="secondary"
            type="button"
            onClick={handleSocial}
            className="flex items-center justify-center space-x-2"
          >
            <span className="text-lg"></span>
            <span>Apple</span>
          </Button>
        </div>
      </div>

      <p className="text-center text-sm text-neutral-500">
        ¿Ya tienes cuenta?{' '}
        <Link
          href="/login"
          className="font-medium text-brand-link hover:text-opacity-80"
        >
          Inicia sesión
        </Link>
      </p>
    </div>
  );
};

export default RegisterForm;
