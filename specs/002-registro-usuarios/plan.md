# Plan de Implementación: Registro de Usuarios

**Spec de referencia**: `specs/002-registro-usuarios/spec.md`
**Creado**: 2026-06-07
**Estado**: Aprobado

---

## Resumen Ejecutivo

Implementar la pantalla de Registro de KynWallet siguiendo el mismo patrón arquitectónico del Login existente (split-screen, BrandPanel, servicios mock, validaciones inline). Se reutilizan los tokens de diseño, componentes UI base (`Button`, `Input`) y la estructura de carpetas establecida.

---

## Decisiones Arquitectónicas

| Decisión | Elección | Justificación |
|----------|----------|---------------|
| Ruta de Registro | `app/register/page.tsx` | Convención App Router de Next.js |
| Panel de Marca | Reutilizar `BrandPanel` con props | DRY — evitar duplicación del panel |
| Servicio de Registro | `lib/services/RegisterService.ts` | Separación de responsabilidades (Clean Architecture) |
| Tipos | `lib/types/Register.ts` | Tipado fuerte, consistente con `Auth.ts` |
| Validaciones | Extender `lib/utils/Validation.ts` | DRY — reutilizar `validateEmail`, `validatePassword` |
| Banner de éxito | Modificar `app/page.tsx` (Login) | Leer `?registered=true` del searchParam |
| BrandPanel props | Agregar `headline` y `subtitle` opcionales | Permite personalizar el copy sin duplicar |

---

## Fases de Implementación

### Fase 1 — Infraestructura Base (Bloqueante)

Extender tipos, validaciones y servicio mock antes de construir la UI.

**Archivos a crear/modificar**:
- `lib/types/Register.ts` — tipo `RegisterCredentials`
- `lib/utils/Validation.ts` — agregar `validateFullName`, `validatePasswordMatch`
- `lib/services/RegisterService.ts` — mock de registro con detección de duplicados
- `components/BrandPanel.tsx` — agregar props `headline?` y `subtitle?`

---

### Fase 2 — Componente Principal (MVP)

Construir `RegisterForm` con todos los campos, validaciones inline, submit y redirección.

**Archivos a crear**:
- `components/RegisterForm.tsx` — formulario completo con estado y handlers
- `app/register/page.tsx` — página con split-layout: `BrandPanel` + `RegisterForm`

---

### Fase 3 — Integración con Login (Banner de Éxito)

Modificar la página de Login para detectar el parámetro de éxito y mostrar el banner.

**Archivos a modificar**:
- `app/page.tsx` — leer `searchParams.registered` y pasar prop a `LoginForm`
- `components/LoginForm.tsx` — aceptar y mostrar `successMessage` prop

---

### Fase 4 — Tests (TDD)

Escribir pruebas unitarias e integración para las nuevas funciones y componentes.

**Archivos a crear**:
- `lib/utils/Validation.test.ts` — extender con `validateFullName`, `validatePasswordMatch`
- `lib/services/RegisterService.test.ts` — pruebas del mock de registro
- `components/RegisterForm.test.tsx` — pruebas de validación UI y flujo de registro

---

### Fase 5 — Polish y Responsive

Verificar fidelidad visual con Figma, comportamiento responsive y accesibilidad básica.

**Archivos a revisar**: `app/register/page.tsx`, `components/RegisterForm.tsx`, `components/BrandPanel.tsx`

---

## Orden de Ejecución

```
Fase 1 (tipos + validaciones + servicio + BrandPanel props)
    ↓
Fase 2 (RegisterForm + página /register)
    ↓
Fase 3 (banner éxito en Login)
    ↓
Fase 4 (tests)
    ↓
Fase 5 (polish + responsive)
```

---

## Riesgos y Mitigaciones

| Riesgo | Mitigación |
|--------|-----------|
| BrandPanel con props rompe Login existente | Usar props opcionales con valores por defecto |
| Parámetro `registered` en URL visible en Login | Aceptable para un mock; se documenta en suposiciones |
| Vitest no detecta nuevos archivos de test | Verificar `vitest.config.ts` incluye el patrón correcto |
