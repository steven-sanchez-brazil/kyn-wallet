import {
  RegistroErrores,
  RegistroUsuario,
  ResultadoRegistro,
} from '../types/Register';
import { validateRegisterPayload } from '../utils/RegisterValidation';

export interface IRegisterService {
  registrar(payload: RegistroUsuario): Promise<ResultadoRegistro>;
  validar(payload: RegistroUsuario): RegistroErrores;
}

export const RegisterService: IRegisterService = {
  validar(payload: RegistroUsuario): RegistroErrores {
    return validateRegisterPayload(payload);
  },

  async registrar(payload: RegistroUsuario): Promise<ResultadoRegistro> {
    const errores = validateRegisterPayload(payload);

    if (Object.keys(errores).length > 0) {
      return {
        Exitoso: false,
        Mensaje: 'Revisa los datos del formulario para continuar.',
        RutaDestino: '/register',
      };
    }

    await new Promise((resolve) => setTimeout(resolve, 300));

    return {
      Exitoso: true,
      Mensaje: 'Cuenta creada exitosamente',
      RutaDestino: '/login',
    };
  },
};