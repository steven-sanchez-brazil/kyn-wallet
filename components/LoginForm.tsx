"use client";

import { useMemo, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { CONSTRUCTION_PATH, REGISTER_PATH } from '@/lib/routes';
import { DEMO_USERS } from '@/lib/auth/demoUsers';
import { buildAuthSession, persistAuthSession } from '@/lib/auth/session';

type LoginValues = {
  email: string;
  password: string;
  rememberMe: boolean;
};

type LoginErrors = Partial<Record<'email' | 'password' | 'form', string>>;

const initialValues: LoginValues = {
  email: '',
  password: '',
  rememberMe: true
};

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export function LoginForm() {
  const router = useRouter();
  const [values, setValues] = useState<LoginValues>(initialValues);
  const [errors, setErrors] = useState<LoginErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const normalizedEmail = values.email.trim().toLowerCase();
  const isEmailValid = EMAIL_PATTERN.test(normalizedEmail);
  const isPasswordValid = values.password.length >= 8;
  const isFormValid = isEmailValid && isPasswordValid;

  function updateValue<K extends keyof LoginValues>(key: K, value: LoginValues[K]) {
    setValues((current) => ({ ...current, [key]: value }));
  }

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const nextErrors: LoginErrors = {};

    if (!normalizedEmail) {
      nextErrors.email = 'Ingresa tu correo electrónico.';
    } else if (!isEmailValid) {
      nextErrors.email = 'Ingresa un correo electrónico válido.';
    }

    if (!values.password) {
      nextErrors.password = 'Ingresa tu contraseña.';
    } else if (!isPasswordValid) {
      nextErrors.password = 'La contraseña debe tener al menos 8 caracteres.';
    }

    if (Object.keys(nextErrors).length > 0) {
      setErrors(nextErrors);
      return;
    }

    const user = DEMO_USERS.find(
      (demoUser) => demoUser.email.toLowerCase() === normalizedEmail && demoUser.password === values.password
    );

    if (!user) {
      setErrors({ form: 'Correo o contraseña incorrectos.' });
      return;
    }

    setIsSubmitting(true);

    persistAuthSession(
      buildAuthSession({
        fullName: user.fullName,
        email: user.email
      })
    );

    router.push(CONSTRUCTION_PATH);
  }

  return (
    <form className="space-y-6" onSubmit={handleSubmit} noValidate>
      <div>
        <label className="text-[14px] font-medium text-[#3d3f5c]" htmlFor="email">
          Correo electrónico
        </label>
        <input
          aria-invalid={Boolean(errors.email)}
          aria-describedby={errors.email ? 'email-error' : undefined}
          className="mt-2 h-[52px] w-full rounded-[16px] border border-[#d7d9e6] bg-white px-4 text-[15px] text-[#16182c] outline-none transition placeholder:text-[#a9abc2] focus:border-[#ef5226]"
          id="email"
          onChange={(event) => updateValue('email', event.target.value)}
          placeholder="tucorreo@ejemplo.com"
          type="email"
          value={values.email}
        />
        {errors.email ? (
          <p className="mt-2 text-sm text-red-600" id="email-error">
            {errors.email}
          </p>
        ) : null}
      </div>

      <div>
        <label className="text-[14px] font-medium text-[#3d3f5c]" htmlFor="password">
          Contraseña
        </label>
        <div className="relative mt-2">
          <input
            aria-invalid={Boolean(errors.password)}
            aria-describedby={errors.password ? 'password-error' : undefined}
            className="h-[52px] w-full rounded-[16px] border border-[#d7d9e6] bg-white px-4 pr-14 text-[15px] text-[#16182c] outline-none transition placeholder:text-[#a9abc2] focus:border-[#ef5226]"
            id="password"
            onChange={(event) => updateValue('password', event.target.value)}
            placeholder="••••••••"
            type={showPassword ? 'text' : 'password'}
            value={values.password}
          />
          <button
            aria-label={showPassword ? 'Ocultar contraseña' : 'Mostrar contraseña'}
            className="absolute right-3 top-1/2 flex h-8 w-8 -translate-y-1/2 items-center justify-center rounded-full text-[#8a8ba8] transition hover:bg-[#f6f7fb]"
            onClick={() => setShowPassword((current) => !current)}
            type="button"
          >
            👁
          </button>
        </div>
        {errors.password ? (
          <p className="mt-2 text-sm text-red-600" id="password-error">
            {errors.password}
          </p>
        ) : null}
      </div>

      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <label className="flex items-center gap-3 text-sm text-[#3d3f5c]">
          <input
            checked={values.rememberMe}
            className="h-5 w-5 rounded-[6px] border-[#d7d9e6] text-[#ef5226] focus:ring-[#ef5226]"
            onChange={(event) => updateValue('rememberMe', event.target.checked)}
            type="checkbox"
          />
          Recordarme
        </label>
        <button
          className="text-sm font-semibold text-[#ef5226] transition hover:underline"
          onClick={(event) => {
            event.preventDefault();
            // eslint-disable-next-line no-alert
            alert('Próximamente');
          }}
          type="button"
        >
          ¿Olvidaste tu contraseña?
        </button>
      </div>

      {errors.form ? (
        <p className="rounded-2xl bg-red-50 px-4 py-3 text-sm text-red-700">{errors.form}</p>
      ) : null}

      <button
        className="flex h-[52px] w-full items-center justify-center rounded-[16px] bg-[#ef5226] text-[16px] font-semibold text-white transition hover:bg-[#d9431a] disabled:cursor-not-allowed disabled:opacity-80"
        disabled={isSubmitting || !isFormValid}
        type="submit"
      >
        {isSubmitting ? 'Iniciando sesión…' : 'Iniciar sesión'}
      </button>

      <div className="relative py-4">
        <div className="absolute left-0 right-0 top-1/2 h-px bg-[#d7d9e6]" />
        <div className="relative mx-auto w-fit bg-white px-3 text-[13px] text-[#8a8ba8]">o continúa con</div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <button
          className="flex h-12 items-center justify-center gap-3 rounded-[12px] border border-[#d7d9e6] bg-white text-[15px] font-semibold text-[#16182c] transition hover:bg-[#f6f7fb]"
          onClick={() => alert('Próximamente')}
          type="button"
        >
          <span className="flex h-5 w-5 items-center justify-center rounded-full border border-[#d7d9e6] text-[11px] font-bold text-[#ef5226]">
            G
          </span>
          Google
        </button>

        <button
          className="flex h-12 items-center justify-center gap-3 rounded-[12px] border border-[#d7d9e6] bg-white text-[15px] font-semibold text-[#16182c] transition hover:bg-[#f6f7fb]"
          onClick={() => alert('Próximamente')}
          type="button"
        >
          <span className="flex h-5 w-5 items-center justify-center rounded-full border border-[#d7d9e6] text-[11px] font-bold text-[#16182c]">
            A
          </span>
          Apple
        </button>
      </div>

      <p className="pt-4 text-center text-sm text-[#8a8ba8]">
        ¿No tienes cuenta?{' '}
        <Link className="font-semibold text-[#ef5226] hover:underline" href={REGISTER_PATH}>
          Regístrate
        </Link>
      </p>
    </form>
  );
}
