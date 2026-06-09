# Phase 1 · Data Model: Registro de Usuarios

**Feature**: Registro de Usuarios | **Branch**: `feature/registro-jp-fsabate` | **Date**: 2026-06-09

Modelo de datos a nivel de dominio/frontera. Sin persistencia real: simulación en memoria dentro de `AuthService` (igual que el login). Propiedades en `PascalCase` para consistencia con los tipos existentes (`AuthCredentials`, `User`).

---

## Entidad: `RegisterCredentials`

Datos capturados por el formulario de registro y enviados al servicio.

| Campo | Tipo | Reglas de validación | Requisito |
|-------|------|----------------------|-----------|
| `FullName` | `string` | Obligatorio, no vacío tras recortar espacios | FR-003, FR-009 |
| `Email` | `string` | Obligatorio, formato de correo válido | FR-003, FR-006, FR-009 |
| `Password` | `string` | Obligatorio, mínimo 8 caracteres | FR-003, FR-007, FR-009 |
| `ConfirmPassword` | `string` | Obligatorio, debe coincidir con `Password` | FR-003, FR-008, FR-009 |
| `AcceptedTerms` | `boolean` | Debe ser `true` | FR-004, FR-010 |

**Notas**:
- El servicio recibe estos datos solo después de que la UI validó todos los campos (FR-005, FR-011).
- `AcceptedTerms` es un acuerdo obligatorio, no un dato persistente del usuario.

---

## Entidad: `RegisterResult`

Resultado devuelto por `AuthService.register()`.

| Campo | Tipo | Descripción |
|-------|------|-------------|
| `Success` | `boolean` | `true` si el registro se completó; `false` si fue rechazado. |
| `Error` | `string` (opcional) | Mensaje de error cuando `Success` es `false` (p. ej. correo duplicado). |

**Estados posibles**:
- `{ Success: true }` → registro exitoso → la UI redirige a `/login?registered=true` (FR-012).
- `{ Success: false, Error: 'Este correo ya está registrado' }` → correo duplicado (FR-023) → la UI muestra error inline.

---

## Entidad: `ValidationResult` (conceptual, en la capa UI)

Estado de validación por campo manejado dentro de `RegisterForm` (no es un tipo persistido).

| Campo de error | Disparador | Mensaje sugerido |
|----------------|-----------|------------------|
| `fullNameError` | Nombre vacío | "El nombre completo es obligatorio" |
| `emailError` | Vacío / formato inválido | "Formato de correo inválido" |
| `passwordError` | Vacío / < 8 caracteres | "La contraseña debe tener al menos 8 caracteres" |
| `confirmPasswordError` | Vacío / no coincide | "Las contraseñas no coinciden" |
| `termsError` | Checkbox sin marcar | "Debes aceptar los términos y condiciones" |
| `formError` | Correo duplicado del servicio | "Este correo ya está registrado" |

---

## Entidad existente reutilizada: `User`

`User { Email, Password }` (en `lib/types/Auth.ts`). Un registro exitoso agrega una nueva entrada a `MOCK_USERS`, permitiendo que el correo registrado sea reconocido por `login()` y por la verificación de duplicados.

> Nota: `User` no incluye `FullName` actualmente. Para el alcance simulado, el registro persiste `Email`/`Password` en el mock; `FullName` se valida y captura en la UI/servicio pero su almacenamiento extendido queda fuera del alcance mínimo (puede añadirse a `User` si una feature futura lo requiere — YAGNI).

---

## Relaciones

```text
RegisterForm (UI)
   │  construye
   ▼
RegisterCredentials ──register()──► AuthService ──► RegisterResult
                                        │
                                        ▼
                                   MOCK_USERS: User[]  (verifica duplicado / agrega)
```

## Reglas de transición

1. Formulario inválido → no se invoca `register()` (FR-011).
2. Formulario válido → `register()` → 
   - sin duplicado → `Success: true` → navegación a `/login?registered=true`.
   - con duplicado → `Success: false, Error` → error inline, permanece en `/`.
