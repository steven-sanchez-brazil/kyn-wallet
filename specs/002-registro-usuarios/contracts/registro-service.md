# Contract: RegistroService

## Definition
Servicio de aplicación responsable de validar y procesar el registro de usuarios para la pantalla de sign-up.

## Interface
```typescript
interface RegistroService {
  /**
   * Valida y procesa una solicitud de registro.
   * @param payload Datos del formulario de registro.
   * @returns Resultado del proceso con estado y navegación sugerida.
   */
  registrar(payload: RegistroUsuario): Promise<ResultadoRegistro>;

  /**
   * Valida los datos del formulario y devuelve errores por campo.
   * @param payload Datos del formulario de registro.
   * @returns Mapa de errores para mostrar validaciones inline.
   */
  validar(payload: RegistroUsuario): Record<string, EstadoValidacionCampo>;
}
```

## Behavioral Rules
- Debe rechazar cualquier envío con campos obligatorios vacíos.
- Debe rechazar correos con formato inválido.
- Debe rechazar contraseñas menores a 8 caracteres.
- Debe rechazar confirmación de contraseña distinta.
- Debe rechazar envíos sin aceptación de términos.
- En éxito, debe responder `Exitoso = true` y `RutaDestino = "/login"` con mensaje de confirmación.

## UI Interaction Contract
- Botón `Crear cuenta`: invoca `validar` y solo llama `registrar` si no existen errores.
- Botones `Google` y `Apple`: no invocan servicio; muestran alerta `"Próximamente"`.
- Link `¿Ya tienes cuenta? Inicia sesión`: navega directamente a `/login`.
