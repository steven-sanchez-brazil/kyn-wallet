# Contract: Registration and Authentication Shared Source

## Scope

Define el contrato funcional entre la pantalla de Registro y el servicio de autenticacion para garantizar fuente de usuarios compartida con Login.

## Contract 1: RegisterUser

- Operation: RegisterUser(Input) -> Output
- Input:
  - FullName: string
  - Email: string
  - Password: string
  - ConfirmPassword: string
  - TermsAccepted: boolean
- Preconditions:
  - Todos los campos obligatorios presentes
  - Email valido
  - Password minimo 8 caracteres
  - ConfirmPassword coincide con Password
  - TermsAccepted = true
- Postconditions:
  - Si exito: usuario persistido en fuente compartida y retorno Success=true
  - Si error: no persiste cambios y retorna codigo/mensaje de error
- Output:
  - Success: boolean
  - ErrorCode: string | null
  - Message: string
- UI Flow Binding:
  - Success MUST navigate to `/login?registered=1`
  - Duplicate email SHOULD render field-level error on `Email`
  - Validation failures SHOULD render inline errors in corresponding fields

## Contract 2: AuthenticateUser

- Operation: AuthenticateUser(Email, Password) -> boolean
- Preconditions:
  - Email y Password no vacios
- Postconditions:
  - Devuelve true solo si encuentra coincidencia exacta en fuente compartida
- Error Behavior:
  - Credenciales invalidas retornan false sin excepcion funcional
- UI Flow Binding:
  - Login exitoso MUST navigate to `/construction`
  - Si query param `registered=1` esta presente en `/login`, se debe mostrar mensaje de registro exitoso

## Contract 3: UserSourceConsistency

- Requirement:
  - Registro y Login DEBEN consumir la misma fuente de usuarios dentro del modulo de servicios.
- Invariants:
  - Unicidad por Email
  - Lectura consistente post-alta en misma sesion
- Compatibility:
  - Si existe fuente actual en AuthService, se extiende/reutiliza.
  - Si no existe, se crea UserSource en modulo comun y se conecta en ambos flujos.

## Non-Functional Contract Constraints

- Sin dependencias externas nuevas.
- Validaciones de entrada obligatorias antes de cualquier operacion de alta.
- Nombres de estructuras relevantes en PascalCase.
