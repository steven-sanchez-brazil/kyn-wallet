# Research: Registro de Cuenta para KynWallet

## Decision: Testing Framework
- **Decision**: Vitest + React Testing Library + JSDOM.
- **Rationale**:
  - Encaja con el stack actual del proyecto y con la práctica de TDD definida en la constitución.
  - Permite validar tanto la UI como la lógica del formulario sin introducir dependencias nuevas.
  - Facilita pruebas rápidas de validación, renderizado responsive y mensajes de error.
- **Alternatives considered**:
  - **Jest**: rechazado por aportar complejidad de configuración innecesaria para este stack.
  - **E2E como base principal**: útil para flujos completos, pero demasiado costoso para la validación primaria de esta pantalla.

## Decision: Design Token Mapping
- **Decision**: Reutilizar los tokens visuales ya existentes en `lib/constants/DesignTokens.ts` y extender `tailwind.config.ts` solo si hace falta un token adicional validado por Figma.
- **Rationale**:
  - Conserva consistencia visual entre login y registro.
  - Evita duplicación de valores de color, borde y espaciado.
  - Permite que la UI siga expresándose con utilidades de Tailwind sin hardcoding disperso.
- **Alternatives considered**:
  - **CSS puro para todo el estilo**: rechazado por perder consistencia con el sistema actual.
  - **Tokens inline en componentes**: rechazado por debilitar mantenibilidad y DRY.

## Decision: Component Architecture
- **Decision**: Separar la pantalla en componentes de UI reutilizables, un formulario de registro y un servicio de dominio para validar/crear la cuenta simulada.
- **Rationale**:
  - Mantiene `Single Responsibility` entre vista, validación y lógica de acceso.
  - Facilita cobertura de pruebas sobre reglas de negocio y comportamientos visuales por separado.
  - Reutiliza el patrón ya establecido por el login.
- **Alternatives considered**:
  - **Lógica embebida en la página**: rechazada por acoplamiento excesivo.

## Decision: Registration Flow
- **Decision**: El formulario validará correo, contraseña y confirmación antes de permitir avanzar; el flujo exitoso redirigirá al siguiente paso definido por el producto.
- **Rationale**:
  - Da feedback inmediato y claro al usuario.
  - Cubre el caso extremo de cuentas duplicadas y contraseñas que no coinciden.
  - Mantiene la implementación simple para esta fase del producto.
- **Alternatives considered**:
  - **Validación solo al enviar**: rechazado porque degrada la experiencia y retrasa la corrección.
  - **Persistencia real desde el inicio**: rechazada por salir del alcance actual.