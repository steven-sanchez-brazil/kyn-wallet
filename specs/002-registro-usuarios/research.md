# Research: Registro de Usuarios — KynWallet

**Feature**: `specs/002-registro-usuarios`  
**Date**: 2026-06-05

---

## Decisiones Técnicas

### 1. Ruta y página en Next.js App Router

- **Decision**: Crear `app/registro/page.tsx` como Client Component (`'use client'`) para manejar estado del formulario y navegación programática.
- **Rationale**: El App Router de Next.js 14 requiere `'use client'` para hooks de estado (`useState`) y el hook `useRouter` de `next/navigation`. La lógica del formulario es inherentemente cliente.
- **Alternatives considered**: Server Component con `<form action>` — descartado porque las validaciones inline y la deshabilitación condicional del botón requieren estado reactivo en cliente.

### 2. Gestión de estado del formulario

- **Decision**: `useState` nativo de React para cada campo y sus errores. Sin librería de gestión de formularios.
- **Rationale**: La constitución prohíbe librerías externas. El formulario tiene 4 campos y reglas de validación simples, manejables sin abstracción adicional.
- **Alternatives considered**: `useReducer` — válido pero excesivo (YAGNI) para 4 campos.

### 3. Validaciones inline

- **Decision**: Extender `lib/utils/Validation.ts` con `validateFullName` (nombre no vacío, mínimo 2 chars) y `validatePasswordMatch` (igualdad de strings). Disparar validación `onBlur` por campo y `onChange` para confirmar contraseña una vez tocada.
- **Rationale**: Reutiliza el módulo de validación ya existente, sin duplicar lógica. Cumple DRY.
- **Alternatives considered**: Validación dentro del componente — descartado por violar SRP y DRY.

### 4. Habilitación condicional del botón

- **Decision**: Botón deshabilitado mientras `!isFormValid`. `isFormValid` se computa en cada render: todos los campos no vacíos + checkbox `true` + sin errores activos.
- **Rationale**: Lógica declarativa, sin efecto secundario. El atributo nativo `disabled` bloquea envío con Enter también.
- **Alternatives considered**: Deshabilitar solo por `onSubmit` — descartado porque no guía al usuario visualmente.

### 5. Redirección tras registro exitoso con mensaje de éxito

- **Decision**: Usar `router.push('/login')` de `next/navigation` tras registro exitoso. El mensaje de éxito se pasa como query param: `/login?registered=true`.
- **Rationale**: Sin librerías externas de state management. Query param es la forma nativa de Next.js para pasar estado entre páginas sin localStorage. La página de login leerá `searchParams.registered` para mostrar el banner.
- **Alternatives considered**: `sessionStorage` — descartado para no acoplar páginas via storage. `useContext` global — excesivo (YAGNI).

### 6. Botones sociales (Google / Apple)

- **Decision**: Reutilizar `SocialLogins.tsx` ya existente. Si no acepta callback `onSocialLogin`, extender para recibir `onPress?: () => void` genérico que dispare `window.alert('Próximamente')` desde la página padre.
- **Rationale**: DRY total. El componente ya existe para login; se reutiliza en registro con la misma semántica de "próximamente".
- **Alternatives considered**: Crear `SocialLoginsRegister` — descartado, viola DRY.

### 7. Layout de dos paneles (desktop) / un panel (móvil)

- **Decision**: Reutilizar `BrandPanel.tsx` sin modificaciones. La página de registro replica el layout de la página de login: `flex` en root, `BrandPanel` oculto en móvil (`hidden lg:flex`), formulario ocupa `w-full lg:w-1/2`.
- **Rationale**: DRY total. La misma estructura visual ya validada en `/login`.
- **Alternatives considered**: Crear un layout compartido en `app/layout.tsx` — descartado, el layout raíz es genérico; el layout de dos paneles aplica solo a auth pages.

### 8. Extensión de `AuthService` para registro

- **Decision**: Añadir `register(credentials: RegisterCredentials): Promise<RegisterResult>` a `IAuthService` y su implementación mock. Mock: simula delay, verifica que el email no esté ya en `MOCK_USERS`, agrega el usuario y retorna `{ success: true }`.
- **Rationale**: Sigue exactamente el mismo patrón que `login()`. No rompe contratos existentes (extensión, no modificación).
- **Alternatives considered**: Servicio separado `RegisterService` — descartado, viola DRY cuando `AuthService` ya existe y maneja el mismo dominio de autenticación.

### 9. Estrategia TDD

- **Decision**: Escribir primero `Validation.test.ts` (nuevos validadores), luego `AuthService.test.ts` (register mock), luego `RegisterForm.test.tsx` (componente). Ciclo Rojo-Verde-Refactorización por unidad.
- **Rationale**: Constitución lo exige. Vitest + Testing Library ya configurados.
- **Test cases clave**:
  - `validateFullName`: vacío → false, 1 char → false, 2+ chars → true
  - `validatePasswordMatch`: strings iguales → true, distintos → false
  - `AuthService.register`: email nuevo → `{success: true}`, email duplicado → `{success: false, error: 'EMAIL_EXISTS'}`
  - `RegisterForm`: botón deshabilitado inicialmente, habilitado con datos válidos + checkbox, error inline por campo inválido, onSubmit exitoso llama callback

---

## Hallazgos sobre el proyecto existente

| Hallazgo | Implicación |
|----------|-------------|
| `BrandPanel.tsx` usa `hidden lg:flex` | El layout responsive desktop/móvil ya está implementado; solo se reutiliza |
| `Input.tsx` acepta prop `error?: string` | Soporta validaciones inline sin modificación |
| `Button.tsx` acepta `disabled` nativo via `...props` | El botón condicional funciona sin modificar el componente |
| `SocialLogins.tsx` existe pero necesita revisión de props | Puede requerir extensión mínima para aceptar callback de "próximamente" |
| `Validation.ts` tiene `validateEmail` y `validatePassword` | Solo faltan `validateFullName` y `validatePasswordMatch` |
| `AuthService.ts` tiene `login()` e `IAuthService` | Solo necesita extensión con `register()` |
| `vitest.config.ts` ya configurado con jsdom | Tests de componentes listos sin configuración adicional |
