# Tasks: Registro de Cuenta para KynWallet

**Input**: Design documents from `/specs/002-registro-billetera/`
**Prerequisites**: plan.md (required), spec.md (required for user stories), research.md, data-model.md, contracts/

**Tests**: Included because this feature follows the repository TDD approach.

**Organization**: Tasks are grouped by user story so each story can be implemented and tested independently.

## Format: `[ID] [P?] [Story] Description`

- **[P]**: Can run in parallel (different files, no dependencies)
- **[Story]**: Which user story this task belongs to (e.g., US1, US2, US3)
- Include exact file paths in descriptions

---

## Phase 1: Setup (Shared Infrastructure)

**Purpose**: Create the shared registration feature surface and file scaffolding

- [ ] T001 Create the registration route shell in `app/registro/page.tsx`
- [ ] T002 [P] Create the registration form component scaffold in `components/RegistrationForm.tsx`
- [ ] T003 [P] Create the shared registration types scaffold in `lib/types/Registration.ts`

---

## Phase 2: Foundational (Blocking Prerequisites)

**Purpose**: Core registration logic that every user story depends on

**⚠️ CRITICAL**: No user story work can begin until this phase is complete

- [ ] T004 Define the registration service contract and mock account behavior in `lib/services/RegistrationService.ts`
- [ ] T005 [P] Implement registration validation helpers for email, password, and confirmation in `lib/utils/RegistrationValidation.ts`
- [ ] T006 Complete the registration entity and result types in `lib/types/Registration.ts`
- [ ] T007 Confirm the registration screen reuses the existing design tokens from `lib/constants/DesignTokens.ts` and update `tailwind.config.ts` only if the implementation exposes a missing token

**Checkpoint**: Foundation ready - user story implementation can now begin in parallel

---

## Phase 3: User Story 1 - Crear una Cuenta Nueva (Priority: P1) 🎯 MVP

**Goal**: Deliver the primary registration flow with a clear UI and successful account creation path

**Independent Test**: Filling the form with valid data creates the mock account and advances to the next step without relying on other stories

### Tests for User Story 1 (MANDATORY - TDD Enforced) ⚠️

> **NOTE: Write these tests FIRST, ensure they FAIL before implementation**

- [ ] T008 [P] [US1] Add contract tests for `RegistrationService.register` in `lib/services/RegistrationService.test.ts`
- [ ] T009 [P] [US1] Add happy-path integration coverage for the registration page in `app/registro/page.test.tsx`

### Implementation for User Story 1

- [ ] T010 [P] [US1] Implement the happy-path registration service flow in `lib/services/RegistrationService.ts`
- [ ] T011 [P] [US1] Build the main registration form layout and primary CTA in `components/RegistrationForm.tsx`
- [ ] T012 [US1] Assemble the registration page with the brand panel and form in `app/registro/page.tsx`
- [ ] T013 [US1] Connect the registration form submit action to `lib/services/RegistrationService.ts`

**Checkpoint**: At this point, User Story 1 should be fully functional and testable independently

---

## Phase 4: User Story 2 - Validar Datos Antes de Registrar (Priority: P2)

**Goal**: Prevent invalid submissions and show clear field-level error feedback

**Independent Test**: Invalid email, password, or confirmation values trigger field-specific errors and block submission on their own

### Tests for User Story 2 (MANDATORY - TDD Enforced) ⚠️

- [ ] T014 [P] [US2] Add validation rule tests in `lib/utils/RegistrationValidation.test.ts`
- [ ] T015 [P] [US2] Add error-state UI tests for the form in `components/RegistrationForm.test.tsx`

### Implementation for User Story 2

- [ ] T016 [P] [US2] Implement the field validation rules in `lib/utils/RegistrationValidation.ts`
- [ ] T017 [US2] Surface validation errors and disabled submit states in `components/RegistrationForm.tsx`
- [ ] T018 [US2] Propagate validation failures through `lib/services/RegistrationService.ts`

**Checkpoint**: At this point, User Story 1 AND User Story 2 should both work independently

---

## Phase 5: User Story 3 - Reconocer Opciones Secundarias y Volver al Inicio de Sesión (Priority: P3)

**Goal**: Provide a clear secondary path back to login and keep the layout usable on smaller screens

**Independent Test**: The registration page shows a visible return-to-login action and remains usable on desktop and mobile without horizontal scrolling

### Tests for User Story 3 (MANDATORY - TDD Enforced) ⚠️

- [ ] T019 [P] [US3] Add navigation affordance coverage in `app/registro/page.test.tsx`
- [ ] T020 [P] [US3] Add responsive layout coverage for the registration form in `components/RegistrationForm.test.tsx`

### Implementation for User Story 3

- [ ] T021 [US3] Add the secondary return-to-login action in `components/RegistrationForm.tsx`
- [ ] T022 [US3] Refine responsive spacing and composition in `app/registro/page.tsx`

**Checkpoint**: All user stories should now be independently functional

---

## Phase 6: Polish & Cross-Cutting Concerns

**Purpose**: Improvements that affect multiple user stories

- [ ] T023 [P] Update the project README with the registration route and usage notes in `README.md`
- [ ] T024 Run the registration feature quickstart checks from `specs/002-registro-billetera/quickstart.md`
- [ ] T025 Run the focused registration test suite for `lib/services/RegistrationService.test.ts`, `components/RegistrationForm.test.tsx`, and `app/registro/page.test.tsx`

---

## Dependencies & Execution Order

### Phase Dependencies

- **Setup (Phase 1)**: No dependencies - can start immediately
- **Foundational (Phase 2)**: Depends on Setup completion - BLOCKS all user stories
- **User Stories (Phase 3+)**: All depend on Foundational phase completion
  - User stories can then proceed in parallel (if staffed)
  - Or sequentially in priority order (P1 → P2 → P3)
- **Polish (Final Phase)**: Depends on all desired user stories being complete

### User Story Dependencies

- **User Story 1 (P1)**: Can start after Foundational (Phase 2) - No dependencies on other stories
- **User Story 2 (P2)**: Can start after Foundational (Phase 2) - Depends on the shared validation helpers and service contract
- **User Story 3 (P3)**: Can start after Foundational (Phase 2) - May reuse the page shell from US1 but should remain independently testable

### Within Each User Story

- Tests (if included) MUST be written and FAIL before implementation
- Models before services
- Services before UI wiring
- Core implementation before integration
- Story complete before moving to next priority

### Parallel Opportunities

- Setup tasks marked [P] can run in parallel
- Foundational tasks marked [P] can run in parallel once the skeleton is in place
- After Foundation, all user stories can start in parallel if the team has capacity
- Tests for a user story marked [P] can run in parallel
- Story-specific UI and service work can be split across different files

---

## Parallel Example: User Story 1

```bash
# Launch all tests for User Story 1 together:
Task: "Add contract tests for RegistrationService.register in lib/services/RegistrationService.test.ts"
Task: "Add happy-path integration coverage for the registration page in app/registro/page.test.tsx"

# Launch the primary implementation work together:
Task: "Implement the happy-path registration service flow in lib/services/RegistrationService.ts"
Task: "Build the main registration form layout and primary CTA in components/RegistrationForm.tsx"
```

---

## Implementation Strategy

### MVP First (User Story 1 Only)

1. Complete Phase 1: Setup
2. Complete Phase 2: Foundational (CRITICAL - blocks all stories)
3. Complete Phase 3: User Story 1
4. **STOP and VALIDATE**: Test User Story 1 independently
5. Deploy/demo if ready

### Incremental Delivery

1. Complete Setup + Foundational → Foundation ready
2. Add User Story 1 → Test independently → Deploy/Demo (MVP!)
3. Add User Story 2 → Test independently → Deploy/Demo
4. Add User Story 3 → Test independently → Deploy/Demo
5. Each story adds value without breaking previous stories

### Parallel Team Strategy

With multiple developers:

1. Team completes Setup + Foundational together
2. Once Foundational is done:
   - Developer A: User Story 1
   - Developer B: User Story 2
   - Developer C: User Story 3
3. Stories complete and integrate independently

---

## Notes

- [P] tasks = different files, no dependencies
- [Story] label maps task to specific user story for traceability
- Each user story should be independently completable and testable
- Verify tests fail before implementing
- Commit after each task or logical group
- Stop at any checkpoint to validate story independently
- Avoid: vague tasks, same file conflicts, cross-story dependencies that break independence