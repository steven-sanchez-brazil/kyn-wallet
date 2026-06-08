# Data Model: Registro de Billetera Virtual

## Entities

### RegistrationFormData

Fields:
- fullName: string
- email: string
- password: string
- confirmPassword: string
- acceptTerms: boolean

Validation rules:
- fullName is required and must contain visible characters.
- email is required and must match a basic email format.
- password is required and must meet the minimum password policy defined for the demo.
- confirmPassword must match password.
- acceptTerms must be true before submit is accepted.

Relationships:
- Used by the registration page and validation helpers.

### DemoUser

Fields:
- fullName: string
- email: string
- password: string
- isRegistered: boolean

Validation rules:
- Email must be unique in the demo list.
- Password must match the expected demo credential or the newly registered password rule, depending on flow.

Relationships:
- Stored in `lib/auth/demoUsers.ts` and used by the simulated auth flow.

### AuthSession

Fields:
- isAuthenticated: boolean
- userEmail: string | null
- displayName: string | null
- createdAt: string | null

Validation rules:
- isAuthenticated can only be true after successful registration.
- userEmail and displayName must be populated when authenticated.

Relationships:
- Used by the login/register redirect logic and by any protected routes that may be added later.

### ProtectedRouteState

Fields:
- path: string
- requiresAuth: boolean
- redirectTo: string

Validation rules:
- Protected routes must define a redirect target for unauthenticated users.

Relationships:
- Applies to any route that must reject unauthenticated access.

## State Transitions

1. Unauthenticated user opens `/register`.
2. User submits valid form data.
3. Registration form creates a session and marks the user authenticated.
4. User is redirected to `/login`.
5. Access to protected routes without authentication redirects back to `/register` or `/login` depending on the route context.
