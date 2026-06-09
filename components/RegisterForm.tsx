'use client';

import React, { useMemo, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Input } from './ui/Input';
import { Button } from './ui/Button';
import SocialLogins from './SocialLogins';
import {
  validateEmail,
  validatePassword,
  validatePasswordsMatch,
  validateRequired,
} from '../lib/utils/Validation';

interface RegistrationFormState {
  FullName: string;
  Email: string;
  Password: string;
  ConfirmPassword: string;
  AcceptedTerms: boolean;
}

type RegistrationErrors = Partial<Record<keyof RegistrationFormState | 'form', string>>;

const initialForm: RegistrationFormState = {
  FullName: '',
  Email: '',
  Password: '',
  ConfirmPassword: '',
  AcceptedTerms: false,
};

const RegisterForm: React.FC = () => {
  const router = useRouter();
  const [form, setForm] = useState<RegistrationFormState>(initialForm);
  const [touched, setTouched] = useState<Partial<Record<keyof RegistrationFormState, boolean>>>({});
  const [errors, setErrors] = useState<RegistrationErrors>({});
  const [loading, setLoading] = useState(false);

  const validateForm = (nextForm: RegistrationFormState): RegistrationErrors => {
    const nextErrors: RegistrationErrors = {};

    if (!validateRequired(nextForm.FullName)) {
      nextErrors.FullName = 'El nombre completo es obligatorio';
    }

    if (!validateRequired(nextForm.Email)) {
      nextErrors.Email = 'El correo electrónico es obligatorio';
    } else if (!validateEmail(nextForm.Email)) {
      nextErrors.Email = 'Por favor, ingresa un correo electrónico válido';
    }

    if (!validateRequired(nextForm.Password)) {
      nextErrors.Password = 'La contraseña es obligatoria';
    } else if (!validatePassword(nextForm.Password)) {
      nextErrors.Password = 'La contraseña debe tener al menos 8 caracteres';
    }

    if (!validateRequired(nextForm.ConfirmPassword)) {
      nextErrors.ConfirmPassword = 'Confirma tu contraseña';
    } else if (!validatePasswordsMatch(nextForm.Password, nextForm.ConfirmPassword)) {
      nextErrors.ConfirmPassword = 'Las contraseñas no coinciden';
    }

    if (!nextForm.AcceptedTerms) {
      nextErrors.AcceptedTerms = 'Debes aceptar los términos y condiciones';
    }

    return nextErrors;
  };

  const visibleErrors = useMemo(() => {
    const validationErrors = validateForm(form);
    return Object.keys(validationErrors).reduce<RegistrationErrors>((acc, key) => {
      const field = key as keyof RegistrationFormState;
      if (touched[field]) {
        acc[field] = validationErrors[field];
      }
      return acc;
    }, { form: errors.form });
  }, [form, touched, errors.form]);

  const updateField = <K extends keyof RegistrationFormState>(field: K, value: RegistrationFormState[K]) => {
    setForm((current) => ({ ...current, [field]: value }));
    setErrors((current) => ({ ...current, form: undefined }));
  };

  const markTouched = (field: keyof RegistrationFormState) => {
    setTouched((current) => ({ ...current, [field]: true }));
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const allTouched = Object.keys(form).reduce<Partial<Record<keyof RegistrationFormState, boolean>>>(
      (acc, key) => ({ ...acc, [key]: true }),
      {}
    );
    setTouched(allTouched);

    const validationErrors = validateForm(form);
    setErrors(validationErrors);

    if (Object.keys(validationErrors).length > 0) {
      return;
    }

    setLoading(true);

    try {
      const response = await fetch('/api/auth/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          FullName: form.FullName.trim(),
          Email: form.Email.trim(),
          Password: form.Password,
          AcceptedTerms: form.AcceptedTerms,
        }),
      });

      const data = await response.json().catch(() => ({}));

      if (response.ok) {
        setTimeout(() => {
          router.push('/login?success=registration');
        }, 1000);
        return;
      }

      if (response.status === 409) {
        setErrors({ form: 'Este correo ya está registrado' });
        return;
      }

      setErrors({ form: data.error || 'Ocurrió un error inesperado. Por favor, intenta de nuevo.' });
    } catch {
      setErrors({ form: 'Ocurrió un error inesperado. Por favor, intenta de nuevo.' });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full max-w-md space-y-6">
      <div className="text-center lg:text-left">
        <h1 className="text-3xl font-bold text-neutral-900">Crear cuenta</h1>
        <p className="mt-2 text-neutral-500">Regístrate en KynWallet para comenzar</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-5" noValidate>
        <Input
          id="fullName"
          label="Nombre completo"
          type="text"
          placeholder="Ej. Diego Martínez"
          value={form.FullName}
          onChange={(event) => updateField('FullName', event.target.value)}
          onBlur={() => markTouched('FullName')}
          error={visibleErrors.FullName}
          autoComplete="name"
          required
        />

        <Input
          id="email"
          label="Correo electrónico"
          type="email"
          placeholder="ejemplo@correo.com"
          value={form.Email}
          onChange={(event) => updateField('Email', event.target.value)}
          onBlur={() => markTouched('Email')}
          error={visibleErrors.Email}
          autoComplete="email"
          required
        />

        <Input
          id="password"
          label="Contraseña"
          type="password"
          placeholder="Mínimo 8 caracteres"
          value={form.Password}
          onChange={(event) => updateField('Password', event.target.value)}
          onBlur={() => markTouched('Password')}
          error={visibleErrors.Password}
          autoComplete="new-password"
          required
        />

        <Input
          id="confirmPassword"
          label="Confirmar contraseña"
          type="password"
          placeholder="Repite tu contraseña"
          value={form.ConfirmPassword}
          onChange={(event) => updateField('ConfirmPassword', event.target.value)}
          onBlur={() => markTouched('ConfirmPassword')}
          error={visibleErrors.ConfirmPassword}
          autoComplete="new-password"
          required
        />

        <div className="space-y-1">
          <label className="flex items-start gap-3 text-sm text-neutral-900" htmlFor="acceptedTerms">
            <input
              id="acceptedTerms"
              type="checkbox"
              className="mt-1 h-4 w-4 rounded border-neutral-300 text-brand-primary focus:ring-brand-primary"
              checked={form.AcceptedTerms}
              onChange={(event) => updateField('AcceptedTerms', event.target.checked)}
              onBlur={() => markTouched('AcceptedTerms')}
            />
            <span>Acepto los términos y condiciones de KynWallet</span>
          </label>
          {visibleErrors.AcceptedTerms && (
            <p className="text-xs text-red-500">{visibleErrors.AcceptedTerms}</p>
          )}
        </div>

        {errors.form && (
          <div className="rounded-lg border border-red-100 bg-red-50 p-3 text-sm text-red-500">
            {errors.form}
          </div>
        )}

        <Button type="submit" disabled={loading}>
          {loading ? 'Creando cuenta...' : 'Crear cuenta'}
        </Button>
      </form>

      <div>
        <div className="relative">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-neutral-300" />
          </div>
          <div className="relative flex justify-center text-sm">
            <span className="bg-white px-2 text-neutral-500">o continúa con</span>
          </div>
        </div>

        <div className="mt-6">
          <SocialLogins />
        </div>
      </div>

      <p className="text-center text-sm text-neutral-500">
        ¿Ya tienes cuenta?{' '}
        <Link href="/login" className="font-semibold text-brand-primary hover:underline">
          Inicia sesión
        </Link>
      </p>
    </div>
  );
};

export default RegisterForm;
