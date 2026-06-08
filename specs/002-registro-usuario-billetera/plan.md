# Implementation Plan: Registro de Usuario Kyn-Wallet

**Branch**: `002-login-billetera` | **Date**: 2026-06-08 | **Spec**: [specs/002-registro-usuario-billetera/spec.md](specs/002-registro-usuario-billetera/spec.md)
**Input**: Feature specification from `/specs/002-registro-usuario-billetera/spec.md`

## Summary

Se implementara una nueva pantalla de registro alineada al frame de Figma provisto, con validaciones inline y flujo de redireccion a Login tras alta exitosa. La estrategia tecnica reutiliza el stack existente (Next.js App Router + React + Tailwind + TypeScript), mantiene componentes reutilizables en `components/` y extiende la capa de servicios en `lib/` para compartir una unica fuente de usuarios entre Registro y Login. Se adicionara navegacion cruzada entre pantallas y pruebas unitarias/integracion siguiendo TDD.

## Technical Context

**Language/Version**: TypeScript 5 + React 18 sobre Next.js 14.2.3  
**Primary Dependencies**: Next.js, React, Tailwind CSS, Vitest, Testing Library (todas ya presentes en el repositorio)  
**Storage**: Fuente de usuarios compartida en capa de servicio (`lib/services`); inicialmente en memoria, con alternativa JSON compartido si se requiere persistencia entre modulos en runtime de app  
**Testing**: Vitest + @testing-library/react  
**Target Platform**: Web (desktop y mobile) en App Router de Next.js  
**Project Type**: Aplicacion web frontend con capa de servicios local  
**Performance Goals**: Validacion y feedback de formulario en tiempo real sin bloqueos perceptibles; submit con respuesta < 1s en flujo local simulado  
**Constraints**: Sin librerias externas nuevas, estructura obligatoria `app/`, `components/`, `lib/`, cumplimiento de `PascalCase` en estructuras relevantes, validacion estricta de entradas  
**Scale/Scope**: 1 nueva pantalla principal de registro, 1 ajuste en Login, extension de servicios y tests asociados

## Constitution Check

*GATE: Must pass before Phase 0 research. Re-check after Phase 1 design.*

- [x] **TDD**: Is the test strategy defined before implementation?
- [x] **SOLID**: Does the design enforce SOLID principles?
- [x] **Clean Architecture**: Are layers strictly separated with inward dependencies?
- [x] **DRY & YAGNI**: Is the design free of unnecessary complexity and duplicated code?
- [x] **Naming**: Does the plan respect `PascalCase` for structures?
- [x] **Dependencies**: Is the solution completely free of external libraries?
- [x] **Security**: Are all inputs validated and protected routes authenticated?

## Project Structure

### Documentation (this feature)

```text
specs/002-registro-usuario-billetera/
├── plan.md
├── research.md
├── data-model.md
├── quickstart.md
├── contracts/
│   └── registration-auth.md
└── tasks.md
```

### Source Code (repository root)

```text
app/
├── page.tsx
├── login.test.tsx
├── register/
│   ├── page.tsx
│   └── register.test.tsx
└── construction/
    └── page.tsx

components/
├── LoginForm.tsx
├── RegisterForm.tsx
├── SocialLogins.tsx
└── ui/
    ├── Button.tsx
    └── Input.tsx

lib/
├── constants/
├── services/
│   ├── AuthService.ts
│   ├── AuthService.test.ts
│   └── UserStore.ts
├── types/
│   └── Auth.ts
└── utils/
    ├── Validation.ts
    └── Validation.test.ts
```

**Structure Decision**: Se mantiene la estructura existente del repositorio (Next.js App Router) y se extiende sin introducir nuevos directorios raiz. La pagina de registro se incorpora en `app/register/`, la UI en `components/`, y la logica compartida de autenticacion/usuarios en `lib/` para preservar separacion por capas.

## Post-Design Constitution Check

- [x] **TDD**: Se definio quickstart orientado a escribir pruebas antes de implementar.
- [x] **SOLID**: El modelo separa responsabilidades entre UI, validacion y servicios de autenticacion.
- [x] **Clean Architecture**: `app/` y `components/` consumen casos de uso expuestos por `lib/` sin invertir dependencias.
- [x] **DRY & YAGNI**: Se reutilizan validaciones/servicios existentes y no se agregan capas innecesarias.
- [x] **Naming**: Entidades y estructuras relevantes se mantienen en `PascalCase`.
- [x] **Dependencies**: No se incorporan nuevas librerias.
- [x] **Security**: La validacion completa de entradas se exige antes de cualquier alta/autenticacion.

## Implementation Notes

- Registro y Login comparten la misma fuente de usuarios en `lib/services/UserStore.ts`.
- La ruta de registro implementada es `/register` con redireccion exitosa a `/login?registered=1`.
- Login mantiene su flujo original a `/construction` tras autenticacion exitosa.
- El estado de feedback post-registro se muestra en Login cuando el query param `registered=1` esta presente.

## Complexity Tracking

No se identifican violaciones de constitucion que requieran excepcion.
