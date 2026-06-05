# Especificación de Funcionalidad: Registro de Usuarios

**Feature Branch**: `feature/registro-brayhan-sanchez`
**Creado**: 2026-06-05
**Estado**: Aprobado
**Entrada**: Pantalla de Registro de Usuarios de KynWallet con diseño de dos paneles (brand + formulario), validaciones inline, OAuth social (próximamente) y redirección post-registro.

## Escenarios de Usuario y Pruebas

### Historia de Usuario 1 - Registro Exitoso (Prioridad: P1)

Como nuevo usuario, quiero completar el formulario de registro con mis datos válidos para crear mi cuenta en KynWallet.

**Por qué esta prioridad**: Es el flujo de entrada principal al producto. Sin registro no hay usuarios.

**Prueba Independiente**: Ingresar nombre completo, correo válido, contraseña de 8+ caracteres coincidente y aceptar términos → el sistema crea la cuenta y redirige a `/login` con mensaje de éxito.

**Escenarios de Aceptación**:

1. **Dado** que el usuario está en `/register`, **Cuando** completa todos los campos válidos y acepta los términos, **Entonces** al presionar "Crear cuenta" el sistema redirige a `/login?registered=true` con un banner de éxito.
2. **Dado** que el usuario llega a `/login` con `?registered=true`, **Cuando** la página carga, **Entonces** muestra un mensaje "Cuenta creada exitosamente. Inicia sesión." en verde.

---

### Historia de Usuario 2 - Validaciones Inline (Prioridad: P2)

Como usuario, quiero recibir retroalimentación inmediata sobre errores en los campos para corregirlos antes de enviar el formulario.

**Por qué esta prioridad**: Reduce fricciones y mejora la tasa de conversión del registro.

**Escenarios de Aceptación**:

1. **Dado** que el usuario deja un campo vacío y envía, **Entonces** cada campo vacío muestra "Este campo es obligatorio".
2. **Dado** que el usuario ingresa un correo inválido, **Entonces** se muestra "Formato de correo inválido" bajo el campo.
3. **Dado** que la contraseña tiene menos de 8 caracteres, **Entonces** se muestra "La contraseña debe tener al menos 8 caracteres".
4. **Dado** que las contraseñas no coinciden, **Entonces** se muestra "Las contraseñas no coinciden" bajo "Confirmar contraseña".
5. **Dado** que el usuario no acepta los términos, **Entonces** el botón "Crear cuenta" permanece deshabilitado.

---

### Historia de Usuario 3 - Opciones Sociales y Navegación (Prioridad: P3)

Como usuario, quiero ver opciones de registro con Google/Apple y poder navegar al login si ya tengo cuenta.

**Escenarios de Aceptación**:

1. **Dado** que el usuario hace clic en "Google" o "Apple", **Entonces** el sistema muestra `alert("Próximamente")`.
2. **Dado** que el usuario hace clic en "¿Ya tienes cuenta? Inicia sesión", **Entonces** navega a `/login`.

---

### Casos Extremos

- El botón "Crear cuenta" debe estar deshabilitado mientras se procesa la solicitud (loading state).
- En mobile, el panel de marca debe ocultarse, mostrando solo el formulario.
- Si el correo ya existe en el sistema mock, mostrar "Este correo ya está registrado".

## Requisitos

### Restricciones de Seguridad y Validación

- **Restricción**: Todos los campos DEBEN validarse en el cliente antes del envío.
- **Restricción**: Prohibido el uso de librerías de UI externas.
- **Restricción**: PascalCase para estructuras relevantes.
- **Restricción**: La contraseña no debe mostrarse por defecto; incluir toggle de visibilidad.

### Requisitos Funcionales

- **FR-001**: El formulario DEBE incluir: nombre completo, correo electrónico, contraseña, confirmar contraseña.
- **FR-002**: DEBE existir un checkbox de aceptación de términos y condiciones con link.
- **FR-003**: El botón "Crear cuenta" DEBE validar todos los campos y el checkbox antes de procesar.
- **FR-004**: Los botones de Google y Apple DEBEN mostrar `alert("Próximamente")`.
- **FR-005**: El link "¿Ya tienes cuenta? Inicia sesión" DEBE navegar a `/login`.
- **FR-006**: El registro exitoso DEBE redirigir a `/login?registered=true`.
- **FR-007**: La página `/login` DEBE mostrar un mensaje de éxito cuando recibe `?registered=true`.
- **FR-008**: El diseño DEBE ser responsive: 2 paneles en desktop (lg+), solo formulario en mobile.
- **FR-009**: El panel izquierdo DEBE usar el gradiente naranja (#ff8a65 → #ef5226) con texto "Comienza tu camino financiero." y el card mockup.
- **FR-010**: Los inputs DEBEN tener border-radius 12px, borde `#d7d9e6` y focus ring `#ff6b3d`.
- **FR-011**: DEBE incluir toggle de visibilidad en los campos de contraseña.

### Entidades Clave

- **RegisterCredentials**: `{ FullName, Email, Password, ConfirmPassword, AcceptedTerms }`.
- **AuthService**: Extender con método `register(credentials): Promise<RegisterResult>`.
- **RegisterResult**: `{ success: boolean; error?: string }`.

## Criterios de Éxito

- **SC-001**: La UI coincide visualmente con el frame "04 · Registro" de Figma en un 95%.
- **SC-002**: Todas las validaciones inline funcionan antes de enviar el formulario.
- **SC-003**: El flujo completo (registro → redirección → mensaje de éxito en login) funciona end-to-end.
- **SC-004**: La vista es completamente responsive en breakpoints mobile y desktop.

## Suposiciones

- El registro es simulado con un array en memoria (mismo patrón que el login).
- No se requiere persistencia entre recargas de página.
- Los íconos de Google y Apple se representan con texto/emoji (sin assets externos).
