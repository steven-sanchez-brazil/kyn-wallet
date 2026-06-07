# Implementation Plan: Registro de Usuarios KynWallet

**Branch**: 002-registro-usuarios  
**Date**: 2026-06-06  
**Spec**: [specs/002-registro-usuarios/spec.md](spec.md)  
**Constitution**: [.specify/memory/constitution.md](../../.specify/memory/constitution.md)

## Resumen Técnico
Implementar el flujo de registro con validación cliente y servidor, endpoint mock y redirección a /login?registered=true, manteniendo la arquitectura actual del repositorio (app, components, lib) y respetando TDD, SOLID, Clean Architecture y prohibición de dependencias externas nuevas.

## 1. Estructura de Archivos
### 1.1 Archivos a crear (exactamente)
- app/register/page.tsx
- app/login/page.tsx
- app/api/register/route.ts
- app/api/register/route.test.ts
- components/RegistrationForm.tsx
- components/RegistrationForm.test.tsx
- lib/types/Registration.ts
- lib/utils/RegistrationValidation.ts
- lib/utils/RegistrationValidation.test.ts
- lib/services/RegistrationService.ts
- lib/services/RegistrationService.test.ts
- app/register.test.tsx

### 1.2 Archivos a modificar
- app/page.tsx
- components/LoginForm.tsx

### 1.3 Objetivo de cada archivo
- app/register/page.tsx: página de registro (UI principal con panel izquierdo + formulario).
- app/login/page.tsx: ruta canónica de login para cumplir FR-006 y FR-007.
- app/api/register/route.ts: endpoint mock POST con validación de servidor y contrato JSON.
- app/api/register/route.test.ts: pruebas del contrato API (201/400).
- components/RegistrationForm.tsx: formulario, validaciones inline y submit.
- components/RegistrationForm.test.tsx: pruebas de comportamiento de UI y reglas de validación.
- lib/types/Registration.ts: tipos de dominio y contratos API.
- lib/utils/RegistrationValidation.ts: validaciones puras reutilizables cliente/servidor.
- lib/utils/RegistrationValidation.test.ts: pruebas unitarias de funciones puras.
- lib/services/RegistrationService.ts: adaptador cliente para llamar al endpoint mock.
- lib/services/RegistrationService.test.ts: pruebas de servicio (éxito, errores, timeout).
- app/register.test.tsx: prueba de integración de página/flujo completo.
- app/page.tsx: redirección de / a /login para mantener coherencia de rutas.
- components/LoginForm.tsx: lectura de query param registered=true y banner de éxito.

## 2. Modelo de Datos
Definiciones propuestas en lib/types/Registration.ts:

```ts
export interface RegistrationFormData {
  FullName: string;
  Email: string;
  Password: string;
  ConfirmPassword: string;
  AcceptTerms: boolean;
}

export interface RegistrationValidationErrors {
  FullName?: string;
  Email?: string;
  Password?: string;
  ConfirmPassword?: string;
  AcceptTerms?: string;
  General?: string;
}

export interface RegistrationSuccessResponse {
  success: true;
  message: string;
  data: {
    userId: string;
    email: string;
    redirectTo: '/login?registered=true';
  };
}

export interface RegistrationErrorResponse {
  success: false;
  message: string;
  errors?: RegistrationValidationErrors;
  code:
    | 'VALIDATION_ERROR'
    | 'EMAIL_ALREADY_REGISTERED'
    | 'REQUEST_TIMEOUT'
    | 'UNEXPECTED_ERROR';
}

export type RegistrationApiResponse =
  | RegistrationSuccessResponse
  | RegistrationErrorResponse;
```

Reglas de normalización:
- Email normalizado con trim + lowercase para validación y chequeo de duplicados.
- No persistir Password ni ConfirmPassword fuera del request actual.

## 3. Lógica de Negocio
### 3.1 Validaciones (cliente y servidor)
Fuente única: lib/utils/RegistrationValidation.ts.

Funciones planificadas:
- NormalizeEmail(email: string): string
- ValidateRequiredFields(data: RegistrationFormData): RegistrationValidationErrors
- ValidateEmailFormat(email: string): boolean
- ValidatePasswordLength(password: string): boolean
- ValidatePasswordMatch(password: string, confirmPassword: string): boolean
- ValidateTermsAccepted(acceptTerms: boolean): boolean
- ValidateRegistrationData(data: RegistrationFormData): RegistrationValidationErrors

Reglas aplicadas:
- Email inválido -> "Correo electrónico inválido".
- Password < 8 -> "La contraseña debe tener al menos 8 caracteres".
- Contraseñas distintas -> "Las contraseñas no coinciden".
- Campo vacío -> mensaje por campo.
- Términos false -> "Debes aceptar los términos y condiciones".

### 3.2 Flujo de registro
1. Usuario abre app/register/page.tsx.
2. components/RegistrationForm.tsx muestra formulario y aplica validación inline en onChange.
3. Al submit:
   - Ejecuta ValidateRegistrationData en cliente.
   - Si hay errores, no envía y renderiza errores por campo.
4. Si cliente válido, llama lib/services/RegistrationService.ts.
5. RegistrationService envía POST a /api/register.
6. route.ts vuelve a validar (paridad cliente/servidor).
7. route.ts normaliza email y verifica duplicado case-insensitive.
8. Respuesta:
   - 201 success -> RegistrationForm redirige con router.push('/login?registered=true').
   - 400 error -> muestra mensaje inline/general según errors.
9. En components/LoginForm.tsx, si detecta registered=true, muestra banner de éxito.

### 3.3 Manejo de edge cases
- Email ya registrado: respuesta 400 code EMAIL_ALREADY_REGISTERED y mensaje "Este correo ya está registrado".
- Baja conectividad/timeout: RegistrationService usa AbortController y retorna error controlado REQUEST_TIMEOUT.
- Click en Google/Apple: alert("Próximamente").

## 4. Estrategia de Pruebas (Vitest, cobertura >=80%)
### 4.1 Enfoque TDD
Orden de implementación:
1. Tests de utilidades de validación.
2. Tests de endpoint API.
3. Tests de servicio.
4. Tests de formulario UI.
5. Test de integración de página.
6. Implementación mínima para pasar cada bloque (Red -> Green -> Refactor).

### 4.2 Suites y escenarios críticos
- lib/utils/RegistrationValidation.test.ts
  - email válido/inválido
  - password >=8 y <8
  - mismatch de contraseñas
  - campos vacíos
  - terms no aceptados
  - normalización trim + lowercase

- app/api/register/route.test.ts
  - POST válido -> 201
  - errores de validación -> 400 VALIDATION_ERROR
  - email existente -> 400 EMAIL_ALREADY_REGISTERED

- lib/services/RegistrationService.test.ts
  - parse de respuesta 201
  - mapeo de error 400
  - timeout REQUEST_TIMEOUT

- components/RegistrationForm.test.tsx
  - validación inline por campo
  - bloqueo de submit con errores
  - submit exitoso redirige a /login?registered=true
  - clicks Google/Apple muestran "Próximamente"

- app/register.test.tsx
  - render de layout desktop (panel izquierdo + formulario)
  - comportamiento mobile (panel izquierdo oculto)

### 4.3 Meta de cobertura
- Objetivo mínimo global: >=80% líneas y ramas del módulo de registro.
- Umbral por archivo crítico: RegistrationValidation.ts, route.ts y RegistrationForm.tsx >=80%.

## 5. Contrato de API Mock
Endpoint: POST /api/register
Content-Type: application/json

Request JSON:
```json
{
  "fullName": "Diego Martinez",
  "email": "diego@ejemplo.com",
  "password": "12345678",
  "confirmPassword": "12345678",
  "acceptTerms": true
}
```

Respuesta 201 (éxito):
```json
{
  "success": true,
  "message": "Registro exitoso",
  "data": {
    "userId": "usr_001",
    "email": "diego@ejemplo.com",
    "redirectTo": "/login?registered=true"
  }
}
```

Respuesta 400 (error de validación):
```json
{
  "success": false,
  "message": "Error de validación",
  "code": "VALIDATION_ERROR",
  "errors": {
    "email": "Correo electrónico inválido",
    "password": "La contraseña debe tener al menos 8 caracteres",
    "confirmPassword": "Las contraseñas no coinciden",
    "acceptTerms": "Debes aceptar los términos y condiciones"
  }
}
```

Respuesta 400 (email duplicado):
```json
{
  "success": false,
  "message": "Este correo ya está registrado",
  "code": "EMAIL_ALREADY_REGISTERED"
}
```

## 6. Trazabilidad Requisito por Requisito
- FR-001, AC-001 -> RegistrationForm.tsx + RegistrationValidation.ts + RegistrationForm.test.tsx.
- FR-002, AC-002, AC-003 -> ValidateEmailFormat y ValidatePasswordLength en cliente/servidor + tests unitarios y API.
- FR-003, AC-004 -> ValidateRequiredFields + ValidatePasswordMatch + errores por campo en UI.
- FR-004, AC-005 -> ValidateTermsAccepted + bloqueo submit + error inline.
- FR-005, AC-006 -> Botones sociales en RegistrationForm con alert("Próximamente").
- FR-006, AC-007 -> Link en RegistrationForm hacia /login.
- FR-007, AC-008 -> route.ts retorna redirectTo y formulario redirige a /login?registered=true.
- FR-008, AC-009 -> validación en tiempo real mediante estado de errores y actualización por campo.

## 7. Trazabilidad a la Constitución
- TDD: tests definidos antes de implementación (sección 4.1).
- SOLID y Clean Architecture: separación UI (components), reglas (lib/utils), servicio (lib/services), adapter HTTP (app/api).
- DRY/YAGNI: validación centralizada y reutilizable; alcance limitado a registro sin OTP/OAuth real.
- PascalCase: nombres de componentes, tipos y utilidades en PascalCase.
- Sin dependencias nuevas: regex y utilidades nativas.
- Seguridad/Validación: validación estricta en cliente y servidor; sin almacenamiento sensible en localStorage.
