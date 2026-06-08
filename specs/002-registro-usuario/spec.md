# Especificación de Funcionalidad: Registro de Usuario

**Feature Branch**: `002-registro-usuario`  
**Creado**: 2026-06-04  
**Estado**: Borrador  
**Entrada**: "Pantalla de registro de usuario para la billetera digital kyn-wallet con formulario, validaciones, botones sociales, navegación y diseño responsive."

## Escenarios de Usuario y Pruebas *(obligatorio)*

### Historia de Usuario 1 — Registro Exitoso con Datos Válidos (Prioridad: P1)

Como nuevo usuario, quiero completar el formulario de registro con mis datos personales para crear una cuenta en KynWallet y ser redirigido al login con confirmación visual de éxito.

**Por qué esta prioridad**: Es el flujo principal sin el cual ningún usuario nuevo puede acceder al sistema. Todo lo demás depende de que este flujo funcione correctamente.

**Prueba Independiente**: Se puede probar ingresando nombre, correo válido, contraseña de 8+ caracteres, confirmación coincidente y marcando el checkbox. Al hacer clic en "Crear Cuenta", el sistema debe redirigir a `/login` y mostrar un mensaje de éxito al usuario.

**Escenarios de Aceptación**:

1. **Dado** que el usuario está en la pantalla de registro con todos los campos vacíos, **Cuando** ingresa nombre completo, correo válido, contraseña de 8+ caracteres, confirma la contraseña y acepta los términos, **Entonces** el botón "Crear Cuenta" se habilita y al presionarlo el sistema lo redirige a `/login` con un mensaje de éxito visible.
2. **Dado** que el usuario ha completado el registro exitosamente, **Cuando** llega a `/login`, **Entonces** ve un aviso de tipo banner/toast con el mensaje "¡Cuenta creada exitosamente! Inicia sesión para continuar." que desaparece después de un tiempo razonable.
3. **Dado** que el usuario está en el proceso de envío del formulario, **Cuando** hace clic en "Crear Cuenta", **Entonces** el botón muestra un estado de carga (spinner o texto "Creando cuenta...") y queda deshabilitado hasta que la operación finalice.

---

### Historia de Usuario 2 — Validaciones en Tiempo Real del Formulario (Prioridad: P2)

Como usuario, quiero recibir retroalimentación inmediata mientras lleno el formulario para corregir errores antes de intentar enviar.

**Por qué esta prioridad**: Las validaciones en tiempo real reducen la frustración del usuario y previenen envíos con datos incorrectos. Es un requisito explícito del brief.

**Prueba Independiente**: Se puede probar sin necesidad de enviar el formulario. Cada campo puede probarse individualmente verificando que los mensajes de error aparecen y desaparecen según el input del usuario.

**Escenarios de Aceptación**:

1. **Dado** que el usuario escribe un correo con formato inválido (sin `@`, sin dominio), **Cuando** el campo pierde el foco o se actualiza en tiempo real, **Entonces** el campo se resalta en rojo y aparece el mensaje "Formato de correo inválido".
2. **Dado** que el usuario ingresa una contraseña de menos de 8 caracteres, **Cuando** escribe en el campo, **Entonces** aparece el mensaje "La contraseña debe tener al menos 8 caracteres".
3. **Dado** que el usuario ingresa contraseñas distintas en "Contraseña" y "Confirmar Contraseña", **Cuando** actualiza cualquiera de los dos campos, **Entonces** aparece el mensaje "Las contraseñas no coinciden" en el campo de confirmación.
4. **Dado** que el usuario intenta enviar el formulario con campos obligatorios vacíos, **Cuando** presiona "Crear Cuenta", **Entonces** todos los campos vacíos se marcan en rojo con el mensaje "Este campo es obligatorio".
5. **Dado** que el usuario ingresa un nombre o correo con espacios al inicio o al final, **Cuando** el campo pierde el foco, **Entonces** el sistema aplica trim automático o muestra una advertencia marcada en rojo indicando que hay caracteres inválidos para que el usuario pueda corregir.
6. **Dado** que el usuario intenta enviar el formulario sin aceptar los términos, **Cuando** presiona "Crear Cuenta", **Entonces** el checkbox se resalta como error con el mensaje "Debes aceptar los términos y condiciones".

---

### Historia de Usuario 3 — Botones Sociales con Aviso "Próximamente" (Prioridad: P3)

Como usuario, quiero ver las opciones de registro con Google y Apple para conocer que estarán disponibles, recibiendo una indicación visual clara de que aún no están activas.

**Por qué esta prioridad**: Mejora la percepción de completitud de la pantalla y gestiona expectativas del usuario, pero no bloquea el flujo principal de registro.

**Prueba Independiente**: Se puede probar en desktop (hover sobre los botones) y en mobile (intento de toque), verificando que aparece el aviso "Próximamente" sin ejecutar ninguna acción de autenticación.

**Escenarios de Aceptación**:

1. **Dado** que el usuario está en desktop y mueve el cursor sobre el botón de Google o Apple, **Cuando** el cursor hace hover, **Entonces** aparece un tooltip o alert con el texto "Próximamente".
2. **Dado** que el usuario está en un dispositivo móvil e intenta tocar el botón de Google o Apple, **Cuando** inicia cualquier interacción táctil (touchstart o click), **Entonces** aparece un aviso con el texto "Próximamente" sin navegar a ningún proveedor de autenticación.
3. **Dado** que el usuario ve los botones sociales, **Cuando** los visualiza sin interactuar, **Entonces** los botones muestran el ícono y nombre del proveedor (G + Google, Apple + Apple) con el estilo visual consistente con el login existente.

---

### Historia de Usuario 4 — Diseño Responsive y Navegación (Prioridad: P4)

Como usuario, quiero ver la pantalla de registro con un diseño adaptado a mi dispositivo y poder navegar fácilmente entre registro y login.

**Por qué esta prioridad**: Garantiza accesibilidad en todos los dispositivos y cierra el ciclo de navegación entre las pantallas de autenticación.

**Prueba Independiente**: Se puede verificar redimensionando el navegador o usando herramientas de emulación móvil. El link de navegación puede probarse de forma independiente verificando que redirige a `/login`.

**Escenarios de Aceptación**:

1. **Dado** que el usuario abre la pantalla en desktop (≥1024px), **Cuando** la página carga, **Entonces** ve dos paneles: izquierdo con el branding de KynWallet (gradiente naranja, logo, tagline, card mockup) y derecho con el formulario de registro.
2. **Dado** que el usuario abre la pantalla en mobile (<1024px), **Cuando** la página carga, **Entonces** el panel de branding se oculta y solo se muestra el formulario en pantalla completa.
3. **Dado** que el usuario está en la pantalla de registro, **Cuando** hace clic en "¿Ya tienes una cuenta? Inicia Sesión", **Entonces** el sistema lo redirige a `/login`.

---

### Casos Extremos

- ¿Qué pasa si el usuario envía el formulario múltiples veces rápidamente (doble clic en "Crear Cuenta")? → El mecanismo de debounce/loading state debe evitar envíos duplicados.
- ¿Qué pasa si el nombre tiene caracteres especiales válidos (tildes, ñ)? → Deben aceptarse como caracteres legítimos del idioma español.
- ¿Qué pasa si el correo tiene espacios intermedios no intencionales? → El sistema debe mostrar advertencia o hacer trim y alertar al usuario.
- ¿Qué ocurre si el usuario navega a `/login` directamente desde el navegador después de un registro exitoso? → No debe mostrarse el mensaje de éxito (es específico del flujo de redirección).

## Requisitos *(obligatorio)*

### Restricciones de Seguridad y Validación *(obligatorio)*

- **Restricción**: Todas las entradas del usuario DEBEN ser validadas rigurosamente antes del procesamiento.
- **Restricción**: El uso de librerías externas está estrictamente prohibido. Toda funcionalidad debe implementarse con capacidades nativas o código propio.
- **Restricción**: Se debe usar `PascalCase` para el nombramiento de componentes, clases, archivos y estructuras relevantes.
- **Restricción**: El botón "Crear Cuenta" DEBE estar deshabilitado durante el procesamiento para evitar envíos duplicados (estado de carga + debounce).

### Requisitos Funcionales

- **FR-001**: El sistema DEBE mostrar un formulario de registro con los campos: Nombres y Apellidos, Correo Electrónico, Contraseña y Confirmar Contraseña.
- **FR-002**: El sistema DEBE incluir un checkbox de aceptación de términos y condiciones como campo obligatorio antes de habilitar el envío.
- **FR-003**: El sistema DEBE validar el formato del correo electrónico en tiempo real (sin `@`, sin dominio = inválido).
- **FR-004**: El sistema DEBE validar que la contraseña tenga un mínimo de 8 caracteres.
- **FR-005**: El sistema DEBE validar que el campo "Confirmar Contraseña" coincida exactamente con el campo "Contraseña".
- **FR-006**: El sistema DEBE tratar los espacios al inicio o al final en nombre y correo aplicando trim o mostrando advertencia visual en rojo para que el usuario corrija.
- **FR-007**: El sistema DEBE prevenir envíos duplicados mediante un estado de carga visible y deshabilitación del botón durante el procesamiento.
- **FR-008**: Tras un registro exitoso, el sistema DEBE redirigir a `/login` y mostrar un mensaje de éxito visible al usuario final.
- **FR-009**: El sistema DEBE incluir botones de Google y Apple que muestren un tooltip/alert "Próximamente" al hover (desktop) o al primer intento de interacción (mobile), sin ejecutar ninguna autenticación.
- **FR-010**: El sistema DEBE incluir un enlace "¿Ya tienes una cuenta? Inicia Sesión" que navegue a `/login`.
- **FR-011**: En desktop (≥1024px), el sistema DEBE mostrar el panel izquierdo de branding (`BrandPanel` existente) y el panel derecho con el formulario, consistente con el diseño de la pantalla de login.
- **FR-012**: En mobile (<1024px), el panel de branding DEBE ocultarse y solo mostrarse el formulario en pantalla completa.
- **FR-013**: El sistema DEBE reutilizar los componentes existentes (`BrandPanel`, `Button`, `Input`, `SocialLogins`) y los tokens de diseño (`DesignTokens`) para mantener consistencia visual.
- **FR-014**: El sistema DEBE seguir los principios TDD: las pruebas se escriben antes de la implementación.

### Entidades Clave

- **RegistrationData**: Representa los datos del formulario de registro. Atributos: `FullName` (string), `Email` (string), `Password` (string), `ConfirmPassword` (string), `AcceptsTerms` (boolean).
- **RegistrationService**: Servicio que procesa el registro de nuevos usuarios. Simula una llamada asíncrona y retorna éxito/fallo.
- **RegisterForm**: Componente principal del formulario de registro con manejo de estado, validaciones y envío.
- **SuccessMessage**: Estado de mensaje de éxito que se pasa entre la pantalla de registro y la de login (via query param o sessionStorage).

## Criterios de Éxito *(obligatorio)*

### Resultados Medibles

- **SC-001**: Los nuevos usuarios pueden completar el proceso de registro en menos de 2 minutos desde que abre la pantalla hasta la redirección exitosa.
- **SC-002**: El 100% de los campos con datos inválidos muestran retroalimentación visual antes del envío del formulario (validación en tiempo real).
- **SC-003**: El formulario no puede enviarse más de una vez por intento (0% de envíos duplicados gracias al estado de carga).
- **SC-004**: La pantalla de registro es visualmente consistente con la pantalla de login existente en un 95% de los elementos de diseño (tipografía, colores, bordes, espaciados).
- **SC-005**: En dispositivos mobile, el 100% del contenido del formulario es accesible y utilizable sin scroll horizontal.
- **SC-006**: El mensaje de éxito tras el registro es visible para el usuario al llegar a `/login` en el 100% de los flujos de registro completados correctamente.

## Suposiciones

- Se asume que la pantalla de registro se ubicará en la ruta `/register` dentro de la estructura `app/` de Next.js.
- Se asume que el `BrandPanel` existente se reutiliza sin modificaciones para el panel izquierdo de la pantalla de registro.
- Se asume que el `SocialLogins` existente se reutiliza y se extiende para cubrir el comportamiento de hover/touch con "Próximamente" de forma consistente con lo que ya existe en login.
- Se asume que el registro es simulado (mock), consistente con el enfoque del `AuthService` existente, sin integración a backend real en esta versión.
- Se asume que el mensaje de éxito post-registro se transmite a `/login` mediante un query param (e.g., `?registered=true`) o `sessionStorage`, sin librerías externas de estado global.
- Se asume que los caracteres especiales del español (tildes, ñ) en el campo de nombre son válidos y aceptados.
- Se asume que la tipografía Inter ya está disponible globalmente según la configuración existente del proyecto.
- Se asume que el diseño visual sigue exactamente los tokens de diseño ya definidos en `DesignTokens.ts` (colores, bordes, tipografía) sin introducir nuevos tokens.
