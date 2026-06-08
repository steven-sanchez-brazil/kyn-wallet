# Quickstart: Registro de Usuario

## Prerrequisitos

- Node.js 18+ instalado
- Repositorio clonado con las dependencias instaladas:
  ```bash
  npm install
  ```
- Rama activa: `002-registro-usuario`

---

## Ejecutar tests (validación TDD)

Los tests deben ejecutarse **antes** de la implementación. Verifican que la lógica sea correcta.

```bash
npm run test
```

Para modo watch (desarrollo continuo):
```bash
npm run test:watch
```

### Cobertura esperada al completar el feature

| Archivo de test | Qué valida |
|----------------|------------|
| `lib/utils/Validation.test.ts` | `validateName`, `validatePasswordMatch`, `validateTrimmed` (+ los ya existentes) |
| `lib/services/RegistrationService.test.ts` | Retorna `true` con datos válidos, `false` con términos rechazados |
| `components/RegisterForm.test.tsx` | Validaciones en tiempo real, estado de carga, deshabilitar botón, mensajes de error |
| `app/register.test.tsx` | Flujo completo: registro exitoso redirige a `/login?registered=true` |
| `app/login.test.tsx` | (extendido) Banner de éxito visible cuando `?registered=true` está presente |

---

## Iniciar el servidor de desarrollo

```bash
npm run dev
```

---

## Escenarios de validación manual

### Escenario 1 — Registro exitoso (HU1)

1. Navega a `http://localhost:3000/register`
2. Completa el formulario:
   - **Nombres y Apellidos**: `Ana García`
   - **Correo Electrónico**: `ana@ejemplo.com`
   - **Contraseña**: `pass1234`
   - **Confirmar Contraseña**: `pass1234`
   - **Checkbox de términos**: marcado ✓
3. Haz clic en **"Crear Cuenta"**

**Resultado esperado**:
- El botón muestra "Creando cuenta..." durante ~500ms y queda deshabilitado
- El sistema redirige a `http://localhost:3000/login?registered=true`
- En `/login` aparece un banner verde/naranja con el texto: *"¡Cuenta creada exitosamente! Inicia sesión para continuar."*
- El banner desaparece después de unos segundos o al cerrar

---

### Escenario 2 — Validaciones en tiempo real (HU2)

1. Navega a `http://localhost:3000/register`
2. Escribe un email inválido (ej. `sindominio`): debe aparecer *"Formato de correo inválido"* en rojo
3. Escribe una contraseña de 5 caracteres: debe aparecer *"La contraseña debe tener al menos 8 caracteres"*
4. Escribe contraseñas distintas en ambos campos: debe aparecer *"Las contraseñas no coinciden"*
5. Presiona "Crear Cuenta" con campos vacíos: todos los campos obligatorios se marcan en rojo con *"Este campo es obligatorio"*
6. Escribe un nombre con espacio al inicio (ej. `" Ana"`): debe aparecer la advertencia de trim

**Resultado esperado**: Mensajes de error visibles antes de intentar enviar el formulario.

---

### Escenario 3 — Botones sociales "Próximamente" (HU3)

1. En desktop: mueve el cursor sobre el botón **Google** → aparece alerta con "Próximamente" (o tooltip)
2. En mobile / DevTools emulación: toca el botón **Apple** → aparece alerta con "Próximamente"

**Resultado esperado**: Ningún proceso de autenticación se inicia.

---

### Escenario 4 — Diseño responsive y navegación (HU4)

1. En desktop (≥1024px): verifica que el panel de branding naranja aparece a la izquierda (igual que en `/login`)
2. En mobile (<1024px) o emulación: el panel de branding se oculta, solo el formulario ocupa la pantalla
3. Haz clic en *"¿Ya tienes una cuenta? Inicia Sesión"* → debe redirigir a `http://localhost:3000/`

---

### Escenario 5 — Prevención de envíos duplicados (casos extremos)

1. Completa el formulario con datos válidos
2. Haz doble clic rápido en "Crear Cuenta"
3. **Resultado esperado**: Solo una llamada al servicio se ejecuta; el botón queda deshabilitado tras el primer clic

---

## Referencias

- Contrato del servicio: [`contracts/registration-service.md`](contracts/registration-service.md)
- Modelo de datos: [`data-model.md`](data-model.md)
- Tokens de diseño: [`lib/constants/DesignTokens.ts`](../../lib/constants/DesignTokens.ts)
- Spec completa: [`spec.md`](spec.md)
