# Data Model: Registro de Usuarios

## Entidades

### RegistroUsuarioInput
Representa el payload del formulario de registro previo al envio.

| Campo | Tipo | Reglas de validacion | Descripcion |
|---|---|---|---|
| `nombreCompleto` | `string` | Obligatorio, trim, longitud > 0 | Nombre y apellido del usuario. |
| `correoElectronico` | `string` | Obligatorio, formato email valido | Identificador de acceso del usuario. |
| `contrasena` | `string` | Obligatorio, minimo 8 caracteres | Credencial primaria para login. |
| `confirmarContrasena` | `string` | Obligatorio, debe coincidir con `contrasena` | Confirmacion de credencial. |
| `aceptaTerminos` | `boolean` | Debe ser `true` | Confirmacion legal requerida para registro. |

### ErroresRegistro
Mapa de errores inline por campo y validaciones globales del formulario.

| Campo | Tipo | Descripcion |
|---|---|---|
| `nombreCompleto` | `string | null` | Mensaje de error del campo nombre. |
| `correoElectronico` | `string | null` | Mensaje de error del campo correo. |
| `contrasena` | `string | null` | Mensaje de error del campo contrasena. |
| `confirmarContrasena` | `string | null` | Mensaje de error de confirmacion. |
| `aceptaTerminos` | `string | null` | Mensaje de error del checkbox. |
| `formulario` | `string | null` | Mensaje general opcional para estado global. |

### ResultadoRegistro
Resultado de la simulacion de alta de usuario.

| Campo | Tipo | Descripcion |
|---|---|---|
| `exitoso` | `boolean` | Indica si el registro fue procesado correctamente. |
| `mensaje` | `string` | Mensaje para mostrar en `/login` tras redireccion. |
| `redirectTo` | `string` | Ruta de destino esperada (`/login`). |

## Relaciones

- `RegistroUsuarioInput` se valida y produce `ErroresRegistro`.
- Si no hay errores, `RegistroUsuarioInput` produce `ResultadoRegistro` exitoso.
- `ResultadoRegistro.mensaje` se transporta a la pantalla de login para feedback.

## Transiciones de estado

1. `Idle` -> Formulario inicial vacio.
2. `Editing` -> Usuario ingresa datos; se recalculan validaciones inline.
3. `Invalid` -> Existen errores en `ErroresRegistro`; submit bloqueado.
4. `Submitting` -> Formulario valido; se ejecuta simulacion de registro.
5. `SuccessRedirect` -> Se navega a `/login` con mensaje de exito.

## Reglas de negocio clave

- No se procesa submit con ningun campo invalido.
- Los espacios en blanco al inicio/fin se tratan con `trim` para validacion.
- El flujo social (Google/Apple) no registra usuarios; solo informa "Proximamente".
