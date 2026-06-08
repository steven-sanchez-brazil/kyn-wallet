import { RegistrationData, IRegistrationService } from '../types/Registration';

export const RegistrationService: IRegistrationService = {
  async register(data: RegistrationData): Promise<boolean> {
    // Simulating API delay
    await new Promise((resolve) => setTimeout(resolve, 500));

    return data.AcceptsTerms && data.Email.length > 0 && data.FullName.length > 0;
  },
};
