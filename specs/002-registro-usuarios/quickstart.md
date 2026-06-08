# Quickstart: Pantalla de Registro de Usuarios

**Feature Branch**: `feature/002-registro-usuarios`  
**Generado**: 2026-06-08

---

## Prerrequisitos

- Node.js 18+ instalado
- Dependencias del proyecto instaladas: `npm install`
- El proyecto ya corre correctamente en `http://localhost:3000` (pantalla de login)

---

## Levantar el proyecto

```bash
cd kyn-wallet
npm run dev
```

La aplicación estará disponible en `http://localhost:3000`.

---

## Rutas de la funcionalidad

| Ruta | Descripción |
|------|-------------|
| `http://localhost:3000/` | Pantalla de Login |
| `http://localhost:3000/register` | Pantalla de Registro (nueva) |
| `http://localhost:3000/construction` | Pantalla post-login (placeholder) |

---

## Flujo de registro paso a paso

1. Abrir `http://localhost:3000/` (Login)
2. En la parte inferior del formulario, hacer clic en **"Regístrate"** en el texto "¿No tienes cuenta? Regístrate"
3. Se navega a `http://localhost:3000/register`
4. Completar el formulario:
   - **Nombre completo**: Ej. `Ana García`
   - **Correo electrónico**: Ej. `ana@test.com`
   - **Contraseña**: Ej. `mipassword123`
   - **Confirmar contraseña**: `mipassword123`
   - **Marcar** el checkbox "Acepto los términos y condiciones"
5. Hacer clic en **"Crear cuenta"**
6. El sistema redirige a `/login?registered=true`
7. Se muestra un banner de éxito: "¡Cuenta creada exitosamente! Ya puedes iniciar sesión."
8. Iniciar sesión con el correo y contraseña recién registrados
9. El sistema autentica al usuario y redirige a `/construction`

---

## Probar validaciones inline

En la pantalla de registro, hacer clic en "Crear cuenta" sin llenar campos para ver todos los errores simultáneamente:

| Escenario | Error esperado |
|-----------|---------------|
| Nombre vacío | "El nombre completo es requerido" |
| Nombre con una sola palabra | "Ingresa tu nombre y apellido" |
| Correo vacío | "El correo electrónico es requerido" |
| Correo inválido (ej. `abc`) | "Correo electrónico inválido" |
| Contraseña vacía | "La contraseña es requerida" |
| Contraseña < 8 chars | "La contraseña debe tener al menos 8 caracteres" |
| Confirmar vacío | "Debes confirmar tu contraseña" |
| Confirmar ≠ Contraseña | "Las contraseñas no coinciden" |
| Checkbox desmarcado | "Debes aceptar los términos y condiciones" |
| Email ya registrado | "Este correo ya está registrado. ¿Ya tienes cuenta?" |

---

## Probar botones "Próximamente"

En la pantalla de registro, hacer clic en el botón **"Google"** o **"Apple"** → se muestra un `alert()` con el texto `"Próximamente"`.

---

## Probar responsive

Reducir el ancho del navegador a menos de 1024px (`lg` breakpoint de Tailwind):
- El panel de marca (izquierda naranja) desaparece
- El formulario ocupa el 100% del ancho

---

## Ejecutar tests

```bash
npm run test
```

Tests relevantes al feature:

| Archivo | Tests |
|---------|-------|
| `lib/utils/Validation.test.ts` | validateFullName, validatePasswordMatch |
| `lib/services/AuthService.test.ts` | register() — éxito, email duplicado |
| `components/RegisterForm.test.tsx` | validaciones inline, submit, navegación |

---

## Usuarios de prueba

### Usuarios seed (pre-existentes, inmutables)

| Email | Contraseña | Nota |
|-------|------------|------|
| `tucorreo@ejemplo.com` | `password123` | Usuario seed original |

### Usuarios registrados dinámicamente

Se almacenan en `localStorage` bajo la clave `kynwallet_users`. Para resetear:

```javascript
// En la consola del navegador:
localStorage.removeItem('kynwallet_users');
```
