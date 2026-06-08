# Sync Impact Report
<!--
Version change: [CONSTITUTION_VERSION] -> 1.0.0
Modified principles:
- [PRINCIPLE_1_NAME] -> TestFirstTDD
- [PRINCIPLE_2_NAME] -> SOLIDDesign
- [PRINCIPLE_3_NAME] -> CleanArchitecture
- [PRINCIPLE_4_NAME] -> DRYAndYAGNI
- [PRINCIPLE_5_NAME] -> SecurityAndValidation
Added sections:
- ConstraintsAndSecurity, DevelopmentWorkflow
Removed sections:
- none
Templates requiring updates:
- .specify/templates/plan-template.md: ⚠ pending
- .specify/templates/spec-template.md: ⚠ pending
- .specify/templates/tasks-template.md: ⚠ pending
Follow-up TODOs:
- RATIFICATION_DATE: TODO(RATIFICATION_DATE): specify initial ratification date
-->

# Hello Login Spec Kit Constitution

## Core Principles

### TestFirstTDD
TDD is MANDATORY: escribir pruebas primero (unitarias → integración → contrato). Seguir el ciclo Rojo-Verde-Refactor y mantener tests legibles y deterministas. Antes de cambiar comportamiento, agregar pruebas que fallen.

### SOLIDDesign
Aplicar los principios SOLID para diseñar componentes mantenibles y desacoplados. Fomentar `SingleResponsibility`, `OpenClosed`, `LiskovSubstitution`, `InterfaceSegregation` y `DependencyInversion` en todos los módulos.

### CleanArchitecture
Organizar el proyecto siguiendo Clean Architecture: capas claramente separadas (Entidades, Casos de Uso, Interfaces, Infraestructura). Dependencias dirigidas hacia el núcleo de negocio; la lógica de negocio no debe depender de frameworks ni detalles de infraestructura.

### DRYAndYAGNI
Evitar duplicación (DRY): extraer comportamientos repetidos en abstracciones reutilizables. Aplicar YAGNI: no implementar funcionalidad hasta que una prueba o requerimiento la necesite.

### SecurityAndValidation
Validación de entradas: todas las entradas del usuario deben validarse explícitamente en la capa de borde. Las rutas/procedimientos protegidos requieren autenticación y autorización comprobable antes de ejecutar la lógica.

## ConstraintsAndSecurity

- Convención de nombres: PascalCase para nombres públicos (clases, funciones, módulos, tests). Internos pueden usar lowerCamelCase si el lenguaje lo recomienda.
- No se deben utilizar librerías externas; implementar utilidades necesarias dentro del repositorio.
- Validación: cada capa de entrada debe validar formatos, tamaños y tipos; rechazar y testear entradas inválidas.
- Rutas protegidas: cualquier endpoint marcado como protegido exige autenticación; los tests deben cubrir intentos de acceso no autorizado.

## DevelopmentWorkflow

- Ciclo TDD obligatorio: los tests deben existir y fallar antes de implementar la funcionalidad.
- Escribir tests unitarios para la lógica de negocio y tests de integración para flujos y rutas protegidas.
- Las PRs deben incluir: pruebas nuevas, cambios de diseño justificados (si hay violación a SOLID), y evidencia de que no se han introducido dependencias externas.
- Revisión de código: verificar cumplimiento de SOLID, Clean Architecture, DRY, YAGNI y la convención de nombres.

## Governance

La constitución define prácticas no negociables para el proyecto. Enmiendas requieren: propuesta documentada, aprobación por mantenedores, y plan de migración para código existente.

- Compliance: las PRs deben pasar la puerta de pruebas (unitarias + integración) y recibir revisión que confirme las reglas de arquitectura.
- Versionado constitucional: seguir SemVer para la constitución. Cambios mayores (MAJOR) rompen compatibilidad con principios; MINOR agrega principios o secciones; PATCH son clarificaciones menores.

**Version**: 1.0.0 | **Ratified**: TODO(RATIFICATION_DATE): specify initial adoption date | **Last Amended**: 2026-06-04

