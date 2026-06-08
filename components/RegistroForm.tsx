'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import TerminosModal from './TerminosModal';
import { Input } from './ui/Input';
import { Button } from './ui/Button';
import { AuthService } from '../lib/services/AuthService';
import { validateEmail, validatePassword, validatePasswordMatch, validateFullName } from '../lib/utils/Validation';

interface Errores {
  nombreCompleto?: string;
  email?: string;
  contrasena?: string;
  confirmarContrasena?: string;
  general?: string;
}

const RegistroForm: React.FC = () => {
  const router = useRouter();
  const [nombreCompleto, setNombreCompleto] = useState('');
  const [email, setEmail] = useState('');
  const [contrasena, setContrasena] = useState('');
  const [confirmarContrasena, setConfirmarContrasena] = useState('');
  const [errores, setErrores] = useState<Errores>({});
  const [cargando, setCargando] = useState(false);
  const [registroExitoso, setRegistroExitoso] = useState(false);
  const [aceptaTerminos, setAceptaTerminos] = useState(false);
  const [terminosAbierto, setTerminosAbierto] = useState(false);

  const validarCampo = (campo: keyof Errores, valor: string, valorExtra?: string): string | undefined => {
    switch (campo) {
      case 'nombreCompleto':
        return !validateFullName(valor) ? 'Ingresá tu nombre y apellido.' : undefined;
      case 'email':
        return !validateEmail(valor) ? 'Ingresá un correo electrónico válido.' : undefined;
      case 'contrasena':
        return !validatePassword(valor) ? 'La contraseña debe tener al menos 8 caracteres.' : undefined;
      case 'confirmarContrasena':
        return !validatePasswordMatch(valorExtra ?? '', valor) ? 'Las contraseñas no coinciden.' : undefined;
      default:
        return undefined;
    }
  };

  const handleBlur = (campo: keyof Errores, valor: string, valorExtra?: string) => {
    if (!valor) return;
    const error = validarCampo(campo, valor, valorExtra);
    setErrores((prev) => ({ ...prev, [campo]: error }));
  };

  const handleChange = (campo: keyof Errores, valor: string, valorExtra?: string) => {
    switch (campo) {
      case 'nombreCompleto': setNombreCompleto(valor); break;
      case 'email': setEmail(valor); break;
      case 'contrasena': setContrasena(valor); break;
      case 'confirmarContrasena': setConfirmarContrasena(valor); break;
    }
    if (errores[campo]) {
      const error = validarCampo(campo, valor, valorExtra);
      setErrores((prev) => ({ ...prev, [campo]: error }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrores({});

    const nuevosErrores: Errores = {
      nombreCompleto: validarCampo('nombreCompleto', nombreCompleto),
      email: validarCampo('email', email),
      contrasena: validarCampo('contrasena', contrasena),
      confirmarContrasena: validarCampo('confirmarContrasena', confirmarContrasena, contrasena),
    };

    const hayErrores = Object.values(nuevosErrores).some(Boolean);
    if (hayErrores) {
      setErrores(nuevosErrores);
      return;
    }

    setCargando(true);
    try {
      const resultado = await AuthService.register({
        NombreCompleto: nombreCompleto,
        Email: email,
        Contrasena: contrasena,
        ConfirmarContrasena: confirmarContrasena,
      });

      if (resultado.Exitoso) {
        setRegistroExitoso(true);
        setTimeout(() => router.push('/'), 3000);
      } else {
        setErrores({ general: resultado.MensajeError });
      }
    } catch {
      setErrores({ general: 'Ocurrió un error inesperado. Intentá de nuevo.' });
    } finally {
      setCargando(false);
    }
  };

  return (
    <div className="w-full max-w-md space-y-8">
      {registroExitoso ? (
        <div className="flex flex-col items-center justify-center space-y-4 py-12">
          <div className="flex items-center justify-center w-16 h-16 rounded-full bg-green-100">
            <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <h2 className="text-2xl font-bold text-neutral-900">¡Cuenta creada!</h2>
          <p className="text-center text-neutral-500">
            Tu cuenta fue creada exitosamente. Serás redirigido al login en unos segundos...
          </p>
        </div>
      ) : (
        <>
          <div className="text-center lg:text-left">
            <h2 className="text-3xl font-bold text-neutral-900">
              Crea tu cuenta
            </h2>
            <p className="mt-2 text-neutral-500">
              Completá tus datos para comenzar
            </p>
          </div>

      <form onSubmit={handleSubmit} className="mt-8 space-y-5">
        <Input
          id="nombreCompleto"
          label="Nombre completo"
          type="text"
          placeholder="Ej: Diego Martínez"
          value={nombreCompleto}
          onChange={(e) => handleChange('nombreCompleto', e.target.value)}
          onBlur={() => handleBlur('nombreCompleto', nombreCompleto)}
          error={errores.nombreCompleto}
          required
          autoComplete="name"
        />
        <Input
          id="email"
          label="Correo electrónico"
          type="email"
          placeholder="ejemplo@correo.com"
          value={email}
          onChange={(e) => handleChange('email', e.target.value)}
          onBlur={() => handleBlur('email', email)}
          error={errores.email}
          required
          autoComplete="email"
        />
        <Input
          id="contrasena"
          label="Contraseña"
          type="password"
          placeholder="••••••••"
          value={contrasena}
          onChange={(e) => handleChange('contrasena', e.target.value)}
          onBlur={() => handleBlur('contrasena', contrasena)}
          error={errores.contrasena}
          required
          autoComplete="new-password"
        />
        <Input
          id="confirmarContrasena"
          label="Confirmar contraseña"
          type="password"
          placeholder="••••••••"
          value={confirmarContrasena}
          onChange={(e) => handleChange('confirmarContrasena', e.target.value, contrasena)}
          onBlur={() => handleBlur('confirmarContrasena', confirmarContrasena, contrasena)}
          error={errores.confirmarContrasena}
          required
          autoComplete="new-password"
        />

        {errores.general && (
          <div className="bg-red-50 text-red-500 p-3 rounded-lg text-sm border border-red-100">
            {errores.general}
          </div>
        )}

        <div className="flex items-center gap-2">
          <input
            id="aceptaTerminos"
            type="checkbox"
            checked={aceptaTerminos}
            onChange={(e) => setAceptaTerminos(e.target.checked)}
            className="w-4 h-4 accent-brand-primary cursor-pointer"
          />
          <label htmlFor="aceptaTerminos" className="text-sm text-neutral-500 select-none">
            Acepto los{' '}
            <button
              type="button"
              onClick={() => setTerminosAbierto(true)}
              className="font-semibold text-brand-primary hover:opacity-80 underline"
            >
              términos y condiciones
            </button>
          </label>
        </div>

        <Button type="submit" disabled={cargando || !aceptaTerminos}>
          {cargando ? 'Creando cuenta...' : 'Crear cuenta'}
        </Button>
      </form>

      {terminosAbierto && <TerminosModal onClose={() => setTerminosAbierto(false)} />}

      <p className="mt-6 text-center text-sm text-neutral-500">
        ¿Ya tenés cuenta?{' '}
        <Link href="/" className="font-semibold text-brand-primary hover:opacity-80">
          Iniciá sesión
        </Link>
      </p>
        </>
      )}
    </div>
  );
};

export default RegistroForm;
