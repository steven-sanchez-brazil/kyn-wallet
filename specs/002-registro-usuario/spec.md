# Especificación de Funcionalidad: Registro de Usuario Nuevo

**Feature Branch**: `registro-leonardo-tagliabue`

**Creado**: 2026-06-04

**Estado**: Borrador

**Entrada**: "quiero crear una nueva feature para registrar un usuario nuevo, en la pantalla principal debe haber un texto que diga '¿No tiene cuenta? Registrate' como aparece en el primer diseño de figma. Al clickear en 'Registrate' lleva a una pagina que tiene que ser igual al Layer '04 - Registro' de Figma."

**Modelo Gráfico de Referencia**: `registro_screen.png` (archivo verificado en la raíz del proyecto)

## Escenarios de Usuario y Pruebas *(obligatorio)*

### Historia de Usuario 1 - Navegación al Registro desde el Login (Prioridad: P1)

Como usuario nuevo sin cuenta, quiero ver un enlace en la pantalla de login que me invite a registrarme, para poder acceder fácilmente al formulario de registro.

**Por qué esta prioridad**: Es el punto de entrada al flujo de registro. Sin este enlace, los usuarios nuevos no tienen forma de descubrir la funcionalidad de registro.

**Prueba Independiente**: Se puede probar verificando que en la pantalla de login exista el texto "¿No tiene cuenta? Registrate" y que al hacer clic en "Registrate" el sistema navegue hacia la pantalla de registro.

**Escenarios de Aceptación**:

1. **Dado** que el usuario está en la pantalla de Login, **Cuando** observa la parte inferior del formulario, **Entonces** debe ver el texto "¿No tiene cuenta? Registrate".
2. **Dado** que el usuario está en la pantalla de Login, **Cuando** hace clic en el enlace "Registrate", **Entonces** el sistema lo redirige a la pantalla de registro (`/registro`).

---

### Historia de Usuario 2 - Registro de Usuario con Datos Válidos (Prioridad: P1)

Como usuario nuevo, quiero completar un formulario de registro con mis datos personales y credenciales, para crear una cuenta en KynWallet y acceder a la plataforma.

**Por qué esta prioridad**: Es el flujo principal del feature. Sin el formulario funcional, el registro no tiene valor.

**Prueba Independiente**: Se puede probar verificando que al ingresar todos los campos requeridos con datos válidos y confirmar el registro, el sistema procese la solicitud exitosamente.

**Escenarios de Aceptación**:

1. **Dado** que el usuario está en la pantalla de Registro, **Cuando** completa todos los campos requeridos con datos válidos y presiona el botón de registro, **Entonces** el sistema crea la cuenta, muestra una pantalla de confirmación con un mensaje de éxito, y redirige al usuario al login después de unos segundos.
2. **Dado** que el usuario está en la pantalla de Registro, **Cuando** ingresa un correo electrónico con formato inválido, **Entonces** el sistema muestra un mensaje de error de validación.
3. **Dado** que el usuario está en la pantalla de Registro, **Cuando** las contraseñas ingresadas no coinciden, **Entonces** el sistema muestra un mensaje de error indicando que las contraseñas no son iguales.
4. **Dado** que el usuario está en la pantalla de Registro, **Cuando** ingresa una contraseña de menos de 8 caracteres, **Entonces** el sistema muestra un mensaje de error de longitud mínima.
5. **Dado** que el usuario está en la pantalla de Registro, **Cuando** no ha marcado el checkbox de términos y condiciones, **Entonces** el botón de envío del formulario DEBE estar deshabilitado y no permite completar el registro.
6. **Dado** que el usuario hace clic en el hipervínculo "términos y condiciones", **Cuando** el modal se abre, **Entonces** el usuario puede leer el texto completo de los términos y cerrar el modal sin perder los datos del formulario.

---

### Historia de Usuario 3 - Identidad Visual del Formulario de Registro (Prioridad: P2)

Como usuario, quiero que la pantalla de registro tenga la misma identidad visual que el diseño de Figma (Layer "04 - Registro"), para tener una experiencia consistente y profesional dentro de la aplicación KynWallet.

**Por qué esta prioridad**: La consistencia visual con el diseño aprobado es un requisito de calidad, pero no bloquea la funcionalidad básica del registro.

**Prueba Independiente**: Inspección visual de la pantalla de registro comparando colores, tipografía, disposición y estilos contra el diseño Figma del Layer "04 - Registro".

**Escenarios de Aceptación**:

1. **Dado** que el usuario está en la pantalla de Registro, **Cuando** la observa, **Entonces** debe ver el mismo diseño de panel dividido (Brand Panel a la izquierda, formulario a la derecha) definido en el Layer "04 - Registro" de Figma.
2. **Dado** que el usuario interactúa con los inputs, **Cuando** el campo está en foco, **Entonces** los bordes y colores deben respetar los tokens de diseño del proyecto (bordes de 12px, color `#d7d9e6`).

---

### Historia de Usuario 4 - Navegación de Vuelta al Login (Prioridad: P3)

Como usuario que llegó al registro por error, quiero poder volver a la pantalla de login fácilmente, sin tener que usar el botón de atrás del navegador.

**Por qué esta prioridad**: Mejora la experiencia de usuario pero no es crítica para el flujo principal de registro.

**Prueba Independiente**: Verificar que existe un enlace o texto del tipo "¿Ya tenés cuenta? Iniciá sesión" en la pantalla de registro y que al hacer clic navega al login.

**Escenarios de Aceptación**:

1. **Dado** que el usuario está en la pantalla de Registro, **Cuando** observa el formulario, **Entonces** debe ver un enlace para volver a la pantalla de Login.
2. **Dado** que el usuario hace clic en ese enlace, **Entonces** el sistema lo redirige a la pantalla de Login (`/`).

---

### Casos Extremos

- ¿Qué sucede si el usuario intenta registrarse con un correo electrónico que ya está en uso (según los datos de prueba hardcodeados)?
- ¿Cómo se comporta el formulario si el usuario deja campos obligatorios vacíos y presiona el botón de registro?
- ¿Qué sucede si el usuario navega directamente a `/registro` sin pasar por el login?
- ¿Cómo se adapta el diseño de panel dividido en pantallas móviles o de resolución reducida?

## Requisitos *(obligatorio)*

### Restricciones de Seguridad y Validación *(obligatorio)*

- **Restricción**: Todas las entradas del usuario DEBEN ser validadas rigurosamente antes del procesamiento.
- **Restricción**: El uso de librerías externas para la UI o lógica está estrictamente prohibido.
- **Restricción**: Se debe usar `PascalCase` para el nombramiento de componentes, clases e interfaces.

### Requisitos Funcionales

- **FR-001**: La pantalla de Login DEBE mostrar el texto "¿No tiene cuenta? Registrate" con el enlace "Registrate" siendo interactivo.
- **FR-002**: Al hacer clic en "Registrate", el sistema DEBE navegar a la ruta `/registro`.
- **FR-003**: La pantalla de Registro DEBE implementar el diseño visual definido en el archivo de referencia `registro_screen.png` (ubicado en la raíz del proyecto), manteniendo la misma estructura de panel dividido (Brand Panel + Form Panel). Este archivo es la fuente de verdad visual para colores, espaciados, tipografía y disposición de componentes.
- **FR-004**: El formulario de Registro DEBE incluir como mínimo los campos: Nombre completo, Correo electrónico, Contraseña y Confirmar contraseña.
- **FR-005**: El sistema DEBE validar en tiempo real que el correo electrónico tenga formato válido.
- **FR-006**: El sistema DEBE validar que la contraseña tenga al menos 8 caracteres.
- **FR-007**: El sistema DEBE validar que los campos de Contraseña y Confirmar contraseña sean idénticos antes de procesar el registro.
- **FR-008**: El botón de envío del formulario DEBE tener el color `#ff6b3d`, texto blanco SemiBold de 16px y bordes redondeados de 12px, consistente con el resto del sistema de diseño.
- **FR-009**: La pantalla de Registro DEBE incluir un enlace para volver a la pantalla de Login.
- **FR-010**: Los campos de entrada DEBEN tener bordes redondeados de 12px y color de borde `#d7d9e6`, consistente con el diseño del login.
- **FR-011**: Tras un registro exitoso, el sistema DEBE mostrar una pantalla de confirmación con un mensaje visible de éxito (por ejemplo, "¡Cuenta creada!") antes de redirigir al usuario.
- **FR-012**: Tras mostrar la confirmación de registro exitoso, el sistema DEBE redirigir automáticamente al usuario a la pantalla de Login (`/`).
- **FR-013**: El formulario de Registro DEBE incluir un checkbox con la etiqueta "Acepto los términos y condiciones", donde el texto "términos y condiciones" es un hipervínculo interactivo que al ser clickeado muestra una ventana/modal con el texto completo de los términos y condiciones.
- **FR-014**: El botón de envío del formulario DEBE permanecer deshabilitado hasta que el usuario haya marcado el checkbox de aceptación de términos y condiciones.

### Entidades Clave

- **NuevoUsuario**: Representa los datos de un usuario en proceso de registro. Atributos: `NombreCompleto`, `Email`, `Contraseña`, `ConfirmarContraseña`.
- **ResultadoRegistro**: Representa el resultado del intento de registro. Atributos: `Exitoso` (booleano), `MensajeError` (opcional).

## Criterios de Éxito *(obligatorio)*

### Resultados Medibles

- **SC-001**: El enlace "¿No tiene cuenta? Registrate" es visible en la pantalla de Login y navega correctamente a la pantalla de Registro al ser clickeado.
- **SC-002**: El formulario de Registro presenta todos los campos requeridos y el diseño coincide visualmente en un 95% con el archivo de referencia `registro_screen.png` (disposición, colores y tipografía).
- **SC-003**: Las validaciones de formato de correo, longitud de contraseña y coincidencia de contraseñas se ejecutan en tiempo real, antes de que el usuario envíe el formulario.
- **SC-004**: El usuario puede completar el flujo completo (login → click en Registrate → completar formulario → confirmar registro → ver mensaje de éxito → ser redirigido al login) en menos de 3 minutos.
- **SC-005**: La cobertura de pruebas unitarias e integración para los nuevos componentes y lógica de registro alcanza el 100%.
- **SC-006**: Tras un registro exitoso, el usuario ve un mensaje de confirmación antes de ser redirigido automáticamente al Login.
- **SC-007**: El formulario de Registro no puede ser enviado sin que el usuario haya aceptado explícitamente los términos y condiciones mediante el checkbox correspondiente. Al hacer clic en el hipervínculo "términos y condiciones", el usuario puede leer el texto completo en un modal antes de aceptar.

## Suposiciones

- El registro de usuario en esta fase es simulado (hardcodeado en memoria), no persiste en una base de datos real, consistente con el enfoque actual del login.
- La fuente "Inter" ya está disponible en el proyecto como recurso existente.
- El archivo `registro_screen.png` (en la raíz del proyecto) es la fuente de verdad visual para la pantalla de registro. Todo implementador DEBE consultarlo como referencia primaria de diseño.
- El Brand Panel de la pantalla de Registro utiliza el mismo gradiente naranja (`rgb(255, 138, 101)` → `rgb(239, 82, 38)`) que el Login, salvo que `registro_screen.png` indique diferente.
- Los tokens de diseño (colores, bordes, tipografía) ya definidos en `lib/constants/DesignTokens.ts` serán reutilizados y extendidos si es necesario.
- Los componentes UI base (`Button`, `Input`) ya existentes en `components/ui/` serán reutilizados para el formulario de registro.
- La pantalla de registro es accesible públicamente (no requiere autenticación previa para visitarla).
- Tras un registro exitoso (con datos de prueba hardcodeados), el sistema muestra una pantalla de confirmación con un mensaje de éxito y redirige automáticamente al usuario a la pantalla de Login (`/`).
- El texto de los términos y condiciones mostrado en el modal es genérico y representativo; no tiene validez legal en esta fase del proyecto.
