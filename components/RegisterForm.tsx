'use client';

import React, { useMemo, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import RegisterSocialLogins from '@/components/RegisterSocialLogins';
import { RegisterService } from '@/lib/services/RegisterService';
import { RegisterFormData } from '@/lib/types/Register';
import {
  getEmptyRegisterErrors,
  hasRegisterErrors,
  validateRegisterData,
} from '@/lib/utils/RegisterValidation';

const initialFormData: RegisterFormData = {
  fullName: '',
  email: '',
  password: '',
  confirmPassword: '',
  acceptTerms: false,
};

const RegisterForm: React.FC = () => {
  const router = useRouter();
  const [formData, setFormData] = useState<RegisterFormData>(initialFormData);
  const [errors, setErrors] = useState(getEmptyRegisterErrors());
  const [loading, setLoading] = useState(false);

  const hasErrors = useMemo(() => hasRegisterErrors(errors), [errors]);

  const handleFieldChange = (
    field: keyof RegisterFormData,
    value: string | boolean
  ) => {
    const nextData = {
      ...formData,
      [field]: value,
    } as RegisterFormData;

    setFormData(nextData);
    setErrors(validateRegisterData(nextData));
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (loading) {
      return;
    }

    const normalizedData: RegisterFormData = {
      ...formData,
      fullName: formData.fullName.trim(),
      email: formData.email.trim(),
    };

    const validationErrors = validateRegisterData(normalizedData);
    setErrors(validationErrors);

    if (hasRegisterErrors(validationErrors)) {
      return;
    }

    setLoading(true);
    try {
      const result = await RegisterService.register(normalizedData);
      const successMessage = encodeURIComponent(result.message);
      router.push(`${result.redirectTo}?registroExitoso=1&mensaje=${successMessage}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full max-w-md space-y-8">
      <div className="text-center lg:text-left">
        <h1 className="text-3xl font-bold text-neutral-900">Crear cuenta</h1>
        <p className="mt-2 text-neutral-500">
          Registra tus datos para empezar a usar KynWallet
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4" noValidate>
        <Input
          id="fullName"
          label="Nombre completo"
          type="text"
          placeholder="Tu nombre y apellido"
          value={formData.fullName}
          onChange={(event) => handleFieldChange('fullName', event.target.value)}
          error={errors.fullName ?? undefined}
          required
        />

        <Input
          id="email"
          label="Correo electronico"
          type="email"
          placeholder="ejemplo@correo.com"
          value={formData.email}
          onChange={(event) => handleFieldChange('email', event.target.value)}
          error={errors.email ?? undefined}
          required
          autoComplete="email"
        />

        <Input
          id="password"
          label="Contrasena"
          type="password"
          placeholder="Minimo 8 caracteres"
          value={formData.password}
          onChange={(event) => handleFieldChange('password', event.target.value)}
          error={errors.password ?? undefined}
          required
          autoComplete="new-password"
        />

        <Input
          id="confirmPassword"
          label="Confirmar contrasena"
          type="password"
          placeholder="Repite tu contrasena"
          value={formData.confirmPassword}
          onChange={(event) =>
            handleFieldChange('confirmPassword', event.target.value)
          }
          error={errors.confirmPassword ?? undefined}
          required
          autoComplete="new-password"
        />

        <div>
          <label
            htmlFor="acceptTerms"
            className="flex items-start gap-2 text-sm text-neutral-700"
          >
            <input
              id="acceptTerms"
              type="checkbox"
              className="mt-1 h-4 w-4 rounded border-neutral-300 text-brand-primary focus:ring-brand-primary"
              checked={formData.acceptTerms}
              onChange={(event) =>
                handleFieldChange('acceptTerms', event.target.checked)
              }
            />
            <span>Acepto los terminos y condiciones</span>
          </label>
          {errors.acceptTerms ? (
            <p className="mt-1 text-xs text-red-500">{errors.acceptTerms}</p>
          ) : null}
        </div>

        <Button type="submit" disabled={loading || hasErrors}>
          {loading ? 'Creando cuenta...' : 'Crear cuenta'}
        </Button>
      </form>

      <div>
        <div className="relative">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-neutral-300" />
          </div>
          <div className="relative flex justify-center text-sm">
            <span className="bg-white px-2 text-neutral-500">o continua con</span>
          </div>
        </div>

        <div className="mt-4">
          <RegisterSocialLogins />
        </div>
      </div>

      <p className="text-center text-sm text-neutral-600">
        ¿Ya tienes cuenta?{' '}
        <Link href="/login" className="font-semibold text-brand-primary">
          Inicia sesion
        </Link>
      </p>
    </div>
  );
};

export default RegisterForm;
