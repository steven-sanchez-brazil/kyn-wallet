---
description: "Task list for feature implementation"
---

# Tasks: Pantalla de Registro de la Billetera Virtual

**Input**: Design documents from `/specs/002-registro-wallet/`
**Prerequisites**: plan.md (required), spec.md (required), research.md, data-model.md, contracts/registration-service.md, quickstart.md

**Tests**: INCLUIDOS. La constitución del proyecto exige TDD y `quickstart.md` enumera la cobertura de pruebas esperada. Las pruebas se escriben ANTES de la implementación y deben fallar primero.

**Referencia visual**: Fuente prioritaria = **MCP de Figma** (frame `31:2`, archivo `f7uDsv8sh6ZOtK2OitTqtg`). **Cuando el MCP no esté disponible** (caso de esta sesión por límite de cuota), usar como respaldo la imagen del diseño en [`04 · Registro.png`](04%20·%20Registro.png) dentro de `specs/002-registro-wallet/`. Verificar contra ella el layout y los tokens al construir `BrandPanel`, `RegisterForm` y la página `/register` (tareas T012, T014, T015, T023).

**Organization**: Tareas agrupadas por historia de usuario para permitir implementación y prueba independientes.

## Format: `[ID] [P?] [Story] Description`

- **[P]**: Puede ejecutarse en paralelo (archivos distintos, sin dependencias pendientes)
- **[Story]**: Historia de usuario asociada (US1, US2, US3)
- Cada tarea incluye la ruta exacta del archivo

## Path Conventions

Proyecto **web (Next.js 14 App Router)** con raíz en el repositorio: `app/`, `components/`, `lib/`. TypeScript + Tailwind CSS. Pruebas con Vitest + @testing-library/react + jsdom, ubicadas junto al código (`*.test.ts(x)`).

---

## Phase 1: Setup (Shared Infrastructure)

**Purpose**: Verificar que el entorno ya inicializado (feature 001 Login) está listo para extender, sin añadir librerías externas.

- [X] T001 Verificar dependencias instaladas y que la infraestructura de pruebas corre en verde antes de empezar: ejecutar `npm install` y `npm test` desde la raíz del repositorio; confirmar que `vitest.config.ts` y las pruebas existentes del Login pasan.

---

## Phase 2: Foundational (Blocking Prerequisites)

**Purpose**: Tipos, utilidades de validación y fuente única de usuarios (`UserStore`) que TODAS las historias necesitan.

**⚠️ CRITICAL**: Ninguna historia de usuario puede comenzar hasta completar esta fase.

- [X] T002 [P] Extender tipos de autenticación en lib/types/Auth.ts: añadir `RegistrationData` (FullName, Email, Password, PasswordConfirmation, AcceptedTerms), `RegistrationResult` (`{ Success: true, ErrorCode: null } | { Success: false, ErrorCode: 'EMAIL_TAKEN' | 'INVALID' }`) y campo opcional `FullName?` en `User`, usando PascalCase.
- [X] T003 [P] Escribir pruebas unitarias (TDD, deben fallar) para `validateRequired` y `validatePasswordsMatch` en lib/utils/Validation.test.ts.
- [X] T004 Implementar `validateRequired(value)` (`value.trim().length > 0`) y `validatePasswordsMatch(a, b)` (`a === b` y ambas no vacías) en lib/utils/Validation.ts (depende de T003).
- [X] T005 [P] Escribir pruebas unitarias (TDD, deben fallar) para `UserStore` (sembrado del usuario mock, `findByEmail` insensible a mayúsculas con `trim`, `add`) en lib/services/UserStore.test.ts.
- [X] T006 Implementar `IUserStore`/`UserStore` (en memoria, fuente única) con `findByEmail(email)` y `add(user)`, sembrado con `tucorreo@ejemplo.com` / `password123`, en lib/services/UserStore.ts (depende de T005).
- [X] T007 Refactorizar `AuthService` para consumir `UserStore.findByEmail` en lugar de su array local `MOCK_USERS`, manteniendo verde lib/services/AuthService.test.ts, en lib/services/AuthService.ts (depende de T006).

**Checkpoint**: Tipos, validadores y `UserStore` listos — las historias de usuario pueden comenzar.

---

## Phase 3: User Story 1 - Registro Exitoso de un Nuevo Usuario (Priority: P1) 🎯 MVP

**Goal**: Permitir que un usuario nuevo complete el formulario con datos válidos, acepte los términos, se registre (alta en `UserStore`) y sea redirigido a `/construction`.

**Independent Test**: En `/register`, llenar todos los campos con datos válidos, marcar términos y presionar "Crear cuenta" → redirección a la pantalla de "Página en construcción"; el usuario queda en `UserStore` (puede iniciar sesión luego).

### Tests for User Story 1 (TDD Enforced) ⚠️

> Escribir primero y verificar que FALLAN antes de implementar.

- [X] T008 [P] [US1] Prueba de contrato del servicio (casos C1 alta exitosa y C7 login posterior con la misma credencial) en lib/services/RegistrationService.test.ts.
- [X] T009 [P] [US1] Prueba de `RegisterForm`: envío con datos válidos + términos aceptados invoca `register` y redirige a `/construction` (mock de `router.push`), en components/RegisterForm.test.tsx.
- [X] T010 [P] [US1] Prueba de render de la ruta `/register` (Brand Panel + Form Panel presentes) en app/register.test.tsx.

### Implementation for User Story 1

- [X] T011 [P] [US1] Crear `PasswordInput` que componga `ui/Input` y añada botón para alternar `type` password↔text en components/ui/PasswordInput.tsx.
- [X] T012 [P] [US1] Parametrizar `BrandPanel` con props opcionales `title`/`subtitle` (defaults = texto actual del Login; sin romper el Login) en components/BrandPanel.tsx.
- [X] T013 [US1] Implementar `IRegistrationService`/`RegistrationService.register(data)`: validar formato/coincidencia/términos, verificar duplicado con `UserStore.findByEmail`, `UserStore.add`, delay simulado ~500 ms, devolviendo `RegistrationResult`, en lib/services/RegistrationService.ts (depende de T002, T004, T006).
- [X] T014 [US1] Implementar `RegisterForm` (client component): campos Nombre completo (`Ej: Diego Martínez`), Correo (`tucorreo@ejemplo.com`), Contraseña y Confirmar contraseña con `PasswordInput`, casilla de términos, botón "Crear cuenta"; en envío válido llama a `RegistrationService` y hace `router.push('/construction')`, en components/RegisterForm.tsx (depende de T011, T012, T013). Ajustar disposición y orden de campos según la referencia visual (Figma `31:2`; respaldo `04 · Registro.png`).
- [X] T015 [US1] Crear la ruta `/register` componiendo `BrandPanel` ("Comienza tu camino financiero." + subtítulo "Crea tu cuenta en minutos y empieza a enviar, recibir y administrar tu dinero desde cualquier lugar.") y `RegisterForm` en layout de pantalla dividida, en app/register/page.tsx (depende de T012, T014). Replicar el layout de la referencia visual (Figma `31:2`; respaldo `04 · Registro.png`).
- [X] T016 [US1] Genericizar el copy de la pantalla de construcción para que sea neutral al flujo de origen (sirve a login y registro) en app/construction/page.tsx.

**Checkpoint**: US1 funcional e independientemente probable — registro feliz → redirección. MVP entregable.

---

## Phase 4: User Story 2 - Validación de Datos del Formulario (Priority: P2)

**Goal**: Bloquear envíos inválidos (campos vacíos, correo mal formado, contraseñas que no coinciden, contraseña corta, términos no aceptados, correo ya registrado) mostrando mensajes inline, sin redirigir.

**Independent Test**: Dejar campos vacíos o ingresar correo inválido / contraseñas distintas / sin marcar términos / correo `tucorreo@ejemplo.com` → el envío se bloquea con mensaje(s) de validación y no hay redirección.

### Tests for User Story 2 (TDD Enforced) ⚠️

> Escribir primero y verificar que FALLAN antes de implementar.

- [X] T017 [P] [US2] Pruebas de contrato del servicio para casos de validación: C2 `EMAIL_TAKEN`, C3 correo inválido, C4 contraseña corta, C5 contraseñas distintas, C6 términos no aceptados (todos `INVALID` salvo C2), en lib/services/RegistrationService.test.ts.
- [X] T018 [P] [US2] Pruebas de `RegisterForm` para mensajes de validación: nombre obligatorio, formato de correo, contraseñas no coinciden, longitud mínima, términos obligatorios y correo duplicado; sin redirección en cada caso, en components/RegisterForm.test.tsx.

### Implementation for User Story 2

- [X] T019 [US2] Añadir a `RegisterForm` la validación previa al envío con mensajes inline (FR-003 a FR-008): "El nombre es obligatorio", "Formato de correo inválido", "La contraseña debe tener al menos 8 caracteres", "Las contraseñas no coinciden", "Debes aceptar los términos y condiciones" y mapeo de `ErrorCode 'EMAIL_TAKEN'` → "Este correo ya está registrado", bloqueando el envío, en components/RegisterForm.tsx (depende de T014).

**Checkpoint**: US1 y US2 funcionan independientemente; el formulario valida y bloquea entradas inválidas.

---

## Phase 5: User Story 3 - Coherencia Visual y Elementos Secundarios (Priority: P3)

**Goal**: Mantener la identidad visual del Login y añadir elementos de apoyo: divisor "o regístrate con" con accesos sociales, enlace a Login y tokens de diseño coherentes.

**Independent Test**: Inspección visual comparando `/register` con `/`: mismo degradado, tipografía Inter, botón `#ff6b3d`, radios 12px; el enlace "¿Ya tienes cuenta? Inicia sesión" navega a `/`.

### Tests for User Story 3 (TDD Enforced) ⚠️

> Escribir primero y verificar que FALLA antes de implementar.

- [X] T020 [P] [US3] Prueba de `RegisterForm`: el enlace "¿Ya tienes cuenta? Inicia sesión" apunta/navega a `/`, en components/RegisterForm.test.tsx.

### Implementation for User Story 3

- [X] T021 [US3] Integrar el divisor "o regístrate con" y reutilizar `SocialLogins` (Google/Apple, comportamiento visual) en components/RegisterForm.tsx (depende de T014).
- [X] T022 [US3] Añadir el enlace "¿Ya tienes cuenta? Inicia sesión" hacia `/` en components/RegisterForm.tsx (depende de T014).
- [X] T023 [US3] Aplicar y verificar tokens de diseño heredados (botón `#ff6b3d` texto blanco SemiBold, radios 12px, bordes `#d7d9e6`, encabezados `#16182c`, textos `#8a8ca8`, fuente Inter) desde lib/constants/DesignTokens.ts en components/RegisterForm.tsx y app/register/page.tsx.

**Checkpoint**: Las tres historias funcionan de forma independiente; la pantalla es visualmente coherente con el Login.

---

## Phase 6: Polish & Cross-Cutting Concerns

**Purpose**: Robustez, regresión y validación de extremo a extremo.

- [X] T024 [P] Confirmar que las pruebas existentes del Login (app/login.test.tsx, lib/services/AuthService.test.ts) siguen en verde tras el refactor a `UserStore`: ejecutar `npm test`.
- [X] T025 Añadir protección contra doble envío (deshabilitar botón / estado de procesamiento) durante el registro en components/RegisterForm.tsx.
- [X] T026 [P] Verificar el comportamiento responsive del layout dividido (split en `lg+`, formulario a pantalla completa en móvil) de la ruta en app/register/page.tsx.
- [X] T027 Ejecutar los escenarios de validación manual de specs/002-registro-wallet/quickstart.md (registro exitoso, duplicado, términos, contraseñas, correo inválido, toggle, navegación, login posterior) y confirmar SC-001 a SC-005.

---

## Dependencies & Execution Order

### Phase Dependencies

- **Setup (Phase 1)**: Sin dependencias.
- **Foundational (Phase 2)**: Depende de Setup. BLOQUEA todas las historias.
- **User Stories (Phase 3–5)**: Dependen de Foundational. US1 → US2 → US3 por prioridad; US2 y US3 extienden `RegisterForm` (creado en US1).
- **Polish (Phase 6)**: Depende de las historias deseadas completas.

### User Story Dependencies

- **US1 (P1)**: Solo Foundational. Entrega el MVP (formulario + alta + redirección).
- **US2 (P2)**: Foundational + `RegisterForm` de US1 (T014). Añade validación inline; el servicio ya soporta los `ErrorCode` desde T013.
- **US3 (P3)**: Foundational + `RegisterForm` de US1 (T014). Añade elementos secundarios y coherencia visual.

### Within Each User Story

- Las pruebas se escriben y FALLAN antes de implementar.
- Tipos/utilidades → servicios → componentes → página.
- US2 y US3 tocan el mismo archivo `RegisterForm.tsx`, por lo que sus tareas de implementación son secuenciales (no `[P]` entre sí).

### Parallel Opportunities

- Foundational: T002, T003 y T005 en paralelo (archivos distintos).
- US1 pruebas: T008, T009, T010 en paralelo.
- US1 implementación: T011 y T012 en paralelo (antes del servicio y el formulario).
- US2 pruebas: T017 y T018 en paralelo.
- Polish: T024 y T026 en paralelo.

---

## Parallel Example: User Story 1

```bash
# Pruebas de US1 juntas (deben fallar primero):
Task: "Prueba de contrato C1/C7 en lib/services/RegistrationService.test.ts"
Task: "Prueba de RegisterForm éxito+redirección en components/RegisterForm.test.tsx"
Task: "Prueba de render de la ruta /register en app/register.test.tsx"

# Componentes base de US1 en paralelo:
Task: "Crear PasswordInput en components/ui/PasswordInput.tsx"
Task: "Parametrizar BrandPanel en components/BrandPanel.tsx"
```

---

## Implementation Strategy

### MVP First (User Story 1)

1. Completar Phase 1: Setup.
2. Completar Phase 2: Foundational (CRÍTICO — bloquea todo).
3. Completar Phase 3: User Story 1.
4. **DETENERSE y VALIDAR**: probar el registro feliz → redirección de forma independiente.
5. Demostrar/entregar como MVP.

### Incremental Delivery

1. Setup + Foundational → base lista.
2. US1 → probar → entregar (MVP).
3. US2 → probar validación → entregar.
4. US3 → probar coherencia visual → entregar.

---

## Notes

- [P] = archivos distintos, sin dependencias pendientes.
- Sin librerías externas de UI/validación (restricción de la constitución y del spec).
- PascalCase para componentes y estructuras.
- Verificar que las pruebas fallan antes de implementar; commit por tarea o grupo lógico.
- La fuente visual prioritaria es el MCP de Figma (frame `31:2`); como respaldo cuando el MCP no esté disponible, usar la imagen `specs/002-registro-wallet/04 · Registro.png`. Reverificar tokens contra Figma si se restablece el acceso.
