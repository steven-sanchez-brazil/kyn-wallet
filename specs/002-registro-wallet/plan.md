# Implementation Plan: Pantalla de Registro de la Billetera Virtual

**Branch**: `002-registro-wallet` | **Date**: 2026-06-06 | **Spec**: [spec.md](spec.md)
**Input**: Feature specification from `specs/002-registro-wallet/spec.md`

## Summary

Implementar la pantalla de Registro de KynWallet con diseño de pantalla dividida (Brand Panel + Form Panel), coherente con el Login ya existente (feature 001). El usuario completa Nombre completo, Correo, Contraseña y Confirmar contraseña, acepta los términos (obligatorio) y, tras un registro válido (con verificación de correo duplicado contra un store en memoria), es redirigido a la pantalla de "Página en construcción".

Enfoque técnico: Next.js 14 (App Router) + TypeScript + Tailwind CSS, **reutilizando** los componentes y la lógica ya construidos para el Login (BrandPanel, `ui/Input`, `ui/Button`, `SocialLogins`, utilidades de validación, página `/construction`, tokens de diseño), sin añadir librerías externas. La referencia visual es prioritariamente el MCP de Figma (frame `31:2`) y, como respaldo (usado en esta sesión por límite de cuota del MCP), la imagen del diseño adjuntada por el usuario.

## Technical Context

**Language/Version**: TypeScript 5 / Next.js 14.2.3 (App Router)
**Primary Dependencies**: React 18, Next.js 14, Tailwind CSS 3.4 (base del proyecto; sin librerías de UI externas)
**Storage**: En memoria — `UserStore` compartido (fuente única de verdad para usuarios simulados)
**Testing**: Vitest 1.6 + @testing-library/react + jsdom (ya configurado en `vitest.config.ts`)
**Target Platform**: Web (responsive; layout dividido en `lg+`, formulario a pantalla completa en móvil)
**Project Type**: web-application (Next.js App Router)
**Performance Goals**: Registro completo < 2 min; validación/redirección percibida < 2 s (delay simulado ~500 ms como en `AuthService`)
**Constraints**: Sin librerías de UI externas; `PascalCase` para componentes y estructuras; contraseña enmascarada por defecto con toggle mostrar/ocultar; reutilización máxima del código del Login (DRY)
**Scale/Scope**: Una pantalla (Registro) + reutilización de la pantalla `/construction`. ~1 página nueva, ~2 componentes nuevos, 1 servicio nuevo, 1 refactor menor (store compartido) y extensiones de validación/tipos.

## Constitution Check

*GATE: Must pass before Phase 0 research. Re-check after Phase 1 design.*

- [x] **TDD**: Estrategia de pruebas definida antes de implementar (Vitest). Se escriben tests de validación, del `RegistrationService` y del `RegisterForm`/ruta antes del código.
- [x] **SOLID**: Composición sobre herencia; `BrandPanel` parametrizado (Open/Closed); `RegistrationService` depende de la abstracción `IUserStore`; responsabilidades separadas (UI vs validación vs persistencia simulada).
- [x] **Clean Architecture**: `app/` enrutamiento, `components/` UI, `lib/` lógica (services/types/utils/constants). Dependencias apuntan hacia adentro (UI → servicios → store/tipos).
- [x] **DRY & YAGNI**: Reutiliza `BrandPanel`, `ui/Input`, `ui/Button`, `SocialLogins`, utilidades de validación y la página `/construction`. No se agrega nada fuera de los requisitos del registro.
- [x] **Naming**: `PascalCase` para componentes (`RegisterForm`, `PasswordInput`) y estructuras (`RegistrationData`, `UserStore`, `RegistrationResult`).
- [x] **Dependencies**: Solo Next.js/React/Tailwind como base (misma justificación que el Login, ver Complexity Tracking). Sin librerías de UI/validación de terceros.
- [x] **Security**: Todas las entradas validadas (formato de correo, longitud de contraseña, coincidencia, términos aceptados, correo no duplicado). Contraseña enmascarada por defecto. Limitación de prototipo documentada en Complexity Tracking (credenciales solo en memoria, nunca persistidas ni transmitidas).

## Project Structure

### Documentation (this feature)

```text
specs/002-registro-wallet/
├── plan.md              # Este archivo
├── research.md          # Salida Fase 0
├── data-model.md        # Salida Fase 1
├── quickstart.md        # Salida Fase 1
├── checklists/
│   └── requirements.md  # Checklist de calidad del spec
├── contracts/
│   └── registration-service.md  # Contrato del servicio de registro (UI ↔ lógica)
└── spec.md              # Spec de entrada
```

### Source Code (repository root)

```text
app/
├── layout.tsx                  # (existente) layout raíz
├── page.tsx                    # (existente) Login en "/"
├── register/
│   └── page.tsx                # NUEVO — pantalla de Registro en "/register"
└── construction/
    └── page.tsx                # (existente) destino tras registro; copy a genericizar

components/
├── BrandPanel.tsx              # MODIFICADO — parametrizado (title/subtitle opcionales, default = Login)
├── RegisterForm.tsx            # NUEVO — formulario de registro (client component)
├── SocialLogins.tsx            # (existente) reutilizado bajo divisor "o regístrate con"
└── ui/
    ├── Input.tsx               # (existente) reutilizado
    ├── Button.tsx              # (existente) reutilizado
    └── PasswordInput.tsx       # NUEVO — Input con toggle mostrar/ocultar

lib/
├── types/
│   └── Auth.ts                 # MODIFICADO — añade RegistrationData, RegistrationResult; User con FullName opcional
├── utils/
│   └── Validation.ts           # MODIFICADO — añade validateRequired, validatePasswordsMatch
├── services/
│   ├── UserStore.ts            # NUEVO — store en memoria compartido (fuente única)
│   ├── AuthService.ts          # MODIFICADO — usa UserStore en lugar de su array local
│   └── RegistrationService.ts  # NUEVO — register(data): verifica duplicado y añade usuario
└── constants/
    └── DesignTokens.ts         # (existente) reutilizado
```

**Structure Decision**: Se mantiene la estructura Next.js App Router ya establecida por el Login (`app/`, `components/`, `lib/`), exactamente la solicitada por el usuario. La nueva ruta `/register` aloja la pantalla; la lógica se concentra en `lib/services/` y `lib/utils/`. Se introduce un `UserStore` compartido como fuente única de usuarios para que tanto el alta (registro) como el acceso (login) operen sobre el mismo estado simulado, habilitando la verificación de correo duplicado sin duplicar datos.

## Complexity Tracking

| Violation | Why Needed | Simpler Alternative Rejected Because |
|-----------|------------|-------------------------------------|
| Uso de Next.js / React / Tailwind (librerías externas) | Directiva explícita del usuario; es la base del proyecto ya inicializado y del Login (feature 001). | Construir un framework SSR y un motor de CSS propios está fuera de alcance y contradice la directiva del usuario. |
| Credenciales en texto plano en `UserStore` (memoria) | Prototipo de UI sin backend; coherente con el `AuthService` existente. Permite validar duplicados y un login posterior simulado. | Hashing real requeriría una librería criptográfica externa o reimplementar primitivas seguras (riesgoso). Se documenta como limitación de prototipo: datos solo en memoria, nunca persistidos ni transmitidos. |

## Phase 0 — Research

Ver [research.md](research.md). Sin marcadores NEEDS CLARIFICATION pendientes (el runner de pruebas quedó resuelto como Vitest según `vitest.config.ts`).

## Phase 1 — Design & Contracts

- Modelo de datos: [data-model.md](data-model.md)
- Contrato del servicio: [contracts/registration-service.md](contracts/registration-service.md)
- Guía de validación ejecutable: [quickstart.md](quickstart.md)

## Post-Design Constitution Re-check

Tras el diseño de Fase 1, todas las casillas de la Constitution Check siguen satisfechas: el diseño reutiliza componentes (DRY), separa capas (Clean Architecture), depende de abstracciones (`IUserStore`), define pruebas primero (TDD) y valida todas las entradas (Security). No hay nuevas violaciones más allá de las ya justificadas en Complexity Tracking.
