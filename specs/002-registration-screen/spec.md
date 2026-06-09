# Especificación de Funcionalidad: Pantalla de Registro de Usuario

**Feature Branch**: `002-registration-screen`  
**Creado**: 2026-03-19  
**Estado**: Borrador  
**Entrada**: "Crear una pantalla de registro de usuario integral para KynWallet siguiendo la especificación de diseño Figma en el frame '04 · Registro'. La pantalla debe incluir validación completa de formularios, manejo de términos y condiciones, botones de login social con estado 'Próximamente', y navegación responsiva."

## Escenarios de Usuario y Pruebas *(obligatorio)*

### Historia de Usuario 1 - Creación de Cuenta Exitosa (Prioridad: P1)

Como usuario nuevo, quiero registrar una cuenta proporcionando mi nombre completo, correo electrónico válido, una contraseña segura y confirmando que acepte los términos y condiciones para crear mi cuenta en KynWallet.

**Por qué esta prioridad**: Es el flujo crítico del core de la funcionalidad. Sin la capacidad de registrarse, los usuarios no pueden acceder a la plataforma. Este es el MVP fundamental.

**Prueba Independiente**: Se puede probar completamente verificando que al ingresar un nombre válido (ej. "Juan Pérez"), correo único (ej. "juan@ejemplo.com"), contraseña segura (ej. "MiPassword123"), confirmar la contraseña, aceptar términos y presionar "Crear cuenta", el sistema crea la cuenta exitosamente y redirige a la pantalla de login con un mensaje de confirmación.

**Escenarios de Aceptación**:

1. **Dado** que el usuario está en la pantalla de registro, **Cuando** completa todos los campos requeridos (nombre completo válido, correo electrónico válido, contraseña de 8+ caracteres, confirmación de contraseña coincidente, términos aceptados) y presiona "Crear cuenta", **Entonces** el sistema valida todos los datos, crea la cuenta exitosamente en la base de datos y redirige al usuario a la página de login con un parámetro `success=registration` en la URL.

2. **Dado** que el usuario proporciona un nombre completo, **Cuando** ingresa caracteres válidos (letras, espacios, acentos), **Entonces** el campo acepta la entrada sin restricciones.

3. **Dado** que el usuario proporciona un correo electrónico, **Cuando** ingresa un formato válido (RFC 5322 compatible), **Entonces** el campo lo valida exitosamente sin mostrar error.

---

### Historia de Usuario 2 - Validación de Formulario y Retroalimentación de Errores (Prioridad: P1)

Como usuario, quiero recibir mensajes de error claros e inmediatos para cada campo inválido (correo incorrecto, contraseña corta, confirmación no coincidente, términos no aceptados) para saber exactamente qué necesito corregir antes de intentar registrarse nuevamente.

**Por qué esta prioridad**: La validación clara es esencial para la usabilidad. Sin retroalimentación clara, los usuarios se frustran. Este es crítico para el éxito del flujo de registro.

**Prueba Independiente**: Se puede probar completamente verificando que para cada campo inválido (correo sin @, contraseña < 8 caracteres, confirmación que no coincide, términos no aceptados), el sistema muestra un mensaje de error específico y descriptivo cuando el usuario sale del campo (onBlur) o intenta enviar el formulario.

**Escenarios de Aceptación**:

1. **Dado** que el usuario ingresa un correo electrónico con formato inválido (ej. "correoinvalido"), **Cuando** el campo pierde el foco, **Entonces** el sistema muestra el error "Por favor, ingresa un correo electrónico válido" en rojo debajo del campo.

2. **Dado** que el usuario ingresa una contraseña con menos de 8 caracteres (ej. "abc123"), **Cuando** intenta enviar el formulario, **Entonces** el botón "Crear cuenta" permanece deshabilitado y muestra el error "La contraseña debe tener al menos 8 caracteres".

3. **Dado** que el usuario ingresa una contraseña (ej. "Password123") y una confirmación diferente (ej. "Password124"), **Cuando** el campo de confirmación pierde el foco, **Entonces** el sistema muestra el error "Las contraseñas no coinciden".

4. **Dado** que el usuario no marca el checkbox de términos y condiciones, **Cuando** intenta enviar el formulario, **Entonces** el botón "Crear cuenta" permanece deshabilitado y muestra el error "Debes aceptar los términos y condiciones" en rojo.

5. **Dado** que el usuario deja un campo requerido vacío (nombre, correo, contraseña, confirmación o términos), **Cuando** intenta enviar el formulario, **Entonces** el sistema valida todos los campos en el lado del cliente y muestra los errores correspondientes sin enviar la solicitud.

---

### Historia de Usuario 3 - Diseño Responsivo y Consistencia Visual (Prioridad: P2)

Como usuario en cualquier dispositivo (desktop, tablet, móvil), quiero que la pantalla de registro tenga un layout consistente con la página de login, con panel de marca en desktop (layout de 2 columnas) y solo el formulario en móvil (layout responsive full-width) usando los colores, tipografía y espaciado definidos en Figma.

**Por qué esta prioridad**: La consistencia visual y el diseño responsivo son fundamentales para la experiencia del usuario. Aunque el flujo funcional es P1, la presentación visual afecta la percepción de confianza y profesionalismo.

**Prueba Independiente**: Se puede probar visualmente verificando que en desktop aparece el BrandPanel (panel de marca con gradiente) en el lado izquierdo y el formulario en el lado derecho, y en móvil solo aparece el formulario full-width sin el panel de marca.

**Escenarios de Aceptación**:

1. **Dado** que el usuario visualiza la pantalla de registro en desktop (≥1024px), **Cuando** carga la página, **Entonces** ve el BrandPanel con gradiente naranja en el lado izquierdo (50%) y formulario en el lado derecho (50%).

2. **Dado** que el usuario visualiza en tablet o móvil (<1024px), **Cuando** carga la página, **Entonces** el BrandPanel se oculta y formulario ocupa full-width con padding responsivo.

---

### Historia de Usuario 4 - Integración de Términos y Condiciones (Prioridad: P1)

Como usuario, quiero poder leer y aceptar explícitamente los términos y condiciones de KynWallet mediante un checkbox en el formulario de registro, y que esta aceptación sea requisito obligatorio para crear la cuenta.

**Por qué esta prioridad**: La aceptación de términos y condiciones es un requisito legal y de cumplimiento normativo.

**Prueba Independiente**: Se puede probar verificando que el checkbox está presente, es requerido, y el botón se habilita solo cuando se marca.

**Escenarios de Aceptación**:

1. **Dado** que el usuario ve el checkbox de términos, **Cuando** lo lee, **Entonces** el texto es claro: "Acepto los términos y condiciones de KynWallet".

2. **Dado** que el usuario no marca el checkbox, **Cuando** intenta enviar, **Entonces** el botón permanece deshabilitado con error: "Debes aceptar los términos y condiciones".

3. **Dado** que el usuario marca el checkbox, **Cuando** todos los otros campos son válidos, **Entonces** el botón se habilita.

---

### Historia de Usuario 5 - Botones de Login Social (Prioridad: P2)

Como usuario, quiero ver botones de "Continuar con Google" y "Continuar con Apple" en la pantalla de registro (consistentes con la página de login) para saber que estas opciones estarán disponibles próximamente.

**Por qué esta prioridad**: Indica el futuro soporte de login social y reduce confusión.

**Prueba Independiente**: Se puede probar verificando que los botones sociales están presentes, tienen el mismo estilo que en login, y muestran "Próximamente" cuando se hace clic.

**Escenarios de Aceptación**:

1. **Dado** que el usuario ve los botones sociales, **Cuando** hace clic en Google o Apple, **Entonces** muestra un alert con "Próximamente".

---

### Historia de Usuario 6 - Navegación de Inicio de Sesión (Prioridad: P2)

Como usuario, quiero encontrar un link "¿Ya tienes cuenta? Inicia sesión" en la pantalla de registro para navegar fácilmente a la página de login.

**Por qué esta prioridad**: Facilita la navegación entre flujos críticos.

**Escenarios de Aceptación**:

1. **Dado** que el usuario está en registro, **Cuando** hace clic en "Inicia sesión", **Entonces** navega a `/login`.

---

### Historia de Usuario 7 - Manejo de Estado de Carga (Prioridad: P2)

Como usuario, quiero ver un indicador visual mientras el sistema procesa mi solicitud de registro para saber que está en progreso y evitar múltiples clics.

**Por qué esta prioridad**: Mejora UX y previene doble envío.

**Escenarios de Aceptación**:

1. **Dado** que el usuario hace clic en "Crear cuenta", **Cuando** la solicitud está en progreso, **Entonces** el botón muestra "Creando cuenta..." y está deshabilitado.

2. **Dado** que el registro es exitoso, **Cuando** el servidor responde, **Entonces** redirige a `/login?success=registration`.

---

### Casos Extremos

- ¿Qué sucede si el usuario intenta registrarse con un correo que ya existe? → Mostrar error: "Este correo ya está registrado"
- ¿Qué sucede con un nombre completo vacío o solo espacios? → Mostrar error de validación
- ¿Qué sucede si el servidor tarda >10 segundos? → Implementar timeout con mensaje de error
- ¿Qué sucede con un error de servidor? → Mostrar: "Ocurrió un error inesperado. Por favor, intenta de nuevo."
- ¿Cómo se comporta si el usuario presiona "Enter"? → Enviar formulario solo si es válido
- ¿Qué pasa si el usuario cambia el tamaño de la ventana? → Mantener layout responsivo
- ¿Cómo maneja auto-complete y auto-fill? → Permitir y no interferir

## Requisitos *(obligatorio)*

### Restricciones de Seguridad y Validación *(obligatorio)*

- **Restricción**: Todas las entradas del usuario DEBEN ser validadas en el lado del cliente para UX rápida.
- **IMPORTANTE - Versión Taller**: Este es un ejercicio educativo. **Las credenciales NO se persistirán en una base de datos real**. El endpoint `/api/auth/register` es una API Route simulada que:
  - Valida el formato de entrada
  - Retorna respuestas de éxito/error para propósitos de feedback del formulario
  - **NO almacena datos reales**, **NO usa bcrypt**, **NO realiza hash de contraseñas**
  - Simula comportamiento de un servidor real (tiempos, errores, etc.)
  - **En producción**, se requeriría: validación server-side rigurosa, hash seguro de contraseñas (bcrypt), almacenamiento seguro, y todas las mejores prácticas de seguridad.
- **Restricción**: No se DEBEN usar librerías externas para validación de formularios; usar código personalizado.
- **Restricción**: `PascalCase` DEBE usarse para componentes, tipos, interfaces y estructuras.
- **Restricción**: El uso de librerías externas está estrictamente prohibido; usar capacidades nativas de Next.js, React o código personalizado.

### Requisitos Funcionales

- **FR-001**: El sistema DEBE implementar una pantalla de registro con layout responsivo:
  - **Desktop (≥1024px)**: Panel de Marca en izquierda (50%), Formulario en derecha (50%)
  - **Tablet/Móvil (<1024px)**: Panel de Marca oculto, Formulario full-width con padding responsivo

- **FR-002**: El formulario DEBE incluir exactamente: Nombre Completo (required), Correo Electrónico (required, validado), Contraseña (required, mín 8 caracteres), Confirmar Contraseña (required, debe coincidir), Checkbox de Términos (required).

- **FR-003**: El sistema DEBE validar en el lado del cliente (onChange y onBlur) con estas reglas:
  - Nombre Completo: No vacío, sin restricción (letras, espacios, acentos permitidos)
  - Correo: Debe contener exactamente un "@" y al menos un "." después del "@" (ej: usuario@dominio.com, user+tag@company.co.uk)
  - Contraseña: Mínimo 8 caracteres, sin restricción especial
  - Confirmar: Debe coincidir exactamente con Contraseña
  - Términos: Debe estar marcado (true)

- **FR-004**: El sistema DEBE mostrar errores específicos:
  - Correo inválido: "Por favor, ingresa un correo electrónico válido"
  - Contraseña corta: "La contraseña debe tener al menos 8 caracteres"
  - No coinciden: "Las contraseñas no coinciden"
  - Términos no aceptados: "Debes aceptar los términos y condiciones"
  - Correo existe (servidor): "Este correo ya está registrado"

- **FR-005**: El botón "Crear cuenta" DEBE permitir clic para validar e intentar envío, pero DEBE:
  - Validar todos los campos al hacer clic
  - Si hay errores de validación: mostrar errores inline, NO enviar solicitud al servidor
  - Si todos los campos son válidos: enviar solicitud a `/api/auth/register`
  - Durante envío (loading): deshabilitar botón con texto "Creando cuenta..."
  - Después de respuesta: re-habilitar botón con estado inicial o mostrar error
  - Botón siempre activo para permitir feedback de validación al usuario

- **FR-006**: Proceso de envío:
  1. Validar todos los campos en cliente
  2. Si hay errores: mostrar mensajes y no continuar
  3. Si válido: mostrar "Creando cuenta..." en botón y deshabilitar
  4. POST a `/api/auth/register` con: `{ FullName, Email, Password, AcceptedTerms: true }`
  5. **Respuesta simulada (API Route)**: 
     - Éxito (200): Simular delay 500-1000ms, retornar `{ success: true, message: "Cuenta creada" }`
     - Error 409 (Correo existe): Retornar `{ error: "Este correo ya está registrado" }`
     - Error 400 (Validación): Retornar `{ error: "Datos inválidos" }`
     - Error 500 (Simulado): Retornar `{ error: "Ocurrió un error inesperado. Por favor, intenta de nuevo." }`
  6. Éxito: Redirigir a `/login?success=registration` en 1 segundo
  7. Error: Mostrar mensaje error, re-habilitar botón, mantener formulario lleno

- **FR-007**: Panel de Marca DEBE usar componente BrandPanel existente, gradiente naranja (#ff8a65 → #ef5226), coherencia visual con login.

- **FR-008**: Panel de Marca visible solo en desktop (Tailwind: `hidden lg:flex`), 50% ancho en desktop (≥1024px). Oculto en tablet/móvil (<1024px).

- **FR-009**: Componente Input para todos los campos: bordes 12px (rounded-lg), borde gris (#d7d9e6) normal, rojo en error, anillo azul en focus.

- **FR-010**: Botón "Crear cuenta" con Button component: naranja (#ff6b3d), texto blanco, bordes 12px, w-full, deshabilitado visible, texto "Creando cuenta..." durante carga.

- **FR-011**: Checkbox de Términos con label: "Acepto los términos y condiciones de KynWallet", link opcional.

- **FR-012**: Divisor "o continúa con" y botones sociales (Google, Apple) con mismo estilo que login. Clic → alert "Próximamente".

- **FR-013**: Link "¿Ya tienes cuenta? Inicia sesión" que navega a `/login`.

- **FR-014**: Heading principal ("Crear cuenta") y subtítulo ("Registrate en KynWallet para comenzar") con tipografía consistente.

- **FR-015**: RegistrationForm debe ser React FC con `'use client'`, hooks (useState, useEffect).

- **FR-016**: Tailwind CSS para estilos (no CSS Module, inline, styled-components).

- **FR-017**: Todos los labels, placeholders, errores en español.

- **FR-018**: Prevenir envío múltiple: botón deshabilitado hasta respuesta del servidor.

### Entidades Clave *(involucra datos)*

- **RegistrationForm**: Estado del formulario.
  - Atributos: `FullName` (string), `Email` (string), `Password` (string), `ConfirmPassword` (string), `AcceptedTerms` (boolean)
  - Validación: Cada atributo con reglas específicas (FR-003)

- **RegistrationRequest**: Payload a servidor POST `/api/auth/register`.
  - Atributos: `FullName` (string), `Email` (string), `Password` (string), `AcceptedTerms` (boolean = true)
  - Nota: `ConfirmPassword` NO se envía, solo se valida localmente

- **RegistrationResponse**: Respuesta servidor exitosa (2xx).
  - Atributos: `Success` (boolean), `Message` (string), `UserId` (string, optional)
  - Error: `Error` (string), `Code` (number)

- **FieldError**: Error de validación de un campo.
  - Atributos: `FieldName` (string), `ErrorMessage` (string)

- **ValidationRules**: Reglas de validación por campo (FR-003).
  - Nombre: `{ required: true, minLength: 1 }`
  - Correo: `{ required: true, pattern: "exactamente 1 @ y al menos 1 . después del @" }`
  - Contraseña: `{ required: true, minLength: 8 }`
  - Confirmar: `{ required: true, match: Password }`
  - Términos: `{ required: true, value: true }`

## Criterios de Éxito *(obligatorio)*

### Resultados Medibles

- **SC-001**: Interfaz coincide 95% con Figma (disposición 2 columnas desktop, 1 móvil, colores, tipografía, espaciado).

- **SC-002**: Formulario valida correctamente: rechaza correos inválidos, contraseñas cortas (<8), no coincidentes, términos no aceptados sin enviar.

- **SC-003**: Registro exitoso redirige a `/login?success=registration` en <2 segundos.

- **SC-004**: API Route simulada simula rechazo de duplicados: retorna "Este correo ya está registrado" (para propósitos de UX testing).

- **SC-005**: Botón "Crear cuenta" permite clic siempre para validación. Se deshabilita SOLO durante el envío (loading state).

- **SC-006**: En carga, botón muestra "Creando cuenta..." y no responde a clics adicionales (previene doble envío).

- **SC-007**: Responsivo: Desktop (2 col), Tablet (1 col con marca), Móvil (1 col sin marca).

- **SC-008**: Errores específicos y claros (no genéricos).

- **SC-009**: Validación simple de correo: acepta válidos (usuario@dominio.com, usuario+tag@dominio.co.uk), rechaza inválidos (usuario@, @dominio, usuario.dominio, usuario @dominio). Patrón: exactamente 1 "@" y al menos 1 "." después del "@".

- **SC-010**: RegistrationForm testeable con Vitest; funciones de validación puras.

## Suposiciones y Notas del Taller

### Versión Educativa (Taller)
- **API Route simulada**: `/api/auth/register` es una API Route mock que:
  - Simula validación y respuestas de servidor real
  - Retorna respuestas JSON con éxito/error
  - **NO almacena datos reales en base de datos**
  - **NO usa bcrypt ni hashing de contraseñas**
  - Propósito: enseñar flujo completo de registro y manejo de estados en cliente
  
### Suposiciones Técnicas
- Se asume BrandPanel reutilizable sin cambios significativos.
- Se asume Tailwind CSS breakpoints: `lg:` para desktop (≥1024px), sin prefijo para móvil (<1024px).
- Se asume redirección a `/login?success=registration` mostrará mensaje éxito en login (si se implementa).
- Se asume link "Inicia sesión" usa `useRouter().push('/login')` de Next.js 14.
- Se asume errores servidor en JSON con campos `error` o `message` para mostrar.
- Se asume activos visuales (logo, iconos) disponibles como componentes o CDN.
- Se asume validación cliente sin integración terceros (email, SMS); API Route es local.

### Comportamiento Simulado del API Route
- **GET /api/auth/register**: Retorna 405 Method Not Allowed (método POST requerido)
- **POST /api/auth/register**: 
  - Valida formato de input
  - Simula delay 500-1000ms (Simular latencia de red)
  - Retorna 200 ok con `{ success: true, message: "Cuenta creada exitosamente" }` si válido
  - Puede simular 409 Conflict si correo ya existe (para testing)
  - Puede simular 400 Bad Request si datos inválidos
  - Puede simular 500 error (raro, para testing error handling)
