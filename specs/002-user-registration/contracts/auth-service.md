# Contract: Dynamic AuthService Extensions

To support registration, the pre-existing authentication service contract must be expanded.

## Current Contract Interface (`lib/services/AuthService.ts`)

```typescript
export interface IAuthService {
  login(credentials: AuthCredentials): Promise<boolean>;
  isAuthenticated(): boolean;
}
```

## Proposed Extended Contract Interface (`lib/services/AuthService.ts`)

```typescript
import { AuthCredentials, User, UserRegistrationDTO } from '../types/Auth';

export interface IAuthService {
  login(credentials: AuthCredentials): Promise<boolean>;
  register(newUser: UserRegistrationDTO): Promise<boolean>;
  isAuthenticated(): boolean;
  clearRegisteredUsers(): void; // Added strictly as a utility for testing and clean teardown
}
```

### New Model Addition (`lib/types/Auth.ts`)

```typescript
export interface UserRegistrationDTO {
  FullName: string;
  Email: string;
  Password: string;
}
```

---

## Behavior Specifications

### `register(newUser: UserRegistrationDTO): Promise<boolean>`
1. **Uniqueness Check**: Looks up if `newUser.Email` already exists in `MOCK_USERS` or in the registered users stored in browser storage (`localStorage`).
2. **Persistence**:
   - If unique, serialized user data is appended to `localStorage` under key `kyn_wallet_registered_users`.
   - Returns a `Promise<boolean>` resolving to `true` after a simulated latency of 500ms (matching the backend lag simulation pattern in `login`).
   - If not unique (already registered), resolves or rejects indicating email is already registered.

### `login(credentials: AuthCredentials): Promise<boolean>`
1. **Extended Lookup Pattern**:
   - Checks `MOCK_USERS` array.
   - If not found, attempts to read, parse, and find matching email / password within the `localStorage` list.
   - Sets the state of `currentUser` if found.
