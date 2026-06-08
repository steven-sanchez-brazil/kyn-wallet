'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Input } from './ui/Input';
import { Button } from './ui/Button';
import SocialLogins from './SocialLogins';
import { AuthService } from '../lib/services/AuthService';
import { validateEmail, validatePassword } from '../lib/utils/Validation';

const RegisterForm: React.FC = () => {
  const router = useRouter();
  const [nombre, setNombre] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [termsAccepted, setTermsAccepted] = useState(false);
  
  const [errors, setErrors] = useState<{ [key: string]: string | null }>({});
  const [loading, setLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const newErrors: { [key: string]: string | null } = {};

    if (!nombre) newErrors.nombre = 'El nombre es obligatorio';
    if (!email) {
      newErrors.email = 'El correo es obligatorio';
    } else if (!validateEmail(email)) {
      newErrors.email = 'Formato de correo inválido';
    }
    
    if (!password) {
      newErrors.password = 'La contraseña es obligatoria';
    } else if (!validatePassword(password)) {
      newErrors.password = 'Mínimo 8 caracteres';
    }

    if (password !== confirmPassword) {
      newErrors.confirmPassword = 'Las contraseñas no coinciden';
    }

    if (!termsAccepted) {
      newErrors.terms = 'Debes aceptar los términos';
    }

    setErrors(newErrors);

    if (Object.keys(newErrors).length > 0) return;

    setLoading(true);

    try {
      const success = await AuthService.register({
        Nombre: nombre,
        Email: email,
        Password: password,
      });

      if (success) {
        setSuccessMessage('¡Registro exitoso! Redirigiendo al login...');
        setTimeout(() => {
          router.push('/login');
        }, 2000);
      } else {
        setErrors({ server: 'Error al registrar el usuario. El correo podría ya estar en uso.' });
      }
    } catch (err) {
      setErrors({ server: 'Ocurrió un error inesperado.' });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full max-w-[400px] space-y-[22px]">
      <div className="text-left">
        <h2 className="text-[30px] font-bold text-[#16182c]">
          Crea tu cuenta
        </h2>
        <p className="text-[16px] text-[#8a8ca8]">
          Completa tus datos para comenzar
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-[22px]">
        <div className="space-y-[22px]">
          <Input
            id="nombre"
            label="Nombre completo"
            type="text"
            placeholder="Ej: Diego Martínez"
            value={nombre}
            onChange={(e) => setNombre(e.target.value)}
            error={errors.nombre || undefined}
            required
          />
          <Input
            id="email"
            label="Correo electrónico"
            type="email"
            placeholder="tucorreo@ejemplo.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            error={errors.email || undefined}
            required
          />
          <Input
            id="password"
            label="Contraseña"
            type="password"
            placeholder="••••••••"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            error={errors.password || undefined}
            required
          />
          <Input
            id="confirmPassword"
            label="Confirmar contraseña"
            type="password"
            placeholder="••••••••"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            error={errors.confirmPassword || undefined}
            required
          />
        </div>

        <div className="flex items-center gap-[8px]">
          <input
            id="terms"
            name="terms"
            type="checkbox"
            className="h-[20px] w-[20px] text-[#ff6b3d] focus:ring-[#ff6b3d] border-[#d7d9e6] rounded-[6px]"
            checked={termsAccepted}
            onChange={(e) => setTermsAccepted(e.target.checked)}
          />
          <label htmlFor="terms" className="text-[14px] font-medium text-[#3d3f5c]">
            Acepto los <span className="text-[#ef5226] font-semibold">términos y condiciones</span>
          </label>
        </div>
        {errors.terms && <p className="text-red-500 text-xs mt-1">{errors.terms}</p>}

        {errors.server && (
          <div className="bg-red-50 text-red-500 p-3 rounded-lg text-sm border border-red-100">
            {errors.server}
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
      </form>

      <div className="space-y-[22px]">
        <div className="flex items-center gap-[14px]">
          <div className="flex-1 h-px bg-[#d7d9e6]" />
          <span className="text-[13px] text-[#8a8ca8]">o regístrate con</span>
          <div className="flex-1 h-px bg-[#d7d9e6]" />
        </div>

        <SocialLogins />

        <div className="text-center text-[14px]">
          <span className="text-[#8a8ca8]">¿Ya tienes cuenta? </span>
          <Link href="/login" className="font-semibold text-[#ef5226] hover:underline">
            Inicia sesión
          </Link>
        </div>
      </div>
    </div>
  );
};

export default RegisterForm;
