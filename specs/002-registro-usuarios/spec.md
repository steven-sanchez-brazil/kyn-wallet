# Especificación Funcional: Registro de Usuarios KynWallet

**Feature Branch**: `002-registro-usuarios`  
**Creado**: 2026-06-06  
**Estado**: Draft  
**Fuente de diseño**: Frame "04 · Registro" ([Figma node 1:251](https://www.figma.com/design/KplBCX4gAsfTy3Yc65uEUL/Sin-t%C3%ADtulo?node-id=1-251&t=zWq4XENAnCOswWH5-1))

## 1. Context
Registro de nuevos usuarios (personas naturales y PyMEs) en KynWallet. El usuario necesita crear una cuenta para acceder a la billetera digital.

## 2. Functional Requirements
- **FR-001**: El sistema DEBE solicitar nombre completo, correo, contraseña y confirmación de contraseña.
- **FR-002**: El sistema DEBE validar formato de correo electrónico y que la contraseña tenga mínimo 8 caracteres.
- **FR-003**: El sistema DEBE validar que ambas contraseñas coincidan y que todos los campos sean obligatorios.
- **FR-004**: El sistema DEBE exigir la aceptación del checkbox de términos y condiciones.
- **FR-005**: El sistema DEBE incluir botones de Google y Apple que muestren una alerta "Próximamente".
- **FR-006**: El sistema DEBE incluir un link "¿Ya tienes cuenta? Inicia sesión" que redirija a /login.
- **FR-007**: El sistema DEBE redirigir a /login con un mensaje de éxito tras un registro válido.
- **FR-008**: El sistema DEBE mostrar validaciones inline en tiempo real mientras el usuario escribe.

## 3. Acceptance Criteria
- **AC-001 (FR-001)**
  - Given: el usuario está en la pantalla de registro
  - When: visualiza el formulario
  - Then: se muestran los campos Nombre completo, Correo electrónico, Contraseña y Confirmar contraseña

- **AC-002 (FR-002 correo)**
  - Given: el usuario ingresa un correo con formato inválido
  - When: sale del campo o intenta enviar el formulario
  - Then: se muestra el mensaje "Correo electrónico inválido" debajo del campo correo

- **AC-003 (FR-002 contraseña)**
  - Given: el usuario ingresa una contraseña con menos de 8 caracteres
  - When: sale del campo o intenta enviar el formulario
  - Then: se muestra el mensaje "La contraseña debe tener al menos 8 caracteres"

- **AC-004 (FR-003 contraseñas y obligatorios)**
  - Given: el usuario deja campos obligatorios vacíos o ingresa contraseñas diferentes
  - When: presiona "Crear cuenta"
  - Then: se muestran mensajes por campo y el mensaje "Las contraseñas no coinciden" cuando aplique

- **AC-005 (FR-004 términos)**
  - Given: el usuario completa todos los campos pero no acepta términos y condiciones
  - When: presiona "Crear cuenta"
  - Then: se muestra "Debes aceptar los términos y condiciones" y no se envía el formulario

- **AC-006 (FR-005 social buttons)**
  - Given: el usuario está en la pantalla de registro
  - When: hace clic en "Google" o "Apple"
  - Then: se muestra una alerta con el texto "Próximamente"

- **AC-007 (FR-006 navegación a login)**
  - Given: el usuario está en la pantalla de registro
  - When: hace clic en "Inicia sesión"
  - Then: el sistema redirige a /login

- **AC-008 (FR-007 éxito de registro)**
  - Given: el usuario completa correctamente todos los campos y acepta términos
  - When: presiona "Crear cuenta"
  - Then: el sistema registra al usuario, redirige a /login y muestra un mensaje de éxito

- **AC-009 (FR-008 validación en tiempo real)**
  - Given: el usuario escribe en los campos
  - When: ingresa datos inválidos y luego los corrige
  - Then: los mensajes inline aparecen al detectar error y desaparecen al corregir el dato

## 4. Visual Design Requirements (OBLIGATORIO - Extraído de Figma)
### 4.1 Gradientes
- Panel izquierdo (Brand Panel): `linear-gradient(70.7315deg, #FF8A65 31.698%, #EF5226 83.455%)`.

### 4.2 Colores principales (hex)
- Fondo panel derecho: `#FFFFFF`.
- Título principal formulario: `#16182C`.
- Texto secundario: `#8A8BA8`.
- Etiquetas de campos: `#3D3F5C`.
- Placeholder inputs: `#A9ABC2`.
- Bordes de inputs, checkbox y botones sociales: `#D7D9E6` (1.5px).
- CTA principal "Crear cuenta": `#FF6B3D` con texto `#FFFFFF`.
- Enlaces destacados ("términos y condiciones", "Inicia sesión"): `#EF5226`.
- Panel izquierdo textos: `#FFFFFF` y `rgba(255,255,255,0.85)`.
- Tarjeta mockup izquierda:
  - Fondo: `rgba(255,255,255,0.16)`
  - Borde: `rgba(255,255,255,0.35)`
  - Chip: `rgba(255,217,128,0.9)`

### 4.3 Tipografía
- Familia: **Inter**.
- Pesos usados:
  - Bold: logo y headings.
  - Semi Bold: CTA, términos, login link, botones sociales.
  - Medium: labels y textos de tarjeta.
  - Regular: placeholders, texto descriptivo, divisor.
- Tamaños usados:
  - 44px: heading principal del panel izquierdo.
  - 30px: título "Crea tu cuenta".
  - 26px: logotipo "KynWallet".
  - 20px: número de tarjeta.
  - 17px: texto descriptivo panel izquierdo.
  - 16px: subtítulo de formulario y texto del CTA.
  - 15px: placeholders y texto de Google/Apple.
  - 14px: labels, términos y texto "¿Ya tienes cuenta?".
  - 13px: divisor "o regístrate con" y footer de tarjeta.

### 4.4 Border Radius
- Inputs (nombre, correo, contraseña, confirmar): 12px.
- Botón principal "Crear cuenta": 12px.
- Botones sociales (Google/Apple): 12px.
- Checkbox términos: 6px.
- Card mockup panel izquierdo: 22px.
- Chip de tarjeta: 6px.

### 4.5 Sombras
- No se detectan `box-shadow` explícitas en el frame "04 · Registro".

### 4.6 Layout Desktop
- Contenedor base del frame: 1440x1024.
- Estructura de 2 paneles:
  - Panel izquierdo de branding: ancho 620px, alto 1024px, gradiente, logo, titular y card mockup.
  - Panel derecho de formulario: área restante (820px), con formulario alineado desde x=820.
- Ancho del formulario: 400px.
- Posición superior del bloque de formulario: inicia en y=140.

### 4.7 Layout Mobile
- El frame consumido desde Figma corresponde a desktop y no incluye arteboard móvil separado.
- Para cumplir el comportamiento responsive requerido por producto:
  - En mobile se muestra 1 panel (solo formulario).
  - El panel izquierdo de branding se oculta.
  - El formulario se centra y mantiene ancho fluido con máximo visual equivalente al bloque de 400px.

### 4.8 Espaciados y márgenes principales
- Margen izquierdo del formulario: 820px (desktop frame).
- Ancho consistente de controles principales: 400px.
- Altura de inputs y CTA principal: 52px.
- Distancia label a input: 24px (ej. y=222 a y=246).
- Separación vertical entre bloques de campos: 92px entre labels consecutivos (222, 314, 406, 498).
- Distancia entre checkbox (y=592) y CTA (y=628): 36px.
- Distancia entre CTA (y=628) y divisor social (y=708): 80px.
- Botones sociales: 48px de alto, 192px de ancho cada uno, separación horizontal de 16px.

## 5. Constraints
Trazabilidad de restricciones solicitadas vs Constitución vigente:

- **Arquitectura Library-First (estructura modular en src/features/registration/)**: **No está explícita** en la Constitución actual; se registra como restricción de implementación del feature.
- **Cobertura de pruebas >= 80% con Vitest**: **No está explícita** en la Constitución actual; se registra como meta de calidad del feature.
- **No almacenar datos sensibles en localStorage sin cifrar**: **No está explícita** en la Constitución actual; se registra como restricción de seguridad del feature.
- **Validaciones deben ejecutarse tanto en cliente como en servidor**: parcialmente alineada con "Validación de Entradas" constitucional; se extiende para exigir paridad cliente/servidor.
- **Uso de Tailwind CSS para estilos (si está en la Constitución)**: **No está en la Constitución**; en este repositorio se mantiene por convención técnica existente.

Restricciones directamente heredadas de la Constitución (obligatorias):
- TDD obligatorio (Red-Green-Refactor).
- Aplicar principios SOLID.
- Mantener separación por Clean Architecture.
- Aplicar DRY y YAGNI.
- Usar PascalCase en estructuras relevantes.
- Evitar librerías externas nuevas para implementar esta funcionalidad.
- Validar rigurosamente toda entrada de usuario.

## 6. Edge Cases
- Correo ya registrado -> mostrar mensaje "Este correo ya está registrado".
- Contraseñas no coinciden -> mostrar mensaje "Las contraseñas no coinciden".
- Campos obligatorios vacíos -> mostrar mensajes específicos por campo.
- Términos no aceptados -> mostrar mensaje "Debes aceptar los términos y condiciones".
- Baja conectividad -> mostrar indicador de carga y manejo de timeout.
- Usuario hace clic en Google/Apple -> mostrar alerta "Próximamente".

## 7. Non-Goals
- No incluye verificación por email (OTP) en este sprint.
- No incluye recuperación de contraseña en este sprint.
- No incluye integración real con OAuth de Google/Apple (solo mock con alerta).
- No incluye validación de fortaleza de contraseña (solo longitud mínima).

## Trazabilidad Requisitos -> Criterios
- FR-001 -> AC-001
- FR-002 -> AC-002, AC-003
- FR-003 -> AC-004
- FR-004 -> AC-005
- FR-005 -> AC-006
- FR-006 -> AC-007
- FR-007 -> AC-008
- FR-008 -> AC-009
