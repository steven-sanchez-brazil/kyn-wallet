# Tasks: Login, Register & Home Feature

**Input**: Design documents from Figma and SpecKit requirements
**Prerequisites**: plan.md (required), spec.md (required for user stories), research.md, data-model.md, contracts/

## Format: `[ID] [P?] [Story] Description`

- **[P]**: Can run in parallel (different files, no dependencies)
- **[Story]**: Which user story this task belongs to (e.g., US1, US2, US3)
- Include exact file paths in descriptions

---

## Phase 1: Setup (Shared Infrastructure)

- [X] T001 Initialize Next.js 14 project with TypeScript and Tailwind CSS
- [X] T002 [P] Configure Vitest and React Testing Library in `vitest.config.ts` and `vitest.setup.ts`
- [X] T003 [P] Setup strict `PascalCase` linting rules in `.eslintrc.json`
- [X] T004 Create base directory structure: `app/`, `components/`, `lib/`

---

## Phase 2: Foundational (Blocking Prerequisites)

- [X] T005 [P] Define Figma design tokens in `lib/constants/DesignTokens.ts`
- [X] T006 Integrate design tokens into `tailwind.config.ts`
- [X] T007 Create custom UI base components (Button, Input) in `components/ui/` using tokens
- [X] T008 [P] Implement `AuthCredentials` type in `lib/types/Auth.ts`
- [X] T009 [P] Implement `AuthService` interface and mockup data in `lib/services/AuthService.ts`

---

## Phase 3: Login Implementation (Priority: P1)

- [X] T010 [P] Create unit tests for login logic
- [X] T011 [P] Create integration tests for login flow
- [X] T012 [P] Implement `BrandPanel` component with Figma gradient and mockup in `components/BrandPanel.tsx`
- [X] T013 Implement `LoginForm` core logic and branding in `components/LoginForm.tsx`
- [X] T014 Setup main login page with split layout in `app/page.tsx`
- [X] T015 Create placeholder redirect page in `app/construction/page.tsx`
- [X] T016 Connect `LoginForm` to `authActions` for redirection to `/inicio`

---

## Phase 4: Persistence & Server Actions (New)

- [X] T032 Create `data/users.json` for persistent storage
- [X] T033 Implement `loginAction` in `lib/actions/authActions.ts` using file-based persistence
- [X] T034 Implement `registerAction` in `lib/actions/authActions.ts` to save users to JSON

---

## Phase 5: Registration System (New)

- [X] T035 Implement `RegisterForm` with full validations (FullName, Email, Password, Terms)
- [X] T036 Create registration page in `app/register/page.tsx` using split layout
- [X] T037 Add navigation link from Login to Register
- [X] T038 Add navigation link from Register to Login
- [X] T039 Implement success message on Login screen after successful registration
- [X] T040 Implement "Próximamente" alerts for social logins in registration form

---

## Phase 6: Home Screen (`/inicio`) (New)

- [X] T041 Implement fully responsive `/inicio` page with Desktop/Mobile branching
- [X] T042 Build mobile view (frame 11:2) with balance, quick actions and movements
- [X] T043 Build desktop view (frame 13:2) with sidebar navigation and grid layout
- [X] T044 Implement transaction list component with Figma styles for both views
- [X] T045 Implement bottom navigation for mobile and sidebar for desktop
- [X] T050 Ensure seamless transition between notebook and mobile breakpoints

---

## Phase 7: Polish & Verification

- [X] T046 Verify all "Próximamente" alerts (Google/Apple)
- [X] T047 Perform final visual audit against Figma links for all three screens
- [X] T048 Verify that registration saves correctly in `users.json`
- [X] T049 Confirm redirections: Register -> Login (Success) -> Inicio (Dashboard)
