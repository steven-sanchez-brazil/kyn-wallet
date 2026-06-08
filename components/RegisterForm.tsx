'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Input } from './ui/Input';
import { Button } from './ui/Button';
import { Checkbox } from './ui/Checkbox';
import { AuthService } from '../lib/services/AuthService';
import { UserRegistrationData } from '../lib/types/Auth';
import { validateEmail, validatePassword, validatePasswordsMatch } from '../lib/utils/Validation';

export const RegisterForm: React.FC = () => {
  const router = useRouter();
  const [formData, setFormData] = useState<UserRegistrationData>({
    FullName: '',
    Email: '',
    Password: '',
    ConfirmPassword: '',
    TermsAccepted: false,
  });
  const [errors, setErrors] = useState<Partial<Record<keyof UserRegistrationData, string>>>({});
  const [touched, setTouched] = useState<Partial<Record<keyof UserRegistrationData, boolean>>>({});
  const [isLoading, setIsLoading] = useState(false);
  const [serverError, setServerError] = useState<string | null>(null);
  const [isConfirmationModalOpen, setIsConfirmationModalOpen] = useState(false);

  const validateField = (name: string, value: any) => {
    let error = '';
    switch (name) {
      case 'FullName':
        if (!value.trim()) error = 'El nombre es obligatorio';
        break;
      case 'Email':
        if (!validateEmail(value)) error = 'Correo no válido';
        break;
      case 'Password':
        if (!validatePassword(value)) error = 'Mínimo 8 caracteres';
        break;
      case 'ConfirmPassword':
        if (!validatePasswordsMatch(formData.Password, value)) error = 'Las contraseñas deben coincidir';
        break;
      case 'TermsAccepted':
        if (!value) error = 'Debes aceptar los términos';
        break;
    }
    setErrors((prev) => ({ ...prev, [name]: error }));
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    const val = type === 'checkbox' ? checked : value;
    
    setFormData((prev) => ({
      ...prev,
      [name]: val,
    }));

    if (touched[name as keyof UserRegistrationData]) {
      validateField(name, val);
    }
  };

  const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    const val = type === 'checkbox' ? checked : value;
    
    setTouched((prev) => ({ ...prev, [name]: true }));
    validateField(name, val);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Final check
    const newErrors: Partial<Record<keyof UserRegistrationData, string>> = {};
    if (!formData.FullName.trim()) newErrors.FullName = 'El nombre es obligatorio';
    if (!validateEmail(formData.Email)) newErrors.Email = 'Correo no válido';
    if (!validatePassword(formData.Password)) newErrors.Password = 'Mínimo 8 caracteres';
    if (!validatePasswordsMatch(formData.Password, formData.ConfirmPassword)) newErrors.ConfirmPassword = 'Las contraseñas deben coincidir';
    if (!formData.TermsAccepted) newErrors.TermsAccepted = 'Debes aceptar los términos';

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }
    setIsConfirmationModalOpen(true);
  };

  const createAccount = async () => {
    setIsConfirmationModalOpen(false);
    setIsLoading(true);
    setServerError(null);

    try {
      const response = await AuthService.register(formData);
      if (response.Success) {
        // alert('Usuario Creado Correctamente'); // Removed per requirement
        router.push('/');
      } else {
        setServerError(response.ErrorMessage || 'Ocurrió un error inesperado');
      }
    } catch (err) {
      setServerError('Error de conexión al servidor');
    } finally {
      setIsLoading(false);
    }
  };

  const isFormValid = formData.FullName && 
                    validateEmail(formData.Email) && 
                    validatePassword(formData.Password) && 
                    validatePasswordsMatch(formData.Password, formData.ConfirmPassword) && 
                    formData.TermsAccepted;

  return (
    <>
      <form onSubmit={handleSubmit} className="space-y-6">
        {serverError && (
          <div className="p-3 text-sm text-red-500 bg-red-50 border border-red-200 rounded-lg">
            {serverError}
          </div>
        )}
        
        <Input
          label="Nombre Completo"
          id="FullName"
          name="FullName"
          placeholder="Ej. Alex Mena"
          value={formData.FullName}
          onChange={handleChange}
          onBlur={handleBlur}
          error={errors.FullName}
          required
        />
        
        <Input
          label="Correo Electrónico"
          id="Email"
          name="Email"
          type="email"
          placeholder="usuario@ejemplo.com"
          value={formData.Email}
          onChange={handleChange}
          onBlur={handleBlur}
          error={errors.Email}
          required
        />
        
        <Input
          label="Contraseña"
          id="Password"
          name="Password"
          type="password"
          placeholder="••••••••"
          value={formData.Password}
          onChange={handleChange}
          onBlur={handleBlur}
          error={errors.Password}
          required
        />
        
        <Input
          label="Confirmar Contraseña"
          id="ConfirmPassword"
          name="ConfirmPassword"
          type="password"
          placeholder="••••••••"
          value={formData.ConfirmPassword}
          onChange={handleChange}
          onBlur={handleBlur}
          error={errors.ConfirmPassword}
          required
        />
        
        <Checkbox
          label="Aceptar términos y condiciones"
          id="TermsAccepted"
          name="TermsAccepted"
          checked={formData.TermsAccepted}
          onChange={handleChange}
          onBlur={handleBlur}
          error={errors.TermsAccepted}
          required
        />
        
        <Button type="submit" disabled={isLoading || !isFormValid}>
          {isLoading ? 'Procesando...' : 'Crear cuenta'}
        </Button>

        <div className="mt-8 text-center text-sm text-neutral-500">
          ¿Ya tienes cuenta?{' '}
          <Link 
            href="/" 
            className="text-brand-primary font-semibold hover:underline"
          >
            Inicia sesión
          </Link>
        </div>
      </form>

      {isConfirmationModalOpen && (
        <div className="fixed inset-0 bg-neutral-900 bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-sm">
            <h3 className="text-lg font-semibold text-neutral-900 mb-4">¿Desea Confirmar Creación?</h3>
            <div className="flex gap-4">
              <Button onClick={createAccount}>Aceptar</Button>
              <Button variant="secondary" onClick={() => setIsConfirmationModalOpen(false)}>Cancelar</Button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
