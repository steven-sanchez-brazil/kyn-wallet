'use client';

import React, { useMemo, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Input } from './ui/Input';
import { Button } from './ui/Button';
import { RegisterService } from '../lib/services/RegisterService';
import { RegisterPayload } from '../lib/types/Auth';
import { validateRegisterPayload } from '../lib/utils/Validation';

const initialForm: RegisterPayload = {
  FullName: '',
  Email: '',
  Password: '',
  ConfirmPassword: '',
  AcceptTerms: false,
};

const RegisterForm: React.FC = () => {
  const router = useRouter();
  const [form, setForm] = useState<RegisterPayload>(initialForm);
  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});
  const [generalError, setGeneralError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const canSubmit = useMemo(() => {
    const errors = validateRegisterPayload(form);
    return Object.keys(errors).length === 0 && !isSubmitting;
  }, [form, isSubmitting]);

  const updateField = (field: keyof RegisterPayload, value: string | boolean) => {
    setForm((prev) => ({ ...prev, [field]: value }));
    setGeneralError(null);
    setSuccessMessage(null);

    const next = { ...form, [field]: value };
    setFieldErrors(validateRegisterPayload(next));
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    const errors = validateRegisterPayload(form);
    setFieldErrors(errors);

    if (Object.keys(errors).length > 0) {
      return;
    }

    setIsSubmitting(true);
    setGeneralError(null);
    setSuccessMessage(null);

    try {
      const result = await RegisterService.register(form);

      if (result.Success) {
        setSuccessMessage(result.Message);
        setForm(initialForm);
        setFieldErrors({});
        setTimeout(() => router.push('/'), 700);
      } else {
        setGeneralError(result.Message);
        setFieldErrors(result.FieldErrors ?? {});
      }
    } catch {
      setGeneralError('Ocurrio un error inesperado. Intenta nuevamente.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="w-full max-w-md space-y-7" data-testid="register-form">
      <div className="text-center lg:text-left">
        <h2 className="text-3xl font-bold text-neutral-900">Crea tu cuenta</h2>
        <p className="mt-2 text-neutral-500">Registra tus datos para comenzar a usar KynWallet.</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <Input
          id="fullName"
          label="Nombre completo"
          type="text"
          value={form.FullName}
          onChange={(event) => updateField('FullName', event.target.value)}
          error={fieldErrors.FullName}
          placeholder="Ej. Maria Perez"
          required
        />

        <Input
          id="email"
          label="Correo electronico"
          type="email"
          value={form.Email}
          onChange={(event) => updateField('Email', event.target.value)}
          error={fieldErrors.Email}
          placeholder="correo@ejemplo.com"
          required
        />

        <Input
          id="password"
          label="Contrasena"
          type="password"
          value={form.Password}
          onChange={(event) => updateField('Password', event.target.value)}
          error={fieldErrors.Password}
          placeholder="Minimo 8 caracteres"
          required
        />

        <Input
          id="confirmPassword"
          label="Confirmar contrasena"
          type="password"
          value={form.ConfirmPassword}
          onChange={(event) => updateField('ConfirmPassword', event.target.value)}
          error={fieldErrors.ConfirmPassword}
          placeholder="Repite tu contrasena"
          required
        />

        <div className="space-y-1">
          <label className="flex items-start gap-2 text-sm text-neutral-900" htmlFor="acceptTerms">
            <input
              id="acceptTerms"
              type="checkbox"
              checked={form.AcceptTerms}
              onChange={(event) => updateField('AcceptTerms', event.target.checked)}
              className="mt-1 h-4 w-4 rounded border-neutral-300 text-brand-primary focus:ring-brand-primary"
            />
            Acepto los terminos y condiciones.
          </label>
          {fieldErrors.AcceptTerms ? (
            <p className="text-xs text-red-500">{fieldErrors.AcceptTerms}</p>
          ) : null}
        </div>

        {generalError ? (
          <div className="rounded-lg border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-600" role="alert">
            {generalError}
          </div>
        ) : null}

        {successMessage ? (
          <div className="rounded-lg border border-green-200 bg-green-50 px-3 py-2 text-sm text-green-700" role="status">
            {successMessage}
          </div>
        ) : null}

        <Button type="submit" disabled={!canSubmit}>
          {isSubmitting ? 'Creando cuenta...' : 'Crear cuenta'}
        </Button>
      </form>

      <p className="text-center text-sm text-neutral-500 lg:text-left">
        Ya tienes cuenta?{' '}
        <Link href="/" className="font-semibold text-brand-primary hover:opacity-80">
          Inicia sesion
        </Link>
      </p>
    </div>
  );
};

export default RegisterForm;
