# Modelo de Datos: Pantalla de Registro de Usuarios

**Feature Branch**: `feature/002-registro-usuarios`  
**Generado**: 2026-06-08  
**Prerequisito**: [research.md](./research.md)

---

## Entidades del Dominio

### User (existente — extendido)

Representa una cuenta registrada en KynWallet. Se extiende el tipo existente en `lib/types/Auth.ts`.

```typescript
export interface User {
  FullName: string;      // Nombre completo del usuario (mínimo 2 palabras)
  Email: string;         // Identificador único. Formato: usuario@dominio.ext
  Password: string;      // Contraseña en texto plano (sin backend; en producción se hashearía)
}
```

**Reglas de validación:**
| Campo | Regla | Mensaje de error |
|-------|-------|-----------------|
| `FullName` | No vacío; al menos 2 palabras separadas por espacio | "El nombre completo es requerido" / "Ingresa tu nombre y apellido" |
| `Email` | Formato `user@domain.ext` (regex estándar) | "Correo electrónico inválido" |
| `Password` | Mínimo 8 caracteres | "La contraseña debe tener al menos 8 caracteres" |

**Persistencia:**
- Usuarios seed (existentes): definidos en el array `MOCK_USERS` dentro de `AuthService.ts`. No se modifican.
- Usuarios registrados: almacenados en `localStorage` bajo la clave `kynwallet_users`. Al inicializar el servicio, se leen del `localStorage` y se fusionan con `MOCK_USERS`.

---

### RegisterCredentials (nuevo)

Estado transitorio que representa los datos que el usuario ingresa en el formulario de registro.

```typescript
export interface RegisterCredentials {
  FullName: string;
  Email: string;
  Password: string;
  ConfirmPassword: string;
}
```

**Relación**: `RegisterCredentials` → validación → `User` (si todo es válido).

---

### RegisterResult (nuevo)

Tipo de retorno de `AuthService.register()`. Comunica el éxito o el tipo de error al componente sin lanzar excepciones.

```typescript
export type RegisterErrorCode = 'EMAIL_TAKEN' | 'UNKNOWN';

export interface RegisterResult {
  success: boolean;
  error?: RegisterErrorCode;
}
```

---

### RegisterFormState (estado local del componente — no persistido)

Representa el estado interno del componente `RegisterForm`. No es un tipo exportado; vive en el estado local del componente.

| Campo | Tipo | Descripción |
|-------|------|-------------|
| `fullName` | `string` | Valor del campo Nombre completo |
| `email` | `string` | Valor del campo Correo electrónico |
| `password` | `string` | Valor del campo Contraseña |
| `confirmPassword` | `string` | Valor del campo Confirmar contraseña |
| `acceptTerms` | `boolean` | Estado del checkbox de T&C |
| `showPassword` | `boolean` | Toggle de visibilidad del campo Contraseña |
| `showConfirmPassword` | `boolean` | Toggle de visibilidad del campo Confirmar contraseña |
| `fullNameError` | `string \| null` | Mensaje de error inline para Nombre |
| `emailError` | `string \| null` | Mensaje de error inline para Correo |
| `passwordError` | `string \| null` | Mensaje de error inline para Contraseña |
| `confirmPasswordError` | `string \| null` | Mensaje de error inline para Confirmar |
| `termsError` | `string \| null` | Mensaje de error inline para T&C |
| `submitError` | `string \| null` | Error general (ej. email duplicado) |
| `loading` | `boolean` | Estado de envío del formulario |

---

## Transiciones de Estado del Registro

```
[FORMULARIO VACÍO]
        │
        ▼ usuario llena campos
[FORMULARIO EN EDICIÓN]
        │
        ▼ presiona "Crear cuenta"
[VALIDACIÓN CLIENT-SIDE]
        │
     ┌──┴──────────────────────┐
     ▼                         ▼
[ERRORES INLINE]         [DATOS VÁLIDOS]
(formulario no envía)          │
                               ▼
                    [AUTHSERVICE.REGISTER()]
                               │
                    ┌──────────┴──────────┐
                    ▼                     ▼
             [EMAIL_TAKEN]         [REGISTRO OK]
         (error en campo email)         │
                                        ▼
                              [REDIRECT /login?registered=true]
```

---

## Relaciones entre Entidades

```
RegisterCredentials ──────validates──────▶ User
       │                                    │
       │ (if valid)                         │ stored in
       ▼                                    ▼
RegisterResult ◀── AuthService.register() ──▶ MOCK_USERS + localStorage

LoginForm ──── reads query param ───▶ shows success banner
```

---

## Impacto en Código Existente

| Archivo | Cambio | Tipo |
|---------|--------|------|
| `lib/types/Auth.ts` | Agregar `FullName` a `User`; agregar `RegisterCredentials`, `RegisterResult`, `RegisterErrorCode` | Extensión |
| `lib/services/AuthService.ts` | Agregar método `register()`; leer/escribir `localStorage`; agregar `FullName` al seed | Extensión |
| `lib/utils/Validation.ts` | Agregar `validateFullName`, `validatePasswordMatch` | Extensión |
| `components/BrandPanel.tsx` | Agregar props opcionales `headline?` y `subheadline?` | Extensión backward-compatible |
| `components/ui/Input.tsx` | Agregar prop opcional `showPasswordToggle?` con toggle de visibilidad | Extensión backward-compatible |
| `components/LoginForm.tsx` | Agregar detección de `?registered=true` → banner de éxito; agregar link "Regístrate" | Extensión |
