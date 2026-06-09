export interface AuthCredentials {
  Email: string;
  Password: string;
}

export interface User {
  NombreCompleto?: string;
  Email: string;
  Password: string;
}

export interface RegisterRequest {
  NombreCompleto: string;
  CorreoElectronico: string;
  Contrasena: string;
  ConfirmarContrasena: string;
  AceptaTerminos: boolean;
}

export interface RegisterValidationResult {
  EsValido: boolean;
  Errores: {
    NombreCompleto?: string;
    CorreoElectronico?: string;
    Contrasena?: string;
    ConfirmarContrasena?: string;
    AceptaTerminos?: string;
  };
}

export interface RegisterResult {
  Exitoso: boolean;
  Mensaje: string;
  RutaSiguiente?: '/login';
  TipoError?: 'CorreoExistente' | 'TecnicoTransitorio';
  Errores?: RegisterValidationResult['Errores'];
}
