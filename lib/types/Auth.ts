export interface AuthCredentials {
  Email: string;
  Password: string;
}

export interface User {
  Email: string;
  Password: string;
}

export interface NuevoUsuario {
  NombreCompleto: string;
  Email: string;
  Contrasena: string;
  ConfirmarContrasena: string;
}

export interface ResultadoRegistro {
  Exitoso: boolean;
  MensajeError?: string;
}
