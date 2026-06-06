# Quickstart: Validacion de Registro

## Prerrequisitos

1. Node.js 18 o superior.
2. Dependencias instaladas en el repositorio.

## Setup

```bash
npm install
```

## Ejecutar aplicacion

```bash
npm run dev
```

Abrir en navegador:
- Registro: `http://localhost:3000/register` (o la ruta de registro definida en implementacion).
- Login: `http://localhost:3000/login` (o ruta de login vigente).

## Escenarios de validacion manual (E2E funcional)

1. Registro exitoso
- Completar Nombre completo, Correo electronico valido, Contrasena (>=8), Confirmar contrasena igual, aceptar terminos.
- Presionar "Crear cuenta".
- Resultado esperado: redireccion a `/login` y mensaje de exito visible.

2. Validaciones inline por campo
- Intentar enviar con formulario vacio.
- Resultado esperado: errores inline en todos los campos obligatorios y terminos.

3. Email invalido
- Ingresar correo sin formato valido y enviar.
- Resultado esperado: error inline en correo y submit bloqueado.

4. Contrasena invalida / no coincide
- Ingresar contrasena menor a 8 o confirmacion distinta.
- Resultado esperado: error inline correspondiente y submit bloqueado.

5. Social login informativo
- Pulsar Google y Apple.
- Resultado esperado: alert con texto `Proximamente`.

6. Responsive
- Desktop: verificar dos paneles.
- Mobile: verificar solo formulario.

## Ejecutar pruebas con Vitest

```bash
npm run test
```

Opcional modo watch:

```bash
npm run test:watch
```

## Cobertura minima esperada para esta feature

- Reglas de validacion en `lib/` cubiertas con pruebas unitarias.
- Flujo de submit bloqueado cuando existan errores.
- Flujo de submit exitoso con redireccion y mensaje de exito.

## Referencias

- Modelo de datos: `specs/002-registro-usuarios/data-model.md`
- Contrato de UI: `specs/002-registro-usuarios/contracts/registro-ui.md`

## Estado de verificacion (2026-06-06)

- `npm run test -- --run`: OK (9 archivos, 19 pruebas).
- `npm run lint`: OK (sin warnings ni errores).
- `npm run build`: OK (build de produccion exitoso).
- Recorrido funcional validado en pruebas de integracion para flujo de registro y redireccion a `/login`.
