---
description: "Task list for feature: Registro de Usuario"
---

# Tasks: Registro de Usuario

**Feature**: `002-registro-usuario` | **Branch**: `002-registro-usuario` | **Spec**: [spec.md](spec.md) | **Plan**: [plan.md](plan.md)
**Input**: [spec.md](spec.md), [plan.md](plan.md), [data-model.md](data-model.md), [contracts/registration-service.md](contracts/registration-service.md), [research.md](research.md)

> **Alcance estricto**: Solo archivos nuevos y modificaciones puntuales definidas en el plan.
> Componentes reutilizados sin cambio: `BrandPanel`, `Button`, `Input`, `SocialLogins`, `DesignTokens`.
> US3 (botones sociales) no genera tareas propias: cubierta por `SocialLogins` existente reutilizado en `RegisterForm`.

## Formato: `[ID] [P?] [Story?] Descripción con ruta de archivo`

- **[P]**: Puede ejecutarse en paralelo (archivos distintos, sin dependencias incompletas)
- **[US#]**: Historia de usuario a la que pertenece la tarea
- Las tareas de Fase 1–2 no llevan `[US#]` (son fundacionales, sirven a todas las historias)

---

## Fase 1: Tipos y Contratos

**Propósito**: Definir las entidades de dominio y el contrato de servicio. Bloquea todo lo demás.

**⚠️ CRÍTICO**: Ninguna tarea posterior puede comenzar hasta que T001 esté completo.

- [X] T001 Crear `lib/types/Registration.ts`

**Checkpoint**: Tipos disponibles → todas las demás fases pueden comenzar.

---

## Fase 2: Validators (extensión de Validation.ts)

**Propósito**: Agregar las tres funciones de validación nuevas al módulo existente. Siguiendo OCP: las funciones existentes (`validateEmail`, `validatePassword`) no se tocan.

- [X] T002 Extender `lib/utils/Validation.ts` — agregar `validateName`
- [X] T003 Extender `lib/utils/Validation.ts` — agregar `validatePasswordMatch`
- [X] T004 Extender `lib/utils/Validation.ts` — agregar `validateTrimmed`

**Checkpoint**: Validators disponibles → `RegisterForm` puede importarlos.

---

## Fase 3: Servicio de Registro

**Propósito**: Implementar el mock de registro siguiendo el patrón exacto de `AuthService.ts`.

**Dependencias**: T001 (necesita `RegistrationData` e `IRegistrationService`)

- [X] T005 [US1] Crear `lib/services/RegistrationService.ts`

**Checkpoint**: Servicio listo → `RegisterForm` puede integrarlo.

---

## Fase 4: Componentes UI

**Propósito**: Construir el componente atómico `Checkbox` y el formulario principal `RegisterForm`.

**Dependencias**: T001 (tipos), T002–T004 (validators), T005 (servicio)

- [X] T006 [P] [US1] [US2] Crear `components/ui/Checkbox.tsx`

- [X] T007 [US1] [US2] Crear `components/RegisterForm.tsx`
  - **Estado**: `fullName`, `email`, `password`, `confirmPassword`, `acceptsTerms` (valores) + `fullNameError`, `emailError`, `passwordError`, `confirmPasswordError`, `termsError`, `submitError` (strings o null) + `loading: boolean`
  - **Validaciones en tiempo real** con `useEffect`: (a) email → `validateEmail` + `validateTrimmed`; (b) password → `validatePassword`; (c) confirmPassword → `validatePasswordMatch`; (d) fullName → `validateName` + `validateTrimmed` en onBlur
  - **handleSubmit**: previene envío con campos vacíos (setea errores "Este campo es obligatorio"), verifica `acceptsTerms` (error "Debes aceptar los términos y condiciones"), activa `setLoading(true)`, llama `RegistrationService.register(...)`, en éxito hace `router.push('/login?registered=true')`, en fallo setea `submitError` con "Ocurrió un error al crear la cuenta. Intenta de nuevo.", desactiva loading en `finally`
  - **Renderiza**: `Input` ×4 (Nombres y Apellidos, Correo Electrónico, Contraseña type="password", Confirmar Contraseña type="password") + `Checkbox` ×1 (términos) + `Button` deshabilitado cuando `loading || !!emailError || !!passwordError || !acceptsTerms` + `SocialLogins` + link "¿Ya tienes una cuenta? Inicia Sesión" que navega a `/login`
  - **Mensajes de error exactos** según `data-model.md`: "Este campo es obligatorio", "Solo se permiten letras y espacios", "Hay espacios al inicio o al final. Por favor corrígelo.", "Formato de correo inválido", "La contraseña debe tener al menos 8 caracteres", "Las contraseñas no coinciden", "Debes aceptar los términos y condiciones"
  - **Layout**: espejo de `LoginForm.tsx` — `div.w-full.max-w-md.space-y-8` con heading "Crea tu cuenta", subtítulo, formulario, divisor "o continúa con", `SocialLogins`, link de navegación

**Checkpoint**: `RegisterForm` funcional → la página puede componerlo.

---

## Fase 5: Páginas

**Propósito**: Exponer `/register` como ruta y agregar el banner de éxito en `/login`.

**Dependencias**: T007 (RegisterForm), T001–T004 (para la modificación de `app/page.tsx`)

- [X] T008 [P] [US1] [US4] Crear `app/register/page.tsx`

- [X] T009 [US1] Modificar `app/page.tsx`

**Checkpoint**: Rutas `/register` y `/login?registered=true` funcionales end-to-end.

---

## Fase 6: Tests

**Propósito**: Verificar correctitud de todos los artefactos nuevos y las modificaciones. Tests escritos después de implementación (orden pragmático); pueden reordenarse al inicio de cada fase si se prefiere TDD estricto.

**Dependencias**: T001–T009 completos

> **Nota TDD**: La constitución del proyecto exige TDD (pruebas antes de implementación). Estas tareas pueden adelantarse al inicio de su fase correspondiente y ejecutarse en orden Rojo → Verde → Refactor si el equipo lo prefiere.

- [X] T010 [P] Extender `lib/utils/Validation.test.ts`

- [X] T011 [P] [US1] Crear `lib/services/RegistrationService.test.ts`

- [X] T012 [US1] [US2] Crear `components/RegisterForm.test.tsx`

- [X] T013 [P] [US1] [US4] Crear `app/register/page.test.tsx` (`app/register.test.tsx`)

- [X] T014 [US1] Extender `app/login.test.tsx`

**Checkpoint**: Suite de tests verde → feature completa y verificada.

---

## Dependencias y Orden de Ejecución

### Dependencias entre Fases

```
Fase 1 (Tipos)      → Sin dependencias — iniciar aquí
Fase 2 (Validators) → Sin dependencias de Fase 1 (funciones puras)
Fase 3 (Servicio)   → Requiere Fase 1 (importa RegistrationData, IRegistrationService)
Fase 4 (Componentes)→ Requiere Fase 1 + Fase 2 + Fase 3
Fase 5 (Páginas)    → Requiere Fase 4 (RegisterForm) | T009 requiere solo Fase 1–2
Fase 6 (Tests)      → Requiere Fase 1–5 completas (o adelantar por fase en TDD)
```

### Dependencias dentro de Fase 4

```
T006 (Checkbox)     → Sin dependencias de Fase 4 — puede iniciar con Fase 1 lista
T007 (RegisterForm) → Requiere T006 + T005 + T002–T004
```

### Dependencias dentro de Fase 6

```
T010 (Validation.test)   → [P] solo requiere T002–T004
T011 (Service.test)      → [P] solo requiere T005
T012 (RegisterForm.test) → Requiere T005–T007
T013 (register/page.test)→ [P] solo requiere T008
T014 (login.test)        → Requiere T009
```

### Oportunidades de Paralelismo

```bash
# Fase 1 y 2 pueden arrancar en paralelo (no se bloquean entre sí):
Task: "T001 — Crear lib/types/Registration.ts"
Task: "T002–T004 — Extender lib/utils/Validation.ts"

# T006 puede adelantarse mientras T007 espera el servicio (T005):
Task: "T006 — Crear components/ui/Checkbox.tsx"   ← mientras se implementa T005
Task: "T005 — Crear lib/services/RegistrationService.ts"

# En Fase 6, tests independientes en paralelo:
Task: "T010 — Extender Validation.test.ts"   ← en paralelo
Task: "T011 — Crear RegistrationService.test.ts"  ← en paralelo
Task: "T013 — Crear register/page.test.tsx"  ← en paralelo
```

---

## Estrategia de Implementación

### MVP (Historia de Usuario 1 solamente)

1. Completar **Fase 1** (T001) → tipos disponibles
2. Completar **Fase 2** (T002–T004) → validators disponibles
3. Completar **Fase 3** (T005) → servicio listo
4. Completar **Fase 4** (T006–T007) → formulario funcional
5. Completar **Fase 5** (T008–T009) → rutas expuestas
6. **VALIDAR**: flujo completo `POST /register → /login?registered=true → banner visible`
7. Agregar tests de Fase 6 (T010–T014)

### Incrementos posteriores

- **US2 (Validaciones)**: cubierta por T002–T004 + T007 + T010 + T012 — no requiere fases adicionales
- **US3 (Botones sociales)**: ✅ cubierta por `SocialLogins` ya reutilizado en T007 — sin tareas adicionales
- **US4 (Responsive/Navegación)**: cubierta por T008 (layout) + T007 (link navegación) — sin tareas adicionales

---

## Notas

- `[P]` = archivos distintos, sin dependencias incompletas en la misma fase
- `[US#]` = trazabilidad a historia de usuario de spec.md
- Mensajes de error exactos están hardcodeados en `RegisterForm.tsx` (ver `data-model.md`)
- Tokens de diseño: `BrandPrimary`, `BorderRadiusLg`, `BorderRadiusMd`, `Neutral900`, `Neutral500`, `Neutral300` de `lib/constants/DesignTokens.ts`
- Cero librerías externas nuevas — restricción de constitución
- `SocialLogins` se reutiliza sin modificaciones (decisión de research.md)
