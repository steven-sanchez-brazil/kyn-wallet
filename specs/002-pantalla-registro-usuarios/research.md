# Research: Pantalla de Registro de Usuarios

## Decision: Estrategia de referencia visual con MCP de Figma
- **Decision**: Usar el frame compartido como referencia oficial de layout para diseno 04. Registro, pero continuar con planificacion sin extraccion automatica de nodos porque `get_design_context` no tiene acceso con el asiento actual.
- **Rationale**:
  - El requerimiento funcional sobre ubicacion de paneles de card mockup y headline 1/2 ya esta explicitado en el spec.
  - El comando MCP devolvio error de acceso y el usuario autenticado tiene plan Starter con seat `View`, lo que limita lecturas del servidor MCP.
  - Planificar sin bloqueo permite avanzar a implementacion y pruebas.
- **Alternatives considered**:
  - Esperar acceso MCP completo antes de planificar: descartado por bloquear entrega.
  - Ignorar referencia de Figma: descartado por riesgo de desviacion visual.

## Decision: Reutilizar arquitectura y componentes existentes
- **Decision**: Extender patron actual (pantalla + formulario + servicio + validaciones + componentes UI base) en lugar de crear una nueva estructura.
- **Rationale**:
  - Reduce complejidad y riesgo, alineado con DRY/YAGNI.
  - Mantiene consistencia con login ya implementado.
  - Facilita pruebas TDD con herramientas ya configuradas.
- **Alternatives considered**:
  - Crear modulo aislado nuevo para registro: descartado por sobreingenieria para alcance actual.

## Decision: Contrato de registro simulado en servicio de dominio
- **Decision**: Definir `RegisterService` con validacion de campos y respuestas tipadas para exito/error; persistencia real fuera de alcance.
- **Rationale**:
  - Permite probar flujo completo de UX sin acoplarse aun a backend real.
  - Encaja con el enfoque ya usado por `AuthService`.
- **Alternatives considered**:
  - Integrar API real en esta fase: descartado por no requerido en el spec y mayor dependencia externa.

## Decision: Estrategia de validacion de formulario
- **Decision**: Validacion por campo + validacion cruzada (por ejemplo, confirmacion de contrasena) con mensajes de error accionables.
- **Rationale**:
  - Atiende directamente US1 y US3.
  - Mejora conversion del flujo y reduce errores repetidos.
- **Alternatives considered**:
  - Solo validacion al submit: descartado por peor experiencia y menor tasa esperada de exito al primer intento.

## Decision: Adaptacion responsive de layout de referencia
- **Decision**: En desktop conservar composicion split-panel y jerarquia visual del mockup/headlines; en mobile priorizar legibilidad sin perder contenido clave.
- **Rationale**:
  - Cumple FR-005 y FR-006.
  - Aprovecha estructura responsive ya presente en el proyecto.
- **Alternatives considered**:
  - Mantener layout fijo de desktop en mobile: descartado por riesgo de cortes y solapamientos.
