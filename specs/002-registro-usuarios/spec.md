# Feature Specification: Registro de Usuarios — KynWallet

**Feature Branch**: `feature/registro-andres-jimenez`  
**Created**: 2026-06-05  
**Status**: Draft  
**Figma Reference**: [Billetera Virtual — Prototipos, node 31-2](https://www.figma.com/design/f7uDsv8sh6ZOtK2OitTqtg/Billetera-Virtual---Prototipos?node-id=31-2&t=UqXziRdbvr7Ri2f6-4)

---

## User Scenarios & Testing *(mandatory)*

### User Story 1 — Registro exitoso con credenciales válidas (Priority: P1)

Un nuevo usuario ingresa a la página de registro, completa todos los campos correctamente, acepta los términos y condiciones, y crea su cuenta. El sistema valida la información, registra al usuario y lo redirige a la página de inicio de sesión con un mensaje de éxito.

**Why this priority**: Es el flujo principal del negocio. Sin registro no hay usuarios y no hay valor para la plataforma.

**Independent Test**: Puede probarse en su totalidad llenando el formulario con datos válidos y verificando la redirección a `/login` con mensaje de éxito.

**Acceptance Scenarios**:

1. **Given** el usuario está en `/registro` con todos los campos vacíos, **When** completa nombre completo, correo electrónico válido, contraseña de 8+ caracteres y confirmación idéntica, marca el checkbox de términos, y pulsa "Crear cuenta", **Then** el sistema registra la cuenta, redirige a `/login` y muestra el mensaje "Cuenta creada exitosamente. Inicia sesión para continuar."
2. **Given** el usuario ha completado el registro, **When** es redirigido a `/login`, **Then** el mensaje de éxito es visible en la pantalla sin necesidad de acciones adicionales.

---

### User Story 2 — Validación inline de campos (Priority: P2)

Un usuario comete errores al rellenar el formulario (correo con formato incorrecto, contraseña corta, confirmación que no coincide, campo vacío). El sistema muestra mensajes de error debajo de cada campo afectado sin necesidad de enviar el formulario.

**Why this priority**: Las validaciones en tiempo real reducen la frustración del usuario y mejoran la tasa de registro exitoso.

**Independent Test**: Puede probarse individualmente introduciendo datos inválidos en cada campo y verificando que aparezca el mensaje de error correspondiente.

**Acceptance Scenarios**:

1. **Given** el campo "Correo electrónico" contiene texto sin formato de email, **When** el usuario sale del campo (pierde foco), **Then** aparece el mensaje "Ingresa un correo electrónico válido."
2. **Given** el campo "Contraseña" tiene menos de 8 caracteres, **When** el usuario sale del campo, **Then** aparece el mensaje "La contraseña debe tener al menos 8 caracteres."
3. **Given** el campo "Confirmar contraseña" no coincide con "Contraseña", **When** el usuario escribe en el campo de confirmación o sale de él, **Then** aparece el mensaje "Las contraseñas no coinciden."
4. **Given** cualquier campo obligatorio está vacío, **When** el usuario intenta enviar el formulario, **Then** aparece un mensaje de error en ese campo indicando que es obligatorio.

---

### User Story 3 — Habilitación del botón "Crear cuenta" por checkbox (Priority: P2)

El botón "Crear cuenta" permanece deshabilitado hasta que todos los campos estén diligenciados y el checkbox de términos y condiciones esté marcado. Al cumplir ambas condiciones, el botón se habilita.

**Why this priority**: Garantiza el cumplimiento legal del consentimiento de términos y mejora la experiencia guiando al usuario hacia un estado válido antes del envío.

**Independent Test**: Puede probarse verificando el estado del botón a medida que se llenan campos y se marca/desmarca el checkbox.

**Acceptance Scenarios**:

1. **Given** el formulario está vacío, **When** el usuario observa el botón "Crear cuenta", **Then** el botón se muestra deshabilitado y no puede ser pulsado.
2. **Given** todos los campos tienen valores y el checkbox NO está marcado, **When** el usuario observa el botón, **Then** el botón permanece deshabilitado.
3. **Given** todos los campos tienen valores y el checkbox está marcado, **When** el usuario observa el botón, **Then** el botón se habilita y puede ser pulsado.
4. **Given** el botón está habilitado, **When** el usuario desmarca el checkbox, **Then** el botón vuelve al estado deshabilitado.

---

### User Story 4 — Registro con proveedor social (Google / Apple) (Priority: P3)

Un usuario prefiere no crear credenciales manuales y pulsa los botones de "Continuar con Google" o "Continuar con Apple". El sistema le informa que esta opción estará disponible próximamente.

**Why this priority**: Es funcionalidad futura declarada en el diseño. El comportamiento actual es informativo, no funcional.

**Independent Test**: Puede probarse pulsando cada botón y verificando que aparece el mensaje "Próximamente".

**Acceptance Scenarios**:

1. **Given** el usuario está en la página de registro, **When** pulsa el botón "Continuar con Google", **Then** aparece un mensaje de alerta con el texto "Próximamente".
2. **Given** el usuario está en la página de registro, **When** pulsa el botón "Continuar con Apple", **Then** aparece un mensaje de alerta con el texto "Próximamente".

---

### User Story 5 — Navegación hacia inicio de sesión (Priority: P3)

Un usuario que ya tiene cuenta visualiza el enlace "¿Ya tienes cuenta? Inicia sesión" y lo pulsa para ir a la página de inicio de sesión.

**Why this priority**: Flujo de navegación básico que evita que usuarios existentes se registren por error.

**Independent Test**: Puede probarse pulsando el enlace y verificando la redirección a `/login`.

**Acceptance Scenarios**:

1. **Given** el usuario está en la página de registro, **When** pulsa "¿Ya tienes cuenta? Inicia sesión", **Then** es redirigido a la página `/login`.

---

### User Story 6 — Experiencia responsive (Priority: P2)

La página de registro se adapta correctamente a diferentes tamaños de pantalla: en escritorio muestra dos paneles (panel visual + panel de formulario) y en móvil muestra únicamente el formulario.

**Why this priority**: La mayoría de usuarios de billeteras digitales acceden desde dispositivos móviles; la experiencia debe ser óptima en ambos contextos.

**Independent Test**: Puede probarse redimensionando el navegador o usando herramientas de emulación de dispositivos.

**Acceptance Scenarios**:

1. **Given** el usuario accede desde un dispositivo de escritorio (ancho ≥ 1024 px), **When** carga la página de registro, **Then** se muestran dos paneles lado a lado: el panel izquierdo con imagen/branding y el panel derecho con el formulario.
2. **Given** el usuario accede desde un dispositivo móvil (ancho < 768 px), **When** carga la página de registro, **Then** solo se muestra el formulario, sin el panel de imagen/branding.

---

### Edge Cases

- ¿Qué sucede si el usuario envía el formulario y el correo ya está registrado? → El sistema muestra un mensaje de error inline indicando que el correo ya está en uso.
- ¿Qué sucede si el servicio de registro no está disponible temporalmente? → El sistema muestra un mensaje de error genérico y no redirige al usuario.
- ¿Qué pasa si el usuario pega texto con espacios extra en los campos? → El sistema elimina espacios al inicio y al final antes de validar.
- ¿Qué pasa si el usuario intenta enviar el formulario usando "Enter" con el botón deshabilitado? → El envío no se produce.

---

## Requirements *(mandatory)*

### Security & Validation Constraints *(mandatory)*

- **Constraint**: Todas las entradas del usuario DEBEN ser validadas rigurosamente antes de procesarse para prevenir inyecciones y asegurar la integridad de los datos.
- **Constraint**: Las rutas protegidas DEBEN requerir autenticación antes de conceder acceso; el acceso no autorizado debe ser rechazado explícitamente.
- **Constraint**: El uso de librerías externas está estrictamente prohibido; toda funcionalidad debe implementarse con capacidades nativas o código propio.
- **Constraint**: Todos los nombres de componentes, clases y estructuras relevantes DEBEN usar `PascalCase`.
- **Constraint**: Las contraseñas nunca deben exponerse en texto plano en el frontend ni en logs.

### Functional Requirements

- **FR-001**: El sistema DEBE mostrar un formulario con los campos: Nombre completo, Correo electrónico, Contraseña, Confirmar contraseña.
- **FR-002**: El sistema DEBE validar que el campo "Correo electrónico" contenga un formato de email válido antes de permitir el envío.
- **FR-003**: El sistema DEBE validar que la "Contraseña" tenga un mínimo de 8 caracteres.
- **FR-004**: El sistema DEBE validar que "Confirmar contraseña" sea idéntico al campo "Contraseña".
- **FR-005**: El sistema DEBE marcar todos los campos como obligatorios y mostrar errores si alguno está vacío al intentar enviar.
- **FR-006**: Los mensajes de error de validación DEBEN mostrarse inline, debajo del campo afectado, sin recargar la página.
- **FR-007**: El botón "Crear cuenta" DEBE permanecer deshabilitado hasta que todos los campos contengan valores y el checkbox de términos esté marcado.
- **FR-008**: El sistema DEBE incluir un checkbox de aceptación de términos y condiciones que el usuario debe marcar para habilitar el envío.
- **FR-009**: Al registrarse exitosamente, el sistema DEBE redirigir al usuario a `/login` con un mensaje de éxito visible.
- **FR-010**: El sistema DEBE incluir botones de "Continuar con Google" y "Continuar con Apple" que al pulsarse muestren el mensaje de alerta "Próximamente".
- **FR-011**: El sistema DEBE incluir el enlace "¿Ya tienes cuenta? Inicia sesión" que redirija a `/login`.
- **FR-012**: En pantallas de escritorio (≥ 1024 px), la página DEBE mostrar dos paneles: uno visual/branding y uno de formulario.
- **FR-013**: En pantallas móviles (< 768 px), la página DEBE mostrar únicamente el panel de formulario.

### Key Entities

- **RegistroUsuario**: Representa la solicitud de creación de cuenta. Atributos: nombre completo, correo electrónico, contraseña (no expuesta). Sin relación con entidades externas en esta fase.
- **SesionNueva**: Resultado exitoso del registro que se usa para comunicar el estado a la página de login.

---

## Success Criteria *(mandatory)*

### Measurable Outcomes

- **SC-001**: Los usuarios pueden completar el formulario de registro y crear su cuenta en menos de 2 minutos desde que acceden a la página.
- **SC-002**: El 95 % de los mensajes de error de validación se muestran sin recargar la página ni perder los datos ingresados.
- **SC-003**: El 100 % de los intentos de envío con datos inválidos son bloqueados antes de llegar al servidor.
- **SC-004**: La página de registro es completamente funcional y usable en dispositivos con ancho de pantalla desde 320 px hasta 2560 px.
- **SC-005**: El 90 % de los usuarios nuevos completan el registro en el primer intento sin necesidad de soporte.
- **SC-006**: Tras un registro exitoso, el usuario ve el mensaje de éxito en `/login` en menos de 1 segundo.

---

## Assumptions

- El proyecto ya cuenta con una página `/login` funcional a la que se redirige tras el registro exitoso.
- El diseño Figma (node 31-2) define la disposición visual de dos paneles en escritorio: panel izquierdo con imagen/branding de KynWallet y panel derecho con el formulario.
- Los botones de Google y Apple son marcadores de posición para funcionalidad futura; no se implementará autenticación OAuth en esta iteración.
- La lógica de almacenamiento y autenticación de usuarios será provista por el backend existente o un servicio ya configurado en el proyecto; esta especificación cubre únicamente la experiencia del frontend.
- El mensaje de éxito tras el registro se pasa a la página `/login` a través del estado de navegación (no query params ni localStorage) para evitar exposición de datos en la URL.
- Los términos y condiciones tienen su propia página o modal ya existente; este formulario solo requiere el enlace o referencia a ellos.
- El proyecto sigue la arquitectura y principios definidos en la constitución: Clean Architecture, SOLID, TDD, sin librerías externas, PascalCase.
