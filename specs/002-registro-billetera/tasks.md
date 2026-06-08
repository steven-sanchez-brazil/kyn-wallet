# Tasks: Registro de Billetera Virtual

**Input**: Design documents from `/specs/002-registro-billetera/`

**Prerequisites**: plan.md (required), spec.md (required for user stories), research.md, data-model.md, contracts/

**Tests**: TDD is mandatory per project constitution. Tests will be written before implementation.

**Organization**: Tasks are grouped by user story to enable independent implementation and testing of each story.

## Format: `[ID] [P?] [Story] Description`

- **[P]**: Can run in parallel (different files, no dependencies)
- **[Story]**: Which user story this task belongs to (e.g., US1, US2, US3)
- Include exact file paths in descriptions

## Phase 1: Setup (Shared Infrastructure)

**Purpose**: Project initialization and basic structure

- [X] T001 [P] Create directory structure for registration feature in `app/register/`, `components/`, `lib/domain/models/`, `lib/services/`, `lib/utils/`
- [X] T002 [P] Configure Vitest and React Testing Library for registration tests in `vitest.config.ts` and `vitest.setup.ts`

---

## Phase 2: Foundational (Blocking Prerequisites)

**Purpose**: Core infrastructure that MUST be complete before ANY user story can be implemented

**⚠️ CRITICAL**: No user story work can begin until this phase is complete

- [X] T003 [P] Implement base Validation utilities in `lib/utils/Validation.ts` (Email, Password length)
- [X] T004 [P] Define `UserRegistrationData` and `RegistrationResponse` types in `lib/types/Auth.ts`
- [X] T005 [P] Extend `IAuthService` interface with `register` method in `lib/services/AuthService.ts`
- [X] T006 [P] Create reusable `Button`, `Input`, and `Checkbox` UI components in `components/ui/` using Tailwind CSS and `DesignTokens`

**Checkpoint**: Foundation ready - user story implementation can now begin in parallel

---

## Phase 3: User Story 1 - Registro Exitoso (Priority: P1) 🎯 MVP

**Goal**: Permitir que un nuevo usuario cree una cuenta y sea redirigido al login con éxito.

**Independent Test**: Completar el formulario con datos válidos y verificar la redirección a `/login`.

### Tests for User Story 1 (TDD) ⚠️

- [X] T007 [P] [US1] Unit test for `AuthService.register` success in `lib/services/AuthService.test.ts`
- [X] T008 [P] [US1] Component test for successful form submission in `components/RegisterForm.test.tsx`
- [X] T009 [P] [US1] Integration test for registration flow in `app/register/register.test.tsx`

### Implementation for User Story 1

- [X] T010 [US1] Implement `register` logic in `lib/services/AuthService.ts` (Mock implementation adding user to `MOCK_USERS`)
- [X] T011 [US1] Create basic `RegisterForm.tsx` component with required fields in `components/RegisterForm.tsx`
- [X] T012 [US1] Implement form submission and redirection logic in `components/RegisterForm.tsx`
- [X] T013 [US1] Create main registration page in `app/register/page.tsx` integrating `RegisterForm`

**Checkpoint**: User Story 1 should be fully functional and testable independently.

---

## Phase 4: User Story 2 - Validaciones de Datos e Integridad (Priority: P2)

**Goal**: Proporcionar retroalimentación inmediata sobre errores de validación.

**Independent Test**: Ingresar datos inválidos y verificar que aparezcan los mensajes de error correspondientes.

### Tests for User Story 2 (TDD) ⚠️

- [X] T014 [P] [US2] Unit tests for custom validation logic in `lib/utils/Validation.test.ts`
- [X] T015 [P] [US2] Component tests for error message display in `components/RegisterForm.test.tsx`

### Implementation for User Story 2

- [X] T016 [US2] Implement inline validation logic (email format, password mismatch) in `components/RegisterForm.tsx`
- [X] T017 [US2] Add error state handling and UI feedback in `components/RegisterForm.tsx`
- [X] T018 [US2] Implement button disabling logic until form is valid in `components/RegisterForm.tsx`

**Checkpoint**: User Story 2 validation logic is complete.

---

## Phase 5: User Story 3 - Acceso a Login (Priority: P2)

**Goal**: Permitir la navegación rápida a la pantalla de login.

**Independent Test**: Clic en el link de login y verificar navegación a `/login`.

### Tests for User Story 3 (TDD) ⚠️

- [X] T019 [P] [US3] Component test for "Inicia sesión" link in `components/RegisterForm.test.tsx`

### Implementation for User Story 3

- [X] T020 [US3] Add Next.js `Link` to `/login` in `components/RegisterForm.tsx`

**Checkpoint**: Navigation to login is functional.

---

## Phase 6: User Story 4 - Registro con Terceros (Próximamente) (Priority: P3)

**Goal**: Mostrar opciones de registro social con feedback de "Próximamente".

**Independent Test**: Clic en botones de Google/Apple y verificar `alert("Próximamente")`.

### Tests for User Story 4 (TDD) ⚠️

- [X] T021 [P] [US4] Component test for social login buttons in `components/SocialLogins.test.tsx`

### Implementation for User Story 4

- [X] T022 [US4] Create `SocialLogins.tsx` component with Google and Apple buttons in `components/SocialLogins.tsx`
- [X] T023 [US4] Implement `alert` feedback for social buttons in `components/SocialLogins.tsx`
- [X] T024 [US4] Integrate `SocialLogins` into `app/register/page.tsx`

**Checkpoint**: All user stories should now be independently functional.

---

## Phase 7: Polish & Cross-Cutting Concerns

**Purpose**: Improvements that affect multiple user stories

- [X] T025 [P] Implement responsive layout (2 panels for desktop, 1 for mobile) in `app/register/page.tsx` using Tailwind CSS
- [X] T026 [P] Apply brand styles and animations in `app/register/page.tsx` and `components/RegisterForm.tsx`
- [X] T027 [P] Documentation updates in `README.md` and feature docs
- [X] T028 Run `quickstart.md` validation scenarios manually

---

## Dependencies & Execution Order

### Phase Dependencies

- **Setup (Phase 1)**: Can start immediately.
- **Foundational (Phase 2)**: Depends on Setup completion. BLOCKS all user stories.
- **User Stories (Phase 3+)**: All depend on Foundational phase completion.
  - Can proceed in parallel or sequentially (US1 → US2 → US3 → US4).
- **Polish (Final Phase)**: Depends on all user stories completion.

### User Story Dependencies

- **User Story 1 (P1)**: Foundation for other stories.
- **User Stories 2, 3, 4**: Can be developed in parallel once US1 structure exists, but ideally follow priority order.

### Parallel Opportunities

- Foundational tasks (T003-T006) can run in parallel.
- All TDD test tasks (T007-T009, T014-T015, T019, T021) can run in parallel.
- UI component creation (T022) can run in parallel with form logic (T011).

---

## Implementation Strategy

### MVP First (User Story 1 Only)

1. Complete Phase 1: Setup.
2. Complete Phase 2: Foundational.
3. Complete Phase 3: User Story 1 (Success flow).
4. **STOP and VALIDATE**: Verify registration works with a happy path.

### Incremental Delivery

1. Foundation ready.
2. Add US1 (MVP) -> Deployable increment.
3. Add US2 (Validation) -> Better UX.
4. Add US3 & US4 -> Complete navigation and feature set.
5. Final polish -> Production ready.
