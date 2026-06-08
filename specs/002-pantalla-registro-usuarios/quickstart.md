# Quickstart: Registro de Usuarios

## Prerequisitos

1. Node.js 18+ instalado.
2. Dependencias instaladas en el repositorio.

```bash
npm install
```

## Desarrollo

Inicia la aplicacion en modo desarrollo:

```bash
npm run dev
```

Abre la pantalla de registro en:

```text
http://localhost:3000/register
```

## Pruebas (TDD)

Ejecuta suite completa:

```bash
npm run test
```

Ejecuta en modo watch:

```bash
npm run test:watch
```

## Validacion Funcional Rapida

1. Completa formulario con datos validos y confirma mensaje de alta exitosa.
2. Intenta enviar con campos vacios y verifica errores por campo.
3. Ingresa email invalido/contrasena corta y valida mensajes accionables.
4. Verifica que exista via clara para volver a login.
5. Inicia sesion en `/` con el usuario recien registrado para validar fuente de datos compartida.

## Validacion Visual Rapida

1. En desktop, comprobar jerarquia y posicion relativa de:
   - panel de card mockup
   - headline 1
   - headline 2
2. En mobile, validar ausencia de solapamientos y legibilidad del contenido esencial.

## Nota de Integracion Figma MCP

El plan considera el frame compartido como fuente de verdad visual; en esta sesion la lectura directa del nodo por MCP no estuvo disponible por restricciones de acceso/seat del usuario autenticado.

## Ejecucion Manual Documentada (2026-06-08)

### Flujo funcional end-to-end

1. En `/register`, se validaron errores por campo con datos invalidos:
   - nombre de 1 caracter
   - correo invalido
   - contrasena corta
   - confirmacion distinta
   - terminos no aceptados
2. Se completo un registro valido con `ana.torres.e2e@example.com` y se confirmo mensaje `Cuenta creada exitosamente.`.
3. Se verifico retorno a login (`/`) tras alta exitosa.
4. En login, se usaron las mismas credenciales del usuario recien creado.
5. El acceso fue exitoso y navego a `/construction` mostrando `¡Acceso Exitoso!`, confirmando fuente de datos compartida entre registro y login.

### Validacion visual rapida

1. En desktop se verifico presencia y jerarquia de `brand-headlines` y `card-mockup` junto al formulario.
2. Se mantuvo legibilidad del contenido principal sin solapamientos durante la prueba manual y con respaldo de pruebas responsive automatizadas.
