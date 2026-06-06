# Plan de Implementación: Registro de Usuarios

Este plan detalla los pasos técnicos para implementar la pantalla de registro, reutilizando la infraestructura existente.

## Fase 1: Análisis y Preparación (Investigación)
- [ ] Analizar el frame de Figma "04 · Registro" para identificar nuevos tokens si existen.
- [ ] Verificar la reutilización de `BrandPanel.tsx` y componentes de `ui/`.
- [ ] Definir los tipos para los datos de registro en `lib/types/Auth.ts`.

## Fase 2: Lógica y Servicios (TDD)
- [ ] Extender `AuthService.ts` con un método `register(data: RegisterData): Promise<boolean>`.
- [ ] Crear pruebas unitarias para `register` en `lib/services/AuthService.test.ts`.
- [ ] Actualizar utilidades de validación en `lib/utils/Validation.ts` para incluir validación de "Nombre completo" (no vacío) y coincidencia de contraseñas.
- [ ] Agregar pruebas en `lib/utils/Validation.test.ts`.

## Fase 3: Componentes de UI
- [ ] Crear `RegisterForm.tsx` basándose en la estructura de `LoginForm.tsx`.
- [ ] Implementar el checkbox de Términos y Condiciones con estilo Figma.
- [ ] Asegurar que el botón "Crear cuenta" use los tokens de diseño correctos.
- [ ] Implementar la lógica de visibilidad de errores inline.

## Fase 4: Integración de Rutas
- [ ] Crear la ruta `app/register/page.tsx`.
- [ ] Configurar el layout de pantalla dividida reutilizando `BrandPanel`.
- [ ] Implementar la redirección a `/login?registro=exitoso`.
- [ ] Actualizar el mensaje de éxito en `LoginForm.tsx` (opcional, para feedback visual al llegar con el query param).

## Fase 5: Pruebas de Integración y Pulido
- [ ] Crear `app/register/register.test.tsx` para probar el flujo completo.
- [ ] Verificar comportamiento responsivo.
- [ ] Revisión final de `PascalCase` y cumplimiento de diseño.
