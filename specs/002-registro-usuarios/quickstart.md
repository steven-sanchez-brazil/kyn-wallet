# Quickstart: Registro de Usuarios KynWallet

## Prerrequisitos
1. Node.js 18+ instalado.
2. Dependencias del proyecto instaladas desde la raíz:
   ```bash
   npm install
   ```

## Ejecutar en desarrollo
1. Iniciar entorno local:
   ```bash
   npm run dev
   ```
2. Abrir la aplicación en `http://localhost:3000`.
3. Navegar a la ruta de registro definida por la implementación de la feature.

## Escenarios de validación funcional
1. Completar formulario con datos válidos y aceptar términos.
2. Presionar `Crear cuenta`.
3. Verificar redirección a `/login` y visualización del mensaje de éxito.

4. Probar errores inline:
   - Correo inválido.
   - Contraseña con menos de 8 caracteres.
   - Confirmación distinta.
   - Campos vacíos.
   - Términos sin aceptar.
5. Confirmar que cada error aparece junto al campo correspondiente y bloquea envío.

6. Probar acciones secundarias:
   - Clic en `Google` y `Apple` muestra alerta `Próximamente`.
   - Link `¿Ya tienes cuenta? Inicia sesión` navega a `/login`.

## Validación responsive
1. Desktop: confirmar layout de dos paneles (branding + formulario).
2. Mobile: confirmar vista centrada en formulario sin panel de branding.

## Ejecutar pruebas
1. Ejecutar suite de tests:
   ```bash
   npm run test
   ```
2. Ejecutar modo watch durante desarrollo TDD:
   ```bash
   npm run test:watch
   ```

## Referencias
- Modelo de datos: [data-model.md](./data-model.md)
- Contrato de servicio: [contracts/registro-service.md](./contracts/registro-service.md)
- Especificación funcional: [spec.md](./spec.md)
