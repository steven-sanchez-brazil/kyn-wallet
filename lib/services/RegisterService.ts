import { AuthMessages } from '../constants/AuthMessages';
import { RegisterRequest, RegisterResult, User } from '../types/Auth';
import { validateRegisterRequest } from '../utils/Validation';

export interface IRegisterService {
  register(payload: RegisterRequest): Promise<RegisterResult>;
}

const REGISTERED_USERS: User[] = [
  {
    NombreCompleto: 'Usuario Demo',
    Email: 'tucorreo@ejemplo.com',
    Password: 'password123',
  },
];

export const RegisterService: IRegisterService = {
  async register(payload: RegisterRequest): Promise<RegisterResult> {
    await new Promise((resolve) => setTimeout(resolve, 300));

    const validation = validateRegisterRequest(payload);
    if (!validation.EsValido) {
      return {
        Exitoso: false,
        Mensaje: 'Error de validación',
        Errores: validation.Errores,
      };
    }

    if (payload.CorreoElectronico.toLowerCase().includes('timeout')) {
      return {
        Exitoso: false,
        TipoError: 'TecnicoTransitorio',
        Mensaje: AuthMessages.TransientError,
      };
    }

    const duplicate = REGISTERED_USERS.some(
      (u) => u.Email.toLowerCase() === payload.CorreoElectronico.toLowerCase().trim()
    );

    if (duplicate) {
      return {
        Exitoso: false,
        TipoError: 'CorreoExistente',
        Mensaje: AuthMessages.DuplicateEmail,
        Errores: {
          CorreoElectronico: AuthMessages.DuplicateEmail,
        },
      };
    }

    REGISTERED_USERS.push({
      NombreCompleto: payload.NombreCompleto.trim(),
      Email: payload.CorreoElectronico.trim(),
      Password: payload.Contrasena,
    });

    return {
      Exitoso: true,
      Mensaje: AuthMessages.RegisterSuccess,
      RutaSiguiente: '/login',
    };
  },
};
