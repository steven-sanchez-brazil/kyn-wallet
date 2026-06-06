# Research: Registro de Usuarios

## Decision: Stack tecnico de la pantalla
- Decision: Implementar la pantalla con React en Next.js App Router y estilos con Tailwind CSS existente.
- Rationale:
  - Mantiene consistencia con el stack actual del repositorio.
  - Evita deuda de integracion al no introducir nuevas tecnologias.
  - Facilita fidelidad al diseno de Figma usando tokens y utilidades ya presentes.
- Alternatives considered:
  - Migrar a otro framework UI: rechazado por alto costo de cambio y fuera de alcance.
  - CSS plano sin Tailwind: rechazado por menor productividad y menor consistencia visual.

## Decision: Arquitectura de componentes reutilizables
- Decision: Componer la pantalla de registro a partir de componentes reutilizables en `components/` y `components/ui/`, con la pagina en `app/` como orquestador de layout y navegacion.
- Rationale:
  - Aplica SOLID al separar responsabilidades de presentacion y composicion.
  - Cumple Clean Architecture para desacoplar UI de reglas de negocio.
  - Permite reuso entre login y registro, reduciendo duplicacion (DRY).
- Alternatives considered:
  - Implementar todo en un solo archivo de pagina: rechazado por acoplamiento alto.
  - Crear una libreria interna adicional: rechazado por YAGNI para esta escala.

## Decision: Estrategia de validacion y flujo de envio
- Decision: Centralizar validaciones del registro en `lib/utils` y tipos en `lib/types`, con mensajes inline en UI y bloqueo de envio hasta cumplir reglas.
- Rationale:
  - Facilita pruebas unitarias de reglas de validacion con Vitest.
  - Mantiene el formulario simple y testeable.
  - Garantiza validacion de todas las entradas antes del procesamiento.
- Alternatives considered:
  - Validar solo en componentes: rechazado por mezclar logica de negocio con presentacion.
  - Validar solo al submit: rechazado por peor experiencia de usuario y menor trazabilidad.

## Decision: Mensaje de exito y redireccion a login
- Decision: Simular registro exitoso localmente y redirigir a `/login`, transportando mensaje de exito via mecanismo de navegacion de Next.js (query param o estado equivalente simple sin librerias externas).
- Rationale:
  - Cumple requisitos funcionales sin backend.
  - Es transparente para pruebas de integracion en la UI.
  - No requiere dependencias adicionales.
- Alternatives considered:
  - Persistencia temporal en storage: rechazada para evitar complejidad innecesaria en esta iteracion.
  - Servicio remoto mock externo: rechazado por restriccion de no agregar librerias.

## Decision: Estrategia de pruebas para funcionalidad critica
- Decision: Definir pruebas con Vitest para validaciones principales (obligatoriedad, email valido, longitud de contrasena, coincidencia de confirmacion, terminos), mas escenarios de flujo exitoso y bloqueo de envio.
- Rationale:
  - Alineado con constitucion (TDD obligatorio en funcionalidades criticas).
  - Reduce regresiones en reglas de negocio del formulario.
  - Permite evolucion segura del comportamiento sin backend.
- Alternatives considered:
  - Solo pruebas manuales: rechazado por baja repetibilidad.
  - Solo pruebas de UI sin unitarias: rechazado por baja precision para reglas de validacion.
