# Tasks: Registro de Usuarios

**Input**: Design documents from `/specs/002-registro-usuarios/`

**Prerequisites**: plan.md, spec.md, research.md, data-model.md, contracts/register-service.md, quickstart.md

**Tests**: Se incluyen tareas de tests por requerimiento de TDD definido en la constitucion del proyecto.

**Organization**: Tasks grouped by user story for independent implementation and validation.

## Phase 1: Setup (Shared Infrastructure)

**Purpose**: Preparar estructura de archivos y base de pruebas para la feature.

- [X] T001 Create register feature folders in app/register and tests/contract
- [X] T002 Create register page test scaffold in app/register/register.test.tsx
- [X] T003 [P] Create register contract test scaffold in tests/contract/RegisterService.contract.test.ts

---

## Phase 2: Foundational (Blocking Prerequisites)

**Purpose**: Infraestructura base que bloquea la implementacion de todas las historias.

**CRITICAL**: Ninguna historia puede implementarse antes de completar esta fase.

- [X] T004 Extend register domain types in lib/types/Auth.ts
- [X] T005 Implement register validation helpers in lib/utils/Validation.ts
- [X] T006 [P] Add register validation unit tests in lib/utils/Validation.test.ts
- [X] T007 Implement RegisterService base contract in lib/services/RegisterService.ts
- [X] T008 [P] Add shared register status/error messages in lib/constants/AuthMessages.ts
- [X] T009 Wire RegisterService exports and imports in lib/services/RegisterService.ts and components/RegisterForm.tsx

**Checkpoint**: Foundation ready - user story implementation can now begin.

---

## Phase 3: User Story 1 - Registro completo con validaciones (Priority: P1) MVP

**Goal**: Entregar formulario de registro completo con validaciones inline y manejo de errores de alta.

**Independent Test**: Completar formulario con entradas validas/invalidas, verificar errores inline, bloqueo de submit y estados de error tecnico/correo existente.

### Tests for User Story 1 (TDD)

- [X] T010 [P] [US1] Add contract tests for register outcomes in tests/contract/RegisterService.contract.test.ts
- [X] T011 [P] [US1] Add form validation integration tests in app/register/register.test.tsx
- [X] T012 [P] [US1] Add submit state tests (loading/disabled/retry) in app/register/register.test.tsx

### Implementation for User Story 1

- [X] T013 [US1] Create register form component with required fields in components/RegisterForm.tsx
- [X] T014 [US1] Implement inline field validation and terms gating in components/RegisterForm.tsx
- [X] T015 [US1] Implement submit flow and loading disabled state in components/RegisterForm.tsx
- [X] T016 [US1] Implement duplicate email and transient error handling in lib/services/RegisterService.ts
- [X] T017 [US1] Integrate RegisterForm into route page in app/register/page.tsx

**Checkpoint**: User Story 1 should be independently functional and testable.

---

## Phase 4: User Story 2 - Continuidad del flujo de acceso (Priority: P2)

**Goal**: Garantizar navegacion a login desde registro y redireccion con mensaje de exito.

**Independent Test**: Validar link a `/login`, redireccion post-registro exitoso y visualizacion de mensaje en login.

### Tests for User Story 2 (TDD)

- [X] T018 [P] [US2] Add navigation tests for login link and redirect in app/register/register-navigation.test.tsx
- [X] T019 [P] [US2] Add login success message tests in app/login/login-success.test.tsx

### Implementation for User Story 2

- [X] T020 [US2] Create login route entrypoint in app/login/page.tsx
- [X] T021 [US2] Add register-to-login link behavior in components/RegisterForm.tsx
- [X] T022 [US2] Implement successful register redirect to /login in components/RegisterForm.tsx
- [X] T023 [US2] Render and clear success message in login UI in components/LoginForm.tsx

**Checkpoint**: User Stories 1 and 2 should both work independently.

---

## Phase 5: User Story 3 - Alternativas sociales y experiencia adaptable (Priority: P3)

**Goal**: Mostrar acciones sociales con aviso "Proximamente" y adaptar layout desktop/mobile conforme al diseño.

**Independent Test**: Verificar alertas en Google/Apple y comportamiento responsive de dos paneles desktop / formulario unico mobile.

### Tests for User Story 3 (TDD)

- [X] T024 [P] [US3] Add social action alert tests in components/SocialLogins.test.tsx
- [X] T025 [P] [US3] Add responsive layout tests for register page in app/register/register-layout.test.tsx

### Implementation for User Story 3

- [X] T026 [US3] Implement social buttons "Proximamente" behavior in components/SocialLogins.tsx
- [X] T027 [US3] Compose desktop two-panel layout with BrandPanel in app/register/page.tsx
- [X] T028 [US3] Implement mobile-only form layout behavior in app/register/page.tsx
- [X] T029 [US3] Align register visual tokens with design system in lib/constants/DesignTokens.ts

**Checkpoint**: All user stories should now be independently functional.

---

## Phase 6: Polish & Cross-Cutting Concerns

**Purpose**: Cierre de calidad transversal de la feature.

- [X] T030 [P] Update feature documentation notes in specs/002-registro-usuarios/quickstart.md
- [X] T031 Run full test suite for feature scope with npm test in package.json
- [X] T032 Run lint validation with npm run lint in package.json
- [X] T033 Validate manual acceptance scenarios from specs/002-registro-usuarios/quickstart.md

---

## Dependencies & Execution Order

### Phase Dependencies

- Setup (Phase 1): no dependencies.
- Foundational (Phase 2): depends on Setup; blocks all user stories.
- User Stories (Phases 3-5): depend on Foundational completion.
- Polish (Phase 6): depends on all targeted user stories completion.

### User Story Dependencies

- US1 (P1): starts after Phase 2; no dependency on other stories.
- US2 (P2): starts after Phase 2; depends functionally on successful register flow from US1 for redirect message validation.
- US3 (P3): starts after Phase 2; can proceed independently of US2.

### Within Each User Story

- Tests first and failing before implementation.
- Validation/domain logic before UI wiring.
- Integration and route behavior after core component logic.

### Parallel Opportunities

- Phase 1: T002 and T003 can run in parallel after T001.
- Phase 2: T006 and T008 can run in parallel after T004-T005.
- US1: T010, T011, T012 can run in parallel.
- US2: T018 and T019 can run in parallel.
- US3: T024 and T025 can run in parallel.
- Polish: T030 can run in parallel with T031/T032.

---

## Parallel Example: User Story 1

```bash
# Tests in parallel for US1
T010 tests/contract/RegisterService.contract.test.ts
T011 app/register/register.test.tsx
T012 app/register/register.test.tsx

# Implementation split after tests
T014 components/RegisterForm.tsx
T016 lib/services/RegisterService.ts
```

---

## Implementation Strategy

### MVP First (US1 only)

1. Complete Phase 1 and Phase 2.
2. Deliver Phase 3 (US1) end-to-end.
3. Validate quickstart scenarios for valid/invalid/duplicate/transient cases.
4. Demo/deploy MVP.

### Incremental Delivery

1. Add US2 for login continuity and success messaging.
2. Add US3 for social placeholders and responsive fidelity.
3. Execute Phase 6 quality gates.

### Parallel Team Strategy

1. Team completes Setup + Foundational together.
2. Luego:
   - Dev A: US1 form/service flow
   - Dev B: US2 navigation/login message
   - Dev C: US3 responsive/social
3. Integrate via test checkpoints after each story.
