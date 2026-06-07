# Especificación de Funcionalidad: Sistema de Login, Registro e Inicio

**Feature Branch**: `002-login-spec-update`  
**Creado**: 2026-06-04  
**Estado**: Finalizado  
**Entrada**: Implementación completa de Login, Registro y Home basados en Figma.

## Escenarios de Usuario y Pruebas

### Historia de Usuario 1 - Autenticación Exitosa (Prioridad: P1)
Como usuario registrado, quiero ingresar mi correo y contraseña para acceder a mi cuenta y ser redirigido a la pantalla de Inicio.

**Escenarios de Aceptación**:
1. **Dado** que el usuario ingresa credenciales válidas, **Cuando** presiona "Iniciar sesión", **Entonces** el sistema lo redirige a `/inicio`.

### Historia de Usuario 2 - Registro de Nuevo Usuario (Prioridad: P1)
Como nuevo usuario, quiero crear una cuenta proporcionando mis datos básicos para poder usar la billetera.

**Escenarios de Aceptación**:
1. **Dado** que el usuario completa todos los campos (Nombre, Email, Password, Confirmar) y acepta términos, **Cuando** hace clic en "Crear cuenta", **Entonces** el sistema guarda sus datos en `users.json` y lo redirige al Login con un mensaje de éxito.
2. **Dado** que las contraseñas no coinciden o tienen menos de 8 caracteres, **Cuando** intenta registrarse, **Entonces** el sistema muestra un error de validación.

### Historia de Usuario 3 - Pantalla de Inicio Responsiva (Prioridad: P1)
Como usuario autenticado, quiero ver mi saldo, movimientos y acciones rápidas con un diseño moderno.

**Escenarios de Aceptación**:
1. **Dado** que el usuario está en `/inicio`, **Cuando** usa un dispositivo móvil, **Entonces** debe ver la navegación inferior y el layout de una columna (Figma 11:2).
2. **Dado** que el usuario ve sus movimientos, **Cuando** la transacción es positiva, **Entonces** se muestra en verde con el símbolo `↙`.

---

## Requisitos

### Restricciones de Seguridad y Validación
- **Persistencia**: Los datos se almacenan en `data/users.json`.
- **Validación**: Email válido, contraseña >= 8 caracteres, nombres no vacíos.
- **Acceso**: Redirección automática a `/inicio` tras login exitoso.

### Requisitos Funcionales
- **FR-001**: Pantalla dividida en Desktop para Login y Registro.
- **FR-002**: Alertas de "Próximamente" en botones de Google y Apple.
- **FR-003**: Enlaces de navegación cruzada entre pantallas.

## Criterios de Éxito
- **SC-001**: El flujo completo Registro -> Login -> Inicio funciona correctamente.
- **SC-002**: El diseño en móvil coincide con el frame 11:2 de Figma.
- **SC-003**: La persistencia en archivo JSON es funcional.
