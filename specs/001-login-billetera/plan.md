# Implementation Plan: Billetera Virtual - Login, Registro y Home

**Branch**: `main` | **Date**: 2026-06-08 | **Spec**: [specs/001-login-billetera/spec.md](spec.md)

## Summary

Implement a comprehensive authentication system and main dashboard for KynWallet. This includes a Login screen, a Registration screen with full validation, and a responsive Home dashboard (Desktop and Mobile versions). The system uses file-based persistence for user data and strictly follows Figma designs for all views.

## Technical Context

**Language/Version**: TypeScript / Next.js 14 (App Router)  
**Primary Dependencies**: React 18, Next.js 14, Tailwind CSS 3.x  
**Storage**: File-based persistence (`data/users.json`) via Next.js API Routes.  
**Target Platform**: Web (Responsive: Desktop & Mobile)
**Project Type**: web-application  
**Constraints**: No external UI libraries, strict PascalCase naming, Figma-accurate styling.

## Constitution Check

- [x] **TDD**: Test runner (Vitest) configured.
- [x] **SOLID**: Logic separated into services, components, and API routes.
- [x] **Clean Architecture**: Separation of layers (app/ for routes, components/ for UI, lib/ services/ and utils/ for logic, data/ for storage).
- [x] **DRY & YAGNI**: Reusable UI components and validation utilities.
- [x] **Naming**: PascalCase for components and structures.
- [x] **Dependencies**: No external UI libraries used.
- [x] **Security**: Input validation on client and server; password minimum length (8 chars).

## Project Structure

### Documentation

```text
specs/001-login-billetera/
├── plan.md              # This file
├── research.md          # Design analysis
├── data-model.md        # users.json structure
├── quickstart.md        # Setup guide
├── spec.md              # Requirements and User Stories
└── checklists/
    └── requirements.md
```

### Source Code

```text
app/
├── api/auth/            # Auth API Routes (login, register)
├── login/               # Login Page
├── registro/            # Register Page
├── home/                # Home Dashboard (Protected)
├── page.tsx             # Root redirect to /login
└── layout.tsx           # Global layout

components/
├── BrandPanel.tsx       # Shared branding panel
├── LoginForm.tsx
├── RegisterForm.tsx
├── SocialLogins.tsx     # Google/Apple alerts
├── ui/                  # Reusable components
└── home/                # Modular home components (Sidebar, Summary, etc.)

data/
└── users.json           # User persistence

lib/
├── services/
│   └── AuthService.ts   # Client-side auth logic
├── utils/
│   └── Validation.ts    # Reusable regex validations
└── constants/
    └── DesignTokens.ts  # Figma colors and radii
```

## Complexity Tracking

| Violation | Why Needed | Simpler Alternative Rejected Because |
|-----------|------------|-------------------------------------|
| API Routes | Required for server-side file system access (Next.js App Router). | Client-side only storage (localStorage) doesn't fulfill "save in system file" requirement. |
| localStorage | Used for session persistence on the client side. | Full JWT/Cookie implementation was out of scope for a prototype. |
