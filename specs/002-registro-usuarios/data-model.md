# Data Model: Registro de Usuarios

## Entities

### FormularioRegistro
Representa la entrada del usuario para crear una cuenta.

| Campo | Tipo | Obligatorio | Reglas |
|------|------|-------------|--------|
| `NombreCompleto` | `string` | Si | No vacio, acepta caracteres alfabeticos y separadores comunes (espacio, apostrofe, guion). |
| `CorreoElectronico` | `string` | Si | Formato de correo valido; se ignoran espacios al inicio/fin. |
| `Contrasena` | `string` | Si | Longitud minima 8 caracteres. |
| `ConfirmarContrasena` | `string` | Si | Debe coincidir exactamente con `Contrasena`. |
| `AceptaTerminos` | `boolean` | Si | Debe ser `true` para habilitar envio exitoso. |

### ResultadoValidacionRegistro
Representa el resultado de validacion por campo para feedback inline.

| Campo | Tipo | Descripcion |
|------|------|-------------|
| `EsValido` | `boolean` | Indica si el formulario completo puede enviarse. |
| `Errores` | `Record<string, string>` | Mapa de errores por campo (`NombreCompleto`, `CorreoElectronico`, `Contrasena`, `ConfirmarContrasena`, `AceptaTerminos`). |

### ResultadoRegistro
Representa la salida del caso de uso de registro.

| Campo | Tipo | Descripcion |
|------|------|-------------|
| `Exitoso` | `boolean` | Estado final del intento de registro. |
| `TipoError` | `'Ninguno' \| 'CorreoExistente' \| 'TecnicoTransitorio'` | Clasifica el motivo de falla para presentar el feedback correcto. |
| `Mensaje` | `string` | Mensaje para retroalimentacion y/o redireccion. |
| `RutaSiguiente` | `string` | Ruta destino post-registro (`/login`). |

## Relationships
- `FormularioRegistro` es la entrada de `RegisterService`.
- `RegisterService` produce `ResultadoRegistro` y depende de una validacion previa expresada en `ResultadoValidacionRegistro`.
- `ResultadoValidacionRegistro` alimenta la UI para mostrar mensajes inline por campo.

## State Transitions
1. `Idle`: formulario inicial sin envio.
2. `Editing`: usuario modifica campos y dispara validaciones inline.
3. `Invalid`: existen errores de validacion; envio bloqueado.
4. `Submitting`: formulario valido y en proceso de registro, boton deshabilitado con estado de carga.
5. `Success`: registro exitoso; redireccion a `/login` con mensaje.
6. `FailureDuplicateEmail`: fallo por correo existente; error inline en correo y retorno a `Editing`.
7. `FailureTransient`: fallo tecnico/transitorio; banner/mensaje "No pudimos crear tu cuenta. Intenta nuevamente." y retorno a `Editing`.
