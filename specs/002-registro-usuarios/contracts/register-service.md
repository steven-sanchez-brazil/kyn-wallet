# Contract: RegisterService

## Purpose
Definir el contrato del servicio de registro utilizado por la pagina de Registro de Usuarios.

## Interface
```typescript
interface RegisterRequest {
  NombreCompleto: string;
  CorreoElectronico: string;
  Contrasena: string;
  ConfirmarContrasena: string;
  AceptaTerminos: boolean;
}

interface RegisterResult {
  Exitoso: boolean;
  Mensaje: string;
  RutaSiguiente: '/login';
  Errores?: {
    NombreCompleto?: string;
    CorreoElectronico?: string;
    Contrasena?: string;
    ConfirmarContrasena?: string;
    AceptaTerminos?: string;
  };
}

interface RegisterService {
  register(payload: RegisterRequest): Promise<RegisterResult>;
}
```

## Behavioral Rules
- `register` MUST validar todos los campos antes de procesar el alta.
- Si hay errores de validacion, `Exitoso` MUST ser `false` y `Errores` MUST contener el detalle inline por campo.
- Si el registro es exitoso, `Exitoso` MUST ser `true`, `RutaSiguiente` MUST ser `/login` y `Mensaje` MUST ser apto para mostrarse en login.
- El contrato de esta iteracion NO incluye autenticacion social real; Google/Apple se resuelven en UI con aviso "Proximamente".

## Integration Points
- Consumido por la pagina de registro en `app/register/page.tsx`.
- Se apoya en reglas de validacion del dominio (`lib/utils/Validation.ts`).
- Debe ser verificable con pruebas unitarias y de integracion de UI.
