# Tasks: User Registration

## Phase 1: Foundation & Logic (TDD)
- [X] T001 [US2] Add password matching validation in `lib/utils/Validation.ts` and tests in `lib/utils/Validation.test.ts`
- [X] T002 [US1] Add `RegisterCredentials` type in `lib/types/Auth.ts`
- [X] T003 [US1] Implement `AuthService.register` in `lib/services/AuthService.ts` and tests in `lib/services/AuthService.test.ts`

## Phase 2: Refactoring & Routing
- [X] T004 Create `app/login/page.tsx` and move content from `app/page.tsx`
- [X] T005 Update `app/page.tsx` to redirect to `/login`
- [X] T006 Update `LoginForm` to link to `/register`

## Phase 3: Registration UI Implementation (TDD)
- [X] T007 [US1] Create integration tests for `RegisterForm` in `components/RegisterForm.test.tsx`
- [X] T008 [US1] Implement `RegisterForm.tsx`
- [X] T009 [US1] Create `app/register/page.tsx`
- [X] T010 [US3] Implement Google/Apple buttons with "Coming soon" alert

## Phase 4: Finalization
- [X] T011 Verify responsive design
- [X] T012 Run all tests (100% pass)
- [X] T013 Final code review
