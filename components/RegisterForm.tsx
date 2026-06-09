'use client';

import Link from 'next/link';
import React, { useMemo, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from './ui/Button';
import { Input } from './ui/Input';
import { RegisterService } from '../lib/services/RegisterService';
import { RegistroErrores, RegistroUsuario } from '../lib/types/Register';

type TouchedMap = Record<string, boolean>;

const initialFormData: RegistroUsuario = {
  NombreCompleto: '',
  CorreoElectronico: '',
  Contrasena: '',
  ConfirmacionContrasena: '',
  AceptaTerminos: false,
};

const initialTouched: TouchedMap = {
  NombreCompleto: false,
  CorreoElectronico: false,
  Contrasena: false,
  ConfirmacionContrasena: false,
  AceptaTerminos: false,
};

const RegisterForm: React.FC = () => {
  const router = useRouter();
  const [formData, setFormData] = useState<RegistroUsuario>(initialFormData);
  const [errors, setErrors] = useState<RegistroErrores>({});
  const [touched, setTouched] = useState<TouchedMap>(initialTouched);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [hasSubmitted, setHasSubmitted] = useState(false);
  const [formError, setFormError] = useState<string | null>(null);

  const runValidation = (nextData: RegistroUsuario): RegistroErrores => {
    const validationMap = RegisterService.validar(nextData);
    setErrors(validationMap);
    return validationMap;
  };

  const showFieldError = (field: string): string | undefined => {
    if (!errors[field]) {
      return undefined;
    }

    if (hasSubmitted || touched[field]) {
      return errors[field].Mensaje;
    }

    return undefined;
  };

  const disableSubmit = useMemo(() => {
    const activeErrors = RegisterService.validar(formData);
    return isSubmitting || Object.keys(activeErrors).length > 0;
  }, [formData, isSubmitting]);

  const handleInputChange = (field: keyof RegistroUsuario, value: string) => {
    const nextData = {
      ...formData,
      [field]: value,
    } as RegistroUsuario;

    setFormData(nextData);
    runValidation(nextData);
  };

  const handleBlur = (field: keyof RegistroUsuario) => {
    setTouched((current) => ({
      ...current,
      [field]: true,
    }));
    runValidation(formData);
  };

  const handleTermsChange = (checked: boolean) => {
    const nextData = {
      ...formData,
      AceptaTerminos: checked,
    };

    setFormData(nextData);
    setTouched((current) => ({
      ...current,
      AceptaTerminos: true,
    }));
    runValidation(nextData);
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setHasSubmitted(true);
    setTouched({
      NombreCompleto: true,
      CorreoElectronico: true,
      Contrasena: true,
      ConfirmacionContrasena: true,
      AceptaTerminos: true,
    });
    setFormError(null);

    const validationMap = runValidation(formData);
    if (Object.keys(validationMap).length > 0) {
      return;
    }

    setIsSubmitting(true);
    try {
      const result = await RegisterService.registrar(formData);

      if (!result.Exitoso) {
        setFormError(result.Mensaje);
        return;
      }

      router.push('/login?registered=1');
    } catch {
      setFormError('Ocurrió un error inesperado. Intenta nuevamente.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleComingSoon = () => {
    alert('Próximamente');
  };

  return (
    <div className="w-full max-w-[420px] space-y-8">
      <div className="text-center lg:text-left">
        <h1 className="text-4xl font-bold text-neutral-900">Crea tu cuenta</h1>
        <p className="mt-2 text-neutral-500">Completa tus datos para comenzar</p>
      </div>

      <form className="space-y-4" onSubmit={handleSubmit} noValidate>
        <Input
          id="full-name"
          label="Nombre completo"
          placeholder="Ej: Diego Martinez"
          value={formData.NombreCompleto}
          onChange={(event) => handleInputChange('NombreCompleto', event.target.value)}
          onBlur={() => handleBlur('NombreCompleto')}
          error={showFieldError('NombreCompleto')}
          required
        />

        <Input
          id="register-email"
          label="Correo electrónico"
          type="email"
          placeholder="tucorreo@ejemplo.com"
          value={formData.CorreoElectronico}
          onChange={(event) => handleInputChange('CorreoElectronico', event.target.value)}
          onBlur={() => handleBlur('CorreoElectronico')}
          error={showFieldError('CorreoElectronico')}
          required
        />

        <Input
          id="register-password"
          label="Contraseña"
          type="password"
          placeholder="••••••••"
          value={formData.Contrasena}
          onChange={(event) => handleInputChange('Contrasena', event.target.value)}
          onBlur={() => handleBlur('Contrasena')}
          error={showFieldError('Contrasena')}
          required
        />

        <Input
          id="register-password-confirmation"
          label="Confirmar contraseña"
          type="password"
          placeholder="••••••••"
          value={formData.ConfirmacionContrasena}
          onChange={(event) => handleInputChange('ConfirmacionContrasena', event.target.value)}
          onBlur={() => handleBlur('ConfirmacionContrasena')}
          error={showFieldError('ConfirmacionContrasena')}
          required
        />

        <div className="space-y-1">
          <label htmlFor="accept-terms" className="flex items-center gap-2 text-sm text-neutral-900">
            <input
              id="accept-terms"
              type="checkbox"
              className="h-4 w-4 border-neutral-300 rounded"
              checked={formData.AceptaTerminos}
              onChange={(event) => handleTermsChange(event.target.checked)}
              onBlur={() => handleBlur('AceptaTerminos')}
            />
            <span>
              Acepto los <span className="text-brand-primary font-semibold">términos y condiciones</span>
            </span>
          </label>

          {showFieldError('AceptaTerminos') && (
            <p className="text-xs text-red-500">{showFieldError('AceptaTerminos')}</p>
          )}
        </div>

        {formError && (
          <p className="text-sm text-red-600 bg-red-50 border border-red-100 rounded-lg p-3">{formError}</p>
        )}

        <Button type="submit" disabled={disableSubmit}>
          {isSubmitting ? 'Creando cuenta...' : 'Crear cuenta'}
        </Button>
      </form>

      <div className="space-y-4">
        <div className="relative">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-neutral-300"></div>
          </div>
          <div className="relative flex justify-center text-sm">
            <span className="px-2 bg-[#f7f8fc] text-neutral-500">o regístrate con</span>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-3">
          <Button variant="secondary" onClick={handleComingSoon}>
            Google
          </Button>
          <Button variant="secondary" onClick={handleComingSoon}>
            Apple
          </Button>
        </div>

        <p className="text-sm text-center text-neutral-500">
          ¿Ya tienes cuenta?{' '}
          <Link href="/login" className="text-brand-primary font-semibold hover:underline">
            Inicia sesión
          </Link>
        </p>
      </div>
    </div>
  );
};

export default RegisterForm;