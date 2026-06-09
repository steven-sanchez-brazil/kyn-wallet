# Tareas: Implementación de la Pantalla de Registro de Usuarios

**Entrada**: Documentos de especificación de `/specs/002-registro-cristian-agudelo/`
**Prerrequisitos**: plan.md (requerido), spec.md (requerido)

## Formato: `[ID] [P?] [Story] Descripción`

- **[P]**: Puede ejecutarse en paralelo (diferentes archivos, sin dependencias cruzadas).
- **[Story]**: A qué historia de usuario pertenece la tarea (ej. US1, US2, US3).
- Se incluyen rutas de archivos exactas en cada descripción.

---

## Fase 1: Fundacional (Prerrequisitos Bloqueantes)

**Propósito**: Modelar datos, extender servicios mock de autenticación y utilidades de validación.

- [ ] T001 [P] [US1] Definir la interfaz `RegisterCredentials` e incluir el atributo `FullName` (opcional) en la interfaz `User` en `lib/types/Auth.ts`.
- [ ] T002 [P] [US2] Crear la función de validación de nombre completo `validateName` (que compruebe que no esté vacío y tenga mínimo 3 caracteres) en `lib/utils/Validation.ts`.
- [ ] T003 [US1] Modificar la firma del servicio de autenticación en `lib/services/AuthService.ts` para agregar el método `register(credentials: RegisterCredentials): Promise<boolean>` que agregue el usuario a la lista dinámica en memoria.

---

## Fase 2: Pruebas Automatizadas (TDD) ⚠️

**Propósito**: Escribir las pruebas unitarias y de integración antes de implementar el código de negocio y UI para cumplir con el flujo TDD y la Constitución.

- [ ] T004 [P] [US2] Crear pruebas unitarias para `validateName` en `lib/utils/Validation.test.ts`.
- [ ] T005 [P] [US1] Crear pruebas unitarias para el método `AuthService.register` en `lib/services/AuthService.test.ts` verificando que el registro guarde al usuario en memoria y le permita iniciar sesión posteriormente.
- [ ] T006 [US1] Crear pruebas de integración en `app/register.test.tsx` que simulen el llenado exitoso del formulario, la redirección y la visualización de mensajes de error de validación inline.

---

## Fase 3: User Story 1 - Registro Exitoso y Redirección (P1 - MVP)

**Propósito**: Completar el flujo básico funcional de registro, persistencia mock y redirección al login.

- [ ] T007 [P] [US1] Modificar el componente `BrandPanel.tsx` para aceptar props opcionales de título (`headline?: React.ReactNode`) y descripción (`description?: string`), de modo que sea reutilizable tanto en Login como en Registro.
- [ ] T008 [US1] Implementar el formulario base `RegisterForm.tsx` en `components/RegisterForm.tsx` con campos para Nombre completo, Correo, Contraseña, Confirmación de Contraseña y Checkbox de términos y condiciones.
- [ ] T009 [US1] Crear la página de registro en `app/register/page.tsx` utilizando `BrandPanel` (con textos de registro) y `RegisterForm`.
- [ ] T010 [US1] Crear la página de login explícita en `app/login/page.tsx` para responder a la ruta `/login` y modificar `app/page.tsx` para redirigir a `/login`.
- [ ] T011 [US1] Modificar `components/LoginForm.tsx` para comprobar si existe el parámetro de consulta `registered=success` en la URL de Next.js, y en ese caso, mostrar un banner de éxito verde (al estilo Figma/Tailwind).
- [ ] T012 [US1] Conectar el evento de envío de `RegisterForm.tsx` con el método `AuthService.register`, manejando la redirección a `/login?registered=success` tras un registro exitoso.

---

## Fase 4: User Story 2 - Validaciones Inline y Visibilidad de Contraseñas (P2)

**Propósito**: Garantizar la calidad de los datos de entrada y añadir controles interactivos de seguridad.

- [ ] T013 [P] [US2] Modificar `components/ui/Input.tsx` para soportar de manera opcional un botón interactivo (icono de ojo) que alterne el tipo de input entre `password` y `text` para contraseñas.
- [ ] T014 [US2] Integrar validaciones en tiempo real (mediante `useEffect` o estados de React) en `RegisterForm.tsx` para cada campo (correo válido, contraseña >= 8 caracteres, coincidencia de contraseñas, nombre no vacío) y mostrar los mensajes de error correspondientes bajo los inputs.
- [ ] T015 [US2] Bloquear el botón de envío o impedir la llamada al servicio de registro en `RegisterForm.tsx` si existen errores de validación activos o si el checkbox de términos no está seleccionado.

---

## Fase 5: User Story 3 - Registro Social y Navegación (P3)

**Propósito**: Agregar botones sociales e interactividad secundaria.

- [ ] T016 [P] [US3] Agregar los botones sociales de Google y Apple en `RegisterForm.tsx` (reutilizando o emulando `SocialLogins.tsx`), configurando un manejador de clics que dispare un alert nativo con el mensaje `"Próximamente"`.
- [ ] T017 [US3] Incluir el enlace inferior `"¿Ya tienes cuenta? Inicia sesión"` en `RegisterForm.tsx` que dirija a `/login` mediante el componente `Link` de `next/link`.

---

## Fase 6: Pulido y Verificación Visual

**Propósito**: Asegurar la calidad estética (responsive) y cumplimiento de la Constitución.

- [ ] T018 Ejecutar toda la suite de pruebas (`npm run test`) para certificar que el 100% de los tests (nuevos y anteriores) pasan correctamente.
- [ ] T019 Validar el comportamiento responsive en escritorio (2 paneles, 50% de ancho cada uno) y mobile (solo panel del formulario).
- [ ] T020 Realizar un chequeo final de nomenclatura de clases, estilos basados en `DesignTokens` y convenciones `PascalCase`.
