<!-- SYNC IMPACT REPORT
Version change: 1.0.1 -> 1.1.0
Bump rationale: MINOR. Se amplían y clarifican materialmente los principios y
restricciones, dotándolos de reglas concretas, verificables y accionables. No se
elimina ni redefine ningún principio de forma incompatible (no aplica MAJOR); el
cambio va más allá de simples correcciones de redacción (no aplica PATCH).
Modified principles:
- I. Desarrollo Guiado por Pruebas (TDD): añadidas reglas verificables del ciclo
  Rojo-Verde-Refactorización y rationale.
- II. Principios SOLID: enumeradas reglas concretas por cada letra de SOLID.
- III. Arquitectura Limpia: definidas las 4 capas, la regla de dependencia hacia
  adentro y prohibiciones explícitas de acoplamiento.
- IV. DRY y YAGNI: criterios verificables de duplicación y de alcance.
- V. Convenciones de Nombres (PascalCase): alcance explícito y excepciones.
- VI. Prohibición de Dependencias Externas: definición de "nativo" y excepciones
  permitidas (toolchain de build/test).
- VII. Validación Rigurosa de Entradas: reglas de validación en frontera.
- VIII. Autenticación de Rutas Protegidas: rechazo explícito de accesos no
  autorizados.
Added sections:
- Reestructuración: las restricciones técnicas, de seguridad y validación se
  promueven a Principios Centrales numerados (V-VIII) para hacerlas enforceable.
Removed sections:
- N/A (el contenido previo se conserva y se refuerza).
Templates requiring updates:
- .specify/templates/plan-template.md (✅ actualizado: "Constitution Check" ahora
  lista los gates derivados de los 8 principios).
- .specify/templates/spec-template.md (✅ revisado: sin cambios necesarios;
  agnóstico de implementación y compatible).
- .specify/templates/tasks-template.md (✅ revisado: sin cambios necesarios; el
  flujo TDD y de validación ya es compatible con los principios).
- .specify/templates/constitution-template.md (✅ revisado: plantilla base, sin
  cambios necesarios).
- .specify/extensions/git/commands/*.md (✅ revisado: sin referencias en conflicto).
Follow-up TODOs: None
-->
# Constitución de KynWallet

## Principios Centrales

### I. Desarrollo Guiado por Pruebas (TDD)
Las pruebas DEBEN escribirse antes que el código de producción. El ciclo
Rojo-Verde-Refactorización se aplica de forma estricta y verificable:

- **Rojo**: ANTES de implementar cualquier comportamiento, DEBE existir una prueba
  (Vitest/React Testing Library) que falle por la ausencia de ese comportamiento.
- **Verde**: Se escribe el mínimo código necesario para que la prueba pase. NO se
  añade lógica no cubierta por una prueba.
- **Refactorización**: Solo se refactoriza con la suite en verde; tras refactorizar,
  todas las pruebas DEBEN seguir pasando.
- Todo Pull Request que introduzca o modifique comportamiento DEBE incluir las
  pruebas correspondientes en el mismo cambio. Un PR con código de producción nuevo
  sin pruebas asociadas DEBE rechazarse.

**Justificación**: TDD garantiza diseño verificable, cobertura por construcción y
regresiones detectadas de inmediato, evitando código no probado en producción.

### II. Principios SOLID
El código DEBE adherirse a los cinco principios SOLID con reglas concretas:

- **S (Responsabilidad Única)**: Cada módulo, componente, hook o clase DEBE tener una
  única razón de cambio. Un componente de UI NO DEBE contener lógica de negocio ni
  acceso a infraestructura.
- **O (Abierto/Cerrado)**: La extensión de comportamiento DEBE lograrse añadiendo
  código (composición, nuevas implementaciones), no modificando contratos estables.
- **L (Sustitución de Liskov)**: Toda implementación de una interfaz/tipo DEBE ser
  intercambiable sin romper a sus consumidores ni debilitar contratos.
- **I (Segregación de Interfaces)**: Los tipos e interfaces DEBEN ser específicos del
  consumidor; se prohíben interfaces "ancho de banda" que obligan a depender de
  métodos no usados.
- **D (Inversión de Dependencias)**: Las capas de alto nivel DEBEN depender de
  abstracciones (tipos/interfaces), no de implementaciones concretas. Las
  dependencias concretas se inyectan, no se importan directamente en el dominio.

**Justificación**: SOLID sostiene la mantenibilidad y escalabilidad y es prerrequisito
para que la Arquitectura Limpia (Principio III) sea aplicable.

### III. Arquitectura Limpia (Clean Architecture)
El proyecto DEBE organizarse en cuatro capas estrictamente separadas, con la regla de
dependencia apuntando siempre hacia adentro:

1. **Dominio**: Entidades y reglas de negocio puras. NO DEBE importar de ninguna otra
   capa, de React, de Next.js ni de infraestructura.
2. **Casos de Uso**: Orquesta el dominio para cumplir una intención. Depende solo del
   Dominio mediante abstracciones.
3. **Interfaces/Adaptadores**: Componentes React, formularios, servicios y mapeadores
   que traducen entre el exterior y los Casos de Uso.
4. **Infraestructura**: Detalles concretos (almacenamiento, fetch nativo, App Router).

Reglas verificables:

- Una capa interna NUNCA DEBE importar de una capa externa. Las dependencias cruzan la
  frontera solo a través de abstracciones definidas en la capa interna.
- El Dominio y los Casos de Uso DEBEN ser testables sin renderizar UI ni levantar
  infraestructura.
- Cualquier violación del sentido de dependencia DEBE rechazarse en revisión de código.

**Justificación**: Aísla las reglas de negocio de los detalles tecnológicos,
permitiendo evolucionar la infraestructura sin reescribir el núcleo.

### IV. DRY y YAGNI
- **DRY (No te repitas)**: El conocimiento DEBE tener una única representación
  autoritativa. La duplicación significativa de lógica (no de mera coincidencia
  textual) DEBE extraerse a una abstracción compartida. Se prohíbe copiar y pegar
  lógica de validación, mapeo o negocio.
- **YAGNI (No lo vas a necesitar)**: NO se implementa funcionalidad, parámetros,
  capas de abstracción ni configuración que no respondan a un requisito actual y
  explícito. La abstracción especulativa DEBE rechazarse.

**Justificación**: Mantiene el código mínimo, enfocado y libre de complejidad
accidental; el equilibrio DRY/YAGNI evita tanto la duplicación como la
sobre-ingeniería.

### V. Convenciones de Nombres (PascalCase)
Los nombres DEBEN seguir `PascalCase` de forma consistente para las estructuras
relevantes del proyecto:

- Componentes React, clases, tipos, interfaces y enums: `PascalCase`.
- Archivos que exportan un componente/clase/tipo como artefacto principal:
  `PascalCase` (p. ej. `RegisterForm.tsx`, `AuthService.ts`).
- Se permite el uso idiomático de `camelCase` para variables, funciones y hooks
  (`useAuth`), y `SCREAMING_SNAKE_CASE` para constantes globales inmutables, ya que no
  son "estructuras" en el sentido de este principio.
- Nombres ambiguos o inconsistentes con esta convención DEBEN corregirse antes del
  merge.

**Justificación**: La consistencia de nombres reduce la carga cognitiva y hace
predecible la navegación del código.

### VI. Prohibición de Dependencias Externas
El uso de librerías externas de terceros en el código de producción está
**estrictamente prohibido**. Toda funcionalidad DEBE implementarse con capacidades
nativas o código propio.

- "Nativo" comprende: APIs estándar de TypeScript/JavaScript, APIs web del navegador,
  y las capacidades base del framework ya presente (Next.js 14 App Router, React,
  Tailwind CSS) que constituyen la plataforma del proyecto.
- Se prohíbe añadir nuevas dependencias de runtime a `package.json` para resolver
  lógica de negocio, validación, fechas, estado o utilidades.
- Excepción acotada: el toolchain de desarrollo/build/test ya adoptado (TypeScript,
  Vitest, React Testing Library, Tailwind/PostCSS) es parte de la plataforma y NO
  constituye una "librería externa" en el sentido de esta restricción. Cualquier nueva
  herramienta de build/test requiere enmienda explícita de esta constitución.
- Cualquier PR que introduzca una nueva dependencia de runtime DEBE rechazarse salvo
  enmienda previa de esta constitución.

**Justificación**: Minimiza superficie de ataque, riesgo de cadena de suministro y
deuda de dependencias, y fuerza la comprensión profunda de la plataforma.

### VII. Validación Rigurosa de Entradas
TODAS las entradas de usuario DEBEN validarse rigurosamente ANTES de ser procesadas:

- Toda entrada (formularios, parámetros de ruta, query strings, datos provenientes de
  almacenamiento del cliente) DEBE validarse en la frontera de la aplicación antes de
  alcanzar Casos de Uso o Dominio.
- La validación DEBE verificar, según corresponda: presencia/obligatoriedad, tipo,
  formato, longitud y rango. Las entradas inválidas DEBEN rechazarse con un mensaje de
  error claro, sin procesar ni persistir el dato.
- La lógica de validación reutilizable DEBE residir en utilidades dedicadas (p. ej.
  `lib/utils/Validation.ts`) y estar cubierta por pruebas (Principio I).
- NUNCA se DEBE confiar en datos del cliente sin validar.

**Justificación**: Previene inyecciones, corrupción de datos y estados inconsistentes,
protegiendo la integridad del sistema en su frontera.

### VIII. Autenticación de Rutas Protegidas
Todas las rutas protegidas DEBEN requerir autenticación antes de conceder acceso:

- Cada ruta o vista que exponga datos o acciones sensibles DEBE verificar la sesión
  autenticada del usuario antes de renderizar contenido o ejecutar la acción.
- El acceso no autorizado DEBE rechazarse explícitamente (redirección a login o
  respuesta de no autorizado); NUNCA se DEBE degradar silenciosamente a un estado
  parcialmente accesible.
- La clasificación de una ruta como "protegida" o "pública" DEBE ser explícita y
  estar cubierta por pruebas que verifiquen el rechazo de accesos no autenticados.

**Justificación**: Garantiza que el control de acceso sea explícito, auditable y
verificable, evitando fugas por omisión.

## Gobernanza

Esta constitución es la autoridad máxima sobre las prácticas de desarrollo de
KynWallet y prevalece sobre cualquier convención no documentada.

- **Procedimiento de enmienda**: Toda modificación requiere documentación del cambio,
  justificación y aprobación en revisión. Las excepciones a cualquier principio (por
  ejemplo, añadir una dependencia bajo el Principio VI) requieren enmienda explícita de
  este documento antes de implementarse.
- **Política de versionado (SemVer)**:
  - **MAJOR**: Eliminación o redefinición incompatible de principios o gobernanza.
  - **MINOR**: Adición de un principio/sección o expansión material de la guía.
  - **PATCH**: Aclaraciones, correcciones de redacción y refinamientos no semánticos.
- **Cumplimiento**: Todos los Pull Requests y revisiones de código DEBEN verificar el
  cumplimiento de los ocho Principios Centrales. Un cambio que viole un principio sin
  enmienda previa DEBE rechazarse.

**Versión**: 1.1.0 | **Ratificada**: 2026-06-03 | **Última Modificación**: 2026-06-09
