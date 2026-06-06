# Implementation Plan: Registro de Usuarios — KynWallet

**Branch**: `feature/registro-andres-jimenez` | **Date**: 2026-06-05 | **Spec**: [spec.md](./spec.md)  
**Input**: Feature specification from `specs/002-registro-usuarios/spec.md`

---

## Summary

Construir la página de registro (`/registro`) de KynWallet usando Next.js 14 App Router, React 18, TypeScript y Tailwind CSS. La página reutiliza el panel de marca existente (`BrandPanel`) y los primitivos de UI (`Button`, `Input`), extiende `AuthService` con un método `register()` y `Validation` con validadores de nombre completo y confirmación de contraseña, e introduce `RegisterForm` como componente principal del formulario. Todo el desarrollo sigue estrictamente TDD (Rojo-Verde-Refactorización), sin librerías externas.

---

## Technical Context

**Language/Version**: TypeScript 5 + React 18 + Next.js 14 (App Router)  
**Primary Dependencies**: Tailwind CSS 3.4 (estilos nativos), Vitest 1.6 + Testing Library 15 (pruebas) — **sin librerías externas adicionales**  
**Storage**: En memoria (mock en `AuthService`); sin persistencia de base de datos en esta iteración  
**Testing**: Vitest + `@testing-library/react` + `@testing-library/jest-dom` (ya configurado en `vitest.config.ts`)  
**Target Platform**: Web — navegadores modernos (desktop ≥ 1024 px y móvil ≥ 320 px)  
**Project Type**: Web application (Next.js con App Router)  
**Performance Goals**: Renderizado inicial < 1 s; redireccionamiento tras registro < 500 ms  
**Constraints**: Sin librerías externas; PascalCase obligatorio; validaciones en frontend con mock de backend  
**Scale/Scope**: Feature de una pantalla; ~6 ficheros nuevos/extendidos + ~5 ficheros de test

---

## Constitution Check

*GATE: Must pass before Phase 0 research. Re-check after Phase 1 design.*

- [x] **TDD**: Estrategia de test definida antes de la implementación — tests escritos primero con Vitest + Testing Library
- [x] **SOLID**: Cada componente/servicio tiene responsabilidad única; `RegisterForm` no accede a `AuthService` directamente (recibe callback via props)
- [x] **Clean Architecture**: `app/registro/page.tsx` → `components/RegisterForm.tsx` → `lib/services/AuthService` → `lib/types/Auth`; dependencias apuntan hacia adentro
- [x] **DRY & YAGNI**: `BrandPanel`, `Button`, `Input`, `SocialLogins` y `Validation` se reutilizan; no se agrega funcionalidad no requerida
- [x] **Naming**: `RegisterForm`, `RegisterPage`, `RegisterCredentials`, `RegisterResult` — todos PascalCase
- [x] **Dependencies**: Cero librerías externas nuevas; todo con React/Next.js/TypeScript nativos
- [x] **Security**: Todos los inputs validados inline antes del envío; contraseñas nunca expuestas en logs

---

## Project Structure

### Documentation (this feature)

```text
specs/002-registro-usuarios/
├── plan.md              ← este archivo
├── research.md          ← Phase 0: decisiones y hallazgos
├── data-model.md        ← Phase 1: entidades y estado
├── contracts/
│   └── ui-components.md ← contratos de componentes UI
└── tasks.md             ← Phase 2 (/speckit.tasks — aún no creado)
```

### Source Code (repository root)

```text
app/
├── globals.css
├── layout.tsx
├── page.tsx
├── construction/
│   └── page.tsx
└── registro/
    └── page.tsx              ← NUEVO: página de registro (App Router)

components/
├── BrandPanel.tsx             ← REUTILIZADO sin cambios
├── LoginForm.tsx              ← sin cambios
├── LoginForm.test.tsx         ← sin cambios
├── RegisterForm.tsx           ← NUEVO: formulario de registro
├── RegisterForm.test.tsx      ← NUEVO: tests TDD del formulario
├── SocialLogins.tsx           ← REUTILIZADO sin cambios
└── ui/
    ├── Button.tsx             ← REUTILIZADO sin cambios
    └── Input.tsx              ← REUTILIZADO sin cambios

lib/
├── constants/
│   └── DesignTokens.ts        ← sin cambios
├── services/
│   ├── AuthService.ts         ← EXTENDIDO: +register(), +IRegisterService
│   └── AuthService.test.ts    ← EXTENDIDO: tests para register()
├── types/
│   └── Auth.ts                ← EXTENDIDO: +RegisterCredentials, +RegisterResult
└── utils/
    ├── Validation.ts          ← EXTENDIDO: +validateFullName, +validatePasswordMatch
    └── Validation.test.ts     ← EXTENDIDO: tests para nuevos validadores
```

**Structure Decision**: Estructura web app existente (`app/`, `components/`, `lib/`). La página de registro replica el mismo patrón arquitectónico que la página de login, manteniendo consistencia total.

---

## Complexity Tracking

> No hay violaciones de la Constitución que justificar.
