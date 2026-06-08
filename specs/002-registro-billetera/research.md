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

### 7. Password visibility toggle (eye icon) — FR-013

**Decision**: El componente `Input` ya soporta `type="password"` con toggle de visibilidad (eye icon) desde la implementación de 001-login-billetera. Se reutiliza directamente en los campos de contraseña y confirmar contraseña del registro.

**Rationale**: El diseño de Figma (node 31:28, 31:32) muestra explícitamente un eye icon en ambos campos de contraseña. La implementación ya existe en `Input.tsx` y no requiere cambios.

**Alternatives considered**:
- Agregar toggle solo al primer campo: Descartado — Figma muestra icono en ambos campos.
- No incluir toggle: Descartado — está en el diseño y mejora UX para evitar errores de tipeo.

### 8. BrandPanel parametrizado — FR-014

**Decision**: Parametrizar `BrandPanel` con props opcionales `headline` y `subtitle` que permitan textos diferentes por pantalla. Valores por defecto mantienen los textos de login para backward compatibility.

**Rationale**: El diseño de Figma para registro muestra textos diferentes ("Comienza tu camino financiero." / "Crea tu cuenta en minutos...") vs login ("Tu dinero, sin fronteras." / "Envía, recibe y paga en segundos..."). Props opcionales con defaults respetan DRY y evitan componentes duplicados.

**Alternatives considered**:
- Crear RegisterBrandPanel separado: Descartado — viola DRY, 95% del componente es idéntico.
- Mantener textos fijos (ignorar Figma): Descartado — contradice el diseño aprobado.

### 9. Enlace "términos y condiciones" con alert — FR-015

**Decision**: El texto "términos y condiciones" en el checkbox se implementa como un `<button>` estilizado que ejecuta `window.alert('Próximamente')` al ser clickeado. Sigue el mismo patrón que los botones sociales.

**Rationale**: No existe una página de T&C y el registro es simulado. Un alert es consistente con el patrón de Google/Apple buttons ("Próximamente") y cumple YAGNI.

**Alternatives considered**:
- Crear página /terms placeholder: Descartado — YAGNI, no hay contenido real de T&C.
- Texto sin acción: Descartado — el usuario eligió que sea clickeable con feedback.
