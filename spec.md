# Especificación de Funcionalidad: Registro de Usuarios - KynWallet

**Feature Branch**: `feature/registro-gaston-schachtl`  
**Creado**: 2026-06-07  
**Estado**: Borrador  
**Entrada**: Generación de especificación técnica para la pantalla de Registro basada en Next.js 14, Clean Architecture y diseño de alta fidelidad.

## Escenarios de Usuario y Pruebas (TDD) *(obligatorio)*

### Historia de Usuario 1 - Registro Exitoso (Prioridad: P1)

Como nuevo usuario, quiero crear una cuenta proporcionando mis datos para acceder a KynWallet.

**Prueba Independiente**: Verificación con Vitest/RTL de que al completar el formulario con datos válidos, se invoca el servicio de registro, se muestra el mensaje de éxito y se redirige a `/construction`.

**Escenarios de Aceptación (TDD)**:

1. **Dado** que el usuario ingresa un `NombreCompleto` válido, un `CorreoElectronico` no registrado (ej. `nuevo@kyn.com`), una `Contrasena` robusta ("Kyn2026!") y su confirmación idéntica, **Cuando** marca el checkbox de términos y presiona "Crear cuenta", **Entonces** el sistema muestra "Usuario registrado con éxito" y redirige a `/construction`.
2. **Dado** que el usuario presiona "Crear cuenta" con el checkbox desactivado, **Entonces** el formulario no se procesa y se marca el error visual en el checkbox.

---

### Historia de Usuario 2 - Validaciones de Seguridad (Prioridad: P2)

Como usuario, quiero que el sistema valide mis datos para asegurar que mi cuenta sea segura y el correo sea válido.

**Escenarios de Aceptación (TDD)**:

1. **Escenario: Complejidad de Clave**  
   **Dado** que el usuario ingresa una clave de menos de 8 caracteres o sin caracteres especiales, **Cuando** intenta registrarse, **Entonces** el sistema resalta el texto instructivo con los requisitos incumplidos.
2. **Escenario: Correo Duplicado**  
   **Dado** que el correo `test@kyn.com` ya existe en la DB local (simulada en `lib/services/AuthService.ts`), **Cuando** el usuario intenta registrarse con ese mismo correo, **Entonces** el sistema dispara un alert/toast indicando "El correo electrónico ya está en uso".
3. **Escenario: Dominios Prohibidos**  
   **Dado** que el usuario ingresa `root@gmail.com` o `ADMINISTRATOR@outlook.com`, **Cuando** intenta registrarse, **Entonces** el sistema bloquea el registro indicando que el nombre de usuario no es permitido.

---

### Historia de Usuario 3 - Interacciones Auxiliares y UI (Prioridad: P3)

Como usuario, quiero una interfaz consistente y accesos rápidos a otras secciones.

**Escenarios de Aceptación (TDD)**:

1. **Dado** que el usuario hace clic en el botón de "Google" o "Apple", **Cuando** lo presiona, **Entonces** se ejecuta un `alert('Próximamente')` nativo.
2. **Dado** que el usuario selecciona el enlace "¿Ya tienes cuenta? Inicia sesión", **Cuando** lo presiona, **Entonces** es redirigido a la raíz `/`.

## Requisitos *(obligatorio)*

### Arquitectura y Stack Técnico

- **Framework**: Next.js 14 (App Router).
- **Estilos**: Tailwind CSS 3 utilizando `DesignTokens.ts` (bordes de 12px, colores brand).
- **Componentes UI**: Consumir obligatoriamente `components/ui/Button` e `Input`.
- **Lógica**: Ubicada en `lib/utils/Validation.ts` y `lib/services/AuthService.ts`.
- **Testing**: Pruebas con Vitest y React Testing Library.

### Requisitos Funcionales y UI

- **FR-001 (Split-Panel)**: 
  - **Izquierda (Desktop)**: Reutilizar `BrandPanel.tsx` con el degradado naranja y la tarjeta de mockup.
  - **Derecha**: Formulario "Crea tu cuenta" centrado.
  - **Mobile**: Mostrar únicamente el panel del formulario.
- **FR-002 (Campos)**: 
  - `NombreCompleto`: Texto.
  - `CorreoElectronico`: Email (Regex: `texto@texto.texto`).
  - `Contrasena`: Password (8+ chars, 1 Mayúscula, 1 Especial).
  - `ConfirmarContrasena`: Password (Debe coincidir con `Contrasena`).
  - `AceptacionTerminos`: Checkbox obligatorio.
- **FR-003 (Validación de Dominios)**: Bloqueo case-insensitive para: `root`, `system`, `administrator`, `guest`, `nobody`.
- **FR-004 (Persistencia Simulada)**: Verificar contra el estado local/memoria antes de proceder al éxito.
- **FR-005 (Redirección)**: Éxito -> `/construction`. Link Login -> `/`.

### Entidades Clave (PascalCase)

- **UsuarioRegistro**: { `NombreCompleto`, `CorreoElectronico`, `Contrasena`, `AceptoTerminos` }.
- **ValidationResult**: { `IsValid`, `Errors[]` }.

## Criterios de Éxito *(obligatorio)*

- **SC-001**: El diseño en escritorio mantiene la proporción 50/50 y reutiliza `BrandPanel`.
- **SC-002**: Las validaciones de TDD para contraseñas y dominios prohibidos pasan al 100%.
- **SC-003**: El botón de registro usa el color `BrandPrimary` (#ff6b3d) y bordes de 12px.
- **SC-004**: Los botones sociales interrumpen el flujo con un `alert` nativo.

## Suposiciones

- La validación de dominio prohibido se aplica a la parte local del correo (antes del @).
- Los activos de marca ya están configurados en `tailwind.config.ts` vía `DesignTokens`.
- La vista `/construction` está disponible para recibir la redirección.
