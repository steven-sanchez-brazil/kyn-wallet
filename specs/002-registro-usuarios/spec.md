# Especificación de Funcionalidad: Registro de Usuarios KynWallet

**Feature Branch**: `002-registro-usuarios`  
**Creado**: 2026-06-08  
**Estado**: Borrador  
**Entrada**: User description: "construye una pantalla de registro de usuarios de KynWallet..."

## Escenarios de Usuario y Pruebas *(obligatorio)*

### Historia de Usuario 1 - Crear cuenta con validación completa (Prioridad: P1)

Como visitante, quiero completar el formulario de registro con mis datos y validaciones claras para crear mi cuenta sin errores.

**Por qué esta prioridad**: Es el flujo principal que habilita la adquisición de nuevos usuarios.

**Prueba Independiente**: Puede probarse completando nombre, correo, contraseña, confirmación y aceptación de términos, y verificando que el registro se complete y redirija a login con mensaje de éxito.

**Escenarios de Aceptación**:

1. **Dado** que el usuario completa todos los campos con datos válidos y acepta términos, **Cuando** pulsa "Crear cuenta", **Entonces** el sistema registra la cuenta y redirige a `/login` mostrando un mensaje de éxito.
2. **Dado** que al menos un campo está vacío o inválido, **Cuando** el usuario pulsa "Crear cuenta", **Entonces** el sistema bloquea el envío y muestra validaciones inline en cada campo afectado.

---

### Historia de Usuario 2 - Comprender errores en tiempo real (Prioridad: P2)

Como visitante, quiero ver mensajes de validación junto a cada campo para corregir rápidamente errores y terminar el registro.

**Por qué esta prioridad**: Reduce abandono del formulario y mejora la tasa de finalización.

**Prueba Independiente**: Puede probarse ingresando correo inválido, contraseña de menos de 8 caracteres y confirmación distinta, verificando mensajes inline específicos.

**Escenarios de Aceptación**:

1. **Dado** que el correo no tiene formato válido, **Cuando** el campo pierde foco o se intenta enviar, **Entonces** se muestra una validación inline de correo inválido.
2. **Dado** que la contraseña tiene menos de 8 caracteres, **Cuando** el usuario intenta continuar, **Entonces** se muestra una validación inline de longitud mínima.
3. **Dado** que la confirmación no coincide con la contraseña, **Cuando** el usuario termina de escribir o intenta enviar, **Entonces** se muestra una validación inline de no coincidencia.

---

### Historia de Usuario 3 - Usar navegación y accesos alternativos (Prioridad: P3)

Como visitante, quiero acceder al inicio de sesión o probar accesos sociales desde la pantalla de registro para elegir la opción que me convenga.

**Por qué esta prioridad**: Mejora la orientación de usuarios existentes y mantiene expectativas claras sobre funciones futuras.

**Prueba Independiente**: Puede probarse pulsando los botones sociales para recibir el mensaje "Próximamente" y usando el enlace de inicio de sesión para navegar a `/login`.

**Escenarios de Aceptación**:

1. **Dado** que el usuario pulsa "Google" o "Apple", **Cuando** se ejecuta la acción, **Entonces** el sistema muestra el mensaje "Próximamente".
2. **Dado** que el usuario ya tiene cuenta, **Cuando** pulsa "Inicia sesión", **Entonces** el sistema navega a `/login`.

---

### Casos Extremos

- ¿Qué sucede si el usuario pulsa "Crear cuenta" sin aceptar términos y condiciones?
- ¿Cómo responde la UI cuando el usuario cambia entre móvil y escritorio durante la edición del formulario?
- ¿Qué sucede si todos los campos son válidos excepto la confirmación de contraseña?

## Requisitos *(obligatorio)*

### Restricciones de Seguridad y Validación *(obligatorio)*

- **Restricción**: Todas las entradas del usuario DEBEN ser rigurosamente validadas antes del procesamiento.
- **Restricción**: Todas las rutas protegidas DEBEN requerir autenticación previa.
- **Restricción**: El uso de librerías externas está estrictamente prohibido.
- **Restricción**: Se DEBE usar `PascalCase` para estructuras relevantes.

### Requisitos Funcionales

- **FR-001**: El sistema DEBE mostrar un formulario de registro con los campos: nombre completo, correo electrónico, contraseña y confirmar contraseña.
- **FR-002**: El sistema DEBE requerir que todos los campos del formulario sean obligatorios para permitir el registro.
- **FR-003**: El sistema DEBE incluir un checkbox de aceptación de términos y condiciones que sea obligatorio para completar el registro.
- **FR-004**: El sistema DEBE validar inline que el correo tenga formato válido.
- **FR-005**: El sistema DEBE validar inline que la contraseña tenga al menos 8 caracteres.
- **FR-006**: El sistema DEBE validar inline que la contraseña y su confirmación coincidan.
- **FR-007**: El botón "Crear cuenta" DEBE ejecutar la validación completa antes del envío y bloquear el registro si existe cualquier error.
- **FR-008**: Al completar un registro exitoso, el sistema DEBE redirigir al usuario a `/login` y mostrar un mensaje de éxito.
- **FR-009**: Los botones de Google y Apple DEBEN mostrar el mensaje "Próximamente" al interactuar.
- **FR-010**: El enlace "¿Ya tienes cuenta? Inicia sesión" DEBE llevar al usuario a `/login`.
- **FR-011**: En escritorio, la pantalla DEBE mostrarse en dos paneles: panel visual de marca y panel de formulario.
- **FR-012**: En móvil, la pantalla DEBE priorizar solo el formulario para facilitar lectura y uso en pantallas pequeñas.
- **FR-013**: La interfaz DEBE alinearse visualmente con la referencia de diseño proporcionada para la pantalla de registro de KynWallet.

### Entidades Clave

- **RegistroUsuario**: Representa los datos de entrada para crear cuenta. Atributos: NombreCompleto, CorreoElectronico, Contrasena, ConfirmacionContrasena, AceptaTerminos.
- **EstadoValidacionCampo**: Representa el estado de cada validación inline. Atributos: Campo, EsValido, Mensaje.
- **ResultadoRegistro**: Representa el resultado del intento de registro. Atributos: Exitoso, Mensaje, RutaDestino.

## Criterios de Éxito *(obligatorio)*

### Resultados Medibles

- **SC-001**: Al menos 95% de los usuarios de prueba completan el registro exitosamente en su primer intento con datos válidos.
- **SC-002**: 100% de los errores de validación definidos (campos obligatorios, correo inválido, contraseña corta, no coincidencia, términos no aceptados) se muestran inline en el campo correspondiente.
- **SC-003**: 100% de registros exitosos redirigen a `/login` y muestran confirmación de éxito al usuario.
- **SC-004**: La experiencia responsive cumple el patrón esperado: vista de dos paneles en escritorio y formulario único en móvil en 100% de las pruebas de QA definidas para ambos formatos.

## Suposiciones

- La pantalla de login en `/login` ya existe y puede recibir navegación desde registro.
- El mensaje de éxito de registro se presenta de forma visible para el usuario al llegar a login.
- El registro de cuenta utiliza el flujo de creación de usuario ya definido en el producto, sin introducir nuevos tipos de usuario en esta fase.
- El texto de términos y condiciones y su destino legal ya están definidos por el negocio para esta versión.
