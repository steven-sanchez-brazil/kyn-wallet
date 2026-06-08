<!-- SYNC IMPACT REPORT
Version change: 1.0.1 -> 1.1.0
Modified principles:
- N/A (sin cambios en el contenido normativo de los principios I-V)
Added sections:
- Integración de IA (Copilot)
Removed sections:
- N/A
Templates requiring updates:
- ✅ .specify/templates/plan-template.md
- ✅ .specify/templates/spec-template.md
- ✅ .specify/templates/tasks-template.md
- ✅ README.md
- ⚠ pending: .specify/templates/commands/*.md (no existe en este repositorio)
Follow-up TODOs: None
-->
# Constitución de kyn-wallet

## Principios Centrales

### I. Desarrollo Guiado por Pruebas (TDD)
Las pruebas DEBEN escribirse antes de la implementación. El ciclo Rojo-Verde-Refactorización se aplica estrictamente.

### II. Principios SOLID
El código DEBE adherirse a los principios SOLID (Responsabilidad Única, Abierto/Cerrado, Sustitución de Liskov, Segregación de Interfaces, Inversión de Dependencias) para asegurar el mantenimiento y la escalabilidad.

### III. Arquitectura Limpia (Clean Architecture)
El proyecto DEBE organizarse siguiendo los principios de Clean Architecture. Las capas deben estar estrictamente separadas (Dominio, Casos de Uso, Interfaces/Adaptadores, Infraestructura) y las dependencias deben apuntar hacia adentro.

### IV. DRY y YAGNI
- **DRY (No te repitas)**: Evita la duplicación de código abstrayendo la lógica compartida.
- **YAGNI (No lo vas a necesitar)**: No agregues funcionalidad hasta que se considere necesaria. Mantén el código fuente simple y enfocado en los requisitos actuales.

## Restricciones Técnicas

### Convenciones de Nombres
Todos los nombres DEBEN seguir estrictamente `PascalCase` para componentes, clases, archivos (donde aplique) y estructuras relevantes.

### Dependencias
El uso de **librerías externas está estrictamente prohibido**. Toda funcionalidad debe ser implementada utilizando capacidades nativas o código propio de la casa.

### Integración de IA (Copilot)
La integración por defecto y requerida para flujos de Spec Kit en este repositorio DEBE ser `copilot`.
Los artefactos de especificación, planificación y tareas DEBEN mantenerse compatibles con instrucciones
ubicadas en `.github/copilot-instructions.md`.

## Seguridad y Validación

### Validación de Entradas
Todas las entradas de los usuarios DEBEN ser validadas rigurosamente antes de ser procesadas para prevenir inyecciones y asegurar la integridad de los datos.

### Autenticación
Todas las rutas protegidas DEBEN requerir autenticación antes de conceder acceso. El acceso no autorizado debe ser rechazado explícitamente.

## Gobernanza

Las modificaciones requieren documentación y aprobación. Todos los pull requests y revisiones de código DEBEN verificar el cumplimiento de estos principios centrales y restricciones técnicas.
Toda propuesta que altere la integración de IA (por ejemplo, cambiar de `copilot` a otra) DEBE:
1. Actualizar esta constitución y los templates afectados.
2. Justificar impacto en flujo, calidad y mantenibilidad.
3. Incrementar versión semántica según el alcance del cambio.

**Versión**: 1.1.0 | **Ratificada**: 2026-06-03 | **Última Modificación**: 2026-06-08
