# Especificación de Funcionalidad: Registro de Usuarios

**Feature Branch**: `feature/registro-diego-mujica`
**Creado**: 2026-06-07
**Estado**: Aprobado
**Entrada**: "Construir la pantalla de Registro de Usuarios de KynWallet aplicando el flujo SDD y usando el diseño del frame '04 · Registro' de Figma como referencia visual."

---

## Escenarios de Usuario y Pruebas *(obligatorio)*

### Historia de Usuario 1 — Registro Exitoso (Prioridad: P1) 🎯 MVP

Como usuario nuevo, quiero completar el formulario de registro con mis datos y crear mi cuenta para acceder a KynWallet.

**Por qué esta prioridad**: Es el flujo principal de incorporación. Sin registro, el producto no puede crecer en usuarios.

**Prueba Independiente**: Ingresar nombre completo, correo válido, contraseña de 8+ caracteres, confirmar contraseña igual, aceptar términos → presionar "Crear cuenta" → el sistema redirige a `/login` con un mensaje de éxito visible.

**Escenarios de Aceptación**:

1. **Dado** que el usuario está en `/register`, **Cuando** completa todos los campos correctamente y presiona "Crear cuenta", **Entonces** el sistema registra la cuenta y redirige a `/login` con el parámetro `?registered=true`.
2. **Dado** que el usuario llega a `/login` desde el registro, **Cuando** observa la pantalla, **Entonces** ve un banner de éxito: "Cuenta creada exitosamente. Inicia sesión."

---

### Historia de Usuario 2 — Validaciones Inline (Prioridad: P2)

Como usuario, quiero recibir retroalimentación inmediata en cada campo del formulario para corregir errores antes de enviar.

**Por qué esta prioridad**: La validación en tiempo real reduce la fricción y mejora la experiencia de usuario.

**Prueba Independiente**: Dejar campos vacíos y presionar "Crear cuenta" → todos los campos muestran su error. Escribir un correo inválido → aparece error inline sin necesidad de enviar.

**Escenarios de Aceptación**:

1. **Dado** que el usuario deja el campo "Nombre completo" vacío, **Cuando** intenta enviar, **Entonces** aparece el error "El nombre es obligatorio".
2. **Dado** que el usuario escribe un correo sin formato válido, **Cuando** modifica el campo, **Entonces** aparece el error "Formato de correo inválido".
3. **Dado** que el usuario escribe una contraseña de menos de 8 caracteres, **Cuando** modifica el campo, **Entonces** aparece "La contraseña debe tener al menos 8 caracteres".
4. **Dado** que "Confirmar contraseña" no coincide con "Contraseña", **Cuando** modifica el campo, **Entonces** aparece "Las contraseñas no coinciden".
5. **Dado** que el usuario no acepta los términos, **Cuando** intenta enviar, **Entonces** aparece "Debes aceptar los términos y condiciones".

---

### Historia de Usuario 3 — Elementos Secundarios (Prioridad: P3)

Como usuario, quiero ver las opciones de registro social (Google/Apple) y un enlace a Login para tener alternativas de acceso.

**Por qué esta prioridad**: Completa la interfaz según el prototipo de Figma y mejora la accesibilidad a otras rutas.

**Prueba Independiente**: Clic en "Google" → alert "Próximamente". Clic en "Apple" → alert "Próximamente". Clic en "Inicia sesión" → navega a `/`.

**Escenarios de Aceptación**:

1. **Dado** que el usuario hace clic en "Google" o "Apple", **Cuando** se procesa la acción, **Entonces** aparece un alert nativo con el texto "Próximamente".
2. **Dado** que el usuario hace clic en "Inicia sesión", **Cuando** se procesa la acción, **Entonces** navega a la ruta `/` (Login page).

---

### Casos Extremos

- ¿Qué sucede si el usuario intenta registrar un correo ya existente? → Mostrar error de servidor inline: "Este correo ya está registrado."
- ¿Qué sucede en pantallas móviles? → El panel de marca (izquierdo) se oculta; solo se muestra el formulario a pantalla completa.
- ¿Qué sucede si el usuario deshabilita JavaScript? → El formulario renderiza correctamente (SSR), aunque la validación inline no funcionará.

---

## Requisitos *(obligatorio)*

### Restricciones de Seguridad y Validación *(obligatorio)*

- **Restricción**: Todas las entradas del usuario DEBEN ser validadas antes del procesamiento (cliente-side inline + submit).
- **Restricción**: El uso de librerías externas para UI o lógica está estrictamente prohibido.
- **Restricción**: Se debe usar `PascalCase` para nomenclatura de componentes, clases, archivos y estructuras relevantes.
- **Restricción**: La contraseña no debe almacenarse en texto plano (simulado: hash ficticio en el mock).

### Requisitos Funcionales

- **FR-001**: La pantalla DEBE implementar un diseño split-screen: Panel de Marca (izquierdo) y Panel de Formulario (derecho), alineado con el diseño de Login existente.
- **FR-002**: El **Panel de Marca** DEBE reutilizar `BrandPanel` con el texto actualizado: "Comienza tu camino financiero." y subtítulo correspondiente.
- **FR-003**: El **Formulario** DEBE contener los campos: Nombre completo, Correo electrónico, Contraseña, Confirmar contraseña.
- **FR-004**: El formulario DEBE incluir un **checkbox** de aceptación de términos y condiciones con enlace al texto.
- **FR-005**: El botón principal "Crear cuenta" DEBE tener el color `#ff6b3d`, texto blanco SemiBold y border-radius de 12px.
- **FR-006**: Los inputs DEBEN tener border-radius 12px, borde `#d7d9e6` y placeholder en color `#8a8ca8`.
- **FR-007**: El sistema DEBE incluir botones sociales (Google, Apple) con borde 1.5px `#d7d9e6` que muestren alert "Próximamente".
- **FR-008**: El sistema DEBE incluir el link "¿Ya tienes cuenta? **Inicia sesión**" que navegue a `/`.
- **FR-009**: El registro exitoso DEBE redirigir a `/login` (ruta `/`) con parámetro `?registered=true`.
- **FR-010**: La pantalla de Login DEBE detectar `?registered=true` y mostrar un banner de éxito.
- **FR-011**: El diseño DEBE ser **Responsive**: en mobile (< lg) se oculta el Panel de Marca; en desktop se muestra el layout de 2 columnas.

### Entidades Clave

- **RegisterCredentials**: Datos del formulario de registro. Atributos: `FullName`, `Email`, `Password`, `ConfirmPassword`, `AcceptsTerms`.
- **RegisterService**: Servicio mock que simula el registro de un usuario nuevo.
- **RegisterForm**: Componente principal del formulario de registro.
- **RegisterSuccessBanner**: Componente de banner de éxito mostrado en Login tras registro.

---

## Criterios de Éxito *(obligatorio)*

### Resultados Medibles

- **SC-001**: La interfaz de Registro coincide visualmente en ≥ 95% con el frame "04 · Registro" de Figma (layout, colores, tipografía, espaciados).
- **SC-002**: El formulario valida todos los campos inline y al submit; no se procesa si hay errores.
- **SC-003**: El flujo completo (registro → redirección → banner en login) funciona end-to-end en < 2 segundos.
- **SC-004**: El layout es completamente responsive: mobile muestra solo el formulario; desktop muestra el split-screen.

---

## Suposiciones

- El registro es simulado (mock): los datos se almacenan en memoria de sesión; no hay backend real.
- Si el correo ya existe en el mock, se devuelve un error simulado.
- El `BrandPanel` existente se reutiliza con props para personalizar el copy (headline y subtítulo).
- Los iconos de Google y Apple se simulan con texto/SVG inline; no se usan librerías de iconos externas.
- La fuente Inter está disponible vía el sistema o la configuración de Tailwind existente.
