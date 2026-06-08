# Data Model: Registro de Billetera Virtual

**Feature**: 002-registro-billetera  
**Date**: 2026-06-08

## Entities

### RegisterData

Representa los datos capturados del formulario de registro.

| Field | Type | Constraints |
|-------|------|-------------|
| FullName | string | Obligatorio, no vacío después de trim |
| Email | string | Obligatorio, formato email válido (regex) |
| Password | string | Obligatorio, mínimo 8 caracteres |
| ConfirmPassword | string | Obligatorio, debe coincidir con Password |
| AcceptTerms | boolean | Obligatorio, debe ser true |

**Relationships**: Extiende el modelo de autenticación existente (`Auth.ts`).

### RegisterResult

Representa el resultado del intento de registro.

| Field | Type | Description |
|-------|------|-------------|
| Success | boolean | Siempre true en registro simulado |
| Message | string | Mensaje descriptivo del resultado |

## Validation Rules

| Rule | Field(s) | Logic |
|------|----------|-------|
| Campo obligatorio | Todos | Valor no vacío después de trim |
| Email válido | Email | Regex: `/^[^\s@]+@[^\s@]+\.[^\s@]+$/` |
| Longitud mínima | Password | `password.length >= 8` |
| Coincidencia | Password + ConfirmPassword | `password === confirmPassword` |
| Aceptación T&C | AcceptTerms | `acceptTerms === true` |

## State Transitions

```
[Formulario vacío]
    → (usuario completa campos)
[Formulario con datos]
    → (blur en campo inválido)
[Formulario con errores inline]
    → (usuario corrige)
[Formulario válido]
    → (clic "Crear cuenta")
[Enviando registro]
    → (simulación exitosa)
[Registro exitoso]
    → (redirección a /login?registered=true)
```

## Component State Model

### RegisterForm State

| State Variable | Type | Initial Value | Description |
|---------------|------|---------------|-------------|
| FullName | string | '' | Valor del campo nombre |
| Email | string | '' | Valor del campo email |
| Password | string | '' | Valor del campo contraseña |
| ConfirmPassword | string | '' | Valor del campo confirmar contraseña |
| AcceptTerms | boolean | false | Estado del checkbox T&C |
| FullNameError | string \| null | null | Error de validación nombre |
| EmailError | string \| null | null | Error de validación email |
| PasswordError | string \| null | null | Error de validación contraseña |
| ConfirmPasswordError | string \| null | null | Error de validación confirmación |
| TermsError | string \| null | null | Error de aceptación T&C |
| Loading | boolean | false | Estado de envío en progreso |
