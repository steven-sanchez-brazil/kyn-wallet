# Phase 0 Research: Registro de Usuario Kyn-Wallet

## Decision 1: Mantener stack actual (Next.js + React + Tailwind + TypeScript)

- Decision: Reutilizar el stack definido en el repositorio sin incorporar nuevas librerias.
- Rationale: Cumple restricciones de constitucion (sin dependencias externas nuevas), minimiza riesgo tecnico y mantiene consistencia con Login existente.
- Alternatives considered:
  - Crear una capa adicional con librerias de formularios: descartado por restriccion explicita de dependencias.
  - Migrar a otra estrategia de estilos: descartado porque Tailwind ya esta integrado y es requisito del usuario.

## Decision 2: Fuente de usuarios compartida a traves de servicio comun en lib/services

- Decision: Evolucionar AuthService para usar una fuente compartida entre Registro y Login, con un modulo de almacenamiento comun en `lib/services`.
- Rationale: El Login actual autentica contra `MOCK_USERS` en memoria dentro de AuthService; centralizar lectura/escritura evita divergencias entre flujos.
- Alternatives considered:
  - Mantener lista separada para Registro y Login: descartado por inconsistencia funcional (FR-014).
  - Persistencia remota/API externa: descartado por alcance y por no estar en requerimientos actuales.

## Decision 3: Validaciones inline centralizadas y reutilizables

- Decision: Extender utilidades de `lib/utils/Validation.ts` para reglas de registro (obligatorios, email, minimo 8, confirmacion, terminos).
- Rationale: Evita duplicacion, facilita pruebas unitarias y respeta DRY.
- Alternatives considered:
  - Validaciones embebidas en cada componente: descartado por acoplamiento y mayor costo de mantenimiento.

## Decision 4: Implementacion responsive con layout adaptativo sin romper Login

- Decision: En desktop, mantener dos paneles (marca + formulario); en mobile, mostrar solo formulario para registro.
- Rationale: Cumple FR-011 y mantiene consistencia con patrones visuales actuales del proyecto.
- Alternatives considered:
  - Duplicar dos vistas independientes: descartado por complejidad innecesaria (YAGNI).

## Decision 5: Integracion de Figma como referencia visual de estructura

- Decision: Tratar el frame de Figma compartido como guia de contenido y composicion visual para Registro, mapeando al design system existente del repo.
- Rationale: Reduce desviaciones de UI y conserva coherencia de marca.
- Alternatives considered:
  - Rehacer UI desde cero sin referencia: descartado por mayor riesgo de no cumplimiento visual.

## Decision 6: Estrategia de pruebas previa a implementacion (TDD)

- Decision: Definir primero pruebas para flujo feliz y errores de validacion de registro, plus integracion con Login.
- Rationale: Es requisito constitucional y reduce regresiones en autenticacion.
- Alternatives considered:
  - Implementar primero y testear despues: descartado por incumplir constitucion.

## Clarifications Resolution

No quedan NEEDS CLARIFICATION en el contexto tecnico para fase de diseno. El alcance quedo delimitado a Registro + ajuste de Login + fuente compartida de usuarios.
