# Implementation Plan: Login, Register & Home Screen System

## Summary

This plan covers the implementation of the core authentication flow (Login/Register) and the main dashboard (Home Screen) for the KynWallet application. It includes persistent storage using a JSON file, server-side logic via Next.js Server Actions, and a responsive design that strictly follows the provided Figma prototypes.

## Technical Context

**Stack**: Next.js 14 (App Router), TypeScript, Tailwind CSS.
**Persistence**: Local file `data/users.json`.
**Validations**: Custom client-side and server-side logic in `lib/utils/Validation.ts` and `lib/actions/authActions.ts`.
**Layout**: Responsive split-panel (Desktop) and single-column (Mobile).

## Phases

### 1. Data Layer & Persistence
- [X] Create `data/users.json` with initial mock user.
- [X] Update `lib/types/Auth.ts` with `FullName` and `RegisterData`.
- [X] Implement `loginAction` and `registerAction` in `lib/actions/authActions.ts`.

### 2. Authentication UI & Logic
- [X] **Login (`/`)**: 
    - Updated branding to match Figma 2:2.
    - Connected to `loginAction`.
    - Added link to `/register`.
    - Added success message handling after registration.
- [X] **Register (`/register`)**:
    - Implemented `RegisterForm.tsx` with full validations (Email, Password min 8, Match, Terms).
    - Connected to `registerAction`.
    - Redirection to Login with success parameter.

### 3. Home Screen (`/inicio`)
- [X] Implemented responsive dashboard.
- [X] **Mobile View (11:2)**:
    - Header with balance and notifications.
    - Quick Action icons (Enviar, Recibir, etc.).
    - Recent transactions list with incoming/outgoing styles.
    - Floating bottom navigation bar.
- [X] **Desktop View (13:2)**:
    - Adapted grid layout for wider screens.

### 4. Interactions & Polish
- [X] Added "Próximamente" alerts to all social login buttons (Google/Apple).
- [X] Implemented cross-navigation between Login and Register.
- [X] Final visual audit of all screens against Figma prototypes.

## Verification
1.  **Register**: Create a new user -> Confirm it appears in `users.json`.
2.  **Login**: Use new credentials -> Confirm redirection to `/inicio`.
3.  **Inicio**: Verify that balance and transactions display correctly with the brand's identity.
