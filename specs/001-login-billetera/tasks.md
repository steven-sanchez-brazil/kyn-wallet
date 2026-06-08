# Tasks: Login Feature Update

**Input**: Design documents from `/specs/001-login-billetera/`
**Prerequisites**: plan.md (required), spec.md (required for user stories), research.md, data-model.md, contracts/

## Format: `[ID] [P?] [Story] Description`

- **[P]**: Can run in parallel (different files, no dependencies)
- **[Story]**: Which user story this task belongs to (e.g., US1, US2, US3)
- Include exact file paths in descriptions

---

## Phase 1: Setup (Shared Infrastructure)

**Purpose**: Project initialization and basic structure

- [X] T001 Initialize Next.js 14 project with TypeScript and Tailwind CSS
- [X] T002 [P] Configure Vitest and React Testing Library in `vitest.config.ts` and `vitest.setup.ts`
- [X] T003 [P] Setup strict `PascalCase` linting rules in `.eslintrc.json`
- [X] T004 Create base directory structure: `app/`, `components/`, `lib/`

---

## Phase 2: Foundational (Blocking Prerequisites)

**Purpose**: Core infrastructure and design tokens

- [X] T005 [P] Define Figma design tokens in `lib/constants/DesignTokens.ts`
- [X] T006 Integrate design tokens into `tailwind.config.ts`
- [X] T007 Create custom UI base components (Button, Input) in `components/ui/` using tokens
- [X] T008 [P] Implement `AuthCredentials` type in `lib/types/Auth.ts`
- [X] T009 [P] Implement `AuthService` interface and mockup data in `lib/services/AuthService.ts`
- [X] T032 [P] Extend `DesignTokens.ts` with new tokens: `Brand600` (#ef5226), `Neutral700` (#3d3f5c), `Neutral400` (#a9abc2), `BorderRadiusXl` (22px), `InputHeight` (52px), `SocialButtonHeight` (48px), `BrandPanelPaddingX` (56px), `BrandPanelPaddingY` (64px) in `lib/constants/DesignTokens.ts`
- [X] T033 Update `tailwind.config.ts` to include new extended tokens from T032

**⚠️ CRITICAL**: T032-T033 must be completed before new user story implementation (US4, US5)

---

## Phase 3: User Story 1 - Autenticación Exitosa (Priority: P1) 🎯 MVP

**Goal**: Complete login flow with branding and successful redirection.

**Independent Test**: Verify login with `tucorreo@ejemplo.com` redirects to `/construction`.

### Tests for User Story 1 (MANDATORY - TDD) ⚠️

- [X] T010 [P] [US1] Create unit tests for `AuthService.login` in `lib/services/AuthService.test.ts`
- [X] T011 [P] [US1] Create integration tests for login flow in `app/login.test.tsx`

### Implementation for User Story 1

- [X] T012 [P] [US1] Implement `BrandPanel` component with Figma gradient and mockup in `components/BrandPanel.tsx`
- [X] T013 [US1] Implement `LoginForm` core logic and branding in `components/LoginForm.tsx`
- [X] T014 [US1] Setup main login page with split layout in `app/page.tsx`
- [X] T015 [US1] Create placeholder redirect page in `app/construction/page.tsx`
- [X] T016 [US1] Connect `LoginForm` to `AuthService` for redirection logic

---

## Phase 4: User Story 2 - Retroalimentación de Diseño y Validaciones (Priority: P2)

**Goal**: Apply exact Figma styles and real-time validations.

**Independent Test**: Inspect radio de borde 12px and verify error message on empty fields.

### Tests for User Story 2 (TDD) ⚠️

- [X] T017 [P] [US2] Create unit tests for input validation logic in `lib/utils/Validation.test.ts`
- [X] T018 [US2] Add UI tests for error message visibility in `components/LoginForm.test.tsx`

### Implementation for User Story 2

- [X] T019 [P] [US2] Implement validation utility functions in `lib/utils/Validation.ts`
- [X] T020 [US2] Update `LoginForm.tsx` with real-time validation feedback and Figma error styles
- [X] T021 [US2] Ensure all input elements in `components/ui/` strictly follow the 12px border-radius from tokens
- [X] T022 [US2] Apply SemiBold Inter font to the "Iniciar sesión" button in `components/ui/Button.tsx`

---

## Phase 5: User Story 3 - Interacción con Elementos Secundarios (Priority: P3)

**Goal**: Include "Recordarme", Google/Apple buttons with "Próximamente" alerts.

**Independent Test**: Click Google button and verify native alert display.

### Implementation for User Story 3

- [X] T023 [P] [US3] Implement social login buttons in `components/SocialLogins.tsx` with Figma styles
- [X] T024 [P] [US3] Add "Recordarme" checkbox and "Olvidaste tu contraseña" link in `components/LoginForm.tsx`
- [X] T025 [US3] Add native alert handlers for secondary actions in `components/LoginForm.tsx` and `components/SocialLogins.tsx`
- [X] T026 [US3] Implement the "o continúa con" divider in `components/LoginForm.tsx`

---

## Phase 6: User Story 4 - Navegación a Registro (Priority: P2)

**Goal**: Enable navigation from login to registration page via "Regístrate" footer link.

**Independent Test**: Click "Regístrate" and verify browser navigates to `/register`.

### Tests for User Story 4 (TDD) ⚠️

- [X] T034 [P] [US4] Create test for "Regístrate" link navigation in `components/LoginForm.test.tsx`
- [X] T035 [P] [US4] Create test for "¿Olvidaste tu contraseña?" alert behavior in `components/LoginForm.test.tsx`

### Implementation for User Story 4

- [X] T036 [US4] Add "¿No tienes cuenta? Regístrate" footer with Next.js `Link` to `/register` in `components/LoginForm.tsx`
- [X] T037 [US4] Style footer links with Brand/600 color `#ef5226` SemiBold 14px per FR-011 in `components/LoginForm.tsx`
- [X] T038 [US4] Update "¿Olvidaste tu contraseña?" link to use `#ef5226` color per FR-011 in `components/LoginForm.tsx`

**Checkpoint**: "Regístrate" navigates to `/register` and action links use correct Brand/600 color.

---

## Phase 7: User Story 5 - Toggle de Visibilidad de Contraseña (Priority: P2)

**Goal**: Allow users to toggle password visibility with an eye icon.

**Independent Test**: Click eye icon and verify input type toggles between `password` and `text`.

### Tests for User Story 5 (TDD) ⚠️

- [X] T039 [P] [US5] Create test for password visibility toggle in `components/ui/Input.tsx` rendering in `components/LoginForm.test.tsx`

### Implementation for User Story 5

- [X] T040 [US5] Add `showToggle` prop and eye icon SVG to `components/ui/Input.tsx` per FR-009
- [X] T041 [US5] Implement internal `showPassword` state toggle logic in `components/ui/Input.tsx`
- [X] T042 [US5] Connect password input in `components/LoginForm.tsx` to use `showToggle={true}` prop

**Checkpoint**: Password field shows/hides text on eye icon click.

---

## Phase 8: Design Token Alignment & Visual Polish

**Purpose**: Apply remaining FR-012 to FR-017 specifications to existing components.

- [X] T043 [P] Update labels in `components/LoginForm.tsx` to use Inter Medium 14px `#3d3f5c` (Neutral 700) per FR-012
- [X] T044 [P] Set input height to 52px in `components/ui/Input.tsx` per FR-013
- [X] T045 [P] Set social button height to 48px in `components/SocialLogins.tsx` per FR-013
- [X] T046 [P] Update `BrandPanel.tsx` headline to "Tu dinero, sin fronteras." Bold 44px and subtitle Regular 17px `rgba(255,255,255,0.85)` per FR-014
- [X] T047 [P] Set Card Mockup border-radius to 22px and Brand Panel padding to 56px/64px in `components/BrandPanel.tsx` per FR-015
- [X] T048 [P] Update divider text to "o continúa con" Regular 13px `#8a8ca8` with `#d7d9e6` lines per FR-016 in `components/SocialLogins.tsx`
- [X] T049 [P] Set placeholder color to `#a9abc2` Regular 15px in `components/ui/Input.tsx` per FR-017
- [X] T050 Run all tests and ensure 100% pass rate
- [X] T051 Perform final visual audit against Figma frame (node 2:2)
- [X] T052 Run quickstart.md validation scenarios manually

---

## Dependencies & Execution Order

### Phase Dependencies

- **Setup (Phase 1)**: ✅ Complete
- **Foundational (Phase 2)**: T032-T033 must be completed first (new tokens)
- **User Story 1-3 (Phases 3-5)**: ✅ Complete
- **User Story 4 (Phase 6)**: Depends on T032-T033 (Brand/600 token)
- **User Story 5 (Phase 7)**: Depends on T032-T033 (no additional dependencies)
- **Visual Polish (Phase 8)**: Depends on T032-T033, can run in parallel with US4/US5
- US4 and US5 can be worked on in parallel (different components/concerns)

### Within New Tasks

- T032 → T033 (tokens defined before Tailwind config)
- T034-T035 → T036-T038 (TDD: tests fail first)
- T039 → T040-T042 (TDD: tests fail first)
- T043-T049 can ALL run in parallel (different files)

### Parallel Opportunities

```bash
# After T032-T033, all of these can start simultaneously:
# Stream A: User Story 4 (T034-T038)
# Stream B: User Story 5 (T039-T042)
# Stream C: Visual Polish (T043-T049)
```

---

## Parallel Example: New Tasks

```bash
# Stream A - After T033:
Task: T034 [P] Test "Regístrate" navigation
Task: T035 [P] Test "Olvidaste contraseña" alert

# Stream B - After T033:
Task: T039 [P] Test password toggle

# Stream C - After T033 (ALL parallel):
Task: T043 [P] Labels Neutral 700
Task: T044 [P] Input height 52px
Task: T045 [P] Social button height 48px
Task: T046 [P] Brand Panel headline
Task: T047 [P] Card Mockup 22px + padding
Task: T048 [P] Divider text style
Task: T049 [P] Placeholder color
```

---

## Implementation Strategy

### MVP First (User Story 1 Only)

1. ✅ Complete Setup and Foundational tasks (T001-T009).
2. ✅ Complete US1 tasks (T010-T016).
3. ✅ Login functional (MVP delivered).

### Incremental Delivery (Current Sprint)

1. ✅ Foundation ready (T001-T009)
2. ✅ Login functional - MVP (US1)
3. ✅ Design polished with validations (US2)
4. ✅ Secondary actions added (US3)
5. **Next**: Extend tokens (T032-T033)
6. **Next**: Navigation to register (US4) + Password toggle (US5) — parallel
7. **Next**: Visual polish alignment (Phase 8)
8. **Final**: Full audit and test verification
