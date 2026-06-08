"use client";

import { useMemo, useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { LOGIN_PATH } from '@/lib/routes';
import { DEMO_USERS, getDemoEmails } from '@/lib/auth/demoUsers';
import {
  buildAuthSession,
  persistAuthSession,
  type RegistrationValues,
  type ValidationErrors
} from '@/lib/auth/session';
import { validateRegistrationForm } from '@/lib/auth/validation';

const initialValues: RegistrationValues = {
  fullName: '',
  email: '',
  password: '',
  confirmPassword: '',
  acceptTerms: false
};

export function RegistrationForm() {
  const router = useRouter();
  const [values, setValues] = useState<RegistrationValues>(initialValues);
  const [errors, setErrors] = useState<ValidationErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [touched, setTouched] = useState<Record<string, boolean>>({});

  const demoEmails = useMemo(() => getDemoEmails(DEMO_USERS), []);
  const [isFormValid, setIsFormValid] = useState(false);

  const fieldClassName =
    'mt-2 h-[52px] w-full rounded-[12px] border bg-white px-4 text-[15px] text-[#16182c] outline-none transition placeholder:text-[#a9abc2] focus:border-[#ef5226]';

  function updateValue<K extends keyof RegistrationValues>(key: K, value: RegistrationValues[K]) {
    setValues((current) => ({ ...current, [key]: value }));
  }

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const result = validateRegistrationForm(values, demoEmails);
    setErrors(result.errors);

    if (!result.isValid) {
      // expose all errors after a submit attempt
      setTouched({
        fullName: true,
        email: true,
        password: true,
        confirmPassword: true,
        acceptTerms: true
      });
      return;
    }

    setIsSubmitting(true);

    const session = buildAuthSession({
      fullName: result.normalized.fullName,
      email: result.normalized.email
    });

    persistAuthSession(session);
    router.push(LOGIN_PATH);
  }

  useEffect(() => {
    const result = validateRegistrationForm(values, demoEmails);
    setIsFormValid(result.isValid);
    // keep inline errors in sync for accessibility while typing
    // replace errors so resolved fields stop showing error messages
    setErrors(result.errors);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [values.fullName, values.email, values.password, values.confirmPassword, values.acceptTerms]);

  return (
    <form className="space-y-5" onSubmit={handleSubmit} noValidate>
      <Field
        error={errors.fullName}
        id="fullName"
        label="Nombre completo"
        onChange={(value) => updateValue('fullName', value)}
        onBlur={() => setTouched((c) => ({ ...c, fullName: true }))}
        placeholder="Ej: Diego Martínez"
        value={values.fullName}
        showError={Boolean(touched.fullName)}
      />

      <Field
        error={errors.email}
        id="email"
        label="Correo electrónico"
        onChange={(value) => updateValue('email', value)}
        onBlur={() => setTouched((c) => ({ ...c, email: true }))}
        placeholder="tucorreo@ejemplo.com"
        type="email"
        value={values.email}
        showError={Boolean(touched.email)}
      />

      <PasswordField
        error={errors.password}
        id="password"
        label="Contraseña"
        onChange={(value) => updateValue('password', value)}
        onBlur={() => setTouched((c) => ({ ...c, password: true }))}
        placeholder="••••••••"
        showValue={showPassword}
        toggleShow={() => setShowPassword((current) => !current)}
        value={values.password}
        showError={Boolean(touched.password)}
      />

      <ConfirmPasswordField
        error={errors.confirmPassword}
        id="confirmPassword"
        label="Confirmar contraseña"
        onChange={(value) => updateValue('confirmPassword', value)}
        onBlur={() => setTouched((c) => ({ ...c, confirmPassword: true }))}
        placeholder="••••••••"
        showValue={showConfirmPassword}
        toggleShow={() => setShowConfirmPassword((current) => !current)}
        value={values.confirmPassword}
        showError={Boolean(touched.confirmPassword)}
      />

      <div>
        <label className="flex items-start gap-3 text-sm text-[#3d3f5c]" htmlFor="acceptTerms">
          <input
            checked={values.acceptTerms}
            className="mt-1 h-5 w-5 rounded-[6px] border-[#d7d9e6] text-[#ef5226] focus:ring-[#ef5226]"
            id="acceptTerms"
            onChange={(event) => updateValue('acceptTerms', event.target.checked)}
            onBlur={() => setTouched((c) => ({ ...c, acceptTerms: true }))}
            type="checkbox"
          />
          <span>
            Acepto los{' '}
            <span className="font-semibold text-[#ef5226]">términos y condiciones</span>
          </span>
        </label>
        {errors.acceptTerms && touched.acceptTerms ? (
          <p className="mt-2 text-sm text-red-600">{errors.acceptTerms}</p>
        ) : null}
      </div>

      {errors.form ? <p className="rounded-2xl bg-red-50 px-4 py-3 text-sm text-red-700">{errors.form}</p> : null}

      <button
        className="flex h-[52px] w-full items-center justify-center rounded-[12px] bg-[#ff6b3d] text-[16px] font-semibold text-white transition hover:bg-[#ef5226] disabled:cursor-not-allowed disabled:opacity-80"
        disabled={isSubmitting || !isFormValid}
        type="submit"
      >
        {isSubmitting ? 'Creando cuenta…' : 'Crear cuenta'}
      </button>

      <div className="pt-1 text-center text-sm text-[#8a8ba8]">
        ¿Ya tienes cuenta?{' '}
        <a className="font-semibold text-[#ef5226] hover:underline" href={LOGIN_PATH}>
          Iniciar sesión
        </a>
      </div>
    </form>
  );
}

type FieldProps = {
  id: string;
  label: string;
  placeholder: string;
  value: string;
  onChange: (value: string) => void;
  type?: 'text' | 'email';
  error?: string;
  onBlur?: () => void;
  showError?: boolean;
};

function Field({ id, label, placeholder, value, onChange, type = 'text', error, onBlur, showError }: FieldProps) {
  return (
    <div>
      <label className="text-[14px] font-medium text-[#3d3f5c]" htmlFor={id}>
        {label}
      </label>
      <input
        aria-invalid={Boolean(error)}
        aria-describedby={error ? `${id}-error` : undefined}
        className="mt-2 h-[52px] w-full rounded-[12px] border border-[#d7d9e6] bg-white px-4 text-[15px] text-[#16182c] outline-none transition placeholder:text-[#a9abc2] focus:border-[#ef5226]"
        id={id}
        onChange={(event) => onChange(event.target.value)}
        onBlur={onBlur}
        placeholder={placeholder}
        type={type}
        value={value}
      />
      {error && showError ? (
        <p className="mt-2 text-sm text-red-600" id={`${id}-error`}>
          {error}
        </p>
      ) : null}
    </div>
  );
}

type PasswordFieldProps = FieldProps & {
  showValue: boolean;
  toggleShow: () => void;
};

function PasswordField({ showValue, toggleShow, ...props }: PasswordFieldProps) {
  return (
    <div>
      <label className="text-[14px] font-medium text-[#3d3f5c]" htmlFor={props.id}>
        {props.label}
      </label>
      <div className="relative mt-2">
        <input
          aria-invalid={Boolean(props.error)}
          aria-describedby={props.error ? `${props.id}-error` : undefined}
          className="h-[52px] w-full rounded-[12px] border border-[#d7d9e6] bg-white px-4 pr-14 text-[15px] text-[#16182c] outline-none transition placeholder:text-[#a9abc2] focus:border-[#ef5226]"
          id={props.id}
          onChange={(event) => props.onChange(event.target.value)}
          onBlur={props.onBlur}
          placeholder={props.placeholder}
          type={showValue ? 'text' : 'password'}
          value={props.value}
        />
        <button
          aria-label={showValue ? 'Ocultar contraseña' : 'Mostrar contraseña'}
          className="absolute right-3 top-1/2 flex h-8 w-8 -translate-y-1/2 items-center justify-center rounded-full text-[#8a8ba8] transition hover:bg-[#f6f7fb]"
          onClick={toggleShow}
          type="button"
        >
          👁
        </button>
      </div>
      {props.error && props.showError ? (
        <p className="mt-2 text-sm text-red-600" id={`${props.id}-error`}>
          {props.error}
        </p>
      ) : null}
    </div>
  );
}

type ConfirmPasswordFieldProps = Omit<FieldProps, 'type'> & {
  showValue: boolean;
  toggleShow: () => void;
};

function ConfirmPasswordField({ showValue, toggleShow, ...props }: ConfirmPasswordFieldProps) {
  return (
    <div>
      <label className="text-[14px] font-medium text-[#3d3f5c]" htmlFor={props.id}>
        {props.label}
      </label>
      <div className="relative mt-2">
        <input
          aria-invalid={Boolean(props.error)}
          aria-describedby={props.error ? `${props.id}-error` : undefined}
          className="h-[52px] w-full rounded-[12px] border border-[#d7d9e6] bg-white px-4 pr-14 text-[15px] text-[#16182c] outline-none transition placeholder:text-[#a9abc2] focus:border-[#ef5226]"
          id={props.id}
          onChange={(event) => props.onChange(event.target.value)}
          onBlur={props.onBlur}
          placeholder={props.placeholder}
          type={showValue ? 'text' : 'password'}
          value={props.value}
        />
        <button
          aria-label={showValue ? 'Ocultar contraseña' : 'Mostrar contraseña'}
          className="absolute right-3 top-1/2 flex h-8 w-8 -translate-y-1/2 items-center justify-center rounded-full text-[#8a8ba8] transition hover:bg-[#f6f7fb]"
          onClick={toggleShow}
          type="button"
        >
          👁
        </button>
      </div>
      {props.error && props.showError ? (
        <p className="mt-2 text-sm text-red-600" id={`${props.id}-error`}>
          {props.error}
        </p>
      ) : null}
    </div>
  );
}
