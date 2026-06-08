# Implementation Plan: Registro de Usuario

**Branch**: `002-registro-usuario` | **Date**: 2026-06-06 | **Spec**: [specs/002-registro-usuario/spec.md](spec.md)
**Input**: Feature specification from `/specs/002-registro-usuario/spec.md`

## Summary

Implementar la pantalla de registro de usuario para KynWallet en la ruta `/register`, siguiendo la arquitectura de panel dividido (marca | formulario) idéntica a la pantalla de login existente. La implementación **reutiliza sin modificación** `BrandPanel`, `Button`, `Input` y `SocialLogins`, extiende los utilitarios de validación con tres funciones nuevas, y agrega un `RegistrationService` simulado (mock) consistente con el patrón de `AuthService`. Al completarse el registro, el usuario es redirigido a `/login?registered=true` y se muestra un banner de éxito. TDD estricto: todos los tests se escriben **antes** de la implementación.

## Technical Context

**Language/Version**: TypeScript / Next.js 14 (App Router)
**Primary Dependencies**: React 18, Next.js 14, Tailwind CSS 3.x — todos ya instalados
**Storage**: In-memory mock (igual que `AuthService` — sin persistencia real)
**Testing**: Vitest 1.x + React Testing Library 15.x + JSDOM 24.x — ya configurados
**Target Platform**: Web Responsive (desktop ≥1024px / mobile <1024px)
**Project Type**: web-application
**Performance Goals**: Flujo de registro completable en < 2 minutos (SC-001)
**Constraints**: Cero librerías externas nuevas; PascalCase obligatorio; cero nuevos tokens de diseño
**Scale/Scope**: Feature única (pantalla `/register`) con redirección al `/login` existente

## Constitution Check

*GATE: Debe pasar antes de la Fase 0 de investigación. Re-evaluado tras el diseño de Fase 1.*

- [x] **TDD**: Estrategia de tests definida antes de la implementación — todos los tasks exigen test primero.
- [x] **SOLID**: `RegisterForm` (UI) / `RegistrationService` (lógica) / `Validation` (reglas) siguen SRP; `IRegistrationService` aplica DIP.
- [x] **Clean Architecture**: `app/` para rutas, `components/` para UI, `lib/` para dominio — idéntico a login.
- [x] **DRY & YAGNI**: `BrandPanel`, `Button`, `Input`, `SocialLogins`, `DesignTokens` reutilizados sin duplicar.
- [x] **Naming**: Todas las entidades nuevas siguen PascalCase (`RegisterForm`, `RegistrationService`, `RegistrationData`, `Checkbox`).
- [x] **Dependencies**: Cero nuevas librerías externas — solo React nativo + stack existente.
- [x] **Security**: Todos los inputs (`FullName`, `Email`, `Password`, `ConfirmPassword`, `AcceptsTerms`) validados antes de procesar.

## Project Structure

### Documentación (este feature)

```text
specs/002-registro-usuario/
├── plan.md                           # Este archivo
├── research.md                       # Fase 0 — decisiones técnicas
├── data-model.md                     # Fase 1 — entidades y relaciones
├── quickstart.md                     # Fase 1 — guía de validación
├── contracts/
│   └── registration-service.md       # Fase 1 — contrato del servicio
├── checklists/
│   └── requirements.md
└── spec.md
```

### Código Fuente (cambios al repositorio)

```text
# ARCHIVOS NUEVOS
app/register/
└── page.tsx                          # Ruta /register — espejo de app/page.tsx

components/
├── RegisterForm.tsx                  # Formulario principal (espejo de LoginForm.tsx)
└── ui/
    └── Checkbox.tsx                  # Checkbox reutilizable con label + estado de error

lib/
├── services/
│   └── RegistrationService.ts        # Mock de registro async (espejo de AuthService.ts)
└── types/
    └── Registration.ts               # RegistrationData + IRegistrationService

# ARCHIVOS MODIFICADOS
app/page.tsx                          # + searchParams prop → renderiza banner de éxito si ?registered=true
lib/utils/Validation.ts               # + validateName, validatePasswordMatch, validateTrimmed

# ARCHIVOS DE TEST (TDD — escritos antes de la implementación)
components/RegisterForm.test.tsx
app/register.test.tsx
lib/services/RegistrationService.test.ts
lib/utils/Validation.test.ts          # Extendido con tests de los 3 nuevos validators

# REUTILIZADOS SIN CAMBIO
components/BrandPanel.tsx
components/SocialLogins.tsx
components/ui/Button.tsx
components/ui/Input.tsx
lib/constants/DesignTokens.ts
lib/services/AuthService.ts
tailwind.config.ts
```

**Decisión de Estructura**: Web application siguiendo las convenciones del App Router de Next.js ya establecidas. El registro replica la jerarquía del login en cada capa: misma profundidad de carpetas, mismo patrón de componente/servicio/tipo.

## Complexity Tracking

> Solo se registran violaciones a la constitución que requieren justificación.

| Violación | Por qué es necesaria | Alternativa más simple rechazada porque |
|-----------|----------------------|-----------------------------------------|
| Modificar `app/page.tsx` | Mostrar banner de éxito tras redireccionamiento de registro (`?registered=true`) | Agregar un wrapper nuevo crearía indirección innecesaria para una verificación de un solo parámetro |
| Extender `lib/utils/Validation.ts` | Tres nuevos validators (`validateName`, `validatePasswordMatch`, `validateTrimmed`) | Crear un nuevo archivo `RegistrationValidation.ts` violaría DRY al duplicar el patrón de importación y fragmentar la lógica de validación |
