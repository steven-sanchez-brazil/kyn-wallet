# Tasks: Registro de Billetera Virtual

**Input**: Design documents from `specs/002-registro-billetera/`
**Prerequisites**: plan.md (required), spec.md (required), research.md, data-model.md, contracts/

**Tests**: TDD enforced per constitution. Tests written FIRST, must FAIL before implementation.

**Organization**: Tasks grouped by user story for independent implementation and testing.

## Format: `[ID] [P?] [Story] Description`

- **[P]**: Can run in parallel (different files, no dependencies)
- **[Story]**: Which user story this task belongs to (e.g., US1, US2, US3)
- Include exact file paths in descriptions

---

## Phase 1: Setup (Shared Infrastructure)

**Purpose**: Extend existing project structure for registration feature

- [x] T001 Create route directory structure in app/register/
- [x] T002 [P] Extend Auth types with RegisterData and RegisterResult in lib/types/Auth.ts
- [x] T003a [P] Write tests for Checkbox UI component in components/ui/Checkbox.test.tsx
- [x] T003b [P] Create Checkbox UI component in components/ui/Checkbox.tsx

---

## Phase 2: Foundational (Blocking Prerequisites)

**Purpose**: Core validation and service logic that ALL user stories depend on

**⚠️ CRITICAL**: No user story work can begin until this phase is complete

### Tests (TDD - Write FIRST, must FAIL)

- [x] T004 [P] Write tests for validateFullName and validatePasswordMatch in lib/utils/Validation.test.ts
- [x] T005 [P] Write tests for RegisterService in lib/services/RegisterService.test.ts

### Implementation

- [x] T006 [P] Implement validateFullName and validatePasswordMatch in lib/utils/Validation.ts
- [x] T007 [P] Implement RegisterService with IRegisterService interface in lib/services/RegisterService.ts

**Checkpoint**: Foundation ready — validation functions pass tests, RegisterService passes tests

---

## Phase 3: User Story 1 — Registro con formulario completo (Priority: P1) 🎯 MVP

**Goal**: Usuario puede completar el formulario con datos válidos y registrarse exitosamente, siendo redirigido a /login?registered=true

**Independent Test**: Completar formulario con datos válidos → clic "Crear cuenta" → redirección a /login?registered=true

### Tests (TDD - Write FIRST, must FAIL)

- [x] T008 [US1] Write RegisterForm tests: render fields, submit valid form, show errors on empty submit in components/RegisterForm.test.tsx

### Implementation

- [x] T009 [US1] Implement RegisterForm component with all fields and submit logic in components/RegisterForm.tsx
- [x] T010 [US1] Create RegisterPage with BrandPanel + RegisterForm layout in app/register/page.tsx
- [x] T011 [US1] Modify login page to read `registered` query param and show success banner in app/login/page.tsx

**Checkpoint**: User Story 1 functional — user can register with valid data and get redirected with success banner visible

---

## Phase 4: User Story 2 — Validaciones inline on blur (Priority: P1)

**Goal**: Mensajes de error inline aparecen al perder foco (on blur) en campos con datos inválidos

**Independent Test**: Ingresar datos inválidos → blur → errores visibles debajo de cada campo

### Tests (TDD - Write FIRST, must FAIL)

- [x] T012 [US2] Write validation on blur tests: email invalid on blur, password short on blur, confirm mismatch on blur, terms required on submit in components/RegisterForm.test.tsx

### Implementation

- [x] T013 [US2] Add onBlur validation handlers to RegisterForm for each field in components/RegisterForm.tsx
- [x] T014 [US2] Add terms checkbox validation on submit in components/RegisterForm.tsx

**Checkpoint**: User Story 2 functional — inline errors appear on blur for all invalid fields

---

## Phase 5: User Story 3 — Diseño responsive (Priority: P2)

**Goal**: Layout de 2 paneles en desktop (BrandPanel + formulario), solo formulario en mobile

**Independent Test**: Redimensionar viewport — desktop muestra 2 paneles, mobile muestra solo formulario

### Tests (TDD - Write FIRST, must FAIL)

- [x] T015 [US3] Write responsive layout test: BrandPanel hidden on mobile, visible on desktop in app/register/page.test.tsx

### Implementation

- [x] T016 [US3] Apply responsive Tailwind classes to RegisterPage layout (lg:flex, hidden lg:block) in app/register/page.tsx

**Checkpoint**: User Story 3 functional — layout adapts correctly to viewport size

---

## Phase 6: User Story 4 — Acciones secundarias (Priority: P3)

**Goal**: Botones Google/Apple muestran alert "Próximamente", link "¿Ya tienes cuenta?" navega a /login

**Independent Test**: Clic en Google/Apple → alert visible. Clic en link → navegación a /login.

### Tests (TDD - Write FIRST, must FAIL)

- [x] T017 [P] [US4] Write social buttons and login link tests in components/RegisterForm.test.tsx

### Implementation

- [x] T018 [P] [US4] Add SocialLogins component (reused as-is) and login link to RegisterForm in components/RegisterForm.tsx

**Checkpoint**: User Story 4 functional — social buttons alert, login link navigates

---

## Phase 7: Polish & Cross-Cutting Concerns

**Purpose**: Final validation, new FR integration, and end-to-end verification

- [x] T019 Run quickstart.md validation scenarios end-to-end
- [x] T020 Verify all tests pass with `npm test`

---

## Phase 8: New Requirements from Figma Review (FR-013, FR-014, FR-015)

**Purpose**: Integrate clarifications from Figma design review (2026-06-08)

### Tests (TDD — Write FIRST, must FAIL)

- [x] T021 [P] Write test: password field shows/hides text when eye icon is clicked in components/RegisterForm.test.tsx
- [x] T022 [P] Write test: confirmPassword field shows/hides text when eye icon is clicked in components/RegisterForm.test.tsx
- [x] T023 [P] Write test: BrandPanel renders custom headline and subtitle when props are passed in components/BrandPanel.test.tsx
- [x] T024 [P] Write test: "términos y condiciones" link triggers alert "Próximamente" in components/RegisterForm.test.tsx

### Implementation

- [x] T025 Parametrize BrandPanel to accept optional headline and subtitle props (defaults to login text) in components/BrandPanel.tsx
- [x] T026 Pass registration-specific headline ("Comienza tu camino financiero.") and subtitle to BrandPanel in app/register/page.tsx
- [x] T027 Implement "términos y condiciones" as clickable button with window.alert("Próximamente") in components/RegisterForm.tsx
- [x] T028 Verify Input component eye icon toggle works correctly for both password fields (already implemented from 001)

### Validation

- [x] T029 Run quickstart.md scenarios 7, 8, 9 (new scenarios from Figma review)
- [x] T030 Run full test suite: `npm test` — all green

---

## Dependencies & Execution Order

### Phase Dependencies

- **Setup (Phase 1)**: No dependencies — can start immediately
- **Foundational (Phase 2)**: Depends on Setup (T001-T003) — BLOCKS all user stories
- **User Story 1 (Phase 3)**: Depends on Foundational (T004-T007)
- **User Story 2 (Phase 4)**: Depends on User Story 1 (T008-T010) — extends same component
- **User Story 3 (Phase 5)**: Depends on User Story 1 (T010) — modifies page layout
- **User Story 4 (Phase 6)**: Depends on User Story 1 (T009) — extends same component
- **Polish (Phase 7)**: Depends on all user stories complete
- **Figma Review (Phase 8)**: Depends on Phase 7 — adds new FRs (FR-013, FR-014, FR-015)

### Within Each User Story

- Tests MUST be written and FAIL before implementation (TDD)
- Foundation (types, validation, service) before UI components
- Components before page assembly
- Story complete before checkpoint validation

### Parallel Opportunities

```bash
# Phase 1 — All setup tasks in parallel:
T001: Create route directory
T002: Extend Auth types
T003: Create Checkbox component

# Phase 2 — Tests in parallel, then implementations in parallel:
T004 + T005 (tests in parallel)
T006 + T007 (implementations in parallel, after respective tests)

# Phase 6 — Tests and implementation can parallel with Phase 5:
T016 + T017 (independent of Phase 5, only needs Phase 3 complete)
```

---

## Implementation Strategy

### MVP First (User Story 1 Only)

1. Complete Phase 1: Setup (T001-T003)
2. Complete Phase 2: Foundational (T004-T007)
3. Complete Phase 3: User Story 1 (T008-T010)
4. **STOP and VALIDATE**: Test registration flow end-to-end
5. Functional MVP: user can register and get redirected

### Incremental Delivery

1. Setup + Foundational → Foundation ready
2. Add User Story 1 → Registration works → MVP! ✅
3. Add User Story 2 → Inline validations improve UX
4. Add User Story 3 → Responsive layout complete
5. Add User Story 4 → Social buttons + navigation
6. Polish → Login page shows success banner
7. Figma Review FRs → Eye icon, BrandPanel props, T&C link

---

## Notes

- [P] tasks = different files, no dependencies
- [Story] label maps task to specific user story for traceability
- Existing components (BrandPanel, SocialLogins, Input, Button) are reused as-is
- Commit after each task or logical group
- Stop at any checkpoint to validate story independently
- Phase 8 (T021–T030) adds 3 new FRs from Figma design review: eye icon toggle (FR-013), BrandPanel parametrization (FR-014), T&C clickable link (FR-015)
