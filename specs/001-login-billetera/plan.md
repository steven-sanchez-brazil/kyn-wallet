# Implementation Plan: Registro de Billetera Virtual

**Branch**: `[001-login-billetera]` | **Date**: 2026-06-04 | **Spec**: [spec.md](spec.md)

## Summary

Build a registration-first wallet entry screen that matches the Figma frame `04 · Registro`, using Next.js App Router and Tailwind CSS. The screen collects name, email, password, confirm password, and terms acceptance, validates inputs locally, simulates account creation with hardcoded demo data, and redirects successful registration to the login screen designed from the Figma frame `01 · Login`.

**Scale/Scope**: Single registration flow, one login destination page, and one existing login entry point from registration
## Technical Context

**Language/Version**: TypeScript with React 18 and Next.js App Router

**Primary Dependencies**: next, react, react-dom, tailwindcss

**Storage**: In-memory session state and hardcoded demo account data; no persistent backend storage

**Testing**: Next.js build/type checks plus browser-level smoke verification for validation and route protection

**Target Platform**: Web browsers on desktop and mobile

**Project Type**: Web application

**Constraints**: No external auth service; validation must happen locally; protected routes must reject unauthenticated access; styling must use Tailwind CSS; folder structure must center on app/, components/, and lib/

**Scale/Scope**: Single registration flow, one login destination page, and one existing login entry point from registration

## Constitution Check

*GATE: Must pass before Phase 0 research. Re-check after Phase 1 design.*

| Gate | Status | Notes |
|---|---|---|
| TDD | PASS | The implementation plan will start with failing tests for validation and route protection before code changes.
| SOLID | PASS | Responsibilities are split between page composition, reusable components, and pure helper functions.
| Clean Architecture | PASS | UI, validation, and session helpers are separated so business rules stay out of page markup.
| DRY / YAGNI | PASS | Shared form and auth helpers avoid duplication; only the registration path and protected destination are in scope.
| Security / Validation | PASS | Inputs are validated locally and protected routes require authenticated state.
| No external libraries | FAIL, justified | The user explicitly requested React, Next.js, and Tailwind CSS, which are external frameworks/libraries; this is necessary to satisfy the requested stack.

## Project Structure

### Documentation (this feature)

```text
specs/001-login-billetera/
├── plan.md
├── research.md
├── data-model.md
├── quickstart.md
├── contracts/
│   └── routes.md
└── tasks.md
```

### Source Code (repository root)

```text
app/
├── layout.tsx
├── page.tsx
├── register/
│   └── page.tsx
├── login/
│   └── page.tsx

components/
├── BrandPanel.tsx
├── RegistrationForm.tsx
├── SocialButtons.tsx
└── ProtectedRoute.tsx

lib/
├── auth/
│   ├── demoUsers.ts
│   ├── session.ts
│   └── validation.ts
└── routes.ts
```

**Structure Decision**: Use a single Next.js app with route segments under `app/`, shared presentation components under `components/`, and pure auth/session helpers under `lib/`. This matches the user request and keeps page composition separate from validation and state logic.

## Complexity Tracking

| Violation | Why Needed | Simpler Alternative Rejected Because |
|---|---|---|
| External frameworks/libraries | Next.js, React, and Tailwind CSS were explicitly requested | A plain HTML/CSS/JS implementation would not satisfy the requested stack |

