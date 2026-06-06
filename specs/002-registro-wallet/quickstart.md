# Quickstart — Validación de la Pantalla de Registro

**Feature**: 002-registro-wallet | **Date**: 2026-06-06

Guía para ejecutar y validar la funcionalidad de extremo a extremo. Detalles de tipos/servicios en [data-model.md](data-model.md) y [contracts/registration-service.md](contracts/registration-service.md).

## Prerrequisitos

- Node.js + dependencias instaladas: `npm install`
- Proyecto Next.js 14 ya inicializado (feature 001 Login presente).

## Ejecutar pruebas (TDD)

```bash
npm test            # corrida única (Vitest)
npm run test:watch  # modo watch durante el desarrollo
```

Cobertura esperada de pruebas nuevas:
- `lib/utils/Validation.test.ts` → `validateRequired`, `validatePasswordsMatch`.
- `lib/services/RegistrationService.test.ts` → casos C1–C7 del contrato.
- `components/RegisterForm.test.tsx` → validaciones de UI, términos obligatorios, correo duplicado, redirección.
- `app/register.test.tsx` (o equivalente) → render de la ruta `/register`.
- Las pruebas existentes del Login (`app/login.test.tsx`, `lib/services/AuthService.test.ts`) deben seguir en verde tras el refactor a `UserStore`.

## Ejecutar la app

```bash
npm run dev   # http://localhost:3000
```

## Escenarios de validación manual

1. **Registro exitoso (P1)**
   - Ir a `/register`.
   - Completar: Nombre "Diego Martínez", correo nuevo `diego@ejemplo.com`, contraseña `password123`, confirmar `password123`, marcar términos.
   - Click "Crear cuenta" → redirige a `/construction`.

2. **Correo duplicado (FR-008)**
   - Usar `tucorreo@ejemplo.com` (sembrado) con datos válidos → mensaje "Este correo ya está registrado"; sin redirección.

3. **Términos no aceptados (FR-007)**
   - Datos válidos pero sin marcar la casilla → "Debes aceptar los términos y condiciones"; sin redirección.

4. **Contraseñas no coinciden (FR-005)**
   - `password123` vs `password124` → "Las contraseñas no coinciden"; sin redirección.

5. **Correo inválido (FR-003)**
   - `correo-invalido` → "Formato de correo inválido"; sin redirección.

6. **Toggle de contraseña (FR-013)**
   - Click en el icono de visibilidad → el texto de la contraseña se muestra/oculta.

7. **Navegación a Login (FR-012)**
   - Click "¿Ya tienes cuenta? Inicia sesión" → navega a `/`.

8. **Login del usuario recién registrado (C7)**
   - Tras el escenario 1, ir a `/` e iniciar sesión con `diego@ejemplo.com` / `password123` → acceso exitoso (verifica `UserStore` compartido).

## Coherencia visual (SC-004)

- Comparar `/register` con la referencia (imagen adjunta / Figma `31:2`): degradado naranja, tipografía Inter, botón `#ff6b3d`, radios de borde 12px, campos con borde `#d7d9e6`.
