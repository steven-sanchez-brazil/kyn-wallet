# Quickstart Validation Guide: User Registration

This document details critical end-to-end execution paths, prerequisites, and automated validation tests to prove that the User Registration screen conforms to our design specification and technical constraints.

## Prerequisites & Installation

Verify your local sandbox includes Node.js and packages:
```powershell
# Install workspace dependencies from root
npm install
```

---

## 1. Automated Test Suites (TDD Alignment)

We use `vitest` for fast and clean unit logic validation. Run tests to confirm zero regressions:

```powershell
# Run validation and form test suites
npm run test
```

### Key Target Coverage Files (to be implemented)
* **Unit Rules**: `lib/utils/Validation.test.ts`
* **Service Lifecycle**: `lib/services/AuthService.test.ts`
* **Form Render & State Tests**: `components/RegisterForm.test.tsx`

---

## 2. Interactive Acceptance Scenarios

To validate end-to-end user satisfaction manually, run the local Next.js dev server and execute the scripts:

```powershell
# Start Next.js Development Server
npm run dev
```
Open browser and navigate to: `http://localhost:3000/registry`

### Scenario A: Successful User Registration & Redirection
1. Navigate to `/registry`. Confirm desktop screen shows dual brand-layout, while narrow layout (<1024px) hides the branding panel automatically.
2. Complete inputs with valid credentials:
   - **Nombre completo**: `Steven Luna`
   - **Correo electrónico**: `steven@kynwallet.com`
   - **Contraseña**: `KynSecure2026!`
   - **Confirmar contraseña**: `KynSecure2026!`
3. Select the check container **Acepto los términos y condiciones**.
4. Click **Crear cuenta**.
5. **Expected Outcome**: Form state passes to "Procesando...", locks elements, switches route after 500ms to `/login`, and flashes a visual success alert banner indicating successful registration.

### Scenario B: Dynamic Login Authorization
1. Following successful registration under Scenario A, the user is redirected to the login container (`/` or `/login`).
2. Input credentials matching the registered account:
   - **Correo electrónico**: `steven@kynwallet.com`
   - **Contraseña**: `KynSecure2026!`
3. Click **Iniciar sesión**.
4. **Expected Outcome**: Authentication parses successfully by looking up standard localStorage credentials. The page redirects to `/construction`, proving dynamic storage coherence.

### Scenario C: Social Registrations Soft Gate
1. Click Either **Google** or **Apple** on the Registry page.
2. **Expected Outcome**: The user receives a message/alert indicating: *"Google/Apple estará disponible próximamente."*
