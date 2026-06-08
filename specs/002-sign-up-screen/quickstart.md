# Quickstart Validation Guide: Sign-Up Screen (002-sign-up-screen)

This guide provides step-by-step instructions to validate that the sign-up screen operates exactly as specified.

## Prerequisites

* Node.js (v18 or higher recommended)
* NPM or Yarn package manager
* Chrome, Firefox, or Safari browser for manual testing

## Setup Commands

1. **Clone and Install Dependencies**:
   ```bash
   npm install
   ```

2. **Run Development Server**:
   ```bash
   npm run dev
   ```
   Open [http://localhost:3000/register](http://localhost:3000/register) in your browser.

## Run Validation Tests

To verify all scenarios programmatically using Vitest, run:

```bash
npm run test -- --run
```

All 6 test suites and 20 tests (including unit, integration, and UI tests) must pass.

## Manual E2E Validation Scenarios

### Scenario 1: Successful Registration
1. Navigate to `/register`.
2. Observe the brand panel on the left (showing Steven Luna's Kyn Card) and the registration form on the right.
3. Input name: `Obi-Wan Kenobi`
4. Input email: `ben@kenobi.com` (Ensure it doesn't already exist in [Data Model](./data-model.md))
5. Input password: `maytheforce`
6. Input confirm password: `maytheforce`
7. Click the checkbox *"Acepto los Términos de servicio y la Política de privacidad"*.
8. Click the **"Registrarse"** button.
9. **Expected Outcome**: The button shows *"Creando cuenta..."* (loading state), then automatically redirects you to `/construction`.

### Scenario 2: Form Format Validation Errors (Real-Time)
1. Navigate to `/register`.
2. Input name: `Ob` (2 characters).
   * **Expected Outcome**: Real-time error `"El nombre debe tener al menos 3 caracteres"` is shown.
3. Input email: `obiwan@`
   * **Expected Outcome**: Real-time error `"Formato de correo inválido"` is shown.
4. Input password: `short` (5 characters).
   * **Expected Outcome**: Real-time error `"La contraseña debe tener al menos 8 caracteres"` is shown.
5. Input confirm password: `different`
   * **Expected Outcome**: Real-time error `"Las contraseñas no coinciden"` is shown.

### Scenario 3: Email Already Registered Error
1. Navigate to `/register`.
2. Fill all fields with valid data, but use the email `luke@skywalker.com` (which is already pre-populated in the mock database).
3. Click the registration checkbox and press **"Registrarse"**.
4. **Expected Outcome**: A red error banner appears at the bottom of the form stating: `"Este correo electrónico ya se encuentra registrado"`.
