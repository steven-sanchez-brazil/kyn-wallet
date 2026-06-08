# Especificación de Funcionalidad: Pantalla de Registro de Usuarios

**Feature Branch**: `feature/002-registro-usuarios`  
**Creado**: 2026-06-08  
**Estado**: Borrador  
**Diseño de referencia**: Frame "04 · Registro" — [Figma](https://www.figma.com/design/T4WwrDTsb3o5rc3FxEw2gs/Billetera-Virtual---Prototipos---pascu?node-id=31-2&t=HPsznK9jmt0KJApi-4)

---

## Escenarios de Usuario y Pruebas *(obligatorio)*

### Historia de Usuario 1 — Registro exitoso con datos válidos (Prioridad: P1)

Como usuario nuevo, quiero completar un formulario con mis datos personales y crear una cuenta en KynWallet para poder acceder a los servicios de la billetera virtual.

**Por qué esta prioridad**: Es el flujo central del feature. Sin registro exitoso, ningún otro escenario tiene valor.

**Prueba Independiente**: Puede probarse de forma autónoma llenando todos los campos correctamente (nombre, email, contraseña válida, confirmación coincidente, T&C aceptado) y presionando "Crear cuenta". El resultado debe ser una redirección a `/login` con un mensaje visible de registro exitoso.

**Escenarios de Aceptación**:

1. **Dado** que el usuario abre la pantalla de registro con todos los campos vacíos, **Cuando** ingresa nombre completo, correo electrónico válido, contraseña de al menos 8 caracteres, confirmación idéntica y acepta los términos, **Entonces** el sistema registra la cuenta y redirige al usuario a `/login` con un mensaje de confirmación de éxito.
2. **Dado** que el usuario fue redirigido a `/login` tras el registro, **Cuando** ingresa el correo y contraseña recién creados, **Entonces** el sistema lo autentica y accede a la aplicación.
3. **Dado** que el usuario está en desktop, **Cuando** carga la pantalla de registro, **Entonces** ve un layout de dos paneles: panel de marca a la izquierda y formulario a la derecha, fiel al diseño Figma "04 · Registro".

---

### Historia de Usuario 2 — Validaciones inline del formulario (Prioridad: P2)

Como usuario nuevo, quiero ver mensajes de error claros junto a cada campo con datos incorrectos para poder corregirlos antes de enviar el formulario.

**Por qué esta prioridad**: La retroalimentación inmediata reduce la frustración y aumenta la tasa de conversión en el registro.

**Prueba Independiente**: Puede probarse presionando "Crear cuenta" con campos vacíos o con datos inválidos; cada campo debe mostrar su error correspondiente de forma independiente.

**Escenarios de Aceptación**:

1. **Dado** que el usuario deja un campo obligatorio vacío, **Cuando** presiona "Crear cuenta", **Entonces** se muestra un error inline junto al campo indicando que es requerido.
2. **Dado** que el usuario ingresa un correo electrónico con formato inválido (ej. sin "@"), **Cuando** presiona "Crear cuenta", **Entonces** se muestra el mensaje "Correo electrónico inválido" junto al campo de correo.
3. **Dado** que el usuario ingresa una contraseña con menos de 8 caracteres, **Cuando** presiona "Crear cuenta", **Entonces** se muestra el mensaje de longitud mínima junto al campo de contraseña.
4. **Dado** que el campo "Confirmar contraseña" no coincide con "Contraseña", **Cuando** presiona "Crear cuenta", **Entonces** se muestra el mensaje "Las contraseñas no coinciden" junto al campo de confirmación.
5. **Dado** que el usuario no marcó el checkbox de términos y condiciones, **Cuando** presiona "Crear cuenta", **Entonces** se muestra un error asociado al checkbox indicando que debe aceptar los términos.

---

### Historia de Usuario 3 — Confirmación de contraseña (Prioridad: P2)

Como usuario nuevo, quiero confirmar mi contraseña ingresándola dos veces para evitar errores tipográficos al crear mi cuenta.

**Por qué esta prioridad**: Complementa el flujo de registro y reduce el riesgo de quedar bloqueado fuera de la cuenta.

**Prueba Independiente**: Puede probarse de forma independiente ingresando dos contraseñas distintas y verificando que el sistema bloquea el envío del formulario.

**Escenarios de Aceptación**:

1. **Dado** que el usuario ingresa "Contraseña" y "Confirmar contraseña" con valores distintos, **Cuando** presiona "Crear cuenta", **Entonces** el sistema no envía el formulario y muestra error de coincidencia.
2. **Dado** que el usuario ingresa valores idénticos en ambos campos de contraseña, **Cuando** presiona "Crear cuenta" (con el resto del formulario válido), **Entonces** el sistema procesa el registro.

---

### Historia de Usuario 4 — Aceptación de términos y condiciones (Prioridad: P2)

Como usuario nuevo, quiero poder marcar el checkbox de aceptación de términos y condiciones como paso obligatorio antes de registrarme.

**Por qué esta prioridad**: Requisito legal y de consentimiento que protege al usuario y a la plataforma.

**Prueba Independiente**: Puede probarse intentando enviar el formulario sin marcar el checkbox y verificando que el sistema lo impide con un error claro.

**Escenarios de Aceptación**:

1. **Dado** que el usuario tiene el checkbox desmarcado, **Cuando** presiona "Crear cuenta", **Entonces** el sistema muestra un error junto al checkbox y no procesa el registro.
2. **Dado** que el usuario marca el checkbox y completa el resto del formulario correctamente, **Cuando** presiona "Crear cuenta", **Entonces** el sistema procesa el registro.

---

### Historia de Usuario 5 — Registro social (Próximamente) (Prioridad: P3)

Como usuario nuevo, quiero poder ver las opciones de registro con Google y Apple aunque no estén disponibles todavía, para saber que estarán disponibles en el futuro.

**Por qué esta prioridad**: Eleva la percepción del producto sin bloquear el desarrollo actual; los botones son placeholders informativos.

**Prueba Independiente**: Puede probarse haciendo clic en los botones de Google y Apple y verificando que aparece el aviso "Próximamente".

**Escenarios de Aceptación**:

1. **Dado** que el usuario está en la pantalla de registro, **Cuando** hace clic en el botón de Google, **Entonces** el sistema muestra un aviso con el texto "Próximamente".
2. **Dado** que el usuario está en la pantalla de registro, **Cuando** hace clic en el botón de Apple, **Entonces** el sistema muestra un aviso con el texto "Próximamente".

---

### Historia de Usuario 6 — Navegación hacia login (Prioridad: P3)

Como usuario que ya tiene cuenta, quiero poder ir al inicio de sesión directamente desde la pantalla de registro mediante un enlace visible.

**Por qué esta prioridad**: Evita que el usuario quede atrapado en una pantalla que no le corresponde.

**Prueba Independiente**: Puede probarse haciendo clic en el enlace "¿Ya tienes cuenta? Inicia sesión" y verificando que navega a `/login`.

**Escenarios de Aceptación**:

1. **Dado** que el usuario está en la pantalla de registro, **Cuando** hace clic en "¿Ya tienes cuenta? Inicia sesión", **Entonces** el sistema lo redirige a `/login`.

---

### Historia de Usuario 7 — Integración bidireccional con pantalla de Login (Prioridad: P3)

Como usuario en la pantalla de login, quiero poder acceder a la pantalla de registro mediante un enlace visible para crear una cuenta nueva.

**Por qué esta prioridad**: Completa el ciclo de navegación entre login y registro.

**Prueba Independiente**: Puede probarse verificando que en la pantalla `/login` el texto "¿No tienes cuenta? Regístrate" contiene un enlace activo a la pantalla de registro.

**Escenarios de Aceptación**:

1. **Dado** que el usuario está en `/login`, **Cuando** hace clic en "Regístrate", **Entonces** el sistema lo lleva a la pantalla de registro.

---

### Historia de Usuario 8 — Experiencia responsive en mobile (Prioridad: P3)

Como usuario que accede desde un dispositivo móvil, quiero ver únicamente el formulario de registro adaptado a pantalla pequeña para registrarme cómodamente.

**Por qué esta prioridad**: Garantiza accesibilidad en el principal punto de acceso digital de la región.

**Prueba Independiente**: Puede probarse redimensionando el navegador a ancho de pantalla móvil y verificando que el panel de marca desaparece y el formulario ocupa el ancho completo.

**Escenarios de Aceptación**:

1. **Dado** que el usuario abre la pantalla de registro en un dispositivo móvil, **Cuando** carga la vista, **Entonces** el panel de marca no es visible y el formulario ocupa el ancho completo de la pantalla.
2. **Dado** que el usuario está en mobile y completa el formulario correctamente, **Cuando** presiona "Crear cuenta", **Entonces** el flujo de registro funciona igual que en desktop.

---

### Casos Extremos

- ¿Qué sucede si el usuario intenta registrarse con un correo electrónico que ya existe en el sistema?
- ¿Qué pasa si el usuario recarga la página a mitad del formulario?
- ¿Cómo se comporta el panel de marca en pantallas con relaciones de aspecto muy anchas o muy estrechas (ej. tablets en landscape)?
- ¿Qué ocurre si el usuario intenta enviar el formulario múltiples veces rápidamente?

---

## Requisitos *(obligatorio)*

### Restricciones de Seguridad y Validación *(obligatorio)*

- **Restricción**: Todas las entradas del usuario DEBEN ser validadas en el cliente antes de procesarse.
- **Restricción**: Las contraseñas NUNCA deben almacenarse en texto plano.
- **Restricción**: El uso de librerías externas para lógica de autenticación o UI está estrictamente prohibido.
- **Restricción**: Se debe usar `PascalCase` para el nombramiento de componentes y estructuras relevantes.
- **Restricción**: Los datos de usuarios ya existentes DEBEN preservarse intactos tras la implementación.

### Requisitos Funcionales

- **FR-001**: El sistema DEBE mostrar un formulario con los campos: Nombre completo, Correo electrónico, Contraseña y Confirmar contraseña.
- **FR-002**: El sistema DEBE incluir un checkbox de aceptación de términos y condiciones como campo obligatorio del formulario.
- **FR-003**: El botón "Crear cuenta" DEBE ejecutar la validación completa de todos los campos antes de procesar el registro.
- **FR-004**: El sistema DEBE mostrar mensajes de error inline junto a cada campo inválido sin recargar la página.
- **FR-005**: El sistema DEBE validar que el correo electrónico tenga formato válido (estructura usuario@dominio.ext).
- **FR-006**: El sistema DEBE validar que la contraseña tenga un mínimo de 8 caracteres.
- **FR-007**: El sistema DEBE validar que el campo "Confirmar contraseña" sea idéntico al campo "Contraseña".
- **FR-008**: El sistema DEBE impedir el envío del formulario si algún campo obligatorio está vacío o inválido.
- **FR-009**: Los botones de Google y Apple DEBEN mostrar el aviso "Próximamente" al ser pulsados, sin ejecutar ninguna acción de autenticación.
- **FR-010**: El formulario DEBE incluir un enlace "¿Ya tienes cuenta? Inicia sesión" que navegue a `/login`.
- **FR-011**: Tras un registro exitoso, el sistema DEBE redirigir al usuario a `/login` con un mensaje de confirmación de éxito visible.
- **FR-012**: Los usuarios registrados a través de esta pantalla DEBEN poder autenticarse correctamente en la pantalla de Login existente (`/login`).
- **FR-013**: El sistema DEBE respetar y preservar los usuarios ya existentes en el almacén de datos.
- **FR-014**: La pantalla de Login existente DEBE incluir un enlace activo en el texto "¿No tienes cuenta? Regístrate" que dirija a la pantalla de registro.
- **FR-015**: En desktop, la pantalla DEBE presentar un layout de dos paneles: panel de marca a la izquierda y formulario a la derecha, fiel al diseño Figma "04 · Registro".
- **FR-016**: En dispositivos móviles, el panel de marca DEBE ocultarse y el formulario DEBE adaptarse al ancho completo de la pantalla.
- **FR-017**: Los textos visibles (etiquetas, placeholders, mensajes, botones) DEBEN coincidir exactamente con los del diseño Figma "04 · Registro".

### Entidades Clave

- **Usuario (User)**: Representa una cuenta registrada en el sistema. Atributos clave: nombre completo, correo electrónico (único), contraseña (almacenada de forma segura). Es la entidad central creada en este flujo.
- **Formulario de Registro (RegistrationForm)**: Estado transitorio del proceso de registro. Contiene los valores ingresados por el usuario y el estado de validación de cada campo. No persiste tras completarse el registro.
- **Error de Validación (ValidationError)**: Mensaje asociado a un campo específico del formulario que describe el motivo por el cual el valor ingresado no es aceptable.

---

## Criterios de Éxito *(obligatorio)*

### Resultados Medibles

- **SC-001**: Los usuarios pueden completar el proceso de registro en menos de 2 minutos desde que abren la pantalla hasta ser redirigidos a `/login`.
- **SC-002**: Los errores de validación son visibles de forma inmediata junto al campo correspondiente al intentar enviar el formulario, sin necesidad de recargar la página.
- **SC-003**: El 100% de los registros exitosos redirigen al usuario a `/login` con un mensaje de confirmación visible.
- **SC-004**: Los usuarios registrados mediante este formulario pueden autenticarse exitosamente en la pantalla de Login sin pasos adicionales.
- **SC-005**: La pantalla de registro es completamente usable en dispositivos con pantalla de 375px de ancho o superior.
- **SC-006**: Los textos y estructura visual del formulario coinciden con el diseño de referencia Figma "04 · Registro".
- **SC-007**: La pantalla de Login muestra el enlace funcional hacia el registro sin romper ninguna funcionalidad existente.

---

## Suposiciones

- El almacén de usuarios es compartido entre la pantalla de Login y la de Registro; ambas operan sobre el mismo conjunto de datos.
- Los usuarios ya existentes (ej. datos precargados en la pantalla de Login) se conservan sin modificación.
- No existe un servicio de backend externo; la autenticación y el almacenamiento de usuarios se manejan íntegramente en el cliente (en memoria o estado local), siguiendo el patrón de la pantalla de Login ya implementada.
- El correo electrónico actúa como identificador único de usuario; no se permiten dos registros con el mismo correo.
- No se requiere verificación de correo electrónico (email confirmation) en esta fase.
- El diseño visual del panel de marca en la pantalla de registro sigue el mismo sistema de tokens de diseño ya establecido en el proyecto (colores brand, tipografía Inter).
- La funcionalidad de los botones de Google y Apple es un placeholder deliberado; su implementación real está fuera del alcance de este feature.
- La pantalla de registro es accesible en la ruta `/register` (o equivalente definida en el enrutador del proyecto).
