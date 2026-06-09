# Especificación de Funcionalidad: Registro de Usuarios

**Feature Branch**: `feature/registro-jp-fsabate`

**Creado**: 2026-06-09

**Estado**: Borrador

**Entrada**: Descripción del usuario: "Crear la especificación para la feature 'Registro de Usuarios' de KynWallet. Formulario con nombre completo, correo, contraseña y confirmar contraseña; checkbox de términos; botón 'Crear cuenta' con validación completa; botones Google y Apple con alert 'Próximamente'; link '¿Ya tienes cuenta? Inicia sesión' hacia /login; registro exitoso redirige a /login con mensaje de éxito; validaciones inline; responsive (desktop 2 paneles, mobile solo formulario). La pantalla principal `/` debe mostrar Registro y el login existente queda en /login. Contexto visual extraído del frame Figma '04 · Registro'."

## Escenarios de Usuario y Pruebas *(obligatorio)*

<!--
  Las historias están priorizadas como recorridos de usuario ordenados por importancia.
  Cada historia es INDEPENDIENTEMENTE PROBABLE y entrega valor por sí sola.
-->

### Historia de Usuario 1 - Crear una cuenta nueva (Prioridad: P1)

Como persona nueva en KynWallet, quiero completar un formulario con mi nombre completo, correo electrónico, contraseña y confirmación de contraseña, aceptar los términos y condiciones, y presionar "Crear cuenta" para registrarme y comenzar a usar la billetera.

**Por qué esta prioridad**: Es el flujo central de la funcionalidad. Sin la creación exitosa de la cuenta, la feature no entrega valor. Representa el MVP mínimo viable.

**Prueba Independiente**: Se puede probar de forma aislada ingresando datos válidos en los cuatro campos, marcando el checkbox de términos y presionando "Crear cuenta"; el sistema debe redirigir a `/login` mostrando un mensaje de éxito visible.

**Escenarios de Aceptación**:

1. **Dado** que la persona está en la pantalla principal de Registro (`/`), **Cuando** ingresa nombre completo, correo válido, contraseña de al menos 8 caracteres, una confirmación idéntica y marca el checkbox de términos, **Y** presiona "Crear cuenta", **Entonces** el sistema procesa el registro y redirige a `/login` mostrando un mensaje de éxito visible.
2. **Dado** que el registro fue exitoso, **Cuando** la persona llega a `/login`, **Entonces** debe poder ver de forma clara la confirmación de que su cuenta fue creada.

---

### Historia de Usuario 2 - Validación inline de los datos del formulario (Prioridad: P1)

Como persona registrándome, quiero recibir mensajes de validación inmediatos y claros junto a cada campo cuando los datos sean inválidos, para corregir mis errores antes de enviar el formulario.

**Por qué esta prioridad**: La validación es indispensable para la integridad de los datos y para evitar registros inválidos. Está al mismo nivel crítico que la creación de cuenta porque "Crear cuenta" no debe enviar datos inválidos.

**Prueba Independiente**: Se puede probar dejando campos vacíos o ingresando datos inválidos (correo mal formado, contraseña corta, contraseñas que no coinciden, términos sin aceptar) y verificando que aparecen mensajes inline y que el envío se bloquea.

**Escenarios de Aceptación**:

1. **Dado** que un campo obligatorio está vacío, **Cuando** la persona intenta crear la cuenta, **Entonces** el sistema muestra un mensaje inline indicando que el campo es obligatorio y no envía el formulario.
2. **Dado** que el correo no tiene un formato válido, **Cuando** la persona intenta crear la cuenta, **Entonces** el sistema muestra un mensaje inline de correo inválido.
3. **Dado** que la contraseña tiene menos de 8 caracteres, **Cuando** la persona intenta crear la cuenta, **Entonces** el sistema muestra un mensaje inline indicando el mínimo requerido.
4. **Dado** que la contraseña y la confirmación no coinciden, **Cuando** la persona intenta crear la cuenta, **Entonces** el sistema muestra un mensaje inline indicando que las contraseñas no coinciden.
5. **Dado** que el checkbox de términos no está marcado, **Cuando** la persona intenta crear la cuenta, **Entonces** el sistema muestra un mensaje inline indicando que debe aceptar los términos y condiciones.
6. **Dado** que el correo ingresado ya corresponde a una cuenta registrada, **Cuando** la persona intenta crear la cuenta, **Entonces** el sistema muestra un mensaje inline ("Este correo ya está registrado") y no crea una cuenta duplicada.
7. **Dado** que existen uno o más errores de validación, **Cuando** la persona presiona "Crear cuenta", **Entonces** el formulario NO se envía y se conserva la información ya ingresada.

---

### Historia de Usuario 3 - Fidelidad visual con el diseño de Figma (Prioridad: P2)

Como persona usuaria, quiero que la pantalla de Registro refleje fielmente la identidad visual de KynWallet definida en el frame "04 · Registro", para tener una experiencia coherente y confiable.

**Por qué esta prioridad**: La consistencia visual refuerza la confianza y la percepción de calidad. Es importante pero secundaria respecto a la funcionalidad básica de registro y validación.

**Prueba Independiente**: Inspección visual comparando la pantalla con el diseño de Figma: degradado del panel de marca, tipografía Inter, colores, radios de borde y disposición de los elementos.

**Escenarios de Aceptación**:

1. **Dado** que la persona abre la pantalla de Registro en escritorio, **Cuando** observa el panel izquierdo, **Entonces** debe ver el degradado naranja de marca, el logo "KynWallet", el titular "Comienza tu camino financiero." y el mockup de tarjeta "Kyn Card".
2. **Dado** que la persona observa el formulario, **Cuando** revisa los campos, botones y enlaces, **Entonces** estos deben coincidir con los colores, tipografía Inter y radios de borde del diseño de Figma.

---

### Historia de Usuario 4 - Accesos secundarios y navegación (Prioridad: P3)

Como persona usuaria, quiero ver los botones de Google y Apple, y el enlace para iniciar sesión, para conocer las alternativas disponibles y poder ir al login si ya tengo cuenta.

**Por qué esta prioridad**: Completa la interfaz del prototipo de alta fidelidad. Su funcionalidad es limitada (avisos "Próximamente") y la navegación a login es complementaria al flujo principal.

**Prueba Independiente**: Verificación de que los botones Google/Apple muestran el aviso exacto "Próximamente" y de que el enlace "¿Ya tienes cuenta? Inicia sesión" navega a `/login`.

**Escenarios de Aceptación**:

1. **Dado** que la persona ve la sección de registro social, **Cuando** presiona el botón de Google o de Apple, **Entonces** el sistema muestra un aviso con el texto exacto "Próximamente".
2. **Dado** que la persona ya tiene una cuenta, **Cuando** presiona el enlace "Inicia sesión", **Entonces** el sistema la navega a la pantalla de Login (`/login`).
3. **Dado** que la persona presiona el enlace de "términos y condiciones", **Cuando** lo activa, **Entonces** el sistema reconoce la interacción sin abandonar el progreso del formulario.

---

### Casos Extremos

- ¿Qué sucede cuando la persona pega espacios en blanco al inicio o final del nombre o correo? El sistema debe normalizar/validar de forma consistente.
- ¿Cómo se comporta el formulario si la persona corrige un campo previamente inválido? El mensaje inline correspondiente debe desaparecer al cumplir la regla.
- ¿Qué ocurre si la confirmación de contraseña era correcta y luego se modifica la contraseña original? La validación de coincidencia debe reevaluarse.
- ¿Cómo se presenta la pantalla en mobile? Solo debe mostrarse el panel del formulario, ocultando el panel de marca.
- ¿Qué pasa si la persona presiona "Crear cuenta" repetidamente? El sistema no debe generar registros duplicados ni redirecciones múltiples inconsistentes.
- ¿Qué ocurre si el correo ingresado ya está registrado? El sistema debe detectarlo y mostrar un mensaje inline, sin crear una cuenta duplicada.

## Requisitos *(obligatorio)*

### Restricciones de Seguridad y Validación *(obligatorio)*

- **Restricción**: Todas las entradas de la persona usuaria DEBEN ser validadas rigurosamente antes de procesar el registro.
- **Restricción**: El uso de librerías externas para la UI o la lógica está estrictamente prohibido (capacidades nativas o código propio).
- **Restricción**: Se DEBE usar `PascalCase` para el nombramiento de las estructuras relevantes.
- **Restricción**: La validación de entradas DEBE prevenir el envío de datos inválidos o incompletos.

### Requisitos Funcionales

- **FR-001**: La pantalla principal (`/`) DEBE mostrar la funcionalidad de Registro de Usuarios.
- **FR-002**: El Login existente DEBE permanecer disponible y accesible en la ruta `/login`.
- **FR-003**: El formulario de registro DEBE incluir los campos: "Nombre completo", "Correo electrónico", "Contraseña" y "Confirmar contraseña".
- **FR-004**: El formulario DEBE incluir un checkbox de aceptación de "términos y condiciones".
- **FR-005**: El sistema DEBE proporcionar un botón "Crear cuenta" que valide todos los campos y el checkbox antes de enviar el formulario.
- **FR-006**: El sistema DEBE validar que el correo electrónico tenga un formato válido y mostrar un mensaje inline cuando no lo sea.
- **FR-007**: El sistema DEBE validar que la contraseña tenga un mínimo de 8 caracteres y mostrar un mensaje inline cuando no se cumpla.
- **FR-008**: El sistema DEBE validar que la contraseña y la confirmación coincidan, mostrando un mensaje inline cuando difieran.
- **FR-009**: El sistema DEBE validar que todos los campos obligatorios estén completos, mostrando un mensaje inline por cada campo vacío.
- **FR-010**: El sistema DEBE validar que el checkbox de términos esté marcado, mostrando un mensaje inline cuando no lo esté.
- **FR-011**: Cuando exista al menos un error de validación, el sistema NO DEBE enviar el formulario y DEBE conservar la información ya ingresada.
- **FR-012**: Ante un registro exitoso, el sistema DEBE redirigir a `/login` y mostrar un mensaje de éxito visible para la persona usuaria.
- **FR-013**: El sistema DEBE proporcionar botones de "Google" y "Apple" que, al ser presionados, muestren un aviso con el texto exacto "Próximamente".
- **FR-014**: El sistema DEBE incluir el enlace "¿Ya tienes cuenta? Inicia sesión" que navega a `/login`.
- **FR-015**: El sistema DEBE presentar un diseño responsive: en escritorio (ancho ≥ 1024px) se muestran dos paneles (Panel de Marca a la izquierda y Panel de Formulario a la derecha); por debajo de 1024px (tablet y mobile) se muestra únicamente el Panel de Formulario.
- **FR-016**: El Panel de Marca DEBE incluir un fondo con degradado lineal naranja (desde `rgb(255, 138, 101)` hasta `rgb(239, 82, 38)`), el logo "KynWallet", el titular "Comienza tu camino financiero.", el subtexto descriptivo y un mockup de tarjeta "Kyn Card".
- **FR-017**: El Panel de Formulario DEBE mostrar el encabezado "Crea tu cuenta" y el subtítulo "Completa tus datos para comenzar".
- **FR-018**: La pantalla DEBE usar la tipografía **Inter** en sus variantes (Bold, SemiBold, Medium, Regular) según el diseño.
- **FR-019**: Los campos de entrada DEBEN tener bordes redondeados de 12px y color de borde `#D7D9E6`; el checkbox DEBE tener bordes redondeados de 6px.
- **FR-020**: El botón "Crear cuenta" DEBE usar el color de marca `#FF6B3D`, con texto blanco SemiBold de 16px centrado y bordes redondeados de 12px.
- **FR-021**: Los encabezados DEBEN usar el color `#16182C`, las etiquetas de campo `#3D3F5C`, los textos secundarios `#8A8BA8` y los enlaces destacados (términos / iniciar sesión) `#EF5226`.
- **FR-022**: Los campos de contraseña DEBEN incluir un control para mostrar/ocultar el contenido ingresado (icono de ojo).
- **FR-023**: El sistema DEBE verificar que el correo electrónico no corresponda a una cuenta ya registrada; si ya existe, DEBE mostrar un mensaje inline ("Este correo ya está registrado") y NO DEBE crear una cuenta duplicada.

### Entidades Clave *(incluir si la funcionalidad involucra datos)*

- **RegisterCredentials**: Representa los datos capturados en el formulario de registro. Atributos: `FullName`, `Email`, `Password`, `ConfirmPassword`, `AcceptedTerms`.
- **ValidationResult**: Representa el resultado de validar el formulario. Atributos: estado de validez por campo y los mensajes inline asociados.
- **DesignTokens**: Definición de los tokens de diseño (colores, tipografía, espaciados, radios) extraídos del frame "04 · Registro" de Figma.

## Criterios de Éxito *(obligatorio)*

### Resultados Medibles

- **SC-001**: El 100% de los registros con datos válidos (nombre completo, correo válido, contraseña de 8+ caracteres, confirmación coincidente y términos aceptados) redirigen a `/login` mostrando un mensaje de éxito visible.
- **SC-002**: El 100% de los intentos de envío con al menos un dato inválido son bloqueados y muestran el mensaje inline correspondiente junto al campo afectado.
- **SC-003**: La pantalla de Registro coincide visualmente en al menos un 95% con el frame "04 · Registro" de Figma en cuanto a disposición, colores y tipografía.
- **SC-004**: El 100% de los elementos de entrada respetan los radios de borde del diseño (12px en inputs y botón principal, 6px en el checkbox).
- **SC-005**: En escritorio (ancho ≥ 1024px) se muestran los dos paneles; por debajo de 1024px (tablet y mobile, ancho < 1024px) se muestra únicamente el formulario, en el 100% de los casos evaluados.
- **SC-006**: Los botones de Google y Apple muestran el aviso con el texto exacto "Próximamente" en el 100% de las interacciones.
- **SC-007**: El enlace "Inicia sesión" navega a `/login` en el 100% de las interacciones.
- **SC-008**: Una persona usuaria puede completar el registro con datos válidos en menos de 2 minutos en su primer intento.

## Suposiciones

- Se asume que el registro es funcional con almacenamiento/simulación local sin integración con un backend externo, en línea con el alcance actual del proyecto.
- Se asume que la verificación de correo ya registrado (FR-023) se realiza contra los registros disponibles localmente, dado el alcance sin backend externo.
- Se asume que la fuente "Inter" está disponible localmente o se cargará como recurso del proyecto.
- Los accesos sociales (Google, Apple) y el enlace de "términos y condiciones" son visuales/limitados en esta fase; Google y Apple solo muestran el aviso "Próximamente".
- El mensaje de éxito tras el registro se muestra en la pantalla `/login` y es visible de forma inmediata al llegar.
- El Panel de Marca ocupa un ancho de referencia de 620px en la resolución de diseño (1440×1024), manteniendo su estructura al escalar en escritorio.
- Los activos visuales (logo, iconos sociales, icono de ojo) se simulan mediante elementos nativos/CSS o placeholders cuando no existan como archivos individuales.
- El umbral de cambio entre la vista de dos paneles y la vista mobile (solo formulario) se sitúa en un punto de quiebre estándar de tablet/mobile.
