# Route Contract: Registro de Billetera Virtual

## `/register`

Purpose: Show the registration screen from the Figma frame and collect user details.

UI contract:
- Left brand panel with product identity and marketing copy.
- Right-side form with full name, email, password, confirm password, terms checkbox, social buttons, and the `Inicia sesión` link.
- Primary action label: `Crear cuenta`.

Behavior:
- Validate all fields before submission.
- Reject missing or malformed input with visible feedback.
- On success, create the simulated session and redirect to `/login`.

## `/login`

Purpose: Show the login screen based on the Figma `01 · Login` frame and provide the visible entry point for users who already have an account.

Behavior:
- Exposed as a navigation target from the registration screen and as the redirect target after successful registration.
- Shares the same brand palette, typography scale, and overall visual language as the registration screen.
- Social buttons may show the "Proximamente" message until the login actions are fully implemented.
