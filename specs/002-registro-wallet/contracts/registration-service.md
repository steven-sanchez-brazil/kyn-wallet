# Contract — RegistrationService & UI de Registro

**Feature**: 002-registro-wallet | **Date**: 2026-06-06

Este contrato define la interfaz entre la capa de UI (`RegisterForm`) y la lógica de negocio (`RegistrationService` + `UserStore`), y el contrato de interacción de la pantalla de Registro.

## 1. Contrato de servicio

### `RegistrationService.register(data: RegistrationData): Promise<RegistrationResult>`

**Entrada** (`RegistrationData`):

```ts
{
  FullName: string;
  Email: string;
  Password: string;
  PasswordConfirmation: string;
  AcceptedTerms: boolean;
}
```

**Salida** (`RegistrationResult`):

```ts
{ Success: true, ErrorCode: null }
| { Success: false, ErrorCode: 'EMAIL_TAKEN' }
| { Success: false, ErrorCode: 'INVALID' }
```

**Casos del contrato**:

| # | Entrada | Salida esperada |
|---|---------|-----------------|
| C1 | Datos válidos, correo nuevo, términos aceptados | `{ Success: true, ErrorCode: null }` y el usuario queda en `UserStore` |
| C2 | Correo ya existente en `UserStore` | `{ Success: false, ErrorCode: 'EMAIL_TAKEN' }`; `UserStore` sin cambios |
| C3 | Correo con formato inválido | `{ Success: false, ErrorCode: 'INVALID' }` |
| C4 | Contraseña < 8 caracteres | `{ Success: false, ErrorCode: 'INVALID' }` |
| C5 | `Password` ≠ `PasswordConfirmation` | `{ Success: false, ErrorCode: 'INVALID' }` |
| C6 | `AcceptedTerms` = false | `{ Success: false, ErrorCode: 'INVALID' }` |
| C7 | Tras C1, `AuthService.login` con esas credenciales | `true` (misma fuente `UserStore`) |

## 2. Contrato de UI — pantalla `/register`

**Elementos requeridos** (de la referencia visual):

- Brand Panel: logo "KynWallet", título "Comienza tu camino financiero.", subtítulo descriptivo, mockup "Kyn Card".
- Form Panel: título "Crea tu cuenta", subtítulo "Completa tus datos para comenzar".
- Campos: Nombre completo (`Ej: Diego Martínez`), Correo electrónico (`tucorreo@ejemplo.com`), Contraseña (toggle), Confirmar contraseña (toggle).
- Casilla "Acepto los términos y condiciones" (obligatoria).
- Botón "Crear cuenta".
- Divisor "o regístrate con" + botones Google / Apple (visuales).
- Enlace "¿Ya tienes cuenta? Inicia sesión" → `/`.

**Comportamiento**:

| Evento | Resultado |
|--------|-----------|
| Envío con datos válidos + términos aceptados | `register` → `Success: true` → `router.push('/construction')` |
| Envío con campo vacío / correo inválido / contraseñas distintas | Bloqueo de envío + mensaje(s) de validación inline; sin redirección |
| Envío sin aceptar términos | Bloqueo + mensaje "Debes aceptar los términos y condiciones"; sin redirección |
| Envío con correo ya registrado | Mensaje "Este correo ya está registrado"; sin redirección |
| Click en toggle de contraseña | Alterna visibilidad del campo (password ↔ text) |
| Click en Google / Apple | Aviso "disponible próximamente" (sin navegación real) |
| Click en "Inicia sesión" | Navegación a `/` |

## 3. Estados de validación (mensajes)

| Condición | Mensaje |
|-----------|---------|
| Nombre vacío | "El nombre es obligatorio" |
| Correo inválido | "Formato de correo inválido" |
| Correo duplicado | "Este correo ya está registrado" |
| Contraseña corta | "La contraseña debe tener al menos 8 caracteres" |
| Contraseñas no coinciden | "Las contraseñas no coinciden" |
| Términos no aceptados | "Debes aceptar los términos y condiciones" |
