# UI Component Contracts: Registro de Usuarios — KynWallet

**Feature**: `specs/002-registro-usuarios`  
**Date**: 2026-06-05

---

## Componentes reutilizados (sin cambios)

### `BrandPanel`
- **Props**: ninguna
- **Contrato**: Panel izquierdo con gradiente de marca, logo KynWallet, headline y mockup de tarjeta. Visible solo en `lg:` (≥ 1024 px).

### `Button`
- **Props**: `variant?: 'primary' | 'secondary'`, + todas las props nativas de `<button>`
- **Contrato**: `disabled` nativo soportado via `...props`. Variante `primary` para "Crear cuenta".

### `Input`
- **Props**: `label?: string`, `error?: string`, + todas las props nativas de `<input>`
- **Contrato**: Muestra mensaje de error en rojo debajo del campo cuando `error` es string no vacío. Borde rojo cuando hay error.

---

## Componentes extendidos

### `SocialLogins` (extensión mínima)

Verificar si acepta `onGoogleClick` / `onAppleClick` callbacks. Si no, extender con:

```typescript
interface SocialLoginsProps {
  onGoogleClick?: () => void;
  onAppleClick?: () => void;
}
```

- **Contrato post-extensión**: Al pulsar Google → invoca `onGoogleClick?.()`. Al pulsar Apple → invoca `onAppleClick?.()`. La página padre pasa `() => alert('Próximamente')`.

---

## Componentes nuevos

### `RegisterForm`

**Archivo**: `components/RegisterForm.tsx`

```typescript
interface RegisterFormProps {
  onSubmit: (credentials: RegisterCredentials) => Promise<RegisterResult>;
}
```

**Contrato**:
- Renderiza 4 campos: Nombre completo, Correo electrónico, Contraseña, Confirmar contraseña
- Renderiza checkbox de términos y condiciones (texto con enlace a términos)
- Renderiza botón "Crear cuenta" deshabilitado hasta que `isFormValid === true`
- Renderiza botones sociales (Google / Apple) via `SocialLogins`
- Renderiza enlace "¿Ya tienes cuenta? Inicia sesión" → `/login`
- Valida inline `onBlur` por campo; `confirmPassword` valida también `onChange`
- Al enviar: llama `onSubmit(credentials)` → si `result.Success` → callback externo de éxito; si `result.Error === 'EMAIL_EXISTS'` → muestra error de submit inline
- No conoce `AuthService` directamente; recibe `onSubmit` como prop (inversión de dependencia)

**Accesibilidad**:
- Cada `<input>` tiene `id` y su `<label>` tiene `htmlFor` correspondiente
- `aria-invalid="true"` en campos con error
- `aria-describedby` apuntando al elemento de error

---

### `app/registro/page.tsx`

**Tipo**: Client Component (`'use client'`)

**Contrato**:
- Renderiza layout de dos paneles: `<BrandPanel />` + `<RegisterForm />`
- Pasa a `RegisterForm.onSubmit` → `AuthService.register(credentials)`
- Al éxito: `router.push('/login?registered=true')`
- En móvil: solo muestra el panel de formulario

---

## Contratos de extensión de servicios

### `AuthService.register()`

```typescript
register(credentials: RegisterCredentials): Promise<RegisterResult>
```

**Contrato**:
- Si `credentials.Email` ya existe en `MOCK_USERS` → `{ Success: false, Error: 'EMAIL_EXISTS' }`
- Si es nuevo → agrega usuario a `MOCK_USERS`, retorna `{ Success: true }`
- Simula delay de red (500 ms) igual que `login()`
- Nunca expone `Password` en el resultado

### `Validation` (nuevas funciones)

```typescript
validateFullName(name: string): boolean
// → true si name.trim().length >= 2

validatePasswordMatch(password: string, confirmPassword: string): boolean
// → true si password === confirmPassword && password.length > 0
```
