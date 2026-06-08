# Research: Sign-Up Screen (002-sign-up-screen)

This document resolves the technical research, architectural decisions, and alternatives considered for implementing the sign-up screen feature.

## Technical Decisions

### 1. In-Memory Simulated State for Users
* **Decision**: Manage the simulated user database via an in-memory module-level array (`MOCK_USERS`) defined in the `AuthService` singleton (`lib/services/AuthService.ts`).
* **Rationale**:
  * Directly satisfies the constraint: *"Los datos deben manejarse en memoria pura en el servicio simulado, persistiendo los nuevos usuarios durante el ciclo de vida de la aplicación."*
  * Since Next.js uses client-side routing, module-level variables persist across page transitions (e.g., from `/` to `/register` and `/construction`) as long as the page is not hard-refreshed.
  * Simple and dependency-free.
* **Alternatives Considered**:
  * **LocalStorage**: Rejected because the spec states that data must be reset to the original state upon page reload (*"al recargar el navegador se reiniciarán a su estado original"*).
  * **React Context**: Rejected as unnecessary overhead. Using a singleton service aligns better with Clean Architecture (separating UI layer from Domain/Application services layer).

### 2. Custom Validation Lógica (No External Libraries)
* **Decision**: Implement custom regular expression validations and checks inside `lib/utils/Validation.ts` for email format, password length, and name length.
* **Rationale**:
  * Satisfies the constraint: *"El uso de librerías externas de interfaz de usuario o validación está estrictamente prohibido. Toda la UI y lógica debe implementarse con React nativo, Tailwind CSS y lógica custom."*
  * Custom validators keep the bundle light and provide fast validation feedback (<100ms) on each keystroke (real-time validation constraint).
* **Alternatives Considered**:
  * **Zod / Yup**: Strictly prohibited by dependencies constraints.

### 3. Component Reusability and Organization (SOLID & DRY)
* **Decision**: Reuse existing core components like `BrandPanel`, `ui/Input`, and `ui/Button` for the `/register` page, maintaining exact alignment with the Figma design token specifications.
* **Rationale**:
  * Satisfies SOLID (Single Responsibility) and DRY (Don't Repeat Yourself) principles.
  * Maintains high visual fidelity and pixel-perfect responsiveness with the login page.
* **Alternatives Considered**:
  * **Monolithic Screen Component**: Rejected because duplicate markup of `BrandPanel` and input fields would violate DRY and make maintenance extremely difficult.

## Verification & Testing Strategy
* **Unit Testing**: Test the validation utilities (`lib/utils/Validation.ts`) and `AuthService.ts` edge cases (collisions of emails, trimming of names, etc.).
* **Component Testing**: Test `RegisterForm.tsx` to verify that real-time validation error messages appear immediately upon invalid inputs and disappear when corrected.
* **Integration/E2E Testing**: Verify that filling out the registration form with valid Star Wars fictive data and submitting successfully redirects the user to `/construction` and registers the user in the simulated array.
