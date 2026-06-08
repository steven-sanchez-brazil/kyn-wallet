# Feature Specification: Registro de Billetera Virtual

**Feature Branch**: `002-registro-billetera`  
**Created**: 2026-06-08  
**Status**: Draft  
**Input**: User description: "Construye la pantalla de registro de una billetera virtual con formulario de nombre completo, correo, contraseña, confirmar contraseña, checkbox T&C, botón crear cuenta, botones sociales Google/Apple, y link a login."

## User Scenarios & Testing *(mandatory)*

### User Story 1 - Registro con formulario completo (Priority: P1)

Como usuario nuevo, quiero crear una cuenta proporcionando mi nombre completo, correo electrónico, contraseña y confirmación de contraseña, para poder acceder a la billetera virtual.

**Why this priority**: Es el flujo principal de la funcionalidad. Sin registro no hay acceso al sistema.

**Independent Test**: Se puede probar completando el formulario con datos válidos y verificando la redirección a /login con mensaje de éxito.

**Acceptance Scenarios**:

1. **Given** el usuario está en la página de registro, **When** completa todos los campos con datos válidos, acepta términos y presiona "Crear cuenta", **Then** el sistema muestra un mensaje de éxito y redirige a /login
2. **Given** el usuario está en la página de registro, **When** intenta enviar el formulario sin completar todos los campos, **Then** el sistema muestra mensajes de error inline para cada campo faltante
3. **Given** el usuario está en la página de registro, **When** ingresa un correo con formato inválido, **Then** se muestra un error inline indicando que el correo no es válido
4. **Given** el usuario está en la página de registro, **When** ingresa una contraseña con menos de 8 caracteres, **Then** se muestra un error inline indicando el requisito mínimo
5. **Given** el usuario está en la página de registro, **When** la contraseña y confirmar contraseña no coinciden, **Then** se muestra un error inline indicando que las contraseñas no coinciden

---

### User Story 2 - Validaciones inline en tiempo real (Priority: P1)

Como usuario, quiero recibir retroalimentación inmediata sobre los errores en el formulario, para corregirlos antes de intentar enviar.

**Why this priority**: Las validaciones inline son parte integral de la experiencia de registro y previenen frustración del usuario.

**Independent Test**: Se puede probar ingresando datos inválidos en cada campo y verificando que los mensajes de error aparecen al perder el foco (on blur) del campo.

**Acceptance Scenarios**:

1. **Given** el usuario pierde el foco del campo de correo (on blur), **When** el valor ingresado no tiene formato de email válido, **Then** se muestra un mensaje de error inline debajo del campo
2. **Given** el usuario deja el campo de contraseña, **When** el valor tiene menos de 8 caracteres, **Then** se muestra un mensaje de error inline indicando el mínimo requerido
3. **Given** el usuario deja el campo confirmar contraseña, **When** el valor no coincide con la contraseña, **Then** se muestra un mensaje de error inline indicando que no coinciden
4. **Given** el usuario intenta enviar sin aceptar términos, **When** presiona "Crear cuenta", **Then** se muestra un error indicando que debe aceptar los términos y condiciones

---

### User Story 3 - Diseño responsive (Priority: P2)

Como usuario, quiero poder registrarme tanto desde desktop como desde dispositivo móvil, con una experiencia adaptada a cada pantalla.

**Why this priority**: La accesibilidad multi-dispositivo es importante pero secundaria al flujo funcional principal.

**Independent Test**: Se puede probar redimensionando la ventana del navegador y verificando que en desktop se muestran 2 paneles y en mobile solo el formulario.

**Acceptance Scenarios**:

1. **Given** el usuario accede desde un dispositivo desktop, **When** la página carga, **Then** se muestra un layout de 2 paneles (panel de marca y formulario)
2. **Given** el usuario accede desde un dispositivo móvil, **When** la página carga, **Then** se muestra solo el formulario sin el panel de marca

---

### User Story 4 - Acciones secundarias (Priority: P3)

Como usuario, quiero tener opciones alternativas de registro (Google/Apple) y un enlace a login si ya tengo cuenta.

**Why this priority**: Son elementos de navegación y funcionalidad futura que complementan el flujo principal.

**Independent Test**: Se puede probar haciendo clic en los botones de Google/Apple y verificando el alert, y haciendo clic en el link de login y verificando la navegación.

**Acceptance Scenarios**:

1. **Given** el usuario está en la página de registro, **When** presiona el botón de Google, **Then** se muestra un alert con el mensaje "Próximamente"
2. **Given** el usuario está en la página de registro, **When** presiona el botón de Apple, **Then** se muestra un alert con el mensaje "Próximamente"
3. **Given** el usuario está en la página de registro, **When** presiona "¿Ya tienes cuenta? Inicia sesión", **Then** se navega a la ruta /login

---

### Edge Cases

- ¿Qué ocurre si el usuario ingresa espacios en blanco como nombre completo? Se rechaza con error de campo obligatorio.
- ¿Qué ocurre si el usuario pega una contraseña extremadamente larga (>200 caracteres)? Se acepta siempre que cumpla el mínimo de 8 caracteres.
- ¿Qué ocurre si el usuario intenta registrarse con un correo ya existente? El registro es simulado, por lo que siempre se completa exitosamente.
- ¿Qué ocurre si el usuario deshabilita JavaScript? El formulario no funciona sin JavaScript (comportamiento esperado para una SPA).

## Requirements *(mandatory)*

### Security & Validation Constraints *(mandatory)*

- **Constraint**: Todas las entradas del usuario DEBEN ser validadas rigurosamente antes de procesarse.
- **Constraint**: El uso de librerías externas está estrictamente prohibido.
- **Constraint**: `PascalCase` DEBE usarse para nombrar componentes, archivos y estructuras relevantes.
- **Constraint**: Las contraseñas NUNCA deben mostrarse en texto plano en logs o almacenamiento.

### Functional Requirements

- **FR-001**: El sistema DEBE mostrar un formulario con los campos: nombre completo, correo electrónico, contraseña y confirmar contraseña.
- **FR-002**: El sistema DEBE incluir un checkbox de aceptación de términos y condiciones que sea obligatorio para completar el registro.
- **FR-003**: El sistema DEBE incluir un botón "Crear cuenta" que valide todos los campos antes de procesar el envío.
- **FR-004**: El sistema DEBE incluir botones de Google y Apple que muestren un alert con el mensaje "Próximamente" al ser presionados.
- **FR-005**: El sistema DEBE incluir un enlace "¿Ya tienes cuenta? Inicia sesión" que navegue a la ruta /login.
- **FR-006**: El sistema DEBE redirigir a /login con un query parameter (e.g., `/login?registered=true`) que active la visualización de un mensaje de éxito tras un registro exitoso.
- **FR-007**: El sistema DEBE validar inline que el correo tenga formato válido.
- **FR-008**: El sistema DEBE validar inline que la contraseña tenga mínimo 8 caracteres.
- **FR-009**: El sistema DEBE validar inline que las contraseñas coincidan.
- **FR-010**: El sistema DEBE validar que todos los campos sean obligatorios antes de permitir el envío.
- **FR-011**: El sistema DEBE ser responsive: layout de 2 paneles en desktop (panel de marca + formulario) y solo formulario en mobile.
- **FR-012**: El registro DEBE ser simulado (sin conexión real a backend).

### Key Entities

- **Usuario (Registro)**: Representa los datos capturados durante el registro — nombre completo, correo electrónico, contraseña.
- **Formulario de Registro**: Componente que gestiona el estado de los campos, validaciones y el flujo de envío.
- **Panel de Marca**: Componente visual lateral que se muestra solo en desktop con branding de la billetera.

## Success Criteria *(mandatory)*

### Measurable Outcomes

- **SC-001**: Los usuarios pueden completar el registro en menos de 2 minutos proporcionando datos válidos.
- **SC-002**: El 100% de los intentos de envío con datos inválidos son bloqueados con mensajes claros de error.
- **SC-003**: Los mensajes de error inline aparecen en menos de 1 segundo tras la interacción del usuario con el campo.
- **SC-004**: La pantalla se adapta correctamente a viewports desde 320px (mobile) hasta 1920px (desktop).
- **SC-005**: El 100% de los registros exitosos resultan en redirección a /login con mensaje de confirmación visible.

## Clarifications

### Session 2026-06-08

- Q: ¿En qué momento deben dispararse las validaciones inline — on blur, on change o mixto? → A: Al perder foco (on blur)
- Q: ¿Cómo debe entregarse el mensaje de éxito al redirigir a /login? → A: Query parameter en la URL (`/login?registered=true`)

## Assumptions

- El registro es completamente simulado; no hay persistencia real de datos ni validación de unicidad de correo.
- El diseño sigue el mismo patrón visual establecido en la pantalla de login existente (001-login-billetera).
- El panel de marca lateral es consistente con el existente en el login (componente `BrandPanel`).
- Los botones sociales (Google/Apple) siguen el patrón del componente `SocialLogins` existente.
- El breakpoint para responsive (desktop vs mobile) sigue el estándar del proyecto existente.
- El mensaje de éxito tras el registro se pasa como query parameter (`/login?registered=true`) para que /login muestre un banner de confirmación.
