# Investigación: Registro de Usuario Nuevo

**Feature**: `002-registro-usuario` | **Fase**: 0 — Investigación
**Fecha**: 2026-06-05

## Resumen

No se encontraron ítems NEEDS CLARIFICATION en la especificación. El stack tecnológico está completamente definido por el proyecto existente. Esta investigación consolida las decisiones de diseño e integración basadas en el código existente.

---

## Decisión 1: Stack Técnico

**Decisión**: TypeScript / Next.js 14 (App Router) / Tailwind CSS 3.x / Vitest + React Testing Library

**Justificación**: El proyecto ya usa este stack en su totalidad. No hay razón para introducir variantes. El `package.json` confirma todas las dependencias.

**Alternativas consideradas**: ninguna — stack ya establecido.

---

## Decisión 2: Estrategia de Testing (TDD)

**Decisión**: Vitest + React Testing Library, siguiendo ciclo Rojo-Verde-Refactorización. Los tests se escriben **antes** que el código de implementación.

**Justificación**: La constitución del proyecto exige TDD estricto. Vitest ya está configurado en `vitest.config.ts` y `vitest.setup.ts`. Los tests existentes (`AuthService.test.ts`, `Validation.test.ts`, `LoginForm.test.tsx`) sirven como modelo.

**Alternativas consideradas**: Jest — rechazado porque Vitest ya está configurado y es compatible con el ecosistema Vite/Next.js del proyecto.

---

## Decisión 3: Patrón de Registro (AuthService)

**Decisión**: Extender `AuthService.ts` con un método `register(credentials: NuevoUsuario): Promise<ResultadoRegistro>`. Los usuarios registrados se agregan al array `MOCK_USERS` en memoria.

**Justificación**: Sigue exactamente el mismo patrón del método `login()` existente. El array `MOCK_USERS` ya actúa como "base de datos" en memoria. Reutilizar el servicio respeta el principio DRY y la Arquitectura Limpia.

**Alternativas consideradas**:
- Crear un `RegistroService` separado — rechazado porque viola DRY; la lógica de autenticación/usuarios debe estar centralizada en `AuthService`.
- Persistencia real (localStorage, API) — rechazado por YAGNI; la spec indica explícitamente que es simulado en memoria.

---

## Decisión 4: Validaciones

**Decisión**: Extender `lib/utils/Validation.ts` con dos nuevas funciones puras:
- `validatePasswordMatch(password: string, confirm: string): boolean`
- `validateFullName(name: string): boolean` (mínimo 2 palabras, sin caracteres especiales)

**Justificación**: Las funciones de validación existentes (`validateEmail`, `validatePassword`) son funciones puras independientes. Agregar las nuevas en el mismo archivo respeta DRY y la Responsabilidad Única (el módulo `Validation` tiene un único propósito).

**Alternativas consideradas**: Validar inline en el componente — rechazado porque viola SOLID (mezcla UI con lógica) y hace los tests más difíciles.

---

## Decisión 5: Componente RegistroForm

**Decisión**: Crear `components/RegistroForm.tsx` como componente independiente, análogo a `LoginForm.tsx`. La página `app/registro/page.tsx` lo orquesta junto con `BrandPanel.tsx`.

**Justificación**: Sigue exactamente el mismo patrón de composición de la pantalla de Login (`page.tsx` + `BrandPanel.tsx` + `LoginForm.tsx`). Facilita el testing aislado del formulario.

**Alternativas consideradas**: Poner toda la lógica en `page.tsx` — rechazado porque viola Responsabilidad Única y dificulta el testing.

---

## Decisión 6: Modelo Gráfico de Referencia

**Decisión**: `registro_screen.png` (en la raíz del proyecto) es la fuente de verdad visual. Los tokens de diseño existentes en `lib/constants/DesignTokens.ts` se reutilizan y se extienden solo si el análisis visual de `registro_screen.png` revela diferencias con los tokens del Login.

**Justificación**: La spec (FR-003) establece este archivo como referencia primaria. Los tokens de diseño del Login (`#ff6b3d`, `#16182c`, `#8a8ca8`, `#d7d9e6`, bordes 12px, Inter) se asumen compartidos salvo evidencia contraria en la imagen.

**Alternativas consideradas**: Acceso a Figma vía MCP — no disponible en la sesión actual; `registro_screen.png` cubre el requisito.

---

## Decisión 7: Navegación

**Decisión**: Usar `next/link` para la navegación entre Login (`/`) y Registro (`/registro`). No se usa `useRouter` para navegación directa, salvo para el redirect post-registro.

**Justificación**: `next/link` es el estándar de Next.js App Router para enlaces declarativos. El redirect programático post-registro usa `useRouter` (mismo patrón del Login existente).

**Alternativas consideradas**: `<a href>` nativo — rechazado porque no usa el router de Next.js y no prefetch la ruta destino.
