# Implementation Plan: Registro de Billetera Virtual

**Branch**: `002-registro-billetera` | **Date**: 2026-06-08 | **Spec**: [spec.md](spec.md)
**Input**: Feature specification from `specs/002-registro-billetera/spec.md`

## Summary

Implement the registration screen for KynWallet with a split-panel layout (reusing parametrized BrandPanel + RegisterForm), full inline validation on blur, password visibility toggles, simulated registration service, and navigation to /login on success. Follows the same architecture patterns established in 001-login-billetera.

## Technical Context

**Language/Version**: TypeScript / Next.js 14 (App Router)  
**Primary Dependencies**: React 18, Next.js 14, Tailwind CSS 3.x  
**Storage**: N/A (simulated — no persistence)  
**Testing**: Vitest + React Testing Library + JSDOM  
**Target Platform**: Web (Responsive: 320px–1920px)  
**Project Type**: web-application  
**Performance Goals**: Inline validation < 1s, registration flow < 2min  
**Constraints**: No external UI libraries, strict PascalCase naming, passwords never in logs  
**Scale/Scope**: Single registration screen with 4 input fields, 1 checkbox, social buttons, link to login

## Constitution Check

*GATE: Must pass before Phase 0 research. Re-check after Phase 1 design.*

- [x] **TDD**: Is the test strategy defined before implementation? (Vitest + RTL, tests written before implementation per TDD cycle)
- [x] **SOLID**: Does the design enforce SOLID principles? (RegisterForm handles UI, RegisterService handles logic, Validation is isolated)
- [x] **Clean Architecture**: Are layers strictly separated with inward dependencies? (app/ → components/ → lib/services → lib/utils)
- [x] **DRY & YAGNI**: Is the design free of unnecessary complexity and duplicated code? (Reuses BrandPanel, SocialLogins, Input, Button, Checkbox from login; BrandPanel parametrized via props)
- [x] **Naming**: Does the plan respect `PascalCase` for structures? (RegisterForm.tsx, RegisterService.ts, etc.)
- [x] **Dependencies**: Is the solution completely free of external libraries? (Only Next.js/Tailwind as established base)
- [x] **Security**: Are all inputs validated and protected routes authenticated? (All inputs validated on blur + on submit; passwords never logged)

## Project Structure

### Documentation (this feature)

```text
specs/002-registro-billetera/
├── plan.md              # This file
├── research.md          # Phase 0 output
├── data-model.md        # Phase 1 output
├── quickstart.md        # Phase 1 output
├── checklists/
│   └── requirements.md
├── contracts/
│   └── register-service.md
└── spec.md              # Input spec
```

### Source Code (repository root)

```text
app/
├── layout.tsx
├── page.tsx
├── login/
│   └── page.tsx         # Shows success banner when ?registered=true
├── register/
│   ├── page.tsx         # Register page (BrandPanel + RegisterForm)
│   └── page.test.tsx    # Page-level tests
└── construction/
    └── page.tsx

components/
├── BrandPanel.tsx       # Parametrized: accepts headline/subtitle props
├── RegisterForm.tsx     # Registration form with validation
├── RegisterForm.test.tsx
├── LoginForm.tsx        # Existing (unchanged)
├── SocialLogins.tsx     # Reused (unchanged)
└── ui/
    ├── Button.tsx       # Reused (unchanged)
    ├── Checkbox.tsx     # Reused (unchanged)
    └── Input.tsx        # Enhanced: password visibility toggle (eye icon)

lib/
├── constants/
│   └── DesignTokens.ts  # Existing tokens (unchanged)
├── services/
│   ├── RegisterService.ts    # Simulated registration logic
│   └── RegisterService.test.ts
├── types/
│   └── Auth.ts          # Extended with RegisterData type
└── utils/
    ├── Validation.ts    # Extended: validateFullName, validatePasswordMatch
    └── Validation.test.ts
```

**Structure Decision**: Web application with Next.js App Router conventions, identical to 001-login-billetera. Shared components in `components/`, business logic in `lib/`, page routing in `app/`.

## Requirements Coverage Matrix

| Req ID | Component(s) | Description |
|--------|-------------|-------------|
| FR-001 | `RegisterForm`, `Input` | Form with fullName, email, password, confirmPassword fields |
| FR-002 | `RegisterForm`, `Checkbox` | Terms & conditions checkbox (mandatory) |
| FR-003 | `RegisterForm`, `Button` | "Crear cuenta" button with full validation |
| FR-004 | `RegisterForm`, `SocialLogins` | Google/Apple buttons → alert "Próximamente" |
| FR-005 | `RegisterForm` | "¿Ya tienes cuenta? Inicia sesión" → /login |
| FR-006 | `RegisterForm`, `RegisterService` | Redirect to /login?registered=true on success |
| FR-007 | `RegisterForm`, `Validation` | Inline email format validation on blur |
| FR-008 | `RegisterForm`, `Validation` | Inline password min 8 chars validation on blur |
| FR-009 | `RegisterForm`, `Validation` | Inline password match validation on blur |
| FR-010 | `RegisterForm`, `Validation` | All fields required before submit |
| FR-011 | `RegisterPage`, `BrandPanel` | Responsive: 2 panels desktop, form-only mobile |
| FR-012 | `RegisterService` | Simulated registration (always succeeds) |
| FR-013 | `Input` | Eye icon toggle for password/confirmPassword fields |
| FR-014 | `BrandPanel` | Parametrized headline/subtitle via props |
| FR-015 | `RegisterForm` | "términos y condiciones" link → alert "Próximamente" |

## Complexity Tracking

| Violation | Why Needed | Simpler Alternative Rejected Because |
|-----------|------------|-------------------------------------|
| Next.js / Tailwind | Explicit project directive; established in 001. | Building custom SSR/CSS is out of scope. |
| Eye icon (SVG inline) | FR-013 requires toggle visibility icon. Already implemented in Input component from 001. | Text-only toggle inconsistent with Figma. |
