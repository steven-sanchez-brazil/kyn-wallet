# Contract: Register Service

**Feature**: Registro de Usuarios | **Branch**: `feature/registro-jp-fsabate` | **Date**: 2026-06-09

Contrato de la frontera de aplicación para el registro simulado. Extiende `IAuthService` (ver [auth-service.md](./auth-service.md)). Sin librerías externas; simulación en memoria.

---

## Tipos

```ts
export interface RegisterCredentials {
  FullName: string;
  Email: string;
  Password: string;
  ConfirmPassword: string;
  AcceptedTerms: boolean;
}

export interface RegisterResult {
  Success: boolean;
  Error?: string;
}
```

## Interfaz

```ts
export interface IAuthService {
  login(credentials: AuthCredentials): Promise<boolean>;
  isAuthenticated(): boolean;
  register(credentials: RegisterCredentials): Promise<RegisterResult>;
}
```

## Operación: `register(credentials)`

**Precondiciones** (garantizadas por la UI antes de llamar):
- `FullName` no vacío.
- `Email` con formato válido.
- `Password` con mínimo 8 caracteres.
- `ConfirmPassword === Password`.
- `AcceptedTerms === true`.

**Comportamiento**:
1. Simula un retardo de red (~500ms, consistente con `login`).
2. Verifica si `Email` ya existe en `MOCK_USERS` (case-insensitive recomendado).
3. Si existe → retorna `{ Success: false, Error: 'Este correo ya está registrado' }`.
4. Si no existe → agrega `{ Email, Password }` a `MOCK_USERS` y retorna `{ Success: true }`.

**Postcondiciones**:
- En éxito, el `Email` registrado puede autenticarse luego vía `login()`.
- No muta el estado de sesión (`currentUser`) — el registro no inicia sesión automáticamente.

---

## Casos de prueba del contrato (TDD)

| # | Entrada | Resultado esperado |
|---|---------|--------------------|
| C1 | Datos válidos, correo nuevo | `{ Success: true }` y el correo queda registrado |
| C2 | Correo ya existente (`tucorreo@ejemplo.com`) | `{ Success: false, Error: 'Este correo ya está registrado' }` |
| C3 | Tras registrar un correo nuevo, `login()` con esas credenciales | `true` |
| C4 | Registro exitoso no cambia `isAuthenticated()` a `true` por sí solo | `isAuthenticated()` sin sesión activa permanece `false` |

---

## Contrato de UI (RegisterForm)

| Interacción | Resultado esperado | Requisito |
|-------------|--------------------|-----------|
| Campo obligatorio vacío al enviar | Error inline; no se llama `register()` | FR-009, FR-011 |
| Correo con formato inválido | Error inline de correo | FR-006 |
| Contraseña < 8 caracteres | Error inline de contraseña | FR-007 |
| `ConfirmPassword` distinto | Error inline de coincidencia | FR-008 |
| Términos sin aceptar | Error inline de términos | FR-010 |
| Click en Google / Apple | `alert('Próximamente')` (texto exacto) | FR-013 |
| Click en "Inicia sesión" | Navega a `/login` | FR-014 |
| Envío válido y sin duplicado | Navega a `/login?registered=true` | FR-012 |
| Llegada a `/login?registered=true` | Banner de éxito visible | FR-012 |
