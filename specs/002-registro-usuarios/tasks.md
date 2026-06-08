# Tasks: Registro de Usuarios

**Input**: Design documents from `specs/002-registro-usuarios/`
**Prerequisites**: plan.md (required), spec.md (required for user stories)

## Format: `[ID] [P?] [Story] Description`

- **[P]**: Can run in parallel (different files, no dependencies)
- **[Story]**: Which user story this task belongs to (e.g., US1, US2, US3)

---

## Phase 1: Infraestructura Base (Bloqueante)

**Purpose**: Extender tipos, validaciones y servicio mock

- [X] T001 [P] Definir tipo `RegisterCredentials` en `lib/types/Register.ts`
- [X] T002 [P] Agregar `validateFullName` y `validatePasswordMatch` en `lib/utils/Validation.ts`
- [X] T003 [P] Implementar `RegisterService` mock en `lib/services/RegisterService.ts`
- [X] T004 Agregar props opcionales `headline` y `subtitle` a `components/BrandPanel.tsx`

---

## Phase 2: Componente Principal — MVP (US1)

**Purpose**: Pantalla de registro funcional con flujo completo

- [X] T005 [US1] Crear `components/RegisterForm.tsx` con campos, estado y submit handler
- [X] T006 [US1] Crear `app/register/page.tsx` con split-layout (`BrandPanel` + `RegisterForm`)

---

## Phase 3: Validaciones Inline (US2)

**Purpose**: Retroalimentación en tiempo real en cada campo

- [X] T007 [US2] Implementar validación inline en tiempo real en `RegisterForm.tsx` (onChange para cada campo)
- [X] T008 [US2] Implementar validación completa al submit (todos los campos obligatorios, términos)
- [X] T009 [US2] Mostrar errores visuales con estilos Figma (borde rojo, texto de error `text-xs text-red-500`)

---

## Phase 4: Elementos Secundarios (US3)

**Purpose**: Botones sociales, divisor y link a Login

- [X] T010 [P] [US3] Reutilizar `SocialLogins` en `RegisterForm.tsx` con alert "Próximamente"
- [X] T011 [P] [US3] Agregar link "¿Ya tienes cuenta? Inicia sesión" que navegue a `/`

---

## Phase 5: Integración con Login — Banner de Éxito (US1)

**Purpose**: Mostrar confirmación visual tras registro exitoso

- [X] T012 [US1] Actualizar `app/page.tsx` para leer `searchParams.registered` y pasar `successMessage` a `LoginForm`
- [X] T013 [US1] Actualizar `components/LoginForm.tsx` para aceptar y mostrar prop `successMessage`

---

## Phase 6: Tests (TDD)

**Purpose**: Cobertura de pruebas para nuevas funcionalidades

- [X] T014 [P] Extender `lib/utils/Validation.test.ts` con tests para `validateFullName` y `validatePasswordMatch`
- [X] T015 [P] Crear `lib/services/RegisterService.test.ts` con tests del mock de registro
- [X] T016 Crear `components/RegisterForm.test.tsx` con tests de validación UI y flujo

---

## Phase 7: Polish & Responsive

**Purpose**: Fidelidad visual Figma y verificación final

- [X] T017 [P] Verificar layout responsive en `app/register/page.tsx` (mobile: ocultar BrandPanel)
- [X] T018 Auditoría visual final contra frame "04 · Registro" de Figma
- [X] T019 [P] Verificar `PascalCase` en todos los archivos nuevos/modificados

---

## Dependencies & Execution Order

- **Phase 1** → **Phase 2** → **Phase 3 + Phase 4 (paralelo)** → **Phase 5** → **Phase 6** → **Phase 7**
- T004 debe completarse antes de T005/T006 (BrandPanel props)
- T005 debe completarse antes de T007–T011 (formulario base primero)
- T012 y T013 son dependientes entre sí (banner de éxito)
