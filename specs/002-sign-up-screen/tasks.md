# Tasks: Sign-Up Screen

**Input**: Design documents from `/specs/002-sign-up-screen/`
**Prerequisites**: plan.md (required), spec.md (required for user stories), research.md, data-model.md, contracts/

**Tests**: This project enforces Test-Driven Development (TDD). Test writing tasks are placed at the beginning of each user story phase and must fail before implementation begins.

**Organization**: Tasks are grouped by user story to enable independent implementation and testing of each story.

## Format: `[ID] [P?] [Story] Description`

- **[P]**: Can run in parallel (different files, no dependencies)
- **[Story]**: Which user story this task belongs to (e.g., US1, US2, US3)
- Include exact file paths in descriptions

## Path Conventions

- **Single project**: Root-level directories `app/`, `components/`, and `lib/` for routing, UI, and business logic respectively.

---

## Phase 1: Setup (Shared Infrastructure)

**Purpose**: Project initialization, layouts, and design tokens structure

- [X] T001 [P] Configure design system tokens and Figma layout parities in lib/constants/DesignTokens.ts
- [X] T002 Setup page-level entry structure and main brand/form grid layout in app/register/page.tsx

---

## Phase 2: Foundational (Blocking Prerequisites)

**Purpose**: Core model types, service contracts, and custom validations that must exist before user stories

**⚠️ CRITICAL**: No user story work can begin until this phase is complete

- [X] T003 Create User and RegisterCredentials type contracts in lib/types/Auth.ts
- [X] T004 Setup IAuthService interface definition and template service export in lib/services/AuthService.ts
- [X] T005 [P] Setup base custom validator functions structure with empty implementations in lib/utils/Validation.ts

**Checkpoint**: Foundation ready - user story implementation can now begin in parallel

---

## Phase 3: User Story 1 - Creación Exitosa de Cuenta (Priority: P1) 🎯 MVP

**Goal**: Allow a new user to enter their full name, email, password, and confirmation, accept terms, click register to persist in-memory, authenticate, and redirect to the construction screen.

**Independent Test**: Enter "Luke Skywalker" with "luke@skywalker.com" and "maytheforce", accept terms, click "Registrarse", verify the in-memory array contains the new user, the user is authenticated, and is redirected to `/construction`.

### Tests for User Story 1 (MANDATORY - TDD Enforced) ⚠️

> **NOTE: Write these tests FIRST, ensure they FAIL before implementation**

- [X] T006 [P] [US1] Unit test register success and email conflict edge cases in lib/services/AuthService.test.ts
- [X] T007 [P] [US1] Unit test redirection on successful signup form submission in components/RegisterForm.test.tsx
- [X] T008 [P] [US1] Integration test the registration page and redirect behaviors in app/register.test.tsx

### Implementation for User Story 1

- [X] T009 [US1] Implement register method, appending new users to the MOCK_USERS array, in-memory authentication state, and email duplicate validation in lib/services/AuthService.ts
- [X] T010 [P] [US1] Implement the `/construction` page placeholder component in app/construction/page.tsx
- [X] T011 [US1] Implement the visual form structure, accept terms checkbox, and success/redirection handler in components/RegisterForm.tsx

**Checkpoint**: At this point, User Story 1 should be fully functional and testable independently (MVP)

---

## Phase 4: User Story 2 - Validaciones de Seguridad y Formato en Tiempo Real (Priority: P2)

**Goal**: Provide immediate, real-time visual feedback under input fields when user enters invalid inputs (name < 3 characters, invalid email format regex, password < 8 characters, mismatched confirmation).

**Independent Test**: Type "Ob" in the name field, "luke@" in email, "force" in password, and "different" in confirm password. Ensure that error messages appear under each field in real-time.

### Tests for User Story 2 (MANDATORY - TDD Enforced) ⚠️

> **NOTE: Write these tests FIRST, ensure they FAIL before implementation**

- [X] T012 [P] [US2] Unit test custom validator functions for names, emails, and passwords in lib/utils/Validation.test.ts
- [X] T013 [P] [US2] Unit test validation error rendering on invalid inputs under form fields in components/RegisterForm.test.tsx

### Implementation for User Story 2

- [X] T014 [US2] Implement regex patterns and whitespace trimming inside custom validator functions in lib/utils/Validation.ts
- [X] T015 [US2] Connect validator functions with real-time validation hooks (useEffect) and render errors in components/RegisterForm.tsx

**Checkpoint**: At this point, User Stories 1 AND 2 should both work independently

---

## Phase 5: User Story 3 - Navegación y Accesos Sociales (Priority: P3)

**Goal**: Implement navigation links to easily go back to Login, and render mock Apple/Google social login buttons that trigger placeholder feedback alerts.

**Independent Test**: Click "¿Ya tienes una cuenta? Inicia sesión" to redirect to `/` (login), and click Google/Apple buttons to check that the upcoming placeholder alerts are displayed.

### Tests for User Story 3 (MANDATORY - TDD Enforced) ⚠️

> **NOTE: Write these tests FIRST, ensure they FAIL before implementation**

- [X] T016 [P] [US3] Unit test the back-to-login navigation link and Apple/Google social login button alerts in components/RegisterForm.test.tsx

### Implementation for User Story 3

- [X] T017 [US3] Add back-to-login link and Apple/Google button click event triggers in components/RegisterForm.tsx
- [X] T018 [P] [US3] Implement social login grid layout and icon button wrappers in components/SocialLogins.tsx

**Checkpoint**: All user stories should now be independently functional

---

## Phase 6: Polish & Cross-Cutting Concerns

**Purpose**: Performance optimizations, responsive Figma pixel-perfect adjustments, and validation verification

- [X] T019 Ensure instant real-time validation performance (<100ms lag) and responsive styling on mobile resolutions in components/RegisterForm.tsx
- [X] T020 Run the quickstart.md validation guide scenarios to verify E2E manual behaviors in specs/002-sign-up-screen/quickstart.md
- [X] T021 [P] Document final verification findings and test suite output in specs/002-sign-up-screen/research.md

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
- **User Story 2 (P2)**: Can start after Foundational (Phase 2) - May integrate with US1 but should be independently testable
- **User Story 3 (P3)**: Can start after Foundational (Phase 2) - May integrate with US1/US2 but should be independently testable

### Within Each User Story

- Tests (if included) MUST be written and FAIL before implementation
- Models before services
- Services before endpoints
- Core implementation before integration
- Story complete before moving to next priority

### Parallel Opportunities

- All Setup tasks marked [P] can run in parallel
- All Foundational tasks marked [P] can run in parallel (within Phase 2)
- Once Foundational phase completes, all user stories can start in parallel (if team capacity allows)
- All tests for a user story marked [P] can run in parallel
- Different user stories can be worked on in parallel by different team members

---

## Parallel Example: User Story 1

```bash
# Launch all tests for User Story 1 together:
Task: "Unit test register success and email conflict edge cases in lib/services/AuthService.test.ts"
Task: "Unit test redirection on successful signup form submission in components/RegisterForm.test.tsx"
Task: "Integration test the registration page and redirect behaviors in app/register.test.tsx"

# Launch in-parallel layout tasks:
Task: "Implement the /construction page placeholder component in app/construction/page.tsx"
```

---

## Implementation Strategy

### MVP First (User Story 1 Only)

1. Complete Phase 1: Setup
2. Complete Phase 2: Foundational (CRITICAL - blocks all stories)
3. Complete Phase 3: User Story 1
4. **STOP and VALIDATE**: Test User Story 1 independently (on vitest and manually)
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
   - Developer A: User Story 1 (Creación Exitosa de Cuenta)
   - Developer B: User Story 2 (Validaciones de Seguridad y Formato en Tiempo Real)
   - Developer C: User Story 3 (Navegación y Accesos Sociales)
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
