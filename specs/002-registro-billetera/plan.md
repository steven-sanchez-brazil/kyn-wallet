# Implementation Plan: Registro de Billetera Virtual

**Branch**: `002-registro-billetera` | **Date**: 2026-06-08 | **Spec**: [spec.md](spec.md)
**Input**: Feature specification from `specs/002-registro-billetera/spec.md`

## Summary

Pantalla de registro para la billetera virtual KynWallet con formulario de nombre completo, correo, contraseña y confirmación. Incluye validaciones inline (on blur), checkbox de T&C, botones sociales (Google/Apple con alert "Próximamente"), link a login y redirección con query parameter tras registro exitoso. Layout responsive: 2 paneles en desktop, solo formulario en mobile. Registro simulado sin backend.

## Technical Context

**Language/Version**: TypeScript 5.x con React 18 y Next.js 14.2.3  
**Primary Dependencies**: React, Next.js, Tailwind CSS (ya incluidos en el proyecto)  
**Storage**: N/A (registro simulado, sin persistencia)  
**Testing**: Vitest + @testing-library/react + jsdom  
**Target Platform**: Web (navegadores modernos, responsive 320px–1920px)  
**Project Type**: Web application (Next.js App Router)  
**Performance Goals**: Validaciones inline < 1s, redirección inmediata tras registro  
**Constraints**: Sin librerías externas adicionales, PascalCase, validación rigurosa de inputs  
**Scale/Scope**: 1 pantalla (/register), ~4 componentes nuevos, reutilización de BrandPanel y SocialLogins

## Constitution Check

*GATE: Must pass before Phase 0 research. Re-check after Phase 1 design.*

- [x] **TDD**: Tests definidos antes de implementación (Vitest + Testing Library, tests por componente y servicio)
- [x] **SOLID**: Separación de responsabilidades — Validation (lib/utils), RegisterService (lib/services), RegisterForm (components), Page (app/)
- [x] **Clean Architecture**: Capas separadas — Dominio (types), Servicios (lib/services), UI (components), Routing (app/)
- [x] **DRY & YAGNI**: Reutilización de BrandPanel, SocialLogins, Input, Button, Validation existentes. Sin sobre-ingeniería.
- [x] **Naming**: PascalCase para componentes (RegisterForm, RegisterPage), archivos y tipos
- [x] **Dependencies**: Solo dependencias ya incluidas en el proyecto (React, Next.js, Tailwind). Sin librerías externas nuevas.
- [x] **Security**: Validación rigurosa de inputs (email, password, campos obligatorios). Contraseñas no expuestas en logs.

## Project Structure

### Documentation (this feature)

```text
specs/002-registro-billetera/
├── plan.md              # This file
├── research.md          # Phase 0 output
├── data-model.md        # Phase 1 output
├── quickstart.md        # Phase 1 output
├── contracts/           # Phase 1 output
└── tasks.md             # Phase 2 output (/speckit.tasks)
```

### Source Code (repository root)

```text
app/
├── register/
│   └── page.tsx              # Página de registro (RegisterPage)
├── login/
│   └── page.tsx              # (existente, modificar para leer query param)
└── layout.tsx                # (existente)

components/
├── RegisterForm.tsx           # Formulario de registro
├── RegisterForm.test.tsx      # Tests del formulario
├── BrandPanel.tsx             # (existente, reutilizado)
├── SocialLogins.tsx           # (existente, reutilizado)
└── ui/
    ├── Button.tsx             # (existente)
    ├── Input.tsx              # (existente)
    └── Checkbox.tsx           # Nuevo componente de checkbox

lib/
├── services/
│   ├── RegisterService.ts     # Servicio de registro simulado
│   └── RegisterService.test.ts
├── types/
│   └── Auth.ts               # (existente, extender con RegisterData)
└── utils/
    ├── Validation.ts          # (existente, extender con validateFullName, validatePasswordMatch)
    └── Validation.test.ts     # (existente, extender)
```

**Structure Decision**: Sigue la estructura existente del proyecto (`app/`, `components/`, `lib/`) con Next.js App Router. Se reutilizan componentes existentes (BrandPanel, SocialLogins, Input, Button) y se extienden servicios/validaciones ya creados para login.

## Complexity Tracking

> No hay violaciones de constitución. Diseño simple que extiende la arquitectura existente.
