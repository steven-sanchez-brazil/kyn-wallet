<!-- SYNC IMPACT REPORT
Version change: 1.0.1 -> 2.0.0
Modified principles:
- I. Desarrollo Guiado por Pruebas (TDD) -> I. TDD Obligatorio para Funcionalidades Criticas
- II. Principios SOLID -> II. SOLID para Desacoplamiento Real
- III. Arquitectura Limpia (Clean Architecture) -> III. Clean Architecture por Capas
- IV. DRY y YAGNI -> IV. DRY y V. YAGNI (principios separados y testables)
- Convenciones de Nombres -> VI. Convencion de Nombres para React
- Dependencias -> VII. Dependencias con Justificacion Tecnica Explicita
- Validación de Entradas -> VIII. Validacion Exhaustiva de Entradas
- Autenticación -> IX. Rutas Protegidas con Autenticacion Obligatoria
Added sections:
- X. Simplicidad, Legibilidad y Alineacion Tecnologica
- XI. Documentacion SDD en Espanol
- Reglas Operativas de Arquitectura y Calidad
- Flujo de Trabajo y Calidad
Removed sections:
- Ninguna
Templates requiring updates:
- ✅ updated: .specify/templates/plan-template.md
- ✅ updated: .specify/templates/spec-template.md
- ✅ updated: .specify/templates/tasks-template.md
- ✅ updated: README.md
Follow-up TODOs:
- None
-->
# Constitución de kyn-wallet

## Principios Centrales

### I. TDD Obligatorio para Funcionalidades Criticas
Para toda funcionalidad critica, las pruebas DEBEN escribirse y fallar antes de
implementar codigo productivo. El flujo obligatorio es Rojo-Verde-Refactorizar.
Rationale: reduce regresiones y asegura comportamiento verificable desde el diseño.

### II. SOLID para Desacoplamiento Real
Componentes, servicios y modulos DEBEN aplicar SOLID para mantener bajo acoplamiento,
alta cohesion y facilidad de evolucion. Rationale: cambios aislados reducen riesgo y
coste de mantenimiento.

### III. Clean Architecture por Capas
El codigo DEBE separarse al menos en UI, componentes, logica de negocio y utilidades,
con dependencias apuntando hacia capas internas. Rationale: protege el dominio frente a
detalles de framework y facilita pruebas.

### IV. DRY
La logica duplicada DEBE consolidarse mediante abstracciones reutilizables cuando la
duplicacion sea real y estable. Rationale: evita errores divergentes y simplifica cambios.

### V. YAGNI
No se DEBE implementar funcionalidad que no este requerida por el alcance actual.
Rationale: reduce complejidad accidental y acelera entregas con foco en valor.

### VI. Convencion de Nombres para React
Los componentes React DEBEN nombrarse en `PascalCase` en codigo y archivos relacionados.
Rationale: mejora consistencia, descubribilidad y mantenimiento.

### VII. Dependencias con Justificacion Tecnica Explicita
No se DEBEN incorporar nuevas librerias externas salvo justificacion tecnica explicita,
documentada en spec/plan y aprobada en revision. Rationale: controla superficie de riesgo,
deuda tecnica y costos de actualizacion.

### VIII. Validacion Exhaustiva de Entradas
Toda entrada de usuario DEBE validarse antes de cualquier procesamiento o persistencia.
Rationale: protege integridad de datos y reduce vulnerabilidades.

### IX. Rutas Protegidas con Autenticacion Obligatoria
Toda ruta protegida DEBE exigir autenticacion y negar acceso no autorizado de forma
explicita. Rationale: preserva confidencialidad y control de acceso.

### X. Simplicidad, Legibilidad y Alineacion Tecnologica
El codigo DEBE mantenerse simple, legible y testeable, alineado con Next.js, React y
Tailwind CSS, evitando patrones innecesariamente complejos. Rationale: optimiza velocidad
de desarrollo y calidad sostenida.

### XI. Documentacion SDD en Espanol
Toda documentacion generada por el flujo SDD (spec.md, plan.md, tasks.md y derivados)
DEBE redactarse en espanol. Rationale: unifica comunicacion del equipo y reduce ambiguedad.

## Reglas Operativas de Arquitectura y Calidad

- Las decisiones arquitectonicas DEBEN justificarse contra estos principios en cada plan.
- Cualquier excepcion DEBE documentar motivo, alcance, fecha de expiracion y responsable.
- Cada cambio en capas o dependencias DEBE incluir impacto en pruebas.

## Flujo de Trabajo y Calidad

- Todo PR DEBE evidenciar cumplimiento de TDD en funcionalidades criticas.
- Todo PR DEBE incluir evidencia de validacion de entradas y control de acceso cuando aplique.
- Toda nueva dependencia externa DEBE incluir justificacion tecnica explicita y alternativa
  descartada.
- Todo artefacto SDD creado o actualizado DEBE estar en espanol.

## Gobernanza

Esta constitucion prevalece sobre practicas informales del proyecto.

Proceso de enmienda:
- Propuesta documentada en pull request con seccion de impacto.
- Aprobacion explicita de mantenedores del proyecto.
- Plan de migracion cuando exista impacto sobre procesos o artefactos vigentes.

Politica de versionado de la constitucion:
- MAJOR: cambios incompatibles o redefinicion de principios obligatorios.
- MINOR: nuevos principios o expansiones normativas.
- PATCH: aclaraciones editoriales sin cambio normativo.

Revisiones de cumplimiento:
- Toda revision de codigo DEBE verificar esta constitucion.
- Al cierre de cada feature, plan y tasks DEBEN validarse contra estos principios.

**Versión**: 2.0.0 | **Ratificada**: 2026-06-03 | **Última Modificación**: 2026-06-05
