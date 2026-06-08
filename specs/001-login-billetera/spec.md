# Especificación de Funcionalidad: Actualización de Login con Diseño Figma

**Feature Branch**: `001-login-billetera`  
**Creado**: 2026-06-04  
**Estado**: Borrador  
**Entrada**: "Actualiza el spec del login. Usa el MCP de Figma para obtener el contexto de diseño de este frame: https://www.figma.com/design/f7uDsv8sh6ZOtK2OitTqtg/Billetera-Virtual---Prototipos?node-id=2-2&t=tZepRnS4l8ITDqOs-4 Los colores, tipografía y estructura del formulario deben coincidir con el diseño de Figma (login)."

## Escenarios de Usuario y Pruebas *(obligatorio)*

### Historia de Usuario 1 - Autenticación Exitosa (Prioridad: P1)

Como usuario registrado, quiero ingresar mi correo y contraseña válidos en un formulario que refleje la identidad visual de KynWallet para acceder a mi cuenta.

**Por qué esta prioridad**: Es el flujo crítico de entrada. La identidad visual genera confianza y profesionalismo.

**Prueba Independiente**: Se puede probar verificando que al ingresar credenciales correctas (ej. tucorreo@ejemplo.com / password123), el sistema redirige a la pantalla de "En construcción" y que la UI coincide con los colores brand (#ff6b3d) y tipografía Inter.

**Escenarios de Aceptación**:

1. **Dado** que el usuario está en la pantalla de Login, **Cuando** ingresa un correo y contraseña válidos y presiona "Iniciar sesión", **Entonces** el sistema valida los datos y lo redirige a la pantalla de éxito.
2. **Dado** que el usuario visualiza el panel izquierdo, **Cuando** observa la marca, **Entonces** debe ver el degradado naranja y la tarjeta de mockup con los datos de "STEVEN LUNA" y el logo de "KynWallet".

---

### Historia de Usuario 2 - Retroalimentación de Diseño y Validaciones (Priority: P2)

Como usuario, quiero que los campos de entrada y botones tengan el estilo visual definido en Figma (bordes redondeados de 12px, colores neutros específicos) para tener una experiencia coherente.

**Por qué esta prioridad**: La consistencia visual es clave para la usabilidad y la percepción de calidad del producto.

**Prueba Independiente**: Inspección visual de los elementos: radio de borde de 12px en inputs y botón principal, color de texto #16182c para encabezados.

**Escenarios de Aceptación**:

1. **Dado** que el usuario interactúa con los inputs, **Cuando** el campo está vacío o tiene un formato inválido, **Entonces** el sistema debe mostrar una validación visual que respete el estilo del formulario.
2. **Dado** que el usuario ve el botón de "Iniciar sesión", **Cuando** lo presiona, **Entonces** debe tener el color de fondo #ff6b3d y texto blanco en SemiBold.

---

### Historia de Usuario 3 - Interacción con Elementos Secundarios (Priority: P3)

Como usuario, quiero ver las opciones de "Recordarme", "¿Olvidaste tu contraseña?" y los accesos sociales (Google/Apple) con el diseño de Figma, aunque su funcionalidad sea limitada en esta fase.

**Por qué esta prioridad**: Completa la interfaz visual según el prototipo de alta fidelidad.

**Prueba Independiente**: Verificación de la presencia del divisor "o continúa con" y los botones sociales con borde de 1.5px color #d7d9e6.

**Escenarios de Aceptación**:

1. **Dado** que el usuario ve la sección de redes sociales, **Cuando** hace clic en Google o Apple, **Entonces** el sistema muestra un aviso de "Funcionalidad próximamente".

---

### Historia de Usuario 4 - Navegación a Registro (Prioridad: P2)

Como usuario no registrado, quiero poder navegar a la pantalla de registro desde el login mediante el enlace "Regístrate" para crear mi cuenta.

**Por qué esta prioridad**: Permite el flujo completo de onboarding conectando login con registro.

**Prueba Independiente**: Se puede probar verificando que al hacer clic en "Regístrate" el sistema navega a `/register`.

**Escenarios de Aceptación**:

1. **Dado** que el usuario está en la pantalla de Login, **Cuando** hace clic en "Regístrate" en el footer del formulario, **Entonces** el sistema lo redirige a la pantalla de registro (`/register`).

---

### Historia de Usuario 5 - Toggle de Visibilidad de Contraseña (Prioridad: P2)

Como usuario, quiero poder alternar la visibilidad de mi contraseña mediante un ícono de ojo en el campo de contraseña para verificar lo que estoy escribiendo.

**Por qué esta prioridad**: Mejora la usabilidad y reduce errores de ingreso de contraseña.

**Prueba Independiente**: Se puede probar verificando que al hacer clic en el ícono de ojo, el campo alterna entre `type="password"` y `type="text"`.

**Escenarios de Aceptación**:

1. **Dado** que el usuario está ingresando su contraseña, **Cuando** hace clic en el ícono de ojo, **Entonces** el campo muestra el texto en claro.
2. **Dado** que la contraseña es visible, **Cuando** hace clic nuevamente en el ícono, **Entonces** el campo oculta el texto con puntos.

---

### Casos Extremos

- ¿Cómo se comporta el degradado del panel izquierdo en pantallas con relaciones de aspecto muy anchas o muy estrechas?
- ¿Qué sucede si el usuario intenta ingresar una contraseña de menos de 8 caracteres (según los puntos del mockup)?

## Requisitos *(obligatorio)*

### Restricciones de Seguridad y Validación *(obligatorio)*

- **Restricción**: Todas las entradas del usuario DEBEN ser rigurosamente validadas antes del procesamiento.
- **Restricción**: Todas las rutas protegidas DEBEN requerir autenticación previa.
- **Restricción**: El uso de librerías externas para la UI o lógica está estrictamente prohibido.
- **Restricción**: Se debe usar `PascalCase` para el nombramiento de las estructuras relevantes.

### Requisitos Funcionales

- **FR-001**: El sistema DEBE implementar un diseño de pantalla dividida: Panel de Marca (Brand Panel) a la izquierda y Panel de Formulario (Form Panel) a la derecha.
- **FR-002**: El **Brand Panel** DEBE tener un fondo con gradiente lineal de 121.19° desde `rgb(255, 138, 101)` hasta `rgb(239, 82, 38)`.
- **FR-003**: El sistema DEBE usar la tipografía **Inter** en sus variantes Bold, SemiBold, Medium y Regular según se especifica en el diseño.
- **FR-004**: El **Formulario** DEBE incluir campos de "Correo electrónico" y "Contraseña" con bordes redondeados de 12px y color de borde `#d7d9e6`.
- **FR-005**: El botón de "Iniciar sesión" DEBE tener el color `#ff6b3d`, texto blanco SemiBold de 16px y bordes redondeados de 12px.
- **FR-006**: Los encabezados DEBEN usar el color `#16182c` (Neutral 900) y los textos secundarios el color `#8a8ca8` (Neutral 500).
- **FR-007**: El sistema DEBE incluir un mockup de tarjeta (Card Mockup) en el panel izquierdo con fondo `rgba(255, 255, 255, 0.16)` y borde `rgba(255, 255, 255, 0.35)`.
- **FR-008**: El sistema DEBE mostrar opciones de acceso social (Google, Apple) con bordes de 1.5px color `#d7d9e6`.
- **FR-009**: El campo de contraseña DEBE incluir un ícono de toggle (ojo) para alternar la visibilidad del texto ingresado. El botón DEBE incluir `aria-label="Mostrar/Ocultar contraseña"` para accesibilidad.
- **FR-010**: El formulario DEBE incluir un enlace "Regístrate" en el footer con el texto "¿No tienes cuenta?" (Regular 14px, `#8a8ca8`) + "Regístrate" (SemiBold 14px, `#ef5226`) que navegue a `/register`.
- **FR-011**: Los enlaces de acción ("¿Olvidaste tu contraseña?" y "Regístrate") DEBEN usar el color `#ef5226` (Brand/600) en peso SemiBold 14px.
- **FR-012**: Las etiquetas de los campos (labels) DEBEN usar Inter Medium 14px en color `#3d3f5c` (Neutral 700).
- **FR-013**: Los inputs DEBEN tener una altura de 52px y los botones sociales una altura de 48px.
- **FR-014**: El **Brand Panel** DEBE mostrar el headline "Tu dinero, sin fronteras." (Bold 44px, blanco) y subtítulo "Envía, recibe y paga en segundos. Una billetera pensada para tu día a día." (Regular 17px, `rgba(255,255,255,0.85)`).
- **FR-015**: El Card Mockup DEBE tener un radio de borde de 22px y el **Brand Panel** un padding de 56px horizontal y 64px vertical.
- **FR-016**: El texto del divisor social DEBE ser "o continúa con" (Regular 13px, `#8a8ca8`) con líneas divisoras de color `#d7d9e6`.
- **FR-017**: Los placeholders de los inputs DEBEN usar el color `#a9abc2` (Neutral 400) en Regular 15px.

### Entidades Clave

- **AuthCredentials**: Representa los datos de acceso del usuario. Atributos: `Email`, `Password`.
- **UIStyles**: Definición de los tokens de diseño (colores, espaciados, bordes) extraídos de Figma.

## Criterios de Éxito *(obligatorio)*

### Resultados Medibles

- **SC-001**: La interfaz del Login coincide visualmente en un 95% con el diseño de Figma proporcionado (disposición, colores y tipografía).
- **SC-002**: El formulario es funcional y permite el acceso con las credenciales hardcodeadas en menos de 2 segundos de procesamiento.
- **SC-003**: Todos los elementos de entrada (inputs, checkbox, botones) tienen el radio de borde de 12px (o 6px para el checkbox de Recordarme) según el diseño.

## Suposiciones

- Se asume que el usuario tiene instalada la fuente "Inter" o que el sistema la cargará como recurso local.
- Los activos visuales (logo, iconos sociales) se simularán mediante elementos CSS o placeholders si no están disponibles como archivos individuales.
- El panel de marca ocupa un ancho fijo de 620px en la resolución de diseño (1440x1024), escalando proporcionalmente o manteniendo su estructura.
- Las interacciones sociales y de recuperación de contraseña son meramente visuales para esta versión.
