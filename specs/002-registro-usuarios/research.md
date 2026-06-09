# Phase 0 · Research: Registro de Usuarios

**Feature**: Registro de Usuarios | **Branch**: `feature/registro-jp-fsabate` | **Date**: 2026-06-09

Este documento resuelve las decisiones técnicas necesarias para implementar la feature respetando la constitución (TDD, SOLID, Clean Architecture, DRY/YAGNI, sin librerías externas). No quedaron marcadores NEEDS CLARIFICATION en la spec.

---

## D1 · Ruteo: Registro en `/` y Login en `/login`

- **Decisión**: Renderizar la página de Registro desde `app/page.tsx`. Crear `app/login/page.tsx` que renderiza el login existente (BrandPanel + `LoginForm`).
- **Rationale**: La spec exige `/` → Registro (FR-001) y `/login` → Login (FR-002). El componente `LoginForm` no se modifica, por lo que `app/login.test.tsx` y `components/LoginForm.test.tsx` (que lo importan directamente) permanecen verdes.
- **Alternativas consideradas**:
  - Mantener login en `/` y registro en `/register` → rechazada: contradice el requisito explícito.
  - Usar grupos de rutas `(auth)` → rechazada: complejidad innecesaria (YAGNI) para dos rutas simples.

## D2 · Reutilización de validaciones (`lib/utils/Validation.ts`)

- **Decisión**: Reutilizar `validateEmail` y `validatePassword`; agregar funciones puras nuevas: `validateRequired(value)`, `validatePasswordsMatch(password, confirm)` y `validateFullName(name)`.
- **Rationale**: DRY — las reglas de correo (FR-006) y contraseña mínima de 8 (FR-007) ya existen. Las nuevas reglas (campos obligatorios FR-009, coincidencia FR-008, nombre completo FR-003) se añaden como funciones puras testeables independientemente (SOLID/SRP).
- **Alternativas consideradas**:
  - Validar todo dentro del componente → rechazada: mezcla UI con lógica de dominio, dificulta el TDD unitario.
  - Una sola función monolítica `validateRegister` → rechazada: viola SRP y reduce reutilización.

## D3 · Servicio de registro simulado (`lib/services/AuthService.ts`)

- **Decisión**: Extender `IAuthService` con `register(credentials: RegisterCredentials): Promise<RegisterResult>`. Simula un delay (igual que `login`), verifica duplicados contra el arreglo mock `MOCK_USERS` (FR-023) y, si no existe, agrega el usuario y retorna éxito.
- **Rationale**: Mantiene el patrón existente (mock en memoria, interfaz `IAuthService`), respeta Inversión de Dependencias y no agrega librerías. La verificación de duplicados cubre el caso límite de unicidad.
- **Alternativas consideradas**:
  - Crear un `RegisterService` separado → rechazada por ahora: `AuthService` ya agrupa la autenticación; separar añadiría una capa sin beneficio inmediato (YAGNI). Se mantiene una sola responsabilidad de "autenticación" cohesiva.
  - Persistencia en `localStorage` → rechazada: fuera de alcance; el login usa memoria.

## D4 · Tipos de registro (`lib/types/Auth.ts`)

- **Decisión**: Agregar `RegisterCredentials` (`FullName`, `Email`, `Password`, `ConfirmPassword`, `AcceptedTerms`) y `RegisterResult` (`Success: boolean`, `Error?: string`).
- **Rationale**: Tipado fuerte para la frontera del servicio; `PascalCase` en propiedades consistente con `AuthCredentials`/`User` existentes.
- **Alternativas consideradas**: Reusar `AuthCredentials` → rechazada: el registro tiene más campos.

## D5 · Componente `RegisterForm` (patrón `LoginForm`)

- **Decisión**: Crear `components/RegisterForm.tsx` (client component) replicando el patrón de `LoginForm`: estado por campo, validación en tiempo real con `useEffect`, validación final en `handleSubmit`, errores inline vía prop `error` de `Input`, botón con `Button`, y `SocialLogins` para Google/Apple.
- **Rationale**: DRY y consistencia visual/UX. Reutiliza `Input` (radio 12px, error inline), `Button` (`bg-brand-primary`) y `SocialLogins` (alerts "Próximamente").
- **Ajuste necesario**: El texto actual de `SocialLogins` es "{Provider} estará disponible próximamente." La spec exige el texto exacto **"Próximamente"** (FR-013). Se documenta como decisión D7.
- **Alternativas consideradas**: Formulario genérico configurable → rechazada (YAGNI).

## D6 · Mensaje de éxito tras el registro

- **Decisión**: `RegisterForm` redirige a `/login?registered=true`. La página `/login` lee `useSearchParams()` y, si `registered=true`, muestra un banner de éxito visible (FR-012).
- **Rationale**: Nativo de Next.js, sin estado global ni librerías; testeable simulando `useSearchParams`.
- **Alternativas consideradas**: Context/estado global o `localStorage` → rechazadas (YAGNI, complejidad).

## D7 · Texto exacto de los accesos sociales

- **Decisión**: Para el registro, los botones Google/Apple deben mostrar el aviso con el texto exacto **"Próximamente"** (FR-013). Se parametrizará el mensaje al reutilizar `SocialLogins`, o se usará un manejador propio en `RegisterForm` que invoque `alert('Próximamente')`, sin alterar el comportamiento actual del login.
- **Rationale**: Cumple el criterio medible SC-006 sin romper los tests existentes del login.
- **Alternativas consideradas**: Cambiar globalmente el texto de `SocialLogins` → rechazada: afectaría la UX del login y sus expectativas actuales.

## D8 · Responsive (desktop 2 paneles / mobile solo formulario)

- **Decisión**: Reutilizar el layout dividido de `app/page.tsx`: `BrandPanel` con clases `hidden lg:flex` (solo desktop) y el formulario a ancho completo en mobile (FR-015, SC-005).
- **Rationale**: El patrón ya existe y cumple el requisito sin CSS adicional. Breakpoint `lg` de Tailwind (≥1024px) para 2 paneles; <1024px solo formulario.
- **Alternativas consideradas**: Media queries manuales → rechazada (Tailwind ya lo resuelve, DRY).

## D9 · Fidelidad visual y tokens de diseño

- **Decisión**: Usar los tokens ya definidos en `lib/constants/DesignTokens.ts` y `tailwind.config.ts` (`brand-primary #ff6b3d`, `neutral-900 #16182c`, `neutral-500`, `neutral-300 #d7d9e6`, radios 12px/6px). El texto del BrandPanel para Registro ("Comienza tu camino financiero." + subtexto) se aporta vía contenido del frame "04 · Registro".
- **Rationale**: Reutiliza tokens existentes (DRY) y cubre FR-016 a FR-021 y SC-003/SC-004.
- **Nota**: `BrandPanel` actual tiene textos del login hardcodeados ("Tu dinero, sin fronteras."). Para Registro se requieren los textos del frame "04 · Registro". Se introducirá una prop opcional (p. ej. `headline`/`subtext`) con valores por defecto = login, manteniendo compatibilidad y tests verdes.

## D10 · Estrategia de pruebas (TDD)

- **Decisión**: Escribir primero los tests (Rojo) por capa:
  - `Validation.test.ts`: nuevas funciones puras.
  - `AuthService.test.ts`: `register()` éxito, duplicado, formato.
  - `RegisterForm.test.tsx`: validaciones inline por campo, bloqueo de envío, alerts "Próximamente", navegación a `/login?registered=true`.
  - `register.test.tsx` (app): integración de la página `/`.
  - Test del banner de éxito en `/login` leyendo `registered=true`.
- **Rationale**: Cumple el principio I (TDD) y los criterios SC-001/SC-002/SC-006/SC-007.
- **Regresión**: ejecutar toda la suite para confirmar que login permanece verde.

---

## Resumen de decisiones

| ID | Decisión | Requisitos cubiertos |
|----|----------|----------------------|
| D1 | Registro en `/`, login en `/login` | FR-001, FR-002 |
| D2 | Validaciones puras reutilizables | FR-003, FR-006–FR-011 |
| D3 | `register()` simulado + duplicados | FR-005, FR-012, FR-023 |
| D4 | Tipos `RegisterCredentials`/`RegisterResult` | Entidades clave |
| D5 | `RegisterForm` patrón LoginForm | FR-003–FR-005, FR-022 |
| D6 | Mensaje éxito vía query param | FR-012 |
| D7 | Texto exacto "Próximamente" | FR-013 |
| D8 | Responsive con breakpoint `lg` | FR-015 |
| D9 | Tokens de diseño existentes | FR-016–FR-021 |
| D10 | TDD por capas + regresión login | Constitución I |
