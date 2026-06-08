# Especificación: Billetera Virtual - Login, Registro y Home

**Feature Branch**: `main`  
**Creado**: 2026-06-08  
**Estado**: Completado  

## Escenarios de Usuario y Pruebas

### Historia de Usuario 1 - Autenticación y Registro (P1)
Como nuevo usuario, quiero registrarme con mis datos personales y luego iniciar sesión para acceder a mi billetera.

**Validaciones**:
- Todos los campos son obligatorios.
- Email válido.
- Contraseña y confirmación deben coincidir.
- Mínimo 8 caracteres en contraseña.
- Aceptación de términos obligatoria.

### Historia de Usuario 2 - Dashboard de Usuario (P2)
Como usuario autenticado, quiero ver mi saldo, movimientos recientes y resumen de gastos en una interfaz moderna y limpia.

**Vistas**:
- **Desktop**: Sidebar persistente, resumen de tarjetas superior, acciones rápidas, movimientos y resumen lateral.
- **Mobile**: Header con gradiente, acciones rápidas flotantes, movimientos y barra de navegación inferior.

### Historia de Usuario 3 - Feedback Visual (P3)
Como usuario, quiero recibir feedback claro sobre mis acciones (errores de validación, éxito de registro) y saber qué funciones están "En Construcción".

## Requisitos Funcionales

- **FR-001**: Implementar formulario de registro con validaciones completas.
- **FR-002**: Implementar login con verificación contra archivo `users.json`.
- **FR-003**: Implementar redirección a `/home` tras login exitoso.
- **FR-004**: Mostrar alertas de "En Construcción" para login social (Google/Apple).
- **FR-005**: Implementar diseño responsivo basado en Figma para `/home` (Desktop y Mobile).
- **FR-006**: Persistencia de datos en el servidor usando rutas de API de Next.js.

## Criterios de Éxito

- **SC-001**: El registro guarda los datos correctamente en `data/users.json`.
- **SC-002**: El login solo permite el acceso si las credenciales coinciden con los datos guardados.
- **SC-003**: La UI de `/home` cambia drásticamente entre desktop y mobile siguiendo el diseño de Figma.
- **SC-004**: No hay uso de librerías externas de UI (solo Tailwind).
