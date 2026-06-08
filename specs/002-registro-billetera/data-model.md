# Data Model: Registro de Cuenta

## Entities

### RegistrationFormState
Representa el estado actual del formulario de registro.

| Campo | Tipo | Validación | Descripción |
|-------|------|------------|-------------|
| `Email` | `string` | Formato de correo válido | Correo del usuario. |
| `Password` | `string` | Longitud mínima y reglas de complejidad definidas por el producto | Contraseña principal. |
| `ConfirmPassword` | `string` | Debe coincidir con `Password` | Confirmación de contraseña. |
| `DisplayName` | `string` | Requerido si el diseño lo expone | Nombre visible del usuario. |
| `Errors` | `Record<string, string>` | Mensajes por campo | Errores de validación actuales. |

### RegistrationFieldState
Representa el estado individual de un campo del formulario.

| Campo | Tipo | Validación | Descripción |
|-------|------|------------|-------------|
| `Name` | `string` | `PascalCase` interno no aplicable al usuario | Identificador lógico del campo. |
| `Value` | `string` | Depende del campo | Valor ingresado. |
| `Touched` | `boolean` | N/A | Indica si el usuario ya interactuó con el campo. |
| `ErrorMessage` | `string \| null` | Derivado de la validación | Mensaje visible para el usuario. |

### AccountCreationResult
Representa el resultado del intento de registro.

| Campo | Tipo | Validación | Descripción |
|-------|------|------------|-------------|
| `Success` | `boolean` | N/A | Indica si el registro fue aceptado. |
| `Message` | `string` | N/A | Mensaje de confirmación o error. |
| `RedirectTarget` | `string \| null` | Ruta válida del producto | Destino al completar el registro. |

### DesignTokens
Mapa de valores visuales utilizados por la pantalla.

| Token | Valor | Aplicación |
|-------|-------|------------|
| `BrandPrimary` | `#ff6b3d` | CTA principal y acentos. |
| `Neutral900` | `#16182c` | Títulos principales. |
| `Neutral500` | `#8a8ca8` | Texto secundario. |
| `Neutral300` | `#d7d9e6` | Bordes y divisores. |
| `BorderRadiusLg` | `12px` | Inputs y botones. |
| `BorderRadiusMd` | `6px` | Controles secundarios. |

## Relationships
- `RegistrationFormState` agrupa múltiples `RegistrationFieldState`.
- `AccountCreationResult` depende del estado final de `RegistrationFormState`.
- La pantalla de registro usa `DesignTokens` para mantener consistencia visual con el resto del producto.