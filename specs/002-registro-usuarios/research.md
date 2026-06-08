# Research: Pantalla de Registro de Usuarios — KynWallet

**Feature Branch**: `feature/002-registro-usuarios`  
**Generado**: 2026-06-08  
**Estado**: Completo — sin ítems NEEDS CLARIFICATION pendientes

---

## Contexto del Repositorio Existente

El repositorio kyn-wallet es una aplicación Next.js 14 (App Router) con TypeScript y Tailwind CSS 3.x. No tiene backend; toda la autenticación es in-memory. El test runner es Vitest con @testing-library/react. No se usan librerías externas de UI (sin Radix, Shadcn, MUI, etc.).

**Estructura de carpetas detectada:**
```
app/          → rutas Next.js App Router
components/   → componentes React reutilizables
  ui/         → componentes UI primitivos (Input, Button)
lib/
  constants/  → DesignTokens.ts
  services/   → AuthService.ts
  types/      → Auth.ts
  utils/      → Validation.ts
specs/        → especificaciones del proyecto
```

---

## Decisiones de Diseño (NEEDS CLARIFICATION resueltos)

### D-001: Ruta de la pantalla de registro

**Decisión**: `/register` → `app/register/page.tsx`  
**Rationale**: Sigue la convención App Router de Next.js. El login está en `app/page.tsx` (raíz `/`). Se evita colisión con rutas existentes.  
**Alternativas consideradas**: `/signup` (terminología menos local para LatAm), `/registro` (URL en español pero menos convencional en Next.js).

---

### D-002: Reutilización vs. variante de BrandPanel

**Decisión**: Agregar props opcionales a `BrandPanel` existente (`headline`, `subheadline`) con valores por defecto que mantienen el comportamiento actual del Login.  
**Rationale**: DRY — evita duplicar 50+ líneas de JSX para el panel. YAGNI — no crear una jerarquía de componentes innecesaria.  
**Alternativas consideradas**:
- Crear `RegisterBrandPanel` separado: descartado por duplicación de código.
- Usar un archivo de configuración por pantalla: sobre-engineering para solo 2 variantes.

---

### D-003: Toggle de visibilidad en campos de contraseña

**Decisión**: Agregar prop `showPasswordToggle?: boolean` al componente `Input` existente. Cuando está activo, el input alterna entre `type="password"` y `type="text"` con un botón de ícono inline (SVG sin librerías externas).  
**Rationale**: El diseño Figma muestra el ícono de ojo en ambos campos de contraseña. El componente `Input` ya soporta extensión vía props.  
**Alternativas consideradas**:
- Estado del toggle en `RegisterForm`: acoplamiento innecesario entre lógica de UI y lógica de validación.

---

### D-004: Comunicación del éxito de registro al Login

**Decisión**: Redirigir a `/login?registered=true` tras registro exitoso. El componente `LoginForm` detecta el query param con `useSearchParams()` y muestra un banner de éxito verde.  
**Rationale**: Patrón estándar en Next.js App Router para comunicar estado entre páginas sin estado global. No requiere ninguna librería adicional.  
**Alternativas consideradas**:
- Estado global (Context/Zustand): requiere una librería o estructura adicional no justificada para un solo mensaje.
- `sessionStorage`/`localStorage`: funcionaría, pero el query param es más idiomático y trazable.
- Flash message en cookie: excesivamente complejo para este caso.

---

### D-005: Manejo de correo duplicado

**Decisión**: `AuthService.register()` retorna un objeto tipado `RegisterResult` con `{ success: boolean; error?: 'EMAIL_TAKEN' | 'UNKNOWN' }`. `RegisterForm` mapea el error `EMAIL_TAKEN` a un mensaje inline en el campo de correo.  
**Rationale**: Tipado explícito de errores sin excepciones. Patrón consistente con el `login()` existente que retorna `boolean`.  
**Alternativas consideradas**:
- Lanzar una excepción: el patrón de `try/catch` en la UI es más verboso y menos predecible.

---

### D-006: Persistencia de usuarios registrados

**Decisión**: Los usuarios creados se agregan al mismo array `MOCK_USERS` en memoria dentro de `AuthService.ts`. Para mayor persistencia entre recargas de página, se usa `localStorage` para almacenar usuarios adicionales (no los seeders).  
**Rationale**: Los usuarios ya existentes (seed) no deben ser alterados (FR-013). `localStorage` permite que los usuarios registrados sobrevivan a recargas sin un backend. No se requiere librería adicional.  
**Alternativas consideradas**:
- Solo in-memory: los usuarios registrados se perderían al recargar la página, rompiendo el criterio de aceptación de autenticación post-registro.
- IndexedDB: overkill para la escala actual.

---

### D-007: Validaciones adicionales necesarias

**Decisión**: Agregar a `lib/utils/Validation.ts` las siguientes funciones:
- `validateFullName(name: string): boolean` — no vacío, al menos 2 palabras.
- `validatePasswordMatch(password: string, confirm: string): boolean` — igualdad estricta.

**Rationale**: DRY — centralizar validaciones en `Validation.ts` para que sean testeables de forma aislada, igual que `validateEmail` y `validatePassword`.  
**Alternativas consideradas**:
- Validar inline en el componente: viola SRP y hace las validaciones no testeables unitariamente.

---

### D-008: Tipos nuevos en Auth.ts

**Decisión**: Agregar `RegisterCredentials` y `RegisterResult` a `lib/types/Auth.ts`. Extender `User` con campo `FullName: string`.  
**Rationale**: Los tipos centralizados evitan duplicación y permiten refactorización futura. Extender `User` es consistente con el diseño existente.  
**Impacto en código existente**: El seed de `MOCK_USERS` debe incluir `FullName` con un valor por defecto vacío o "Steven Luna" para mantener compatibilidad.

---

### D-009: Diseño visual — fuente de verdad Figma

**Decisión**: Los tokens de diseño extraídos del frame "04 · Registro" son compatibles con el sistema de tokens existente en `DesignTokens.ts`. No se requieren tokens nuevos.

| Token | Valor Figma | Token Existente |
|-------|------------|-----------------|
| Heading color | `#16182c` | `Neutral900` ✓ |
| Subtitle color | `#8a8ba8` | `Neutral500` ✓ |
| Input border | `#d7d9e6` | `Neutral300` ✓ |
| Button bg | `#ff6b3d` | `BrandPrimary` ✓ |
| Gradient start | `rgb(255,138,101)` | `BrandGradientStart` ✓ |
| Gradient end | `rgb(239,82,38)` | `BrandGradientEnd` ✓ |
| Brand panel gradient angle | `70.73°` | — (inline en BrandPanel) |
| Label color | `#3d3f5c` | — (nuevo: `text-[#3d3f5c]` inline) |
| Placeholder color | `#a9abc2` | — (Tailwind placeholder class) |
| Terms link/login link | `#ef5226` | — (cercano a `BrandPrimary`, inline) |

**Nota**: Los colores de label (`#3d3f5c`) y los links (`#ef5226`) son específicos del frame de registro y se usan inline con Tailwind arbitrary values. No requieren nuevas entradas en `DesignTokens.ts`.

---

## Conclusión

Todos los ítems de investigación han sido resueltos. La implementación puede proceder sin incertidumbres técnicas. El stack existente es suficiente: no se requieren nuevas dependencias.
