'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Input } from './ui/Input';
import { Button } from './ui/Button';
import { Checkbox } from './ui/Checkbox';
import SocialLogins from './SocialLogins';
import { RegisterService } from '../lib/services/RegisterService';
import {
  validateEmail,
  validatePassword,
  validateFullName,
  validatePasswordMatch,
} from '../lib/utils/Validation';

const RegisterForm: React.FC = () => {
  const router = useRouter();
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [acceptTerms, setAcceptTerms] = useState(false);

  const [fullNameError, setFullNameError] = useState<string | null>(null);
  const [emailError, setEmailError] = useState<string | null>(null);
  const [passwordError, setPasswordError] = useState<string | null>(null);
  const [confirmPasswordError, setConfirmPasswordError] = useState<string | null>(null);
  const [termsError, setTermsError] = useState<string | null>(null);

  const [loading, setLoading] = useState(false);

  const handleBlurFullName = () => {
    if (!validateFullName(fullName)) {
      setFullNameError('El nombre completo es obligatorio');
    } else {
      setFullNameError(null);
    }
  };

  const handleBlurEmail = () => {
    if (!email.trim()) {
      setEmailError('El correo electrónico es obligatorio');
    } else if (!validateEmail(email)) {
      setEmailError('Formato de correo inválido');
    } else {
      setEmailError(null);
    }
  };

  const handleBlurPassword = () => {
    if (!password) {
      setPasswordError('La contraseña es obligatoria');
    } else if (!validatePassword(password)) {
      setPasswordError('La contraseña debe tener al menos 8 caracteres');
    } else {
      setPasswordError(null);
    }
  };

  const handleBlurConfirmPassword = () => {
    if (!confirmPassword) {
      setConfirmPasswordError('Confirmar contraseña es obligatorio');
    } else if (!validatePasswordMatch(password, confirmPassword)) {
      setConfirmPasswordError('Las contraseñas no coinciden');
    } else {
      setConfirmPasswordError(null);
    }
  };

  const validateAll = (): boolean => {
    let valid = true;

    if (!validateFullName(fullName)) {
      setFullNameError('El nombre completo es obligatorio');
      valid = false;
    } else {
      setFullNameError(null);
    }

    if (!email.trim()) {
      setEmailError('El correo electrónico es obligatorio');
      valid = false;
    } else if (!validateEmail(email)) {
      setEmailError('Formato de correo inválido');
      valid = false;
    } else {
      setEmailError(null);
    }

    if (!password) {
      setPasswordError('La contraseña es obligatoria');
      valid = false;
    } else if (!validatePassword(password)) {
      setPasswordError('La contraseña debe tener al menos 8 caracteres');
      valid = false;
    } else {
      setPasswordError(null);
    }

    if (!confirmPassword) {
      setConfirmPasswordError('Confirmar contraseña es obligatorio');
      valid = false;
    } else if (!validatePasswordMatch(password, confirmPassword)) {
      setConfirmPasswordError('Las contraseñas no coinciden');
      valid = false;
    } else {
      setConfirmPasswordError(null);
    }

    if (!acceptTerms) {
      setTermsError('Debes aceptar los términos y condiciones');
      valid = false;
    } else {
      setTermsError(null);
    }

    return valid;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateAll()) return;

    setLoading(true);
    const result = await RegisterService.register({
      FullName: fullName.trim(),
      Email: email.trim(),
      Password: password,
    });

    setLoading(false);

    if (result.Success) {
      router.push('/login?registered=true');
    }
  };

  return (
    <div className="w-full max-w-[400px]">
      <h1 className="text-[30px] font-bold text-[#16182c] mb-2">
        Crea tu cuenta
      </h1>
      <p className="text-[16px] text-[#8a8ba8] mb-8">
        Completa tus datos para comenzar
      </p>

      <form onSubmit={handleSubmit} className="space-y-4">
        <Input
          id="fullName"
          label="Nombre completo"
          placeholder="Ej: Diego Martínez"
          value={fullName}
          onChange={(e) => setFullName(e.target.value)}
          onBlur={handleBlurFullName}
          error={fullNameError || undefined}
        />

        <Input
          id="email"
          label="Correo electrónico"
          type="email"
          placeholder="tucorreo@ejemplo.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          onBlur={handleBlurEmail}
          error={emailError || undefined}
        />

        <Input
          id="password"
          label="Contraseña"
          type="password"
          placeholder="••••••••"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          onBlur={handleBlurPassword}
          error={passwordError || undefined}
          showToggle
        />

        <Input
          id="confirmPassword"
          label="Confirmar contraseña"
          type="password"
          placeholder="••••••••"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          onBlur={handleBlurConfirmPassword}
          error={confirmPasswordError || undefined}
          showToggle
        />

        <Checkbox
          id="acceptTerms"
          label={
            <span>
              Acepto los{' '}
              <button
                type="button"
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  window.alert('Próximamente');
                }}
                className="font-semibold text-[#ef5226] hover:underline"
              >
                términos y condiciones
              </button>
            </span>
          }
          checked={acceptTerms}
          onChange={(e) => {
            setAcceptTerms(e.target.checked);
            if (e.target.checked) setTermsError(null);
          }}
          error={termsError || undefined}
        />

        <Button type="submit" disabled={loading}>
          {loading ? 'Creando cuenta...' : 'Crear cuenta'}
        </Button>
      </form>

      <div className="mt-6">
        <div className="flex items-center gap-3 mb-4">
          <div className="flex-1 h-px bg-neutral-300" />
          <span className="text-[13px] text-[#8a8ba8]">o regístrate con</span>
          <div className="flex-1 h-px bg-neutral-300" />
        </div>

        <SocialLogins />

        <p className="text-center text-[14px] text-[#8a8ba8] mt-6">
          ¿Ya tienes cuenta?{' '}
          <a
            href="/login"
            onClick={(e) => {
              e.preventDefault();
              router.push('/login');
            }}
            className="font-semibold text-[#ef5226] hover:underline"
          >
            Inicia sesión
          </a>
        </p>
      </div>
    </div>
  );
};

export default RegisterForm;
