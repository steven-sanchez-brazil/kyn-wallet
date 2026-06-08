# Contract: AuthService

## Definition
Servicio encargado de la lógica de autenticación simulada.

### Interface
```typescript
interface AuthService {
  /**
   * Valida las credenciales contra el arreglo hardcodeado.
   * @param credentials Objeto con Email y Password.
   * @returns Promise<AuthResult> con success y mensaje opcional.
   */
  login(credentials: AuthCredentials): Promise<AuthResult>;

  /**
   * Verifica si hay una sesión activa.
   */
  isAuthenticated(): boolean;
}

interface AuthCredentials {
  Email: string;
  Password: string;
}

interface AuthResult {
  Success: boolean;
  Message?: string;
}
```

## Input Component Contract: Input (ui)
```typescript
interface InputProps {
  label: string;           // FR-012: Medium 14px, #3d3f5c
  placeholder: string;     // FR-017: Regular 15px, #a9abc2
  type: 'text' | 'email' | 'password';
  value: string;
  onChange: (value: string) => void;
  showToggle?: boolean;    // FR-009: Eye icon for password visibility
  error?: string;
}
```

## Navigation Contract
```typescript
// FR-010: Footer link navigation
interface LoginFooterNav {
  registerHref: '/register';   // "Regístrate" link destination
  forgotPasswordAction: () => void;  // Shows "Funcionalidad próximamente" toast
}
```

## Constraints
- No debe persistir datos en localStorage/sessionStorage para esta versión (simulación pura en memoria).
- Debe retornar errores descriptivos para campos vacíos o formatos inválidos.
- El toggle de visibilidad (FR-009) es estado local del componente Input, no del servicio.
- Los enlaces de acción usan color Brand/600 (#ef5226) según FR-011.
