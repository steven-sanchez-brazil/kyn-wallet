import { RegisterFormData, RegisterResult } from '@/lib/types/Register';

export interface IRegisterService {
  register(data: RegisterFormData): Promise<RegisterResult>;
}

export const RegisterService: IRegisterService = {
  async register(data: RegisterFormData): Promise<RegisterResult> {
    // Simula latencia de red sin backend real.
    await new Promise((resolve) => setTimeout(resolve, 300));

    return {
      success: true,
      message: `Cuenta creada con exito para ${data.fullName.trim()}`,
      redirectTo: '/login',
    };
  },
};
