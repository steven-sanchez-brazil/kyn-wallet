# Especificación de Funcionalidad: Actualización de Login con Diseño Figma

**Feature Branch**: `002-login-spec-update`  
**Creado**: 2026-06-04  
**Estado**: Borrador
### Detalle de la Entrada

**Objetivo**: Actualizar la especificación de la pantalla de Login de KynWallet para que su identidad visual (colores, tipografía y estructura del formulario) coincida fielmente con el diseño de alta fidelidad definido en Figma, manteniendo el flujo de autenticación funcional.

**Fuente de diseño (Figma)**:

- **Archivo**: "Billetera Virtual - Prototipos".
- **Frame de referencia**: Login (`node-id=2-2`).
- **Enlace**: https://www.figma.com/design/f7uDsv8sh6ZOtK2OitTqtg/Billetera-Virtual---Prototipos?node-id=2-2&t=tZepRnS4l8ITDqOs-4
- **Método de extracción**: El contexto de diseño DEBE obtenerse mediante el MCP de Figma para asegurar valores exactos (códigos de color, pesos tipográficos, radios de borde, espaciados y disposición), evitando estimaciones manuales.

**Alcance de la actualización**:

- **Incluye**: Fidelidad visual del Login (Panel de Marca y Panel de Formulario), tokens de diseño (colores, tipografía Inter, radios de borde), estructura del formulario (campos, botón principal, elementos secundarios), y la validación de entradas y el flujo de autenticación hacia la pantalla protegida de éxito.
- **No incluye**: La implementación funcional completa de los accesos sociales (Google/Apple) ni la recuperación de contraseña, que permanecen como elementos visuales con aviso "Funcionalidad próximamente" en esta fase.

**Contexto y restricciones clave**:

- La pantalla de Login es el punto de entrada de la aplicación; su fidelidad visual refuerza la confianza del usuario.
- La actualización DEBE cumplir los Principios Centrales de la Constitución de KynWallet (v1.1.0): TDD, SOLID, Arquitectura Limpia, DRY/YAGNI, nombres en `PascalCase`, prohibición de librerías externas, validación rigurosa de entradas y autenticación de rutas protegidas.

**Resultado esperado**: Una especificación actualizada y verificable cuyos requisitos funcionales y criterios de éxito reflejen tanto la fidelidad visual con el frame de Figma como las garantías de validación y autenticación exigidas por la constitución.

## Escenarios de Usuario y Pruebas *(obligatorio)*

### Historia de Usuario 1 - Autenticación Exitosa (Prioridad: P1)

Como usuario registrado, quiero ingresar mi correo y contraseña válidos en un formulario que refleje la identidad visual de KynWallet para acceder a mi cuenta.

**Por qué esta prioridad**: Es el flujo crítico de entrada. La identidad visual genera confianza y profesionalismo.

**Prueba Independiente**: Se puede probar verificando que al ingresar credenciales correctas (ej. tucorreo@ejemplo.com / 12345678), el sistema redirige a la pantalla de "En construcción" y que la UI coincide con los colores brand (#ff6b3d) y tipografía Inter.

**Escenarios de Aceptación**:

1. **Dado** que el usuario está en la pantalla de Login, **Cuando** ingresa un correo y contraseña válidos y presiona "Iniciar sesión", **Entonces** el sistema valida los datos y lo redirige a la pantalla de éxito.
2. **Dado** que el usuario visualiza el panel izquierdo, **Cuando** observa la marca, **Entonces** debe ver el degradado naranja y la tarjeta de mockup con los datos de "STEVEN LUNA" y el logo de "KynWallet".

---

### Historia de Usuario 2 - Retroalimentación de Diseño y Validaciones (Priority: P2)

Como usuario, quiero que los campos de entrada y botones tengan el estilo visual definido en Figma (bordes redondeados de 12px, colores neutros específicos) para tener una experiencia coherente.

**Por qué esta prioridad**: La consistencia visual es clave para la usabilidad y la percepción de calidad del producto.

**Prueba Independiente**: Inspección visual de los elementos: radio de borde de 12px en inputs y botón principal, color de texto #16182c para encabezados.

**Escenarios de Aceptación**:

1. **Dado** que el usuario interactúa con los inputs, **Cuando** el campo está vacío o tiene un formato inválido, **Entonces** el sistema debe mostrar una validación visual que respete el estilo del formulario.
2. **Dado** que el usuario ve el botón de "Iniciar sesión", **Cuando** lo presiona, **Entonces** debe tener el color de fondo #ff6b3d y texto blanco en SemiBold.

---

### Historia de Usuario 3 - Interacción con Elementos Secundarios (Priority: P3)

Como usuario, quiero ver las opciones de "Recordarme", "¿Olvidaste tu contraseña?" y los accesos sociales (Google/Apple) con el diseño de Figma, aunque su funcionalidad sea limitada en esta fase.

**Por qué esta prioridad**: Completa la interfaz visual según el prototipo de alta fidelidad.

**Prueba Independiente**: Verificación de la presencia del divisor "o continúa con" y los botones sociales con borde de 1.5px color #d7d9e6.

**Escenarios de Aceptación**:

1. **Dado** que el usuario ve la sección de redes sociales, **Cuando** hace clic en Google o Apple, **Entonces** el sistema muestra un aviso de "Funcionalidad próximamente".

---

### Casos Extremos

- ¿Cómo se comporta el degradado del panel izquierdo en pantallas con relaciones de aspecto muy anchas o muy estrechas?
- ¿Qué sucede si el usuario intenta ingresar una contraseña de menos de 8 caracteres (según los puntos del mockup)?

## Requisitos *(obligatorio)*

### Restricciones de Seguridad y Validación *(obligatorio)*

Esta funcionalidad DEBE cumplir los Principios Centrales de la Constitución de KynWallet (v1.1.0). Las siguientes restricciones son verificables en revisión:

- **Validación de entradas (Principio VII)**: TODAS las entradas del usuario (correo, contraseña y cualquier dato de formulario) DEBEN validarse rigurosamente en la frontera de la aplicación ANTES de procesarse, verificando obligatoriedad, tipo, formato y longitud. Las entradas inválidas DEBEN rechazarse con un mensaje claro, sin procesarse ni persistirse.
- **Autenticación de rutas protegidas (Principio VIII)**: El acceso a la pantalla de éxito ("En construcción") y a cualquier vista posterior DEBE requerir una sesión autenticada. El acceso no autenticado DEBE rechazarse explícitamente (redirección a Login), nunca degradarse de forma silenciosa.
- **Sin librerías externas (Principio VI)**: El uso de librerías externas de terceros para la UI o la lógica está estrictamente prohibido. Toda funcionalidad DEBE implementarse con capacidades nativas de la plataforma o código propio.
- **Convención de nombres (Principio V)**: Las estructuras relevantes (componentes, clases, tipos, interfaces y archivos que las exporten) DEBEN nombrarse en `PascalCase`.

### Restricciones de Calidad y Diseño *(obligatorio)*

- **TDD (Principio I)**: El comportamiento de esta funcionalidad DEBE desarrollarse con pruebas escritas antes del código (ciclo Rojo-Verde-Refactorización); cada comportamiento nuevo o modificado DEBE incluir su prueba en el mismo cambio.
- **SOLID y Arquitectura Limpia (Principios II y III)**: La lógica de autenticación y validación DEBE residir fuera de los componentes de UI, separada en las capas correspondientes (Dominio/Casos de Uso/Adaptadores), con dependencias apuntando hacia adentro mediante abstracciones.
- **DRY y YAGNI (Principio IV)**: La lógica de validación reutilizable DEBE tener una única representación autoritativa; NO se DEBE añadir funcionalidad ni abstracciones que no respondan a un requisito explícito de esta especificación.

### Requisitos Funcionales

- **FR-001**: El sistema DEBE implementar un diseño de pantalla dividida: Panel de Marca (Brand Panel) a la izquierda y Panel de Formulario (Form Panel) a la derecha.
- **FR-002**: El **Brand Panel** DEBE tener un fondo con gradiente lineal de 121.19° desde `rgb(255, 138, 101)` hasta `rgb(239, 82, 38)`.
- **FR-003**: El sistema DEBE usar la tipografía **Inter** en sus variantes Bold, SemiBold, Medium y Regular según se especifica en el diseño.
- **FR-004**: El **Formulario** DEBE incluir campos de "Correo electrónico" y "Contraseña" con bordes redondeados de 12px y color de borde `#d7d9e6`.
- **FR-005**: El botón de "Iniciar sesión" DEBE tener el color `#ff6b3d`, texto blanco SemiBold de 16px y bordes redondeados de 12px.
- **FR-006**: Los encabezados DEBEN usar el color `#16182c` (Neutral 900) y los textos secundarios el color `#8a8ca8` (Neutral 500).
- **FR-007**: El sistema DEBE incluir un mockup de tarjeta (Card Mockup) en el panel izquierdo con fondo `rgba(255, 255, 255, 0.16)` y borde `rgba(255, 255, 255, 0.35)`.
- **FR-008**: El sistema DEBE mostrar opciones de acceso social (Google, Apple) con bordes de 1.5px color `#d7d9e6`.
- **FR-009**: El sistema DEBE validar que el correo electrónico tenga un formato válido antes de procesar el acceso, mostrando un mensaje inline cuando no lo sea.
- **FR-010**: El sistema DEBE validar que la contraseña tenga un mínimo de 8 caracteres antes de procesar el acceso, mostrando un mensaje inline cuando no se cumpla.
- **FR-011**: Cuando exista al menos un error de validación, el sistema NO DEBE procesar el acceso y DEBE conservar la información ya ingresada por el usuario.
- **FR-012**: Ante credenciales válidas, el sistema DEBE establecer una sesión autenticada y redirigir a la pantalla protegida de éxito ("En construcción").
- **FR-013**: La pantalla de éxito ("En construcción") y cualquier vista protegida DEBEN requerir una sesión autenticada; el acceso sin autenticación DEBE rechazarse explícitamente redirigiendo a la pantalla de Login.

### Entidades Clave

- **AuthCredentials**: Representa los datos de acceso del usuario. Atributos: `Email`, `Password`.
- **UIStyles**: Definición de los tokens de diseño (colores, espaciados, bordes) extraídos de Figma.

## Criterios de Éxito *(obligatorio)*

### Resultados Medibles

- **SC-001**: La interfaz del Login coincide visualmente en un 95% con el diseño de Figma proporcionado (disposición, colores y tipografía).
- **SC-002**: El formulario es funcional y permite el acceso con las credenciales hardcodeadas en menos de 2 segundos de procesamiento.
- **SC-003**: Todos los elementos de entrada (inputs, checkbox, botones) tienen el radio de borde de 12px (o 6px para el checkbox de Recordarme) según el diseño.
- **SC-004**: El 100% de los intentos de acceso con datos inválidos (correo mal formado o contraseña con menos de 8 caracteres) son bloqueados y muestran el mensaje inline correspondiente, conservando los datos ingresados.
- **SC-005**: El 100% de los intentos de acceder a la pantalla protegida sin una sesión autenticada son rechazados y redirigidos a la pantalla de Login.

## Suposiciones

- Se asume que el usuario tiene instalada la fuente "Inter" o que el sistema la cargará como recurso local.
- Los activos visuales (logo, iconos sociales) se simularán mediante elementos CSS o placeholders si no están disponibles como archivos individuales.
- El panel de marca ocupa un ancho fijo de 620px en la resolución de diseño (1440x1024), escalando proporcionalmente o manteniendo su estructura.
- Las interacciones sociales y de recuperación de contraseña son meramente visuales para esta versión.
