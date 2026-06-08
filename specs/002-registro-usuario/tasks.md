# Tasks: Registro de Usuario Nuevo

**Input**: Documentos de diseño de `specs/002-registro-usuario/`

**Prerrequisitos**: plan.md ✅ | spec.md ✅ | research.md ✅ | data-model.md ✅ | contracts/ ✅

**Tests**: Incluidos — la constitución del proyecto exige TDD estricto y SC-005 requiere 100% de cobertura en nuevos componentes.

**Organización**: Las tareas están agrupadas por historia de usuario para permitir implementación y testing independiente de cada historia.

## Formato: `[ID] [P?] [Story?] Descripción`

- **[P]**: Puede ejecutarse en paralelo (archivos diferentes, sin dependencias incompletas)
- **[Story]**: Historia de usuario a la que pertenece (US1, US2, US3, US4)
- Todos los tests deben escribirse **antes** de la implementación (TDD: Rojo → Verde → Refactorizar)

---

## Phase 1: Setup (Infraestructura Compartida)

**Propósito**: Verificar que el entorno está listo para la implementación del feature.

- [x] T001 Verificar que la branch `registro-leonardo-tagliabue` está activa y que `npm install` fue ejecutado correctamente (`package.json` tiene todas las dependencias)

---

## Phase 2: Fundacional (Prerrequisitos que bloquean las Historias de Usuario)

**Propósito**: Tipos, interfaces y utilidades base que US2, US3 y US4 necesitan antes de poder iniciar.

**⚠️ CRÍTICO**: Ninguna historia de usuario puede comenzar hasta que esta fase esté completa.

- [x] T002 [P] Escribir tests que fallen para `validatePasswordMatch()` y `validateFullName()` en `lib/utils/Validation.test.ts` (TDD — deben fallar antes de implementar)
- [x] T003 [P] Extender `lib/types/Auth.ts` con las interfaces `NuevoUsuario` (`NombreCompleto`, `Email`, `Contrasena`, `ConfirmarContrasena`) y `ResultadoRegistro` (`Exitoso`, `MensajeError?`)
- [x] T004 Implementar `validatePasswordMatch(password: string, confirm: string): boolean` y `validateFullName(name: string): boolean` en `lib/utils/Validation.ts` (depende de T002 en rojo, T003)
- [x] T005 [P] Escribir tests que fallen para `AuthService.register(datos: NuevoUsuario): Promise<ResultadoRegistro>` en `lib/services/AuthService.test.ts` — cubrir: registro exitoso, email duplicado, datos inválidos (TDD — depende de T003)
- [x] T006 Implementar el método `register()` en `lib/services/AuthService.ts` extendiendo `IAuthService` y `MOCK_USERS` (depende de T005 en rojo, T003, T004)

**Checkpoint**: Tipos, validaciones y servicio de registro funcionan y sus tests pasan ✅

---

## Phase 3: Historia de Usuario 1 — Navegación al Registro desde el Login (Prioridad: P1) 🎯 MVP

**Goal**: El usuario ve el enlace "¿No tiene cuenta? Registrate" en el Login y al clickearlo navega a `/registro`.

**Prueba Independiente**: Ejecutar `npm run test` — el test de `components/LoginForm.test.tsx` verifica que el enlace existe y apunta a `/registro`.

- [x] T007 [US1] Escribir test que falle para el enlace "¿No tiene cuenta? Registrate" en `components/LoginForm.test.tsx` — verificar presencia del texto y href a `/registro` (TDD)
- [x] T008 [US1] Agregar enlace "¿No tiene cuenta? <Link href='/registro'>Registrate</Link>" al pie del formulario en `components/LoginForm.tsx` con estilo: texto `#8a8ca8`, enlace `#ff6b3d` (depende de T007 en rojo)

**Checkpoint**: Enlace visible en Login, navega a `/registro` — US1 completamente funcional y testeable ✅

---

## Phase 4: Historia de Usuario 2 — Registro de Usuario con Datos Válidos (Prioridad: P1) 🎯 MVP

**Goal**: El usuario completa el formulario de registro con datos válidos y el sistema crea su cuenta redirigiendo a `/construction`.

**Prueba Independiente**: Ejecutar `npm run test` — los tests de `components/RegistroForm.test.tsx` verifican renderizado, validaciones en tiempo real, submit exitoso y fallido.

- [x] T009 [P] [US2] Escribir tests que fallen para `RegistroForm` en `components/RegistroForm.test.tsx` — cubrir: renderizado de los 4 campos, error por nombre inválido, error por email inválido, error por contraseña corta, error por contraseñas que no coinciden, submit exitoso redirige a `/construction`, submit con email duplicado muestra error general (TDD)
- [x] T010 [P] [US2] Escribir test de integración que falle para el flujo completo de registro en `app/login.test.tsx` (extender archivo existente) — verificar que la ruta `/registro` renderiza correctamente (TDD)
- [x] T011 [US2] Crear `components/RegistroForm.tsx` con estado interno (`nombreCompleto`, `email`, `contrasena`, `confirmarContrasena`, `errores`, `cargando`), validaciones en tiempo real por `onChange`/`onBlur`, llamada a `AuthService.register()` en submit, redirect a `/construction` con `useRouter`, y enlace "¿Ya tenés cuenta? Iniciá sesión" con `<Link href='/'>` (depende de T009 en rojo, T006, T004)
- [x] T012 [US2] Crear `app/registro/page.tsx` componiendo `<BrandPanel />` y `<RegistroForm />` en layout split-panel igual al patrón de `app/page.tsx` (depende de T010 en rojo, T011)

**Checkpoint**: Formulario de registro funcional — US1 + US2 completamente operativos y testeables ✅

---

## Phase 5: Historia de Usuario 3 — Identidad Visual del Formulario de Registro (Prioridad: P2)

**Goal**: La pantalla de registro coincide visualmente en un 95%+ con `registro_screen.png`.

**Prueba Independiente**: Inspección visual de `http://localhost:3000/registro` comparando contra `registro_screen.png` — colores, tipografía, espaciados y disposición de elementos.

- [x] T013 [P] [US3] Inspeccionar `registro_screen.png` (raíz del proyecto) y documentar todos los tokens de diseño (colores, espaciados, tamaños de fuente) que difieran de los ya definidos en `lib/constants/DesignTokens.ts`
- [x] T014 [US3] Actualizar `lib/constants/DesignTokens.ts` y `tailwind.config.ts` con los tokens adicionales identificados en T013, si los hay (depende de T013)
- [x] T015 [US3] Aplicar polish visual en `components/RegistroForm.tsx` usando los tokens de diseño para que el layout, tipografía, colores y espaciados coincidan con `registro_screen.png` al 95%+ (depende de T014, T011)

**Checkpoint**: Pantalla de registro visualmente fiel a `registro_screen.png` ✅

---

## Phase 6: Historia de Usuario 4 — Navegación de Vuelta al Login (Prioridad: P3)

**Goal**: El usuario en la pantalla de registro puede volver al Login sin usar el botón "atrás" del navegador.

**Prueba Independiente**: Ejecutar `npm run test` — el test en `components/RegistroForm.test.tsx` verifica que el enlace "¿Ya tenés cuenta? Iniciá sesión" existe y apunta a `/`.

- [x] T016 [US4] Escribir test que falle para el enlace "¿Ya tenés cuenta? Iniciá sesión" en `components/RegistroForm.test.tsx` — verificar texto e href a `/` (TDD — si no fue cubierto en T009)
- [x] T017 [US4] Verificar e implementar el enlace "¿Ya tenés cuenta? <Link href='/'>Iniciá sesión</Link>" en `components/RegistroForm.tsx` con estilo consistente (texto `#8a8ca8`, enlace `#ff6b3d`) (depende de T016 en rojo, T011)

**Checkpoint**: Navegación bidireccional Login ↔ Registro funcional — todas las historias de usuario testeables ✅

---

## Phase 7: Polish y Validación Final

**Propósito**: Verificación de cobertura, limpieza de código y validación end-to-end.

- [x] T018 [P] Ejecutar suite completa con `npm run test` y verificar que todos los tests pasan y la cobertura de nuevos archivos alcanza el 100% (SC-005)
- [x] T019 [P] Validar el flujo end-to-end en el navegador: `http://localhost:3000` → click "Registrate" → completar formulario → registro exitoso → `/construction`
- [x] T020 Revisar todos los archivos nuevos y modificados para verificar cumplimiento estricto de `PascalCase` en componentes, interfaces y tipos, y que no se importan librerías externas

---

## Dependencias y Orden de Ejecución

### Dependencias entre Fases

- **Setup (Phase 1)**: Sin dependencias — puede iniciar de inmediato
- **Fundacional (Phase 2)**: Depende de Phase 1 — **BLOQUEA** US2, US3, US4
- **US1 (Phase 3)**: Puede iniciar en **paralelo** con Phase 2 — es completamente independiente
- **US2 (Phase 4)**: Depende de Phase 2 completa — puede iniciar en paralelo con Phase 3 una vez Phase 2 termine
- **US3 (Phase 5)**: Depende de Phase 4 (T011, T012) — requiere RegistroForm implementado
- **US4 (Phase 6)**: Depende de Phase 4 (T011) — el enlace debe estar en RegistroForm
- **Polish (Phase 7)**: Depende de todas las historias deseadas completadas

### Dependencias entre Tareas

| Tarea | Depende de | Descripción |
|-------|------------|-------------|
| T004  | T002 (rojo), T003 | Implementar validaciones después de tests fallando |
| T005  | T003 | Tests de register() necesitan los tipos |
| T006  | T005 (rojo), T003, T004 | Implementar register() después de tests fallando |
| T008  | T007 (rojo) | Implementar enlace después de test fallando |
| T010  | T003 | Test de integración necesita tipos |
| T011  | T009 (rojo), T006, T004 | RegistroForm necesita servicio y validaciones |
| T012  | T010 (rojo), T011 | Página necesita RegistroForm |
| T014  | T013 | Actualizar tokens después de inspección |
| T015  | T014, T011 | Polish visual necesita tokens y componente |
| T017  | T016 (rojo), T011 | Verificar enlace después de test fallando |

### Oportunidades de Paralelismo

- **T002 + T003**: Paralelos (archivos distintos: `Validation.test.ts` y `Auth.ts`)
- **T005 + T003**: T005 puede iniciar junto con T003 si se mockean los tipos
- **Phase 3 (T007-T008) + Phase 2**: US1 es completamente independiente de los tipos/servicios del registro
- **T009 + T010**: Paralelos (archivos distintos: `RegistroForm.test.tsx` y `login.test.tsx`)
- **T013 + otras Phase 5 en espera**: Inspección visual paralela mientras se completan tests

---

## Ejemplo de Ejecución Paralela: Fase 2

```bash
# Lanzar en paralelo (archivos distintos):
Tarea: "T002 — Escribir tests de Validation en lib/utils/Validation.test.ts"
Tarea: "T003 — Extender tipos en lib/types/Auth.ts"

# Luego de T003 completado, en paralelo:
Tarea: "T004 — Implementar validaciones en lib/utils/Validation.ts"
Tarea: "T005 — Escribir tests de AuthService en lib/services/AuthService.test.ts"
```

## Ejemplo de Ejecución Paralela: US1 + Fundacional

```bash
# En paralelo desde el inicio (Phase 3 es independiente de Phase 2):
Developer A: Phase 2 — Fundacional (T002 → T003 → T004 → T005 → T006)
Developer B: Phase 3 — US1 (T007 → T008)
```

---

## Estrategia de Implementación

### MVP Mínimo (US1 únicamente — enlace en el Login)

1. Completar Phase 1: Setup (T001)
2. Completar Phase 3: US1 (T007, T008)
3. **PARAR Y VALIDAR**: El enlace "¿No tiene cuenta? Registrate" funciona en el Login
4. Demo/validación antes de continuar con el formulario completo

### MVP Completo (US1 + US2 — flujo de registro funcional)

1. Phase 1 + Phase 2 (Fundacional) + Phase 3 (US1) en paralelo
2. Phase 4 (US2)
3. **PARAR Y VALIDAR**: Flujo completo Login → Registro → `/construction`

### Entrega Incremental

1. Setup + Fundacional → Base lista
2. US1 → Enlace en Login visible ✅
3. US2 → Formulario de registro funcional ✅ (MVP!)
4. US3 → Identidad visual completa ✅
5. US4 → Navegación bidireccional ✅
6. Polish → 100% cobertura y revisión final ✅

---

## Notas

- `[P]` = archivos distintos, sin dependencias incompletas — pueden ejecutarse en paralelo
- `[USN]` = etiqueta de trazabilidad con la historia de usuario en `spec.md`
- **Regla TDD**: Todo test marcado como "(TDD)" DEBE fallar antes de escribir el código de implementación
- Consultar `registro_screen.png` (raíz del proyecto) como referencia visual primaria en US3
- Hacer commit después de cada tarea o grupo lógico (usar `/speckit-git-commit`)
- Detenerse en cada **Checkpoint** para validar la historia de forma independiente
