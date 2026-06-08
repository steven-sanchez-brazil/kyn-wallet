# Contract: RegistrationService

## Definition
Servicio encargado de validar y crear una cuenta simulada para la pantalla de registro.

### Interface
```typescript
interface RegistrationCredentials {
  Email: string;
  Password: string;
  ConfirmPassword: string;
  DisplayName?: string;
}

interface RegistrationResult {
  Success: boolean;
  Message: string;
  RedirectTarget: string | null;
}

interface IRegistrationService {
  register(credentials: RegistrationCredentials): Promise<RegistrationResult>;
  isEmailAvailable(email: string): Promise<boolean>;
}
```

## Constraints
- No debe persistir datos en localStorage/sessionStorage para esta versión.
- Debe devolver errores descriptivos cuando falten datos obligatorios, el correo sea inválido o las contraseñas no coincidan.
- Debe mantenerse libre de dependencias externas nuevas.