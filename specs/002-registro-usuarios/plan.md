# Implementation Plan: Registro de Usuarios

**Branch**: `feature/registro-jp-fsabate` | **Date**: 2026-06-09 | **Spec**: [spec.md](./spec.md)

**Input**: Feature specification from `/specs/002-registro-usuarios/spec.md`

## Summary

Implementar la pantalla de **Registro de Usuarios** de KynWallet con fidelidad al frame Figma "04 · Registro". La pantalla principal (`/`) mostrará el formulario de registro (nombre completo, correo, contraseña, confirmar contraseña, checkbox de términos) con validaciones inline; el login existente se moverá a `/login`. Un registro exitoso redirige a `/login` mostrando un mensaje de éxito visible. Los accesos Google/Apple muestran el aviso "Próximamente".

El enfoque técnico reutiliza los patrones existentes del login (`LoginForm`, `Input`, `Button`, `AuthService`, `Validation`) siguiendo Clean Architecture y TDD: se extienden las utilidades de validación y los tipos, se agrega un método de registro simulado al servicio de autenticación, y se crea el componente `RegisterForm` con su panel de marca reutilizado. No se introducen librerías externas.

## Technical Context

**Language/Version**: TypeScript 5.x sobre Next.js 14 (App Router), React 18

**Primary Dependencies**: Next.js 14, React 18, Tailwind CSS (ya presentes). Sin nuevas dependencias externas (constitución).

**Storage**: Simulación en memoria (mock) dentro de `AuthService`, igual que el login actual. Sin backend ni persistencia real.

**Testing**: Vitest + React Testing Library (`@testing-library/react`), entorno jsdom. Patrón existente en `*.test.tsx` / `*.test.ts`.

**Target Platform**: Navegador web (desktop y mobile responsive).

**Project Type**: Aplicación web (Next.js App Router, single project).

**Performance Goals**: Procesamiento de registro simulado < 2s (alineado con el delay mock de 500ms del login). Validación inline instantánea (sin lag perceptible).

**Constraints**: Sin librerías externas; nombres en `PascalCase` para estructuras relevantes; validación rigurosa de entradas; los tests actuales de login deben permanecer verdes.

**Scale/Scope**: 1 pantalla nueva (Registro), 1 reubicación de ruta (login → `/login`), ~5-7 archivos nuevos + extensiones a 3 archivos existentes.

## Constitution Check

*GATE: Must pass before Phase 0 research. Re-check after Phase 1 design.*

| Principio / Restricción | Cumplimiento en este plan |
|---|---|
| **I. TDD (Rojo-Verde-Refactor)** | ✅ Cada unidad (validaciones, servicio de registro, `RegisterForm`, rutas) se especifica con pruebas escritas antes de la implementación. Las tareas se ordenarán test-first. |
| **II. SOLID** | ✅ Responsabilidad única: validación en `lib/utils`, lógica de registro en `lib/services`, UI en `components`. Inversión de dependencias mediante interfaz `IAuthService`. |
| **III. Clean Architecture** | ✅ Capas separadas: Dominio/tipos (`lib/types`), Casos de uso/servicios (`lib/services`), Utilidades (`lib/utils`), UI/Adaptadores (`components`, `app`). Dependencias apuntan hacia adentro. |
| **IV. DRY / YAGNI** | ✅ Reutiliza `Input`, `Button`, `BrandPanel`, `validateEmail`, `validatePassword`, `AuthService`. Solo se agrega lo necesario para la feature. |
| **Nombres `PascalCase`** | ✅ `RegisterForm`, `RegisterCredentials`, `RegisterResult`, componentes y tipos en `PascalCase`. Las funciones utilitarias mantienen el patrón camelCase ya establecido (`validateEmail`). |
| **Sin librerías externas** | ✅ Solo capacidades nativas + stack ya presente. |
| **Validación de entradas** | ✅ Todas las entradas validadas antes de procesar (FR-005 a FR-011, FR-023). |
| **Autenticación / rutas** | ✅ El registro es ruta pública; `/login` mantiene el login existente. No se rompe la protección actual. |

**Resultado del gate**: PASS. Sin violaciones que justificar.

## Project Structure

### Documentation (this feature)

```text
specs/002-registro-usuarios/
├── plan.md              # Este archivo (/speckit.plan)
├── research.md          # Fase 0 (/speckit.plan)
├── data-model.md        # Fase 1 (/speckit.plan)
├── quickstart.md        # Fase 1 (/speckit.plan)
├── contracts/           # Fase 1 (/speckit.plan)
│   ├── auth-service.md      # (existente, login) — referencia
│   └── register-service.md  # Nuevo contrato del registro
├── checklists/
│   └── requirements.md  # Checklist de calidad de la spec
└── tasks.md             # Fase 2 (/speckit.tasks - NO creado por /speckit.plan)
```

### Source Code (repository root)

```text
app/
├── page.tsx                 # MODIFICAR: renderizará la página de Registro (Registro en /)
├── login/
│   └── page.tsx             # NUEVO: login existente reubicado en /login
├── register.test.tsx        # NUEVO: test de integración de la página de registro
├── login.test.tsx           # EXISTENTE: permanece verde (importa LoginForm directamente)
├── layout.tsx               # Sin cambios
└── construction/page.tsx    # Sin cambios

components/
├── RegisterForm.tsx         # NUEVO: formulario de registro (patrón de LoginForm)
├── RegisterForm.test.tsx    # NUEVO: tests unitarios/UI del formulario
├── LoginForm.tsx            # Sin cambios funcionales
├── BrandPanel.tsx           # REUTILIZAR (prop opcional para textos del frame Registro)
├── SocialLogins.tsx         # REUTILIZAR para Google/Apple "Próximamente"
└── ui/
    ├── Input.tsx            # REUTILIZAR
    └── Button.tsx           # REUTILIZAR

lib/
├── types/
│   └── Auth.ts              # EXTENDER: RegisterCredentials, RegisterResult
├── services/
│   ├── AuthService.ts       # EXTENDER: método register() simulado + verificación de duplicados
│   └── AuthService.test.ts  # EXTENDER: tests del registro
└── utils/
    ├── Validation.ts        # EXTENDER: validateRequired, validatePasswordsMatch, validateFullName
    └── Validation.test.ts   # EXTENDER: tests de las nuevas validaciones
```

**Structure Decision**: Se mantiene la estructura single-project de Next.js App Router ya existente. El registro se ubica como página principal (`/`) reutilizando el layout dividido (BrandPanel + Form). El login se traslada a `app/login/page.tsx` sin modificar el componente `LoginForm`, garantizando que sus pruebas (que lo importan directamente) sigan verdes. La lógica de validación y de registro vive en `lib/` (capas de utilidades y servicios) respetando Clean Architecture.

## Mecanismo del mensaje de éxito (registro → /login)

El registro exitoso debe mostrar un mensaje visible en `/login`. Para evitar dependencias externas y respetar el patrón actual basado en `next/navigation`:

- **Decisión**: Navegar con un parámetro de consulta de éxito (`/login?registered=true`) y que la página de login lea ese parámetro para renderizar un banner de éxito.
- **Rationale**: Es nativo de Next.js (`useSearchParams`), no requiere estado global ni librerías, y es fácilmente testeable.
- **Alternativa rechazada**: estado global/contexto o `localStorage` — añade complejidad innecesaria (YAGNI) para un mensaje efímero.

## Complexity Tracking

> No aplica. El Constitution Check pasó sin violaciones; no se introducen abstracciones ni dependencias adicionales.
