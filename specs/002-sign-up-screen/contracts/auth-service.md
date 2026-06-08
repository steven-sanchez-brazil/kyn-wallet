# Interface Contract: IAuthService (Sign-Up / Register)

This contract defines the public programmatic interface of the `AuthService` in-memory module.

## 1. Type Definitions

```typescript
export interface User {
  Name: string;
  Email: string;
  Password: string;
}

export interface RegisterCredentials {
  Name: string;
  Email: string;
  Password: string;
}
```

## 2. Service Interface `IAuthService`

```typescript
export interface IAuthService {
  /**
   * Registers a new user inside the simulated in-memory store.
   * 
   * @param credentials The user details to register.
   * @returns A promise that resolves to true if successful.
   * @throws An Error if the email is already registered in the system.
   */
  register(credentials: RegisterCredentials): Promise<boolean>;

  /**
   * Checks if there is a currently logged-in user in the system context.
   * 
   * @returns true if authenticated, false otherwise.
   */
  isAuthenticated(): boolean;

  /**
   * Retrieves all registered mock users for testing or initial state seeding.
   * 
   * @returns Array of User objects.
   */
  getMockUsers(): User[];
}
```

## 3. Register Behavior & Error Contracts

* **Input Pre-conditions**:
  * `credentials.Name` must be non-empty and at least 3 characters after trimming.
  * `credentials.Email` must conform to the standard email format regex pattern.
  * `credentials.Password` must be at least 8 characters long.
* **Success Scenario**:
  * A new `User` object is appended to the internal `MOCK_USERS` list.
  * The registered user becomes the currently authenticated user (`currentUser`).
  * The method resolves to `true`.
* **Error Scenario (Conflict)**:
  * If a user with the same email (case-insensitive check) exists in `MOCK_USERS`:
    * The method throws an Error with the message: `"Este correo electrónico ya se encuentra registrado"`.
