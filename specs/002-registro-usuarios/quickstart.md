# Quickstart: Registro de Usuarios

## Prerequisitos
1. Node.js 18+.
2. Dependencias instaladas en la raiz del proyecto.

## Setup
```bash
npm install
```

## Ejecutar aplicacion
```bash
npm run dev
```

## Escenarios de validacion (manual)
1. Abrir la ruta de registro (`/register`).
2. Verificar en desktop layout de dos paneles y en mobile solo formulario.
3. Intentar enviar vacio: deben aparecer errores inline en todos los campos obligatorios.
4. Ingresar correo invalido, password corta o confirmacion distinta: validar mensajes inline especificos.
5. Ingresar un correo ya existente: debe mostrarse error inline en correo y permanecer en `/register`.
6. Marcar terminos y completar datos validos: al enviar, el boton "Crear cuenta" debe deshabilitarse y mostrar estado de carga hasta la respuesta.
7. Simular fallo tecnico/transitorio de registro: debe mostrarse "No pudimos crear tu cuenta. Intenta nuevamente." y permanecer en `/register`.
8. Completar datos validos con respuesta exitosa: debe redirigir a `/login` con mensaje de exito.
9. Presionar botones Google y Apple: debe mostrarse alerta "Proximamente".
10. Presionar enlace "¿Ya tienes cuenta? Inicia sesion": debe navegar a `/login`.

## Ejecutar pruebas
```bash
npm run test
```

## Referencias
- Modelo de datos: [data-model.md](./data-model.md)
- Contrato de servicio: [contracts/register-service.md](./contracts/register-service.md)
- Especificacion funcional: [spec.md](./spec.md)
