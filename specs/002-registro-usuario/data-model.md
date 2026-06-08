# Data Model: Registro de Usuario

## Entidades

---

### RegistrationData
Representa los datos capturados por el formulario de registro. Es el objeto de transferencia de datos (DTO) que viaja desde `RegisterForm` hacia `RegistrationService`.

| Campo | Tipo | Validación | Descripción |
|-------|------|------------|-------------|
| `FullName` | `string` | No vacío tras trim; solo letras latinas (incluyendo ñ, tildes), espacios | Nombres y apellidos del usuario. |
| `Email` | `string` | Regex de email — mismo que `validateEmail` en `Validation.ts` | Correo electrónico único. |
| `Password` | `string` | Mínimo 8 caracteres — mismo que `validatePassword` en `Validation.ts` | Contraseña de acceso. |
| `ConfirmPassword` | `string` | Debe ser igual a `Password` | Confirmación de contraseña. |
| `AcceptsTerms` | `boolean` | Debe ser `true` para enviar el formulario | Aceptación de términos y condiciones. |

**Notas de validación**:
- `FullName` y `Email`: se aplica `validateTrimmed` — si hay espacios al inicio/final, el campo se marca en rojo con advertencia para que el usuario corrija.
- `ConfirmPassword`: validado con `validatePasswordMatch(Password, ConfirmPassword)` — en tiempo real al editar cualquiera de los dos campos.
- `AcceptsTerms`: validado al intentar enviar el formulario — si es `false`, el checkbox se resalta en rojo.

---

### IRegistrationService
Interfaz de dominio para el servicio de registro. Define el contrato que `RegisterForm` consume (Inversión de Dependencias).

```typescript
export interface IRegistrationService {
  register(data: RegistrationData): Promise<boolean>;
}
```

| Método | Parámetros | Retorno | Descripción |
|--------|------------|---------|-------------|
| `register` | `data: RegistrationData` | `Promise<boolean>` | Simula el registro. Retorna `true` si exitoso, `false` si falla. |

---

### RegisterFormState (Estado interno del componente — no exportado)
Estado interno del componente `RegisterForm`. No es una entidad de dominio, se documenta aquí para claridad de implementación.

| Campo | Tipo | Valor Inicial | Descripción |
|-------|------|---------------|-------------|
| `fullName` | `string` | `''` | Valor del campo Nombres y Apellidos. |
| `email` | `string` | `''` | Valor del campo Correo Electrónico. |
| `password` | `string` | `''` | Valor del campo Contraseña. |
| `confirmPassword` | `string` | `''` | Valor del campo Confirmar Contraseña. |
| `acceptsTerms` | `boolean` | `false` | Estado del checkbox de términos. |
| `fullNameError` | `string \| null` | `null` | Error de validación para el nombre. |
| `emailError` | `string \| null` | `null` | Error de validación para el email. |
| `passwordError` | `string \| null` | `null` | Error de validación para la contraseña. |
| `confirmPasswordError` | `string \| null` | `null` | Error de validación para la confirmación. |
| `termsError` | `string \| null` | `null` | Error de validación para el checkbox. |
| `submitError` | `string \| null` | `null` | Error devuelto por el servicio (e.g., fallo simulado). |
| `loading` | `boolean` | `false` | Estado de carga durante el envío. |

---

## Validators (extensión de `lib/utils/Validation.ts`)

| Función | Firma | Descripción |
|---------|-------|-------------|
| `validateName` | `(name: string) => boolean` | `true` si el nombre no está vacío tras trim y solo contiene letras latinas, ñ, tildes y espacios. |
| `validatePasswordMatch` | `(password: string, confirmPassword: string) => boolean` | `true` si ambas cadenas son exactamente iguales. |
| `validateTrimmed` | `(value: string) => boolean` | `true` si el valor NO tiene espacios al inicio o al final (`value === value.trim()`). |

**Mensajes de error estándar** (hardcoded en `RegisterForm`):

| Condición | Mensaje mostrado |
|-----------|-----------------|
| `FullName` vacío | "Este campo es obligatorio" |
| `FullName` con chars inválidos | "Solo se permiten letras y espacios" |
| `FullName` o `Email` con espacios al inicio/final | "Hay espacios al inicio o al final. Por favor corrígelo." |
| `Email` vacío | "Este campo es obligatorio" |
| `Email` formato inválido | "Formato de correo inválido" |
| `Password` vacío | "Este campo es obligatorio" |
| `Password` < 8 chars | "La contraseña debe tener al menos 8 caracteres" |
| `ConfirmPassword` vacío | "Este campo es obligatorio" |
| `ConfirmPassword` no coincide | "Las contraseñas no coinciden" |
| `AcceptsTerms` = false | "Debes aceptar los términos y condiciones" |

---

## Relaciones

```
RegisterForm
  ├── usa ──────────────► IRegistrationService (DIP)
  │                              │
  │                              └── impl: RegistrationService (mock)
  │
  ├── consume ──────────► validateName, validateEmail, validatePassword,
  │                        validatePasswordMatch, validateTrimmed
  │                        (de lib/utils/Validation.ts)
  │
  ├── envía ────────────► RegistrationData (DTO)
  │
  ├── renderiza ────────► Input (×4), Checkbox (×1), Button (×1), SocialLogins (×1)
  │
  └── en éxito ──────────► router.push('/login?registered=true')

app/page.tsx (LoginPage)
  ├── lee ─────────────► searchParams.registered
  └── renderiza ────────► banner de éxito (inline) si registered === 'true'
```

---

## Tokens de Diseño (reutilizados sin cambio)

Los mismos tokens de `lib/constants/DesignTokens.ts` se aplican a todos los elementos nuevos:

| Token | Valor | Aplicación en registro |
|-------|-------|------------------------|
| `BrandPrimary` | `#ff6b3d` | Botón "Crear Cuenta", focus ring, color del link |
| `BrandGradientStart/End` | `rgb(255,138,101)` / `rgb(239,82,38)` | BrandPanel (sin cambio) |
| `Neutral900` | `#16182c` | Títulos, labels |
| `Neutral500` | `#8a8ca8` | Subtítulos, placeholders |
| `Neutral300` | `#d7d9e6` | Bordes de inputs, divisor |
| `BorderRadiusLg` | `12px` | Inputs, botones, banner de éxito |
| `BorderRadiusMd` | `6px` | Checkbox |
