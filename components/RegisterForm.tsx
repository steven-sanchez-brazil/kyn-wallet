'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Input } from './ui/Input';
import { Button } from './ui/Button';
import { Checkbox } from './ui/Checkbox';
import SocialLogins from './SocialLogins';
import { RegistrationService } from '../lib/services/RegistrationService';
import {
  validateEmail,
  validatePassword,
  validateName,
  validatePasswordMatch,
  validateTrimmed,
} from '../lib/utils/Validation';

const RegisterForm: React.FC = () => {
  const router = useRouter();

  // Form values
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [acceptsTerms, setAcceptsTerms] = useState(false);

  // Validation errors
  const [fullNameError, setFullNameError] = useState<string | null>(null);
  const [emailError, setEmailError] = useState<string | null>(null);
  const [passwordError, setPasswordError] = useState<string | null>(null);
  const [confirmPasswordError, setConfirmPasswordError] = useState<string | null>(null);
  const [termsError, setTermsError] = useState<string | null>(null);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  // Real-time validation: email
  useEffect(() => {
    if (email) {
      if (!validateTrimmed(email)) {
        setEmailError('Hay espacios al inicio o al final. Por favor corrígelo.');
      } else if (!validateEmail(email)) {
        setEmailError('Formato de correo inválido');
      } else {
        setEmailError(null);
      }
    } else {
      setEmailError(null);
    }
  }, [email]);

  // Real-time validation: password
  useEffect(() => {
    if (password) {
      if (!validatePassword(password)) {
        setPasswordError('La contraseña debe tener al menos 8 caracteres');
      } else {
        setPasswordError(null);
      }
    } else {
      setPasswordError(null);
    }
  }, [password]);

  // Real-time validation: confirmPassword
  useEffect(() => {
    if (confirmPassword) {
      if (!validatePasswordMatch(password, confirmPassword)) {
        setConfirmPasswordError('Las contraseñas no coinciden');
      } else {
        setConfirmPasswordError(null);
      }
    } else {
      setConfirmPasswordError(null);
    }
  }, [password, confirmPassword]);

  // onBlur validation for fullName
  const handleFullNameBlur = () => {
    if (!fullName) {
      setFullNameError(null);
      return;
    }
    if (!validateTrimmed(fullName)) {
      setFullNameError('Hay espacios al inicio o al final. Por favor corrígelo.');
    } else if (!validateName(fullName)) {
      setFullNameError('Solo se permiten letras y espacios');
    } else {
      setFullNameError(null);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitError(null);

    // Validate all fields on submit
    let hasErrors = false;

    if (!fullName.trim()) {
      setFullNameError('Este campo es obligatorio');
      hasErrors = true;
    } else if (!validateTrimmed(fullName)) {
      setFullNameError('Hay espacios al inicio o al final. Por favor corrígelo.');
      hasErrors = true;
    } else if (!validateName(fullName)) {
      setFullNameError('Solo se permiten letras y espacios');
      hasErrors = true;
    }

    if (!email.trim()) {
      setEmailError('Este campo es obligatorio');
      hasErrors = true;
    } else if (!validateTrimmed(email)) {
      setEmailError('Hay espacios al inicio o al final. Por favor corrígelo.');
      hasErrors = true;
    } else if (!validateEmail(email)) {
      setEmailError('Formato de correo inválido');
      hasErrors = true;
    }

    if (!password) {
      setPasswordError('Este campo es obligatorio');
      hasErrors = true;
    } else if (!validatePassword(password)) {
      setPasswordError('La contraseña debe tener al menos 8 caracteres');
      hasErrors = true;
    }

    if (!confirmPassword) {
      setConfirmPasswordError('Este campo es obligatorio');
      hasErrors = true;
    } else if (!validatePasswordMatch(password, confirmPassword)) {
      setConfirmPasswordError('Las contraseñas no coinciden');
      hasErrors = true;
    }

    if (!acceptsTerms) {
      setTermsError('Debes aceptar los términos y condiciones');
      hasErrors = true;
    } else {
      setTermsError(null);
    }

    if (hasErrors) return;

    setLoading(true);

    try {
      const success = await RegistrationService.register({
        FullName: fullName,
        Email: email,
        Password: password,
        ConfirmPassword: confirmPassword,
        AcceptsTerms: acceptsTerms,
      });

      if (success) {
        router.push('/login?registered=true');
      } else {
        setSubmitError('Ocurrió un error al crear la cuenta. Intenta de nuevo.');
      }
    } catch {
      setSubmitError('Ocurrió un error al crear la cuenta. Intenta de nuevo.');
    } finally {
      setLoading(false);
    }
  };

  const isSubmitDisabled = loading || !!emailError || !!passwordError || !!confirmPasswordError;

  return (
    <div className="w-full max-w-md space-y-8">
      <div className="text-center lg:text-left">
        <h2 className="text-3xl font-bold text-neutral-900">
          Crea tu cuenta
        </h2>
        <p className="mt-2 text-neutral-500">
          Completa los datos para unirte a KynWallet
        </p>
      </div>

      <form onSubmit={handleSubmit} data-testid="register-form-element" className="mt-8 space-y-6">
        <div className="space-y-4">
          <Input
            id="fullName"
            label="Nombres y Apellidos"
            type="text"
            placeholder="Ana García"
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
            onBlur={handleFullNameBlur}
            error={fullNameError || undefined}
            required
            autoComplete="name"
          />
          <Input
            id="email"
            label="Correo Electrónico"
            type="text"
            placeholder="ejemplo@correo.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            error={emailError || undefined}
            required
            autoComplete="email"
          />
          <Input
            id="password"
            label="Contraseña"
            type="password"
            placeholder="••••••••"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            error={passwordError || undefined}
            required
            autoComplete="new-password"
          />
          <Input
            id="confirmPassword"
            label="Confirmar Contraseña"
            type="password"
            placeholder="••••••••"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            error={confirmPasswordError || undefined}
            required
            autoComplete="new-password"
          />
        </div>

        <Checkbox
          id="acceptsTerms"
          label="Acepto los términos y condiciones"
          checked={acceptsTerms}
          onChange={(e) => {
            setAcceptsTerms(e.target.checked);
            if (e.target.checked) setTermsError(null);
          }}
          error={termsError || undefined}
        />

        {submitError && (
          <div className="bg-red-50 text-red-500 p-3 rounded-lg text-sm border border-red-100">
            {submitError}
          </div>
        )}

        <Button type="submit" disabled={isSubmitDisabled}>
          {loading ? 'Creando cuenta...' : 'Crear Cuenta'}
        </Button>
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

      <p className="text-center text-sm text-neutral-500">
        ¿Ya tienes una cuenta?{' '}
        <a
          href="/login"
          className="font-medium text-brand-primary hover:text-opacity-80"
        >
          Inicia Sesión
        </a>
      </p>
    </div>
  );
};

export default RegisterForm;
