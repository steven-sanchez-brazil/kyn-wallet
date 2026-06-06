# Contrato: Flujo de Registro UI

## Alcance
Contrato funcional para la pantalla de registro en frontend sin backend.

## Entradas del formulario

```ts
interface RegistroUsuarioInput {
  nombreCompleto: string;
  correoElectronico: string;
  contrasena: string;
  confirmarContrasena: string;
  aceptaTerminos: boolean;
}
```

## Reglas de validacion

1. `nombreCompleto` obligatorio.
2. `correoElectronico` obligatorio y con formato valido.
3. `contrasena` obligatoria y minimo 8 caracteres.
4. `confirmarContrasena` obligatoria y debe coincidir con `contrasena`.
5. `aceptaTerminos` debe ser `true`.

## Salidas esperadas

```ts
interface ResultadoRegistro {
  exitoso: boolean;
  mensaje: string;
  redirectTo: '/login';
}
```

## Comportamiento de eventos

### Evento: Click en "Crear cuenta"
- Precondicion: Formulario visible.
- Proceso:
  - Ejecutar validaciones de todas las entradas.
  - Si hay errores: renderizar mensajes inline por campo y bloquear envio.
  - Si no hay errores: simular registro local exitoso.
- Postcondicion en exito:
  - Redireccion a `/login`.
  - Transporte de mensaje de exito para visualizacion en login.

### Evento: Click en Google/Apple
- Resultado: Mostrar alert con texto exacto `Proximamente`.
- Restriccion: No debe modificar estado de validaciones ni ejecutar registro.

### Evento: Click en "¿Ya tienes cuenta? Inicia sesion"
- Resultado: Navegacion directa a `/login` sin validaciones ni submit.

## Contrato responsive

- Desktop: layout de dos paneles (branding + formulario).
- Mobile: solo formulario de registro.
- El cambio de viewport no debe limpiar datos ni errores ya capturados.

## Restricciones tecnicas

- Implementacion con Next.js + React + Tailwind CSS.
- Uso de componentes reutilizables en `components/`.
- Logica de validacion separada en `lib/`.
- Prohibido agregar librerias externas.
