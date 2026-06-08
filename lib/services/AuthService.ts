import { AuthCredentials, NuevoUsuario, ResultadoRegistro, User } from '../types/Auth';

export interface IAuthService {
  login(credentials: AuthCredentials): Promise<boolean>;
  isAuthenticated(): boolean;
  register(datos: NuevoUsuario): Promise<ResultadoRegistro>;
}

const MOCK_USERS: User[] = [
  {
    Email: 'tucorreo@ejemplo.com',
    Password: 'password123',
  },
];

let currentUser: User | null = null;

export const AuthService: IAuthService = {
  async login(credentials: AuthCredentials): Promise<boolean> {
    // Simulating API delay
    await new Promise((resolve) => setTimeout(resolve, 500));

    const user = MOCK_USERS.find(
      (u) => u.Email === credentials.Email && u.Password === credentials.Password
    );

    if (user) {
      currentUser = user;
      return true;
    }

    return false;
  },

  isAuthenticated(): boolean {
    return currentUser !== null;
  },

  async register(datos: NuevoUsuario): Promise<ResultadoRegistro> {
    await new Promise((resolve) => setTimeout(resolve, 500));

    const existingUser = MOCK_USERS.find((u) => u.Email === datos.Email);
    if (existingUser) {
      return { Exitoso: false, MensajeError: 'El correo ya está registrado. Intentá con otro.' };
    }

    MOCK_USERS.push({ Email: datos.Email, Password: datos.Contrasena });
    return { Exitoso: true };
  },
};
