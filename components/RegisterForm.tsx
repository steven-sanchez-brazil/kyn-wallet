'use client';

import React, { useMemo, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from './ui/Button';
import { Input } from './ui/Input';
import SocialLogins from './SocialLogins';
import { AuthMessages } from '../lib/constants/AuthMessages';
import { RegisterService } from '../lib/services/RegisterService';
import { RegisterRequest } from '../lib/types/Auth';
import {
  validateEmail,
  validateFullName,
  validatePassword,
  validatePasswordConfirmation,
} from '../lib/utils/Validation';

const RegisterForm: React.FC = () => {
  const router = useRouter();
  const [NombreCompleto, setNombreCompleto] = useState('');
  const [CorreoElectronico, setCorreoElectronico] = useState('');
  const [Contrasena, setContrasena] = useState('');
  const [ConfirmarContrasena, setConfirmarContrasena] = useState('');
  const [AceptaTerminos, setAceptaTerminos] = useState(false);
  const [Errores, setErrores] = useState<Record<string, string>>({});
  const [BannerError, setBannerError] = useState<string | null>(null);
  const [IsSubmitting, setIsSubmitting] = useState(false);

  const canSubmit = useMemo(() => {
    return !IsSubmitting;
  }, [IsSubmitting]);

  const runInlineValidation = () => {
    const nextErrors: Record<string, string> = {};

    if (!validateFullName(NombreCompleto)) {
      nextErrors.NombreCompleto = 'Ingresa nombre y apellido válidos';
    }

    if (!validateEmail(CorreoElectronico)) {
      nextErrors.CorreoElectronico = 'Formato de correo inválido';
    }

    if (!validatePassword(Contrasena)) {
      nextErrors.Contrasena = 'La contraseña debe tener al menos 8 caracteres';
    }

    if (!validatePasswordConfirmation(Contrasena, ConfirmarContrasena)) {
      nextErrors.ConfirmarContrasena = 'Las contraseñas no coinciden';
    }

    if (!AceptaTerminos) {
      nextErrors.AceptaTerminos = 'Debes aceptar términos y condiciones';
    }

    setErrores(nextErrors);
    return Object.keys(nextErrors).length === 0;
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setBannerError(null);

    if (!runInlineValidation()) {
      return;
    }

    setIsSubmitting(true);

    const payload: RegisterRequest = {
      NombreCompleto,
      CorreoElectronico,
      Contrasena,
      ConfirmarContrasena,
      AceptaTerminos,
    };

    const result = await RegisterService.register(payload);

    if (!result.Exitoso) {
      if (result.TipoError === 'CorreoExistente') {
        setErrores((prev) => ({
          ...prev,
          CorreoElectronico: result.Errores?.CorreoElectronico || AuthMessages.DuplicateEmail,
        }));
      } else if (result.TipoError === 'TecnicoTransitorio') {
        setBannerError(result.Mensaje);
      } else if (result.Errores) {
        setErrores(result.Errores);
      }
      setIsSubmitting(false);
      return;
    }

    router.push('/login?registered=1');
  };

  return (
    <div className="w-full max-w-md space-y-8">
      <div className="text-center lg:text-left">
        <h2 className="text-3xl font-bold text-neutral-900">Crear cuenta</h2>
        <p className="mt-2 text-neutral-500">Completa los datos para comenzar en KynWallet</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4" noValidate>
        <Input
          id="nombreCompleto"
          label="Nombre completo"
          value={NombreCompleto}
          onChange={(e) => setNombreCompleto(e.target.value)}
          error={Errores.NombreCompleto}
          placeholder="Juan Perez"
          required
        />

        <Input
          id="correoElectronico"
          label="Correo electrónico"
          type="email"
          value={CorreoElectronico}
          onChange={(e) => setCorreoElectronico(e.target.value)}
          error={Errores.CorreoElectronico}
          placeholder="ejemplo@correo.com"
          required
        />

        <Input
          id="contrasena"
          label="Contraseña"
          type="password"
          value={Contrasena}
          onChange={(e) => setContrasena(e.target.value)}
          error={Errores.Contrasena}
          placeholder="••••••••"
          required
        />

        <Input
          id="confirmarContrasena"
          label="Confirmar contraseña"
          type="password"
          value={ConfirmarContrasena}
          onChange={(e) => setConfirmarContrasena(e.target.value)}
          error={Errores.ConfirmarContrasena}
          placeholder="••••••••"
          required
        />

        <div>
          <label className="flex items-start gap-2 text-sm text-neutral-900" htmlFor="aceptaTerminos">
            <input
              id="aceptaTerminos"
              type="checkbox"
              checked={AceptaTerminos}
              onChange={(e) => setAceptaTerminos(e.target.checked)}
              className="mt-1 h-4 w-4 rounded border-neutral-300"
            />
            <span>Acepto términos y condiciones</span>
          </label>
          {Errores.AceptaTerminos && <p className="text-xs text-red-500 mt-1">{Errores.AceptaTerminos}</p>}
        </div>

        {BannerError && (
          <div className="bg-red-50 text-red-500 p-3 rounded-lg text-sm border border-red-100">
            {BannerError}
          </div>
        )}

        <Button type="submit" disabled={!canSubmit}>
          {IsSubmitting ? 'Creando cuenta...' : 'Crear cuenta'}
        </Button>

        <p className="text-sm text-neutral-500 text-center">
          ¿Ya tienes cuenta?{' '}
          <button
            type="button"
            className="text-brand-primary font-semibold"
            onClick={() => router.push('/login')}
          >
            Inicia sesión
          </button>
        </p>
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

        <div className="mt-6">
          <SocialLogins />
        </div>
      </div>
    </div>
  );
};

export default RegisterForm;
