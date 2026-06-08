# Especificación de Funcionalidad: Pantalla de Registro de Usuario (KynWallet)

**Feature Branch**: `002-user-registration`  
**Creado**: 2026-06-05  
**Estado**: Borrador  
**Entrada**: "Create a detailed spec.md for a user registration screen for KynWallet following Spec Driven Development principles."

## Escenarios de Usuario y Pruebas *(obligatorio)*

### Historia de Usuario 1 - Registro de Cuenta Exitoso (Prioridad: P1)

Como usuario nuevo de KynWallet, quiero ingresar mis datos personales y de acceso (Nombre completo, correo electrónico, contraseña y confirmación) para poder crear una cuenta segura y comenzar a usar las funcionalidades de la billetera.

**Por qué esta prioridad**: Es el flujo indispensable de entrada de nuevos usuarios, constituyendo el punto de partida básico (MVP) para la adquisición de clientes.

**Prueba Independiente**: Se puede verificar completando el formulario de registro con datos válidos que cumplan con todos los criterios de formato, seleccionando la casilla de términos y condiciones, y enviando el formulario. El sistema debe procesar la solicitud, mostrar una indicación de procesamiento o éxito e inmediatamente redirigir al usuario a la pantalla de Inicio de Sesión (`/login`) mostrando un mensaje claro de éxito como "Registro realizado con éxito. Inicia sesión con tus nuevas credenciales".

**Escenarios de Aceptación**:

1. **Dado** que el usuario nuevo se encuentra en la pantalla de Registro (`/registro`), **Cuando** completa correctamente el campo "Nombre completo", ingresa un "Correo electrónico" con formato válido, proporciona una "Contraseña" segura, repite idénticamente la contraseña en "Confirmar contraseña", selecciona el checkbox de "Términos y condiciones" y presiona "Crear cuenta", **Entonces** el sistema valida satisfactoriamente la información, registra la simulación del nuevo usuario en el servicio y realiza la redirección a `/login` con el mensaje de éxito correspondiente.
2. **Dado** que el usuario nuevo visualiza la pantalla de registro, **Cuando** observa la columna izquierda, **Entonces** debe ver el Brand Panel que mantiene la identidad de marca de KynWallet, incluyendo el logo, títulos principales, un texto descriptivo de registro y una maqueta visual de tarjeta que simula la Kyn Card con el nombre del titular y datos de expiración.

---

### Historia de Usuario 2 - Validaciones en Tiempo Real y Control de Errores (Prioridad: P2)

Como usuario de KynWallet, quiero que el sistema me ofrezca retroalimentación visual e informativa inmediata (en tiempo real) si cometo un error al completar el formulario de registro para poder subsanarlo antes de enviar el formulario.

**Por qué esta prioridad**: La retroalimentación detallada y oportuna mejora la experiencia del usuario (UX) considerablemente, previniendo frustraciones causadas por reenvíos de formularios fallidos y garantizando que la contraseña ingresada cumpla con los estándares de seguridad necesarios.

**Prueba Independiente**: Probar individualmente cada campo del formulario introduciendo datos incorrectos, perdiendo el foco del campo (evento blur) o intentando enviar el formulario de manera incompleta. Las validaciones de error deben mostrarse justo debajo de cada campo con un color de advertencia distintivo (Neutral o Rojo semántico de la paleta), y el botón de enviar debe permanecer inoperante o alertar al usuario del error antes de realizar llamadas simuladas.

**Escenarios de Aceptación**:

1. **Dado** que el usuario está escribiendo su "Nombre completo", **Cuando** el campo pierde el foco y tiene menos de 3 caracteres o contiene caracteres numéricos o símbolos no permitidos, **Entonces** se debe mostrar un mensaje de validación indicando "Ingresa tu nombre y apellido reales (mínimo 3 caracteres, sin números)".
2. **Dado** que el usuario ingresa su "Correo electrónico", **Cuando** escribe un formato incorrecto (ejemplo: 'usuario@correo') y pierde el foco, **Entonces** el sistema muestra "Correo electrónico inválido".
3. **Dado** que el usuario ingresa su "Contraseña", **Cuando** la contraseña no cumple con los requerimientos mínimos de complejidad, **Entonces** se muestra de forma inmediata "La contraseña debe tener un mínimo de 8 caracteres, al menos una letra mayúscula, una minúscula y un número".
4. **Dado** que el usuario ingresa los datos de "Confirmar contraseña", **Cuando** el valor no coincide con el campo "Contraseña", **Entonces** de inmediato se muestra "La confirmación no coincide con la contraseña".
5. **Dado** que el usuario intenta presionar el botón "Crear cuenta" sin marcar la confirmación de "Términos y condiciones", **Entonces** se muestra un mensaje informativo indicando "Debes aceptar los términos y condiciones de uso para registrarte".

---

### Historia de Usuario 3 - Accesibilidad Visual, Diseño Responsable e Interacciones Sociales (Prioridad: P3)

Como usuario, quiero acceder a la pantalla de registro de forma fluida e intuitiva tanto desde mi computadora de escritorio como desde mi teléfono móvil, observando el contenido de forma legible y con accesos o enlaces visibles para regresar al login o autenticarme con redes sociales, aunque estas últimas estén deshabilitadas temporalmente.

**Por qué esta prioridad**: La adaptabilidad móvil incrementa sustancialmente la tasa de conversión y usabilidad general. Los placeholders de registro social sientan las bases para las integraciones futuras.

**Prueba Independiente**: Redimensionar la pantalla a resoluciones de escritorio (1440x1024) y móvil (390x844). En escritorio, se deben visualizar ambos paneles lado a lado (Brand Panel a la izquierda, Form Panel a la derecha). En móvil, se debe ocultar o replegar el Brand Panel y mostrar exclusivamente el Form Panel de registro, optimizando los espacios. Los botones sociales deben presentar un indicador o banner visual temporizado que informe "Funcionalidad próximamente disponible" al interactuar con ellos.

**Escenarios de Aceptación**:

1. **Dado** que la pantalla se visualiza en una tablet o dispositivo móvil (ancho de viewport menor a 1024px), **Cuando** la página se carga, **Entonces** el panel de marca se oculta y el formulario se expande ocupando todo el ancho de la pantalla de manera responsiva.
2. **Dado** que el usuario tiene cuentas en redes sociales, **Cuando** presiona el botón "Google" o "Apple", **Then** el sistema presenta un banner o modal informativo que dice "Acceso social deshabilitado de momento. ¡Próximamente disponible!".
3. **Dado** que el usuario ya posee una cuenta registrada previamente en KynWallet, **Cuando** presiona el enlace inferior del pie de página "Inicia sesión", **Entonces** es redirigido inmediatamente a la pantalla principal de acceso (`/login`).

---

### Casos Extremos

- **Interrupción o Doble Envío de Formulario**: ¿Cómo se comporta el sistema si el usuario hace clic múltiples veces seguidas en el botón "Crear cuenta" mientras se procesa la validación? El botón principal de registro debe pasar instantáneamente a un estado deshabilitado (disabled) y mostrar un spinner o texto de "Procesando..." para evitar registros duplicados.
- **Comportamiento del Visor de Contraseña (Eye Icon)**: Al hacer clic en los iconos de ojo correspondientes a los campos "Contraseña" y "Confirmar contraseña", la visualización debe conmutar alternativamente entre texto sin formato (visible) y máscara con puntos (oculta), garantizando la seguridad en el entorno del usuario sin entorpecer la verificación de sus ingresos.
- **Dispositivo con Zoom Extremo en Pantallas Pequeñas**: En viewports excesivamente pequeños, el formulario debe permitir el scroll vertical automático sin superposiciones de texto o inputs colapsados, y la visualización de los términos de uso debe permitir un correcto wrap de líneas.

## Requisitos *(obligatorio)*

### Restricciones de Seguridad y Validación *(obligatorio)*

- **Restricción**: Todas las entradas del usuario DEBEN ser rigurosamente validadas de forma inline y durante el procesamiento final antes de cualquier simulación de almacenamiento.
- **Restricción**: El sistema DEBEN implementar una validación robusta de robustez mínima para contraseñas de manera nativa.
- **Restricción**: El uso de **librerías externas está estrictamente prohibido**; por ende, las validaciones e inyecciones de interfaz deben estructurarse con lógica javascript/typescript y estilos directos locales.
- **Restricción**: Se debe utilizar estrictamente `PascalCase` para el nombramiento de las estructuras, componentes y clases del desarrollo.

### Requisitos Funcionales

- **FR-001**: El sistema DEBE implementar un diseño responsivo de pantalla dividida idéntico al de Figma en escritorio (panel izquierdo estático de 620px y panel derecho flexible para el formulario). 
- **FR-002**: El panel derecho (Form Panel) DEBE incluir campos legibles y accesibles para: "Nombre completo", "Correo electrónico", "Contraseña" y "Confirmar contraseña".
- **FR-003**: Cada campo de entrada DEBE mantener la consistencia estética con bordes redondeados (`border-radius: 12px`), color de borde neutro `#d7d9e6`, y usar la tipografía de marca **Inter**.
- **FR-004**: El sistema DEBE incorporar una casilla de verificación o checkbox para la aceptación de "Términos y Condiciones" (ID de Figma `31:33`), la cual debe ser obligatoria para activar o autorizar la sumisión del registro.
- **FR-005**: El botón principal de registro "Crear cuenta" DEBE presentar estilos homólogos al botón de inicio de sesión: color de fondo `#ff6b3d`, texto blanco SemiBold de 16px y bordes redondeados de 12px.
- **FR-006**: Las entradas de contraseña DEBEN contar con su respectivo botón o icono de alternancia de visualización (Eye Icon) que permita al usuario enmascarar o desenmascarar el texto typed.
- **FR-007**: El sistema DEBE incorporar botones sociales estéticos para Google y Apple con bordes de 1.5px color `#d7d9e6`, los cuales mostrarán un aviso informativo amigable en pantalla de "Próximamente disponible" al interactuar con ellos.
- **FR-008**: Al completar un registro válido, el sistema DEBE redirigir de forma automática al usuario a `/login`, inyectando y presentando de manera clara una notificación de bienvenida o éxito.

### Entidades Clave

- **UserRegistrationData**: Estructura de datos temporal que almacena los atributos de registro del nuevo usuario. Atributos: `FullName` (string), `Email` (string), `Password` (string), `ConfirmPassword` (string) y `AgreedToTerms` (boolean).
- **ValidationMessage**: Objeto que define el estado de error y mensaje asociado a un campo de entrada específico. Atributos: `Field` (string), `IsValid` (boolean), `Message` (string).

## Criterios de Éxito *(obligatorio)*

### Resultados Medibles

- **SC-001**: El formulario de registro coincide visualmente en un 95% o superior con el diseño del mockup **04 · Registro** de Figma (ID de frame `31:2`), asegurando consistencia en la tipografía **Inter**, colores neutros `#16182c`, acento `#ff6b3d` y radios de borde de 12px.
- **SC-002**: El proceso de validación inline brinda retroalimentación instantánea (menor a 150 milisegundos tras la interacción o el evento `blur`).
- **SC-003**: El botón de registro bloquea el envío duplicado deshabilitándose mientras el sistema simula el procesamiento del flujo.
- **SC-004**: Los dos paneles se reordenan responsivamente, adaptándose y ocultando el panel de marca en pantallas con resoluciones móviles inferiores a 1024px de ancho.

## Suposiciones

- Se asume el uso de la fuente "Inter" cargada localmente o servida a través de un proveedor consistente con el resto de la aplicación.
- Los activos de iconos (como los de Google, Apple o los iconos de visualización de contraseña) se implementarán mediante código SVG en línea para no depender de librerías externas de iconos.
- La confirmación o persistencia del registro en este hito se simulará localmente de forma ficticia usando el almacenamiento temporal de la sesión o guardando ficticiamente el usuario registrado en el AuthService simulado para que posteriormente pueda iniciar sesión.
- Los Términos y Condiciones apuntarán a un enlace vacío o de demostración `#`, sin requerir el despliegue de una página de políticas legales formal.