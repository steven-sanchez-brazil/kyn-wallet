# Tasks: Registro de Usuarios

**Input**: spec.md, plan.md, Figma frame "04 · Registro"
**Prerequisites**: Phase 1 & 2 of initial setup completed.

## Phase 1: Foundational (Blocking)
- [X] T032 [P] Define `RegisterData` type in `lib/types/Auth.ts`
- [X] T033 Implement `register` mock in `lib/services/AuthService.ts`
- [X] T034 [P] Update `Validation.ts` with `validateFullName` and `passwordsMatch` logic

## Phase 2: Tests (TDD)
- [X] T035 [P] Add unit tests for `AuthService.register` in `lib/services/AuthService.test.ts`
- [X] T036 [P] Add unit tests for new validation rules in `lib/utils/Validation.test.ts`
- [X] T037 Create integration tests for register flow in `app/register/register.test.tsx`

## Phase 3: Implementation - UI Components
- [X] T038 Create `RegisterForm.tsx` in `components/` reusing UI tokens
- [X] T039 Implement Terms & Conditions checkbox in `RegisterForm.tsx`
- [X] T040 Integrate `SocialLogins.tsx` into `RegisterForm.tsx`
- [X] T041 Add "Inicia sesión" link pointing to `/login`

## Phase 4: Implementation - Page & Routes
- [X] T042 Setup `app/register/page.tsx` with split-panel layout using `BrandPanel`
- [X] T043 Connect `RegisterForm` to `AuthService` and handle redirection logic
- [X] T044 Handle `registro=exitoso` query param in `LoginForm.tsx`

## Phase 5: Verification & Polish
- [X] T045 Verify responsive layout for register page
- [X] T046 Run all tests and ensure 100% pass rate for new feature
- [X] T047 Final audit against Figma "04 · Registro" frame
- [X] T048 Verify `PascalCase` compliance in all new files
