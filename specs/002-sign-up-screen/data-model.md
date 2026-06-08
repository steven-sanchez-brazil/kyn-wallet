# Data Model: Sign-Up Screen (002-sign-up-screen)

This document specifies the entities, validation rules, state transitions, and design tokens used for the sign-up screen feature.

## 1. Core Entities

### User Entity
Represents a user registered in the simulated system.

```typescript
export interface User {
  Name: string;      // Full name, minimum 3 characters, trailing/leading spaces trimmed
  Email: string;     // Unique identifier, email format validated, lowercase normalized
  Password: string;  // Secret password, minimum 8 characters
}
```

### RegisterCredentials Entity
Represents the input payload required to perform a new registration.

```typescript
export interface RegisterCredentials {
  Name: string;
  Email: string;
  Password: string;
}
```

## 2. Validation Rules & Constraints

| Attribute | Constraint / Rule | Error Message | Trimming / Pre-processing |
|---|---|---|---|
| **Name** | Minimum length: 3 characters | `"El nombre debe tener al menos 3 caracteres"` | Trim leading and trailing whitespace |
| **Email** | Valid email regex pattern: `^[^\s@]+@[^\s@]+\.[^\s@]+$` | `"Formato de correo inválido"` | Trim whitespace and convert to lowercase |
| **Password** | Minimum length: 8 characters | `"La contraseña debe tener al menos 8 caracteres"` | None |
| **Confirm Password** | Must match Password exactly | `"Las contraseñas no coinciden"` | None |
| **Unique Email** | Email must not exist in `MOCK_USERS` | `"Este correo electrónico ya se encuentra registrado"` | Compared after lowercase normalization |

## 3. State Transitions

The sign-up page state transitions through the following lifecycle states:

```text
[ Idle / Empty Form ]
         │
         ▼ (User Types)
[ Input Validation ] ── (Invalid Input) ──► [ Show Validation Error ]
         │ (All inputs valid & agreed)
         ▼ (User Clicks "Registrarse")
[ Submitting (Loading) ]
         ├── (Email Conflict Error) ──────► [ Show General Error (Email registered) ]
         └── (Success) ──────────────────► [ Add User to MOCK_USERS ] ──► [ Redirect to /construction ]
```

## 4. Design Tokens (Figma Alignment)

To maintain pixel-perfect parities with the Figma screen design:

* **Brand Panel (Left Pane)**:
  * Hidden on mobile screens (`hidden lg:flex`).
  * Width: 50% on desktop (`w-full lg:w-1/2`).
  * Gradient Background: Orange gradient with a Kyn Card container.
  * Card text: `"STEVEN LUNA"`.

* **Form Panel (Right Pane)**:
  * Centered layout: `flex flex-col justify-center items-center p-8 bg-white`.
  * Form inputs use standard KynWallet design system:
    * Background color: neutral grays or white.
    * Borders: `border-neutral-300` and `focus:ring-brand-primary`.
    * Border radius: `rounded-lg` (equivalent to 12px or `rounded-xl`).
