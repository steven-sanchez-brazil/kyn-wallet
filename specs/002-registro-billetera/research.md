# Research: Registro de Billetera Virtual

**Feature**: 002-registro-billetera  
**Date**: 2026-06-08

## Research Tasks

### 1. Patrón de formulario de registro con validaciones on blur en React

**Decision**: Usar estado local con `useState` para cada campo + estado de error por campo. Validar en el handler `onBlur` de cada input. Mismo patrón que LoginForm existente pero con trigger on blur explícito en lugar de useEffect.

**Rationale**: El proyecto ya tiene un patrón establecido en `LoginForm.tsx` con validaciones reactivas. Para registro, se usa on blur según la clarificación del spec. Esto es más simple que useEffect watchers y da control preciso del momento de validación.

**Alternatives considered**:
- useEffect watchers (como en LoginForm actual): Descartado porque el spec requiere on blur específicamente.
- Formularios controlados con biblioteca (react-hook-form): Descartado por restricción de no librerías externas.
- useReducer para estado complejo: Descartado — YAGNI, useState es suficiente para 4 campos.

### 2. Reutilización de componentes existentes

**Decision**: Reutilizar `BrandPanel`, `SocialLogins`, `Input`, `Button` directamente. Crear nuevo componente `Checkbox` en `ui/`.

**Rationale**: BrandPanel y SocialLogins ya implementan exactamente el diseño necesario (panel lateral con branding y botones Google/Apple con alert "Próximamente"). Los componentes UI (Input, Button) ya tienen los estilos del design system.

**Alternatives considered**:
- Crear componentes nuevos desde cero: Descartado — viola DRY.
- Modificar SocialLogins para aceptar props de texto personalizado: Descartado — YAGNI, el comportamiento es idéntico al de login.

### 3. Servicio de registro simulado

**Decision**: Crear `RegisterService` con interfaz `IRegisterService` que simula un delay y siempre retorna éxito. Sigue el patrón de `AuthService` existente.

**Rationale**: Mantiene consistencia arquitectónica con el servicio de login. Permite futura sustitución por un servicio real sin cambiar la UI. Cumple con Clean Architecture (la UI depende de una abstracción).

**Alternatives considered**:
- Registro inline en el componente (sin servicio): Descartado — viola SRP y Clean Architecture.
- Usar el AuthService existente con método register: Descartado — viola SRP (un servicio, una responsabilidad).

### 4. Extensión de validaciones existentes

**Decision**: Agregar `validateFullName` (no vacío después de trim) y `validatePasswordMatch` a `lib/utils/Validation.ts`. Reutilizar `validateEmail` y `validatePassword` existentes.

**Rationale**: Centraliza toda lógica de validación en un solo lugar. Las funciones existentes ya cubren email y password. Solo faltan nombre completo y coincidencia de contraseñas.

**Alternatives considered**:
- Crear archivo de validación separado para registro: Descartado — viola DRY, las validaciones de email/password son compartidas.
- Validar inline en el componente: Descartado — viola Clean Architecture (lógica de dominio en capa UI).

### 5. Mecanismo de redirección con query parameter

**Decision**: Usar `router.push('/login?registered=true')` de Next.js. En la página de login, leer `searchParams` y mostrar un banner de éxito condicionalmente.

**Rationale**: Query parameters son la forma estándar de pasar estado entre rutas en Next.js App Router. Son visibles, debuggeables y funcionan con refresh. Además, ya se definió en la clarificación del spec.

**Alternatives considered**:
- Estado global (Context/Store): Descartado — YAGNI para un mensaje temporal.
- sessionStorage: Descartado — añade complejidad innecesaria y puede fallar en navegación directa.

### 6. Componente Checkbox personalizado

**Decision**: Crear `components/ui/Checkbox.tsx` con estilo consistente al design system (Tailwind, tokens existentes). Interfaz simple: `label`, `checked`, `onChange`, `error`.

**Rationale**: No existe un componente Checkbox en el proyecto. Es necesario para T&C y potencialmente reutilizable en futuras features. Sigue el patrón de `Input` y `Button` en `ui/`.

**Alternatives considered**:
- Usar input nativo sin wrapper: Descartado — inconsistente con el design system y difícil de estilizar.
- Incluir el checkbox inline en RegisterForm: Descartado — viola DRY si se necesita en otra pantalla.
