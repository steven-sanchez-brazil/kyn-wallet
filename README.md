# KynWallet

Este proyecto es una billetera virtual que implementa la pantalla de inicio de sesión (Login) basada en un diseño de alta fidelidad de Figma, utilizando tecnologías modernas web y respetando estrictamente los tokens de diseño (colores, tipografía, bordes).

## Características

*   **Arquitectura Limpia**: Separación clara entre componentes de UI (`components/ui`), lógica de negocio (`lib/services`) y vistas (`app/`).
*   **Validación en Tiempo Real**: Feedback instantáneo para errores de formato de correo y longitud de contraseña.
*   **Diseño Responsivo**: Diseño de panel dividido (Split-panel) en escritorio y vista enfocada en el formulario para dispositivos móviles.
*   **Test-Driven Development (TDD)**: Cobertura del 100% con pruebas unitarias y de integración utilizando Vitest y React Testing Library.
*   **Dependencias Controladas**: No se agregan nuevas librerías externas sin justificación técnica explícita y documentada.

## Tecnologías Utilizadas

*   **Framework**: [Next.js 14](https://nextjs.org/) (App Router)
*   **Librería UI**: [React 18](https://react.dev/)
*   **Estilos**: [Tailwind CSS 3](https://tailwindcss.com/) (implementación personalizada sin librerías de UI externas)
*   **Lenguaje**: [TypeScript](https://www.typescriptlang.org/)
*   **Testing**: [Vitest](https://vitest.dev/) & [React Testing Library](https://testing-library.com/docs/react-testing-library/intro/)

## Prerrequisitos

*   **Node.js**: Versión 18 o superior.
*   **npm**: Gestor de paquetes de Node.

## Instalación y Configuración

1.  Clona el repositorio:
    ```bash
    git clone <URL_DEL_REPOSITORIO>
    cd kyn-wallet
    ```

2.  Instala las dependencias:
    ```bash
    npm install
    ```

## Desarrollo

Inicia el servidor de desarrollo local:

```bash
npm run dev
```

La aplicación estará disponible en [http://localhost:3000](http://localhost:3000).

### Credenciales de Prueba

Para probar el flujo de inicio de sesión exitoso, utiliza las siguientes credenciales simuladas:

*   **Correo electrónico**: `tucorreo@ejemplo.com`
*   **Contraseña**: `password123`

Al ingresar credenciales válidas, el sistema redirigirá a una página de `/construction`.

## Pruebas (Testing)

El proyecto utiliza Vitest para pruebas unitarias e integración.

Ejecutar todas las pruebas (una sola vez):
```bash
npm run test
```

Ejecutar pruebas en modo "watch" (desarrollo):
```bash
npm run test:watch
```

## Guía de Estilos (UI Guidelines)

*   **Tokens de Diseño**: Los colores y dimensiones base se extraen de Figma y se definen en `lib/constants/DesignTokens.ts`, extendiendo la configuración de Tailwind (`tailwind.config.ts`).
*   **Componentes UI**: Reutiliza siempre los componentes base ubicados en `components/ui/` (ej. `Button`, `Input`) para garantizar la consistencia visual y bordes redondeados estándar de 12px.
*   **Convenciones de Código**: Todas las estructuras de datos, interfaces y clases principales deben seguir la convención `PascalCase` según las reglas configuradas en `.eslintrc.json`.

## Estructura del Proyecto

```
kyn-wallet/
├── app/                  # Rutas y páginas de Next.js App Router
│   ├── construction/     # Página de redirección post-login
│   ├── globals.css       # Estilos globales (Tailwind)
│   ├── layout.tsx        # Layout principal (HTML structure)
│   ├── login.test.tsx    # Tests de integración del Login
│   └── page.tsx          # Página principal (Login)
├── components/           # Componentes React
│   ├── BrandPanel.tsx    # Panel izquierdo con diseño de marca y tarjeta
│   ├── LoginForm.tsx     # Formulario derecho con lógica
│   ├── SocialLogins.tsx  # Botones de login social (Google, Apple)
│   └── ui/               # Componentes UI reusables (Input, Button)
├── lib/                  # Lógica de negocio y utilidades
│   ├── constants/        # Design Tokens exportados
│   ├── services/         # Servicios (AuthService) y tests
│   ├── types/            # Definiciones de TypeScript (Interfaces)
│   └── utils/            # Funciones de utilidad (Validaciones) y tests
└── specs/                # Documentación del diseño impulsado por especificaciones (SDD)
```

## Reglas de Documentación SDD

Todo artefacto generado por SDD (`spec.md`, `plan.md`, `tasks.md` y derivados) debe redactarse en español.
