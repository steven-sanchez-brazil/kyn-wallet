# Data Model: Login

## Entities

### User
Representa a un usuario registrado en el sistema (simulado).

| Campo | Tipo | Validación | Descripción |
|-------|------|------------|-------------|
| `Email` | `string` | Regex (email) | Correo electrónico único. |
| `Password` | `string` | Min 8 chars | Contraseña de acceso. |

### DesignTokens
Mapa de valores visuales extraídos de Figma.

| Token | Valor Figma | Aplicación |
|-------|-------------|------------|
| `BrandPrimary` | `#ff6b3d` | Botón principal, acentos. |
| `Brand600` | `#ef5226` | Enlaces de acción (Regístrate, Olvidaste contraseña). |
| `BrandGradientStart` | `rgb(255, 138, 101)` | Fondo Brand Panel. |
| `BrandGradientEnd` | `rgb(239, 82, 38)` | Fondo Brand Panel. |
| `Neutral900` | `#16182c` | Títulos principales. |
| `Neutral700` | `#3d3f5c` | Labels de campos. |
| `Neutral500` | `#8a8ca8` | Textos secundarios, divisor. |
| `Neutral400` | `#a9abc2` | Placeholders de inputs. |
| `Neutral300` | `#d7d9e6` | Bordes y divisores. |
| `BorderRadiusXl` | `22px` | Card Mockup. |
| `BorderRadiusLg` | `12px` | Inputs y botones. |
| `BorderRadiusMd` | `6px` | Checkbox. |
| `InputHeight` | `52px` | Altura de inputs. |
| `SocialButtonHeight` | `48px` | Altura de botones sociales. |
| `BrandPanelPaddingX` | `56px` | Padding horizontal Brand Panel. |
| `BrandPanelPaddingY` | `64px` | Padding vertical Brand Panel. |

### PasswordVisibility (State)
Estado local del campo de contraseña.

| Campo | Tipo | Descripción |
|-------|------|-------------|
| `IsVisible` | `boolean` | Indica si la contraseña se muestra en texto claro. |

## Relationships
- Un `User` intenta autenticarse mediante el `LoginForm`.
- `LoginForm` aplica los `DesignTokens` para su representación visual.
- El campo de contraseña gestiona `PasswordVisibility` internamente.
- El footer del formulario enlaza a la pantalla de registro (`/register`).
