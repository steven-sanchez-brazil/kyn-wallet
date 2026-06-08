# Contract: RegistrationService

## Definición
Servicio de dominio encargado del registro simulado de nuevos usuarios en KynWallet. Sigue el patrón exacto de `AuthService.ts`.

---

## Interfaz

```typescript
// lib/types/Registration.ts

export interface RegistrationData {
  FullName: string;
  Email: string;
  Password: string;
  ConfirmPassword: string;
  AcceptsTerms: boolean;
}

export interface IRegistrationService {
  /**
   * Registra un nuevo usuario con los datos proporcionados.
   * @param data - DTO con los campos del formulario ya validados en cliente.
   * @returns Promise<boolean> — true si el registro fue exitoso, false si falló.
   */
  register(data: RegistrationData): Promise<boolean>;
}
```

---

## Implementación Mock

```typescript
// lib/services/RegistrationService.ts

import { RegistrationData, IRegistrationService } from '../types/Registration';

export const RegistrationService: IRegistrationService = {
  async register(data: RegistrationData): Promise<boolean> {
    // Simula delay de red (500ms — consistente con AuthService)
    await new Promise((resolve) => setTimeout(resolve, 500));

    // Mock: cualquier envío con datos válidos tiene éxito
    // (validaciones de formato ya fueron ejecutadas en el cliente)
    return data.AcceptsTerms && data.Email.length > 0 && data.FullName.length > 0;
  },
};
```

---

## Constraints

- **Sin persistencia real**: No escribe en localStorage, sessionStorage ni hace llamadas HTTP.
- **Sin estado global**: El resultado del registro no modifica ninguna variable de módulo (a diferencia de `AuthService` que usa `currentUser`).
- **Validación previa**: El servicio asume que los datos recibidos ya pasaron validación del cliente. No re-valida formatos.
- **Respuesta booleana**: Retorna `true` para registros mock exitosos, `false` para simular fallos del servidor.
- **Delay simulado**: 500ms para representar latencia de red y permitir tests del estado de carga.

---

## Comportamiento esperado por escenario

| Escenario | Input | Output |
|-----------|-------|--------|
| Registro exitoso (campos válidos, terms = true) | `{ FullName: "Ana García", Email: "ana@test.com", Password: "pass1234", ConfirmPassword: "pass1234", AcceptsTerms: true }` | `true` |
| Terms no aceptados (no debería llegar aquí — bloqueado en cliente) | `{ ..., AcceptsTerms: false }` | `false` |
| Email vacío (no debería llegar aquí — bloqueado en cliente) | `{ ..., Email: "" }` | `false` |

---

## Uso en RegisterForm

```typescript
// En RegisterForm.tsx (fragmento)
import { RegistrationService } from '../lib/services/RegistrationService';

const success = await RegistrationService.register({
  FullName: fullName,
  Email: email,
  Password: password,
  ConfirmPassword: confirmPassword,
  AcceptsTerms: acceptsTerms,
});

if (success) {
  router.push('/login?registered=true');
} else {
  setSubmitError('Ocurrió un error al crear la cuenta. Intenta de nuevo.');
}
```

---

## Mockeo en Tests

```typescript
// En RegisterForm.test.tsx o register.test.tsx
vi.mock('../lib/services/RegistrationService', () => ({
  RegistrationService: {
    register: vi.fn().mockResolvedValue(true),
  },
}));
```
