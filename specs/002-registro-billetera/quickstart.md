# Quickstart: Registro de Billetera Virtual

**Feature**: 002-registro-billetera  
**Date**: 2026-06-08

## Prerequisites

- Node.js 18+ instalado
- Dependencias del proyecto instaladas (`npm install`)
- Servidor de desarrollo disponible (`npm run dev`)

## Validation Scenarios

### Scenario 1: Registro exitoso (Happy Path)

**Setup**: Servidor en ejecución

```bash
npm run dev
```

**Steps**:
1. Navegar a `http://localhost:3000/register`
2. Completar "Nombre completo": `Juan Pérez`
3. Completar "Correo electrónico": `juan@ejemplo.com`
4. Completar "Contraseña": `password123`
5. Completar "Confirmar contraseña": `password123`
6. Marcar checkbox "Acepto los términos y condiciones"
7. Clic en "Crear cuenta"

**Expected Outcome**:
- Redirección a `/login?registered=true`
- Banner de éxito visible en la página de login

---

### Scenario 2: Validaciones inline (on blur)

**Steps**:
1. Navegar a `/register`
2. Hacer clic en campo "Correo", escribir `invalido`, hacer clic fuera
3. Hacer clic en campo "Contraseña", escribir `123`, hacer clic fuera
4. Hacer clic en campo "Confirmar contraseña", escribir `diferente`, hacer clic fuera

**Expected Outcome**:
- Error debajo de correo: "Formato de correo inválido"
- Error debajo de contraseña: "La contraseña debe tener al menos 8 caracteres"
- Error debajo de confirmar: "Las contraseñas no coinciden"

---

### Scenario 3: Envío con campos vacíos

**Steps**:
1. Navegar a `/register`
2. Clic directo en "Crear cuenta" sin completar ningún campo

**Expected Outcome**:
- Error en cada campo indicando que es obligatorio
- No se produce redirección

---

### Scenario 4: Botones sociales

**Steps**:
1. Navegar a `/register`
2. Clic en botón "Google"
3. Clic en botón "Apple"

**Expected Outcome**:
- Alert con mensaje "Próximamente" en ambos casos (texto puede variar: "Google estará disponible próximamente." / "Apple estará disponible próximamente.")

---

### Scenario 5: Link a login

**Steps**:
1. Navegar a `/register`
2. Clic en "¿Ya tienes cuenta? Inicia sesión"

**Expected Outcome**:
- Navegación a `/login`

---

### Scenario 6: Responsive layout

**Steps**:
1. Navegar a `/register` en viewport >= 1024px
2. Reducir viewport a < 1024px (mobile)

**Expected Outcome**:
- Desktop: 2 paneles visibles (BrandPanel a la izquierda, formulario a la derecha)
- Mobile: Solo formulario visible, BrandPanel oculto

---

## Running Tests

```bash
# Ejecutar todos los tests
npm test

# Ejecutar tests específicos del registro
npx vitest run --reporter=verbose RegisterForm RegisterService Validation
```

**Expected**: Todos los tests pasan (verde).
