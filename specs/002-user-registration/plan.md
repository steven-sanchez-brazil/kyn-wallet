# Implementation Plan: Register Screen (KynWallet)

**Branch**: `002-user-registration` | **Date**: 2026-06-08 | **Spec**: [specs/002-user-registration/spec.md](specs/002-user-registration/spec.md)
**Input**: Feature specification from `specs/002-user-registration/spec.md`

## Summary

The objective of this feature is to deploy a responsive User Registration screen (`/register`) that matches the Mockup **04 · Registro** of Figma (ID `31:2`). Following Spec Driven Development and TDD, we will write tests first, design a clean client-side validation logic entirely free of external libraries (such as form hooks or validation suites), and extend our virtual auth model so that registered users can dynamically log in using the existing simulated authentication service.

## Technical Context

**Language/Version**: TypeScript / ES2022  
**Primary Dependencies**: Next.js 14+ (App Router), React 18, Tailwind CSS  
**Storage**: Client-side storage (dynamic extension of standard simulated auth state list via `localStorage` and memory sync)  
**Testing**: Vitest with React Testing Library  
**Target Platform**: Desktop + Mobile Web (responsiveness break-point at 1024px)  
**Project Type**: Web Application  
**Performance Goals**: Instant inline input validation feedbacks (< 100ms lag), < 1500ms login redirection upon registry  
**Constraints**: Absolute no-external-library constraint for inputs, validation, and layout. No icons library (using native inline SVG). Adherence to `PascalCase` for form structures and component conventions.

## Constitution Check

*GATE: Passed. Complies fully with the KynWallet Project Constitution.*

- [x] **TDD**: Tests for validation rules and React component form interactions will be written prior to logic and layout.
- [x] **SOLID**: Separation of concerns between component (presentational), hook/validator (behavior validation logic), and AuthService (storage/auth data logic).
- [x] **Clean Architecture**: Register screen references abstract layers (service interfaces, validators) rather than low-level DB / storage directly.
- [x] **DRY & YAGNI**: Reusing pre-configured custom `<Input>` and `<Button>` components, and integrating with the existing branding layout components without duplicating them.
- [x] **Naming**: Strict usage of `PascalCase` for React components (`RegisterForm`, `RegisterPage`) and types (`UserRegisterData`).
- [x] **Dependencies**: No external validation libraries (yup, zod) or form engines (formik, react-hook-form). Custom pure TypeScript regex-driven logic.
- [x] **Security**: Complete client-side sanitation and strict structure validation before committing registration objects to state.

## Project Structure

### Documentation (this feature)

```text
specs/002-user-registration/
├── spec.md              # Feature specification
├── plan.md              # This file (tech context, constitution check, layout, decisions)
├── research.md          # Domain and constraints research (TDD, external library constraints)
├── data-model.md        # Feature contracts & representation data structures
├── quickstart.md        # User and automation acceptance instructions 
├── contracts/  
│   └── auth-service.md  # Dynamic memory & service storage contract updates
└── checklists/
    └── requirements.md  # QA checklist for design & spec
```

### Source Code (repository root)

```text
app/
├── registry/
│   └── page.tsx              # Page definition mapping to '/registry' route
├── page.tsx                  # Root login page mapping directly to '/login' (and/or default page)
└── login.test.tsx

components/
├── BrandPanel.tsx            # Pre-existing Left Desktop branding component
├── RegisterForm.tsx          # Main registration form component
├── RegisterForm.test.tsx     # Comprehensive unit tests for registration form (TDD)
└── ui/
    ├── Input.tsx             # Pre-configured UI input elements
    └── Button.tsx            # Pre-configured UI button elements

lib/
├── constants/
│   └── DesignTokens.ts       # Visual parameters matching Figma values
├── services/
│   ├── AuthService.ts        # Abstract and concrete representation of Auth (updated for localStorage)
│   └── AuthService.test.ts
├── types/
│   └── Auth.ts               # Core model interfaces including signup objects
└── utils/
    ├── Validation.ts         # Logic validators for full-name, password patterns and confirmation
    └── Validation.test.ts    # TDD validations testing
```

**Structure Decision**: Option 2 structure (Next.js Application standard) was chosen. Our new components map consistently to the pre-existing structure folders `app/`, `components/` and `lib/` as requested, extending the codebase without adding redundant layers.

## Complexity Tracking

*No violations require justification.*

