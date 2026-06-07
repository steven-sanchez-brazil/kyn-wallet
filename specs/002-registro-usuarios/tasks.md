# Tasks: Registro de Usuarios KynWallet

- [x] [FR-001, AC-001] Definir interfaces de dominio y contratos API en [lib/types/Registration.ts](lib/types/Registration.ts). (DoD: Existen y exportan RegistrationFormData, RegistrationValidationErrors, RegistrationSuccessResponse, RegistrationErrorResponse y RegistrationApiResponse, sin errores de TypeScript).

- [x] [FR-002, FR-003, FR-004, AC-002, AC-003, AC-004, AC-005] Implementar normalización y validaciones puras (email, longitud, match, obligatorios, términos) con sanitización trim/lowercase en [lib/utils/RegistrationValidation.ts](lib/utils/RegistrationValidation.ts). (DoD: ValidateRegistrationData retorna errores por campo y NormalizeEmail aplica trim+lowercase de forma determinística para todos los casos definidos en plan/spec).

- [x] [FR-002, FR-003, FR-004, AC-002, AC-003, AC-004, AC-005] Implementar cliente de registro con timeout controlado y mapeo tipado de respuestas en [lib/services/RegistrationService.ts](lib/services/RegistrationService.ts). (DoD: Register() realiza POST a /api/register, retorna RegistrationApiResponse tipado y en timeout retorna code REQUEST_TIMEOUT sin usar localStorage para datos sensibles).

- [x] [FR-002, FR-003, FR-004, FR-007, AC-002, AC-003, AC-004, AC-005, AC-008] Implementar endpoint mock POST con revalidación servidor, sanitización, regla de correo duplicado case-insensitive y contrato 201/400 en [app/api/register/route.ts](app/api/register/route.ts). (DoD: El endpoint responde 201 con redirectTo=/login?registered=true en request válido; responde 400 VALIDATION_ERROR o EMAIL_ALREADY_REGISTERED en inválidos/duplicados; no expone ni persiste contraseñas fuera del request).

- [x] [FR-001, FR-002, FR-003, FR-004, FR-005, FR-006, FR-007, FR-008, AC-001, AC-002, AC-003, AC-004, AC-005, AC-006, AC-007, AC-008, AC-009] Implementar formulario de registro con diseño Figma, validación inline en tiempo real, submit al servicio, alertas sociales y navegación a /login en [components/RegistrationForm.tsx](components/RegistrationForm.tsx). (DoD: Renderiza todos los campos requeridos, muestra errores inline al escribir/corregir, bloquea envío con errores, ejecuta alert("Próximamente") en Google/Apple, redirige a /login?registered=true en éxito y no almacena datos sensibles en localStorage).

- [x] [FR-001, FR-006, AC-001, AC-007] Crear página de registro con layout responsive (desktop 2 paneles y mobile 1 panel) reutilizando branding existente en [app/register/page.tsx](app/register/page.tsx). (DoD: En desktop muestra panel izquierdo + formulario; en mobile oculta panel izquierdo y mantiene formulario centrado; el formulario de registro es visible y funcional).

- [x] [FR-006, FR-007, AC-007, AC-008] Crear ruta canónica de login para recibir redirección desde registro en [app/login/page.tsx](app/login/page.tsx). (DoD: /login renderiza el módulo de login sin errores y permite recibir query params).

- [x] [FR-007, AC-008] Implementar banner de éxito al detectar registered=true en query param en [components/LoginForm.tsx](components/LoginForm.tsx). (DoD: Al abrir /login?registered=true se visualiza mensaje de éxito; en ausencia del query param el banner no aparece).

- [x] [FR-006, FR-007, AC-007, AC-008] Ajustar entrada principal para coherencia de rutas hacia login en [app/page.tsx](app/page.tsx). (DoD: La ruta raíz conduce al flujo de login definido por el plan, sin romper render ni navegación existente).

- [x] [FR-002, FR-003, FR-004, AC-002, AC-003, AC-004, AC-005] Cubrir utilidades de validación con pruebas unitarias en [lib/utils/RegistrationValidation.test.ts](lib/utils/RegistrationValidation.test.ts). (DoD: Pruebas pasando para email válido/inválido, password <8/>=8, contraseñas no coinciden, obligatorios, términos no aceptados y normalización trim+lowercase).

- [x] [FR-002, FR-003, FR-004, FR-007, AC-002, AC-003, AC-004, AC-005, AC-008] Cubrir contrato del endpoint mock (201 y 400) en [app/api/register/route.test.ts](app/api/register/route.test.ts). (DoD: Suite valida 201 éxito, 400 VALIDATION_ERROR y 400 EMAIL_ALREADY_REGISTERED con payload JSON esperado).

- [x] [FR-007, AC-008] Cubrir comportamiento del servicio de registro (éxito/error/timeout) en [lib/services/RegistrationService.test.ts](lib/services/RegistrationService.test.ts). (DoD: Suite valida parse de 201, mapeo de 400 y REQUEST_TIMEOUT con mocks de fetch/AbortController).

- [x] [FR-001, FR-002, FR-003, FR-004, FR-005, FR-006, FR-007, FR-008, AC-001, AC-002, AC-003, AC-004, AC-005, AC-006, AC-007, AC-008, AC-009] Cubrir interacción de UI del formulario de registro en [components/RegistrationForm.test.tsx](components/RegistrationForm.test.tsx). (DoD: Pruebas pasando para render de campos, errores inline, bloqueo de submit inválido, redirección en éxito y alertas sociales).

- [x] [FR-001, FR-006, FR-008, AC-001, AC-007, AC-009] Añadir prueba de integración de la página de registro y comportamiento responsive esperado en [app/register.test.tsx](app/register.test.tsx). (DoD: Suite verifica composición de página con formulario, presencia de layout desktop y comportamiento esperado para mobile a nivel de clases/render).

- [x] [FR-001, FR-002, FR-003, FR-004, FR-005, FR-006, FR-007, FR-008, AC-001, AC-002, AC-003, AC-004, AC-005, AC-006, AC-007, AC-008, AC-009] Verificar cobertura mínima del módulo de registro ejecutando Vitest y ajustando casos faltantes en [specs/002-registro-usuarios/tasks.md](specs/002-registro-usuarios/tasks.md). (DoD: Reporte de pruebas del módulo registro con cobertura >=80% en líneas y ramas, y sin pruebas fallidas).
