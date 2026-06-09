# Plan de Implementación: Actualización del Spec de Login

**Rama**: `002-login-spec-update` | **Fecha**: 2026-06-04 | **Spec**: [specs/002-login-spec-update/spec.md](spec.md)
**Entrada**: Especificación de funcionalidad desde `specs/002-login-spec-update/spec.md`

## Resumen

Implementar una pantalla de Login para la aplicación KynWallet usando un diseño de pantalla dividida (Panel de Marca vs Panel de Formulario) que siga estrictamente el diseño de Figma proporcionado. El stack técnico será Next.js 14 (App Router), TypeScript y Tailwind CSS, con una implementación propia de los tokens de diseño para garantizar cero dependencias adicionales de librerías de UI externas.

## Contexto Técnico

**Lenguaje/Versión**: TypeScript / Next.js 14 (App Router)  
**Dependencias Principales**: React 18, Next.js 14, Tailwind CSS 3.x  
**Almacenamiento**: En memoria (arreglo de usuarios hardcodeado)  
**Pruebas**: Vitest + React Testing Library (runner definido para cumplimiento de TDD)  
**Plataforma Objetivo**: Web (Responsive)
**Tipo de Proyecto**: aplicación web  
**Objetivos de Rendimiento**: Completar el login < 30s, validación exitosa < 2s.  
**Restricciones**: Sin librerías de UI externas (Radix, Shadcn, etc.), nomenclatura estricta en PascalCase.  
**Escala/Alcance**: Funcionalidad única (Login) con redirección a una pantalla placeholder.

## Verificación de Constitución

*GATE: Debe pasar antes de la investigación de Fase 0. Re-verificar tras el diseño de Fase 1.*

- [x] **TDD**: ¿La estrategia de pruebas está definida antes de la implementación? (Vitest + React Testing Library; pruebas antes del código)
- [x] **SOLID**: ¿El diseño aplica los principios SOLID? (Separación limpia de UI, lógica y constantes)
- [x] **Arquitectura Limpia**: ¿Las capas están estrictamente separadas con dependencias hacia adentro? (app/ para enrutamiento, components/ para UI, lib/ para lógica)
- [x] **DRY y YAGNI**: ¿El diseño está libre de complejidad innecesaria y código duplicado? (Enfocado solo en los requisitos del login)
- [x] **Nomenclatura**: ¿El plan respeta `PascalCase` para las estructuras? (Obligatorio para todos los componentes y estructuras)
- [x] **Dependencias**: ¿La solución está completamente libre de librerías externas? (Usando solo Next.js/Tailwind como base, sin librerías de UI)
- [x] **Seguridad**: ¿Todas las entradas se validan y las rutas protegidas se autentican? (Validación FR-009/FR-010, autenticación FR-012/FR-013)

## Estructura del Proyecto

### Documentación (esta funcionalidad)

```text
specs/002-login-spec-update/
├── plan.md              # Este archivo
├── research.md          # Salida de Fase 0
├── data-model.md        # Salida de Fase 1
├── quickstart.md        # Salida de Fase 1
├── checklists/
│   └── requirements.md
├── contracts/           # Salida de Fase 1
└── spec.md              # Spec de entrada
```

### Código Fuente (raíz del repositorio)

```text
app/
├── layout.tsx
├── page.tsx             # Página de Login
└── construction/        # Página placeholder
    └── page.tsx

components/
├── BrandPanel.tsx
├── LoginForm.tsx
└── ui/                  # Elementos de UI propios (Input, Button, etc.)

lib/
├── auth.ts              # Lógica hardcodeada
└── constants/
    └── design-tokens.ts # Tokens de Figma mapeados aquí
```

**Decisión de Estructura**: Estructura de aplicación web con convenciones del App Router de Next.js, separando los componentes de UI compartidos y la lógica de negocio en `components/` y `lib/` respectivamente.

## Seguimiento de Complejidad

| Violación | Por qué es necesaria | Por qué se rechazó la alternativa más simple |
|-----------|----------------------|----------------------------------------------|
| Next.js / Tailwind | La directiva explícita del usuario prevalece sobre la regla estricta de "sin librerías externas" para el framework base. | Construir un framework SSR propio y un parser de CSS está fuera del alcance. |
