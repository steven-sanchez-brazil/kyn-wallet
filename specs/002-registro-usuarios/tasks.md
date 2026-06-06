# Tasks: Registro de Usuarios — KynWallet

**Input**: Design documents from `specs/002-registro-usuarios/`  
**Prerequisites**: plan.md ✅ spec.md ✅ research.md ✅ data-model.md ✅ contracts/ ✅  
**Tests**: TDD obligatorio por constitución del proyecto — los tests se escriben **antes** de la implementación.  
**Organization**: Tareas agrupadas por user story para implementación y validación independientes.

> **Nota de ruta**: La página de login actual está en `app/page.tsx` (ruta `/`). La especificación menciona `/login`; se incluye tarea en la fase Polish para crear `app/login/page.tsx` y alinear las rutas con el spec. Hasta entonces, los enlaces y redireccionamientos apuntan a `/`.

---

## Format: `[ID] [P?] [Story] Description`

- **[P]**: Puede ejecutarse en paralelo (archivos distintos, sin dependencias activas)
- **[Story]**: A qué user story pertenece la tarea (US1…US6)

---

## Phase 1: Setup (Estructura base)

**Purpose**: Extensiones fundacionales que bloquean todas las user stories. Sin estas, ningún formulario de registro puede funcionar.

> ⚠️ **TDD**: Escribir los tests primero y verificar que **fallen** (Rojo) antes de implementar.

- [x] T001 Escribir tests para `validateFullName` (vacío → false, 1 char → false, 2+ chars → true, solo espacios → false) en `lib/utils/Validation.test.ts`
- [x] T002 Escribir tests para `validatePasswordMatch` (strings iguales → true, distintos → false, ambos vacíos → false) en `lib/utils/Validation.test.ts`
- [x] T003 [P] Implementar `validateFullName(name: string): boolean` en `lib/utils/Validation.ts` (pasa T001)
- [x] T004 [P] Implementar `validatePasswordMatch(password: string, confirm: string): boolean` en `lib/utils/Validation.ts` (pasa T002)
- [x] T005 Agregar interfaces `RegisterCredentials` y `RegisterResult` en `lib/types/Auth.ts` sin modificar las interfaces existentes
- [x] T006 Escribir tests para `AuthService.register()` en `lib/services/AuthService.test.ts`: email nuevo → `{Success: true}`, email duplicado → `{Success: false, Error: 'EMAIL_EXISTS'}`, simula delay
- [x] T007 Implementar `AuthService.register(credentials: RegisterCredentials): Promise<RegisterResult>` en `lib/services/AuthService.ts` y extender `IAuthService` (pasa T006)

**Checkpoint**: Ejecutar `npm run test` — todos los tests de Validation y AuthService deben estar en Verde antes de continuar.

---

## Phase 2: User Story 1 — Registro exitoso con credenciales válidas (Priority: P1) 🎯 MVP

**Goal**: Un usuario puede completar el formulario, enviarlo y ser redirigido a la página de login con mensaje de éxito.

**Independent Test**: Llenar los 4 campos con datos válidos, marcar checkbox, pulsar "Crear cuenta" → el componente llama al servicio y ejecuta el callback de éxito.

> ⚠️ **TDD**: Escribir los tests de T008 primero y verificar que fallen antes de crear `RegisterForm.tsx`.

- [x] T008 Escribir test de envío exitoso en `components/RegisterForm.test.tsx`: dado campos válidos + checkbox marcado, cuando se envía el formulario, entonces `AuthService.register` es llamado con los datos correctos y `onSuccess` se invoca
- [x] T009 Crear `components/RegisterForm.tsx` con estructura base: 4 campos (`fullName`, `email`, `password`, `confirmPassword`), checkbox de términos y botón "Crear cuenta" (inicialmente sin validaciones ni lógica de habilitación)
- [x] T010 [US1] Integrar llamada a `AuthService.register()` en el `handleSubmit` de `components/RegisterForm.tsx` con manejo de estado `isSubmitting`
- [x] T011 [US1] Implementar callback `onSuccess` en `components/RegisterForm.tsx` que recibe `() => void` como prop y lo invoca tras registro exitoso
- [x] T012 [US1] Crear `app/registro/page.tsx` como Client Component: layout `min-h-screen flex`, `BrandPanel` (izquierda) + panel de formulario `w-full lg:w-1/2` (derecha), pasar `onSuccess={() => router.push('/?registered=true')}` a `RegisterForm`
- [x] T013 [US1] Leer `searchParams.get('registered')` en `components/LoginForm.tsx` y mostrar banner de éxito "Cuenta creada exitosamente. Inicia sesión para continuar." cuando el valor es `'true'`

**Checkpoint**: `app/registro` carga, el formulario envía datos y se redirige a `/` con banner visible. `npm run test` en Verde.

---

## Phase 3: User Story 2 — Validación inline de campos (Priority: P2)

**Goal**: Cada campo muestra su mensaje de error inline al perder el foco con datos inválidos, sin recargar la página.

**Independent Test**: Ingresar un email inválido y hacer blur → aparece "Ingresa un correo electrónico válido." sin enviar el formulario.

> ⚠️ **TDD**: Escribir los tests de T014 primero.

- [x] T014 Escribir tests de validación inline en `components/RegisterForm.test.tsx`: blur en fullName vacío → error, blur en email inválido → error, blur en password corta → error, onChange/blur en confirmPassword distinto → error, todos los campos válidos → sin errores
- [x] T015 [US2] Implementar validación `onBlur` para `fullName` en `components/RegisterForm.tsx`: campo vacío → "El nombre completo es obligatorio", < 2 chars → "El nombre debe tener al menos 2 caracteres", usar `validateFullName`
- [x] T016 [P] [US2] Implementar validación `onBlur` para `email` en `components/RegisterForm.tsx`: vacío → "El correo electrónico es obligatorio", formato inválido → "Ingresa un correo electrónico válido", usar `validateEmail`
- [x] T017 [P] [US2] Implementar validación `onBlur` para `password` en `components/RegisterForm.tsx`: vacío → "La contraseña es obligatoria", < 8 chars → "La contraseña debe tener al menos 8 caracteres", usar `validatePassword`
- [x] T018 [US2] Implementar validación `onChange` + `onBlur` para `confirmPassword` en `components/RegisterForm.tsx`: vacío → "Confirma tu contraseña", no coincide → "Las contraseñas no coinciden", usar `validatePasswordMatch`
- [x] T019 [US2] Implementar mensaje de error de envío inline en `components/RegisterForm.tsx`: cuando `AuthService.register` retorna `{Error: 'EMAIL_EXISTS'}` → mostrar "Este correo ya está registrado. ¿Ya tienes cuenta?" sobre el botón

**Checkpoint**: Cada campo muestra su error al blur. El error de submit aparece inline. `npm run test` en Verde.

---

## Phase 4: User Story 3 — Habilitación condicional del botón "Crear cuenta" (Priority: P2)

**Goal**: El botón "Crear cuenta" está deshabilitado hasta que todos los campos sean válidos Y el checkbox esté marcado.

**Independent Test**: Con todos los campos correctos y checkbox desmarcado → botón `disabled`. Marcar checkbox → botón habilitado.

> ⚠️ **TDD**: Escribir los tests de T020 primero.

- [x] T020 Escribir tests del botón en `components/RegisterForm.test.tsx`: botón deshabilitado por defecto, deshabilitado sin checkbox aunque campos válidos, habilitado con todo correcto, vuelve a deshabilitarse al desmarcar checkbox
- [x] T021 [US3] Implementar lógica `isFormValid` en `components/RegisterForm.tsx`: `fullName.trim().length >= 2 && validateEmail(email) && validatePassword(password) && password === confirmPassword && termsAccepted && !isSubmitting`
- [x] T022 [US3] Agregar checkbox de términos y condiciones en `components/RegisterForm.tsx` con estado `termsAccepted`, label "Acepto los términos y condiciones" y aplicar `disabled={!isFormValid}` al botón "Crear cuenta"

**Checkpoint**: El botón solo se habilita cuando todos los campos son válidos y el checkbox está marcado. `npm run test` en Verde.

---

## Phase 5: User Story 6 — Experiencia Responsive (Priority: P2)

**Goal**: Desktop (≥ 1024 px) muestra dos paneles; móvil (< 768 px) muestra solo el formulario.

**Independent Test**: `BrandPanel` tiene clase `hidden lg:flex` → invisible en móvil; el panel del formulario tiene `w-full lg:w-1/2` → ocupa pantalla completa en móvil.

> ⚠️ **TDD**: Escribir el test de T023 primero.

- [x] T023 Escribir test de layout en `components/RegisterForm.test.tsx`: verificar que `BrandPanel` no se renderiza en el formulario (responsabilidad del layout de la página) y que el contenedor del formulario tiene el ancho correcto en `app/registro/page.tsx`
- [x] T024 [US6] Verificar en `app/registro/page.tsx` que el layout usa exactamente el mismo patrón que `app/page.tsx`: `<BrandPanel />` (tiene `hidden lg:flex` incorporado) + `<div className="w-full lg:w-1/2 ...">` para el formulario — corregir si difiere

**Checkpoint**: En viewport < 768 px solo se ve el formulario. En viewport ≥ 1024 px se ven los dos paneles. `npm run test` en Verde.

---

## Phase 6: User Story 4 — Registro con proveedor social (Priority: P3)

**Goal**: Los botones "Continuar con Google" y "Continuar con Apple" muestran alerta "Próximamente".

**Independent Test**: Click en botón Google → `window.alert` es invocado con texto que contiene "próximamente".

> ⚠️ **TDD**: Escribir el test de T025 primero.

- [x] T025 Escribir tests de botones sociales en `components/RegisterForm.test.tsx`: mockear `window.alert`, click en Google → alerta disparada, click en Apple → alerta disparada
- [x] T026 [US4] Integrar `<SocialLogins />` en `components/RegisterForm.tsx` con su separador "o continúa con" (patrón idéntico a `LoginForm.tsx`; `SocialLogins` ya implementa "Próximamente" internamente — sin modificaciones)

**Checkpoint**: Ambos botones muestran alerta al pulsarse. `npm run test` en Verde.

---

## Phase 7: User Story 5 — Navegación hacia inicio de sesión (Priority: P3)

**Goal**: El enlace "¿Ya tienes cuenta? Inicia sesión" redirige al usuario a la página de login.

**Independent Test**: Click en el enlace → navegación a `/` (o `/login` si se creó la ruta en Polish).

> ⚠️ **TDD**: Escribir el test de T027 primero.

- [x] T027 Escribir test del enlace de navegación en `components/RegisterForm.test.tsx`: el enlace con texto "Inicia sesión" tiene `href` apuntando a la ruta de login
- [x] T028 [US5] Agregar enlace "¿Ya tienes cuenta? Inicia sesión" en `components/RegisterForm.tsx` usando `<Link href="/">` de `next/link` (o `href="/login"` si T029 se completa primero), visible bajo el botón "Crear cuenta"

**Checkpoint**: El enlace es visible y navega a la página de login. `npm run test` en Verde.

---

## Phase 8: Polish & Concerns transversales

**Purpose**: Alineación de rutas con la especificación, accesibilidad y validación final.

- [x] T029 [P] Crear `app/login/page.tsx` moviendo el contenido de `app/page.tsx` (re-exportar `BrandPanel` + `LoginForm`) y actualizar `app/page.tsx` para redirigir a `/login` con `redirect('/login')` de `next/navigation`, cumpliendo la ruta `/login` del spec
- [x] T030 [P] Actualizar `href` del enlace "Inicia sesión" en `components/RegisterForm.tsx` a `/login` y el `router.push` en `app/registro/page.tsx` a `/login?registered=true` tras completar T029
- [x] T031 Agregar atributos de accesibilidad en `components/RegisterForm.tsx`: `aria-invalid="true"` en campos con error, `aria-describedby` apuntando al `<p>` del error, `autoComplete` apropiado por campo
- [x] T032 [P] Ejecutar suite completa de tests con `npm run test` y verificar que todos los tests pasan en Verde
- [x] T033 [P] Revisar consistencia visual: todos los colores, radios y tipografía de `components/RegisterForm.tsx` usan tokens de `lib/constants/DesignTokens.ts` y clases Tailwind de `tailwind.config.ts`

---

## Dependencies & Execution Order

### Phase Dependencies

```
Phase 1 (Setup)
  └── Phase 2 (US1 — MVP)
        ├── Phase 3 (US2 — Validaciones)     ← depende de RegisterForm base (T009)
        ├── Phase 4 (US3 — Botón)            ← depende de RegisterForm base (T009)
        ├── Phase 5 (US6 — Responsive)       ← depende de page.tsx (T012)
        ├── Phase 6 (US4 — Social)           ← depende de RegisterForm base (T009)
        └── Phase 7 (US5 — Navegación)       ← depende de RegisterForm base (T009)
              └── Phase 8 (Polish)
```

### User Story Dependencies

| Story | Depende de | Puede paralelizarse con |
|-------|-----------|------------------------|
| US1 (P1) | Phase 1 completa | — |
| US2 (P2) | T009 (RegisterForm base) | US3, US6 |
| US3 (P2) | T009 (RegisterForm base) | US2, US6 |
| US6 (P2) | T012 (page.tsx) | US2, US3 |
| US4 (P3) | T009 (RegisterForm base) | US5 |
| US5 (P3) | T009 (RegisterForm base) | US4 |

### Dentro de cada User Story

```
Tests (TDD) → FAIL verificado
  └── Tipos / Validadores
        └── Servicio
              └── Componente (estructura base)
                    ├── Lógica de submit
                    ├── Validaciones inline
                    ├── Estado del botón
                    └── Integración completa
```

---

## Parallel Example: Phase 1 (Foundational)

```bash
# Lanzar en paralelo (archivos distintos):
Task T003: implementar validateFullName en lib/utils/Validation.ts
Task T004: implementar validatePasswordMatch en lib/utils/Validation.ts
# Después de T003 y T004:
Task T005: agregar tipos en lib/types/Auth.ts
Task T006: tests para AuthService.register()
# Después de T006:
Task T007: implementar AuthService.register()
```

## Parallel Example: Phase 3 (US2 — Validaciones)

```bash
# T016 y T017 pueden ejecutarse en paralelo (mismo archivo, bloques independientes):
Task T016: validación onBlur email en RegisterForm.tsx
Task T017: validación onBlur password en RegisterForm.tsx
```

---

## Implementation Strategy

### MVP (Solo User Story 1)

1. Completar **Phase 1** (T001–T007): tipos, validadores, servicio
2. Completar **Phase 2** (T008–T013): formulario base + página + redirect
3. **PARAR Y VALIDAR**: El formulario envía datos, redirige y muestra banner ✓
4. Demostrar flujo completo de registro

### Entrega Incremental

1. Phase 1 → Phase 2 → **MVP funcional** ✓
2. + Phase 3 (validaciones inline) → mejor UX
3. + Phase 4 (habilitación del botón) → guía al usuario
4. + Phase 5 (responsive) → listo para móvil
5. + Phase 6 + 7 (social + nav) → feature completa
6. + Phase 8 (polish) → producción

---

## Notes

- `[P]` = archivos distintos o bloques independientes, sin dependencias activas
- `[Story]` mapea la tarea a su user story para trazabilidad
- `SocialLogins.tsx` **no requiere modificaciones** — ya implementa el alert "Próximamente"
- `BrandPanel.tsx` **no requiere modificaciones** — ya tiene `hidden lg:flex` para responsive
- `components/ui/Button.tsx` y `components/ui/Input.tsx` **no requieren modificaciones**
- Hacer commit después de cada fase o grupo lógico de tareas
- Detener en cada **Checkpoint** para validar que los tests pasan antes de continuar
