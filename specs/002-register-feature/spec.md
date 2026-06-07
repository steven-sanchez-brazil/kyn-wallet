# Especificación de Funcionalidad: Registro de Usuarios de KynWallet

**Feature Branch**: `002-register-feature`  
**Estado**: Borrador  
**Entrada**: "Crear la pantalla de Registro de Usuarios de KynWallet siguiendo el diseño Figma del frame '04 · Registro': https://www.figma.com/design/f7uDsv8sh6ZOtK2OitTqtg/Billetera-Virtual---Prototipos?node-id=31-2&t=QzLzELaKBlCnUPbO-0"

## Escenarios de Usuario y Pruebas

### Historia de Usuario 1 - Registro Exitoso (Prioridad: P1) 🎯 MVP

Como nuevo usuario, quiero crear una cuenta proporcionando mis datos básicos para empezar a usar KynWallet.

**Prueba Independiente**: Verificar que al completar correctamente todos los campos y aceptar los términos, el sistema redirige a `/login?registro=exitoso`. Tras iniciar sesión, debe ir a `/success`.

**Escenarios de Aceptación**:
1. **Dado** que el usuario está en la pantalla de Registro, **Cuando** ingresa nombre, correo, contraseña (mín 8 chars), confirma la contraseña correctamente, acepta los términos y presiona "Crear cuenta", **Entonces** el sistema lo redirige a la página de login con el parámetro de éxito.
2. **Dado** que el usuario inicia sesión tras registrarse, **Cuando** las credenciales son válidas, **Entonces** el sistema lo redirige a `/success`.

---

### Historia de Usuario 2 - Validaciones de Seguridad y Formato (Prioridad: P2)

Como usuario, quiero recibir feedback inmediato si mis datos no cumplen con los requisitos de seguridad o formato para corregirlos antes de enviar el formulario.

**Prueba Independiente**: Intentar registrarse con contraseñas que no coinciden y verificar que aparezca el mensaje de error correspondiente.

**Escenarios de Aceptación**:
1. **Dado** que el usuario ingresa una contraseña y una confirmación distinta, **Cuando** intenta avanzar, **Entonces** el sistema muestra el error "Las contraseñas no coinciden".
2. **Dado** que el usuario ingresa un correo inválido, **Cuando** pierde el foco del campo o intenta enviar, **Entonces** se muestra "Formato de correo inválido".
3. **Dado** que el usuario no marca el checkbox de términos, **Cuando** intenta enviar, **Entonces** el botón se mantiene deshabilitado o muestra un aviso.

---

### Historia de Usuario 3 - Interacción y Navegación (Prioridad: P3)

Como usuario, quiero poder navegar fácilmente al login si ya tengo cuenta o usar mis redes sociales para registrarme.

**Escenarios de Aceptación**:
1. **Dado** que el usuario hace clic en "¿Ya tienes cuenta? Inicia sesión", **Entonces** es redirigido a `/`.
2. **Dado** que el usuario presiona un botón social (Google/Apple), **Cuando** hace clic, **Entonces** ve un alert de "Próximamente".

## Requisitos

### Restricciones de Seguridad y Validación
- **MANDATORIO**: Validación de correo electrónico mediante regex.
- **MANDATORIO**: Contraseña con longitud mínima de 8 caracteres.
- **MANDATORIO**: Comparación estricta entre "Contraseña" y "Confirmar contraseña".
- **MANDATORIO**: El botón "Crear cuenta" debe estar deshabilitado si los términos no son aceptados.
- **CONVENCIÓN**: Uso de `PascalCase` para componentes y tipos.

### Requisitos Funcionales
- **FR-R01**: Layout de panel dividido (Brand Panel a la izquierda, Form Panel a la derecha) en desktop.
- **FR-R02**: Vista de panel único en dispositivos móviles (solo formulario).
- **FR-R03**: Campos: Nombre completo, Correo electrónico, Contraseña, Confirmar contraseña.
- **FR-R04**: Checkbox de aceptación de términos y condiciones.
- **FR-R05**: Integración de botones sociales (Google, Apple) con el estilo visual de la marca.
- **FR-R06**: Redirección a `/login?registro=exitoso` tras validación exitosa.

### Criterios de Éxito
- **SC-R01**: El diseño coincide visualmente con el frame "04 · Registro" de Figma.
- **SC-R02**: Cobertura de pruebas unitarias para la lógica de validación de registro al 100%.
- **SC-R03**: El flujo de navegación entre login y registro es fluido y sin errores de consola.
