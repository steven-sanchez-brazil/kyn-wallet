# Implementation Plan: Sign-Up Screen

**Branch**: `002-sign-up-screen` | **Date**: 2026-06-08 | **Spec**: [specs/002-sign-up-screen/spec.md](specs/002-sign-up-screen/spec.md)
**Input**: Feature specification from `/specs/002-sign-up-screen/spec.md`

## Summary

Implement a responsive, pixel-perfect sign-up screen (`/register`) that matches the Figma prototypes. The interface features a dual-pane split on desktop (Brand panel with Kyn Card on the left, sign-up form on the right) and stacks vertically on mobile (hiding the Brand panel). It executes strict client-side real-time validation on all fields without external libraries, persists new users in-memory inside a simulated `AuthService` pre-loaded with Star Wars characters, and redirects successful sign-ups to a `/construction` placeholder.

## Technical Context

**Language/Version**: TypeScript 5.x, React 18.x
**Primary Dependencies**: Next.js 14.2.3, Tailwind CSS 3.4.1 (No external UI or validation libraries)
**Storage**: Pure in-memory array (`MOCK_USERS`) on the client-side `AuthService` singleton, resetting on page refresh.
**Testing**: Vitest (`vitest` 1.6.0) with `@testing-library/react` and `@testing-library/jest-dom` for automated unit and integration tests.
**Target Platform**: Modern Web Browsers (Responsive across Mobile, Tablet, and Desktop resolutions).
**Project Type**: Single-project Next.js Web Application.
**Performance Goals**: Instant client-side validation (<100ms lag) and fast, responsive feedback on key inputs.
**Constraints**: Zero external validation/UI frameworks. All components and files follow `PascalCase` naming convention. All custom inputs are strictly validated.
**Scale/Scope**: Single register view and form component integrated with simulated backend services.

## Constitution Check

*GATE: Must pass before Phase 0 research. Re-check after Phase 1 design.*

- [x] **TDD**: Is the test strategy defined before implementation? Yes, tests are fully specified and executed using Vitest.
- [x] **SOLID**: Does the design enforce SOLID principles? Yes, the register logic and brand pane are separated into dedicated, single-responsibility React components.
- [x] **Clean Architecture**: Are layers strictly separated with inward dependencies? Yes, services and utilities in `lib/` are completely detached from UI components in `components/` and routing in `app/`.
- [x] **DRY & YAGNI**: Is the design free of unnecessary complexity and duplicated code? Yes, shared layout, `BrandPanel`, custom inputs, and button components are fully reused.
- [x] **Naming**: Does the plan respect `PascalCase` for structures? Yes, components (e.g., `RegisterForm`, `BrandPanel`) and services (e.g., `AuthService`) follow standard casing.
- [x] **Dependencies**: Is the solution completely free of external libraries? Yes, built entirely with native React hooks, custom regex utilities, and Tailwind CSS.
- [x] **Security**: Are all inputs validated and protected routes authenticated? Yes, strict real-time validation checks are active on all form fields (Name, Email, Password, Confirmation).

## Project Structure

### Documentation (this feature)

```text
specs/002-sign-up-screen/
├── plan.md              # This file
├── research.md          # Phase 0 output
├── data-model.md        # Phase 1 output
├── quickstart.md        # Phase 1 output
└── contracts/           # Phase 1 output
    └── auth-service.md  # Service interface contracts
```

### Source Code (repository root)

```text
app/
├── layout.tsx
├── globals.css
├── page.tsx             # Login Screen
├── register/
│   └── page.tsx         # Sign-Up Screen
├── construction/
│   └── page.tsx         # Construction Screen
└── register.test.tsx    # Page Integration Tests

components/
├── BrandPanel.tsx       # Brand Panel (Left Pane)
├── SocialLogins.tsx     # Social Authentication Panel
├── RegisterForm.tsx     # Sign-Up Form Component
├── RegisterForm.test.tsx# Form Component Tests
└── ui/
    ├── Input.tsx        # Styled Custom Input Component
    └── Button.tsx       # Styled Custom Button Component

lib/
├── services/
│   ├── AuthService.ts   # In-Memory Simulated Auth Service
│   └── AuthService.test.ts
├── utils/
│   ├── Validation.ts    # Custom Validation Functions
│   └── Validation.test.ts
└── types/
    └── Auth.ts          # Authentication Type Specifications
```

**Structure Decision**: Option 1: Single project (DEFAULT). All components, styles, tests, and business logic reside within the root-level directories (`app/`, `components/`, and `lib/`), promoting maximum local modularity and simplicity.

## Complexity Tracking

> **Fill ONLY if Constitution Check has violations that must be justified**

No constitution violations detected or required. The architecture adheres to all constraints and principles strictly.

