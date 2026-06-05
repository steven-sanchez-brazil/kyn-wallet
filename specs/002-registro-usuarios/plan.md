# Plan de Implementación: Registro de Usuarios

**Feature Branch**: `feature/registro-brayhan-sanchez`
**Basado en**: spec.md v1.0

## Arquitectura de la solución

Reutilizar los componentes y patrones existentes del login (BrandPanel, Input, Button, SocialLogins, Validation, AuthService) extendiendo solo lo necesario.

```
app/
  login/
    page.tsx          ← Nueva ruta /login con soporte para ?registered=true
  register/
    page.tsx          ← Nueva ruta /register

components/
  RegisterForm.tsx    ← Nuevo componente del formulario

lib/
  types/
    Auth.ts           ← Extender: RegisterCredentials, RegisterResult
  utils/
    Validation.ts     ← Extender: validateName, validatePasswordsMatch
  services/
    AuthService.ts    ← Extender: método register()
```

## Decisiones de diseño

1. **BrandPanel reutilizado con props opcionales**: Se agregan `headline` y `subheadline` opcionales para adaptar el texto del panel izquierdo en la pantalla de registro sin duplicar el componente.

2. **SocialLogins reutilizado tal cual**: El componente ya muestra `alert("Próximamente")` para Google y Apple.

3. **Página /login separada de app/page.tsx**: Se crea `app/login/page.tsx` para cumplir la ruta `/login`. `app/page.tsx` redirige a `/login`. Esto evita romper tests existentes y da la ruta correcta.

4. **Mensaje de éxito via query param**: `?registered=true` en la URL permite que la página de login muestre el banner sin estado global.

5. **Toggle de contraseña**: Estado local `showPassword` / `showConfirmPassword` con botón eye inline.

## Flujo de datos

```
RegisterForm
  → validate() → errores inline
  → AuthService.register() → RegisterResult
    ↓ success
  → router.push('/login?registered=true')

LoginPage (/login)
  → searchParams.registered === 'true'
  → muestra SuccessBanner
```

## Orden de implementación

1. Extender tipos Auth (RegisterCredentials, RegisterResult)
2. Extender Validation (validateName, validatePasswordsMatch)
3. Extender AuthService (register)
4. Modificar BrandPanel (props headline/subheadline)
5. Crear RegisterForm
6. Crear app/register/page.tsx
7. Crear app/login/page.tsx (con soporte de success banner)
8. Actualizar app/page.tsx para redirigir a /login
