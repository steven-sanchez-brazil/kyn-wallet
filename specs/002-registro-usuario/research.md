# Research: Registro de Usuario

> **Todas las decisiones técnicas reutilizan o extienden las decisiones ya tomadas para la feature 001-login-billetera.**
> Se documenta solo lo que es nuevo o específico para el registro.

---

## Decisión: Framework de Testing
- **Decisión**: Vitest + React Testing Library + JSDOM (sin cambios).
- **Rationale**: Mismo stack ya configurado en `vitest.config.ts` y `vitest.setup.ts`. Zero configuración adicional necesaria.
- **Alternativas consideradas**: Ninguna — el stack ya resuelve todos los requisitos de TDD del registro.
- **Referencia**: `specs/001-login-billetera/research.md` — sección "Testing Framework".

---

## Decisión: Estrategia de Mensaje de Éxito Post-Registro
- **Decisión**: Query param `?registered=true` en la URL de redirección hacia `/login`.
- **Rationale**:
  - **Sin librerías externas**: No requiere estado global, context API ni sessionStorage.
  - **SSR-compatible**: `app/page.tsx` puede leer `searchParams` como prop de servidor (Next.js App Router) sin convertirse en Client Component.
  - **Idempotente**: Si el usuario recarga `/login` sin el param, el banner no aparece. Si navega directamente a `/login`, tampoco aparece — comportamiento exacto que requiere el caso extremo de la spec.
  - **Mínima complejidad**: Solo añade un prop `searchParams` a la página existente de login.
- **Alternativas consideradas**:
  - `sessionStorage`: Requiere Client Component y lectura en `useEffect`. Más frágil ante navegación directa.
  - `localStorage`: Persistencia no deseada; podría mostrarse el banner en sesiones futuras.
  - React Context / estado global: Viola la restricción de cero librerías externas si se usa Zustand/Jotai; demasiado complejo para un caso de uso de un solo render.

---

## Decisión: Componente Checkbox
- **Decisión**: Crear `components/ui/Checkbox.tsx` como componente atómico reutilizable.
- **Rationale**:
  - **SRP**: El campo de términos y condiciones requiere label, estado de error y estilo consistente con los tokens de diseño — no es un `<input type="checkbox">` genérico.
  - **DRY**: El patrón de `label + input + error` ya existe en `Input.tsx`. `Checkbox.tsx` replica esa estructura para el tipo `checkbox` en lugar de duplicar la lógica en `RegisterForm`.
  - **YAGNI**: Solo expone las props necesarias (`id`, `label`, `checked`, `onChange`, `error`).
- **Alternativas consideradas**:
  - Inline en `RegisterForm` (como hace `LoginForm` con "Recordarme"): Rechazado porque el checkbox de términos requiere estado de error visible, lo que duplicaría la lógica de display de error fuera del componente atómico.

---

## Decisión: Arquitectura de RegistrationService
- **Decisión**: Espejo exacto del patrón de `AuthService.ts` con interfaz `IRegistrationService`.
- **Rationale**:
  - **DIP**: `RegisterForm` depende de la abstracción `IRegistrationService`, no de la implementación concreta.
  - **Testabilidad**: Permite mockear el servicio en tests (`vi.mock`) igual que se hace con `AuthService`.
  - **Consistencia**: Misma firma async (`Promise<boolean>`), mismo patrón de delay simulado de 500ms.
- **Alternativas consideradas**:
  - Integrar registro en `AuthService`: Rechazado porque viola SRP — autenticación y registro son responsabilidades distintas.

---

## Decisión: Extensión de Validation.ts
- **Decisión**: Agregar `validateName`, `validatePasswordMatch` y `validateTrimmed` al archivo existente `lib/utils/Validation.ts`.
- **Rationale**:
  - **DRY**: Centraliza toda la lógica de validación en un único módulo ya conocido por los consumidores.
  - **OCP**: Las funciones existentes (`validateEmail`, `validatePassword`) no se modifican — solo se agregan funciones nuevas.
  - **Consistencia**: Los tests nuevos en `Validation.test.ts` siguen el patrón `describe/it/expect` ya establecido.
- **Nuevas funciones**:
  - `validateName(name: string): boolean` — nombre no vacío tras trim, permite letras latinas (incluyendo tildes, ñ), espacios. Regex: `/^[a-zA-ZÀ-ÿ\u00f1\u00d1\s]+$/`.
  - `validatePasswordMatch(password: string, confirmPassword: string): boolean` — igualdad exacta entre ambos campos.
  - `validateTrimmed(value: string): boolean` — retorna `false` si hay espacios al inicio o al final (`value !== value.trim()`).
- **Alternativas consideradas**:
  - Archivo `RegistrationValidation.ts` separado: Rechazado por fragmentar la lógica de validación (viola DRY).

---

## Decisión: Comportamiento "Próximamente" en SocialLogins
- **Decisión**: Reutilizar `SocialLogins.tsx` sin modificaciones para la pantalla de registro.
- **Rationale**:
  - El componente ya maneja tanto hover/click con `alert()` en desktop como touch en mobile.
  - El mensaje actual "Google estará disponible próximamente." cumple la intención del FR-009.
  - Modificar el mensaje para que sea solo "Próximamente" es un ajuste cosmético menor que puede hacerse opcionalmente en la implementación sin romper nada.
- **Alternativas consideradas**:
  - Crear `SocialLoginsRegister.tsx`: Rechazado — violaría DRY. Un componente, un comportamiento.

---

## Decisión: Tokens de Diseño
- **Decisión**: Cero nuevos tokens. `DesignTokens.ts` se usa sin modificaciones.
- **Rationale**: La pantalla de registro es visualmente idéntica a login (SC-004: 95% consistencia). Todos los colores, bordes y tipografía necesarios ya existen en `DesignTokens.ts`.
- **Alternativas consideradas**: Ninguna — spec confirma explícitamente que no se introducen nuevos tokens.
