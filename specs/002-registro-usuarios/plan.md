# Plan de Implementación: Pantalla de Registro de Usuarios

**Branch**: `feature/002-registro-usuarios` | **Fecha**: 2026-06-08 | **Spec**: [spec.md](./spec.md)  
**Input**: Especificación de funcionalidad de `specs/002-registro-usuarios/spec.md`

---

## Resumen

Implementar la pantalla de registro de usuarios para KynWallet en la ruta `/register`. La pantalla sigue fielmente el diseño Figma "04 · Registro" (frame `31:2`): layout de dos paneles en desktop (panel de marca naranja a la izquierda, formulario a la derecha), solo formulario en mobile. El formulario incluye 4 campos, checkbox de términos y condiciones, botón "Crear cuenta", botones sociales placeholder y enlace al login. Los usuarios registrados se persisten en `localStorage` y pueden autenticarse en la pantalla de Login existente. El stack es Next.js 14 (App Router), TypeScript y Tailwind CSS — sin nuevas dependencias.

---

## Contexto Técnico

**Lenguaje/Versión**: TypeScript 5 / Next.js 14 (App Router)  
**Dependencias Primarias**: React 18, Next.js 14, Tailwind CSS 3.x  
**Almacenamiento**: In-memory (`MOCK_USERS`) + `localStorage` (`kynwallet_users`) para usuarios registrados  
**Testing**: Vitest 1.x + @testing-library/react 15 + @testing-library/jest-dom 6  
**Plataforma Objetivo**: Web responsive (mobile-first, breakpoint `lg` = 1024px)  
**Tipo de Proyecto**: Aplicación web (Next.js App Router, single-page-like)  
**Metas de Rendimiento**: Validación y feedback inline < 50ms; registro completo < 1s (sin backend)  
**Restricciones**: Sin librerías externas de UI; estricto `PascalCase`; usuarios seed inmutables  
**Alcance**: 1 nueva ruta, 2 componentes nuevos, 4 archivos extendidos, 3 archivos de test nuevos/extendidos

---

## Constitution Check

*GATE: Debe pasar antes de la Fase 0. Re-verificado post-diseño Fase 1.*

- [x] **TDD**: La estrategia de tests está definida — Vitest ya en `package.json`; tests se escriben antes de implementar cada módulo.
- [x] **SOLID**: Responsabilidad única por componente: `RegisterForm` (UI + estado local), `AuthService` (lógica de negocio), `Validation` (utilidades puras). Open/Closed: `AuthService` e `Input` se extienden sin modificar contratos existentes.
- [x] **Clean Architecture**: Capas claramente separadas — `app/` (routing/entrada), `components/` (UI), `lib/services/` (lógica), `lib/utils/` (utilidades), `lib/types/` (contratos). Las dependencias apuntan hacia adentro: UI → Services → Types/Utils.
- [x] **DRY & YAGNI**: `BrandPanel`, `Input`, `Button`, `SocialLogins` se reutilizan. No se crean abstracciones para uso único. Sin funcionalidad especulativa.
- [x] **Naming**: Todos los componentes y tipos en `PascalCase`. Funciones de utilidad en `camelCase`. Constantes en `SCREAMING_SNAKE_CASE`.
- [x] **Dependencies**: Sin librerías externas nuevas. Solo el stack base del proyecto ya instalado.
- [x] **Security**: Todas las entradas del usuario son validadas en el cliente antes de pasar al servicio. Contraseñas no expuestas en logs ni en query params. Sin riesgo de inyección (sin backend, sin SQL).

**Resultado del Gate**: ✅ PASA — No hay violaciones. Sin entradas en Complexity Tracking.

---

## Estructura del Proyecto

### Documentación (este feature)

```text
specs/002-registro-usuarios/
├── plan.md              ← este archivo
├── spec.md              ← especificación de entrada
├── research.md          ← Fase 0: decisiones resueltas
├── data-model.md        ← Fase 1: modelo de datos
├── quickstart.md        ← Fase 1: guía de uso
├── contracts/
│   └── register-service.md  ← Fase 1: contrato del servicio
├── checklists/
│   └── requirements.md  ← checklist de calidad del spec
└── tasks.md             ← Fase 2 (generado por /speckit.tasks, NO por /speckit.plan)
```

### Código Fuente (directorio raíz del repositorio)

```text
app/
├── page.tsx                      → MODIFICAR: agregar link "Regístrate" → /register + banner éxito
├── register/
│   └── page.tsx                  → NUEVO: página de registro (/register)
├── construction/
│   └── page.tsx                  → sin cambios
└── layout.tsx                    → sin cambios

components/
├── BrandPanel.tsx                 → MODIFICAR: agregar props headline? y subheadline? (backward compatible)
├── LoginForm.tsx                  → MODIFICAR: banner ?registered=true + link Regístrate
├── RegisterForm.tsx               → NUEVO: formulario de registro completo
├── SocialLogins.tsx               → sin cambios (reutilizado tal cual en RegisterForm)
└── ui/
    ├── Button.tsx                 → sin cambios
    └── Input.tsx                  → MODIFICAR: agregar prop showPasswordToggle? (backward compatible)

lib/
├── constants/
│   └── DesignTokens.ts            → sin cambios
├── services/
│   └── AuthService.ts             → MODIFICAR: agregar register(); leer/escribir localStorage; FullName en seed
├── types/
│   └── Auth.ts                    → MODIFICAR: User + FullName; RegisterCredentials; RegisterResult; RegisterErrorCode
└── utils/
    └── Validation.ts              → MODIFICAR: agregar validateFullName, validatePasswordMatch

Tests (nuevos/extendidos):
├── components/RegisterForm.test.tsx    → NUEVO
├── lib/utils/Validation.test.ts        → EXTENDER: nuevas funciones de validación
└── lib/services/AuthService.test.ts    → EXTENDER: register(), localStorage
```

**Decisión de estructura**: Aplicación web frontend-only (Next.js App Router, sin backend). Se sigue la convención ya establecida del proyecto: rutas en `app/`, componentes en `components/`, lógica en `lib/`.

---

## Diseño Visual — Figma "04 · Registro"

Extraído del frame `31:2` del archivo `T4WwrDTsb3o5rc3FxEw2gs` via Figma MCP.

### Panel de Marca (izquierda, desktop only)

| Elemento | Valor |
|----------|-------|
| Fondo | `linear-gradient(70.73deg, rgb(255,138,101) 31.7%, rgb(239,82,38) 83.5%)` |
| Título principal | **"Comienza tu camino financiero."** (Inter Bold, 44px, blanco) |
| Subtítulo | "Crea tu cuenta en minutos y empieza a enviar, recibir y administrar tu dinero desde cualquier lugar." (Inter Regular, 17px, `rgba(255,255,255,0.85)`) |
| Card Mockup | `bg-white/16`, borde `rgba(255,255,255,0.35)`, radius `22px`, 360×210px |
| Logo | "KynWallet" Inter Bold 26px blanco |

→ Implementado pasando `headline` y `subheadline` como props a `BrandPanel`.

### Panel de Formulario (derecha — desktop; full width — mobile)

| Elemento | Valor visual |
|----------|-------------|
| Título | "Crea tu cuenta" — Inter Bold 30px `#16182c` |
| Subtítulo | "Completa tus datos para comenzar" — Inter Regular 16px `#8a8ba8` |
| Labels de campos | Inter Medium 14px `#3d3f5c` |
| Inputs | Borde `#d7d9e6` 1.5px, radius `12px`, 52px alto, placeholder `#a9abc2` |
| Botón "Crear cuenta" | `#ff6b3d` bg, blanco SemiBold 16px, radius `12px`, 52px alto |
| Botones sociales | Borde `#d7d9e6` 1.5px, radius `12px`, SemiBold `#16182c` |
| Divisor | "o regístrate con" — Regular 13px `#8a8ba8` |
| Link T&C | "términos y condiciones" — SemiBold `#ef5226` |
| Link login | "Inicia sesión" — SemiBold `#ef5226` |

### Tokens de diseño usados

Todos los tokens son compatibles con `DesignTokens.ts` existente. Tres colores (`#3d3f5c`, `#a9abc2`, `#ef5226`) se usan como Tailwind arbitrary values inline, sin requerir nuevas entradas en `DesignTokens.ts`.

---

## Decisiones de Implementación

Ver [research.md](./research.md) para la justificación detallada de cada decisión. Resumen:

| ID | Decisión |
|----|----------|
| D-001 | Ruta: `/register` → `app/register/page.tsx` |
| D-002 | `BrandPanel` acepta props opcionales `headline?` y `subheadline?` |
| D-003 | `Input` acepta prop `showPasswordToggle?: boolean` (toggle ojo SVG nativo) |
| D-004 | Éxito de registro → `router.push('/login?registered=true')` → banner en LoginForm |
| D-005 | `AuthService.register()` retorna `RegisterResult` tipado (sin excepciones) |
| D-006 | Usuarios registrados persisten en `localStorage['kynwallet_users']` |
| D-007 | `validateFullName` y `validatePasswordMatch` agregados a `Validation.ts` |
| D-008 | `User` extendido con `FullName`; nuevos tipos `RegisterCredentials`, `RegisterResult` |
| D-009 | Tokens de diseño del frame "04 · Registro" compatibles con sistema existente |

---

## Plan de Implementación por Módulo

### Módulo 1 — Tipos y Validaciones (lib/)

**Archivos afectados**: `lib/types/Auth.ts`, `lib/utils/Validation.ts`

**Contratos nuevos** (ver [data-model.md](./data-model.md) y [contracts/register-service.md](./contracts/register-service.md)):

```typescript
// Auth.ts — agregar:
interface User { FullName: string; Email: string; Password: string; }
interface RegisterCredentials { FullName: string; Email: string; Password: string; ConfirmPassword: string; }
type RegisterErrorCode = 'EMAIL_TAKEN' | 'UNKNOWN';
interface RegisterResult { success: boolean; error?: RegisterErrorCode; }

// Validation.ts — agregar:
validateFullName(name: string): boolean   // name.trim().split(/\s+/).length >= 2
validatePasswordMatch(p: string, c: string): boolean  // p === c
```

**Orden TDD**: Tests primero en `Validation.test.ts`, luego implementación.

---

### Módulo 2 — AuthService (lib/services/)

**Archivo afectado**: `lib/services/AuthService.ts`

Cambios:
1. Extender `User` seed con `FullName: 'Steven Luna'` (seed existente).
2. Agregar `IAuthService.register(credentials: RegisterCredentials): Promise<RegisterResult>`.
3. Al inicializar el servicio, cargar `localStorage['kynwallet_users']` y fusionar con `MOCK_USERS`.
4. `register()`: verifica unicidad → persiste en localStorage → retorna `RegisterResult`.
5. `login()`: busca en `MOCK_USERS` + usuarios dinámicos cargados.

**Orden TDD**: Tests primero en `AuthService.test.ts` (register exitoso, email duplicado, login post-registro), luego implementación.

---

### Módulo 3 — Componentes UI extendidos (components/ui/)

**Archivo afectado**: `components/ui/Input.tsx`

Agregar prop `showPasswordToggle?: boolean`. Cuando está activa:
- El componente mantiene estado local `showPassword: boolean`.
- El `type` del input alterna entre `"password"` y `"text"`.
- Se renderiza un botón icon (SVG ojo, 20px) alineado a la derecha dentro del input.
- La prop es `false` por defecto — backward compatible con todos los usos existentes.

---

### Módulo 4 — BrandPanel extendido (components/)

**Archivo afectado**: `components/BrandPanel.tsx`

Agregar props opcionales:
```typescript
interface BrandPanelProps {
  headline?: string;      // default: "Tu dinero,\nsin fronteras."
  subheadline?: string;   // default: "Envía, recibe y paga en segundos..."
}
```

El panel de Login sigue funcionando sin cambios (props opcionales con default).

---

### Módulo 5 — RegisterForm (components/)

**Archivo nuevo**: `components/RegisterForm.tsx`

Componente `'use client'` con:
- Estado local para todos los campos del `RegisterFormState` (ver data-model.md).
- Validación al submit (no en tiempo real, para seguir el patrón del LoginForm).
- Llamada a `AuthService.register()` con manejo de `RegisterResult`.
- `router.push('/login?registered=true')` en éxito.
- Uso de `Input`, `Button`, `SocialLogins` existentes.
- Checkbox de T&C implementado inline con estilos Tailwind.
- Link "¿Ya tienes cuenta? Inicia sesión" → `href="/login"` con `next/link`.

**Texto exacto del diseño Figma** (FR-017):

| Elemento | Texto |
|----------|-------|
| Título | Crea tu cuenta |
| Subtítulo | Completa tus datos para comenzar |
| Label nombre | Nombre completo |
| Placeholder nombre | Ej: Diego Martínez |
| Label correo | Correo electrónico |
| Placeholder correo | tucorreo@ejemplo.com |
| Label contraseña | Contraseña |
| Placeholder contraseña | •••••••• |
| Label confirmar | Confirmar contraseña |
| Placeholder confirmar | •••••••• |
| Checkbox texto | Acepto los |
| Checkbox link | términos y condiciones |
| Botón principal | Crear cuenta |
| Divisor | o regístrate con |
| Botón Google | Google |
| Botón Apple | Apple |
| Link inferior | ¿Ya tienes cuenta? **Inicia sesión** |

---

### Módulo 6 — Página de Registro (app/register/)

**Archivo nuevo**: `app/register/page.tsx`

Page component (Server Component) que compone:
```tsx
<main className="min-h-screen flex">
  <BrandPanel
    headline={"Comienza tu\ncamino financiero."}
    subheadline="Crea tu cuenta en minutos y empieza a enviar, recibir y administrar tu dinero desde cualquier lugar."
  />
  <div className="w-full lg:w-1/2 flex flex-col justify-center items-center p-8 bg-white">
    <RegisterForm />
  </div>
</main>
```

---

### Módulo 7 — LoginForm extendido (components/)

**Archivo afectado**: `components/LoginForm.tsx`

Dos cambios:

1. **Banner de registro exitoso**: Detectar `?registered=true` con `useSearchParams()` y mostrar un banner verde en la parte superior del formulario con el mensaje: "¡Cuenta creada exitosamente! Ya puedes iniciar sesión."

2. **Link de registro**: Agregar al final del formulario el texto "¿No tienes cuenta? [Regístrate]" con `next/link` apuntando a `/register`. El texto "Regístrate" en color `brand-primary`.

---

## Estrategia de Testing

| Archivo de Test | Tipo | Casos clave |
|-----------------|------|-------------|
| `lib/utils/Validation.test.ts` | Unit | `validateFullName`: nombre vacío, 1 palabra, 2+ palabras; `validatePasswordMatch`: iguales, distintos |
| `lib/services/AuthService.test.ts` | Unit | `register()`: éxito, email duplicado (seed), email duplicado (localStorage), `login()` post-registro |
| `components/RegisterForm.test.tsx` | Component | Render inicial, errores inline por campo, submit con todos los campos válidos, redirect a `/login?registered=true`, alert "Próximamente" en Google/Apple, link a `/login` |

**Orden obligatorio (TDD)**: Escribir el test → ver que falla (Red) → implementar → ver que pasa (Green) → refactorizar (Refactor).

---

## Constitution Check Post-Diseño (Fase 1)

Re-verificación tras completar el diseño técnico:

- [x] **TDD**: Estrategia de testing definida — 3 archivos de test con casos concretos antes de implementar.
- [x] **SOLID**: Diseño mantiene SRP y OCP. `AuthService` extendido sin romper contratos existentes. `Input` y `BrandPanel` extendidos con backward compatibility.
- [x] **Clean Architecture**: Separación mantenida. `RegisterForm` no importa `localStorage` directamente — delega en `AuthService`.
- [x] **DRY & YAGNI**: `SocialLogins`, `Button`, `Input` reutilizados sin modificación. `BrandPanel` extendido en lugar de duplicado.
- [x] **Naming**: `RegisterForm`, `RegisterCredentials`, `RegisterResult`, `RegisterErrorCode` — todos PascalCase.
- [x] **Dependencies**: Cero dependencias nuevas. Vitest, @testing-library/react, jsdom ya en `package.json`.
- [x] **Security**: Validación exhaustiva en cliente antes de `AuthService.register()`. Contraseñas no enviadas a URL. No hay XSS risk (JSX escapa por defecto). `localStorage` guarda en texto plano (consistente con el modelo in-memory ya existente).

**Resultado**: ✅ PASA — El diseño es consistente con la constitución del proyecto.

