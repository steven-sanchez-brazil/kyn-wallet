# Feature Specification: Registro de Usuario Kyn-Wallet

**Feature Branch**: `002-login-billetera`  
**Created**: 2026-06-08  
**Status**: Draft  
**Input**: User description: "Construye la pantalla de registro de usuario de una billetera virtual usando como referencia el frame de Figma compartido, incorporando validaciones, comportamiento responsive, integración con Login y persistencia compartida de usuarios."

## User Scenarios & Testing *(mandatory)*

### User Story 1 - Registro de nueva cuenta (Priority: P1)

Como visitante de Kyn-Wallet, quiero completar un formulario de registro con mis datos y crear una cuenta válida para luego poder iniciar sesión en la plataforma.

**Why this priority**: Es el flujo principal de captación de usuarios y habilita el acceso futuro al producto.

**Independent Test**: Se prueba cargando nombre completo, correo válido, contraseña y confirmación coincidente, aceptando términos y enviando el formulario; el resultado esperado es registro exitoso y redirección a Login con mensaje de éxito.

**Acceptance Scenarios**:

1. **Given** que el usuario abre la pantalla de registro, **When** completa todos los campos requeridos correctamente y acepta términos, **Then** el sistema registra al usuario y lo redirige a `/login` mostrando confirmación de éxito.
2. **Given** que el usuario intenta enviar el formulario con datos incompletos o inválidos, **When** presiona "Crear cuenta", **Then** el sistema no registra la cuenta y muestra validaciones inline por cada campo con error.

---

### User Story 2 - Integración coherente entre Registro y Login (Priority: P2)

Como usuario recién registrado, quiero autenticarme luego con las mismas credenciales creadas en Registro para tener una experiencia consistente entre ambas pantallas.

**Why this priority**: Sin fuente de datos compartida, el registro no aporta valor real porque el usuario no puede reutilizar sus credenciales.

**Independent Test**: Se registra un usuario nuevo y luego se intenta iniciar sesión desde Login con ese mismo correo y contraseña; debe autenticarse correctamente.

**Acceptance Scenarios**:

1. **Given** que existe una fuente de usuarios usada por Login, **When** se registra un nuevo usuario, **Then** el registro guarda el usuario en esa misma fuente.
2. **Given** que Login no usa una fuente persistente preexistente, **When** se implementa Registro, **Then** ambos flujos (Registro y Login) usan una fuente JSON compartida para crear y autenticar usuarios.
3. **Given** que un usuario está en Login, **When** selecciona "No tienen cuenta?. Regístrate", **Then** el sistema lo lleva a la pantalla de registro.

---

### User Story 3 - Experiencia visual y navegación alineadas al diseño (Priority: P3)

Como usuario, quiero que la pantalla de registro mantenga la identidad visual esperada de Kyn-Wallet y funcione correctamente en desktop y mobile.

**Why this priority**: Refuerza confianza, consistencia de marca y usabilidad en distintos dispositivos.

**Independent Test**: Se verifica que en desktop aparezcan dos paneles y en mobile solo el formulario, y que la estructura visual siga el frame de Figma provisto.

**Acceptance Scenarios**:

1. **Given** que el usuario abre Registro en desktop, **When** visualiza la pantalla, **Then** observa un layout de 2 paneles con panel de marca y panel de formulario.
2. **Given** que el usuario abre Registro en mobile, **When** visualiza la pantalla, **Then** solo se muestra el panel de formulario.
3. **Given** que el usuario presiona Google o Apple en Registro, **When** hace clic en cualquiera de los botones sociales, **Then** ve un alert con el texto "Próximamente".

### Edge Cases

- Intento de registro con correo ya existente en la fuente de usuarios.
- Contraseña válida en longitud pero distinta en el campo de confirmación.
- Usuario que intenta enviar sin aceptar términos y condiciones.
- Navegación directa a Registro desde Login y retorno inmediato a Login sin perder consistencia del flujo.
- Cambio de tamaño de pantalla durante la carga del formulario (desktop a mobile y viceversa).

## Requirements *(mandatory)*

### Security & Validation Constraints *(mandatory)*

- **Constraint**: All user inputs MUST be rigorously validated before processing.
- **Constraint**: All protected routes MUST require authentication before granting access.
- **Constraint**: The use of external libraries is strictly prohibited.
- **Constraint**: `PascalCase` must be used for naming relevant structures.

### Functional Requirements

- **FR-001**: El sistema DEBE ofrecer una pantalla de registro de usuario para Kyn-Wallet basada en la referencia visual del frame de Figma proporcionado.
- **FR-002**: El formulario DEBE incluir los campos obligatorios: nombre completo, correo electronico, contrasena y confirmar contrasena.
- **FR-003**: El formulario DEBE incluir un checkbox de aceptacion de terminos y condiciones como requisito para registrar una cuenta.
- **FR-004**: El boton "Crear cuenta" DEBE validar todos los campos antes de enviar cualquier intento de registro.
- **FR-005**: El sistema DEBE mostrar validaciones inline para: correo con formato valido, contrasena de minimo 8 caracteres, coincidencia entre contrasena y confirmacion, y obligatoriedad de todos los campos.
- **FR-006**: El sistema DEBE impedir el registro cuando exista cualquier validacion fallida y DEBE mostrar mensajes de error comprensibles en el contexto del campo.
- **FR-007**: Los botones de Google y Apple DEBEN estar presentes y, al seleccionarse, DEBEN mostrar un alert con el texto exacto "Proximamente".
- **FR-008**: La pantalla DEBE incluir el enlace "Ya tienes cuenta? Inicia sesion" que redirija a `/login`.
- **FR-009**: Tras un registro exitoso, el sistema DEBE redirigir a `/login` y mostrar un mensaje de confirmacion de registro exitoso.
- **FR-010**: En la pantalla de Login existente, el sistema DEBE agregar un enlace al final del formulario con el texto "No tienen cuenta?. Registrate" que redirija a la pantalla de registro.
- **FR-011**: La interfaz DEBE mostrar dos paneles en desktop (panel de marca y panel de formulario) y solo el panel de formulario en mobile.
- **FR-012**: El registro DEBE reutilizar la misma fuente de usuarios que utilice el Login existente si esta fuente ya existe.
- **FR-013**: Si Login no cuenta con una fuente de usuarios preexistente, el sistema DEBE establecer una fuente JSON compartida y usarla tanto para guardar nuevos usuarios desde Registro como para autenticarlos desde Login.
- **FR-014**: El flujo de registro y login DEBE permitir que un usuario creado en Registro pueda autenticarse posteriormente en Login con las mismas credenciales.

### Key Entities *(include if feature involves data)*

- **UsuarioRegistrado**: Representa a una persona que crea cuenta en Kyn-Wallet. Atributos relevantes: nombre completo, correo electronico unico, contrasena, aceptacion de terminos, fecha de registro.
- **ResultadoValidacionRegistro**: Representa el estado de validacion del formulario. Atributos relevantes: campo, estado valido/invalido, mensaje de error visible al usuario.
- **FuenteUsuariosCompartida**: Representa el origen unico de datos de usuarios usado por Registro y Login para alta y autenticacion.
- **MensajePostRegistro**: Representa la confirmacion mostrada luego del alta exitosa al redirigir a Login.

## Success Criteria *(mandatory)*

### Measurable Outcomes

- **SC-001**: Al menos 95% de intentos de registro con datos validos completan el flujo y redirigen a Login con mensaje de exito sin intervencion manual.
- **SC-002**: El 100% de intentos de envio con datos invalidos muestran validaciones inline en el mismo intento y no generan alta de usuario.
- **SC-003**: El 100% de usuarios creados desde Registro pueden iniciar sesion en Login usando las mismas credenciales dentro de la misma sesion de uso.
- **SC-004**: En pruebas de interfaz, el layout correcto se aplica en el 100% de los casos: dos paneles en desktop y un panel de formulario en mobile.
- **SC-005**: El 100% de clics en Google/Apple muestran el mensaje "Proximamente" y el 100% de los enlaces cruzados (`/login` y registro) navegan a la ruta esperada.

## Assumptions

- El frame de Figma provisto define la direccion visual esperada de la pantalla de registro y se toma como referencia de estructura y contenido visual.
- El flujo de registro inicial contempla un unico tipo de usuario final sin roles diferenciados.
- El mensaje de exito post-registro se presenta en la pantalla de Login inmediatamente despues de la redireccion.
- La validacion de unicidad de correo se realiza sobre la fuente de usuarios compartida disponible para Login/Registro.
- La persistencia JSON, cuando aplique, se considera suficiente para el alcance actual del feature.
