# Feature Specification: Registro de Usuarios KynWallet

**Feature Branch**: `002-run-before-specify-hook`  
**Created**: 2026-06-05  
**Status**: Draft  
**Input**: User description: "Construir la pantalla de Registro de Usuarios de KynWallet usando como referencia Figma frame 04 - Registro"  
**Language**: This document MUST be written in Spanish.

## User Scenarios & Testing *(mandatory)*

### User Story 1 - Registro Basico Exitoso (Priority: P1)

Como usuario nuevo de la billetera virtual, quiero completar el formulario de registro y crear mi cuenta para luego iniciar sesion.

**Why this priority**: Es el flujo principal de negocio y habilita la incorporacion de usuarios.

**Independent Test**: Puede validarse completando todos los campos obligatorios con datos validos, aceptando terminos y confirmando redireccion a `/login` con mensaje de exito disponible para mostrarse.

**Acceptance Scenarios**:

1. **Given** un usuario en la pantalla de registro con todos los campos validos y terminos aceptados, **When** presiona "Crear cuenta", **Then** el sistema simula registro exitoso, redirige a `/login` y transporta un mensaje de exito para visualizacion.
2. **Given** un usuario en la pantalla de registro, **When** presiona el enlace "¿Ya tienes cuenta? Inicia sesion", **Then** el sistema redirige a `/login` sin intentar registro.

---

### User Story 2 - Validacion Inline de Datos (Priority: P2)

Como usuario, quiero ver validaciones inline claras para corregir errores antes de enviar el formulario.

**Why this priority**: Reduce intentos fallidos y mejora la tasa de finalizacion del registro.

**Independent Test**: Puede validarse ingresando datos invalidos en cada campo para verificar mensajes inline por obligatoriedad, formato de correo, longitud de contrasena, coincidencia de confirmacion y aceptacion de terminos.

**Acceptance Scenarios**:

1. **Given** campos vacios, **When** el usuario intenta enviar, **Then** se muestran errores inline en todos los campos obligatorios y en terminos.
2. **Given** correo invalido o contrasena con menos de 8 caracteres, **When** el usuario interactua con el formulario o intenta enviar, **Then** se muestran errores inline especificos y no se permite continuar.
3. **Given** confirmacion distinta a la contrasena, **When** el usuario intenta enviar, **Then** se muestra error inline de no coincidencia y se bloquea el registro.

---

### User Story 3 - Accesos Alternativos y Diseno Responsive (Priority: P3)

Como usuario en distintos dispositivos, quiero una interfaz adaptable y opciones sociales visibles para entender que estaran disponibles.

**Why this priority**: Mejora experiencia de uso y consistencia visual con el diseno objetivo, sin bloquear el MVP.

**Independent Test**: Puede validarse verificando layout de dos paneles en desktop, solo formulario en mobile, y alerta "Proximamente" al presionar Google/Apple.

**Acceptance Scenarios**:

1. **Given** un usuario en desktop, **When** visualiza la pantalla, **Then** se muestra layout de dos paneles con branding a la izquierda y formulario a la derecha.
2. **Given** un usuario en mobile, **When** visualiza la pantalla, **Then** se muestra solo el formulario de registro.
3. **Given** un usuario presiona Google o Apple, **When** activa alguno de los botones sociales, **Then** el sistema muestra alerta con el mensaje "Proximamente".

### Edge Cases

- Intento de envio con espacios en blanco en campos de texto: el sistema debe tratarlos como vacios para validacion.
- Correo con formato parcialmente valido (ejemplo: falta dominio): debe rechazarse con mensaje inline.
- Doble clic rapido en "Crear cuenta" con formulario valido: debe procesarse una sola accion de registro simulado.
- Navegacion directa a `/login` tras registro: el mensaje de exito debe permanecer disponible al menos para el siguiente render de la pantalla destino.
- Cambio de tamano de viewport durante edicion del formulario: los datos ingresados y errores visibles no deben perderse.

## Requirements *(mandatory)*

### Security & Validation Constraints *(mandatory)*

- **Constraint**: All user inputs MUST be rigorously validated before processing.
- **Constraint**: All protected routes MUST require authentication before granting access.
- **Constraint**: New external libraries MUST NOT be added unless an explicit technical justification is documented.
- **Constraint**: React components MUST use `PascalCase` naming.
- **Constraint**: All SDD-generated documentation MUST be written in Spanish.

### Functional Requirements

- **FR-001**: El sistema DEBE mostrar un formulario de registro con los campos Nombre completo, Correo electronico, Contrasena y Confirmar contrasena.
- **FR-002**: El sistema DEBE mostrar un checkbox de aceptacion de terminos y condiciones y requerir su seleccion para permitir el registro.
- **FR-003**: El sistema DEBE validar inline que todos los campos del formulario sean obligatorios.
- **FR-004**: El sistema DEBE validar inline que el correo electronico tenga formato valido antes del envio.
- **FR-005**: El sistema DEBE validar inline que la contrasena tenga minimo 8 caracteres.
- **FR-006**: El sistema DEBE validar inline que Confirmar contrasena coincida exactamente con Contrasena.
- **FR-007**: El sistema DEBE impedir el envio del formulario mientras exista al menos una validacion pendiente o fallida.
- **FR-008**: Al enviar datos validos, el sistema DEBE simular un registro exitoso sin dependencia de backend.
- **FR-009**: Tras el registro exitoso, el sistema DEBE redirigir al usuario a `/login`.
- **FR-010**: Tras el registro exitoso, el sistema DEBE mostrar o transportar un mensaje de exito para que la pantalla de login pueda presentarlo al usuario.
- **FR-011**: El sistema DEBE mostrar botones de Google y Apple que al activarse presenten una alerta con el mensaje "Proximamente".
- **FR-012**: El sistema DEBE mostrar un enlace "¿Ya tienes cuenta? Inicia sesion" que redirija a `/login`.
- **FR-013**: En desktop, el sistema DEBE mostrar layout de dos paneles con panel visual/branding y panel de formulario.
- **FR-014**: En mobile, el sistema DEBE mostrar solo el formulario de registro.
- **FR-015**: La implementacion DEBE mantenerse dentro de la estructura de carpetas existente `app/`, `components/` y `lib/`.
- **FR-016**: La pantalla DEBE respetar la referencia visual del frame "04 - Registro" de Figma en estructura, jerarquia y estilo percibido.

### Key Entities *(include if feature involves data)*

- **RegistroUsuarioInput**: Representa los datos capturados del formulario (nombreCompleto, correoElectronico, contrasena, confirmarContrasena, aceptaTerminos) junto con su estado de validez.
- **ResultadoRegistro**: Representa el resultado del registro simulado (exitoso o fallido), incluyendo mensaje orientado al usuario para la pantalla de login.
- **EstadoVistaRegistro**: Representa el estado de la pantalla (errores inline por campo, disponibilidad de envio, contexto responsive y eventos de navegacion).

## Success Criteria *(mandatory)*

### Measurable Outcomes

- **SC-001**: El 95% de usuarios de prueba completa el registro valido en menos de 2 minutos desde que inicia la captura de datos.
- **SC-002**: El 100% de intentos con datos invalidos bloquea el envio y muestra al menos un mensaje inline accionable por cada error detectado.
- **SC-003**: El 100% de registros exitosos redirige a `/login` y expone un mensaje de exito visible para el usuario en la pantalla destino.
- **SC-004**: En pruebas de interfaz, la pantalla cumple 100% de los criterios definidos para layout responsive: dos paneles en desktop y solo formulario en mobile.
- **SC-005**: El 100% de activaciones de botones sociales muestra la alerta "Proximamente" sin interrumpir el estado del formulario.

## Assumptions

- El registro en esta iteracion no persiste usuarios reales y solo simula exito de forma local.
- La pantalla de `/login` tiene capacidad de mostrar un mensaje de exito recibido desde el flujo de registro.
- El alcance visual se valida por correspondencia perceptual con el frame de Figma, sin requerir paridad pixel-perfect.
- Terminos y condiciones ya existen como contenido legal fuera de esta historia; aqui solo se cubre su aceptacion en el formulario.
- No se incorporaran nuevas librerias externas en esta feature.
