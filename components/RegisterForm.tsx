'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Input } from './ui/Input';
import { PasswordInput } from './ui/PasswordInput';
import { Button } from './ui/Button';
import SocialLogins from './SocialLogins';
import { RegistrationService } from '../lib/services/RegistrationService';
import {
  validateEmail,
  validatePassword,
  validateRequired,
  validatePasswordsMatch,
} from '../lib/utils/Validation';

interface FieldErrors {
  fullName?: string;
  email?: string;
  password?: string;
  passwordConfirmation?: string;
  terms?: string;
}

const RegisterForm: React.FC = () => {
  const router = useRouter();
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordConfirmation, setPasswordConfirmation] = useState('');
  const [acceptedTerms, setAcceptedTerms] = useState(false);
  const [errors, setErrors] = useState<FieldErrors>({});
  const [loading, setLoading] = useState(false);

  const validate = (): FieldErrors => {
    const next: FieldErrors = {};

    if (!validateRequired(fullName)) {
      next.fullName = 'El nombre es obligatorio';
    }
    if (!validateEmail(email)) {
      next.email = 'Formato de correo inválido';
    }
    if (!validatePassword(password)) {
      next.password = 'La contraseña debe tener al menos 8 caracteres';
    }
    if (!validatePasswordsMatch(password, passwordConfirmation)) {
      next.passwordConfirmation = 'Las contraseñas no coinciden';
    }
    if (!acceptedTerms) {
      next.terms = 'Debes aceptar los términos y condiciones';
    }

    return next;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (loading) return;

    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    setErrors({});
    setLoading(true);

    try {
      const result = await RegistrationService.register({
        FullName: fullName,
        Email: email,
        Password: password,
        PasswordConfirmation: passwordConfirmation,
        AcceptedTerms: acceptedTerms,
      });

      if (result.Success) {
        router.push('/construction');
      } else if (result.ErrorCode === 'EMAIL_TAKEN') {
        setErrors({ email: 'Este correo ya está registrado' });
      } else {
        setErrors({ email: 'No se pudo completar el registro. Revisa tus datos.' });
      }
    } catch {
      setErrors({ email: 'Ocurrió un error inesperado.' });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full max-w-md space-y-6">
      <div className="text-center lg:text-left">
        <h2 className="text-3xl font-bold text-neutral-900">Crea tu cuenta</h2>
        <p className="mt-2 text-neutral-500">Completa tus datos para comenzar</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4" noValidate>
        <Input
          id="fullName"
          label="Nombre completo"
          type="text"
          placeholder="Ej: Diego Martínez"
          value={fullName}
          onChange={(e) => setFullName(e.target.value)}
          error={errors.fullName}
          autoComplete="name"
        />
        <Input
          id="email"
          label="Correo electrónico"
          type="email"
          placeholder="tucorreo@ejemplo.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          error={errors.email}
          autoComplete="email"
        />
        <PasswordInput
          id="password"
          label="Contraseña"
          placeholder="••••••••"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          error={errors.password}
          autoComplete="new-password"
        />
        <PasswordInput
          id="passwordConfirmation"
          label="Confirmar contraseña"
          placeholder="••••••••"
          value={passwordConfirmation}
          onChange={(e) => setPasswordConfirmation(e.target.value)}
          error={errors.passwordConfirmation}
          autoComplete="new-password"
        />

        <div className="space-y-1">
          <div className="flex items-center">
            <input
              id="terms"
              name="terms"
              type="checkbox"
              className="h-4 w-4 text-brand-primary focus:ring-brand-primary border-neutral-300 rounded"
              checked={acceptedTerms}
              onChange={(e) => setAcceptedTerms(e.target.checked)}
            />
            <label htmlFor="terms" className="ml-2 block text-sm text-neutral-900">
              Acepto los{' '}
              <span className="text-brand-primary font-medium">
                términos y condiciones
              </span>
            </label>
          </div>
          {errors.terms && <p className="text-xs text-red-500">{errors.terms}</p>}
        </div>

        <Button type="submit" disabled={loading}>
          {loading ? 'Creando cuenta...' : 'Crear cuenta'}
        </Button>
      </form>

      <div>
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

      <p className="text-center text-sm text-neutral-500">
        ¿Ya tienes cuenta?{' '}
        <Link href="/" className="text-brand-primary font-semibold hover:underline">
          Inicia sesión
        </Link>
      </p>
    </div>
  );
};

export default RegisterForm;
