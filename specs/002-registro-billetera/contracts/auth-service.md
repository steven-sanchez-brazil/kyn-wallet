# Contract: AuthService - Register

## Definition

```typescript
interface IAuthService {
  /**
   * Registra un nuevo usuario en el sistema.
   * @param data Datos del formulario de registro.
   * @returns Promesa que resuelve a un objeto indicando éxito o error.
   */
  register(data: UserRegistrationData): Promise<RegistrationResponse>;
  
  // Métodos existentes...
  login(credentials: AuthCredentials): Promise<boolean>;
  isAuthenticated(): boolean;
}
```

## Behavior

1. Valida que el correo no esté duplicado en el sistema mock.
2. Agrega el nuevo usuario a la lista de usuarios.
3. Retorna `{ Success: true }` si todo es correcto.
4. Retorna `{ Success: false, ErrorMessage: "..." }` en caso de error de negocio.
