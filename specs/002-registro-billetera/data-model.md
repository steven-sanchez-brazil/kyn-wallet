# Data Model: Registro de Billetera Virtual

## Entities

### UserRegistrationData
Representa los datos recolectados en el formulario de registro.

| Field | Type | Validation Rules |
|-------|------|------------------|
| FullName | string | Required |
| Email | string | Required, must be valid email format |
| Password | string | Required, min 8 characters |
| ConfirmPassword | string | Required, must match Password |
| TermsAccepted | boolean | Must be true |

### RegistrationResponse
Resultado de la operación de registro.

| Field | Type | Description |
|-------|------|-------------|
| Success | boolean | Indica si el registro fue exitoso |
| ErrorMessage | string? | Mensaje de error en caso de falla |

## State Transitions

- **Idle**: Formulario vacío o inicializado.
- **Validating**: El sistema verifica las reglas de negocio antes de enviar.
- **Submitting**: Se llama al `AuthService` para persistir el usuario.
- **Success**: Redirección a `/login`.
- **Error**: Se muestran mensajes de error específicos (ej: "Correo ya registrado").
