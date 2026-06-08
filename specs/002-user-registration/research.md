# Technical Research: Register Screen Constraints & Solutions (KynWallet)

Following the strict constraints of the KynWallet Constitution, this research maps the technical design and decisions for the User Registration feature.

## 1. Local Registration Persistence Solution

### Context
The application utilizes an in-memory/simulated `AuthService` loaded with a fixed mock user array (`MOCK_USERS`). If a user registers, we need those credentials preserved of course so the user is redirectable to `/login` and can log in without their credentials vanishing upon page refresh.

### Options Evaluated
* **Option A: Pure Session Memory**. Store newly created users in a module-scoped array inside `AuthService.ts`.
  * *Pros*: Simple to code.
  * *Cons*: If the page reloads or redirects, the state is cleared, making end-to-end verification and real login redirects fail.
* **Option B: Web Storage Persistence (localStorage) inside `AuthService`**.
  * *Pros*: Persists across page reloads and browser transitions. Perfectly simulates a backend database on the client-side. Easy to integrate inside `IAuthService` with an abstract read/write system.
  * *Cons*: Requires standard environment safeguards for Next.js Server-Side Rendering (guard against `typeof window !== 'undefined'`).
  * *Choice*: **Option B selected**. We will enhance `AuthService.ts` to look up credentials sequentially in the fixed list AND in a custom `kyn_wallet_registered_users` array inside standard browser `localStorage`.

---

## 2. No-Dependency Form and Validation Architecture

### Context
The KynWallet Constitution states: *"El uso de librerías externas está estrictamente prohibido"*. We cannot use standard form management libraries (React Hook Form, Formik) or validation engines (Zod, Joi, Yup).

### Solutions
* **State Management**: Standard React `useState` hooks or a lightweight custom state hook `useRegisterForm`.
* **Validation Modules**:
  * Implement pure functional, side-effect-free, easily testable functions inside [lib/utils/Validation.ts](lib/utils/Validation.ts).
  * **FullName**: Must be at least 3 characters and consist only of letters and standard space characters.
  * **Password Complexities**: Minimal size of 8 characters, at least one uppercase letter (A-Z), at least one lowercase letter (a-z), and at least one numeric digit (0-9).
  * **Password Confirmation**: Exact-match parity check.
  * **Email**: Regular expression alignment `/^[^\s@]+@[^\s@]+\.[^\s@]+$/`.

---

## 3. Responsive Screen-Divided Interface Design

### Decisively Matching Figma (ID `31:2`)
* **Responsive Breakpoint**: We use Tailwinds pre-configured `lg` breakpoint (`1024px`).
* **Desktop View**: Under `@media (min-width: 1024px)`, the layout presents elements side-by-side using the pre-existing `<BrandPanel />` component (left-side) taking exactly 50% width and the interactive `RegisterForm` taking the other 50% box area.
* **Mobile View**: Under `1024px`, the system collapses the `BrandPanel` through Tailwind's `hidden lg:flex` properties and scales the registration container up to take full-width of the viewport.
* **UI Controls & Eye Icon Toggle**: Password safety requires visibility controls. We will use a boolean state toggler `showPassword` and `showConfirmPassword` tied to native inline SVG icons inside the customized password input frames.
