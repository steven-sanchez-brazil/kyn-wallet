# Data Model: Registro de Usuarios

## Entities

### RegistroUsuario
Representa los datos capturados en el formulario para crear una cuenta.

| Campo | Tipo | Validacion | Descripcion |
|-------|------|------------|-------------|
| `FullName` | `string` | Obligatorio, 2-80 caracteres, trim | Nombre visible del usuario. |
| `Email` | `string` | Obligatorio, formato email valido, trim/lowercase | Identificador de acceso unico. |
| `Password` | `string` | Obligatorio, minimo 8 caracteres | Credencial principal. |
| `ConfirmPassword` | `string` | Debe coincidir con `Password` | Verificacion de contrasena. |
| `AcceptTerms` | `boolean` | Debe ser `true` | Consentimiento requerido para registro. |

### RegistroUsuariosCompartido
Representa el origen de datos unico de usuarios para registro y login.

| Campo | Tipo | Validacion | Descripcion |
|-------|------|------------|-------------|
| `Users` | `RegistroUsuario[]` | Sin duplicados por `Email` | Coleccion de usuarios registrados disponibles para autenticacion. |
| `UpdatedAt` | `string` | Timestamp ISO-8601 | Marca de ultima actualizacion del registro. |

### EstadoFormularioRegistro
Representa estado visual y funcional del formulario.

| Campo | Tipo | Valores |
|-------|------|---------|
| `FieldErrors` | `Record<string, string>` | Mensajes de error por campo |
| `IsSubmitting` | `boolean` | `true` durante envio |
| `SubmitStatus` | `string` | `idle`, `success`, `error` |
| `GeneralError` | `string \| null` | Error global del intento |

### ReferenciaDisenoRegistro
Representa restricciones visuales criticas para QA de UI.

| Campo | Tipo | Regla |
|-------|------|-------|
| `CardMockupPanelPosition` | `string` | Conserva posicion relativa en desktop respecto al panel de formulario |
| `Headline1Position` | `string` | Debe mantener jerarquia superior de texto principal |
| `Headline2Position` | `string` | Debe mantener jerarquia secundaria bajo headline 1 |
| `ResponsiveMode` | `string` | Reflujo permitido en mobile sin perder contenido esencial |

## Relationships

- `RegistroUsuario` alimenta validaciones de `EstadoFormularioRegistro`.
- `RegistroUsuario` validado se inserta en `RegistroUsuariosCompartido` cuando el registro es exitoso.
- `EstadoFormularioRegistro` controla feedback visual y habilitacion de acciones de envio.
- `ReferenciaDisenoRegistro` define criterios de aceptacion visual para la composicion del registro.
- `Login` consulta `RegistroUsuariosCompartido` como la misma fuente de verdad usada por registro.

## State Transitions

1. `idle` -> `error`
- Trigger: intento de envio con datos invalidos.
- Resultado: errores por campo y/o error general.

2. `idle` -> `submitting`
- Trigger: envio con datos localmente validos.
- Resultado: bloqueo temporal de boton y feedback de progreso.

3. `submitting` -> `success`
- Trigger: respuesta positiva del servicio de registro.
- Resultado: mensaje de confirmacion y ruta de continuidad (login o siguiente paso).

4. `submitting` -> `error`
- Trigger: rechazo del servicio (correo ya existente o fallo operativo).
- Resultado: mensaje de error recuperable y opcion de reintento.
