# Contract: RegisterService

## Definition
Servicio responsable de validar y procesar el alta de usuarios en el flujo de registro de KynWallet.

## Interface

```typescript
interface RegisterPayload {
  FullName: string;
  Email: string;
  Password: string;
  ConfirmPassword: string;
  AcceptTerms: boolean;
}

interface RegisterResult {
  Success: boolean;
  Message: string;
  FieldErrors?: Record<string, string>;
}

interface RegisterService {
  register(payload: RegisterPayload): Promise<RegisterResult>;
}
```

## Validation Rules

- `FullName` obligatorio, longitud minima 2.
- `Email` obligatorio y con formato valido.
- `Password` obligatorio y longitud minima 8.
- `ConfirmPassword` debe coincidir con `Password`.
- `AcceptTerms` debe ser `true`.

## Behavioral Contract

1. Si hay errores de validacion, `Success` debe ser `false` y `FieldErrors` debe incluir claves por campo.
2. Si el correo ya existe, `Success` debe ser `false` con mensaje explicito.
3. Si el registro es exitoso, `Success` debe ser `true` y `Message` debe confirmar creacion de cuenta.
4. Errores operativos deben devolverse como recuperables para permitir reintento.

## Out of Scope

- Persistencia real en base de datos.
- Integracion con proveedores externos.
- Inicio de sesion automatico post-registro.
