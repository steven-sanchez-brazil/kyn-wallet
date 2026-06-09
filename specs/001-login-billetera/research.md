# Investigación: Implementación del Login

## Decisión: Framework de Pruebas
- **Decisión**: Vitest + React Testing Library + JSDOM.
- **Justificación**: 
    - **Rendimiento**: Modo watch instantáneo y ejecución más rápida en comparación con Jest.
    - **Stack Moderno**: Soporte nativo de ESM y TypeScript, alineado con Next.js 14.
    - **DX**: La compatibilidad de API con Jest facilita su uso a la vez que ofrece una mejor experiencia de desarrollo.
- **Alternativas consideradas**: 
    - **Jest**: Rechazado por su configuración compleja con ESM/Next.js y tiempos de arranque más lentos.
    - **Cypress/Playwright**: Se usarán para E2E si es necesario, pero no como runner principal de pruebas unitarias/de integración para la lógica TDD.

## Decisión: Mapeo de Tokens de Diseño
- **Decisión**: Definición centralizada en TypeScript en `lib/constants/DesignTokens.ts`, importada en `tailwind.config.ts`.
- **Justificación**: 
    - **Seguridad de Tipos**: Garantiza que los tokens de diseño sean consistentes en toda la app.
    - **Mantenibilidad**: Una única fuente de verdad para los valores de Figma.
    - **Integración con Tailwind**: Es fácil extender el tema en `tailwind.config.ts` importando el objeto.
- **Alternativas consideradas**: 
    - **Hardcodeo Directo**: Rechazado porque viola la mantenibilidad y el principio DRY.
    - **Solo Variables CSS**: Rechazado porque pierde los beneficios de las clases utilitarias de Tailwind y la configuración con seguridad de tipos.

## Decisión: Arquitectura de Componentes
- **Decisión**: Enfoque de Arquitectura Limpia con una separación entre componentes de UI y lógica.
- **Justificación**: 
    - **SOLID**: Separar `LoginForm` (UI) de `AuthService` (Lógica).
    - **Arquitectura Limpia**: Entidades de dominio (User) y Casos de Uso (Login) separados de la Infraestructura (componentes de Next.js).
- **Alternativas consideradas**: 
    - **Todo en la Página**: Rechazado porque viola el SRP y los principios de Arquitectura Limpia.

## Decisión: Implementación del Panel de Marca
- **Decisión**: Implementación del degradado y la disposición del mockup con CSS/Tailwind puro.
- **Justificación**: 
    - **Rendimiento**: Sin assets SVG adicionales ni imágenes pesadas donde el CSS es suficiente.
    - **Cumplimiento de Restricciones**: Cero librerías externas.
- **Alternativas consideradas**: 
    - **SVG Exportado de Figma**: Rechazado para mantener el control sobre la responsividad y las animaciones mediante código.
