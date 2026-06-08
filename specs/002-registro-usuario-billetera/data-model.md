# Data Model: Registro de Usuario Kyn-Wallet

## 1) Usuario

- Purpose: Representa una cuenta autenticable en Kyn-Wallet.
- Fields:
  - FullName: string (requerido, no vacio)
  - Email: string (requerido, formato valido, unico)
  - Password: string (requerido, minimo 8 caracteres)
  - TermsAccepted: boolean (debe ser true para alta)
  - CreatedAt: string (timestamp ISO en alta exitosa)
- Validation Rules:
  - FullName.trim().length > 0
  - Email cumple regex de correo
  - Password.length >= 8
  - TermsAccepted === true
  - Email no debe existir previamente en la fuente compartida
- State Transitions:
  - Draft -> Validated -> Persisted
  - Draft -> Invalid (si falla cualquier regla)

## 2) RegistroFormState

- Purpose: Estado transitorio del formulario en UI para renderizar validaciones inline.
- Fields:
  - FullName: string
  - Email: string
  - Password: string
  - ConfirmPassword: string
  - TermsAccepted: boolean
  - Errors: map<string, string>
- Validation Rules:
  - ConfirmPassword debe coincidir con Password
  - Errors solo contiene claves con mensajes activos
- State Transitions:
  - Pristine -> Editing -> Invalid/Valid -> Submitting -> Success/Failure

## 3) ResultadoRegistro

- Purpose: Resultado funcional del intento de alta de usuario.
- Fields:
  - Success: boolean
  - ErrorCode: string | null (e.g., EMAIL_EXISTS, VALIDATION_ERROR)
  - Message: string
- Validation Rules:
  - Si Success es true, ErrorCode es null
  - Si Success es false, Message debe informar causa
- State Transitions:
  - Created al finalizar submit

## 4) FuenteUsuariosCompartida

- Purpose: Fuente unica para consulta y alta de usuarios utilizada por Registro y Login.
- Shape:
  - Users: Usuario[]
- Validation Rules:
  - Debe preservar unicidad por Email
  - Debe exponer operaciones de lectura y escritura coherentes
- State Transitions:
  - Initialized -> Updated (alta) -> Queried (login)

## Relationships

- RegistroFormState produce datos candidatos para Usuario.
- Validacion genera ResultadoRegistro.
- ResultadoRegistro exitoso persiste Usuario en FuenteUsuariosCompartida.
- Login consume FuenteUsuariosCompartida para autenticar credenciales.
