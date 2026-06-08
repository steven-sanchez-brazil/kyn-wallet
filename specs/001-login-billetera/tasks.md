# Tasks: Billetera Virtual Implementation

## Phase 1: Infrastructure & Auth API

- [x] T001 Initialize project structure and design tokens.
- [x] T002 Setup `data/users.json` for persistence.
- [x] T003 Implement `POST /api/auth/register` for user creation.
- [x] T004 Implement `POST /api/auth/login` for user verification.
- [x] T005 Update `AuthService.ts` to use fetch for API calls.

## Phase 2: Login & Registration

- [x] T006 Update `LoginForm.tsx` with Figma styles and social alerts.
- [x] T007 Implement `RegisterForm.tsx` with full validation logic.
- [x] T008 Update `BrandPanel.tsx` to be reusable for both pages.
- [x] T009 Create `/login` and `/registro` pages.
- [x] T010 Implement client-side session management (AuthService).

## Phase 3: Home Dashboard (Desktop)

- [x] T011 Implement `Sidebar.tsx` component.
- [x] T012 Implement `SummaryCards.tsx` (Balance, Income, etc.).
- [x] T013 Implement `QuickActions.tsx` (Send, Receive, etc.).
- [x] T014 Implement `Movements.tsx` (Transaction list).
- [x] T015 Implement `CardVisual.tsx` and `MonthlySummary.tsx`.
- [x] T016 Assemble `/home` desktop layout.

## Phase 4: Home Dashboard (Mobile)

- [x] T017 Implement `MobileHeader.tsx` with gradient and balance.
- [x] T018 Implement `BottomNav.tsx` for mobile navigation.
- [x] T019 Ensure responsive styling for `QuickActions` and `Movements`.
- [x] T020 Finalize `/home` responsive layout.

## Phase 5: Verification

- [x] T021 Verify navigation between all screens.
- [x] T022 Validate password matching and length in Registration.
- [x] T023 Confirm "En Construccion" alerts work as requested.
- [x] T024 Perform final visual audit against Figma.
