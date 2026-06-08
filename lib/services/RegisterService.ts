import { RegisterPayload, RegisterResult } from '../types/Auth';
import { UserStore } from './UserStore';
import { validateRegisterPayload } from '../utils/Validation';

export interface IRegisterService {
  register(payload: RegisterPayload): Promise<RegisterResult>;
}

export const RegisterService: IRegisterService = {
  async register(payload: RegisterPayload): Promise<RegisterResult> {
    await new Promise((resolve) => setTimeout(resolve, 200));

    const normalizedPayload: RegisterPayload = {
      ...payload,
      FullName: payload.FullName.trim(),
      Email: payload.Email.trim().toLowerCase(),
    };

    const fieldErrors = validateRegisterPayload(normalizedPayload);
    if (Object.keys(fieldErrors).length > 0) {
      return {
        Success: false,
        Message: 'Hay campos por corregir.',
        FieldErrors: fieldErrors,
      };
    }

    try {
      UserStore.add({
        FullName: normalizedPayload.FullName,
        Email: normalizedPayload.Email,
        Password: normalizedPayload.Password,
        AcceptTerms: normalizedPayload.AcceptTerms,
      });

      return {
        Success: true,
        Message: 'Cuenta creada exitosamente.',
      };
    } catch (error) {
      return {
        Success: false,
        Message: error instanceof Error ? error.message : 'No fue posible completar el registro.',
      };
    }
  },
};
