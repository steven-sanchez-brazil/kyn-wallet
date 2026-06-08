# Quickstart: Registro de Billetera Virtual

## Prerequisites

- Next.js app scaffolded with `app/`, `components/`, and `lib/`.
- Tailwind CSS configured for the project.

## Run the app

```bash
npm install
npm run dev
```

## Validate the feature

1. Open the registration route and confirm the screen matches the `04 · Registro` layout.
2. Submit the form with missing or invalid fields and confirm the errors are shown inline or in a visible message area.
3. Submit valid data and confirm the app redirects to the login screen.
4. Open the login route and confirm the screen matches the `01 · Login` layout and uses the same brand colors and visual language as registration.
5. Click `Inicia sesión` and confirm the app navigates to the login path.

## Expected outcome

- Registration is blocked until the input rules are satisfied.
- Successful registration sets the simulated authenticated state and lands on login.
- Protected navigation is denied without authentication on any route that requires it.
