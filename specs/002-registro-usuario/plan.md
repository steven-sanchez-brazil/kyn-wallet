# Plan de Implementación: Registro de Usuario Nuevo

**Branch**: `registro-leonardo-tagliabue` | **Fecha**: 2026-06-05 | **Spec**: [specs/002-registro-usuario/spec.md](spec.md)
**Entrada**: Especificación de funcionalidad desde `specs/002-registro-usuario/spec.md`

## Resumen

Implementar la funcionalidad de registro de usuarios nuevos en KynWallet. Incluye dos partes: (1) agregar el enlace "¿No tiene cuenta? Registrate" en la pantalla de Login existente, y (2) crear una pantalla de Registro con diseño de panel dividido (Brand Panel + Form Panel) que respete los tokens de diseño del proyecto y el modelo gráfico de referencia `registro_screen.png`. El registro es simulado en memoria, siguiendo el mismo patrón del Login existente. El stack técnico (Next.js 14, TypeScript, Tailwind CSS, Vitest) ya está definido y en uso.

## Contexto Técnico

**Language/Version**: TypeScript / Next.js 14 (App Router)
**Dependencias Primarias**: React 18, Next.js 14, Tailwind CSS 3.x, autoprefixer
**Storage**: En memoria (array de usuarios mock — mismo patrón que Login)
**Testing**: Vitest 1.x + React Testing Library 15.x (ya configurado en el proyecto)
**Plataforma**: Web (Responsivo — desktop split-panel, mobile form-only)
**Tipo de Proyecto**: web-application
**Objetivos de Performance**: Registro completado < 2s, validaciones en tiempo real < 100ms.
**Restricciones**: Sin librerías UI externas (Radix, Shadcn, etc.), nomenclatura estricta PascalCase, reutilizar componentes existentes (`Button`, `Input`, `BrandPanel`).
**Alcance**: Feature de Registro + modificación mínima al Login (agregar enlace).

## Verificación de Constitución

*GATE: Debe pasar antes de la Fase 0. Re-verificar tras el diseño de la Fase 1.*

- [x] **TDD**: ¿Está la estrategia de pruebas definida antes de la implementación? (Vitest + RTL ya configurados; tests se escriben antes que el código)
- [x] **SOLID**: ¿El diseño aplica los principios SOLID? (Separación clara: `RegistroForm` solo UI, `RegistroService` solo lógica, `Validation.ts` solo utilidades)
- [x] **Arquitectura Limpia**: ¿Las capas están estrictamente separadas con dependencias hacia adentro? (`app/registro/` → `components/` → `lib/`)
- [x] **DRY & YAGNI**: ¿El diseño está libre de complejidad innecesaria y código duplicado? (Reutiliza `Button`, `Input`, `BrandPanel`, `validateEmail`, `validatePassword`)
- [x] **Nomenclatura**: ¿El plan respeta `PascalCase` para estructuras? (Obligatorio para todos los componentes e interfaces)
- [x] **Dependencias**: ¿La solución está completamente libre de librerías externas? (Solo Next.js/Tailwind como base, sin librerías UI)
- [x] **Seguridad**: ¿Todas las entradas son validadas? (Validaciones FR-005, FR-006, FR-007 en tiempo real antes del submit)

## Estructura del Proyecto

### Documentación (este feature)

```text
specs/002-registro-usuario/
├── plan.md              # Este archivo
├── research.md          # Output de Fase 0
├── data-model.md        # Output de Fase 1
├── quickstart.md        # Output de Fase 1
├── checklists/
│   └── requirements.md
├── contracts/
│   └── registro-ui.md   # Output de Fase 1
└── spec.md              # Spec de entrada
```

### Código Fuente (raíz del repositorio)

```text
app/
├── layout.tsx                    # Sin cambios
├── page.tsx                      # MODIFICAR: agregar enlace "¿No tiene cuenta? Registrate"
├── construction/
│   └── page.tsx                  # Sin cambios (destino post-registro exitoso)
├── registro/
│   └── page.tsx                  # NUEVO: página de Registro
├── login.test.tsx                # MODIFICAR: agregar tests del nuevo enlace
└── globals.css                   # Sin cambios

components/
├── BrandPanel.tsx                # REUTILIZAR sin cambios
├── LoginForm.tsx                 # MODIFICAR: agregar enlace a /registro
├── LoginForm.test.tsx            # MODIFICAR: agregar test del enlace
├── RegistroForm.tsx              # NUEVO: formulario de registro
├── RegistroForm.test.tsx         # NUEVO: tests del formulario de registro
├── SocialLogins.tsx              # Sin cambios
└── ui/
    ├── Button.tsx                # REUTILIZAR sin cambios
    └── Input.tsx                 # REUTILIZAR sin cambios

lib/
├── constants/
│   └── DesignTokens.ts           # REUTILIZAR (extender solo si registro_screen.png requiere nuevos tokens)
├── services/
│   ├── AuthService.ts            # MODIFICAR: agregar método register()
│   └── AuthService.test.ts       # MODIFICAR: agregar tests de register()
├── types/
│   └── Auth.ts                   # MODIFICAR: agregar NuevoUsuario, ResultadoRegistro
└── utils/
    ├── Validation.ts             # MODIFICAR: agregar validatePasswordMatch(), validateFullName()
    └── Validation.test.ts        # MODIFICAR: agregar tests de nuevas validaciones
```

**Decisión de Estructura**: Arquitectura Next.js App Router existente, extendiendo los patrones ya establecidos. La nueva ruta `/registro` sigue la misma convención de `app/registro/page.tsx`. Se reutilizan todos los componentes y utilidades existentes para respetar el principio DRY.

## Seguimiento de Complejidad

| Violación | Por qué se necesita | Alternativa más simple rechazada porque |
|-----------|--------------------|-----------------------------------------|
| Next.js / Tailwind | Directiva explícita del usuario sobreescribe la restricción de "sin librerías externas" para el framework base. | Construir un framework SSR y parser CSS personalizado está fuera del alcance. |
