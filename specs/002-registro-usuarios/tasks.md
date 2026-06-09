---
description: "Task list for Registro de Usuarios"
---

# Tasks: Registro de Usuarios

**Input**: Design documents from `/specs/002-registro-usuarios/`

**Prerequisites**: plan.md, spec.md, research.md, data-model.md, contracts/register-service.md, quickstart.md

**Tests**: TDD es obligatorio por constitución. Cada historia incluye tareas de tests ANTES de la implementación (Rojo → Verde → Refactor).

**Organization**: Tareas agrupadas por historia de usuario para implementación y prueba independientes.

## Format: `[ID] [P?] [Story] Description`

- **[P]**: Puede ejecutarse en paralelo (distinto archivo, sin dependencias pendientes)
- **[Story]**: Historia a la que pertenece (US1, US2, US3, US4)
- Rutas de archivo exactas incluidas en cada descripción

## Path Conventions

Proyecto único Next.js 14 App Router en la raíz del repo: `app/`, `components/`, `lib/`.

---

## Phase 1: Setup (Shared Infrastructure)

**Purpose**: El proyecto ya está inicializado (Next.js 14, TypeScript, Tailwind, Vitest + RTL). Solo se preparan las fronteras de tipos.

- [X] T001 Verificar entorno de pruebas ejecutando `npm run test -- --run` y confirmar que la suite actual (login) está verde antes de comenzar.
- [X] T002 [P] Agregar los tipos `RegisterCredentials` y `RegisterResult` (propiedades en `PascalCase`) en [lib/types/Auth.ts](../../lib/types/Auth.ts) según data-model.md.

---

## Phase 2: Foundational (Blocking Prerequisites)

**Purpose**: Validaciones puras y servicio de registro simulado, base de la que dependen el formulario y las rutas.

**⚠️ CRITICAL**: Ninguna historia puede completarse hasta finalizar esta fase.

### Tests (escribir primero, deben FALLAR)

- [X] T003 [P] Escribir tests unitarios de validaciones en [lib/utils/Validation.test.ts](../../lib/utils/Validation.test.ts) para `validateRequired`, `validateFullName` y `validatePasswordsMatch` (casos válidos/ inválidos, espacios en blanco).
- [X] T004 [P] Escribir tests del servicio de registro en [lib/services/AuthService.test.ts](../../lib/services/AuthService.test.ts) cubriendo los casos C1–C4 del contrato (éxito con correo nuevo, duplicado `tucorreo@ejemplo.com`, login posterior con el correo registrado, `isAuthenticated()` no cambia por registrar).

### Implementación (después de que los tests fallen)

- [X] T005 [P] Implementar `validateRequired`, `validateFullName` y `validatePasswordsMatch` en [lib/utils/Validation.ts](../../lib/utils/Validation.ts) reutilizando el patrón de `validateEmail`/`validatePassword` (funciones puras). Hace pasar T003.
- [X] T006 Extender `IAuthService` y el objeto `AuthService` con `register(credentials: RegisterCredentials): Promise<RegisterResult>` en [lib/services/AuthService.ts](../../lib/services/AuthService.ts): delay simulado, verificación de duplicado (case-insensitive) contra `MOCK_USERS`, alta del usuario y retorno de `RegisterResult`. Depende de T002, T005. Hace pasar T004.

**Checkpoint**: Validaciones y servicio de registro verdes; listos para las historias.

---

## Phase 3: User Story 1 - Crear una cuenta nueva (Priority: P1) 🎯 MVP

**Goal**: Permitir crear una cuenta con datos válidos y redirigir a `/login` con mensaje de éxito visible.

**Independent Test**: Completar los 4 campos válidos + términos y presionar "Crear cuenta"; el sistema redirige a `/login?registered=true` mostrando el banner de éxito.

### Tests for User Story 1 (escribir primero, deben FALLAR) ⚠️

- [X] T007 [P] [US1] Escribir test de éxito de registro en [components/RegisterForm.test.tsx](../../components/RegisterForm.test.tsx): con datos válidos y términos aceptados, al enviar se llama `AuthService.register` y se navega a `/login?registered=true` (mock de `useRouter`).
- [X] T008 [P] [US1] Escribir test del mensaje de éxito en login: la página de login muestra un banner de éxito visible cuando `registered=true` (mock de `useSearchParams`), en [app/login.test.tsx](../../app/login.test.tsx) o nuevo archivo de test de la página de login.
- [X] T009 [P] [US1] Escribir test de integración de la página principal en [app/register.test.tsx](../../app/register.test.tsx): la ruta `/` renderiza el formulario de Registro (encabezado "Crea tu cuenta").

### Implementation for User Story 1

- [X] T010 [US1] Crear el componente `RegisterForm` base en [components/RegisterForm.tsx](../../components/RegisterForm.tsx) (client component) con los campos Nombre completo, Correo, Contraseña, Confirmar contraseña y checkbox de términos, reutilizando `Input` y `Button`; integrar `AuthService.register` y navegación a `/login?registered=true` en éxito. Depende de T006. Hace pasar T007.
- [X] T011 [US1] Crear `app/login/page.tsx` reubicando el login existente (BrandPanel + `LoginForm`) en la ruta `/login`, y renderizar un banner de éxito cuando `useSearchParams().get('registered') === 'true'`. Hace pasar T008. (Ver [app/page.tsx](../../app/page.tsx) como referencia del layout.)
- [X] T012 [US1] Modificar [app/page.tsx](../../app/page.tsx) para que la ruta `/` renderice la página de Registro (BrandPanel + `RegisterForm`) con el layout dividido. Hace pasar T009.

**Checkpoint**: Registro exitoso funcional de extremo a extremo (/ → /login con mensaje). MVP entregable.

---

## Phase 4: User Story 2 - Validación inline (Priority: P1)

**Goal**: Bloquear envíos inválidos mostrando mensajes inline por campo.

**Independent Test**: Dejar campos vacíos o ingresar datos inválidos y verificar que aparecen errores inline y el envío no procede.

### Tests for User Story 2 (escribir primero, deben FALLAR) ⚠️

- [X] T013 [P] [US2] Escribir test de campos obligatorios vacíos en [components/RegisterForm.test.tsx](../../components/RegisterForm.test.tsx): al enviar sin datos, cada campo muestra error inline y NO se llama `AuthService.register`.
- [X] T014 [P] [US2] Escribir test de correo inválido en [components/RegisterForm.test.tsx](../../components/RegisterForm.test.tsx): muestra "Formato de correo inválido".
- [X] T015 [P] [US2] Escribir test de contraseña corta en [components/RegisterForm.test.tsx](../../components/RegisterForm.test.tsx): muestra el mensaje de mínimo 8 caracteres.
- [X] T016 [P] [US2] Escribir test de confirmación distinta en [components/RegisterForm.test.tsx](../../components/RegisterForm.test.tsx): muestra "Las contraseñas no coinciden".
- [X] T017 [P] [US2] Escribir test de términos no aceptados en [components/RegisterForm.test.tsx](../../components/RegisterForm.test.tsx): muestra el error de términos y bloquea el envío.
- [X] T018 [P] [US2] Escribir test de correo duplicado en [components/RegisterForm.test.tsx](../../components/RegisterForm.test.tsx): cuando `register` devuelve `{ Success: false, Error }`, se muestra "Este correo ya está registrado" inline.

### Implementation for User Story 2

- [X] T019 [US2] Añadir validación en tiempo real (`useEffect`) y validación final en `handleSubmit` en [components/RegisterForm.tsx](../../components/RegisterForm.tsx) usando `validateRequired`, `validateEmail`, `validatePassword`, `validatePasswordsMatch` y la verificación de términos; renderizar errores inline vía prop `error` de `Input` y conservar los datos ingresados. Depende de T010. Hace pasar T013–T017.
- [X] T020 [US2] Manejar el `RegisterResult` de error (correo duplicado) mostrando mensaje inline/form-level en [components/RegisterForm.tsx](../../components/RegisterForm.tsx). Hace pasar T018.

**Checkpoint**: Validaciones inline completas; envíos inválidos bloqueados.

---

## Phase 5: User Story 4 - Accesos secundarios y navegación (Priority: P3)

**Goal**: Botones Google/Apple con alert exacto "Próximamente" y enlace a `/login`.

**Independent Test**: Click en Google/Apple muestra "Próximamente"; click en "Inicia sesión" navega a `/login`.

> Nota: Se aborda antes que la auditoría visual (US3) porque su comportamiento es verificable por tests automatizados.

### Tests for User Story 4 (escribir primero, deben FALLAR) ⚠️

- [X] T021 [P] [US4] Escribir test de alerts sociales en [components/RegisterForm.test.tsx](../../components/RegisterForm.test.tsx): click en Google y en Apple invoca `alert` con el texto exacto "Próximamente" (mock de `window.alert`).
- [X] T022 [P] [US4] Escribir test del enlace de login en [components/RegisterForm.test.tsx](../../components/RegisterForm.test.tsx): existe el enlace "¿Ya tienes cuenta? Inicia sesión" que apunta/navega a `/login`.

### Implementation for User Story 4

- [X] T023 [US4] Añadir los botones Google/Apple con handler que invoque `alert('Próximamente')` (texto exacto) y el enlace "¿Ya tienes cuenta? Inicia sesión" hacia `/login` en [components/RegisterForm.tsx](../../components/RegisterForm.tsx), sin alterar el comportamiento de `SocialLogins` usado por el login. Hace pasar T021, T022.

**Checkpoint**: Accesos secundarios y navegación a login operativos.

---

## Phase 6: User Story 3 - Fidelidad visual con Figma (Priority: P2)

**Goal**: La pantalla refleja el frame "04 · Registro" (colores, tipografía Inter, radios, layout) y es responsive.

**Independent Test**: Inspección visual contra Figma en desktop (2 paneles) y mobile (solo formulario).

### Implementation for User Story 3

- [X] T024 [P] [US3] Ajustar [components/BrandPanel.tsx](../../components/BrandPanel.tsx) para aceptar props opcionales de `headline`/`subtext` con valores por defecto = login, y usar en `/` los textos del frame "04 · Registro" ("Comienza tu camino financiero." + subtexto). No debe romper los tests del login.
- [X] T025 [US3] Aplicar tokens de diseño y estilos al formulario en [components/RegisterForm.tsx](../../components/RegisterForm.tsx): encabezado "Crea tu cuenta" + subtítulo, tipografía Inter (Bold/SemiBold/Medium/Regular), colores (`brand-primary`, `neutral-900/500/300`, enlaces `#EF5226`), radios 12px inputs/botón y 6px checkbox, icono de mostrar/ocultar contraseña; reutilizar [lib/constants/DesignTokens.ts](../../lib/constants/DesignTokens.ts).
- [X] T026 [US3] Garantizar responsive en [app/page.tsx](../../app/page.tsx) y el layout: BrandPanel `hidden lg:flex` (solo desktop) y formulario a ancho completo en mobile (FR-015).
- [X] T027 [US3] Auditoría manual de fidelidad visual y responsive contra el frame "04 · Registro" siguiendo la tabla de verificación de [quickstart.md](./quickstart.md); registrar discrepancias y corregirlas (SC-003, SC-004, SC-005).

**Checkpoint**: Pantalla fiel al diseño y responsive.

---

## Phase 7: Polish & Cross-Cutting Concerns

- [X] T028 Ejecutar `npm run test -- --run` y confirmar que toda la suite pasa, incluidos los tests existentes del login (sin regresiones).
- [X] T029 [P] Refactor final de [components/RegisterForm.tsx](../../components/RegisterForm.tsx) aplicando DRY/SOLID (extraer estado/validación repetida si corresponde) sin cambiar comportamiento; reverificar tests verdes.

---

## Dependencies & Execution Order

- **Setup (Phase 1)** → **Foundational (Phase 2)** bloquean todo lo demás.
- **US1 (Phase 3)** depende de Foundational. Es el MVP.
- **US2 (Phase 4)** depende de US1 (el `RegisterForm` debe existir).
- **US4 (Phase 5)** depende de US1 (extiende `RegisterForm`).
- **US3 (Phase 6)** depende de US1 (estiliza la pantalla creada); puede solaparse con US2/US4 en archivos distintos (BrandPanel).
- **Polish (Phase 7)** al final.

### Orden de historias por prioridad

1. US1 (P1) — crear cuenta → MVP
2. US2 (P1) — validación inline
3. US3 (P2) — fidelidad visual
4. US4 (P3) — accesos secundarios

---

## Parallel Execution Examples

- **Phase 2 tests**: T003 y T004 en paralelo (archivos distintos).
- **US1 tests**: T007, T008, T009 en paralelo (mismo archivo de form se toca en T007; T008/T009 son archivos distintos — ejecutar T007 aparte si hay conflicto de archivo).
- **US2 tests**: T013–T018 describen el mismo archivo `RegisterForm.test.tsx`; redáctalos en una sola pasada aunque estén marcados [P] conceptualmente por independencia lógica.
- **US3**: T024 (BrandPanel) en paralelo con T025 (RegisterForm) — archivos distintos.

---

## Implementation Strategy

- **MVP primero**: completar Phase 1–3 (US1) entrega un registro funcional end-to-end.
- **Incremental**: añadir US2 (validaciones), luego US4 (accesos), luego US3 (fidelidad visual).
- **TDD estricto**: en cada historia, escribir y ver fallar los tests antes de implementar.
- **Sin regresiones**: ejecutar `npm run test -- --run` en checkpoints clave; el login debe permanecer verde.
- **Sin librerías externas**; estructuras relevantes en `PascalCase`.
