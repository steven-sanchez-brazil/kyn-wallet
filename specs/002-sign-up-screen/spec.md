# Especificación de Funcionalidad: Creación de Cuenta con Diseño Figma

**Feature Branch**: `002-sign-up-screen`  
**Creado**: 2026-06-08  
**Estado**: Borrador  
**Input**: "Construye la pantalla de creación de cuenta de una billetera virtual, para eso utiliza el MCP de figma, te comparto el frame: https://www.figma.com/proto/higRqkyLzuX0v0g1gdjYUe/Billetera-Virtual---Prototipos--copia-?node-id=2-2&t=1SLIrNaUKgoOHDtH-1&scaling=min-zoom&content-scaling=fixed&page-id=0%3A1&starting-point-node-id=2%3A2, los datos van a ser simulados con usuarios ficticios (en lo posible usá nombres que correspondan a Star Wars). La creación exitora de la cuenta lo va a redirigir a una pantalla en contruccion."

## Escenarios de Usuario y Pruebas *(obligatorio)*

### Historia de Usuario 1 - Creación Exitosa de Cuenta (Prioridad: P1)

Como un usuario nuevo que no tiene cuenta en KynWallet, quiero ingresar mi nombre completo, correo electrónico, contraseña y la confirmación de la contraseña para registrarme exitosamente y acceder a la plataforma.

**Por qué esta prioridad**: Es el flujo principal de onboarding. Sin creación de cuenta, los nuevos usuarios no pueden utilizar la billetera virtual.

**Prueba Independiente**: Se puede probar ingresando un nombre completo ficticio de Star Wars (ej. "Luke Skywalker"), un correo con formato válido (ej. "luke@skywalker.com") y contraseñas coincidentes de 8 o más caracteres (ej. "maytheforce"), presionando el botón "Registrarse", y verificando que el usuario es guardado en memoria y se redirige a `/construction`.

**Escenarios de Aceptación**:

1. **Dado** que el usuario está en la pantalla de Registro, **Cuando** ingresa datos válidos de registro y hace clic en "Registrarse", **Entonces** el sistema registra la nueva cuenta en el listado simualdo de usuarios y redirige automáticamente a `/construction`.
2. **Dado** que el usuario se encuentra en la pantalla de Registro, **Cuando** visualiza el panel de marca (izquierdo), **Entonces** debe ver la misma identidad visual que el Login (degradado de naranja y tarjeta Kyn Card con "STEVEN LUNA").

---

### Historia de Usuario 2 - Validaciones de Seguridad y Formato en Tiempo Real (Prioridad: P2)

Como usuario, quiero recibir retroalimentación visual inmediata si cometo un error al completar el formulario de registro, para poder corregirlo antes de intentar enviar los datos.

**Por qué esta prioridad**: Evita el envío de datos erróneos al servidor simulado y mejora la usabilidad guiando al usuario.

**Prueba Independiente**: Ingresar un formato de correo incorrecto (ej. "luke@"), una contraseña corta (ej. "force") y contraseñas que no coinciden, y verificar que los mensajes de error correspondientes aparecen debajo de cada campo.

**Escenarios de Aceptación**:

1. **Dado** que el usuario escribe un correo electrónico, **Cuando** el formato no es válido, **Entonces** el sistema muestra "Formato de correo inválido" en tiempo real.
2. **Dado** que el usuario escribe una contraseña, **Cuando** la contraseña tiene menos de 8 caracteres, **Entonces** el sistema muestra "La contraseña debe tener al menos 8 caracteres" en tiempo real.
3. **Dado** que el usuario escribe la confirmación de contraseña, **Cuando** no coincide con la contraseña original, **Entonces** el sistema muestra "Las contraseñas no coinciden" en tiempo real.

---

### Historia de Usuario 3 - Navegación y Accesos Sociales (Prioridad: P3)

Como usuario, quiero poder regresar fácilmente a la pantalla de Login si ya tengo una cuenta, y tener la opción de registrarme con mis cuentas de Google o Apple.

**Por qué esta prioridad**: Ofrece alternativas de navegación y completa la paridad visual con la propuesta de diseño de Figma.

**Prueba Independiente**: Hacer clic en el enlace "¿Ya tienes una cuenta? Inicia sesión" y comprobar que redirige a `/` (login), o hacer clic en los botones de Google o Apple y verificar que muestran el cartel de "próximamente".

**Escenarios de Aceptación**:

1. **Dado** que el usuario está en la pantalla de Registro, **Cuando** hace clic en "¿Ya tienes una cuenta? Inicia sesión", **Entonces** es redirigido a la pantalla principal de Login.
2. **Dado** que el usuario observa las opciones de registro social, **Cuando** presiona el botón de Google o Apple, **Entonces** se muestra la alerta de "Google estará disponible próximamente" o "Apple estará disponible próximamente".

---

### Casos de Borde

- **Correo ya registrado**: Si el usuario intenta registrarse con un correo de Star Wars que ya existe en el listado precargado (ej. "leia@organa.com"), el sistema debe mostrar un error de autenticación general: "Este correo electrónico ya se encuentra registrado".
- **Nombre vacío o extremadamente corto**: El nombre completo debe tener al menos 3 caracteres para ser considerado válido. De lo contrario, mostrar "El nombre debe tener al menos 3 caracteres".
- **Espacios al inicio o final**: El sistema debe recortar (trim) los espacios sobrantes en el nombre y el correo antes de procesar el registro.

## Requisitos *(obligatorio)*

### Restricciones de Seguridad y Validación *(obligatorio)*

- **Constraint**: Todos los campos de entrada de usuario DEBEN ser validados rigurosamente antes de procesar el registro (nombre completo >= 3 caracteres, formato email con regex, contraseña >= 8 caracteres y coincidencia exacta).
- **Constraint**: El uso de librerías externas de interfaz de usuario o validación está estrictamente prohibido. Toda la UI y lógica debe implementarse con React nativo, Tailwind CSS y lógica custom.
- **Constraint**: El nombre de las estructuras principales y componentes creados DEBE seguir estrictamente la convención `PascalCase`.
- **Constraint**: Los datos deben manejarse en memoria pura en el servicio simulado, persistiendo los nuevos usuarios durante el ciclo de vida de la aplicación.

### Requisitos Funcionales

- **FR-001**: El sistema DEBE proveer una pantalla de Registro (`/register`) con el mismo diseño dividido (BrandPanel a la izquierda, formulario de registro a la derecha) que la pantalla de Login.
- **FR-002**: El formulario de registro DEBE contener los siguientes campos obligatorios: Nombre Completo, Correo Electrónico, Contraseña y Confirmar Contraseña.
- **FR-003**: El sistema DEBE validar la coincidencia de las contraseñas en tiempo real e impedir el envío del formulario si existen errores activos.
- **FR-004**: El servicio de autenticación DEBE incluir una lista pre-cargada de usuarios de Star Wars para simular colisiones de correo y validaciones.
- **FR-005**: Al completar un registro exitoso, el sistema DEBE agregar al nuevo usuario al listado de usuarios simulados y redirigir inmediatamente a `/construction`.

### Entidades Clave

- **User**: Representa un usuario registrado en el sistema simulado.
  - Atributos: `Name` (string), `Email` (string), `Password` (string).
- **DesignTokens**: Valores visuales extraídos de Figma aplicados a los componentes de UI en `/register`.

## Criterios de Éxito *(obligatorio)*

### Resultados Medibles

- **SC-001**: Un usuario nuevo puede completar exitosamente el registro en menos de 20 segundos sin interrupciones.
- **SC-002**: El sistema detecta y visualiza errores de validación en tiempo real en menos de 100ms de retraso.
- **SC-003**: El diseño del formulario de Registro (colores, espaciados, bordes redondeados de 12px) coincide exactamente con los lineamientos del Login de Figma, adaptándose perfectamente a dispositivos móviles (el BrandPanel se oculta y el formulario ocupa el 100% de la pantalla).

## Suposiciones

- Los datos del registro se guardan únicamente en el estado en memoria de la aplicación, por lo que al recargar el navegador se reiniciarán a su estado original (incluyendo los usuarios simulados de Star Wars).
- El usuario posee un navegador moderno con soporte para Flexbox, CSS Grid y JavaScript habilitado.
- El diseño para dispositivos móviles asume que el Brand panel se oculta para dar prioridad al formulario, igual que en el login implementado.
