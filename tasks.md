# Tasks: Refactor Registro y Tests (CORREGIDO) - KynWallet

**Input**: [refactor-plan.md](./refactor-plan.md)
**Prerequisites**: spec.md

## Phase 1: Password Complexity for Registration (TDD)
- [x] T001 [P] Actualizar `lib/utils/Validation.test.ts` con el requisito de número solo para el flujo de registro.
- [x] T002 Implementar validación de número en `lib/utils/Validation.ts` afectando solo a `validateRegistro`.
- [x] T003 Verificar que los tests preexistentes de Login no se vean afectados.

## Phase 2: UI & Navigation
- [x] T004 [P] Agregar texto instructivo detallado bajo el campo de contraseña en `components/RegisterForm.tsx`.
- [x] T005 Refactorizar el link '¿Ya tienes cuenta?' para usar `Link` de Next.js apuntando estrictamente a `/login`.

## Phase 3: Enhanced Integration Testing
- [x] T006 [P] Actualizar `app/register/register.test.tsx` para auditar el atributo `href="/login"` del enlace inferior.
- [x] T007 Implementar pruebas para los `alert` de los botones de Google e Apple.
- [x] T008 Agregar prueba de auditoría para el link de retorno en `/construction`.
- [x] T009 Verificar la presencia de todos los elementos interactivos del spec en el DOM.

## Phase 4: Final Verification
- [x] T010 Ejecutar la suite completa de tests con Vitest.
- [x] T011 Verificación visual manual del flujo corregido.
