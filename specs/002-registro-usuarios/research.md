# Research: Registro de Usuarios KynWallet

## Decision: Mantener stack base del proyecto
- **Decision**: Implementar la pantalla de registro en Next.js 14 + React 18 + TypeScript, manteniendo Tailwind CSS como sistema de estilos.
- **Rationale**:
  - El proyecto ya está configurado con App Router y Tailwind, por lo que se minimiza riesgo técnico.
  - Cumple la solicitud explícita del usuario de conservar stack y estructura existentes.
  - Respeta YAGNI al no introducir capas ni herramientas innecesarias.
- **Alternatives considered**:
  - Migrar a otro framework CSS: rechazado por romper consistencia y agregar costo de migración.
  - Implementar CSS puro sin Tailwind: rechazado por reducir velocidad y consistencia visual en este proyecto.

## Decision: Estrategia de validaciones inline
- **Decision**: Centralizar reglas de validación en utilidades de `lib/` y reflejar errores campo-a-campo en el formulario.
- **Rationale**:
  - Mejora mantenibilidad y evita duplicación de lógica (DRY).
  - Permite pruebas unitarias de validación desacopladas del componente visual.
  - Facilita trazabilidad entre requisitos FR-002 a FR-007 y pruebas.
- **Alternatives considered**:
  - Validar directamente en JSX sin utilidades: rechazado por acoplamiento y baja testabilidad.
  - Validar solo en submit sin feedback inline: rechazado por no cumplir requisitos funcionales.

## Decision: Flujo de navegación y mensajes
- **Decision**: Tras registro exitoso, redirigir a `/login` con mensaje de éxito transportado por query param o estado de navegación manejado en cliente.
- **Rationale**:
  - Cumple FR-008 de forma explícita.
  - Se integra con la ruta de login ya existente sin crear nuevas dependencias.
- **Alternatives considered**:
  - Mostrar éxito en la misma pantalla sin redirección: rechazado por no cumplir requerimiento.
  - Persistir estado de éxito en almacenamiento local: rechazado por complejidad innecesaria para alcance actual.

## Decision: Contrato de interfaces para esta feature
- **Decision**: Definir contrato de `RegistroService` y contrato de navegación post-registro en `contracts/`.
- **Rationale**:
  - Provee acuerdos claros para implementación y pruebas antes de codificar.
  - Mantiene separación de responsabilidades (UI vs servicio de registro).
- **Alternatives considered**:
  - Omitir contratos: rechazado por menor claridad entre capas y menor verificabilidad.

## Decision: Responsive layout
- **Decision**: Usar layout de dos paneles en desktop y solo formulario en mobile, gobernado por breakpoints de Tailwind.
- **Rationale**:
  - Cumple FR-011 y FR-012 con comportamiento verificable.
  - Aprovecha utilidades nativas de Tailwind sin librerías adicionales.
- **Alternatives considered**:
  - Mantener dos paneles en todos los tamaños: rechazado por no cumplir requerimiento mobile.
  - Renderizar dos vistas separadas totalmente distintas: rechazado por duplicación de componentes.
