# Research: Registro de Billetera Virtual

## Decisiones Técnicas

### 1. Framework y Estructura
- **Decisión**: Utilizar Next.js App Router con la ruta `/app/register/page.tsx`.
- **Racional**: Alineación con el estándar actual del proyecto y los requerimientos del usuario. El App Router permite una mejor gestión de estados y layouts.
- **Alternativas consideradas**: Pages Router (Rechazado por ser legado en nuevas versiones de Next.js).

### 2. Estilos y Diseño
- **Decisión**: Tailwind CSS integrado con `lib/constants/DesignTokens.ts`.
- **Racional**: El proyecto ya tiene una configuración de Tailwind que extiende los colores y bordes basados en tokens de diseño. Esto asegura consistencia visual con el Figma.
- **Alternativas consideradas**: CSS Modules (Rechazado para mantener consistencia con el uso de Tailwind en el resto del proyecto).

### 3. Validación de Formulario
- **Decisión**: Validación manual utilizando funciones puras en `lib/utils/Validation.ts`.
- **Racional**: La Constitución prohíbe librerías externas. Se implementarán validaciones para correo (regex), longitud de contraseña y coincidencia de contraseñas.
- **Alternativas consideradas**: Zod o React Hook Form (Rechazados por restricción de la Constitución).

### 4. Capa de Servicios
- **Decisión**: Extender `AuthService` para incluir el método `register`.
- **Racional**: Sigue el patrón de Clean Architecture separando la lógica de persistencia/negocio de la UI. Permite mockear el registro fácilmente.
- **Alternativas consideradas**: Lógica directa en el componente (Rechazado por violar SOLID y Clean Architecture).

### 5. Estrategia de Pruebas
- **Decisión**: Vitest para lógica de negocio y React Testing Library para componentes UI.
- **Racional**: Herramientas ya configuradas en el proyecto (`vitest.config.ts`). Permite seguir TDD de manera eficiente.

## Resoluciones de Clarificación

- **Unknown**: ¿Cómo manejar el estado de "Próximamente" en botones sociales?
  - **Resolución**: Se usará un `window.alert` nativo o un componente Toast si existiera, pero para cumplir el requerimiento exacto se usará alert/toast simple.
- **Unknown**: ¿Dónde guardar los términos y condiciones?
  - **Resolución**: Por ahora será un checkbox con link simulado o modal simple, ya que no se especificó una página legal real.
