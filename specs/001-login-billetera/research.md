# Research: Registro de Billetera Virtual

## Decisions

- Decision: Use Next.js App Router with React 18.
  - Rationale: The feature is a page-driven web flow with a protected destination and an obvious route structure, which maps cleanly to App Router.
  - Alternatives considered: Pages Router, custom SPA routing, server-rendered templates.

- Decision: Use Tailwind CSS for all styling.
  - Rationale: The requested layout is a polished form/card screen with responsive spacing, and Tailwind keeps the implementation local to the app without creating custom CSS sprawl.
  - Alternatives considered: CSS Modules, plain CSS, styled-components.

- Decision: Keep auth simulated with hardcoded demo data in `lib/auth/demoUsers.ts`.
  - Rationale: The feature only needs a demo registration flow and a protected redirect, not a real backend identity system.
  - Alternatives considered: External auth providers, server database, cookies backed by an API.

- Decision: Separate validation logic into pure helpers in `lib/auth/validation.ts`.
  - Rationale: This makes the validation rules testable in isolation and keeps the page component focused on UI state.
  - Alternatives considered: Inline validation in the page, a form library, server-side validation only.

- Decision: Model navigation with a simple session flag in `lib/auth/session.ts` and use `/login` as the post-registration destination.
  - Rationale: The demo flow only needs to preserve access state and route users into the login screen after signup.
  - Alternatives considered: Full token-based auth, backend sessions, middleware-backed ACLs, redirecting to a separate placeholder destination.

## Notes

- The Figma frame `04 · Registro` includes a left brand panel, a right registration form, social sign-in buttons, and a visible `Inicia sesión` link.
- The Figma frame `01 · Login` should be used for the destination screen reached after login navigation or successful registration.
- The implementation should preserve those visual cues while keeping the business logic simple and local.
