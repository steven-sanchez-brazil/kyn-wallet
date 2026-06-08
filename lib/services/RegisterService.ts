import { RegisterData, RegisterResult } from '../types/Auth';

export interface IRegisterService {
  register(data: RegisterData): Promise<RegisterResult>;
}

export const RegisterService: IRegisterService = {
  async register(data: RegisterData): Promise<RegisterResult> {
    await new Promise((resolve) => setTimeout(resolve, 500));

    return {
      Success: true,
      Message: 'Cuenta creada exitosamente',
    };
  },
};
