# Modelo de Datos: Registro de Usuario Nuevo

**Feature**: `002-registro-usuario` | **Fase**: 1 — Diseño
**Fecha**: 2026-06-05

## Entidades

### NuevoUsuario

Representa los datos ingresados por el usuario durante el proceso de registro.

| Campo             | Tipo    | Validación                                        | Obligatorio |
|-------------------|---------|---------------------------------------------------|-------------|
| `NombreCompleto`  | string  | Mínimo 2 palabras, solo letras y espacios          | Sí          |
| `Email`           | string  | Formato válido (regex estándar de email)           | Sí          |
| `Contrasena`      | string  | Mínimo 8 caracteres                               | Sí          |
| `ConfirmarContrasena` | string | Debe ser idéntica a `Contrasena`             | Sí          |

**Reglas de validación**:
- `NombreCompleto`: debe contener al menos 2 palabras separadas por espacio.
- `Email`: debe pasar `validateEmail()` existente en `lib/utils/Validation.ts`.
- `Contrasena`: debe pasar `validatePassword()` existente en `lib/utils/Validation.ts`.
- `ConfirmarContrasena`: debe ser idéntica a `Contrasena` (nueva función `validatePasswordMatch()`).

---

### ResultadoRegistro

Representa el resultado de un intento de registro procesado por `AuthService`.

| Campo          | Tipo    | Descripción                                          |
|----------------|---------|------------------------------------------------------|
| `Exitoso`      | boolean | `true` si el registro fue completado correctamente.  |
| `MensajeError` | string? | Mensaje descriptivo del error (solo si `Exitoso` es `false`). |

**Estados posibles**:
- `{ Exitoso: true }` — registro completado, redirigir a `/construction`.
- `{ Exitoso: false, MensajeError: "El correo ya está registrado." }` — email duplicado.
- `{ Exitoso: false, MensajeError: "Los datos ingresados son inválidos." }` — validación fallida.

---

## Extensiones a Tipos Existentes (`lib/types/Auth.ts`)

El archivo `Auth.ts` se extiende con las nuevas interfaces:

```
// Existente — sin cambios
AuthCredentials { Email, Password }
User { Email, Password }

// Nuevo
NuevoUsuario { NombreCompleto, Email, Contrasena, ConfirmarContrasena }
ResultadoRegistro { Exitoso, MensajeError? }
```

---

## Extensiones a Validaciones (`lib/utils/Validation.ts`)

Nuevas funciones puras a agregar:

| Función                                          | Descripción                                              |
|--------------------------------------------------|----------------------------------------------------------|
| `validatePasswordMatch(p: string, c: string): boolean` | Devuelve `true` si ambas cadenas son idénticas.  |
| `validateFullName(name: string): boolean`        | Devuelve `true` si el nombre tiene al menos 2 palabras. |

---

## Extensiones a AuthService (`lib/services/AuthService.ts`)

Nuevo método a agregar en `IAuthService`:

| Método                                                     | Descripción                                                             |
|------------------------------------------------------------|-------------------------------------------------------------------------|
| `register(datos: NuevoUsuario): Promise<ResultadoRegistro>` | Valida los datos, verifica que el email no exista y agrega el usuario al array mock. |

**Lógica del método `register()`**:
1. Verificar que `Email` no exista ya en `MOCK_USERS`.
2. Si existe → devolver `{ Exitoso: false, MensajeError: "El correo ya está registrado." }`.
3. Si no existe → agregar `{ Email, Password: Contrasena }` a `MOCK_USERS`.
4. Devolver `{ Exitoso: true }`.

---

## Diagrama de Flujo de Estados del Registro

```
[Pantalla Login]
      │
      ▼ (click "Registrate")
[Pantalla Registro]
      │
      ├─ [Ingreso de datos] ──► [Validación en tiempo real]
      │                                │
      │                    ┌───────────┴───────────┐
      │                    ▼                       ▼
      │              [Error de formato]    [Datos válidos]
      │
      ▼ (submit)
[AuthService.register()]
      │
      ├─► [Email duplicado] ──► { Exitoso: false, MensajeError }
      │
      └─► [Registro exitoso] ──► { Exitoso: true } ──► [Redirect /construction]
```
