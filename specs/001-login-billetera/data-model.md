# Data Model: User Persistence

## Entity: User

Stored in `data/users.json` as an array of objects.

| Attribute | Type   | Description |
|-----------|--------|-------------|
| Nombre    | string | Full name of the user. |
| Email     | string | Unique identifier for login. |
| Password  | string | User password (plain text for this prototype). |

## Persistence Mechanism

- **Storage**: JSON file on disk.
- **Access**: Server-side only via Next.js API Routes (`fs` module).
- **Session**: Partial persistence via `localStorage` (storing `Nombre` and `Email` only).

## Example structure

```json
[
  {
    "Nombre": "Diego Martínez",
    "Email": "tucorreo@ejemplo.com",
    "Password": "password123"
  }
]
```
