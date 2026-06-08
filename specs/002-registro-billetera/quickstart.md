# Quickstart: Validación del Registro

## Escenarios de Validación

### 1. Registro Exitoso
- **Prerrequisito**: Estar en `/register`.
- **Acción**:
  1. Ingresar "Alex Mena" en Nombre.
  2. Ingresar "alex@ejemplo.com" en Email.
  3. Ingresar "Password123" en Contraseña y Confirmar Contraseña.
  4. Marcar "Acepto términos".
  5. Clic en "Crear cuenta".
- **Resultado esperado**: Redirección a `/login` con mensaje de éxito visible.

### 2. Validación de Contraseñas
- **Acción**: Ingresar contraseñas diferentes.
- **Resultado esperado**: El botón "Crear cuenta" permanece deshabilitado o muestra un mensaje "Las contraseñas deben coincidir".

### 3. Validación de Email
- **Acción**: Ingresar "correo-invalido".
- **Resultado esperado**: Mensaje de error "Formato de correo inválido".

## Comandos de Prueba (TDD)

```bash
# Ejecutar pruebas unitarias de validación
npm test lib/utils/Validation.test.ts

# Ejecutar pruebas unitarias de servicio
npm test lib/services/AuthService.test.ts

# Ejecutar pruebas de componentes UI
npm test components/RegisterForm.test.tsx
```
