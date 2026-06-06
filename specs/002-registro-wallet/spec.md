# Especificación de Funcionalidad: Pantalla de Registro de la Billetera Virtual

**Feature Branch**: `002-registro-wallet`  
**Creado**: 2026-06-06  
**Estado**: Borrador  
**Entrada**: "Construye la pantalla de registro de la billetera virtual. Para eso utiliza el MCP de Figma. Te comparto el frame: https://www.figma.com/design/f7uDsv8sh6ZOtK2OitTqtg/Billetera-Virtual---Prototipos?node-id=31-2 Una vez registrado el usuario, debe ser redirigido a una página en construcción."

> **Nota sobre la referencia visual**: La fuente de verdad visual es, **prioritariamente, el MCP de Figma** (frame `31:2`, archivo `f7uDsv8sh6ZOtK2OitTqtg`). Cuando el MCP de Figma no esté accesible (p. ej. por el límite de lectura mensual del plan *Starter* / asiento *View*, situación ocurrida durante la redacción), se usa como **referencia de respaldo la imagen del diseño adjuntada por el usuario**. El conjunto de campos, textos y elementos descritos en esta especificación se confirmó a partir de dicha imagen adjunta. Los tokens exactos (valores hex, espaciados, tipografía) **DEBERÍAN reverificarse contra Figma durante `/speckit-plan`** cuando se restablezca el acceso.

## Clarifications

### Session 2026-06-06

- Q: ¿Cuál es la fuente de referencia visual para construir la pantalla? → A: Prioritariamente el MCP de Figma; si falla, la imagen del diseño adjuntada por el usuario (usada y confirmada en esta sesión).
- Q: ¿Los campos, textos y elementos del frame de registro? → A: Confirmados vía imagen adjunta: campos Nombre completo, Correo electrónico, Contraseña y Confirmar contraseña (con toggle mostrar/ocultar), casilla "Acepto los términos y condiciones", botón "Crear cuenta", divisor "o regístrate con", accesos Google/Apple y enlace "¿Ya tienes cuenta? Inicia sesión".
- Q: ¿Aceptar los términos y condiciones es obligatorio para crear la cuenta? → A: Sí, es obligatorio; el registro no procede si la casilla no está marcada.
- Q: ¿El sistema debe validar que el correo no esté ya registrado (persistencia simulada)? → A: Sí; se valida contra una lista simulada y se muestra un error si el correo ya existe.

## Escenarios de Usuario y Pruebas *(obligatorio)*

### Historia de Usuario 1 - Registro Exitoso de un Nuevo Usuario (Prioridad: P1)

Como persona que aún no tiene cuenta en KynWallet, quiero completar un formulario de registro con mis datos personales y credenciales para crear mi cuenta y comenzar a usar la billetera virtual.

**Por qué esta prioridad**: Es el flujo de incorporación (onboarding) crítico. Sin registro no hay usuarios nuevos; representa el valor central de esta funcionalidad.

**Prueba Independiente**: Se puede probar de forma aislada llenando el formulario con datos válidos y presionando el botón de registro; el resultado esperado es que el usuario sea redirigido a la pantalla de "Página en construcción". Entrega valor porque demuestra el alta de un usuario de extremo a extremo.

**Escenarios de Aceptación**:

1. **Dado** que el usuario está en la pantalla de Registro con todos los campos vacíos, **Cuando** ingresa datos válidos en todos los campos requeridos y presiona "Crear cuenta", **Entonces** el sistema valida la información, registra al usuario y lo redirige a la pantalla de "Página en construcción".
2. **Dado** que el usuario completó el registro correctamente, **Cuando** se produce la redirección, **Entonces** visualiza una pantalla de "En construcción" que confirma implícitamente que su registro fue exitoso.
3. **Dado** que el usuario observa la pantalla de Registro, **Cuando** la carga, **Entonces** ve la identidad visual de KynWallet (panel de marca con degradado naranja y panel de formulario) coherente con la pantalla de Login.

---

### Historia de Usuario 2 - Validación de Datos del Formulario (Prioridad: P2)

Como usuario que se está registrando, quiero recibir retroalimentación clara cuando un campo esté vacío, mal formado o cuando las contraseñas no coincidan, para poder corregir mis datos antes de enviar el formulario.

**Por qué esta prioridad**: La validación previene registros con datos inválidos y mejora la experiencia, pero el alta básica (P1) ya entrega valor sin ella. La integridad de los datos es además un mandato de la constitución del proyecto.

**Prueba Independiente**: Se puede probar dejando campos vacíos o ingresando un correo con formato inválido y contraseñas que no coinciden; el sistema debe impedir el envío y mostrar mensajes de validación, sin redirigir.

**Escenarios de Aceptación**:

1. **Dado** que el usuario deja uno o más campos requeridos vacíos, **Cuando** presiona "Crear cuenta", **Entonces** el sistema bloquea el envío y señala los campos faltantes.
2. **Dado** que el usuario ingresa un correo electrónico con formato inválido, **Cuando** intenta registrarse, **Entonces** el sistema muestra una indicación de formato de correo inválido y no procesa el registro.
3. **Dado** que el usuario ingresa una contraseña y una confirmación de contraseña distintas, **Cuando** intenta registrarse, **Entonces** el sistema indica que las contraseñas no coinciden y no procesa el registro.
4. **Dado** que el usuario ingresa una contraseña que no cumple la longitud mínima, **Cuando** intenta registrarse, **Entonces** el sistema indica el requisito mínimo de la contraseña.
5. **Dado** que el usuario completó todos los campos pero no marcó la casilla "Acepto los términos y condiciones", **Cuando** intenta registrarse, **Entonces** el sistema bloquea el envío e indica que debe aceptar los términos.
6. **Dado** que el usuario ingresa un correo electrónico que ya está registrado, **Cuando** intenta registrarse, **Entonces** el sistema muestra un error de "correo ya registrado" y no procesa el registro.

---

### Historia de Usuario 3 - Coherencia Visual y Elementos Secundarios (Prioridad: P3)

Como usuario, quiero que la pantalla de Registro mantenga la misma identidad visual que el Login (tipografía, colores, bordes redondeados) e incluya elementos de apoyo como el enlace para iniciar sesión si ya tengo cuenta, para una experiencia de marca coherente.

**Por qué esta prioridad**: Refuerza la percepción de calidad y la coherencia del producto, pero no es indispensable para el alta funcional.

**Prueba Independiente**: Inspección visual comparando la pantalla de Registro con la de Login: mismo degradado de marca, tipografía Inter, color brand `#ff6b3d` en el botón principal y radios de borde de 12px en los campos.

**Escenarios de Aceptación**:

1. **Dado** que el usuario ya tiene una cuenta, **Cuando** ve el enlace "¿Ya tienes cuenta? Inicia sesión", **Entonces** puede navegar de regreso a la pantalla de Login.
2. **Dado** que el usuario observa el botón principal de registro, **Cuando** lo visualiza, **Entonces** tiene el color de marca `#ff6b3d`, texto blanco SemiBold y bordes redondeados de 12px, igual que en el Login.

---

### Casos Extremos

- Correo ya registrado: el sistema valida contra la lista simulada de usuarios y muestra un error de "correo ya registrado", sin redirigir.
- Términos no aceptados: el sistema bloquea el envío e indica que se debe marcar "Acepto los términos y condiciones".
- ¿Cómo responde el sistema si el usuario envía el formulario dos veces rápidamente (doble clic) durante el procesamiento?
- ¿Qué ocurre si la contraseña cumple la longitud mínima pero la confirmación queda vacía?
- ¿Cómo se comporta el diseño de pantalla dividida en resoluciones muy anchas o muy estrechas (responsive)?

## Requisitos *(obligatorio)*

### Restricciones de Seguridad y Validación *(obligatorio)*

- **Restricción**: Todas las entradas del usuario DEBEN ser rigurosamente validadas antes del procesamiento.
- **Restricción**: Todas las rutas protegidas DEBEN requerir autenticación previa.
- **Restricción**: El uso de librerías externas para la UI o la lógica está estrictamente prohibido.
- **Restricción**: Se debe usar `PascalCase` para el nombramiento de las estructuras relevantes.
- **Restricción**: La contraseña NO DEBE mostrarse en texto plano por defecto ni almacenarse/exponerse sin protección.

### Requisitos Funcionales

- **FR-001**: El sistema DEBE presentar una pantalla de Registro con un diseño de pantalla dividida coherente con el Login: Panel de Marca (Brand Panel) a la izquierda y Panel de Formulario (Form Panel) a la derecha.
- **FR-002**: El formulario de registro DEBE incluir los campos: **Nombre completo** (placeholder "Ej: Diego Martínez"), **Correo electrónico** (placeholder "tucorreo@ejemplo.com"), **Contraseña** y **Confirmar contraseña**.
- **FR-003**: El sistema DEBE validar que el correo electrónico tenga un formato válido antes de procesar el registro.
- **FR-004**: El sistema DEBE validar que la contraseña cumpla una longitud mínima de 8 caracteres.
- **FR-005**: El sistema DEBE validar que la contraseña y su confirmación coincidan antes de procesar el registro.
- **FR-006**: El sistema DEBE impedir el envío del formulario y mostrar retroalimentación de validación cuando algún campo requerido esté vacío o tenga formato inválido.
- **FR-007**: El sistema DEBE incluir una casilla "Acepto los términos y condiciones" cuya aceptación es **obligatoria**; el registro NO DEBE procesarse si la casilla no está marcada.
- **FR-008**: El sistema DEBE validar que el correo electrónico no esté ya registrado (verificación contra una lista simulada de usuarios) y, en caso de existir, mostrar un error de "correo ya registrado" sin procesar el registro.
- **FR-009**: El sistema DEBE proporcionar un botón principal de acción "Crear cuenta" que dispare el proceso de registro.
- **FR-010**: Tras un registro exitoso, el sistema DEBE redirigir automáticamente al usuario a una pantalla de "Página en construcción".
- **FR-011**: La pantalla de "Página en construcción" DEBE comunicar claramente que la funcionalidad posterior está en desarrollo.
- **FR-012**: El sistema DEBE ofrecer un enlace de navegación hacia la pantalla de Login para usuarios que ya poseen cuenta ("¿Ya tienes cuenta? Inicia sesión").
- **FR-013**: El sistema DEBE permitir al usuario alternar la visibilidad de la contraseña (mostrar/ocultar) en los campos Contraseña y Confirmar contraseña.
- **FR-014**: El sistema DEBE mostrar opciones de acceso social "o regístrate con" (**Google** y **Apple**); su comportamiento es meramente visual en esta versión.
- **FR-015**: El **Brand Panel** DEBE incluir el logo "KynWallet", el encabezado "Comienza tu camino financiero.", el texto descriptivo de apoyo y un mockup de tarjeta "Kyn Card" (número enmascarado `5294 •••• •••• 4827`, titular "STEVEN LUNA", vencimiento "12/29"), sobre el degradado naranja de la identidad KynWallet.
- **FR-016**: La pantalla de Registro DEBE reutilizar los tokens de diseño establecidos para el Login: tipografía **Inter**, color de marca `#ff6b3d`, encabezados `#16182c`, textos secundarios `#8a8ca8`, bordes de campo `#d7d9e6` y radios de borde de 12px.

### Entidades Clave

- **RegistrationData**: Representa los datos que el usuario ingresa para crear su cuenta. Atributos: `FullName`, `Email`, `Password`, `PasswordConfirmation`, `AcceptedTerms` (booleano obligatorio). Regla de unicidad: `Email` no debe existir previamente en la lista simulada de usuarios.
- **UIStyles**: Definición de los tokens de diseño (colores, tipografía, espaciados, radios de borde) heredados del sistema de diseño del Login y confirmados con la referencia visual.

## Criterios de Éxito *(obligatorio)*

### Resultados Medibles

- **SC-001**: Un usuario nuevo puede completar el registro y llegar a la pantalla de "Página en construcción" en menos de 2 minutos.
- **SC-002**: El 100% de los intentos de registro con datos válidos resultan en una redirección exitosa a la pantalla de "Página en construcción".
- **SC-003**: El 100% de los intentos de registro inválidos (correo mal formado, contraseñas que no coinciden, campos vacíos, términos no aceptados o correo ya registrado) son bloqueados con retroalimentación visible, sin redirección.
- **SC-004**: La interfaz de Registro coincide visualmente en al menos un 95% con el diseño de Figma (disposición, colores, tipografía) y es consistente con la pantalla de Login.
- **SC-005**: Todos los campos de entrada y el botón principal presentan el radio de borde de 12px y los colores de marca definidos.

## Suposiciones

- El conjunto de campos, textos y elementos de la pantalla se confirmó con la imagen del diseño adjunta por el usuario (referencia de respaldo del MCP de Figma). Los valores exactos de tokens (hex, espaciados) DEBERÍAN reverificarse contra Figma en la planificación cuando se restablezca el acceso al MCP.
- Se asume que la "Página en construcción" es una pantalla simple, sin lógica adicional, que sirve como destino temporal tras el registro.
- Se asume que la persistencia del usuario registrado se simula (en memoria o equivalente) en esta fase, dado el alcance de UI y el carácter de prototipo de la billetera; la validación de correo duplicado se realiza contra esa lista simulada.
- Se asume que la fuente "Inter" está disponible localmente o se cargará como recurso, igual que en el Login.
- Las interacciones sociales (Google/Apple) y el enlace de términos y condiciones son meramente visuales en esta versión (la aceptación de términos sí es funcional como validación obligatoria).

## Dependencias

- Disponibilidad de lectura del frame de Figma `31:2` (archivo `f7uDsv8sh6ZOtK2OitTqtg`) mediante el MCP de Figma para confirmar el diseño exacto durante `/speckit-plan`. Requiere que se restablezca la cuota mensual del plan Starter o un asiento con permisos de lectura (Dev/Full).
- Reutilización del sistema de diseño y los componentes visuales ya definidos para la pantalla de Login (`specs/001-login-billetera`).
