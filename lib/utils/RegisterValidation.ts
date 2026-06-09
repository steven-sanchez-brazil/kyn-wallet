import { validateEmail, validatePassword } from './Validation';
import { RegistroErrores, RegistroUsuario } from '../types/Register';

const addError = (errors: RegistroErrores, field: string, message: string): void => {
  errors[field] = {
    Campo: field,
    EsValido: false,
    Mensaje: message,
  };
};

export const validateRegisterPayload = (payload: RegistroUsuario): RegistroErrores => {
  const errors: RegistroErrores = {};

  if (!payload.NombreCompleto.trim()) {
    addError(errors, 'NombreCompleto', 'El nombre completo es obligatorio');
  }

  if (!payload.CorreoElectronico.trim()) {
    addError(errors, 'CorreoElectronico', 'El correo electrónico es obligatorio');
  } else if (!validateEmail(payload.CorreoElectronico)) {
    addError(errors, 'CorreoElectronico', 'Formato de correo inválido');
  }

  if (!payload.Contrasena) {
    addError(errors, 'Contrasena', 'La contraseña es obligatoria');
  } else if (!validatePassword(payload.Contrasena)) {
    addError(errors, 'Contrasena', 'La contraseña debe tener al menos 8 caracteres');
  }

  if (!payload.ConfirmacionContrasena) {
    addError(errors, 'ConfirmacionContrasena', 'Debes confirmar la contraseña');
  } else if (payload.ConfirmacionContrasena !== payload.Contrasena) {
    addError(errors, 'ConfirmacionContrasena', 'Las contraseñas no coinciden');
  }

  if (!payload.AceptaTerminos) {
    addError(errors, 'AceptaTerminos', 'Debes aceptar los términos y condiciones');
  }

  return errors;
};