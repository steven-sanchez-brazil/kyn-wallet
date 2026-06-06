# Research — Pantalla de Registro

**Feature**: 002-registro-wallet | **Date**: 2026-06-06

Sin marcadores `NEEDS CLARIFICATION` pendientes. Las decisiones técnicas se derivan del Login ya implementado (feature 001) y de la directiva del usuario (Next.js + React + Tailwind, estructura `app/`/`components/`/`lib/`).

## D1 — Reutilización del código del Login

- **Decisión**: Reutilizar `BrandPanel`, `components/ui/Input`, `components/ui/Button`, `SocialLogins`, `lib/utils/Validation`, `lib/constants/DesignTokens` y la página `app/construction/page.tsx`.
- **Rationale**: Principio DRY de la constitución; el diseño de registro comparte el sistema visual del Login. Reduce superficie de código y riesgo de inconsistencias.
- **Alternativas consideradas**: Crear componentes nuevos e independientes para registro → rechazado por duplicación y divergencia visual.

## D2 — Fuente única de usuarios: `UserStore` compartido

- **Decisión**: Introducir `lib/services/UserStore.ts` (en memoria) con `findByEmail(email)` y `add(user)`, sembrado con el usuario mock existente. Refactorizar `AuthService` para consumir `UserStore`; `RegistrationService` lo usa para validar duplicados y dar de alta.
- **Rationale**: La verificación de correo duplicado (FR-008) exige una fuente de verdad única. Centralizar evita dos arrays divergentes (login vs registro) y respeta SOLID (inversión de dependencias vía `IUserStore`).
- **Alternativas consideradas**: (a) Que `RegistrationService` mantenga su propio array → rompe la coherencia con el login y duplica datos. (b) No validar duplicados → contradice la aclaración del spec.

## D3 — Toggle mostrar/ocultar contraseña: `PasswordInput`

- **Decisión**: Crear `components/ui/PasswordInput.tsx` que componga `ui/Input` y añada un botón para alternar `type` entre `password` y `text`. Se usa en Contraseña y Confirmar contraseña.
- **Rationale**: El diseño muestra el control de visibilidad (FR-013). Componer en lugar de modificar `Input` mantiene `Input` genérico (Open/Closed) y evita acoplar lógica de contraseña a un input de propósito general.
- **Alternativas consideradas**: Añadir la lógica del toggle dentro de `ui/Input` → rechazado por sobrecargar el componente base (YAGNI/SRP).

## D4 — Parametrización de `BrandPanel`

- **Decisión**: Extender `BrandPanel` con props opcionales `title` y `subtitle` (y, si aplica, líneas del título), con valores por defecto iguales al texto actual del Login. La página de registro pasa "Comienza tu camino financiero." y el subtítulo correspondiente.
- **Rationale**: Reutiliza logo + mockup de tarjeta sin duplicar el componente. Open/Closed: el Login no cambia (usa defaults); el registro extiende vía props.
- **Alternativas consideradas**: Duplicar `BrandPanel` como `RegisterBrandPanel` → rechazado por duplicación.

## D5 — Ruta de la pantalla de registro

- **Decisión**: `app/register/page.tsx`, accesible en `/register`. El enlace "¿Ya tienes cuenta? Inicia sesión" navega a `/`.
- **Rationale**: Coherente con la convención de rutas en inglés ya usada (`/construction`). Mantiene el Login en `/`.
- **Alternativas consideradas**: `/registro` (español) → válido, pero se prioriza la coherencia con `/construction` existente.

## D6 — Genericizar la página `/construction`

- **Decisión**: Ajustar el copy de `app/construction/page.tsx` para que sea neutral respecto al flujo de origen (no específico de "iniciar sesión"), de modo que sirva tanto al login como al registro.
- **Rationale**: La página es el destino compartido tras ambos flujos (FR-010/FR-011). Un copy genérico evita mensajes incorrectos ("Has iniciado sesión") cuando se llega desde el registro.
- **Alternativas consideradas**: Crear una página de construcción separada para registro → rechazado (duplicación, YAGNI).

## D7 — Runner de pruebas y estrategia TDD

- **Decisión**: Vitest (ya configurado: `vitest.config.ts`, `@testing-library/react`, `jsdom`). Tests primero para `Validation`, `RegistrationService`, `RegisterForm` y la ruta `/register`.
- **Rationale**: Resuelve el `NEEDS CLARIFICATION` que el plan del Login dejó abierto; el proyecto ya tiene Vitest instalado y un patrón de tests (`login.test.tsx`, `Validation.test.ts`, etc.).
- **Alternativas consideradas**: Jest → rechazado; Vitest ya está integrado.

## D8 — Validación de términos y condiciones

- **Decisión**: La casilla "Acepto los términos y condiciones" es obligatoria; el envío se bloquea y se muestra mensaje si no está marcada (FR-007). El enlace de términos es visual.
- **Rationale**: Aclaración registrada en el spec (sesión 2026-06-06).
- **Alternativas consideradas**: Casilla opcional → descartada por la aclaración del usuario.
