# Tasks: Registro de Usuarios KynWallet

**Input**: Design documents from `/specs/002-registro-usuarios/`
**Prerequisites**: plan.md, spec.md, research.md, data-model.md, contracts/registro-service.md, quickstart.md

**Tests**: Incluidos por principio constitucional de TDD y estrategia definida en plan.md.

**Organization**: Tareas agrupadas por historia de usuario para permitir implementación y validación independiente.

## Phase 1: Setup (Shared Infrastructure)

**Purpose**: Preparar estructura base del feature sin bloquear decisiones de negocio.

- [x] T001 Crear ruta de registro en app/register/page.tsx
- [x] T002 Crear componente base del formulario de registro en components/RegisterForm.tsx
- [x] T003 [P] Crear tipos de dominio de registro en lib/types/Register.ts
- [x] T004 [P] Crear archivo de utilidades de validación de registro en lib/utils/RegisterValidation.ts

---

## Phase 2: Foundational (Blocking Prerequisites)

**Purpose**: Definir infraestructura mínima que bloquea todas las historias.

**⚠️ CRITICAL**: Ninguna historia se implementa hasta completar esta fase.

- [x] T005 Implementar contrato de servicio de registro en lib/services/RegisterService.ts
- [x] T006 [P] Implementar pruebas unitarias del servicio de registro en lib/services/RegisterService.test.ts
- [x] T007 [P] Implementar pruebas unitarias de validación inline en lib/utils/RegisterValidation.test.ts
- [x] T008 Crear ruta /login explícita compatible con redirección en app/login/page.tsx
- [x] T009 Integrar mensaje de éxito post-registro en pantalla de login en app/page.tsx

**Checkpoint**: Base lista; se puede avanzar con historias en orden de prioridad.

---

## Phase 3: User Story 1 - Crear cuenta con validación completa (Priority: P1) 🎯 MVP

**Goal**: Permitir registro completo con campos obligatorios, validación total y redirección exitosa a `/login`.

**Independent Test**: Completar formulario válido + aceptar términos + crear cuenta y verificar redirección a `/login` con mensaje de éxito.

### Tests for User Story 1

- [x] T010 [P] [US1] Crear prueba de render y campos obligatorios en components/RegisterForm.test.tsx
- [x] T011 [P] [US1] Crear prueba de bloqueo de submit con campos vacíos en components/RegisterForm.test.tsx
- [x] T012 [P] [US1] Crear prueba de aceptación obligatoria de términos en components/RegisterForm.test.tsx
- [x] T013 [P] [US1] Crear prueba de redirección por registro exitoso en app/register/register.test.tsx

### Implementation for User Story 1

- [x] T014 [US1] Implementar campos NombreCompleto, CorreoElectronico, Contrasena y ConfirmacionContrasena en components/RegisterForm.tsx
- [x] T015 [US1] Implementar checkbox de términos y lógica de bloqueo en components/RegisterForm.tsx
- [x] T016 [US1] Implementar flujo submit -> validar -> registrar en components/RegisterForm.tsx
- [x] T017 [US1] Implementar navegación a /login con mensaje de éxito en app/register/page.tsx
- [x] T018 [US1] Integrar layout desktop de dos paneles con BrandPanel en app/register/page.tsx

**Checkpoint**: US1 funcional y demostrable de extremo a extremo.

---

## Phase 4: User Story 2 - Comprender errores en tiempo real (Priority: P2)

**Goal**: Mostrar validaciones inline claras para correo inválido, contraseña corta, no coincidencia y campos obligatorios.

**Independent Test**: Introducir valores inválidos en cada campo y verificar mensaje inline específico por campo sin envío exitoso.

### Tests for User Story 2

- [x] T019 [P] [US2] Crear prueba de correo inválido con mensaje inline en components/RegisterForm.test.tsx
- [x] T020 [P] [US2] Crear prueba de contraseña mínima y coincidencia de confirmación en components/RegisterForm.test.tsx
- [x] T021 [P] [US2] Crear prueba de mensajes por campos obligatorios en components/RegisterForm.test.tsx

### Implementation for User Story 2

- [x] T022 [US2] Implementar reglas de correo válido y longitud mínima en lib/utils/RegisterValidation.ts
- [x] T023 [US2] Implementar regla de coincidencia Contrasena/ConfirmacionContrasena en lib/utils/RegisterValidation.ts
- [x] T024 [US2] Mostrar errores inline por campo y estado touched en components/RegisterForm.tsx
- [x] T025 [US2] Ajustar contrato validar() para devolver mapa de errores por campo en lib/services/RegisterService.ts

**Checkpoint**: US2 funcional e independiente con validación inline completa.

---

## Phase 5: User Story 3 - Usar navegación y accesos alternativos (Priority: P3)

**Goal**: Habilitar acciones secundarias de onboarding: Google/Apple con alerta y link a login.

**Independent Test**: Pulsar Google y Apple para ver alerta "Próximamente"; pulsar link de inicio de sesión y navegar a `/login`.

### Tests for User Story 3

- [x] T026 [P] [US3] Crear prueba de alertas "Próximamente" para Google y Apple en components/RegisterForm.test.tsx
- [x] T027 [P] [US3] Crear prueba de navegación del link "Inicia sesión" hacia /login en components/RegisterForm.test.tsx

### Implementation for User Story 3

- [x] T028 [US3] Implementar botones Google y Apple con alerta en components/RegisterForm.tsx
- [x] T029 [US3] Implementar link "¿Ya tienes cuenta? Inicia sesión" a /login en components/RegisterForm.tsx
- [x] T030 [US3] Aplicar responsive mobile para ocultar panel de marca en app/register/page.tsx
- [x] T031 [US3] Ajustar estilos finales del formulario con Tailwind según referencia en app/globals.css

**Checkpoint**: US3 completo e independiente.

---

## Phase 6: Polish & Cross-Cutting Concerns

**Purpose**: Cerrar calidad transversal y validación integral.

- [ ] T032 [P] Ejecutar suite completa de pruebas del feature en app/register/register.test.tsx
- [ ] T033 [P] Ejecutar pruebas de componentes y validación en components/RegisterForm.test.tsx
- [ ] T034 Verificar flujo quickstart end-to-end y actualizar guía en specs/002-registro-usuarios/quickstart.md
- [x] T035 Revisar y limpiar duplicaciones de validación entre servicio y UI en lib/services/RegisterService.ts

---

## Dependencies & Execution Order

### Phase Dependencies

- **Phase 1 (Setup)**: Puede iniciar inmediatamente.
- **Phase 2 (Foundational)**: Depende de Phase 1 y bloquea todo trabajo de historias.
- **Phase 3+ (User Stories)**: Dependen de completar Phase 2.
- **Phase 6 (Polish)**: Depende de completar las historias objetivo.

### User Story Dependencies

- **US1 (P1)**: Inicia tras Phase 2; no depende de otras historias.
- **US2 (P2)**: Inicia tras Phase 2; se apoya en componentes y utilidades creados en US1 pero se valida independientemente.
- **US3 (P3)**: Inicia tras Phase 2; integra controles secundarios sin bloquear validación de US1/US2.

### Within Each User Story

- Primero pruebas (fallando en rojo).
- Luego implementación de lógica.
- Luego integración UI/ruta.
- Validación independiente antes de pasar a la siguiente prioridad.

### Story Completion Order

US1 (MVP) -> US2 -> US3

---

## Parallel Opportunities

- Setup: `T003`, `T004` en paralelo.
- Foundational: `T006`, `T007` en paralelo.
- US1: `T010`, `T011`, `T012`, `T013` en paralelo.
- US2: `T019`, `T020`, `T021` en paralelo.
- US3: `T026`, `T027` en paralelo.
- Polish: `T032`, `T033` en paralelo.

---

## Parallel Example: User Story 1

```bash
# Tests de US1 en paralelo
T010 components/RegisterForm.test.tsx
T011 components/RegisterForm.test.tsx
T012 components/RegisterForm.test.tsx
T013 app/register/register.test.tsx

# Implementaciones desacopladas iniciales
T014 components/RegisterForm.tsx
T018 app/register/page.tsx
```

## Parallel Example: User Story 2

```bash
# Tests de validación en paralelo
T019 components/RegisterForm.test.tsx
T020 components/RegisterForm.test.tsx
T021 components/RegisterForm.test.tsx

# Lógica de reglas en paralelo
T022 lib/utils/RegisterValidation.ts
T023 lib/utils/RegisterValidation.ts
```

## Parallel Example: User Story 3

```bash
# Validaciones de UX secundaria en paralelo
T026 components/RegisterForm.test.tsx
T027 components/RegisterForm.test.tsx

# Acciones secundarias de UI
T028 components/RegisterForm.tsx
T029 components/RegisterForm.tsx
```

---

## Implementation Strategy

### MVP First (User Story 1 Only)

1. Completar Phase 1 y Phase 2.
2. Entregar Phase 3 (US1) completo.
3. Validar redirección a `/login` y mensaje de éxito.
4. Demostrar MVP antes de continuar.

### Incremental Delivery

1. Foundation completa.
2. Agregar US1 y validar.
3. Agregar US2 y validar.
4. Agregar US3 y validar.
5. Ejecutar polish final y quickstart.

### Parallel Team Strategy

1. Equipo completo en Setup + Foundational.
2. Luego por capacidad:
   - Dev A: US1
   - Dev B: US2
   - Dev C: US3
3. Integrar en checkpoints por historia.
