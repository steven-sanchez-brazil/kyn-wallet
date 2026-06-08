# Tasks: Registro de Usuario Kyn-Wallet

**Input**: Design documents from `/specs/002-registro-usuario-billetera/`
**Prerequisites**: plan.md (required), spec.md (required for user stories), research.md, data-model.md, contracts/

**Tests**: Se incluyen tareas de pruebas porque el feature adopta enfoque TDD definido en constitucion y quickstart.

**Organization**: Tasks are grouped by user story to enable independent implementation and testing of each story.

## Format: `[ID] [P?] [Story] Description`

- **[P]**: Can run in parallel (different files, no dependencies)
- **[Story]**: Which user story this task belongs to (e.g., US1, US2, US3)
- Include exact file paths in descriptions

## Phase 1: Setup (Shared Infrastructure)

**Purpose**: Preparar estructura minima y puntos de entrada para el feature

- [X] T001 Create register route scaffold in app/register/page.tsx
- [X] T002 [P] Create registration integration test scaffold in app/register/register.test.tsx
- [X] T003 [P] Create registration component scaffold in components/RegisterForm.tsx
- [X] T004 [P] Create shared user source scaffold in lib/services/UserStore.ts

---

## Phase 2: Foundational (Blocking Prerequisites)

**Purpose**: Infraestructura comun de validacion y fuente de usuarios compartida para Login y Registro

**⚠️ CRITICAL**: No user story work can begin until this phase is complete

- [X] T005 Extend auth domain models for registration in lib/types/Auth.ts
- [X] T006 [P] Add registration validation helpers in lib/utils/Validation.ts
- [X] T007 [P] Add validation unit tests for registration rules in lib/utils/Validation.test.ts
- [X] T008 Implement shared in-memory user source operations in lib/services/UserStore.ts
- [X] T009 Refactor authentication service to consume UserStore in lib/services/AuthService.ts
- [X] T010 [P] Add AuthService unit tests for register and duplicate email paths in lib/services/AuthService.test.ts

**Checkpoint**: Foundation ready - user story implementation can now begin in parallel

---

## Phase 3: User Story 1 - Registro de nueva cuenta (Priority: P1) 🎯 MVP

**Goal**: Permitir alta de usuario con validaciones inline, terminos obligatorios y redireccion a Login con mensaje de exito

**Independent Test**: Completar formulario valido en Registro y verificar redireccion a `/login` con feedback de exito visible

### Tests for User Story 1 (MANDATORY - TDD Enforced) ⚠️

- [X] T011 [P] [US1] Add RegisterForm validation rendering tests in components/RegisterForm.test.tsx
- [X] T012 [P] [US1] Add registration page integration test for successful submit in app/register/register.test.tsx

### Implementation for User Story 1

- [X] T013 [US1] Implement registration form state and inline errors in components/RegisterForm.tsx
- [X] T014 [US1] Implement submit flow with terms acceptance and register action in components/RegisterForm.tsx
- [X] T015 [US1] Wire register page to render form and login link in app/register/page.tsx
- [X] T016 [US1] Add post-registration success message handling in app/page.tsx

**Checkpoint**: User Story 1 is fully functional and independently testable

---

## Phase 4: User Story 2 - Integracion coherente entre Registro y Login (Priority: P2)

**Goal**: Garantizar que Login autentique usuarios creados por Registro usando la misma fuente de datos

**Independent Test**: Registrar usuario nuevo y autenticarlo en Login dentro del mismo flujo de pruebas

### Tests for User Story 2 (MANDATORY - TDD Enforced) ⚠️

- [X] T017 [P] [US2] Add cross-flow test for register then login in app/login.test.tsx
- [X] T018 [P] [US2] Add login form navigation link test to register route in components/LoginForm.test.tsx

### Implementation for User Story 2

- [X] T019 [US2] Add registration entry link at login form footer in components/LoginForm.tsx
- [X] T020 [US2] Ensure login uses shared user source through AuthService integration in components/LoginForm.tsx
- [X] T021 [US2] Finalize UserStore read/write consistency and uniqueness rules in lib/services/UserStore.ts
- [X] T022 [US2] Update registration/auth contract examples and outcomes in specs/002-registro-usuario-billetera/contracts/registration-auth.md

**Checkpoint**: User Stories 1 and 2 both work independently and in integrated flow

---

## Phase 5: User Story 3 - Experiencia visual y navegacion alineadas al diseno (Priority: P3)

**Goal**: Alinear UI responsive con referencia Figma y completar acciones secundarias de navegacion/social

**Independent Test**: Verificar layout desktop/mobile y alert de Google/Apple con texto exacto "Proximamente"

### Tests for User Story 3 (MANDATORY - TDD Enforced) ⚠️

- [X] T023 [P] [US3] Add responsive layout and social alert behavior tests in app/register/register.test.tsx
- [X] T024 [P] [US3] Add social buttons alert text test in components/SocialLogins.test.tsx

### Implementation for User Story 3

- [X] T025 [US3] Implement desktop split layout and mobile single-panel behavior in app/register/page.tsx
- [X] T026 [US3] Reuse BrandPanel and finalize visual composition in app/register/page.tsx
- [X] T027 [US3] Configure social buttons for register flow with "Proximamente" alert in components/SocialLogins.tsx
- [X] T028 [US3] Integrate social section from register form and link back to login in components/RegisterForm.tsx

**Checkpoint**: All user stories are independently functional

---

## Phase 6: Polish & Cross-Cutting Concerns

**Purpose**: Cierre tecnico, validacion integral y documentacion final

- [X] T029 [P] Update feature quickstart execution steps in specs/002-registro-usuario-billetera/quickstart.md
- [X] T030 [P] Document final data flow decisions in specs/002-registro-usuario-billetera/plan.md
- [X] T031 Run full test suite command reference update in package.json
- [X] T032 Verify end-to-end acceptance checklist completion in specs/002-registro-usuario-billetera/checklists/requirements.md

---

## Dependencies & Execution Order

### Phase Dependencies

- **Setup (Phase 1)**: No dependencies - can start immediately
- **Foundational (Phase 2)**: Depends on Setup completion - BLOCKS all user stories
- **User Stories (Phase 3+)**: Depend on Foundational phase completion
- **Polish (Phase 6)**: Depends on selected user stories completion

### User Story Dependencies

- **User Story 1 (P1)**: Starts after Phase 2; no dependency on other stories
- **User Story 2 (P2)**: Starts after Phase 2; depends functionally on shared source created in Phase 2 and integrates US1 outputs
- **User Story 3 (P3)**: Starts after Phase 2; can run in parallel with US2 once US1 route/component skeleton is merged

### Within Each User Story

- Tests MUST be written and failing first
- Form/service structures before integration wiring
- Integration wiring before final UI behavior assertions

### Suggested Completion Order

- MVP: Phase 1 -> Phase 2 -> Phase 3
- Incremental: then Phase 4 -> Phase 5 -> Phase 6

---

## Parallel Example: User Story 1

```bash
# Parallel test-first tasks
T011 components/RegisterForm.test.tsx
T012 app/register/register.test.tsx

# Parallel setup tasks before final wiring
T013 components/RegisterForm.tsx
T015 app/register/page.tsx
```

## Parallel Example: User Story 2

```bash
# Parallel test tasks
T017 app/login.test.tsx
T018 components/LoginForm.test.tsx

# Parallel implementation tasks on different files
T019 components/LoginForm.tsx
T021 lib/services/UserStore.ts
```

## Parallel Example: User Story 3

```bash
# Parallel test tasks
T023 app/register/register.test.tsx
T024 components/SocialLogins.test.tsx

# Parallel implementation tasks
T027 components/SocialLogins.tsx
T025 app/register/page.tsx
```

---

## Implementation Strategy

### MVP First (User Story 1 Only)

1. Complete Phase 1 (Setup)
2. Complete Phase 2 (Foundational)
3. Complete Phase 3 (US1)
4. Validate registro exitoso + redireccion a login con mensaje

### Incremental Delivery

1. Deliver MVP (US1)
2. Add shared source cross-flow (US2)
3. Add responsive and social polish (US3)
4. Complete cross-cutting polish and docs (Phase 6)

### Parallel Team Strategy

1. Team aligns on Setup + Foundational
2. Developer A: US1
3. Developer B: US2 after foundational ready
4. Developer C: US3 visual/responsive tasks in parallel where non-blocking

---

## Notes

- [P] tasks are file-isolated and can execute concurrently
- Every story phase contains explicit independent test criteria
- Task descriptions include concrete file paths for immediate execution
