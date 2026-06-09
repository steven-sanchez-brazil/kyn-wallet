# Plan de Implementación: Pantalla de Registro de Usuario

**Feature**: `002-registration-screen`  
**Objetivo**: Implementar una pantalla de registro de usuario completa para KynWallet en Next.js 14, siguiendo la especificación en `spec.md` y el diseño Figma frame "04 · Registro".

---

## 📋 Enfoque General

### Estrategia
Este plan sigue **Spec-Driven Development (SDD)** con un enfoque **Test-Driven Development (TDD)**:

1. **Fase 1: Preparación** - Validar componentes existentes, setup de testing
2. **Fase 2: Validación & Datos** - Implementar lógica de validación pura y estado del formulario
3. **Fase 3: Componentes UI** - Construir componentes React (RegistrationForm, inputs, etc.)
4. **Fase 4: Integración API** - Conectar con API Route simulada `/api/auth/register`
5. **Fase 5: Responsive & Diseño** - Implementar layout responsivo con Tailwind CSS
6. **Fase 6: Testing** - Tests unitarios e integración con Vitest
7. **Fase 7: Revisión & Refinamiento** - QA, ajustes finales

### Principios de Implementación
- **No librerías externas**: Solo Next.js, React, Tailwind CSS (sin react-hook-form, zod, etc.)
- **Validación pura**: Funciones de validación puras y testeables
- **Componentes reutilizables**: Extender BrandPanel, Button, Input existentes
- **API simulada**: `/api/auth/register` es mock, no persiste datos
- **Responsive first**: Tailwind breakpoints (lg: = ≥1024px)
- **TDD**: Tests primero, luego implementación

---

## 🏗️ Arquitectura de Componentes

### Estructura de Carpetas
```
app/
├── register/
│   ├── page.tsx                 # Página principal del registro
│   └── layout.tsx              # Layout compartido (opcional)
├── api/auth/
│   └── register/
│       └── route.ts            # API Route simulada POST /api/auth/register
components/
├── Auth/
│   ├── RegistrationForm.tsx    # Componente principal del formulario
│   ├── RegistrationForm.test.tsx
│   └── hooks/
│       ├── useRegistration.ts  # Hook para lógica de registro
│       └── useRegistration.test.ts
lib/
├── validation/
│   ├── emailValidator.ts       # Validación de correo
│   ├── passwordValidator.ts    # Validación de contraseña
│   ├── emailValidator.test.ts
│   └── passwordValidator.test.ts
├── types/
│   └── registration.ts         # Tipos TypeScript RegistrationForm, RegistrationRequest, etc.
└── constants/
    └── messages.ts             # Mensajes de validación y UI
```

### Componentes Principales

#### 1. **RegistrationForm** (Main Component)
- **Responsabilidades**:
  - Gestionar estado del formulario (nombre, correo, contraseña, confirm, términos)
  - Validación onChange y onBlur
  - Manejo del envío
  - Mostrar/ocultar errores
- **Props**: Ninguna (se usarán hooks internos)
- **Estado**: 
  - `formData`: { fullName, email, password, confirmPassword, acceptedTerms }
  - `errors`: { fullName?, email?, password?, confirmPassword?, terms? }
  - `touched`: { fullName?, email?, password?, confirmPassword?, terms? }
  - `isLoading`: boolean
  - `generalError`: string | null

#### 2. **Input Component** (Existente - posible extensión)
- Reutilizar componente existente
- Soportar estados: default, focus, error, disabled
- Mostrar mensaje de error si existe

#### 3. **Button Component** (Existente - reutilizar)
- Botón "Crear cuenta" con estados: default, loading, disabled
- Texto dinámico: "Crear cuenta" o "Creando cuenta..."

#### 4. **BrandPanel Component** (Existente - reutilizar)
- Panel izquierdo con gradiente naranja
- Visible solo en desktop (hidden lg:flex)

#### 5. **SocialLogins Component** (Existente - posible adaptación)
- Botones Google y Apple
- Al hacer clic: mostrar alert "Próximamente"

### Validaciones

#### Email Validation
```typescript
// Patrón simple: exactamente 1 @ y al menos 1 . después del @
// Válidos: user@example.com, john+tag@company.co.uk
// Inválidos: user@, @example, user.example, user@example (sin TLD)
function isValidEmail(email: string): boolean {
  const atIndex = email.indexOf('@');
  if (atIndex === -1 || atIndex === 0 || atIndex === email.length - 1) return false;
  
  const domain = email.substring(atIndex + 1);
  if (!domain.includes('.')) return false;
  
  return email.indexOf('@', atIndex + 1) === -1; // solo 1 @
}
```

#### Password Validation
```typescript
// Mínimo 8 caracteres
function isValidPassword(password: string): boolean {
  return password.length >= 8;
}
```

#### Confirmación de Contraseña
```typescript
function passwordsMatch(password: string, confirmPassword: string): boolean {
  return password === confirmPassword;
}
```

---

## 📐 Data Flow

### Flujo de Envío
1. Usuario llena formulario y hace clic en "Crear cuenta"
2. Validar todos los campos en cliente
3. Si hay errores: mostrar errores inline, retornar
4. Si válido:
   - Deshabilitar botón, mostrar "Creando cuenta..."
   - POST a `/api/auth/register` con { FullName, Email, Password, AcceptedTerms: true }
5. Respuesta API:
   - Éxito (200): Redirigir a `/login?success=registration` en 1s
   - Error 409: Mostrar "Este correo ya está registrado"
   - Otro error: Mostrar "Ocurrió un error inesperado. Por favor, intenta de nuevo."
6. Re-habilitar botón y mantener formulario con datos

### Flujo de Validación
- **onChange**: Validar campo mientras el usuario escribe (retroalimentación en tiempo real)
- **onBlur**: Marcar campo como "touched" y mostrar error si existe
- **onSubmit**: Validar todos los campos; si hay errores, marcar todos como touched

---

## 🎨 Diseño Responsivo

### Breakpoints
- **Desktop**: `≥1024px` (Tailwind `lg:`)
  - Layout: 2 columnas (50% BrandPanel + 50% Formulario)
  - BrandPanel visible
- **Tablet/Móvil**: `<1024px`
  - Layout: 1 columna full-width
  - BrandPanel oculto (hidden)
  - Padding: `px-4 md:px-6` (responsive)

### Estructura de Layout
```tsx
<div className="min-h-screen flex">
  {/* BrandPanel - Desktop Only */}
  <div className="hidden lg:flex w-1/2">
    <BrandPanel />
  </div>
  
  {/* RegistrationForm - Full Width Mobile, 50% Desktop */}
  <div className="w-full lg:w-1/2 flex items-center justify-center p-4 md:p-6">
    <RegistrationForm />
  </div>
</div>
```

---

## 🔌 API Route Simulada: POST /api/auth/register

### Endpoint
`POST /api/auth/register`

### Request Body
```json
{
  "FullName": "Juan Pérez",
  "Email": "juan@example.com",
  "Password": "SecurePass123",
  "AcceptedTerms": true
}
```

### Response (Success - 200 OK)
```json
{
  "success": true,
  "message": "Cuenta creada exitosamente"
}
```

### Response (Email Exists - 409 Conflict)
```json
{
  "error": "Este correo ya está registrado"
}
```

### Response (Validation Error - 400 Bad Request)
```json
{
  "error": "Datos inválidos"
}
```

### Response (Server Error - 500)
```json
{
  "error": "Ocurrió un error inesperado. Por favor, intenta de nuevo."
}
```

### Comportamiento Simulado
- Simular delay 500-1000ms (latencia de red)
- Puede simular errores ocasionales para testing
- NO almacena datos reales
- NO hashea contraseñas

---

## 📝 Archivos a Crear/Modificar

### Archivos Nuevos
| Ruta | Tipo | Descripción |
|------|------|-------------|
| `app/register/page.tsx` | Component | Página principal de registro |
| `app/api/auth/register/route.ts` | API Route | Endpoint simulado POST |
| `components/Auth/RegistrationForm.tsx` | Component | Componente principal del formulario |
| `components/Auth/RegistrationForm.test.tsx` | Test | Tests del componente |
| `lib/validation/emailValidator.ts` | Utility | Validación de correo |
| `lib/validation/passwordValidator.ts` | Utility | Validación de contraseña |
| `lib/validation/emailValidator.test.ts` | Test | Tests de validación |
| `lib/validation/passwordValidator.test.ts` | Test | Tests de validación |
| `lib/types/registration.ts` | Types | Tipos TypeScript |
| `lib/constants/messages.ts` | Constants | Mensajes de validación |
| `components/Auth/hooks/useRegistration.ts` | Hook | Lógica de registro |
| `components/Auth/hooks/useRegistration.test.ts` | Test | Tests del hook |

### Archivos Modificados (Posibles)
| Ruta | Cambios |
|------|---------|
| `app/layout.tsx` | Agregar estilos globales si necesario |
| `package.json` | Verificar dependencias (no agregar nuevas) |

---

## 🧪 Estrategia de Testing

### Tests Unitarios (Vitest)
1. **emailValidator.test.ts**
   - ✓ Valida emails correctos (user@example.com, user+tag@company.co.uk)
   - ✓ Rechaza emails inválidos (user@, @example, user.example, user@example sin TLD)
   - ✓ Rechaza emails con múltiples @

2. **passwordValidator.test.ts**
   - ✓ Valida passwords ≥8 caracteres
   - ✓ Rechaza passwords <8 caracteres
   - ✓ Valida coincidencia de passwords

3. **RegistrationForm.test.tsx**
   - ✓ Renderiza formulario correctamente
   - ✓ Muestra errores de validación onChange/onBlur
   - ✓ Envía formulario válido a API
   - ✓ Maneja respuesta exitosa (redirección)
   - ✓ Maneja errores (409, 400, 500)
   - ✓ Desabilita botón durante loading
   - ✓ Previene doble envío

4. **useRegistration.test.ts**
   - ✓ Inicializa estado correctamente
   - ✓ Valida campos correctamente
   - ✓ Actualiza touched fields
   - ✓ Envía datos correctos a API

### Tests de Integración (opcional, E2E con Playwright)
- Flujo completo: rellenar formulario → validar → enviar → redireccionar

---

## 📅 Fases de Implementación

### Fase 1: Preparación (30 min)
- [ ] Revisar componentes existentes (BrandPanel, Button, Input)
- [ ] Configurar estructura de carpetas
- [ ] Crear tipos TypeScript en `lib/types/registration.ts`
- [ ] Crear constantes de mensajes en `lib/constants/messages.ts`

### Fase 2: Validación (45 min)
- [ ] Implementar `emailValidator.ts` con tests
- [ ] Implementar `passwordValidator.ts` con tests
- [ ] Implementar `useRegistration.ts` hook con lógica

### Fase 3: Componentes UI (60 min)
- [ ] Implementar `RegistrationForm.tsx`
- [ ] Integrar componentes Input, Button existentes
- [ ] Estrutura HTML responsiva con Tailwind
- [ ] Estilos de error y estados

### Fase 4: API Route (30 min)
- [ ] Crear `app/api/auth/register/route.ts`
- [ ] Implementar simulación de delay (500-1000ms)
- [ ] Implementar validaciones básicas
- [ ] Implementar respuestas simuladas (éxito, 409, 400, 500)

### Fase 5: Integración (30 min)
- [ ] Conectar RegistrationForm con API Route
- [ ] Implementar manejo de errores
- [ ] Implementar redirección exitosa a `/login?success=registration`
- [ ] Testing manual

### Fase 6: Testing Completo (60 min)
- [ ] Tests unitarios de validación
- [ ] Tests del componente RegistrationForm
- [ ] Tests del hook useRegistration
- [ ] Tests de API Route (si es necesario)
- [ ] Ejecutar `npm run test` - Verificar 100% tests passing

### Fase 7: Responsivo & Diseño (45 min)
- [ ] Verificar layout desktop (1024px+)
- [ ] Verificar layout móvil (<1024px)
- [ ] Comparar con Figma frame "04 · Registro"
- [ ] Ajustar colores, tipografía, espaciado
- [ ] Verificar fidelidad visual (95%+)

### Fase 8: Revisión Final (30 min)
- [ ] Validación completa de spec.md
- [ ] Testing manual de flujos:
  - Registro exitoso → redirección
  - Errores de validación → mostrar mensajes
  - Botones sociales → alert "Próximamente"
  - Link "Inicia sesión" → navega a /login
- [ ] Linting y formateo
- [ ] Commit y preparación para PR

---

## ✅ Criterios de Éxito de Implementación

- [ ] Formulario valida todos los campos correctamente
- [ ] Errores inline mostrados al usuario
- [ ] Botón "Crear cuenta" tiene lógica correcta (siempre clickeable, solo deshabilitado durante loading)
- [ ] Validación de correo con patrón simple (1 @ + 1 . después)
- [ ] Layout responsivo: desktop 2 cols, mobile 1 col full-width
- [ ] API Route simulada retorna respuestas correctas
- [ ] Redirección exitosa a `/login?success=registration`
- [ ] Botones sociales muestran "Próximamente"
- [ ] Link "Inicia sesión" navega a /login
- [ ] 100% tests passing
- [ ] 95%+ fidelidad con Figma
- [ ] Sin librerías externas (solo Next.js, React, Tailwind)

---

## 🚀 Notas Importantes

1. **API Route Simulada**: El endpoint NO persiste datos reales. Es solo para UX/testing.
2. **Sin Bcrypt**: No se usan librerías de hashing. En producción, se requeriría.
3. **Validación Pura**: Las funciones de validación deben ser puras y testeables.
4. **Componentes Reutilizables**: BrandPanel, Button, Input ya existen - reutilizarlos.
5. **Tailwind CSS**: Usar Tailwind para estilos responsivos, sin CSS Modules.
6. **TypeScript**: Mantener tipos fuertes en todo el código.
7. **Testing**: Vitest para tests unitarios, sin Playwright para v1.
8. **Workshop**: Mantener simplicidad - no agregar features más allá de spec.

