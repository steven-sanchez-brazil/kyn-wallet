# Feature Specification: Registro de Usuarios

**Feature Branch**: `[002-registro-usuarios]`  
**Created**: 2026-06-08  
**Status**: Draft  
**Input**: User description: "Necesito crear una nueva feature de Registro de Usuarios para Kyn-Wallet, con UI idéntica al diseño de referencia y validaciones/flujo de registro definidos."

## Clarifications

### Session 2026-06-08

- Q: Cuando el registro falle por correo ya existente, ¿cómo debe responder la UI? → A: Mostrar error inline en correo y permanecer en registro.
- Q: Durante el envío válido de registro (estado `submitting`), ¿qué debe hacer el botón "Crear cuenta"? → A: Deshabilitar botón y mostrar estado de carga hasta respuesta.
- Q: Si falla el registro por error técnico/transitorio (timeout o caída de servicio), ¿qué feedback debe ver la persona usuaria? → A: Mostrar mensaje inline/banner "No pudimos crear tu cuenta. Intenta nuevamente." y permanecer en registro.

## User Scenarios & Testing *(mandatory)*

### User Story 1 - Registro completo con validaciones (Priority: P1)

Como visitante sin cuenta, quiero completar el formulario de registro con mis datos y validación en línea para crear mi cuenta sin errores.

**Why this priority**: Es la capacidad principal de negocio; sin este flujo no existe alta de nuevos usuarios.

**Independent Test**: Puede probarse de forma aislada completando el formulario con datos válidos e inválidos y verificando validaciones inline, bloqueo de envío y envío exitoso cuando todo es correcto.

**Acceptance Scenarios**:

1. **Given** una persona en la pantalla de registro, **When** deja cualquier campo obligatorio vacío y pulsa "Crear cuenta", **Then** se muestran mensajes inline por cada campo faltante y el envío no se realiza.
2. **Given** una persona en la pantalla de registro, **When** ingresa correo con formato inválido, contraseña menor a 8 caracteres o contraseñas distintas, **Then** se muestran errores inline específicos y no se permite continuar.
3. **Given** una persona en la pantalla de registro, **When** completa nombre completo, correo válido, contraseña válida, confirmación coincidente y acepta términos, **Then** el registro se procesa como exitoso.
4. **Given** una persona con datos válidos en el formulario, **When** ocurre un error técnico/transitorio al registrar, **Then** se muestra el mensaje "No pudimos crear tu cuenta. Intenta nuevamente.", la persona permanece en registro y puede reintentar.

---

### User Story 2 - Continuidad del flujo de acceso (Priority: P2)

Como persona que desea acceder rápidamente, quiero tener opciones claras para ir a iniciar sesión y recibir confirmación al finalizar el registro.

**Why this priority**: Mejora la continuidad del viaje de acceso y reduce fricción después de registrarse.

**Independent Test**: Puede probarse de forma independiente accionando el enlace de inicio de sesión y verificando redirección y mensaje de éxito posterior al registro.

**Acceptance Scenarios**:

1. **Given** una persona en registro, **When** selecciona "¿Ya tienes cuenta? Inicia sesión", **Then** navega a `/login`.
2. **Given** un registro exitoso, **When** finaliza el envío, **Then** la persona es redirigida a `/login` y visualiza un mensaje de éxito.

---

### User Story 3 - Alternativas sociales y experiencia adaptable (Priority: P3)

Como visitante, quiero ver opciones de acceso social y una interfaz adaptable al dispositivo para entender futuras posibilidades y usar cómodamente la pantalla en desktop o mobile.

**Why this priority**: Aporta claridad de producto y usabilidad en distintos tamaños de pantalla, aunque no bloquea el registro base.

**Independent Test**: Puede probarse de forma aislada verificando comportamiento de botones sociales y disposición visual en desktop y mobile.

**Acceptance Scenarios**:

1. **Given** la pantalla de registro visible, **When** la persona pulsa el botón de Google o Apple, **Then** se muestra una alerta con el texto "Próximamente".
2. **Given** la pantalla de registro, **When** se visualiza en desktop, **Then** se muestra layout de dos paneles acorde al diseño de referencia.
3. **Given** la pantalla de registro, **When** se visualiza en mobile, **Then** se muestra únicamente el panel de formulario manteniendo coherencia visual con el diseño de referencia.

### Edge Cases

- Intento de envío sin aceptar términos y condiciones.
- Correos con espacios al inicio o final ingresados por error.
- Intento de registro con correo ya existente: se muestra error inline en el campo correo y la persona permanece en la pantalla de registro.
- Contraseña y confirmación idénticas salvo diferencia de mayúsculas/minúsculas.
- Nombre completo con caracteres especiales válidos (acentos, apóstrofes, guiones).
- Acción repetida del botón "Crear cuenta" durante un envío en curso.
- Durante `submitting`, el botón "Crear cuenta" queda deshabilitado y con indicador de carga para prevenir envíos duplicados.
- Error técnico/transitorio de registro (por ejemplo timeout o caída de servicio): se muestra banner/mensaje inline "No pudimos crear tu cuenta. Intenta nuevamente." y no hay redirección.
- Cambio de orientación o tamaño de pantalla durante el llenado del formulario.

## Requirements *(mandatory)*

### Security & Validation Constraints *(mandatory)*

- **Constraint**: All user inputs MUST be rigorously validated before processing.
- **Constraint**: All protected routes MUST require authentication before granting access.
- **Constraint**: The use of external libraries is strictly prohibited.
- **Constraint**: `PascalCase` must be used for naming relevant structures.

### Functional Requirements

- **FR-001**: El sistema DEBE presentar un formulario de registro con los campos: nombre completo, correo electrónico, contraseña y confirmar contraseña.
- **FR-002**: El sistema DEBE exigir el ingreso obligatorio de todos los campos del formulario antes de permitir un registro exitoso.
- **FR-003**: El sistema DEBE mostrar validación inline para formato de correo válido.
- **FR-004**: El sistema DEBE mostrar validación inline para contraseña con mínimo de 8 caracteres.
- **FR-005**: El sistema DEBE mostrar validación inline cuando contraseña y confirmar contraseña no coincidan.
- **FR-006**: El sistema DEBE requerir la aceptación explícita de términos y condiciones antes de permitir el envío del registro.
- **FR-007**: El sistema DEBE incluir un botón "Crear cuenta" que ejecute todas las validaciones antes de enviar los datos.
- **FR-008**: El sistema DEBE incluir botones de Google y Apple que, al activarse, muestren una alerta con el texto "Próximamente".
- **FR-009**: El sistema DEBE incluir el enlace "¿Ya tienes cuenta? Inicia sesión" que redirija a `/login`.
- **FR-010**: Tras un registro exitoso, el sistema DEBE redirigir a `/login` y mostrar un mensaje de éxito.
- **FR-011**: La interfaz DEBE mantener paridad visual con el diseño de referencia definido para la pantalla de registro.
- **FR-012**: La interfaz DEBE comportarse de forma responsive, mostrando dos paneles en desktop y solo el formulario en mobile.
- **FR-013**: Si el correo ingresado ya existe, el sistema DEBE mostrar error inline asociado al campo correo y DEBE mantener a la persona en la pantalla de registro sin redirigir.
- **FR-014**: Durante el estado de envío válido (`submitting`), el sistema DEBE deshabilitar el botón "Crear cuenta" y DEBE mostrar un estado de carga hasta recibir respuesta del registro.
- **FR-015**: Si el registro falla por error técnico/transitorio, el sistema DEBE mostrar el mensaje "No pudimos crear tu cuenta. Intenta nuevamente.", DEBE mantener a la persona en la pantalla de registro y DEBE permitir reintento.

### Key Entities *(include if feature involves data)*

- **FormularioRegistro**: Representa la entrada del usuario con nombre completo, correo electrónico, contraseña, confirmación de contraseña y aceptación de términos.
- **ResultadoValidacionRegistro**: Representa el estado de validación por campo y mensajes inline mostrados antes del envío.
- **ResultadoRegistro**: Representa el resultado final del intento de alta (exitoso/no exitoso) y el mensaje de retroalimentación asociado.

## Success Criteria *(mandatory)*

### Measurable Outcomes

- **SC-001**: Al menos el 95% de las personas que completan datos válidos y aceptan términos finalizan el flujo de registro y llegan a la pantalla de inicio de sesión.
- **SC-002**: El 100% de los envíos con datos inválidos son bloqueados con mensajes inline específicos para cada campo en error.
- **SC-003**: El 100% de los clics en "¿Ya tienes cuenta? Inicia sesión" redirigen correctamente a `/login`.
- **SC-004**: El 100% de los clics en botones Google y Apple muestran la alerta "Próximamente".
- **SC-005**: En pruebas de interfaz, la pantalla cumple con el layout esperado en desktop (dos paneles) y mobile (solo formulario) en el 100% de los casos evaluados.

## Assumptions

- El flujo de creación real de cuenta ya existe o estará disponible para que esta pantalla pueda completar el registro exitoso.
- El mensaje de éxito se puede presentar en la pantalla de `/login` sin requerir un nuevo canal de notificación fuera del flujo actual.
- Términos y condiciones ya cuentan con contenido legal definido y solo se requiere aceptación explícita en esta feature.
- El alcance de esta feature cubre la experiencia de registro en web; no incluye registro en aplicaciones nativas.
