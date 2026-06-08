# Contrato de Servicio: AuthService (Extensión para Registro)

**Feature Branch**: `feature/002-registro-usuarios`  
**Generado**: 2026-06-08  
**Archivo**: `lib/services/AuthService.ts`

---

## Descripción

Este documento define el contrato de la extensión del `AuthService` para soportar el registro de usuarios. El servicio existente ya expone `login()` e `isAuthenticated()`; se agrega el método `register()`.

---

## Interfaz Actualizada

```typescript
// lib/services/AuthService.ts

export interface IAuthService {
  login(credentials: AuthCredentials): Promise<boolean>;
  register(credentials: RegisterCredentials): Promise<RegisterResult>;
  isAuthenticated(): boolean;
}
```

---

## Contrato de `register()`

### Firma
```typescript
register(credentials: RegisterCredentials): Promise<RegisterResult>
```

### Entradas

| Parámetro | Tipo | Reglas |
|-----------|------|--------|
| `credentials.FullName` | `string` | No vacío; mínimo 2 palabras |
| `credentials.Email` | `string` | Formato email válido; único en el sistema |
| `credentials.Password` | `string` | Mínimo 8 caracteres |
| `credentials.ConfirmPassword` | `string` | Debe ser idéntico a `Password` |

> **Nota**: El servicio asume que las validaciones de formato ya fueron ejecutadas en el cliente. `register()` solo verifica la unicidad del correo electrónico.

### Salidas

| Escenario | `RegisterResult` |
|-----------|-----------------|
| Registro exitoso | `{ success: true }` |
| Email ya registrado | `{ success: false, error: 'EMAIL_TAKEN' }` |
| Error inesperado | `{ success: false, error: 'UNKNOWN' }` |

### Comportamiento

1. Verifica si el `Email` ya existe en `MOCK_USERS` (seed) + usuarios de `localStorage`.
2. Si existe → retorna `{ success: false, error: 'EMAIL_TAKEN' }`.
3. Si no existe → crea un objeto `User` con `{ FullName, Email, Password }`.
4. Persiste el nuevo usuario en `localStorage` bajo la clave `kynwallet_users`.
5. Actualiza el array en memoria para que `login()` pueda autenticar al usuario en la misma sesión.
6. Retorna `{ success: true }`.

### Pseudocódigo

```
function register(credentials):
  allUsers = MOCK_USERS + loadFromLocalStorage()
  if allUsers.find(u => u.Email == credentials.Email):
    return { success: false, error: 'EMAIL_TAKEN' }
  
  newUser = { FullName: credentials.FullName, Email: credentials.Email, Password: credentials.Password }
  
  registeredUsers = loadFromLocalStorage()
  registeredUsers.push(newUser)
  saveToLocalStorage(registeredUsers)
  
  dynamicUsers.push(newUser)   // array en memoria para la sesión actual
  
  return { success: true }
```

---

## Contrato de Almacenamiento (localStorage)

| Clave | Tipo | Descripción |
|-------|------|-------------|
| `kynwallet_users` | `User[]` JSON serializado | Array de usuarios registrados dinámicamente. Los usuarios seed (`MOCK_USERS`) NO se incluyen aquí. |

**Invariante**: Los usuarios del array `MOCK_USERS` nunca se modifican ni eliminan. Son inmutables.

---

## Contrato de `login()` (sin cambios de firma, comportamiento extendido)

El método `login()` ya existente se actualiza para también buscar en los usuarios registrados dinámicamente:

```
allUsers = MOCK_USERS + dynamicUsers (loaded from localStorage on init)
user = allUsers.find(u => u.Email == credentials.Email && u.Password == credentials.Password)
```

---

## Errores Manejados en la UI

| Código de error | Mensaje en UI | Campo afectado |
|-----------------|---------------|----------------|
| `EMAIL_TAKEN` | "Este correo ya está registrado. ¿Ya tienes cuenta?" | Campo `emailError` de `RegisterForm` |
| `UNKNOWN` | "Ocurrió un error inesperado. Intenta de nuevo." | `submitError` general de `RegisterForm` |

---

## Validaciones del Cliente (lib/utils/Validation.ts)

Las siguientes funciones deben existir antes de que `register()` sea invocado:

```typescript
validateFullName(name: string): boolean
// Retorna true si: name.trim().split(/\s+/).length >= 2

validateEmail(email: string): boolean
// Existente — sin cambios

validatePassword(password: string): boolean
// Existente — sin cambios

validatePasswordMatch(password: string, confirm: string): boolean
// Retorna true si: password === confirm
```
