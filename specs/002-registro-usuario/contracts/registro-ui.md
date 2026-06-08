# Contrato UI: Pantalla de Registro

**Feature**: `002-registro-usuario` | **Fase**: 1 — Diseño
**Fecha**: 2026-06-05

## Descripción

Define el contrato de interfaz entre la página `app/registro/page.tsx` y los componentes que componen la pantalla de Registro. Establece las props, estados y comportamientos esperados de cada componente.

---

## Componente: RegistroForm

**Archivo**: `components/RegistroForm.tsx`
**Propósito**: Formulario de registro con validaciones en tiempo real y submit al `AuthService`.

### Props

| Prop | Tipo | Requerido | Descripción |
|------|------|-----------|-------------|
| (ninguna) | — | — | El componente es autocontenido; maneja su propio estado interno. |

### Estado Interno

| Estado | Tipo | Valor inicial | Descripción |
|--------|------|---------------|-------------|
| `nombreCompleto` | string | `""` | Valor del campo Nombre completo |
| `email` | string | `""` | Valor del campo Correo electrónico |
| `contrasena` | string | `""` | Valor del campo Contraseña |
| `confirmarContrasena` | string | `""` | Valor del campo Confirmar contraseña |
| `errores` | object | `{}` | Mapa de errores por campo (`{ nombreCompleto?, email?, contrasena?, confirmarContrasena?, general? }`) |
| `cargando` | boolean | `false` | `true` mientras se procesa el registro |

### Comportamientos

| Evento | Acción |
|--------|--------|
| `onChange` en cualquier campo | Actualiza el estado y ejecuta validación en tiempo real del campo modificado |
| `onBlur` en cualquier campo | Ejecuta validación del campo si aún no tiene error |
| Click en "Crear cuenta" | Valida todos los campos; si son válidos, llama a `AuthService.register()` |
| Registro exitoso | Redirige a `/construction` usando `useRouter` |
| Registro fallido | Muestra `errores.general` con el mensaje del `ResultadoRegistro` |
| Click en enlace "Iniciá sesión" | Navega a `/` usando `next/link` |

### Estructura Visual (referencia: `registro_screen.png`)

```
┌─────────────────────────────────────────────────────────┐
│                                                         │
│  [BrandPanel]           │  [Form Panel]                 │
│   (izquierda)           │   (derecha)                   │
│                         │                               │
│   Gradiente naranja     │  Título: "Crear cuenta"       │
│   Logo KynWallet        │  Subtítulo secundario         │
│   Card Mockup           │                               │
│                         │  [Input] Nombre completo      │
│                         │  [Input] Correo electrónico   │
│                         │  [Input] Contraseña           │
│                         │  [Input] Confirmar contraseña │
│                         │                               │
│                         │  [Button] "Crear cuenta"      │
│                         │                               │
│                         │  "¿Ya tenés cuenta? Iniciá sesión" │
└─────────────────────────────────────────────────────────┘
```

### Mensajes de Error por Campo

| Campo | Condición de error | Mensaje |
|-------|--------------------|---------|
| `NombreCompleto` | Menos de 2 palabras o vacío | "Ingresá tu nombre y apellido." |
| `Email` | Formato inválido o vacío | "Ingresá un correo electrónico válido." |
| `Contrasena` | Menos de 8 caracteres o vacío | "La contraseña debe tener al menos 8 caracteres." |
| `ConfirmarContrasena` | No coincide con `Contrasena` o vacío | "Las contraseñas no coinciden." |
| `general` | Email ya registrado | "El correo ya está registrado. Intentá con otro." |

---

## Modificación: LoginForm

**Archivo**: `components/LoginForm.tsx`
**Cambio**: Agregar al pie del formulario el texto "¿No tiene cuenta? Registrate" donde "Registrate" es un enlace a `/registro`.

### Requisitos del enlace

| Atributo | Valor |
|----------|-------|
| Texto visible | "¿No tiene cuenta? **Registrate**" |
| Destino | `/registro` |
| Implementación | `<Link href="/registro">` de `next/link` |
| Estilo | Texto secundario (`#8a8ca8`) + enlace resaltado (`#ff6b3d`) |

---

## Página: app/registro/page.tsx

**Propósito**: Orquesta `BrandPanel` y `RegistroForm` en un layout de panel dividido, idéntico al patrón de `app/page.tsx`.

### Composición

```
<main className="flex h-screen">
  <BrandPanel />
  <RegistroForm />
</main>
```

### Comportamiento responsivo

| Breakpoint | Comportamiento |
|------------|----------------|
| Desktop (≥ 768px) | Panel dividido: BrandPanel izquierda, RegistroForm derecha |
| Mobile (< 768px) | Solo RegistroForm visible (BrandPanel oculto) |
