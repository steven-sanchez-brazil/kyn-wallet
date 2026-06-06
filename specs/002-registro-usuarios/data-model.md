# Data Model: Registro de Usuarios — KynWallet

**Feature**: `specs/002-registro-usuarios`  
**Date**: 2026-06-05

---

## Entidades de Dominio

### RegisterCredentials

Representa los datos que el usuario ingresa en el formulario de registro.

| Campo | Tipo | Restricciones |
|-------|------|---------------|
| `FullName` | `string` | Obligatorio, mínimo 2 caracteres, sin espacios solo |
| `Email` | `string` | Obligatorio, formato email válido (`x@x.x`) |
| `Password` | `string` | Obligatorio, mínimo 8 caracteres |
| `ConfirmPassword` | `string` | Obligatorio, debe ser igual a `Password` |

### RegisterResult

Resultado de la operación de registro.

| Campo | Tipo | Descripción |
|-------|------|-------------|
| `Success` | `boolean` | `true` si el registro fue exitoso |
| `Error` | `'EMAIL_EXISTS' \| 'UNKNOWN' \| undefined` | Código de error si `Success = false` |

---

## Estado del Formulario (`RegisterFormState`)

Estado interno que maneja `RegisterForm.tsx` mediante `useState`.

```
RegisterFormState {
  fullName: string
  email: string
  password: string
  confirmPassword: string
  termsAccepted: boolean
  errors: {
    fullName?: string
    email?: string
    password?: string
    confirmPassword?: string
    submit?: string
  }
  isSubmitting: boolean
  touched: {
    fullName: boolean
    email: boolean
    password: boolean
    confirmPassword: boolean
  }
}
```

**Regla de habilitación del botón**:

```
isFormValid =
  fullName.trim().length >= 2
  && validateEmail(email)
  && validatePassword(password)
  && password === confirmPassword
  && termsAccepted
  && !isSubmitting
```

---

## Reglas de Validación

| Campo | Disparador | Mensaje de error |
|-------|-----------|-----------------|
| `FullName` | `onBlur` | "El nombre completo es obligatorio" / "El nombre debe tener al menos 2 caracteres" |
| `Email` | `onBlur` | "El correo electrónico es obligatorio" / "Ingresa un correo electrónico válido" |
| `Password` | `onBlur` | "La contraseña es obligatoria" / "La contraseña debe tener al menos 8 caracteres" |
| `ConfirmPassword` | `onChange` + `onBlur` | "Confirma tu contraseña" / "Las contraseñas no coinciden" |
| `submit` | `onSubmit` (server error) | "Este correo ya está registrado. ¿Ya tienes cuenta?" |

---

## Transiciones de Estado

```
INICIAL (botón deshabilitado)
  │
  ├─ usuario completa campos + checkbox → LISTO (botón habilitado)
  │     │
  │     └─ usuario pulsa "Crear cuenta" → ENVIANDO (isSubmitting=true, botón deshabilitado)
  │           │
  │           ├─ éxito → redirige a /login?registered=true
  │           └─ error (email duplicado) → ERROR_SUBMIT (mensaje inline submit)
  │
  └─ usuario sale de campo inválido → ERROR_CAMPO (mensaje inline por campo)
        │
        └─ usuario corrige → vuelve a INICIAL o LISTO
```

---

## Extensiones a tipos existentes (`lib/types/Auth.ts`)

Se agregan sin modificar las interfaces existentes:

```typescript
// Nuevos tipos para registro
export interface RegisterCredentials {
  FullName: string;
  Email: string;
  Password: string;
  ConfirmPassword: string;
}

export interface RegisterResult {
  Success: boolean;
  Error?: 'EMAIL_EXISTS' | 'UNKNOWN';
}
```
