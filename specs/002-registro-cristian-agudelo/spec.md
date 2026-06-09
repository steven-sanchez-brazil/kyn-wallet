# Especificación de Funcionalidad: Registro de Usuarios

**Feature Branch**: `002-registro-cristian-agudelo`  
**Creado**: 2026-06-08  
**Estado**: Borrador  
**Entrada**: "Construir la pantalla de Registro de Usuarios de KynWallet aplicando el flujo de Spec Driven Development (SDD) y utilizando el diseño de Figma como referencia."

## Escenarios de Usuario y Pruebas *(obligatorio)*

### Historia de Usuario 1 - Registro Exitoso y Redirección (Prioridad: P1) - MVP

Como nuevo usuario de KynWallet, quiero registrarme ingresando mi nombre completo, correo electrónico, contraseña válida y confirmación de contraseña para poder tener una cuenta activa y ser redirigido al inicio de sesión con un mensaje de éxito.

**Por qué esta prioridad**: Es el flujo principal para que nuevos usuarios puedan usar la plataforma. 

**Prueba Independiente**: 
1. Completar todos los campos del formulario con datos válidos (ej. Nombre: `Diego Martínez`, Correo: `diego@ejemplo.com`, Contraseña: `password123`, Confirmar Contraseña: `password123`).
2. Marcar la casilla de aceptación de términos y condiciones.
3. Presionar el botón "Crear cuenta".
4. Verificar que el sistema registre al usuario localmente en el mock service, redirija a `/login` (o `/` si es el home actual) y muestre un banner o mensaje de éxito indicando que el registro fue exitoso.
5. Iniciar sesión en el formulario de Login con las nuevas credenciales (`diego@ejemplo.com` / `password123`) y comprobar que la autenticación sea exitosa y redirija a `/construction`.

**Escenarios de Aceptación**:
1. **Dado** que el usuario está en la pantalla de Registro, **Cuando** introduce datos válidos, acepta los términos y condiciones y presiona "Crear cuenta", **Entonces** el sistema registra al usuario, lo redirige al Login y muestra un mensaje de confirmación exitoso.
2. **Dado** que el usuario se encuentra en la pantalla de Login tras un registro exitoso, **Cuando** ingresa el correo y contraseña registrados, **Entonces** el sistema le permite el acceso y redirige a `/construction`.

---

### Historia de Usuario 2 - Validaciones de Datos e Interfaz del Formulario (Priority: P2)

Como usuario, quiero recibir retroalimentación instantánea (inline) sobre los errores en los campos para corregirlos antes de intentar enviar el formulario.

**Por qué esta prioridad**: Evita el envío de datos erróneos al servidor y mejora la experiencia del usuario (UX) previniendo frustraciones.

**Prueba Independiente**:
1. Escribir un correo con formato inválido (ej. `correo-invalido`) y verificar que aparezca el error: "Formato de correo inválido".
2. Escribir una contraseña de menos de 8 caracteres (ej. `123`) y verificar que aparezca el error: "La contraseña debe tener al menos 8 caracteres".
3. Escribir contraseñas diferentes en "Contraseña" y "Confirmar contraseña" y verificar que aparezca el error: "Las contraseñas no coinciden".
4. Dejar campos obligatorios vacíos y presionar "Crear cuenta" para validar que se muestre el aviso de obligatoriedad en cada campo correspondiente.
5. Desmarcar los términos y condiciones y validar que el botón "Crear cuenta" se mantenga inactivo o muestre error si se intenta enviar.

**Escenarios de Aceptación**:
1. **Dado** que el usuario escribe en el campo de correo electrónico, **Cuando** el valor no tiene formato de email (`usuario@dominio.com`), **Entonces** se muestra un mensaje de validación inline.
2. **Dado** que el usuario ingresa una contraseña, **Cuando** la longitud es menor a 8 caracteres, **Entonces** se muestra un mensaje indicando que el mínimo son 8 caracteres.
3. **Dado** que el usuario llena el campo de confirmación de contraseña, **Cuando** no coincide exactamente con la contraseña del primer campo, **Entonces** se muestra un mensaje inline: "Las contraseñas no coinciden".
4. **Dado** que algún campo obligatorio está vacío o no se han aceptado los términos, **Cuando** el usuario intenta enviar, **Entonces** se impide la acción de envío y se marcan los errores.

---

### Historia de Usuario 3 - Elementos Secundarios y Social Login (Priority: P3)

Como usuario, deseo interactuar con los botones de registro social (Google y Apple) y el enlace para regresar al Login con el diseño de Figma, aunque las integraciones sociales muestren un aviso de disponibilidad futura.

**Por qué esta prioridad**: Mantiene la fidelidad al prototipo de alta fidelidad de Figma y ofrece una vía fácil de navegación hacia el login.

**Prueba Independiente**:
1. Presionar el botón de registro de "Google" o "Apple" y verificar que muestre un alert del sistema con el texto `"Próximamente"`.
2. Presionar el link "¿Ya tienes cuenta? Inicia sesión" y validar que redirija a la pantalla de Login.

**Escenarios de Aceptación**:
1. **Dado** que el usuario ve los botones de Google y Apple, **Cuando** hace clic en cualquiera de ellos, **Entonces** se dispara un mensaje de alert del sistema que dice `"Próximamente"`.
2. **Dado** que el usuario ya posee una cuenta activa, **Cuando** hace clic en "¿Ya tienes cuenta? Inicia sesión", **Entonces** el sistema lo redirige a la ruta del login.

## Requisitos *(obligatorio)*

### Restricciones de Seguridad y Validación *(obligatorio)*

- **Restricción**: Todas las entradas del usuario DEBEN ser validadas en el cliente antes de invocar el flujo de registro.
- **Restricción**: El uso de librerías externas de UI o validación (ej. Formik, React Hook Form, Yup, Zod) está estrictamente prohibido para alinearse a la constitución del proyecto.
- **Restricción**: Las estructuras de datos y nombres de archivos de componentes de UI deben seguir la convención `PascalCase`.
- **Restricción**: Las contraseñas deben tener una longitud mínima de 8 caracteres.

### Requisitos Funcionales

- **FR-001**: El sistema DEBE implementar un diseño responsive de pantalla dividida en escritorio (dos paneles: panel de marca a la izquierda y panel de formulario a la derecha) y de un solo panel en dispositivos móviles (solo el panel del formulario de registro).
- **FR-002**: El panel de marca a la izquierda DEBE mostrar el título `"Comienza tu camino financiero."` y la descripción `"Crea tu cuenta en minutos y empieza a enviar, recibir y administrar tu dinero desde cualquier lugar."`, junto al mockup de la tarjeta "Kyn Card" y el logo del sistema.
- **FR-003**: El formulario DEBE contener los siguientes campos de entrada de texto:
  - Nombre completo (placeholder: `"Ej: Diego Martínez"`)
  - Correo electrónico (placeholder: `"tucorreo@ejemplo.com"`)
  - Contraseña (placeholder: `"••••••••"`, campo ocultable/mostrable con icono de ojo)
  - Confirmar contraseña (placeholder: `"••••••••"`, campo ocultable/mostrable con icono de ojo)
- **FR-004**: Los campos de contraseña DEBEN incluir un control interactivo (icono de ojo) para alternar la visibilidad del texto (tipo `password` y `text`).
- **FR-005**: El sistema DEBE incluir un checkbox obligatorio para la aceptación de "términos y condiciones".
- **FR-006**: El botón "Crear cuenta" DEBE tener el estilo visual de color `#ff6b3d` (`bg-brand-primary`), bordes redondeados de 12px (`rounded-lg`) y tipografía Inter SemiBold de 16px.
- **FR-007**: El sistema DEBE incluir botones de registro social para Google y Apple con el texto e iconos correspondientes y bordes de 1.5px color `#d7d9e6`.
- **FR-008**: Al completar exitosamente el registro, el sistema DEBE almacenar el usuario de manera persistente en memoria local (mock) de `AuthService` para permitir el inicio de sesión inmediato del usuario registrado.
- **FR-009**: Al redirigir a `/login`, la página de login DEBE mostrar un mensaje o banner verde indicando el éxito del registro.

### Entidades Clave

- **RegisterCredentials**: Representa los datos requeridos para el registro. Atributos: `FullName`, `Email`, `Password`.
- **User**: Representa un usuario registrado en el sistema. Atributos: `FullName` (opcional), `Email`, `Password`.

## Criterios de Éxito *(obligatorio)*

### Resultados Medibles

- **SC-001**: La UI de la pantalla de registro coincide en un 95% con el diseño Figma de referencia (colores `#ff6b3d`, `#16182c`, `#8a8ca8`, `#d7d9e6` y bordes de 12px y 6px).
- **SC-002**: El formulario no permite el envío si existen errores de validación inline o si no se ha marcado el checkbox de términos.
- **SC-003**: Un usuario registrado exitosamente puede iniciar sesión de forma exitosa usando el formulario de login original con sus nuevas credenciales en menos de 1 segundo de respuesta mock.
- **SC-004**: Cobertura de pruebas unitarias y de integración de la pantalla y lógica de registro superior al 90%.

## Suposiciones

- La validación de fortaleza de contraseña solo limita la longitud mínima a 8 caracteres en esta fase de entrenamiento.
- La aceptación de términos y condiciones es meramente un campo interactivo obligatorio sin vinculación legal real.
- Las cuentas creadas se persisten en memoria de la sesión activa de la aplicación (no base de datos real).
