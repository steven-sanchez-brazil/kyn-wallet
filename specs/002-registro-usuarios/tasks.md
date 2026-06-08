# Tasks: Pantalla de Registro de Usuarios — KynWallet

**Input**: Design documents from `specs/002-registro-usuarios/`  
**Branch**: `feature/002-registro-usuarios`  
**Fecha**: 2026-06-08  
**Prerequisites**: [plan.md](./plan.md) ✓ | [spec.md](./spec.md) ✓ | [research.md](./research.md) ✓ | [data-model.md](./data-model.md) ✓ | [contracts/register-service.md](./contracts/register-service.md) ✓

## Formato: `[ID] [P?] [Story?] Descripción — ruta/archivo`

- **[P]**: Puede ejecutarse en paralelo (archivos distintos, sin dependencias entre sí)
- **[Story]**: Historia de usuario a la que pertenece la tarea (US1–US8)
- Las rutas son relativas a la raíz del repositorio

---

## Phase 1: Setup y Análisis

**Propósito**: Verificar el estado del proyecto, analizar la estructura existente y capturar el contexto visual del diseño antes de comenzar la implementación.

- [X] T001 Ejecutar `npm install && npm run dev` y confirmar que la app corre en http://localhost:3000 sin errores
- [X] T002 [P] Revisar estructura de rutas: `app/page.tsx` (login), `app/construction/page.tsx`; confirmar App Router activo
- [X] T003 [P] Revisar `package.json`: confirmar Next.js 14, React 18, Tailwind CSS 3.x, Vitest, @testing-library/react presentes
- [X] T004 [P] Revisar componentes existentes: `components/BrandPanel.tsx`, `components/LoginForm.tsx`, `components/SocialLogins.tsx`, `components/ui/Input.tsx`, `components/ui/Button.tsx`
- [X] T005 [P] Revisar `lib/services/AuthService.ts`, `lib/types/Auth.ts`, `lib/utils/Validation.ts` — documentar contratos actuales
- [X] T006 Revisar `lib/constants/DesignTokens.ts` y `tailwind.config.ts` — confirmar tokens de color, tipografía y border-radius disponibles
- [X] T007 Capturar contexto visual del frame "04 · Registro" (node-id `31:2`) del archivo Figma `T4WwrDTsb3o5rc3FxEw2gs` via Figma MCP o screenshot de referencia
- [X] T008 Documentar fallback: si Figma MCP no responde, usar imagen de referencia del diseño para guiar implementación visual

**Checkpoint**: Proyecto corriendo localmente, estructura comprendida, diseño de referencia disponible. Sin bloqueos para continuar.

---

## Phase 2: Fundacional — Tipos, Validaciones y Extensiones Base

**Propósito**: Infraestructura compartida que DEBE completarse antes de cualquier historia de usuario. Bloquea todas las fases siguientes.

**⚠️ CRÍTICO**: Ningún trabajo de historia de usuario puede comenzar hasta que esta fase esté completa.

### Tests de la capa fundacional (TDD — escribir antes de implementar)

- [X] T009 [P] Escribir tests para `validateFullName`: nombre vacío → false, una palabra → false, dos palabras → true, con espacios extra → true — `lib/utils/Validation.test.ts`
- [X] T010 [P] Escribir tests para `validatePasswordMatch`: iguales → true, distintos → false, una vacía → false — `lib/utils/Validation.test.ts`
- [X] T011 [P] Escribir tests para `AuthService.register()`: registro exitoso, email duplicado (seed), email duplicado (localStorage), login post-registro — `lib/services/AuthService.test.ts`

### Implementación fundacional

- [X] T012 Extender `User` con `FullName: string`; agregar `RegisterCredentials`, `RegisterResult`, `RegisterErrorCode` en `lib/types/Auth.ts`
- [X] T013 Implementar `validateFullName(name: string): boolean` en `lib/utils/Validation.ts` (depende de T009)
- [X] T014 Implementar `validatePasswordMatch(password: string, confirm: string): boolean` en `lib/utils/Validation.ts` (depende de T010)
- [X] T015 Agregar `FullName: 'Steven Luna'` al usuario seed existente en `lib/services/AuthService.ts` para mantener compatibilidad con `User` extendido (depende de T012)
- [X] T016 Implementar `AuthService.register()`: verificar unicidad, persistir en `localStorage['kynwallet_users']`, retornar `RegisterResult` tipado en `lib/services/AuthService.ts` (depende de T011, T012)
- [X] T017 Actualizar `AuthService.login()` para incluir usuarios dinámicos de `localStorage` en la búsqueda en `lib/services/AuthService.ts` (depende de T015)
- [X] T018 [P] Agregar prop `showPasswordToggle?: boolean` a `Input` con toggle ícono SVG (ojo) y estado local `showPassword` — `components/ui/Input.tsx`
- [X] T019 [P] Agregar props opcionales `headline?: string` y `subheadline?: string` a `BrandPanel` con valores default que preservan el comportamiento actual del Login — `components/BrandPanel.tsx`
- [X] T020 Ejecutar `npm run test` y confirmar que todos los tests de Validation y AuthService pasan (0 fallos antes de continuar)

**Checkpoint**: Tests unitarios pasan. Tipos, validaciones y servicios listos. `BrandPanel` e `Input` extendidos de forma backward-compatible.

---

## Phase 3: Historia de Usuario 1 — Registro exitoso con datos válidos (Prioridad: P1) 🎯 MVP

**Goal**: El usuario puede completar el formulario de registro con datos válidos, crear su cuenta y ser redirigido a `/login` con un mensaje de confirmación visible.

**Independent Test**: Llenar todos los campos correctamente (nombre: "Ana García", email: ana@test.com, contraseña: mipassword123, confirmar: mipassword123, T&C marcado) → presionar "Crear cuenta" → verificar redirección a `/login?registered=true` → verificar banner verde → intentar login con los datos recién creados → verificar acceso a `/construction`.

### Tests para US1 (TDD — escribir antes de implementar)

- [X] T021 [US1] Escribir test de componente: render inicial de `RegisterForm` muestra título "Crea tu cuenta" y todos los campos — `components/RegisterForm.test.tsx`
- [X] T022 [US1] Escribir test de componente: submit con datos válidos llama a `AuthService.register()` y navega a `/login?registered=true` — `components/RegisterForm.test.tsx`
- [X] T023 [US1] Escribir test de componente: banner de registro exitoso aparece en `LoginForm` cuando URL contiene `?registered=true` — `components/LoginForm.test.tsx`

### Implementación de US1

- [X] T024 [US1] Crear `components/RegisterForm.tsx` (client component) con estado local `RegisterFormState` (fullName, email, password, confirmPassword, acceptTerms, showPassword, showConfirmPassword, errores, loading) — `components/RegisterForm.tsx`
- [X] T025 [US1] Implementar estructura JSX del formulario: título "Crea tu cuenta", subtítulo "Completa tus datos para comenzar", 4 inputs (usando componente `Input`), checkbox T&C, botón "Crear cuenta" — `components/RegisterForm.tsx`
- [X] T026 [US1] Aplicar estilos visuales Figma al RegisterForm: heading `text-[#16182c]` font-bold text-[30px], subtitle `text-[#8a8ca8]` text-[16px], labels `text-[#3d3f5c]` text-[14px] font-medium, inputs border-[#d7d9e6] border-[1.5px] rounded-[12px] h-[52px] — `components/RegisterForm.tsx`
- [X] T027 [US1] Conectar `AuthService.register()` en el handler del formulario; redirigir a `/login?registered=true` con `router.push()` en caso de éxito; mostrar error inline en email si `EMAIL_TAKEN` — `components/RegisterForm.tsx`
- [X] T028 [P] [US1] Crear `app/register/page.tsx` como Server Component que compone `BrandPanel` (con headline "Comienza tu\ncamino financiero." y subheadline correspondiente) y `RegisterForm` en layout de 2 paneles igual que `app/page.tsx` — `app/register/page.tsx`
- [X] T029 [US1] Agregar detección de `?registered=true` con `useSearchParams()` en `LoginForm` y mostrar banner verde con texto "¡Cuenta creada exitosamente! Ya puedes iniciar sesión." — `components/LoginForm.tsx`
- [X] T030 [US1] Ejecutar tests de US1 y confirmar que pasan; verificar flujo completo manualmente: registro → `/login?registered=true` → banner visible → login exitoso

**Checkpoint**: Flujo de registro completo funcionando end-to-end. US1 independientemente verificable.

---

## Phase 4: Historias de Usuario 2, 3 y 4 — Validaciones Inline, Confirmación y T&C (Prioridad: P2)

**Goal**: El usuario ve errores claros junto a cada campo inválido al presionar "Crear cuenta", incluyendo confirmación de contraseña y aceptación de términos.

**Independent Test**: Presionar "Crear cuenta" con todos los campos vacíos → verificar 5 errores simultáneos (uno por campo + checkbox). Luego probar cada caso individualmente: email inválido, pwd < 8, pwd ≠ confirm, T&C desmarcado.

### Tests para US2, US3, US4 (TDD — escribir antes de implementar)

- [X] T031 [P] [US2] Escribir tests: submit con nombre vacío → error "El nombre completo es requerido"; nombre con 1 palabra → error "Ingresa tu nombre y apellido" — `components/RegisterForm.test.tsx`
- [X] T032 [P] [US2] Escribir tests: submit con email vacío → error "El correo electrónico es requerido"; email inválido (ej. "abc") → error "Correo electrónico inválido" — `components/RegisterForm.test.tsx`
- [X] T033 [P] [US2] Escribir tests: submit con contraseña vacía → error "La contraseña es requerida"; pwd < 8 chars → error "La contraseña debe tener al menos 8 caracteres" — `components/RegisterForm.test.tsx`
- [X] T034 [P] [US3] Escribir tests: confirmar vacío → error "Debes confirmar tu contraseña"; confirmar ≠ contraseña → error "Las contraseñas no coinciden" — `components/RegisterForm.test.tsx`
- [X] T035 [P] [US4] Escribir tests: submit con T&C desmarcado → error "Debes aceptar los términos y condiciones"; con T&C marcado y resto válido → sin error de checkbox — `components/RegisterForm.test.tsx`

### Implementación de US2, US3, US4

- [X] T036 [US2] Implementar validación de nombre completo en handler de submit: vacío → "El nombre completo es requerido"; 1 palabra → "Ingresa tu nombre y apellido" (usando `validateFullName`) — `components/RegisterForm.tsx`
- [X] T037 [US2] Implementar validación de correo electrónico en handler de submit: vacío → "El correo electrónico es requerido"; formato inválido → "Correo electrónico inválido" (usando `validateEmail`) — `components/RegisterForm.tsx`
- [X] T038 [US2] Implementar validación de contraseña en handler de submit: vacía → "La contraseña es requerida"; < 8 chars → "La contraseña debe tener al menos 8 caracteres" (usando `validatePassword`) — `components/RegisterForm.tsx`
- [X] T039 [US3] Implementar validación de confirmación de contraseña en handler de submit: vacía → "Debes confirmar tu contraseña"; no coincide → "Las contraseñas no coinciden" (usando `validatePasswordMatch`) — `components/RegisterForm.tsx`
- [X] T040 [US4] Implementar validación del checkbox T&C en handler de submit: desmarcado → "Debes aceptar los términos y condiciones" — `components/RegisterForm.tsx`
- [X] T041 [US2] Asegurar que el formulario NO se envía si cualquier campo tiene error (bloquear llamada a `AuthService.register()`) — `components/RegisterForm.tsx`
- [X] T042 [US2] Verificar que los mensajes de error aparecen como texto rojo debajo de cada input (`text-xs text-red-500`) sin recargar la página — `components/RegisterForm.tsx`
- [X] T043 [US2] Ejecutar todos los tests de validaciones US2+US3+US4 y confirmar que pasan (0 fallos)

**Checkpoint**: Todas las validaciones inline funcionan. Formulario no se envía con datos inválidos. US2, US3, US4 independientemente verificables.

---

## Phase 5: Historias de Usuario 5 y 6 — Social Placeholder y Navegación (Prioridad: P3)

**Goal**: Los botones de Google y Apple muestran alert "Próximamente" y el enlace "¿Ya tienes cuenta?" navega correctamente a `/login`.

**Independent Test**: Clic en Google → alert con texto "Próximamente". Clic en Apple → alert con texto "Próximamente". Clic en "Inicia sesión" → URL cambia a `/`.

### Tests para US5 y US6 (TDD — escribir antes de implementar)

- [X] T044 [P] [US5] Escribir tests: clic en botón "Google" → se llama a `window.alert` con texto que incluye "Próximamente"; clic en botón "Apple" → igual — `components/RegisterForm.test.tsx`
- [X] T045 [P] [US6] Escribir test: el enlace "Inicia sesión" tiene `href="/login"` o equivalente de next/link apuntando a `/` — `components/RegisterForm.test.tsx`

### Implementación de US5 y US6

- [X] T046 [US5] Agregar `SocialLogins` al JSX de `RegisterForm` (o implementar inline los handlers de Google/Apple con `alert('Próximamente')`) con estilos Figma: botones con borde `#d7d9e6` 1.5px, radius 12px, altura 48px, label SemiBold `#16182c` — `components/RegisterForm.tsx`
- [X] T047 [US5] Agregar divisor "o regéstrate con" entre botón principal y botones sociales (línea horizontal con texto centrado) en `RegisterForm` — `components/RegisterForm.tsx`
- [X] T048 [US6] Agregar enlace `¿Ya tienes cuenta? [Inicia sesión]` al final del formulario usando `next/link` href="/", con texto "Inicia sesión" en color `text-[#ef5226]` font-semibold — `components/RegisterForm.tsx`
- [X] T049 [US5] Verificar manualmente: clic en "Google" → alert con "Próximamente"; clic en "Apple" → alert con "Próximamente"
- [X] T050 [US6] Verificar manualmente: clic en "Inicia sesión" → navegación a `http://localhost:3000/` (pantalla de login)
- [X] T051 [US5] Ejecutar tests de US5+US6 y confirmar que pasan

**Checkpoint**: Botones sociales y navegación al login funcionan. US5 y US6 independientemente verificables.

---

## Phase 6: Historia de Usuario 7 — Integración bidireccional con Login (Prioridad: P3)

**Goal**: La pantalla de Login existente en `/` incluye un enlace funcional "Regístrate" que navega a `/register`, completando el ciclo de navegación.

**Independent Test**: Abrir `/` → hacer clic en "Regístrate" → verificar navegación a `/register`. Verificar que el Login sigue funcionando con los usuarios existentes (tucorreo@ejemplo.com / password123).

### Tests para US7 (TDD — escribir antes de implementar)

- [X] T052 [US7] Escribir test: `LoginForm` renderiza texto "¿No tienes cuenta?" con enlace `href="/register"` o similar — `components/LoginForm.test.tsx`

### Implementación de US7

- [X] T053 [US7] Agregar al final de `LoginForm` el texto "¿No tienes cuenta? [Regístrate]" usando `next/link` href="/register", con "Regístrate" en color `text-brand-primary` font-semibold — `components/LoginForm.tsx`
- [X] T054 [US7] Verificar manualmente que el usuario seed existente (`tucorreo@ejemplo.com` / `password123`) sigue pudiendo hacer login tras los cambios en `LoginForm` y `AuthService`
- [X] T055 [US7] Verificar manualmente: clic en "Regístrate" desde `/` → navega a `/register` correctamente
- [X] T056 [US7] Ejecutar tests de `LoginForm` y confirmar que pasan (incluyendo T052 y tests previos de login)

**Checkpoint**: Ciclo completo de navegación Login ↔ Registro funcional. Usuarios existentes preservados. US7 independientemente verificable.

---

## Phase 7: Historia de Usuario 8 — Responsive y Fidelidad Visual (Prioridad: P3)

**Goal**: La pantalla de registro es completamente responsive (2 paneles en desktop, solo formulario en mobile) y fiel al diseño Figma "04 · Registro" en todos sus elementos visuales.

**Independent Test**: Abrir `/register` en desktop (≥1024px) → verificar 2 paneles. Reducir a 375px → verificar BrandPanel oculto, formulario full-width. Revisar colores, tipografía y espaciados contra la imagen de referencia Figma.

### Verificaciones de US8

- [X] T057 [US8] Verificar layout desktop (≥1024px): `BrandPanel` visible a la izquierda (w-1/2), formulario a la derecha (w-1/2) — `app/register/page.tsx` y `components/BrandPanel.tsx`
- [X] T058 [US8] Verificar layout mobile (<1024px): `BrandPanel` oculto (`hidden lg:flex`), formulario ocupa ancho completo (`w-full`) — confirmar clase en `app/register/page.tsx`
- [X] T059 [US8] Verificar colores en `RegisterForm`: título `#16182c`, subtítulo `#8a8ca8`, labels `#3d3f5c`, placeholder `#a9abc2`, botón primario `#ff6b3d`, links `#ef5226` — `components/RegisterForm.tsx`
- [X] T060 [US8] Verificar tipografía: título Inter Bold 30px, subtítulo Regular 16px, labels Medium 14px, botón SemiBold 16px — `components/RegisterForm.tsx`
- [X] T061 [US8] Verificar inputs: border-radius 12px (`rounded-[12px]`), border 1.5px `#d7d9e6`, altura 52px (`h-[52px]`) — `components/RegisterForm.tsx`
- [X] T062 [US8] Verificar toggle de visibilidad (ícono ojo) en campos "Contraseña" y "Confirmar contraseña": clic alterna entre texto visible/oculto — `components/ui/Input.tsx`
- [X] T063 [US8] Verificar textos exactos del diseño Figma en todos los elementos: "Crea tu cuenta", "Completa tus datos para comenzar", "Nombre completo", "Ej: Diego Martínez", "Correo electrónico", "tucorreo@ejemplo.com", "Contraseña", "Confirmar contraseña", "Acepto los términos y condiciones", "Crear cuenta", "o regístrate con", "Google", "Apple", "¿Ya tienes cuenta? Inicia sesión"
- [X] T064 [US8] Verificar accesibilidad básica: todos los `<input>` tienen `<label>` con `htmlFor` correspondiente; botón "Crear cuenta" tiene `type="submit"`; checkbox tiene `<label>` asociado; botones sociales tienen texto descriptivo visible — `components/RegisterForm.tsx`
- [X] T065 [US8] Verificar BrandPanel en registro: headline "Comienza tu camino financiero.", subheadline correcto, card mockup de Kyn Card visible, gradiente naranja activo — `app/register/page.tsx`

**Checkpoint**: Diseño fiel al Figma en desktop y mobile. Accesibilidad básica garantizada. US8 verificable.

---

## Phase 8: Calidad y Entrega

**Propósito**: Verificación final de calidad, limpieza de código y commit del feature completo.

- [X] T066 [P] Ejecutar `npm run lint` y corregir todos los errores/warnings de ESLint reportados
- [X] T067 [P] Ejecutar `npm run test` y confirmar que todos los tests pasan (0 fallos, 0 errores de tipos en tests)
- [X] T068 [P] Ejecutar `npm run build` y confirmar build exitoso (0 errores TypeScript, 0 errores de Next.js)
- [X] T069 Revisar `components/RegisterForm.tsx`: PascalCase en tipos, SRP respetado, sin comentarios innecesarios, sin lógica hardcodeada fuera de componentes
- [X] T070 Revisar `lib/services/AuthService.ts`: MOCK_USERS seed intacto, `register()` no modifica el seed, localStorage encapsulado en el servicio
- [X] T071 Confirmar existencia de todos los artefactos de documentación: `spec.md`, `plan.md`, `research.md`, `data-model.md`, `quickstart.md`, `contracts/register-service.md`, `checklists/requirements.md` en `specs/002-registro-usuarios/`
- [X] T072 Confirmar que `tasks.md` está completo y refleja el trabajo implementado en `specs/002-registro-usuarios/`
- [X] T073 Commit final con todos los archivos del feature: nuevos (RegisterForm.tsx, app/register/page.tsx, RegisterForm.test.tsx) y modificados (Auth.ts, AuthService.ts, Validation.ts, Input.tsx, BrandPanel.tsx, LoginForm.tsx)

**Checkpoint Final**: Feature completo, tests pasan, build limpio, documentación completa, código committed.

---

## Dependencias y Orden de Ejecución

### Dependencias entre Fases

- **Phase 1 (Setup)**: Sin dependencias — puede comenzar de inmediato
- **Phase 2 (Fundacional)**: Depende de Phase 1 — BLOQUEA todas las historias de usuario
- **Phase 3 (US1)**: Depende de Phase 2 completa — MVP del feature
- **Phase 4 (US2/3/4)**: Depende de Phase 2 completa y Phase 3 (RegisterForm debe existir)
- **Phase 5 (US5/6)**: Depende de Phase 2 completa y Phase 3 (RegisterForm debe existir)
- **Phase 6 (US7)**: Depende de Phase 3 (LoginForm ya modificado) — puede paralelizarse con Phase 5
- **Phase 7 (US8)**: Depende de Phase 3, 4, 5 y 6 — revisión visual del feature completo
- **Phase 8 (Calidad)**: Depende de todas las fases anteriores

### Dependencias entre Historias de Usuario

- **US1 (P1)**: Sin dependencias en otras historias — MVP autónomo
- **US2, US3, US4 (P2)**: Requieren US1 (RegisterForm debe existir)
- **US5, US6 (P3)**: Requieren US1 (RegisterForm debe existir); son independientes entre sí
- **US7 (P3)**: Requiere US1 (para que el link en LoginForm sea funcional); independiente de US2-US6
- **US8 (P3)**: Requiere US1 (pantalla debe existir para validar visual)

### Dentro de Cada Historia

- Tests DEBEN escribirse y FALLAR antes de implementar (TDD)
- Tipos antes que servicios (T012 antes de T016)
- Servicios antes que componentes (T016 antes de T024)
- Componente base antes que validaciones en el componente (T024 antes de T036)

---

## Ejemplos de Paralelización

### Phase 2 — Fundacional (paralelo entre módulos independientes)

```bash
# Escritura de tests en paralelo (archivos distintos):
T009: validateFullName/validatePasswordMatch tests → Validation.test.ts
T010: (incluido en T009)
T011: AuthService.register() tests → AuthService.test.ts

# Implementaciones independientes en paralelo:
T018: showPasswordToggle en Input → components/ui/Input.tsx
T019: headline/subheadline en BrandPanel → components/BrandPanel.tsx
```

### Phase 3 — US1 (paralelo entre archivos)

```bash
# Tests y página pueden comenzar en paralelo:
T021-T023: Tests RegisterForm y LoginForm
T028: app/register/page.tsx (estructura de página — no depende del RegisterForm interno)
```

### Phases 4 y 5 — US2/3/4 y US5/6 (completamente en paralelo entre sí)

```bash
# Una vez Phase 3 completa:
Developer A: Phase 4 (validaciones inline US2/3/4)
Developer B: Phase 5 (social + navegación US5/6)
# Ambos trabajan en RegisterForm.tsx pero en secciones distintas del componente
```

---

## Estrategia de Implementación

### MVP Primero (Solo US1)

1. Completar Phase 1: Setup y análisis
2. Completar Phase 2: Fundacional (CRÍTICO — bloquea todo)
3. Completar Phase 3: US1 — registro exitoso end-to-end
4. **PAUSAR Y VALIDAR**: Probar US1 de forma independiente (quickstart.md)
5. Demostrar/entregar si el MVP es suficiente

### Entrega Incremental

1. Setup + Fundacional → Base lista
2. US1 → MVP entregable: registro funcional + redirect + banner ✓
3. US2+US3+US4 → Validaciones inline: UX completa del formulario ✓
4. US5+US6 → Social placeholder + navegación: interfaz completa ✓
5. US7 → Link en Login: ciclo completo de navegación ✓
6. US8 → Responsive + visual: fidelidad al diseño ✓
7. Calidad → Linting, tests, build limpio ✓

### Criterios de Aceptación por Historia

| Historia | Criterio de Verificación Independiente |
|----------|---------------------------------------|
| US1 | Registro completo → redirect `/login?registered=true` → banner → login exitoso |
| US2 | Submit vacío → 4 errores de campo simultáneos visibles inline |
| US3 | Contraseñas distintas → error "Las contraseñas no coinciden" inline |
| US4 | T&C desmarcado → error checkbox → formulario no enviado |
| US5 | Clic Google/Apple → `alert('Próximamente')` |
| US6 | Clic "Inicia sesión" → navega a `/` |
| US7 | Clic "Regístrate" en `/` → navega a `/register` |
| US8 | ≥1024px → 2 paneles | <1024px → solo formulario full-width |

---

## Notas

- **[P]** = archivos distintos, sin dependencias entre tareas marcadas
- **[Story]** = trazabilidad hacia historias de usuario en spec.md
- TDD enforced: siempre tests primero → confirmar que fallan → implementar → confirmar que pasan
- Commit recomendado tras cada fase o grupo lógico de tareas
- Pausar en cualquier checkpoint para validar la historia de forma independiente
- Usuarios seed (`tucorreo@ejemplo.com` / `password123`) son INMUTABLES — verificar antes y después de cada fase
