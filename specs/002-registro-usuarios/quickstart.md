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
5. Marcar terminos y completar datos validos: al enviar debe redirigir a `/login` con mensaje de exito.
6. Presionar botones Google y Apple: debe mostrarse alerta "Proximamente".
7. Presionar enlace "¿Ya tienes cuenta? Inicia sesion": debe navegar a `/login`.

## Ejecutar pruebas
```bash
npm run test
```

## Referencias
- Modelo de datos: [data-model.md](./data-model.md)
- Contrato de servicio: [contracts/register-service.md](./contracts/register-service.md)
- Especificacion funcional: [spec.md](./spec.md)
