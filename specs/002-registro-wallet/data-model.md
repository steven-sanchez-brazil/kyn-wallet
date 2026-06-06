# Data Model — Pantalla de Registro

**Feature**: 002-registro-wallet | **Date**: 2026-06-06

## Entidades / Tipos (`lib/types/Auth.ts`)

### RegistrationData (nuevo)

Datos capturados por el formulario de registro.

| Campo | Tipo | Reglas de validación |
|-------|------|----------------------|
| `FullName` | `string` | Requerido; no vacío tras `trim()` (`validateRequired`). |
| `Email` | `string` | Requerido; formato válido (`validateEmail`); no debe existir en `UserStore` (FR-008). |
| `Password` | `string` | Requerido; longitud mínima 8 (`validatePassword`). |
| `PasswordConfirmation` | `string` | Requerido; debe coincidir con `Password` (`validatePasswordsMatch`). |
| `AcceptedTerms` | `boolean` | Debe ser `true` para procesar el registro (FR-007). |

### User (modificado)

```text
User {
  Email: string
  Password: string
  FullName?: string   // añadido (opcional para no romper el mock de login existente)
}
```

### RegistrationResult (nuevo)

Resultado del intento de registro, sin lanzar excepciones para flujos de validación esperados.

| Campo | Tipo | Descripción |
|-------|------|-------------|
| `Success` | `boolean` | `true` si el usuario fue creado. |
| `ErrorCode` | `'EMAIL_TAKEN' \| 'INVALID' \| null` | Motivo de fallo cuando `Success` es `false`. |

## Servicios

### IUserStore / UserStore (nuevo, `lib/services/UserStore.ts`)

Fuente única de verdad de usuarios simulados (en memoria).

```text
interface IUserStore {
  findByEmail(email: string): User | undefined
  add(user: User): void
}
```

- Sembrado inicial: el usuario mock existente (`tucorreo@ejemplo.com` / `password123`).
- Comparación de correo **insensible a mayúsculas** y con `trim()` para robustez de la verificación de duplicados.

### IRegistrationService / RegistrationService (nuevo, `lib/services/RegistrationService.ts`)

```text
interface IRegistrationService {
  register(data: RegistrationData): Promise<RegistrationResult>
}
```

Lógica de `register`:
1. Validar formato/coincidencia/términos (defensa en profundidad; la UI también valida). Si falla → `{ Success: false, ErrorCode: 'INVALID' }`.
2. `UserStore.findByEmail(data.Email)` → si existe → `{ Success: false, ErrorCode: 'EMAIL_TAKEN' }`.
3. `UserStore.add({ Email, Password, FullName })` → `{ Success: true, ErrorCode: null }`.
4. Delay simulado (~500 ms) coherente con `AuthService`.

### AuthService (modificado)

- Reemplaza su array `MOCK_USERS` local por consultas a `UserStore.findByEmail`, de modo que un usuario recién registrado pueda iniciar sesión y exista una sola fuente de datos.

## Reglas de validación (`lib/utils/Validation.ts`)

| Función | Existente/Nueva | Regla |
|---------|-----------------|-------|
| `validateEmail(email)` | Existente | Formato de correo. |
| `validatePassword(password)` | Existente | `length >= 8`. |
| `validateRequired(value)` | Nueva | `value.trim().length > 0`. |
| `validatePasswordsMatch(a, b)` | Nueva | `a === b` y ambas no vacías. |

## Mapa Requisitos → Modelo

- FR-002 → `RegistrationData` (FullName, Email, Password, PasswordConfirmation)
- FR-003 → `validateEmail`
- FR-004 → `validatePassword`
- FR-005 → `validatePasswordsMatch`
- FR-006 → `validateRequired` + agregación de errores en `RegisterForm`
- FR-007 → `RegistrationData.AcceptedTerms` (obligatorio)
- FR-008 → `UserStore.findByEmail` + `RegistrationResult.ErrorCode = 'EMAIL_TAKEN'`
- FR-010 → redirección a `/construction` al obtener `Success: true`
