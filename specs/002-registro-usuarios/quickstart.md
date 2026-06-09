# Quickstart: Registro de Usuarios

**Feature**: Registro de Usuarios | **Branch**: `feature/registro-jp-fsabate` | **Date**: 2026-06-09

Guía rápida para implementar y verificar la feature siguiendo TDD y los patrones existentes del repo.

---

## Requisitos previos

- Node.js + dependencias instaladas (`npm install`).
- Branch activo: `feature/registro-jp-fsabate`.
- Stack: Next.js 14 (App Router), TypeScript, Tailwind, Vitest + React Testing Library.

## Comandos

```bash
# Ejecutar toda la suite de pruebas
npx vitest run

# Modo watch durante el desarrollo (TDD)
npx vitest

# Servidor de desarrollo
npm run dev
```

---

## Flujo TDD recomendado (Rojo → Verde → Refactor)

1. **Validaciones** — escribir tests en `lib/utils/Validation.test.ts` para `validateRequired`, `validatePasswordsMatch`, `validateFullName`; luego implementarlas en `lib/utils/Validation.ts`.
2. **Tipos** — agregar `RegisterCredentials` y `RegisterResult` en `lib/types/Auth.ts`.
3. **Servicio** — escribir tests en `lib/services/AuthService.test.ts` (casos C1–C4 del contrato); luego implementar `register()` en `AuthService.ts`.
4. **Formulario** — escribir tests en `components/RegisterForm.test.tsx` (validaciones inline, alerts "Próximamente", navegación); luego implementar `components/RegisterForm.tsx`.
5. **Rutas** —
   - Crear `app/login/page.tsx` (mueve el login a `/login`).
   - Modificar `app/page.tsx` para renderizar la página de Registro.
   - Banner de éxito en `/login` leyendo `registered=true`.
6. **Integración** — `app/register.test.tsx` para la página `/`.
7. **Regresión** — `npx vitest run` y confirmar que los tests de login siguen verdes.

---

## Verificación funcional manual

| Paso | Acción | Resultado esperado |
|------|--------|--------------------|
| 1 | Abrir `/` | Se muestra el formulario de Registro (desktop: 2 paneles; mobile: solo formulario) |
| 2 | Enviar con campos vacíos | Errores inline en cada campo; no se envía |
| 3 | Correo inválido | Error inline de correo |
| 4 | Contraseña < 8 | Error inline de contraseña |
| 5 | Contraseñas distintas | Error inline de coincidencia |
| 6 | Términos sin marcar | Error inline de términos |
| 7 | Click Google/Apple | Alert "Próximamente" |
| 8 | Click "Inicia sesión" | Navega a `/login` |
| 9 | Datos válidos + términos | Redirige a `/login` con mensaje de éxito visible |
| 10 | Reusar correo `tucorreo@ejemplo.com` | Error inline "Este correo ya está registrado" |
| 11 | Abrir `/login` | Login existente funcional (sin regresiones) |

---

## Checklist de cumplimiento

- [ ] Todos los tests pasan (`npx vitest run`).
- [ ] Tests de login existentes permanecen verdes.
- [ ] `/` muestra Registro; `/login` muestra Login.
- [ ] Sin librerías externas añadidas.
- [ ] Estructuras relevantes en `PascalCase`.
- [ ] Fidelidad visual con el frame "04 · Registro" (colores, tipografía Inter, radios 12px/6px).
- [ ] Responsive verificado (desktop 2 paneles / mobile solo formulario).
