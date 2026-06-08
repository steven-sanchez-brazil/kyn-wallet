# Implementation Plan: Login Spec Update

**Branch**: `001-login-billetera` | **Date**: 2026-06-04 (Updated: 2026-06-08) | **Spec**: [spec.md](spec.md)
**Input**: Feature specification from `specs/001-login-billetera/spec.md`

## Summary

Implement a login screen for the KynWallet application using a split-panel design (Brand vs Form) that strictly follows the provided Figma design. The implementation includes authentication flow, password visibility toggle, navigation to registration, and full visual fidelity with Figma tokens. The technical stack is Next.js 14 (App Router), TypeScript, and Tailwind CSS, with custom design tokens and zero external UI library dependencies.

## Technical Context

**Language/Version**: TypeScript / Next.js 14 (App Router)  
**Primary Dependencies**: React 18, Next.js 14, Tailwind CSS 3.x  
**Storage**: In-memory (hardcoded users array)  
**Testing**: Vitest + React Testing Library + JSDOM (resolved in research.md)  
**Target Platform**: Web (Responsive)  
**Project Type**: web-application  
**Performance Goals**: Login completion < 30s, successful validation < 2s.  
**Constraints**: No external UI libraries (Radix, Shadcn, etc.), strict PascalCase naming.  
**Scale/Scope**: Login feature with navigation to registration and placeholder success screen.

## Constitution Check

*GATE: Must pass before Phase 0 research. Re-check after Phase 1 design.*

- [x] **TDD**: Is the test strategy defined before implementation? (Vitest + RTL confirmed)
- [x] **SOLID**: Does the design enforce SOLID principles? (Clean separation of UI, logic, and constants)
- [x] **Clean Architecture**: Are layers strictly separated with inward dependencies? (app/ for routing, components/ for UI, lib/ for logic)
- [x] **DRY & YAGNI**: Is the design free of unnecessary complexity and duplicated code? (Focused only on login requirements)
- [x] **Naming**: Does the plan respect `PascalCase` for structures? (Mandatory for all components and structures)
- [x] **Dependencies**: Is the solution completely free of external libraries? (Using only Next.js/Tailwind as base, no UI libs)
- [x] **Security**: Are all inputs validated and protected routes authenticated? (Validation FR-004 and FR-005)

## Project Structure

### Documentation (this feature)

```text
specs/001-login-billetera/
├── plan.md              # This file
├── research.md          # Phase 0 output
├── data-model.md        # Phase 1 output
├── quickstart.md        # Phase 1 output
├── checklists/
│   └── requirements.md
├── contracts/
│   └── auth-service.md
└── spec.md              # Input spec
```

### Source Code (repository root)

```text
app/
├── layout.tsx
├── page.tsx             # Login page (redirect to /login)
├── login/
│   └── page.tsx         # Login page
├── register/
│   └── page.tsx         # Registration page (future)
└── construction/
    └── page.tsx         # Placeholder success page

components/
├── BrandPanel.tsx       # Left panel with gradient, logo, headline, card mockup
├── LoginForm.tsx        # Right panel with form, social logins, footer links
├── SocialLogins.tsx     # Google/Apple buttons with divider
└── ui/
    ├── Button.tsx       # Primary CTA button
    ├── Checkbox.tsx     # Remember me checkbox
    └── Input.tsx        # Text/password input with toggle support (FR-009)

lib/
├── constants/
│   └── DesignTokens.ts  # Figma tokens (extended with Neutral 400/700, Brand/600)
├── services/
│   └── AuthService.ts   # Hardcoded auth logic
├── types/
│   └── Auth.ts          # AuthCredentials type
└── utils/
    └── Validation.ts    # Email/password validation
```

**Structure Decision**: Web application structure with Next.js App Router conventions, separating shared UI components and business logic in `components/` and `lib/` respectively.

## Requirements Coverage Matrix

| Req ID | Component(s) | Description |
|--------|-------------|-------------|
| FR-001 | `LoginPage`, `BrandPanel`, `LoginForm` | Split-panel layout |
| FR-002 | `BrandPanel` | Gradient background 121.19° |
| FR-003 | `DesignTokens`, global CSS | Inter font variants |
| FR-004 | `Input` | Inputs with 12px border-radius, #d7d9e6 border |
| FR-005 | `Button` | CTA button #ff6b3d, white text SemiBold 16px |
| FR-006 | `LoginForm` | Headings #16182c, secondary text #8a8ca8 |
| FR-007 | `BrandPanel` | Card Mockup with rgba background/border |
| FR-008 | `SocialLogins` | Social buttons with 1.5px #d7d9e6 border |
| FR-009 | `Input` | Password visibility toggle (eye icon) |
| FR-010 | `LoginForm` | "Regístrate" link → `/register` |
| FR-011 | `LoginForm` | Action links in #ef5226, SemiBold 14px |
| FR-012 | `Input`, `LoginForm` | Labels: Inter Medium 14px, #3d3f5c |
| FR-013 | `Input`, `SocialLogins` | Input height 52px, social buttons 48px |
| FR-014 | `BrandPanel` | Headline "Tu dinero, sin fronteras." + subtitle |
| FR-015 | `BrandPanel` | Card Mockup border-radius 22px, panel padding 56/64px |
| FR-016 | `SocialLogins` | Divider "o continúa con", Regular 13px, #8a8ca8 |
| FR-017 | `Input` | Placeholder color #a9abc2, Regular 15px |

## Complexity Tracking

| Violation | Why Needed | Simpler Alternative Rejected Because |
|-----------|------------|-------------------------------------|
| Next.js / Tailwind | Explicit user directive overrides strict "no external libraries" for the base framework. | Building a custom SSR framework and CSS parser is out of scope. |
| Eye icon (SVG inline) | FR-009 requires toggle visibility icon. Custom inline SVG avoids external icon libraries. | Using text-only toggle ("show/hide") is inconsistent with Figma design. |

## Implementation Notes

### New in this update (2026-06-08)

1. **Password Visibility Toggle (FR-009)**: The `Input` component must support a `type="password"` mode with an eye icon toggle. Implemented as internal state (`showPassword`) that switches between `type="password"` and `type="text"`.

2. **Navigation to Register (FR-010)**: Footer link "¿No tienes cuenta? Regístrate" must use Next.js `<Link>` to navigate to `/register`. The registration page already exists from spec 002.

3. **Extended Design Tokens**: `DesignTokens.ts` must include:
   - `Brand600`: `#ef5226` (for action links)
   - `Neutral700`: `#3d3f5c` (for labels)
   - `Neutral400`: `#a9abc2` (for placeholders)
   - `BorderRadiusXl`: `22px` (for Card Mockup)

4. **Dimensional Specifications (FR-013, FR-015)**: Explicit heights for inputs (52px) and social buttons (48px). Brand Panel padding (56px horizontal, 64px vertical).

5. **Typography Hierarchy (FR-012, FR-014, FR-016, FR-017)**: Complete font-weight/size/color mapping for labels, placeholders, headlines, and dividers.
