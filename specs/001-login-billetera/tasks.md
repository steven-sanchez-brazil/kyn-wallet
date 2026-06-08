# Tasks: Registro de Billetera Virtual

**Input**: Design documents from `/specs/001-login-billetera/`

**Prerequisites**: plan.md (required), spec.md (required for user stories), research.md, data-model.md, contracts/

**Tests**: TDD is mandatory for this feature, so tests are included for each story before implementation.

**Organization**: Tasks are grouped by user story to enable independent implementation and testing of each story.

## Format: `[ID] [P?] [Story] Description`

- **[P]**: Can run in parallel (different files, no dependencies)
- **[Story]**: Which user story this task belongs to (e.g., US1, US2, US3)
- Include exact file paths in descriptions

## Phase 1: Setup (Shared Infrastructure)

**Purpose**: Project initialization and base application structure

- [X] T001 Initialize the Next.js app with TypeScript and Tailwind CSS in package.json, tsconfig.json, next.config.mjs, postcss.config.mjs, and tailwind.config.ts
- [X] T002 Create the base app shell in app/layout.tsx and app/globals.css using the shared visual language from the Figma frame
- [X] T003 [P] Create the root landing redirect in app/page.tsx so the app opens on the registration flow

---

## Phase 2: Foundational (Blocking Prerequisites)

**Purpose**: Core infrastructure that MUST be complete before ANY user story can be implemented

**⚠️ CRITICAL**: No user story work can begin until this phase is complete

- [X] T004 [P] Define the shared routing constants and protected path helpers in lib/routes.ts
- [X] T005 [P] Implement the simulated session state helpers in lib/auth/session.ts
- [X] T006 [P] Implement the hardcoded demo user and registration data store in lib/auth/demoUsers.ts
- [X] T007 [P] Implement the pure registration validation rules in lib/auth/validation.ts
- [X] T008 Create the shared route guard component in components/ProtectedRoute.tsx for authenticated-only pages

**Checkpoint**: Foundation ready - user story implementation can now begin in parallel

---

## Phase 3: User Story 1 - Ver pantalla de registro (Priority: P1) 🎯 MVP

**Goal**: Show a faithful registration screen that matches the selected Figma frame and exposes the full entry form.

**Independent Test**: Open the app in a fresh session and confirm the registration screen renders with the brand panel, form fields, social buttons, and the `Inicia sesión` link.

### Tests for User Story 1

> **NOTE: Write these tests FIRST, ensure they FAIL before implementation**

- [ ] T009 [P] [US1] Add a rendering test for the registration page in tests/unit/register-page.test.tsx
- [ ] T010 [P] [US1] Add a layout snapshot or structural test for the brand panel and form hierarchy in tests/unit/registration-layout.test.tsx

### Implementation for User Story 1

- [X] T011 [P] [US1] Build the brand panel component in components/BrandPanel.tsx to match the left side of the Figma frame
- [X] T012 [P] [US1] Build the social button component group in components/SocialButtons.tsx for Google and Apple actions
- [X] T013 [US1] Compose the registration form screen in app/register/page.tsx using the shared layout and components
- [X] T014 [US1] Add the registration form UI in components/RegistrationForm.tsx with name, email, password, confirm password, and terms controls
- [X] T015 [US1] Add the login navigation entry in app/login/page.tsx as the visible destination of the `Inicia sesión` action

**Checkpoint**: At this point, User Story 1 should be fully functional and testable independently

---

## Phase 4: User Story 2 - Crear una cuenta con datos válidos (Priority: P2)

**Goal**: Validate the form, simulate account creation with hardcoded data, and redirect to the login page.

**Independent Test**: Submit valid name, email, password, confirm password, and terms acceptance and verify the app creates the demo session and navigates to the login page.

### Tests for User Story 2

- [ ] T016 [P] [US2] Add a validation test for successful registration in tests/unit/registration-validation-success.test.ts
- [ ] T017 [P] [US2] Add a login redirect test for the registration success flow in tests/integration/login-redirect.test.ts

### Implementation for User Story 2

- [X] T018 [P] [US2] Wire the submit handler in components/RegistrationForm.tsx to call the validation helpers and simulated session helpers
- [X] T019 [US2] Implement successful account creation and redirect logic in app/register/page.tsx
- [X] T020 [US2] Implement the login screen in app/login/page.tsx using the Figma frame `01 · Login`
- [X] T021 [US2] Ensure authenticated users and successful registrations can reach the login page through components/ProtectedRoute.tsx and lib/routes.ts

**Checkpoint**: At this point, User Stories 1 AND 2 should both work independently

---

## Phase 5: User Story 3 - Rechazar registros inválidos y entradas vacías (Priority: P3)

**Goal**: Block invalid submissions and show clear feedback for empty fields, malformed emails, mismatched passwords, and unchecked terms.

**Independent Test**: Submit invalid or incomplete input combinations and verify the form blocks creation and shows a clear error message.

### Tests for User Story 3

- [ ] T022 [P] [US3] Add empty-field and invalid-email validation tests in tests/unit/registration-validation-errors.test.ts
- [ ] T023 [P] [US3] Add a password-mismatch validation test in tests/unit/password-confirmation.test.ts
- [ ] T024 [P] [US3] Add a direct access redirect test for unauthenticated users in tests/integration/protected-route-redirect.test.ts

### Implementation for User Story 3

- [ ] T025 [P] [US3] Extend lib/auth/validation.ts with explicit error messages for empty fields, invalid email, mismatched passwords, and terms not accepted
- [ ] T026 [US3] Surface validation feedback in components/RegistrationForm.tsx with inline or summary error states
- [ ] T027 [US3] Enforce authenticated-only access in shared protected routes using the shared protected route helper

**Checkpoint**: All user stories should now be independently functional

---

## Phase 6: Polish & Cross-Cutting Concerns

**Purpose**: Improvements that affect multiple user stories

- [ ] T028 [P] Refine the visual fidelity of app/register/page.tsx and components/BrandPanel.tsx to better match the Figma frame spacing, typography, and color hierarchy
- [ ] T029 [P] Add shared accessibility improvements and form semantics across components/RegistrationForm.tsx, components/SocialButtons.tsx, and app/login/page.tsx
- [ ] T030 Run a final type and build validation pass against the completed Next.js app and update specs/001-login-billetera/quickstart.md if any run instructions need adjustment

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
- **User Story 2 (P2)**: Can start after Foundational (Phase 2) - Builds on US1 but remains independently testable
- **User Story 3 (P3)**: Can start after Foundational (Phase 2) - Builds on US1/US2 but remains independently testable

### Within Each User Story

- Tests MUST be written and FAIL before implementation
- Models/helpers before services/page wiring
- Services/helpers before page submission or routing logic
- Core implementation before polish
- Story complete before moving to next priority

### Parallel Opportunities

- All Setup tasks marked [P] can run in parallel
- All Foundational tasks marked [P] can run in parallel (within Phase 2)
- Once Foundational phase completes, all user stories can start in parallel (if team capacity allows)
- All tests for a user story marked [P] can run in parallel
- Shared helper modules within a story marked [P] can run in parallel
- Different user stories can be worked on in parallel by different team members

---

## Parallel Example: User Story 1

```bash
# Launch all tests for User Story 1 together:
Task: "Add a rendering test for the registration page in tests/unit/register-page.test.tsx"
Task: "Add a layout snapshot or structural test for the brand panel and form hierarchy in tests/unit/registration-layout.test.tsx"

# Launch all presentation components for User Story 1 together:
Task: "Build the brand panel component in components/BrandPanel.tsx to match the left side of the Figma frame"
Task: "Build the social button component group in components/SocialButtons.tsx for Google and Apple actions"
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
