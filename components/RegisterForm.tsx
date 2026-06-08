'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Button } from './ui/Button';
import { Input } from './ui/Input';
import SocialLogins from './SocialLogins';
import { AuthService } from '../lib/services/AuthService';
import {
  validateEmail,
  validatePassword,
  validatePasswordMatch,
  validateRequiredField,
  validateTermsAccepted,
} from '../lib/utils/Validation';

interface RegisterErrors {
  FullName?: string;
  Email?: string;
  Password?: string;
  ConfirmPassword?: string;
  TermsAccepted?: string;
  Form?: string;
}

const RegisterForm: React.FC = () => {
  const router = useRouter();
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [termsAccepted, setTermsAccepted] = useState(false);
  const [errors, setErrors] = useState<RegisterErrors>({});
  const [loading, setLoading] = useState(false);

  const clearErrorsFor = (field: keyof RegisterErrors) => {
    setErrors((prev) => {
      if (!prev[field] && !prev.Form) {
        return prev;
      }

      const next = { ...prev };
      delete next[field];
      delete next.Form;
      return next;
    });
  };

  const validateForm = (): RegisterErrors => {
    const nextErrors: RegisterErrors = {};

    if (!validateRequiredField(fullName)) {
      nextErrors.FullName = 'El nombre completo es obligatorio.';
    }

    if (!validateRequiredField(email)) {
      nextErrors.Email = 'El correo electrónico es obligatorio.';
    } else if (!validateEmail(email)) {
      nextErrors.Email = 'Formato de correo inválido';
    }

    if (!validateRequiredField(password)) {
      nextErrors.Password = 'La contraseña es obligatoria.';
    } else if (!validatePassword(password)) {
      nextErrors.Password = 'La contraseña debe tener al menos 8 caracteres';
    }

    if (!validateRequiredField(confirmPassword)) {
      nextErrors.ConfirmPassword = 'Debes confirmar la contraseña.';
    } else if (!validatePasswordMatch(password, confirmPassword)) {
      nextErrors.ConfirmPassword = 'Las contraseñas no coinciden';
    }

    if (!validateTermsAccepted(termsAccepted)) {
      nextErrors.TermsAccepted = 'Debes aceptar términos y condiciones.';
    }

    return nextErrors;
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const nextErrors = validateForm();
    setErrors(nextErrors);

    if (Object.keys(nextErrors).length > 0) {
      return;
    }

    setLoading(true);

    try {
      const result = await AuthService.register({
        FullName: fullName,
        Email: email,
        Password: password,
        ConfirmPassword: confirmPassword,
        TermsAccepted: termsAccepted,
      });

      if (result.Success) {
        router.push('/login?registered=1');
        return;
      }

      if (result.ErrorCode === 'EMAIL_EXISTS') {
        setErrors({ Email: result.Message });
        return;
      }

      setErrors({ Form: result.Message });
    } catch {
      setErrors({ Form: 'Ocurrió un error inesperado.' });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full max-w-md space-y-8">
      <div className="text-center lg:text-left">
        <h2 className="text-4xl font-bold text-neutral-900">Crea tu cuenta</h2>
        <p className="mt-2 text-neutral-500">Completa tus datos para comenzar</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4" noValidate>
        <Input
          id="full-name"
          label="Nombre completo"
          type="text"
          placeholder="Ej. Diego Martínez"
          value={fullName}
          onChange={(e) => {
            setFullName(e.target.value);
            clearErrorsFor('FullName');
          }}
          error={errors.FullName}
          required
        />

        <Input
          id="register-email"
          label="Correo electrónico"
          type="email"
          placeholder="tucorreo@ejemplo.com"
          value={email}
          onChange={(e) => {
            setEmail(e.target.value);
            clearErrorsFor('Email');
          }}
          error={errors.Email}
          required
        />

        <Input
          id="register-password"
          label="Contraseña"
          type="password"
          placeholder="••••••••"
          value={password}
          onChange={(e) => {
            setPassword(e.target.value);
            clearErrorsFor('Password');
          }}
          error={errors.Password}
          required
        />

        <Input
          id="register-confirm-password"
          label="Confirmar contraseña"
          type="password"
          placeholder="••••••••"
          value={confirmPassword}
          onChange={(e) => {
            setConfirmPassword(e.target.value);
            clearErrorsFor('ConfirmPassword');
          }}
          error={errors.ConfirmPassword}
          required
        />

        <div>
          <label htmlFor="terms" className="inline-flex items-center gap-2 text-sm text-neutral-700">
            <input
              id="terms"
              type="checkbox"
              className="h-4 w-4 text-brand-primary focus:ring-brand-primary border-neutral-300 rounded"
              checked={termsAccepted}
              onChange={(e) => {
                setTermsAccepted(e.target.checked);
                clearErrorsFor('TermsAccepted');
              }}
            />
            <span>
              Acepto los <span className="text-brand-primary">términos y condiciones</span>
            </span>
          </label>
          {errors.TermsAccepted && <p className="text-xs text-red-500 mt-1">{errors.TermsAccepted}</p>}
        </div>

        {errors.Form && (
          <div className="bg-red-50 text-red-500 p-3 rounded-lg text-sm border border-red-100">{errors.Form}</div>
        )}

        <Button type="submit" disabled={loading}>
          {loading ? 'Creando cuenta...' : 'Crear cuenta'}
        </Button>
      </form>

      <SocialLogins mode="register" />

      <div className="text-center text-sm text-neutral-500">
        <span>¿Ya tienes cuenta? </span>
        <Link href="/login" className="font-medium text-brand-primary hover:text-opacity-80">
          Inicia sesión
        </Link>
      </div>
    </div>
  );
};

export default RegisterForm;
