# Data Model: Registro de Usuarios

## Entities

### RegistroUsuario
Representa el payload de entrada para creación de cuenta.

| Campo | Tipo | Validación | Descripción |
|-------|------|------------|-------------|
| `NombreCompleto` | `string` | Obligatorio, `trim().length > 0` | Nombre y apellido del usuario. |
| `CorreoElectronico` | `string` | Obligatorio, formato email válido | Identificador de acceso del usuario. |
| `Contrasena` | `string` | Obligatorio, mínimo 8 caracteres | Clave principal de acceso. |
| `ConfirmacionContrasena` | `string` | Obligatorio, debe coincidir con `Contrasena` | Confirmación para prevenir errores de tipeo. |
| `AceptaTerminos` | `boolean` | Debe ser `true` | Consentimiento requerido para registro. |

### EstadoValidacionCampo
Representa el resultado de validación por campo para feedback inline.

| Campo | Tipo | Regla |
|-------|------|-------|
| `Campo` | `string` | Nombre lógico del input validado. |
| `EsValido` | `boolean` | `true` cuando no hay error para el campo. |
| `Mensaje` | `string` | Mensaje human-readable de validación. |

### ResultadoRegistro
Representa el resultado del intento de registro.

| Campo | Tipo | Regla |
|-------|------|-------|
| `Exitoso` | `boolean` | `true` si el registro fue aceptado. |
| `Mensaje` | `string` | Mensaje de éxito o error global. |
| `RutaDestino` | `string` | Ruta de redirección (`/login` en éxito). |

## Relationships
- `RegistroUsuario` es validado por reglas de dominio y produce múltiples `EstadoValidacionCampo`.
- Si todas las validaciones son correctas, el proceso devuelve `ResultadoRegistro` exitoso con destino `/login`.
- Si existe al menos una validación fallida, el proceso devuelve `ResultadoRegistro` no exitoso y mantiene al usuario en el formulario.

## State Transitions
1. `Borrador`: usuario aún no intenta enviar.
2. `ConErrores`: se ejecuta validación y uno o más campos quedan inválidos.
3. `Valido`: todos los campos pasan validaciones.
4. `Registrado`: se confirma registro y se redirige a `/login` con mensaje de éxito.
