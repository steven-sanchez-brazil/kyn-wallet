# Tasks: Pantalla de Registro de Usuarios de KynWallet

**Input**: Design documents from `/specs/002-pantalla-registro-usuarios/`
**Prerequisites**: plan.md (required), spec.md (required for user stories), research.md, data-model.md, contracts/

**Tests**: Se incluyen tareas de pruebas por mandato de TDD en constitucion y plan del feature.

**Organization**: Tasks are grouped by user story to enable independent implementation and testing of each story.

## Phase 1: Setup (Shared Infrastructure)

**Purpose**: Preparar estructura minima del feature y archivos base para desarrollo TDD.

- [X] T001 Crear ruta base de registro en app/register/page.tsx
- [X] T002 Crear componente base de formulario en components/RegisterForm.tsx
- [X] T003 Crear servicio base de registro en lib/services/RegisterService.ts
- [X] T004 [P] Crear pruebas base del feature en app/register.test.tsx y lib/services/RegisterService.contract.test.ts

---

## Phase 2: Foundational (Blocking Prerequisites)

**Purpose**: Infraestructura compartida obligatoria para que registro y login usen la misma fuente de datos.

**⚠️ CRITICAL**: Ninguna historia de usuario inicia sin cerrar esta fase.

- [X] T005 Implementar origen de datos compartido de usuarios en lib/services/UserStore.ts
- [X] T006 [P] Extender tipos de autenticacion y registro compartidos en lib/types/Auth.ts
- [X] T007 [P] Conectar login al origen de datos compartido en lib/services/AuthService.ts
- [X] T008 Implementar validaciones base de registro en lib/utils/Validation.ts
- [X] T009 Ajustar pruebas existentes de autenticacion al origen compartido en lib/services/AuthService.test.ts

**Checkpoint**: Base compartida lista para historias de usuario.

---

## Phase 3: User Story 1 - Registro de cuenta desde formulario (Priority: P1) 🎯 MVP

**Goal**: Permitir alta exitosa de usuario con persistencia en registro compartido y disponibilidad inmediata para login.

**Independent Test**: Crear usuario valido en `/register`, verificar confirmacion de alta y autenticar ese mismo usuario desde login contra la misma fuente de datos.

### Tests for User Story 1 (MANDATORY - TDD Enforced)

- [X] T010 [P] [US1] Crear prueba de contrato de registro exitoso y duplicado en lib/services/RegisterService.contract.test.ts
- [X] T011 [P] [US1] Crear prueba unitaria de persistencia en registro compartido en lib/services/UserStore.test.ts
- [X] T012 [P] [US1] Crear prueba de integracion del flujo de registro exitoso en app/register.test.tsx
- [X] T013 [P] [US1] Crear prueba de integracion login-tras-registro con misma fuente en app/login.test.tsx

### Implementation for User Story 1

- [X] T014 [US1] Implementar RegisterService con alta de usuario y control de email duplicado en lib/services/RegisterService.ts
- [X] T015 [US1] Implementar flujo submit exitoso del formulario de registro en components/RegisterForm.tsx
- [X] T016 [US1] Completar pantalla de registro y confirmacion de alta en app/register/page.tsx
- [X] T017 [US1] Agregar acceso de navegacion entre login y registro en app/page.tsx y app/register/page.tsx
- [X] T018 [US1] Integrar AuthService con usuarios registrados en lib/services/AuthService.ts

**Checkpoint**: US1 funcional y validable de forma independiente.

---

## Phase 4: User Story 2 - Fidelidad visual del diseño 04. Registro (Priority: P2)

**Goal**: Reflejar jerarquia/ubicacion visual de card mockup y headline 1/2 en desktop y mantener experiencia usable en mobile.

**Independent Test**: Verificar layout de `/register` en viewport desktop y mobile, comprobando posicion relativa de card mockup y headline 1/2 sin solapamientos.

### Tests for User Story 2 (MANDATORY - TDD Enforced)

- [X] T019 [P] [US2] Crear prueba de layout desktop para jerarquia de panel/headlines en app/register.layout.test.tsx
- [X] T020 [P] [US2] Crear prueba responsive mobile sin solapamientos en app/register.responsive.test.tsx

### Implementation for User Story 2

- [X] T021 [US2] Ajustar tokens y constantes visuales de registro en lib/constants/DesignTokens.ts
- [X] T022 [US2] Implementar composicion visual de brand/card/headlines en components/BrandPanel.tsx
- [X] T023 [US2] Aplicar layout responsive final de registro en app/register/page.tsx y app/globals.css

**Checkpoint**: US2 validada visualmente sin romper US1.

---

## Phase 5: User Story 3 - Validación y recuperación de errores de entrada (Priority: P3)

**Goal**: Mostrar errores accionables por campo, errores operativos recuperables y reintento seguro.

**Independent Test**: Ingresar datos invalidos en registro, verificar mensajes por campo, corregir y reenviar; simular fallo operativo y confirmar reintento.

### Tests for User Story 3 (MANDATORY - TDD Enforced)

- [X] T024 [P] [US3] Crear pruebas de validaciones de registro (nombre, email, password, confirmacion, terminos) en lib/utils/Validation.register.test.ts
- [X] T025 [P] [US3] Crear pruebas de UI para errores por campo y recuperacion en components/RegisterForm.validation.test.tsx

### Implementation for User Story 3

- [X] T026 [US3] Extender utilidades de validacion para reglas de registro en lib/utils/Validation.ts
- [X] T027 [US3] Implementar manejo de errores por campo y error global recuperable en components/RegisterForm.tsx
- [X] T028 [US3] Implementar propagacion de errores operativos y reintento en lib/services/RegisterService.ts y app/register/page.tsx

**Checkpoint**: US3 completa con feedback de errores y reintento, preservando US1 y US2.

---

## Phase 6: Polish & Cross-Cutting Concerns

**Purpose**: Cierre transversal, calidad final y validacion de quickstart.

- [X] T029 [P] Actualizar documentacion tecnica del feature en specs/002-pantalla-registro-usuarios/quickstart.md
- [X] T030 Ejecutar suite completa y ajustar regresiones en app/login.test.tsx, app/register.test.tsx y lib/services/AuthService.test.ts
- [X] T031 [P] Refactor final sin duplicaciones en components/RegisterForm.tsx, lib/services/RegisterService.ts y lib/utils/Validation.ts
- [X] T032 Validar flujo manual end-to-end y criterios visuales del quickstart en specs/002-pantalla-registro-usuarios/quickstart.md

---

## Dependencies & Execution Order

### Phase Dependencies

- **Setup (Phase 1)**: Sin dependencias.
- **Foundational (Phase 2)**: Depende de Setup; bloquea historias.
- **User Stories (Phase 3-5)**: Inician despues de Foundational.
- **Polish (Phase 6)**: Depende de historias completadas.

### User Story Dependencies

- **US1 (P1)**: Comienza tras Phase 2; define MVP funcional.
- **US2 (P2)**: Depende de base de US1 para mantener composicion sobre pantalla operativa.
- **US3 (P3)**: Depende de US1 para manejar errores sobre flujo de registro real.

### Within Each User Story

- Pruebas primero y en rojo.
- Implementacion despues de pruebas.
- Integracion final y verificacion independiente de la historia.

### Parallel Opportunities

- **Phase 1**: T004 en paralelo con T001-T003.
- **Phase 2**: T006 y T007 en paralelo tras T005.
- **US1**: T010-T013 en paralelo.
- **US2**: T019 y T020 en paralelo.
- **US3**: T024 y T025 en paralelo.
- **Polish**: T029 y T031 en paralelo.

---

## Parallel Example: User Story 1

```bash
Task: "T010 [US1] Crear prueba de contrato de registro exitoso y duplicado en lib/services/RegisterService.contract.test.ts"
Task: "T011 [US1] Crear prueba unitaria de persistencia en registro compartido en lib/services/UserStore.test.ts"
Task: "T012 [US1] Crear prueba de integracion del flujo de registro exitoso en app/register.test.tsx"
Task: "T013 [US1] Crear prueba de integracion login-tras-registro con misma fuente en app/login.test.tsx"
```

## Parallel Example: User Story 2

```bash
Task: "T019 [US2] Crear prueba de layout desktop para jerarquia de panel/headlines en app/register.layout.test.tsx"
Task: "T020 [US2] Crear prueba responsive mobile sin solapamientos en app/register.responsive.test.tsx"
```

## Parallel Example: User Story 3

```bash
Task: "T024 [US3] Crear pruebas de validaciones de registro en lib/utils/Validation.register.test.ts"
Task: "T025 [US3] Crear pruebas de UI para errores por campo y recuperacion en components/RegisterForm.validation.test.tsx"
```

---

## Implementation Strategy

### MVP First (US1 Only)

1. Completar Phase 1.
2. Completar Phase 2.
3. Completar Phase 3 (US1).
4. Validar alta + login contra misma fuente de datos.

### Incremental Delivery

1. Entregar US1 (registro funcional compartiendo origen de datos con login).
2. Entregar US2 (fidelidad visual Figma y responsive).
3. Entregar US3 (validaciones y recuperacion de errores).
4. Cerrar con polish transversal.

### Parallel Team Strategy

1. Dev A: servicios compartidos y contratos (Phase 2 + US1 backend/UI logic).
2. Dev B: composicion visual y responsive (US2).
3. Dev C: validaciones y estados de error (US3).
