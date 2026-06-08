# Quickstart: Registro de Cuenta para KynWallet

## Setup
1. Asegúrate de tener **Node.js 18+** instalado.
2. Instala las dependencias desde la raíz del proyecto:
   ```bash
   npm install
   ```

## Development
- Inicia el servidor de desarrollo:
  ```bash
  npm run dev
  ```
- Abre la pantalla de registro en la ruta definida por la implementación, prevista como `/registro`.

## Validation Scenarios
- Completa el formulario con datos válidos y verifica que la cuenta se crea y el flujo continúa al siguiente paso.
- Ingresa un correo inválido o deja campos obligatorios vacíos y verifica que aparezcan mensajes de error específicos.
- Escribe dos contraseñas distintas y confirma que el formulario bloquea el envío hasta corregirlas.
- Comprueba que la pantalla mantiene la estructura visual y los tokens de diseño de KynWallet en escritorio y móvil.

## Testing
- Ejecuta los tests unitarios e integración:
  ```bash
  npm run test
  ```
- Si necesitas iterar sobre la UI y la lógica, usa el modo watch:
  ```bash
  npm run test:watch
  ```

## UI Guidelines
- Reutiliza los componentes en `components/ui/` y la lógica de validación en `lib/`.
- Mantén `PascalCase` en estructuras relevantes y conserva los tokens visuales existentes.