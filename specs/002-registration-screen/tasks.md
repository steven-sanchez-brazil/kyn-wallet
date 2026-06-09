# Tasks: Pantalla de Registro de Usuario

**Feature**: `002-registration-screen`  
**Status**: Listo para implementación  
**Total Tasks**: 24  
**Duración estimada**: ~5 horas

---

## 🎯 Tareas Ordenadas por Dependencias

### **FASE 1: Preparación** (Bloqueador para todo)

#### T1.1: Revisar componentes existentes ⏱️ 15 min
- **Descripción**: Revisar BrandPanel, Button, Input components para entender props, estilos y comportamiento.
- **Dependencias**: Ninguna
- **Entregables**: Documentación mental de props/estilos
- **Aceptación**: 
  - ✓ Entiendo cómo usar BrandPanel
  - ✓ Entiendo props de Button (disabled, loading, etc.)
  - ✓ Entiendo props de Input (error, value, onChange, etc.)

#### T1.2: Crear estructura de carpetas ⏱️ 10 min
- **Descripción**: Crear carpetas: `app/register/`, `app/api/auth/register/`, `components/Auth/`, `components/Auth/hooks/`, `lib/validation/`, `lib/types/`.
- **Dependencias**: T1.1
- **Bash**:
  ```bash
  mkdir -p app/register app/api/auth/register components/Auth/hooks lib/validation lib/types lib/constants
  ```
- **Aceptación**: ✓ Todas las carpetas creadas

#### T1.3: Crear tipos TypeScript ⏱️ 15 min
- **Descripción**: Crear `lib/types/registration.ts` con tipos:
  - `RegistrationForm` (fullName, email, password, confirmPassword, acceptedTerms)
  - `RegistrationFormErrors` (fullName?, email?, password?, confirmPassword?, terms?)
  - `RegistrationRequest` (FullName, Email, Password, AcceptedTerms)
  - `RegistrationResponse` (success, message) | (error, code)
  - `FieldError` (fieldName, errorMessage)
- **Dependencias**: T1.2
- **Archivo**: `lib/types/registration.ts`
- **Aceptación**:
  - ✓ Archivo existe con todos los tipos
  - ✓ TypeScript compile sin errores

#### T1.4: Crear constantes de mensajes ⏱️ 10 min
- **Descripción**: Crear `lib/constants/messages.ts` con mensajes:
  - Errores de validación (email, password, confirm, terms)
  - Labels de campos
  - Placeholder text
  - Botón text (crear cuenta, creando cuenta)
- **Dependencias**: T1.2
- **Archivo**: `lib/constants/messages.ts`
- **Aceptación**: ✓ Todos los mensajes en un solo lugar, reutilizables

---

### **FASE 2: Validación** (Bloqueador para RegistrationForm)

#### T2.1: Implementar emailValidator ⏱️ 15 min
- **Descripción**: Crear `lib/validation/emailValidator.ts`:
  ```typescript
  export function isValidEmail(email: string): boolean
  ```
  - Validar: exactamente 1 "@" y al menos 1 "." después del "@"
  - Casos válidos: user@example.com, john+tag@company.co.uk
  - Casos inválidos: user@, @example, user.example, user@example
- **Dependencias**: T1.3
- **Archivo**: `lib/validation/emailValidator.ts`
- **Aceptación**:
  - ✓ Valida emails correctos
  - ✓ Rechaza emails inválidos
  - ✓ Sin errores de compilación

#### T2.1.1: Tests emailValidator ⏱️ 20 min
- **Descripción**: Crear `lib/validation/emailValidator.test.ts` con:
  - ✓ Valid emails (usuario@dominio.com, user+tag@company.co.uk)
  - ✓ Invalid emails (usuario@, @dominio, usuario.dominio, etc.)
  - ✓ Edge cases (vacío, múltiples @, etc.)
- **Dependencias**: T2.1
- **Archivo**: `lib/validation/emailValidator.test.ts`
- **Aceptación**: ✓ `npm run test -- emailValidator` pasa 100%

#### T2.2: Implementar passwordValidator ⏱️ 10 min
- **Descripción**: Crear `lib/validation/passwordValidator.ts`:
  ```typescript
  export function isValidPassword(password: string): boolean // Min 8 chars
  export function passwordsMatch(password: string, confirmPassword: string): boolean
  ```
- **Dependencias**: T1.3
- **Archivo**: `lib/validation/passwordValidator.ts`
- **Aceptación**:
  - ✓ isValidPassword valida longitud ≥8
  - ✓ passwordsMatch compara exactamente
  - ✓ Sin errores de compilación

#### T2.2.1: Tests passwordValidator ⏱️ 15 min
- **Descripción**: Crear `lib/validation/passwordValidator.test.ts` con:
  - ✓ Valid passwords (≥8 chars)
  - ✓ Invalid passwords (<8 chars)
  - ✓ Matching passwords
  - ✓ Non-matching passwords
- **Dependencias**: T2.2
- **Archivo**: `lib/validation/passwordValidator.test.ts`
- **Aceptación**: ✓ `npm run test -- passwordValidator` pasa 100%

#### T2.3: Implementar useRegistration hook ⏱️ 40 min
- **Descripción**: Crear `components/Auth/hooks/useRegistration.ts`:
  - Estado: formData, errors, touched, isLoading, generalError
  - Métodos: handleChange, handleBlur, handleSubmit, resetForm
  - Validación onChange y onBlur
  - POST a `/api/auth/register`
  - Manejo de errores (409, 400, 500)
  - Redirección exitosa
- **Dependencias**: T1.3, T2.1, T2.2
- **Archivo**: `components/Auth/hooks/useRegistration.ts`
- **Aceptación**:
  - ✓ Hook inicializa estado correctamente
  - ✓ handleChange actualiza formData
  - ✓ handleBlur marca touched y valida
  - ✓ handleSubmit valida y POST
  - ✓ Maneja respuestas correctamente

#### T2.3.1: Tests useRegistration hook ⏱️ 25 min
- **Descripción**: Crear `components/Auth/hooks/useRegistration.test.ts`:
  - ✓ Hook inicializa correctamente
  - ✓ handleChange funciona
  - ✓ handleBlur marca touched
  - ✓ Validación onChange/onBlur funciona
  - ✓ handleSubmit con éxito
  - ✓ handleSubmit con errores
- **Dependencias**: T2.3
- **Archivo**: `components/Auth/hooks/useRegistration.test.ts`
- **Aceptación**: ✓ `npm run test -- useRegistration` pasa 100%

---

### **FASE 3: Componentes UI** (Bloqueador para página)

#### T3.1: Implementar RegistrationForm ⏱️ 50 min
- **Descripción**: Crear `components/Auth/RegistrationForm.tsx`:
  - "use client" directive
  - Usar useRegistration hook
  - Renderizar campos: fullName, email, password, confirmPassword
  - Renderizar checkbox términos
  - Renderizar botón "Crear cuenta"
  - Renderizar divisor "o continúa con"
  - Renderizar botones Google/Apple
  - Renderizar link "¿Ya tienes cuenta? Inicia sesión"
  - Estilos con Tailwind (error states, focus, etc.)
  - Validaciones inline visibles
- **Dependencias**: T1.1, T1.3, T1.4, T2.3
- **Archivo**: `components/Auth/RegistrationForm.tsx`
- **Aceptación**:
  - ✓ Componente renderiza correctamente
  - ✓ Errores inline visibles
  - ✓ Botón responde a clicks
  - ✓ Navegación funciona
  - ✓ Sin errores de compilación
  - ✓ Responsive (mobile, desktop)

#### T3.1.1: Tests RegistrationForm ⏱️ 30 min
- **Descripción**: Crear `components/Auth/RegistrationForm.test.tsx`:
  - ✓ Renderiza formulario
  - ✓ Muestra errores de validación
  - ✓ Desabilita botón durante loading
  - ✓ Envía datos correctos a API
  - ✓ Maneja respuesta exitosa
  - ✓ Maneja errores
- **Dependencias**: T3.1
- **Archivo**: `components/Auth/RegistrationForm.test.tsx`
- **Aceptación**: ✓ `npm run test -- RegistrationForm` pasa 100%

#### T3.2: Crear página /register ⏱️ 20 min
- **Descripción**: Crear `app/register/page.tsx`:
  - Layout: 2 cols (BrandPanel left, Form right) en desktop; 1 col en mobile
  - BrandPanel: `hidden lg:flex w-1/2` (oculto en móvil)
  - RegistrationForm: `w-full lg:w-1/2` (full en móvil, 50% en desktop)
  - Usar componentes BrandPanel y RegistrationForm
  - Estilos responsivos con Tailwind
- **Dependencias**: T1.1, T3.1
- **Archivo**: `app/register/page.tsx`
- **Aceptación**:
  - ✓ Página carga sin errores
  - ✓ Layout desktop correcto (2 cols)
  - ✓ Layout móvil correcto (1 col)
  - ✓ BrandPanel visible en desktop, oculto en móvil
  - ✓ Responsive en tablets

---

### **FASE 4: API Route** (Bloqueador para integración)

#### T4.1: Implementar API Route POST /api/auth/register ⏱️ 30 min
- **Descripción**: Crear `app/api/auth/register/route.ts`:
  - POST handler
  - Validar request body (FullName, Email, Password, AcceptedTerms)
  - Simular delay 500-1000ms
  - Respuesta exitosa (200): `{ success: true, message: "..." }`
  - Respuesta error 409 (correo existe): `{ error: "Este correo ya está registrado" }`
  - Respuesta error 400 (validación): `{ error: "Datos inválidos" }`
  - GET handler: Retorna 405 Method Not Allowed
- **Dependencias**: T1.3
- **Archivo**: `app/api/auth/register/route.ts`
- **Aceptación**:
  - ✓ POST funciona correctamente
  - ✓ GET retorna 405
  - ✓ Simula delay
  - ✓ Retorna respuestas correctas
  - ✓ Sin errores de compilación

#### T4.2: Testing manual de API Route ⏱️ 15 min
- **Descripción**: Probar API Route con curl o Postman:
  - ✓ POST exitoso retorna 200
  - ✓ POST inválido retorna 400 o 409
  - ✓ GET retorna 405
  - ✓ Simula delay (esperar 500-1000ms)
- **Dependencias**: T4.1
- **Aceptación**: ✓ API Route funciona como se espera

---

### **FASE 5: Integración** (Bloqueador para testing completo)

#### T5.1: Conectar RegistrationForm con API Route ⏱️ 15 min
- **Descripción**: Verificar que useRegistration.handleSubmit POST correctamente a `/api/auth/register`
- **Dependencias**: T2.3, T4.1
- **Testing manual**: 
  - ✓ Llenar formulario válido → clic "Crear cuenta" → POST a API
  - ✓ Respuesta exitosa → redirige a `/login?success=registration`
  - ✓ Error 409 → muestra "Este correo ya está registrado"
  - ✓ Error 400 → muestra "Ocurrió un error inesperado"
- **Aceptación**: ✓ Flujo completo funciona

#### T5.2: Implementar redirección exitosa ⏱️ 10 min
- **Descripción**: En useRegistration.handleSubmit, después de éxito:
  - Esperar 1 segundo
  - Redirigir a `/login?success=registration` usando `router.push()`
- **Dependencias**: T2.3
- **Aceptación**: ✓ Redirección funciona después de éxito

#### T5.3: Implementar manejo de errores ⏱️ 15 min
- **Descripción**: En useRegistration.handleSubmit:
  - Error 409: Mostrar "Este correo ya está registrado"
  - Error 400: Mostrar "Datos inválidos"
  - Error 500: Mostrar "Ocurrió un error inesperado. Por favor, intenta de nuevo."
  - Otros errores: Mostrar "Ocurrió un error inesperado"
  - Re-habilitar botón y mantener formulario lleno
- **Dependencias**: T2.3
- **Aceptación**: ✓ Errores mostrados y manejados correctamente

---

### **FASE 6: Validación & Pruebas**

#### T6.1: Ejecutar todos los tests ⏱️ 20 min
- **Descripción**: Ejecutar `npm run test` y verificar:
  - ✓ emailValidator tests pasan
  - ✓ passwordValidator tests pasan
  - ✓ useRegistration tests pasan
  - ✓ RegistrationForm tests pasan
  - ✓ Coverage ≥80%
- **Dependencias**: T2.1.1, T2.2.1, T2.3.1, T3.1.1
- **Bash**: `npm run test`
- **Aceptación**: ✓ 100% tests passing

#### T6.2: Validar flujo completo - Caso exitoso ⏱️ 15 min
- **Descripción**: Testing manual del flujo:
  1. Navegar a `/register`
  2. Ingresar: Nombre válido, Email válido, Password ≥8, Confirm match, Terms ✓
  3. Clic "Crear cuenta"
  4. Botón muestra "Creando cuenta..." (disabled)
  5. Esperar respuesta API (500-1000ms)
  6. Redireccionar a `/login?success=registration`
- **Aceptación**: ✓ Flujo completo funciona sin errores

#### T6.3: Validar flujos de error ⏱️ 15 min
- **Descripción**: Testing manual de errores:
  - Email inválido → Mostrar error onBlur
  - Password <8 chars → Mostrar error onChange
  - Confirmación no coincide → Mostrar error onBlur
  - Terms no aceptados → Botón deshabilitado
  - Correo ya existe → Mostrar "Este correo ya está registrado" (simular 409)
  - Error servidor → Mostrar "Ocurrió un error inesperado"
- **Aceptación**: ✓ Todos los errores validados

#### T6.4: Validar botones sociales ⏱️ 5 min
- **Descripción**: Testing manual:
  - Clic botón Google → Alert "Próximamente"
  - Clic botón Apple → Alert "Próximamente"
- **Aceptación**: ✓ Botones funcionan correctamente

#### T6.5: Validar link "Inicia sesión" ⏱️ 5 min
- **Descripción**: Testing manual:
  - Clic link "¿Ya tienes cuenta? Inicia sesión" → Navega a `/login`
- **Aceptación**: ✓ Navegación funciona

---

### **FASE 7: Diseño & Responsivo**

#### T7.1: Validar layout desktop (≥1024px) ⏱️ 15 min
- **Descripción**: Testing en viewport ≥1024px:
  - ✓ BrandPanel visible (izquierda, 50%)
  - ✓ Formulario derecha (50%)
  - ✓ Colores, tipografía, espaciado coincide con Figma
  - ✓ Componentes Input, Button correctamente estilizados
  - ✓ Errores mostrados con texto rojo
  - ✓ Focus ring azul en inputs
- **Dependencias**: T3.2
- **Aceptación**: ✓ Layout desktop 95%+ fidelidad con Figma

#### T7.2: Validar layout móvil (<1024px) ⏱️ 15 min
- **Descripción**: Testing en viewport <1024px:
  - ✓ BrandPanel oculto
  - ✓ Formulario full-width
  - ✓ Padding responsivo (p-4 móvil, p-6 tablet)
  - ✓ Inputs, botones, texto legible
  - ✓ Colores y espaciado mantienen proporción
- **Aceptación**: ✓ Layout móvil 95%+ fidelidad

#### T7.3: Validar layout tablet (768px-1024px) ⏱️ 10 min
- **Descripción**: Testing en viewport tablet:
  - ✓ Layout smooth entre móvil y desktop
  - ✓ BrandPanel comienza a aparecer cerca de 1024px
  - ✓ Formulario ajusta ancho correctamente
- **Aceptación**: ✓ Breakpoint funcionaadecuadamente

#### T7.4: Comparar con Figma ⏱️ 20 min
- **Descripción**: Comparación visual detallada:
  - ✓ Colores: Naranja (#ff6b3d), Gris (#d7d9e6), Gradiente (#ff8a65 → #ef5226)
  - ✓ Tipografía: Inter, Bold/SemiBold/Medium/Regular
  - ✓ Border-radius: 12px (rounded-lg)
  - ✓ Espaciado: Padding, margin, gap
  - ✓ Estados: Default, error, focus, disabled, loading
- **Aceptación**: ✓ 95%+ fidelidad visual con Figma

---

### **FASE 8: Refinamiento Final**

#### T8.1: Linting y formateo ⏱️ 10 min
- **Descripción**: Ejecutar linters:
  - `npm run lint` (ESLint)
  - Verificar TypeScript: `npx tsc --noEmit`
  - Formato: `npm run format` (si existe)
- **Aceptación**: ✓ 0 errores de linting, TypeScript compila sin errores

#### T8.2: Revisar spec.md vs implementación ⏱️ 15 min
- **Descripción**: Verificar que la implementación cumple con spec.md:
  - ✓ FR-001: Layout responsivo ✓
  - ✓ FR-002: Campos correctos ✓
  - ✓ FR-003: Validaciones correctas ✓
  - ✓ FR-004: Mensajes de error correctos ✓
  - ✓ FR-005: Lógica botón correcta ✓
  - ✓ FR-006: Proceso envío correcto ✓
  - ✓ ... (revisar todos los FR)
  - ✓ SC-001 a SC-010: Todos los criterios de éxito
- **Aceptación**: ✓ 100% spec compliance

#### T8.3: Commit y preparar para PR ⏱️ 15 min
- **Descripción**: Git workflow:
  - `git status` → Verificar cambios
  - `git add app components lib` → Stagear archivos
  - `git commit -m "feat(registration-screen): implement user registration page with form validation, API Route, and responsive design"`
  - `git push origin feature/registro-henry-ilizarbe`
- **Bash**:
  ```bash
  git add app components lib
  git commit -m "feat(registration-screen): implement complete registration screen"
  git push
  ```
- **Aceptación**: ✓ Cambios commiteados y pushed

---

## 📊 Resumen de Tareas

| # | Fase | Tarea | Duración | Dependencias | Estado |
|---|------|-------|----------|--------------|--------|
| T1.1 | Prep | Revisar componentes | 15 min | - | ⏳ Pendiente |
| T1.2 | Prep | Estructura carpetas | 10 min | T1.1 | ⏳ Pendiente |
| T1.3 | Prep | Crear tipos | 15 min | T1.2 | ⏳ Pendiente |
| T1.4 | Prep | Crear mensajes | 10 min | T1.2 | ⏳ Pendiente |
| T2.1 | Val | emailValidator | 15 min | T1.3 | ⏳ Pendiente |
| T2.1.1 | Val | Tests email | 20 min | T2.1 | ⏳ Pendiente |
| T2.2 | Val | passwordValidator | 10 min | T1.3 | ⏳ Pendiente |
| T2.2.1 | Val | Tests password | 15 min | T2.2 | ⏳ Pendiente |
| T2.3 | Val | useRegistration | 40 min | T1.3, T2.1, T2.2 | ⏳ Pendiente |
| T2.3.1 | Val | Tests hook | 25 min | T2.3 | ⏳ Pendiente |
| T3.1 | UI | RegistrationForm | 50 min | T1.1, T1.3, T1.4, T2.3 | ⏳ Pendiente |
| T3.1.1 | UI | Tests component | 30 min | T3.1 | ⏳ Pendiente |
| T3.2 | UI | Página /register | 20 min | T1.1, T3.1 | ⏳ Pendiente |
| T4.1 | API | API Route | 30 min | T1.3 | ⏳ Pendiente |
| T4.2 | API | Testing API | 15 min | T4.1 | ⏳ Pendiente |
| T5.1 | Integ | Conectar API | 15 min | T2.3, T4.1 | ⏳ Pendiente |
| T5.2 | Integ | Redirección | 10 min | T2.3 | ⏳ Pendiente |
| T5.3 | Integ | Manejo errores | 15 min | T2.3 | ⏳ Pendiente |
| T6.1 | Test | Ejecutar tests | 20 min | T2.1.1, T2.2.1, T2.3.1, T3.1.1 | ⏳ Pendiente |
| T6.2 | Test | Flujo éxito | 15 min | T5.1 | ⏳ Pendiente |
| T6.3 | Test | Flujos error | 15 min | T5.1 | ⏳ Pendiente |
| T6.4 | Test | Botones social | 5 min | T3.1 | ⏳ Pendiente |
| T6.5 | Test | Link login | 5 min | T3.1 | ⏳ Pendiente |
| T7.1 | Design | Layout desktop | 15 min | T3.2 | ⏳ Pendiente |
| T7.2 | Design | Layout móvil | 15 min | T3.2 | ⏳ Pendiente |
| T7.3 | Design | Layout tablet | 10 min | T3.2 | ⏳ Pendiente |
| T7.4 | Design | Comparar Figma | 20 min | T7.1, T7.2, T7.3 | ⏳ Pendiente |
| T8.1 | Final | Linting | 10 min | Todos | ⏳ Pendiente |
| T8.2 | Final | Revisar spec | 15 min | Todos | ⏳ Pendiente |
| T8.3 | Final | Commit & Push | 15 min | T8.1, T8.2 | ⏳ Pendiente |

---

## ⏱️ Cronograma Estimado

- **Duración Total**: ~5 horas (300 minutos)
- **Fases Parallelizables**: T1.3 y T1.4 pueden hacerse en paralelo
- **Critical Path**: T1.1 → T1.2 → T1.3 → T2.3 → T3.1 → T5.1 → T6.1
- **Velocidad**: Aproximadamente 1 tarea cada 10 minutos en promedio

---

## 🚀 Próximos Pasos

1. ✅ Spec.md validado y ajustado
2. ✅ Plan.md creado
3. ✅ Tasks.md creado (este archivo)
4. **Siguiente**: Comenzar con Fase 1 - T1.1 (Revisar componentes existentes)

---

