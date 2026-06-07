# Refactoring Plan (CORREGIDO): Registro de Usuarios - Ajustes de Seguridad y Cobertura

**Branch**: `feature/registro-gaston-schachtl` | **Date**: 2026-06-07 | **Spec**: [./spec.md](./spec.md)

## Summary
Este plan detalla la refactorización corregida de la pantalla de Registro de Usuarios. Se implementará la regla de contraseña con número solo para el registro, se ajustará el link de redirección a `/login` y se robustecerán los tests de integración auditando enlaces y atributos `href`.

## Execution Phases

### Fase 1: Complejidad de Contraseña para Registro (TDD)
- **Unit Tests (`lib/utils/Validation.test.ts`)**:
    - [x] Actualizar casos de prueba de registro para que fallen si la contraseña no contiene al menos un número.
    - [x] Asegurar que los tests de login sigan pasando con las reglas anteriores.
- **Lógica de Validación (`lib/utils/Validation.ts`)**:
    - [x] Implementar la validación de número (`/\d/`) dentro de la lógica de registro.
    - [x] **Restricción**: NO modificar la lógica que consume `LoginForm.tsx` para mantener compatibilidad.
    - [x] Actualizar el mensaje de error de registro para incluir "un número".

### Fase 2: UI y Navegación
- **Instrucciones (`components/RegisterForm.tsx`)**:
    - [x] Agregar texto instructivo visible bajo el campo de contraseña: "Mínimo 8 caracteres, una mayúscula, un número y un carácter especial".
- **Redirección de Login**:
    - [x] Cambiar la redirección del link '¿Ya tienes cuenta?' de `/` a `/login` (Requisito Funcional 5).
    - [x] Cambiar el elemento de un `button` a un `Link` de Next.js para permitir la auditoría del atributo `href`.

### Fase 3: Robustecimiento de Tests de Integración
- **Tests de Integración (`app/register/register.test.tsx`)**:
    - [x] **Auditoría de Enlaces**: Verificar que el link de inicio de sesión tenga el atributo `href="/login"`.
    - [x] **Botones Sociales**: Probar que disparen `window.alert('Próximamente')`.
    - [x] **Flujo de Éxito**: Verificar la redirección a `/construction` y auditar que en esa vista exista el link de retorno a la raíz `/`.
- [x] **Verificación de Elementos**: Asegurar que el 100% de los elementos interactivos definidos en el spec estén presentes y sean funcionales.

### Fase 4: Validación Final
- [x] Ejecutar `npm run test` (Vitest).
- [x] Verificación manual en el navegador.

## Verification & Testing
- Cobertura total de la nueva regla de contraseña para el registro.
- Verificación de que el login permanece inalterado.
- Auditoría de atributos `href` y comportamiento de alertas.
