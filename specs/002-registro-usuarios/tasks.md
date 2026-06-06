# Tasks: Registro de Usuarios KynWallet

**Input**: Design documents from `/specs/002-registro-usuarios/`
**Prerequisites**: plan.md (required), spec.md (required for user stories), research.md, data-model.md, contracts/
**Language**: Este documento DEBE escribirse en espanol.

**Tests**: Para funcionalidad critica, las pruebas son obligatorias y deben escribirse antes de la implementacion.

**Organization**: Tareas agrupadas por user story para implementacion y validacion independiente.

## Phase 1: Setup (Shared Infrastructure)

**Purpose**: Preparar estructura minima reutilizable para la pantalla de registro.

- [X] T001 Crear ruta base de registro en app/register/page.tsx
- [X] T002 [P] Crear esqueletos de componentes de registro en components/RegisterForm.tsx y components/RegisterSocialLogins.tsx
- [X] T003 [P] Definir tipos del dominio de registro en lib/types/Register.ts

---

## Phase 2: Foundational (Blocking Prerequisites)

**Purpose**: Infraestructura comun que bloquea las historias de usuario hasta completarse.

- [X] T004 [P] Crear contrato del servicio de registro simulado en lib/services/RegisterService.ts
- [X] T005 [P] Crear ruta explicita de login en app/login/page.tsx
- [X] T006 Preparar utilidades base de validacion para registro en lib/utils/RegisterValidation.ts

**Checkpoint**: Base lista; se puede avanzar por historias de usuario.

---

## Phase 3: User Story 1 - Registro Basico Exitoso (Priority: P1) 🎯 MVP

**Goal**: Permitir registro exitoso simulado con redireccion a `/login` y mensaje de exito.

**Independent Test**: Completar formulario valido, enviar, verificar redireccion a `/login` y mensaje visible en login.

### Tests for User Story 1 (MANDATORY - TDD)

- [X] T007 [P] [US1] Crear prueba de flujo exitoso con redireccion en app/register/page.test.tsx
- [X] T008 [P] [US1] Crear prueba del registro simulado exitoso en lib/services/RegisterService.test.ts

### Implementation for User Story 1

- [X] T009 [P] [US1] Implementar registro simulado en lib/services/RegisterService.ts
- [X] T010 [P] [US1] Implementar formulario base con campos requeridos en components/RegisterForm.tsx
- [X] T011 [US1] Integrar formulario en la pagina de registro en app/register/page.tsx
- [X] T012 [US1] Implementar link "¿Ya tienes cuenta? Inicia sesion" hacia /login en components/RegisterForm.tsx
- [X] T013 [US1] Implementar transporte y render del mensaje de exito en app/register/page.tsx y app/login/page.tsx

**Checkpoint**: US1 funcional y demostrable de forma independiente.

---

## Phase 4: User Story 2 - Validacion Inline de Datos (Priority: P2)

**Goal**: Mostrar errores inline y bloquear envio cuando existan datos invalidos.

**Independent Test**: Probar campos vacios, email invalido, contrasena corta, confirmacion distinta y terminos sin aceptar.

### Tests for User Story 2 (MANDATORY for critical flows)

- [X] T014 [P] [US2] Crear pruebas unitarias de reglas de validacion en lib/utils/RegisterValidation.test.ts
- [X] T015 [P] [US2] Crear pruebas de errores inline y bloqueo de submit en components/RegisterForm.test.tsx

### Implementation for User Story 2

- [X] T016 [P] [US2] Implementar reglas de validacion (obligatorios, email, longitud, confirmacion, terminos) en lib/utils/RegisterValidation.ts
- [X] T017 [US2] Integrar validaciones inline y mensajes por campo en components/RegisterForm.tsx
- [X] T018 [US2] Implementar checkbox de terminos y condiciones con validacion obligatoria en components/RegisterForm.tsx
- [X] T019 [US2] Implementar normalizacion con trim y bloqueo de doble envio en components/RegisterForm.tsx

**Checkpoint**: US2 funcional y verificable sin depender de US3.

---

## Phase 5: User Story 3 - Accesos Alternativos y Diseno Responsive (Priority: P3)

**Goal**: Implementar botones sociales informativos y comportamiento responsive desktop/mobile fiel a Figma.

**Independent Test**: Verificar alertas "Proximamente" en Google/Apple y layout de dos paneles en desktop / solo formulario en mobile.

### Tests for User Story 3 (OPTIONAL unless critical)

- [X] T020 [P] [US3] Crear prueba de alertas en botones sociales en components/RegisterSocialLogins.test.tsx
- [X] T021 [P] [US3] Crear prueba de layout responsive de registro en app/register/page.test.tsx

### Implementation for User Story 3

- [X] T022 [P] [US3] Implementar botones Google y Apple en components/RegisterSocialLogins.tsx
- [X] T023 [US3] Integrar alerta con mensaje "Proximamente" para Google y Apple en components/RegisterSocialLogins.tsx
- [X] T024 [US3] Implementar layout desktop de dos paneles reutilizando components/BrandPanel.tsx en app/register/page.tsx
- [X] T025 [US3] Implementar variante mobile mostrando solo formulario en app/register/page.tsx
- [X] T026 [US3] Ajustar estilos Tailwind para fidelidad visual a Figma en app/register/page.tsx y components/RegisterForm.tsx

**Checkpoint**: US3 funcional y consistente visualmente.

---

## Phase 6: Polish & Cross-Cutting Concerns

**Purpose**: Validaciones finales de calidad, comandos de CI local y cierre de documentacion.

- [X] T027 [P] Actualizar pasos y escenarios de validacion en specs/002-registro-usuarios/quickstart.md
- [X] T028 Ejecutar lint de la feature mediante scripts definidos en package.json
- [X] T029 Ejecutar build de la feature mediante scripts definidos en package.json
- [X] T030 Ejecutar tests de la feature mediante scripts definidos en package.json
- [X] T031 Verificar recorrido manual final segun quickstart en specs/002-registro-usuarios/quickstart.md

---

## Dependencies & Execution Order

### Phase Dependencies

- **Phase 1 (Setup)**: inicia inmediatamente.
- **Phase 2 (Foundational)**: depende de Phase 1 y bloquea historias de usuario.
- **Phase 3 (US1)**: depende de Phase 2.
- **Phase 4 (US2)**: depende de Phase 2 y se apoya en componentes de US1.
- **Phase 5 (US3)**: depende de Phase 2 y de la composicion base de US1.
- **Phase 6 (Polish)**: depende de completar las historias objetivo.

### User Story Dependencies

- **US1 (P1)**: base del MVP, sin dependencia de otras historias.
- **US2 (P2)**: independiente a nivel funcional, pero reutiliza el formulario base de US1.
- **US3 (P3)**: independiente para social/responsive, reutiliza composicion de pagina de US1.

### Within Each User Story

- Escribir pruebas y confirmarlas fallando antes de implementar.
- Implementar primero reglas/tipos, luego componentes, luego integracion de pagina.
- Completar y verificar la historia antes de pasar a la siguiente prioridad.

---

## Parallel Opportunities

- T002 y T003 pueden correr en paralelo.
- T004 y T005 pueden correr en paralelo.
- En US1: T007, T008, T009 y T010 pueden distribuirse en paralelo por archivo.
- En US2: T014, T015 y T016 pueden correr en paralelo.
- En US3: T020, T021 y T022 pueden correr en paralelo.
- En cierre: T028, T029 y T030 pueden ejecutarse en paralelo por tipo de verificacion.

---

## Parallel Example: User Story 1

```bash
# Pruebas iniciales en paralelo (TDD)
Task: "T007 [US1] app/register/page.test.tsx"
Task: "T008 [US1] lib/services/RegisterService.test.ts"

# Implementacion en paralelo por archivo
Task: "T009 [US1] lib/services/RegisterService.ts"
Task: "T010 [US1] components/RegisterForm.tsx"
```

## Parallel Example: User Story 2

```bash
Task: "T014 [US2] lib/utils/RegisterValidation.test.ts"
Task: "T015 [US2] components/RegisterForm.test.tsx"
Task: "T016 [US2] lib/utils/RegisterValidation.ts"
```

## Parallel Example: User Story 3

```bash
Task: "T020 [US3] components/RegisterSocialLogins.test.tsx"
Task: "T021 [US3] app/register/page.test.tsx"
Task: "T022 [US3] components/RegisterSocialLogins.tsx"
```

---

## Implementation Strategy

### MVP First (User Story 1 Only)

1. Completar Phase 1 y Phase 2.
2. Completar US1 (Phase 3).
3. Validar redireccion y mensaje de exito en `/login`.
4. Demostrar MVP.

### Incremental Delivery

1. MVP con US1.
2. Agregar US2 para robustecer validaciones y UX.
3. Agregar US3 para social/responsive y fidelidad visual.
4. Cerrar con Phase 6 (lint/build/test + quickstart).

### Parallel Team Strategy

1. Dev A: servicios/tipos (`lib/services`, `lib/types`, `lib/utils`).
2. Dev B: UI de formulario y social (`components/`).
3. Dev C: integracion de rutas y responsive (`app/`).

---

## Notes

- Todas las tareas siguen formato checklist obligatorio con ID secuencial.
- Las tareas con [P] fueron marcadas solo cuando no comparten archivo ni dependencia directa.
- Se incluyen pruebas porque fueron requeridas y por TDD en flujo critico.
- No se agregan librerias externas en ninguna tarea.
