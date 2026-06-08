'use client';

import React, { useMemo, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Input } from './ui/Input';
import { Button } from './ui/Button';
import { RegistrationService } from '../lib/services/RegistrationService';
import {
  validateRegistrationConfirmation,
  validateRegistrationEmail,
  validateRegistrationPassword,
} from '../lib/utils/RegistrationValidation';
import { RegistrationValidationErrors } from '../lib/types/Registration';

const RegistrationForm: React.FC = () => {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [errors, setErrors] = useState<RegistrationValidationErrors>({});
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const hasValidationErrors = useMemo(
    () => Object.values(errors).some(Boolean),
    [errors]
  );

  const validateEmailField = (value: string) => {
    const emailError = validateRegistrationEmail(value);
    setErrors((prev) => ({ ...prev, Email: emailError ?? undefined }));
  };

  const validatePasswordField = (value: string) => {
    const passwordError = validateRegistrationPassword(value);
    const confirmationError = validateRegistrationConfirmation(value, confirmPassword);
    setErrors((prev) => ({
      ...prev,
      Password: passwordError ?? undefined,
      ConfirmPassword: confirmationError ?? undefined,
    }));
  };

  const validateConfirmationField = (value: string) => {
    const confirmationError = validateRegistrationConfirmation(password, value);
    setErrors((prev) => ({ ...prev, ConfirmPassword: confirmationError ?? undefined }));
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setSubmitError(null);

    const emailError = validateRegistrationEmail(email);
    const passwordError = validateRegistrationPassword(password);
    const confirmationError = validateRegistrationConfirmation(password, confirmPassword);

    const newErrors: RegistrationValidationErrors = {
      Email: emailError ?? undefined,
      Password: passwordError ?? undefined,
      ConfirmPassword: confirmationError ?? undefined,
    };

    setErrors(newErrors);

    if (emailError || passwordError || confirmationError) {
      return;
    }

    setLoading(true);

    try {
      const result = await RegistrationService.register({
        Email: email,
        Password: password,
        ConfirmPassword: confirmPassword,
      });

      if (result.Success && result.RedirectTarget) {
        router.push(result.RedirectTarget);
        return;
      }

      setSubmitError(result.Message);
    } catch {
      setSubmitError('Ocurrió un error inesperado durante el registro');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full max-w-md space-y-8">
      <div className="text-center lg:text-left">
        <h2 className="text-3xl font-bold text-neutral-900">Crea tu cuenta</h2>
        <p className="mt-2 text-neutral-500">
          Regístrate para comenzar a usar tu billetera KynWallet
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="space-y-4">
          <Input
            id="registration-email"
            label="Correo electrónico"
            type="email"
            placeholder="ejemplo@correo.com"
            value={email}
            onChange={(event) => {
              const value = event.target.value;
              setEmail(value);
              validateEmailField(value);
            }}
            error={errors.Email}
            required
            autoComplete="email"
          />
          <Input
            id="registration-password"
            label="Contraseña"
            type="password"
            placeholder="••••••••"
            value={password}
            onChange={(event) => {
              const value = event.target.value;
              setPassword(value);
              validatePasswordField(value);
            }}
            error={errors.Password}
            required
            autoComplete="new-password"
          />
          <Input
            id="registration-confirm-password"
            label="Confirmar contraseña"
            type="password"
            placeholder="••••••••"
            value={confirmPassword}
            onChange={(event) => {
              const value = event.target.value;
              setConfirmPassword(value);
              validateConfirmationField(value);
            }}
            error={errors.ConfirmPassword}
            required
            autoComplete="new-password"
          />
        </div>

        {submitError && (
          <div className="rounded-lg border border-red-100 bg-red-50 p-3 text-sm text-red-500">
            {submitError}
          </div>
        )}

        <Button type="submit" disabled={loading || hasValidationErrors}>
          {loading ? 'Creando cuenta...' : 'Crear cuenta'}
        </Button>
      </form>

      <p className="text-center text-sm text-neutral-500">
        ¿Ya tienes una cuenta?{' '}
        <Link href="/" className="font-semibold text-brand-primary hover:opacity-80">
          Inicia sesión
        </Link>
      </p>
    </div>
  );
};

export default RegistrationForm;
