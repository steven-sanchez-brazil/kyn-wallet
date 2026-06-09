# Research: Registro de Usuarios

## Decision: Estrategia de validacion del formulario
- **Decision**: Centralizar reglas de validacion en utilidades de dominio (`lib/utils/Validation.ts`) y exponer resultados por campo para validacion inline.
- **Rationale**:
  - Evita duplicar reglas entre UI y pruebas.
  - Permite feedback inmediato por campo (correo, password, confirmacion, terminos).
  - Mantiene separacion entre presentacion y logica.
- **Alternatives considered**:
  - Validar solo al enviar: descartado porque incumple el requisito de validaciones inline.
  - Validaciones embebidas en el componente: descartado por acoplamiento y menor testabilidad.

## Decision: Flujo de registro exitoso y navegacion
- **Decision**: Completar registro via servicio de aplicacion y redirigir a `/login` con indicador de exito en query string.
- **Rationale**:
  - Cumple requisito funcional de redireccion y mensaje de exito.
  - Se integra con el flujo de login ya existente sin agregar infraestructura adicional.
  - Facilita pruebas end-to-end del journey registro -> login.
- **Alternatives considered**:
  - Mostrar modal de exito en la misma ruta: descartado porque el requisito pide redireccion a `/login`.
  - Persistir estado global para mensaje: descartado por complejidad innecesaria.

## Decision: Manejo de errores de registro
- **Decision**: Diferenciar error de negocio (correo existente) y error tecnico/transitorio con feedback en la misma pantalla de registro.
- **Rationale**:
  - Mantiene continuidad del usuario sin redirecciones incorrectas en fallos.
  - Permite mensajes accionables por tipo de error.
  - Alinea la UX con las clarificaciones cerradas en el spec.
- **Alternatives considered**:
  - Redirigir a `/login` en errores: descartado por confundir el flujo de alta.
  - Alertas del navegador: descartado por mala experiencia y baja testabilidad.

## Decision: Comportamiento del boton en submitting
- **Decision**: Deshabilitar el boton "Crear cuenta" y mostrar estado de carga durante `submitting`.
- **Rationale**:
  - Previene envios duplicados y condiciones de carrera.
  - Hace visible el estado de progreso de la operacion.
  - Facilita pruebas deterministas de UX.
- **Alternatives considered**:
  - Ignorar clics extra con boton activo: descartado por ambigüedad visual.
  - Permitir multiples envios: descartado por riesgo de duplicados.

## Decision: Paridad visual con Figma y responsive
- **Decision**: Reutilizar tokens visuales y componentes existentes para lograr equivalencia visual del diseño en desktop y mobile, con layout de dos paneles en desktop y formulario unico en mobile.
- **Rationale**:
  - Maximiza consistencia con la UI actual del proyecto.
  - Reduce riesgo de desviaciones de estilo al reutilizar `BrandPanel`, `SocialLogins` y tokens de `DesignTokens`.
  - Simplifica mantenimiento y regresion visual.
- **Alternatives considered**:
  - Implementar componentes nuevos desde cero: descartado por riesgo de inconsistencias y duplicacion.
  - Usar libreria externa de UI: descartado por restriccion constitucional de dependencias.

## Decision: Estrategia de pruebas (TDD)
- **Decision**: Cobertura de pruebas en Vitest + Testing Library para reglas de validacion, interacciones del formulario, navegacion y acciones sociales.
- **Rationale**:
  - Stack ya instalado y usado en el repo.
  - Permite validar estados de error inline y rutas de exito de manera aislada.
  - Da cumplimiento al principio de TDD de la constitucion.
- **Alternatives considered**:
  - Pruebas manuales solamente: descartado por no cumplir TDD.
  - Migrar a otro runner: descartado por no agregar valor al alcance de esta feature.
