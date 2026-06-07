'use client';

import { FormEvent, useMemo, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { MapApiErrorsToFormErrors, RegistrationService } from '@/lib/services/RegistrationService';
import {
  RegistrationFormData,
  RegistrationValidationErrors,
} from '@/lib/types/Registration';
import {
  NormalizeEmail,
  ValidateEmailFormat,
  ValidatePasswordLength,
  ValidatePasswordMatch,
  ValidateRegistrationData,
  ValidateTermsAccepted,
} from '@/lib/utils/RegistrationValidation';

const InitialFormData: RegistrationFormData = {
  FullName: '',
  Email: '',
  Password: '',
  ConfirmPassword: '',
  AcceptTerms: false,
};

const InitialErrors: RegistrationValidationErrors = {};

const RegistrationForm = () => {
  const Router = useRouter();
  const [FormData, SetFormData] = useState<RegistrationFormData>(InitialFormData);
  const [Errors, SetErrors] = useState<RegistrationValidationErrors>(InitialErrors);
  const [Loading, SetLoading] = useState(false);

  const HasErrors = useMemo(() => Object.keys(Errors).length > 0, [Errors]);

  const ValidateField = (
    field: keyof RegistrationFormData,
    data: RegistrationFormData
  ): RegistrationValidationErrors => {
    const FieldErrors: RegistrationValidationErrors = {};

    if (field === 'FullName') {
      if (!data.FullName.trim()) {
        FieldErrors.FullName = 'El nombre completo es obligatorio';
      }
    }

    if (field === 'Email') {
      const normalizedEmail = NormalizeEmail(data.Email);
      if (!normalizedEmail) {
        FieldErrors.Email = 'El correo electrónico es obligatorio';
      } else if (!ValidateEmailFormat(data.Email)) {
        FieldErrors.Email = 'Correo electrónico inválido';
      }
    }

    if (field === 'Password') {
      if (!data.Password) {
        FieldErrors.Password = 'La contraseña es obligatoria';
      } else if (!ValidatePasswordLength(data.Password)) {
        FieldErrors.Password = 'La contraseña debe tener al menos 8 caracteres';
      }

      if (data.ConfirmPassword && !ValidatePasswordMatch(data.Password, data.ConfirmPassword)) {
        FieldErrors.ConfirmPassword = 'Las contraseñas no coinciden';
      }
    }

    if (field === 'ConfirmPassword') {
      if (!data.ConfirmPassword) {
        FieldErrors.ConfirmPassword = 'Debes confirmar la contraseña';
      } else if (!ValidatePasswordMatch(data.Password, data.ConfirmPassword)) {
        FieldErrors.ConfirmPassword = 'Las contraseñas no coinciden';
      }
    }

    if (field === 'AcceptTerms') {
      if (!ValidateTermsAccepted(data.AcceptTerms)) {
        FieldErrors.AcceptTerms = 'Debes aceptar los términos y condiciones';
      }
    }

    return FieldErrors;
  };

  const UpdateField = (field: keyof RegistrationFormData, value: string | boolean) => {
    const NextData = {
      ...FormData,
      [field]: value,
    } as RegistrationFormData;

    SetFormData(NextData);

    const FieldErrors = ValidateField(field, NextData);

    SetErrors((PreviousErrors) => {
      const NextErrors = { ...PreviousErrors };

      if (field === 'Password') {
        delete NextErrors.Password;
        delete NextErrors.ConfirmPassword;
      } else {
        delete NextErrors[field];
      }

      if (FieldErrors.Password) {
        NextErrors.Password = FieldErrors.Password;
      }
      if (FieldErrors.ConfirmPassword) {
        NextErrors.ConfirmPassword = FieldErrors.ConfirmPassword;
      }
      if (FieldErrors.FullName) {
        NextErrors.FullName = FieldErrors.FullName;
      }
      if (FieldErrors.Email) {
        NextErrors.Email = FieldErrors.Email;
      }
      if (FieldErrors.AcceptTerms) {
        NextErrors.AcceptTerms = FieldErrors.AcceptTerms;
      }

      return NextErrors;
    });
  };

  const HandleSocialClick = () => {
    alert('Próximamente');
  };

  const HandleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const ValidationErrors = ValidateRegistrationData(FormData);
    if (Object.keys(ValidationErrors).length > 0) {
      SetErrors(ValidationErrors);
      return;
    }

    SetLoading(true);

    const Response = await RegistrationService.Register(FormData);

    SetLoading(false);

    if (Response.success) {
      Router.push('/login?registered=true');
      return;
    }

    if (Response.code === 'EMAIL_ALREADY_REGISTERED') {
      SetErrors({ Email: Response.message });
      return;
    }

    if (Response.errors) {
      SetErrors(MapApiErrorsToFormErrors(Response.errors));
      return;
    }

    SetErrors({ General: Response.message });
  };

  return (
    <section className="w-full max-w-[400px]" aria-label="Formulario de registro">
      <h1 className="text-[30px] font-bold text-[#16182C]">Crea tu cuenta</h1>
      <p className="mt-2 text-[16px] text-[#8A8BA8]">Completa tus datos para comenzar</p>

      <form onSubmit={HandleSubmit} className="mt-8 space-y-4">
        <div className="space-y-1">
          <label htmlFor="fullName" className="text-[14px] font-medium text-[#3D3F5C]">
            Nombre completo
          </label>
          <input
            id="fullName"
            type="text"
            value={FormData.FullName}
            onChange={(event) => UpdateField('FullName', event.target.value)}
            placeholder="Ej: Diego Martínez"
            className="h-[52px] w-full rounded-[12px] border-[1.5px] border-[#D7D9E6] px-4 text-[15px] text-[#16182C] placeholder:text-[#A9ABC2] focus:outline-none focus:ring-2 focus:ring-[#FF6B3D]"
          />
          {Errors.FullName && <p className="text-xs text-red-600">{Errors.FullName}</p>}
        </div>

        <div className="space-y-1">
          <label htmlFor="email" className="text-[14px] font-medium text-[#3D3F5C]">
            Correo electrónico
          </label>
          <input
            id="email"
            type="email"
            value={FormData.Email}
            onChange={(event) => UpdateField('Email', event.target.value)}
            placeholder="tucorreo@ejemplo.com"
            className="h-[52px] w-full rounded-[12px] border-[1.5px] border-[#D7D9E6] px-4 text-[15px] text-[#16182C] placeholder:text-[#A9ABC2] focus:outline-none focus:ring-2 focus:ring-[#FF6B3D]"
          />
          {Errors.Email && <p className="text-xs text-red-600">{Errors.Email}</p>}
        </div>

        <div className="space-y-1">
          <label htmlFor="password" className="text-[14px] font-medium text-[#3D3F5C]">
            Contraseña
          </label>
          <input
            id="password"
            type="password"
            value={FormData.Password}
            onChange={(event) => UpdateField('Password', event.target.value)}
            placeholder="••••••••"
            className="h-[52px] w-full rounded-[12px] border-[1.5px] border-[#D7D9E6] px-4 text-[15px] text-[#16182C] placeholder:text-[#A9ABC2] focus:outline-none focus:ring-2 focus:ring-[#FF6B3D]"
          />
          {Errors.Password && <p className="text-xs text-red-600">{Errors.Password}</p>}
        </div>

        <div className="space-y-1">
          <label htmlFor="confirmPassword" className="text-[14px] font-medium text-[#3D3F5C]">
            Confirmar contraseña
          </label>
          <input
            id="confirmPassword"
            type="password"
            value={FormData.ConfirmPassword}
            onChange={(event) => UpdateField('ConfirmPassword', event.target.value)}
            placeholder="••••••••"
            className="h-[52px] w-full rounded-[12px] border-[1.5px] border-[#D7D9E6] px-4 text-[15px] text-[#16182C] placeholder:text-[#A9ABC2] focus:outline-none focus:ring-2 focus:ring-[#FF6B3D]"
          />
          {Errors.ConfirmPassword && <p className="text-xs text-red-600">{Errors.ConfirmPassword}</p>}
        </div>

        <div className="space-y-1">
          <div className="flex items-center gap-3">
            <input
              id="acceptTerms"
              type="checkbox"
              checked={FormData.AcceptTerms}
              onChange={(event) => UpdateField('AcceptTerms', event.target.checked)}
              className="h-5 w-5 rounded-[6px] border-[1.5px] border-[#D7D9E6]"
            />
            <label htmlFor="acceptTerms" className="text-[14px] font-medium text-[#3D3F5C]">
              Acepto los <span className="font-semibold text-[#EF5226]">términos y condiciones</span>
            </label>
          </div>
          {Errors.AcceptTerms && <p className="text-xs text-red-600">{Errors.AcceptTerms}</p>}
        </div>

        {Errors.General && <p className="text-sm text-red-600">{Errors.General}</p>}

        <button
          type="submit"
          disabled={Loading || HasErrors}
          className="h-[52px] w-full rounded-[12px] bg-[#FF6B3D] text-[16px] font-semibold text-white disabled:opacity-60"
        >
          {Loading ? 'Creando cuenta...' : 'Crear cuenta'}
        </button>

        <div className="pt-4">
          <div className="relative mb-4 flex items-center">
            <div className="h-px w-full bg-[#D7D9E6]" />
            <span className="mx-3 whitespace-nowrap bg-white text-[13px] text-[#8A8BA8]">
              o regístrate con
            </span>
            <div className="h-px w-full bg-[#D7D9E6]" />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <button
              type="button"
              onClick={HandleSocialClick}
              className="h-12 rounded-[12px] border-[1.5px] border-[#D7D9E6] text-[15px] font-semibold text-[#16182C]"
            >
              Google
            </button>
            <button
              type="button"
              onClick={HandleSocialClick}
              className="h-12 rounded-[12px] border-[1.5px] border-[#D7D9E6] text-[15px] font-semibold text-[#16182C]"
            >
              Apple
            </button>
          </div>
        </div>
      </form>

      <p className="mt-5 text-center text-[14px] text-[#8A8BA8]">
        ¿Ya tienes cuenta?{' '}
        <Link href="/login" className="font-semibold text-[#EF5226]">
          Inicia sesión
        </Link>
      </p>
    </section>
  );
};

export default RegistrationForm;
