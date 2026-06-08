# Quickstart: Login Feature

## Setup
1. Asegúrate de tener **Node.js 18+** instalado.
2. Clona el repositorio y navega a la raíz.
3. Instala las dependencias base (Next.js, Tailwind, Vitest):
   ```bash
   npm install
   ```

## Development
- Inicia el servidor de desarrollo:
  ```bash
  npm run dev
  ```
- La pantalla de login estará disponible en `/login`.
- Credenciales de prueba: `tucorreo@ejemplo.com` / `password123`.

## Validation Scenarios

### 1. Login exitoso
1. Navega a `http://localhost:3000/login`
2. Ingresa `tucorreo@ejemplo.com` en el campo de correo
3. Ingresa `password123` en el campo de contraseña
4. Haz clic en "Iniciar sesión"
5. **Esperado**: Redirección a `/construction`

### 2. Toggle de visibilidad de contraseña (FR-009)
1. Ingresa texto en el campo de contraseña
2. Haz clic en el ícono de ojo
3. **Esperado**: El texto se muestra en claro (type="text")
4. Haz clic nuevamente
5. **Esperado**: El texto se oculta (type="password")

### 3. Navegación a registro (FR-010)
1. Haz clic en "Regístrate" en el footer del formulario
2. **Esperado**: Navegación a `/register`

### 4. Validación de campos
1. Deja los campos vacíos y haz clic en "Iniciar sesión"
2. **Esperado**: Mensajes de error de validación visibles
3. Ingresa un email sin formato válido
4. **Esperado**: Error de formato de email

## Testing
- Ejecuta los tests unitarios y de integración con Vitest:
  ```bash
  npm run test
  ```
- Para modo watch:
  ```bash
  npm run test:watch
  ```

## UI Guidelines
- Usa los componentes definidos en `components/ui/` para mantener la consistencia con los tokens de Figma.
- Todas las estructuras de datos y clases deben seguir el estándar `PascalCase`.
- Los inputs deben medir 52px de alto y los botones sociales 48px (FR-013).
- Los enlaces de acción usan `#ef5226` (Brand/600), no el brand primario `#ff6b3d`.
