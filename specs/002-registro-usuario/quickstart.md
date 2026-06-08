# Inicio Rápido: Feature de Registro de Usuario

**Feature**: `002-registro-usuario` | **Branch**: `registro-leonardo-tagliabue`
**Fecha**: 2026-06-05

## Prerrequisitos

- Node.js 18+
- Dependencias instaladas: `npm install`
- Branch activa: `registro-leonardo-tagliabue`

## Ejecutar la aplicación

```bash
npm run dev
# Abrir http://localhost:3000
```

Desde la pantalla de Login, hacer clic en **"Registrate"** para acceder a la pantalla de Registro.

## Ejecutar tests

```bash
# Todos los tests (una sola vez)
npm run test

# Modo watch (desarrollo)
npm run test:watch
```

## Archivos clave del feature

| Archivo | Rol |
|---------|-----|
| `app/registro/page.tsx` | Página de Registro (nueva ruta `/registro`) |
| `components/RegistroForm.tsx` | Formulario de registro con validaciones |
| `components/RegistroForm.test.tsx` | Tests del formulario (TDD) |
| `components/LoginForm.tsx` | Modificado: enlace "¿No tiene cuenta? Registrate" |
| `lib/types/Auth.ts` | Modificado: `NuevoUsuario`, `ResultadoRegistro` |
| `lib/services/AuthService.ts` | Modificado: método `register()` |
| `lib/utils/Validation.ts` | Modificado: `validatePasswordMatch()`, `validateFullName()` |
| `registro_screen.png` | Modelo gráfico de referencia visual (en raíz del proyecto) |

## Flujo de desarrollo (TDD)

1. **Escribir el test que falla** (Rojo)
2. **Implementar lo mínimo** para que pase (Verde)
3. **Refactorizar** sin romper tests

Orden sugerido:

```
1. lib/utils/Validation.test.ts    → validatePasswordMatch, validateFullName
2. lib/utils/Validation.ts         → implementación
3. lib/services/AuthService.test.ts → register()
4. lib/services/AuthService.ts     → implementación
5. components/RegistroForm.test.tsx → renderizado y validaciones UI
6. components/RegistroForm.tsx      → implementación
7. app/registro/page.tsx            → composición final
8. components/LoginForm.test.tsx    → enlace "Registrate"
9. components/LoginForm.tsx         → agregar enlace
```

## Referencia visual

Consultar `registro_screen.png` (raíz del proyecto) para verificar colores, espaciados y disposición de elementos.

Tokens de diseño reutilizados (definidos en `lib/constants/DesignTokens.ts`):

| Token | Valor | Uso |
|-------|-------|-----|
| `brand` | `#ff6b3d` | Botón primario, degradado Brand Panel |
| `neutral900` | `#16182c` | Títulos y encabezados |
| `neutral500` | `#8a8ca8` | Textos secundarios y labels |
| `border` | `#d7d9e6` | Bordes de inputs y botones sociales |
| `borderRadius` | `12px` | Inputs y botón principal |

## Credenciales de prueba

Para testear el flujo de **login** (usuario existente):
- Email: `tucorreo@ejemplo.com`
- Contraseña: `password123`

Para testear el flujo de **registro** (usuario nuevo):
- Usar cualquier email diferente al existente
- Contraseña: mínimo 8 caracteres
- Tras el registro exitoso → redirige a `/construction`
