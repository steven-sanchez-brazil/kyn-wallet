'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Input } from './ui/Input';

import { Button } from './ui/Button';
import SocialLogins from './SocialLogins';
import { AuthService } from '../lib/services/AuthService';
import { validateRegistro } from '../lib/utils/Validation';
import { UsuarioRegistro } from '../lib/types/Auth';

const RegisterForm: React.FC = () => {
  const router = useRouter();
  const [formData, setFormData] = useState<UsuarioRegistro>({
    NombreCompleto: '',
    CorreoElectronico: '',
    Contrasena: '',
    ConfirmarContrasena: '',
    AceptoTerminos: false,
  });

  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [authError, setAuthError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [touched, setTouched] = useState<{ [key: string]: boolean }>({});

  // Real-time validation
  useEffect(() => {
    const result = validateRegistro(formData);
    const newErrors: { [key: string]: string } = {};
    
    // Only show real-time errors for touched fields
    Object.entries(result.Errors).forEach(([key, value]) => {
      if (value && touched[key]) {
        newErrors[key] = value;
      }
    });
    
    setErrors(newErrors);
  }, [formData, touched]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [id]: type === 'checkbox' ? checked : value
    }));
    
    // Mark field as touched when user changes it
    setTouched(prev => ({ ...prev, [id]: true }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setAuthError(null);
    setSuccessMessage(null);

    // Mark all fields as touched to show all errors
    const allTouched = Object.keys(formData).reduce((acc, key) => ({ ...acc, [key]: true }), {});
    setTouched(allTouched);

    const result = validateRegistro(formData);
    if (!result.IsValid) {
      return;
    }

    setLoading(true);

    try {
      const success = await AuthService.register(formData);

      if (success) {
        setSuccessMessage('Usuario registrado con éxito');
        setTimeout(() => {
          router.push('/construction');
        }, 1500);
      }
    } catch (err: any) {
      setAuthError(err.message || 'Ocurrió un error inesperado.');
    } finally {
      setLoading(false);
    }
  };

  const handleLoginLink = () => {
    router.push('/');
  };

  return (
    <div className="w-full max-w-md space-y-8">
      <div className="text-center lg:text-left">
        <h2 className="text-3xl font-bold text-neutral-900">
          Crea tu cuenta
        </h2>
        <p className="mt-2 text-neutral-500">
          Únete a KynWallet y comienza tu camino financiero
        </p>
      </div>

      <form onSubmit={handleSubmit} className="mt-8 space-y-6">
        <div className="space-y-4">
          <Input
            id="NombreCompleto"
            label="Nombre completo"
            type="text"
            placeholder="Juan Pérez"
            value={formData.NombreCompleto}
            onChange={handleChange}
            error={errors.NombreCompleto}
          />
          <Input
            id="CorreoElectronico"
            label="Correo electrónico"
            type="email"
            placeholder="ejemplo@correo.com"
            value={formData.CorreoElectronico}
            onChange={handleChange}
            error={errors.CorreoElectronico}
          />
          <Input
            id="Contrasena"
            label="Contraseña"
            type="password"
            placeholder="••••••••"
            value={formData.Contrasena}
            onChange={handleChange}
            error={errors.Contrasena}
          />
          <p className="text-[10px] text-neutral-500 mt-[-8px]">
            Mínimo 8 caracteres, una mayúscula, un número y un carácter especial
          </p>
          <Input
            id="ConfirmarContrasena"
            label="Confirmar contraseña"
            type="password"
            placeholder="••••••••"
            value={formData.ConfirmarContrasena}
            onChange={handleChange}
            error={errors.ConfirmarContrasena}
          />
        </div>

        <div className="flex items-start">
          <div className="flex items-center h-5">
            <input
              id="AceptoTerminos"
              name="AceptoTerminos"
              type="checkbox"
              className="h-4 w-4 text-brand-primary focus:ring-brand-primary border-neutral-300 rounded"
              checked={formData.AceptoTerminos}
              onChange={handleChange}
            />
          </div>
          <div className="ml-3 text-sm">
            <label htmlFor="AceptoTerminos" className="font-medium text-neutral-900">
              Acepto los términos y condiciones
            </label>
            {errors.AceptoTerminos && (
              <p className="text-red-500 text-xs mt-1">{errors.AceptoTerminos}</p>
            )}
          </div>
        </div>

        {authError && (
          <div className="bg-red-50 text-red-500 p-3 rounded-lg text-sm border border-red-100">
            {authError}
          </div>
        )}

        {successMessage && (
          <div className="bg-green-50 text-green-600 p-3 rounded-lg text-sm border border-green-100">
            {successMessage}
          </div>
        )}

        <Button type="submit" disabled={loading}>
          {loading ? 'Creando cuenta...' : 'Crear cuenta'}
        </Button>

        <div className="text-center text-sm">
          <Link
            href="/login"
            className="font-medium text-brand-primary hover:text-opacity-80"
          >
            ¿Ya tienes cuenta? Inicia sesión
          </Link>
        </div>
      </form>

      <div className="mt-6">
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
    </div>
  );
};

export default RegisterForm;
