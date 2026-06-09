export interface RegistroUsuario {
  NombreCompleto: string;
  CorreoElectronico: string;
  Contrasena: string;
  ConfirmacionContrasena: string;
  AceptaTerminos: boolean;
}

export interface EstadoValidacionCampo {
  Campo: string;
  EsValido: boolean;
  Mensaje: string;
}

export interface ResultadoRegistro {
  Exitoso: boolean;
  Mensaje: string;
  RutaDestino: string;
}

export type RegistroErrores = Record<string, EstadoValidacionCampo>;