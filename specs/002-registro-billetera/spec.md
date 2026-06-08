# Feature Specification: Registro de Billetera Virtual

**Feature Branch**: `002-registro-billetera`

**Created**: 2026-06-08

**Status**: Draft

**Input**: User description: "Construye la pantalla de registro de una billetera virtual para eso utiliza el mcp de figma, te comparto el frame https://www.figma.com/design/f7uDsv8sh6ZOtK2OitTqtg/Billetera-Virtual---Prototipos?node-id=31-2&t=PB1j86R5Z2RugXR2-4, Los requisitos funcionales son: 1. Formulario con los campos: nombre completo, correo electrónico, contraseña y confirmar contraseña 2. Checkbox de aceptación de términos y condiciones 3. Botón \"Crear cuenta\" que valide todos los campos antes de enviar 4. Botones de Google y Apple que muestren alert \"Próximamente\" 5. Link \"¿Ya tienes cuenta? Inicia sesión\" que lleve a /login 6. Registro exitoso → redirige a /login con mensaje de éxito 7. Validaciones inline: correo válido, contraseña mínimo 8 caracteres, contraseñas coinciden, todos los campos obligatorios 8. Responsive: desktop (2 paneles) y mobile (solo formulario)"

## User Scenarios & Testing *(mandatory)*

### User Story 1 - Registro Exitoso (Priority: P1)

Como nuevo usuario, quiero crear una cuenta en la billetera virtual proporcionando mis datos personales para acceder a las funcionalidades de la plataforma.

**Why this priority**: Es la funcionalidad principal del feature y el punto de entrada para nuevos clientes. Sin esto, el feature no tiene valor.

**Independent Test**: Se puede probar completando el formulario con datos válidos, aceptando términos y verificando que el usuario sea redirigido a la pantalla de login con un mensaje de confirmación.

**Acceptance Scenarios**:

1. **Given** que estoy en la pantalla de registro, **When** ingreso un nombre, correo válido, contraseña de 8+ caracteres, confirmo la contraseña y acepto los términos, **Then** al hacer clic en "Crear cuenta" el sistema procesa el registro y me redirige a `/login` con un mensaje de éxito.

---

### User Story 2 - Validaciones de Datos e Integridad (Priority: P2)

Como usuario, quiero recibir retroalimentación inmediata si ingreso datos incorrectos para poder corregirlos antes de intentar enviar el formulario.

**Why this priority**: Mejora la experiencia de usuario y asegura que solo datos válidos lleguen al backend, reduciendo errores de procesamiento.

**Independent Test**: Se puede probar ingresando datos inválidos en cada campo y verificando que aparezcan los mensajes de error correspondientes sin recargar la página.

**Acceptance Scenarios**:

1. **Given** que ingreso un correo electrónico con formato inválido, **When** pierdo el foco del campo o intento enviar, **Then** veo un mensaje de error indicando que el correo no es válido.
2. **Given** que ingreso una contraseña de menos de 8 caracteres, **When** intento enviar, **Then** veo un mensaje de error indicando el mínimo de caracteres.
3. **Given** que la confirmación de contraseña no coincide con la contraseña original, **When** intento enviar, **Then** veo un mensaje de error indicando que las contraseñas deben coincidir.
4. **Given** que dejo algún campo obligatorio vacío, **When** intento enviar, **Then** veo mensajes indicando que los campos son obligatorios y el botón de envío se mantiene bloqueado o muestra el error.

---

### User Story 3 - Acceso a Login (Priority: P2)

Como usuario que ya tiene cuenta, quiero poder navegar fácilmente a la pantalla de inicio de sesión si llegué por error a la pantalla de registro.

**Why this priority**: Es fundamental para la navegación básica y evita que usuarios existentes se frustren intentando registrarse de nuevo.

**Independent Test**: Hacer clic en el enlace de inicio de sesión y verificar la redirección.

**Acceptance Scenarios**:

1. **Given** que estoy en la pantalla de registro, **When** hago clic en el enlace "¿Ya tienes cuenta? Inicia sesión", **Then** soy redirigido a la ruta `/login`.

---

### User Story 4 - Registro con Terceros (Próximamente) (Priority: P3)

Como usuario, quiero ver las opciones de registro con redes sociales (Google, Apple) aunque no estén disponibles todavía, para saber que serán soportadas en el futuro.

**Why this priority**: Mantiene la paridad visual con el diseño de Figma y comunica planes futuros, aunque la funcionalidad no sea crítica para el MVP.

**Independent Test**: Hacer clic en los botones de Google/Apple y verificar que aparezca el alert.

**Acceptance Scenarios**:

1. **Given** que hago clic en el botón de Google o Apple, **When** se procesa el evento, **Then** se muestra un mensaje de alerta indicando "Próximamente".

---

### Edge Cases

- **Envío duplicado**: ¿Cómo maneja el sistema si el usuario hace clic varias veces rápidamente en "Crear cuenta"? (Debería deshabilitarse durante el procesamiento).
- **Correo ya registrado**: ¿Qué feedback recibe el usuario si intenta registrarse con un correo que ya existe? (Se asume que el backend retornará error y se mostrará mensaje).
- **Pérdida de conectividad**: ¿Cómo se comporta el formulario si se pierde la conexión a internet justo antes de enviar?

## Requirements *(mandatory)*

### Functional Requirements

- **FR-001**: El sistema DEBE mostrar un formulario con los campos: nombre completo, correo electrónico, contraseña y confirmar contraseña.
- **FR-002**: El sistema DEBE incluir un checkbox para la aceptación de términos y condiciones, el cual es obligatorio para proceder.
- **FR-003**: El sistema DEBE validar que el correo electrónico tenga un formato estándar válido (ej. usuario@dominio.com).
- **FR-004**: El sistema DEBE validar que la contraseña tenga una longitud mínima de 8 caracteres.
- **FR-005**: El sistema DEBE validar que el campo "confirmar contraseña" sea idéntico al campo "contraseña".
- **FR-006**: El sistema DEBE mostrar mensajes de validación inline para cada campo cuando no cumpla los requisitos.
- **FR-007**: El sistema DEBE deshabilitar el botón "Crear cuenta" o impedir el envío hasta que todos los campos sean válidos y el checkbox esté marcado.
- **FR-008**: Tras un registro exitoso, el sistema DEBE redirigir al usuario a `/login` y mostrar un mensaje de éxito.
- **FR-009**: El sistema DEBE mostrar un alert con el texto "Próximamente" al interactuar con los botones de Google y Apple.
- **FR-010**: El sistema DEBE incluir un enlace funcional hacia `/login` para usuarios existentes.
- **FR-011**: El diseño DEBE ser responsivo, mostrando 2 paneles (marca/formulario) en desktop y solo el panel de formulario en dispositivos móviles, siguiendo el diseño de Figma.

### Key Entities

- **Usuario**: Representa a la persona que se registra. Atributos: nombre, correo, contraseña.
- **Términos y Condiciones**: Entidad legal cuya aceptación es necesaria para el registro.

## Success Criteria *(mandatory)*

### Measurable Outcomes

- **SC-001**: Los usuarios pueden completar el proceso de registro (desde carga hasta redirección) en menos de 90 segundos.
- **SC-002**: El 100% de los campos obligatorios son validados antes de permitir el envío al servidor.
- **SC-003**: La interfaz responde correctamente a cambios de tamaño de pantalla, manteniendo la legibilidad del formulario en mobile.
- **SC-004**: El tiempo de respuesta visual tras hacer clic en "Crear cuenta" (feedback de carga) es menor a 200ms.

## Assumptions

- El diseño de Figma proporcionado es la fuente de verdad para estilos, colores y espaciados.
- Existe una ruta `/login` funcional a la cual redirigir.
- El backend para el registro acepta los campos definidos y maneja casos de error como "correo duplicado".
- Los botones de Google y Apple no requieren integración real en este feature, solo la simulación del alert.
