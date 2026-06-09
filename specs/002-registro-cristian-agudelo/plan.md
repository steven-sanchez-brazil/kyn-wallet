# Plan de Implementación: Registro de Usuarios

**Rama**: `002-registro-cristian-agudelo` | **Fecha**: 2026-06-08 | **Spec**: [specs/002-registro-cristian-agudelo/spec.md](spec.md)
**Entrada**: Especificación de funcionalidad de `specs/002-registro-cristian-agudelo/spec.md`

## Resumen

Implementar la pantalla de Registro de Usuarios para la aplicación KynWallet siguiendo el flujo de Spec Driven Development (SDD) y TDD. La UI contará con un diseño responsive de pantalla dividida (dos paneles en desktop, uno solo en mobile). La lógica de registro se integrará en `AuthService` utilizando almacenamiento en memoria para permitir que los usuarios recién creados puedan iniciar sesión de inmediato. Se realizarán validaciones inline en tiempo real y se mantendrá estricta fidelidad con los tokens de diseño de Figma del proyecto (colores, tipografía Inter, bordes de 12px y 6px) sin depender de librerías externas de UI.

## Contexto Técnico

**Lenguaje/Versión**: TypeScript / Next.js 14 (App Router)  
**Dependencias Clave**: React 18, Next.js 14, Tailwind CSS 3.x  
**Almacenamiento**: En memoria (lista dinámica dentro de `AuthService`)  
**Testing**: Vitest y React Testing Library (ya configurados en el proyecto)  
**Plataforma Objetivo**: Web (Responsive)  
**Restricciones**: Cero librerías externas de UI o validación, cumplimiento estricto de nomenclatura `PascalCase` para componentes y tipos.

## Chequeo de la Constitución

- [x] **TDD**: Las pruebas unitarias y de integración se escribirán y ejecutarán primero, validando los fallos antes de programar la solución.
- [x] **SOLID**: Separación limpia entre componentes visuales, servicios de datos/lógica y utilidades de validación.
- [x] **Clean Architecture**: Capa de presentación (`app/register`), componentes reutilizables (`components/`), lógica de negocio (`lib/services`) y utilidades (`lib/utils`).
- [x] **DRY & YAGNI**: Reutilización de tokens de diseño globales y de la lógica de validación de correo/contraseña existente en `lib/utils/Validation.ts`.
- [x] **Nombres**: Uso estricto de `PascalCase` para todos los componentes de React, interfaces y clases de TypeScript.
- [x] **Dependencias**: Se usarán únicamente las APIs nativas del navegador (alert, eventos) y las librerías base (Next.js/React/Tailwind) ya instaladas.
- [x] **Seguridad**: Validación estricta en tiempo real de correos, longitud de contraseña (mínimo 8 caracteres) y coincidencia de confirmación.

## Estructura del Proyecto

### Documentación (Esta funcionalidad)

```text
specs/002-registro-cristian-agudelo/
├── plan.md              # Este archivo
├── spec.md              # Especificación funcional de entrada
└── tasks.md             # Lista de tareas detallada (Phase 1-6)
```

### Código Fuente Afectado

```text
app/
├── login/               # [NEW] Carpeta de ruta explícita para Login
│   └── page.tsx         # [NEW] Renderiza LoginForm y BrandPanel (para soportar link /login y banners)
├── register/            # [NEW] Carpeta de ruta para Registro
│   └── page.tsx         # [NEW] Página principal de registro (RegisterForm + BrandPanel adaptado)
└── page.tsx             # [MODIFY] Redirige automáticamente a /login o renderiza Login

components/
├── BrandPanel.tsx       # [MODIFY] Modificar para aceptar props dinámicas de headline y descripción
├── LoginForm.tsx        # [MODIFY] Modificar para leer query params de éxito de registro y mostrar un banner
├── RegisterForm.tsx     # [NEW] Formulario de registro con validaciones inline, checkbox e iconos de visibilidad
└── ui/
    └── Input.tsx        # [MODIFY] Opcionalmente extender para soportar tipo password con botón de visibilidad (ojo)

lib/
├── services/
│   └── AuthService.ts   # [MODIFY] Añadir método register y persistir dinámicamente en memoria de sesión
├── types/
│   └── Auth.ts          # [MODIFY] Añadir interfaz RegisterCredentials y campo FullName en User
└── utils/
    └── Validation.ts    # [MODIFY] Añadir validación de nombre (no vacío)
```

## Tabla de Complejidad y Decisiones

| Violación de Restricciones | Por qué es necesario | Alternativa descartada |
|----------------------------|----------------------|------------------------|
| Ninguna | Se adhiere al 100% a la constitución del proyecto. | N/A |
