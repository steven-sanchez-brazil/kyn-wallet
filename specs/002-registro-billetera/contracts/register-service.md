# Contract: Register Service

**Feature**: 002-registro-billetera  
**Date**: 2026-06-08

## Interface: IRegisterService

### `register(data: RegisterData): Promise<RegisterResult>`

Simula el registro de un nuevo usuario.

**Input**:

```typescript
interface RegisterData {
  FullName: string;
  Email: string;
  Password: string;
}
```

**Output**:

```typescript
interface RegisterResult {
  Success: boolean;
  Message: string;
}
```

**Behavior**:

| Scenario | Input | Expected Output |
|----------|-------|-----------------|
| Registro exitoso | Datos válidos (cualquier combinación) | `{ Success: true, Message: 'Cuenta creada exitosamente' }` |

**Constraints**:
- Simula un delay de ~500ms para emular llamada a API
- Siempre retorna éxito (sin validación de unicidad)
- No persiste datos

---

## Interface: Validation Functions (extensions)

### `validateFullName(name: string): boolean`

Valida que el nombre completo no esté vacío después de trim.

| Input | Output |
|-------|--------|
| `"Juan Pérez"` | `true` |
| `""` | `false` |
| `"   "` | `false` |

### `validatePasswordMatch(password: string, confirmPassword: string): boolean`

Valida que ambas contraseñas coincidan.

| Input | Output |
|-------|--------|
| `("abc123456", "abc123456")` | `true` |
| `("abc123456", "xyz789012")` | `false` |
| `("", "")` | `true` (coinciden, pero campo obligatorio se valida aparte) |

---

## Route Contract: /register

**Method**: GET (página estática, Next.js App Router)  
**Renders**: RegisterPage component  
**Layout**: 2 paneles en desktop (BrandPanel + RegisterForm), solo RegisterForm en mobile

### User Flow

1. Usuario accede a `/register`
2. Se muestra formulario con campos vacíos
3. Usuario completa campos → validación on blur
4. Clic "Crear cuenta" → validación completa → RegisterService.register()
5. Éxito → `router.push('/login?registered=true')`

---

## Route Contract: /login (modification)

**Query Parameters** (nuevo):

| Param | Type | Description |
|-------|------|-------------|
| `registered` | string | Si es `"true"`, muestra banner de éxito |

**Banner de éxito**: Mensaje temporal indicando que la cuenta fue creada exitosamente.
