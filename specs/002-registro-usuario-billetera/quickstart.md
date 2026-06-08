# Quickstart: Registro de Usuario Kyn-Wallet

## Objetivo

Implementar la pantalla de registro integrada con Login, validaciones inline y fuente de usuarios compartida.

## Prerrequisitos

- Node.js 18+
- npm instalado
- Dependencias del proyecto instaladas

## Flujo de trabajo recomendado (TDD)

1. Escribir/ajustar pruebas unitarias para validaciones en `lib/utils/Validation.test.ts`:
   - email valido/invalido
   - contrasena minima de 8
   - confirmacion de contrasena
   - terminos aceptados
2. Escribir pruebas de servicio para alta y autenticacion en `lib/services/AuthService.test.ts`:
   - alta exitosa
   - rechazo por email duplicado
   - login con usuario recien registrado
3. Escribir prueba de interfaz de registro en `app/register/register.test.tsx`:
   - render de campos y checkbox
   - errores inline
   - redireccion a `/login` con mensaje de exito
4. Implementar `app/register/page.tsx` y `components/RegisterForm.tsx`.
5. Extender `lib/services/AuthService.ts` (o modulo compartido) para alta y fuente comun de usuarios.
6. Agregar enlace en `components/LoginForm.tsx`: "No tienen cuenta?. Registrate".
7. Verificar responsive: desktop (2 paneles) y mobile (solo formulario).

## Comandos

- Desarrollo:
  - `npm run dev`
- Pruebas:
  - `npm run test`
  - `npm run test:ci`
  - `npm run test:watch`
- Lint:
  - `npm run lint`

## Criterios de verificacion rapida

- Registro valido crea usuario y redirige a `/login` con feedback visible.
- Registro invalido bloquea envio y muestra errores inline por campo.
- Usuario creado puede autenticarse luego en Login con mismas credenciales.
- Google/Apple muestran "Proximamente".
- Enlace cruzado Login -> Registro y Registro -> Login funciona correctamente.
- Login muestra enlace "No tienen cuenta?. Regístrate" al final del formulario.
