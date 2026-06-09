# Historial y Guía de Comandos - Taller de Registro KynWallet

Este documento contiene el orden cronológico exacto de los comandos ejecutados para realizar el taller, cuyo objetivo principal fue evaluar y probar el **Framework de Spec-Driven Development (SDD) - GitHub Spec Kit (Specify CLI)**. Te servirá como guía para tu socialización y presentación.

---

## 1. Fase 0: Auditoría y Verificación del Framework SDD (Specify CLI)

Antes de iniciar con el desarrollo, ejecutamos comandos específicos del CLI de **Specify** para auditar y verificar el estado del framework en tu máquina local:

### 1.1. Comprobación del Framework y Herramientas Locales
```powershell
specify check
```
*   **¿Por qué?**: Se utilizó para auditar qué herramientas requeridas por el framework SDD estaban instaladas y disponibles en tu PC (verificó que Git y VS Code estuvieran listos).

### 1.2. Comprobación de Versión del CLI
```powershell
specify version
```
*   **¿Por qué?**: Comprobó la versión instalada del toolkit (`0.9.3.dev0` sobre Python 3.14.4 en Windows) para asegurar compatibilidad con las directivas del taller.

### 1.3. Consulta de Flujos de Automatización (Workflows)
```powershell
specify workflow list
```
*   **¿Por qué?**: Se utilizó para listar las plantillas de workflows de SDD instaladas en el repositorio. Confirmó la disponibilidad del flujo *"Full SDD Cycle (speckit) v1.0.0"* el cual guía los pasos de `specify → plan → tasks → implement`.

### 1.4. Ejecución del Workflow de SDD
```powershell
specify workflow run speckit --input spec="Registro de Usuarios" --input integration=gemini
```
*   **¿Por qué?**: Se ejecutó para intentar iniciar el ciclo automatizado de Specify utilizando la integración de inteligencia artificial de Gemini. (Nota: Al correrse de manera automatizada delegó la generación en el agente local).

---

## 2. Fase 1: Enrutamiento de Git

### 2.1. Inspección del Estado Inicial del Repositorio
```powershell
git status
git remote -v
git branch -a
```
*   **¿Por qué?**: Se utilizó para verificar en qué estado se encontraba la carpeta clonada originalmente. Identificamos que el repositorio apuntaba al origen oficial del tutor (`steven-sanchez-brazil`) y que solo existía la rama `main`.

### 2.2. Creación de la Rama de Trabajo Inicial
```powershell
git checkout -b feature/registro-nombre-apellido
```
*   **¿Por qué?**: Se creó la rama inicial solicitada por la guía del taller.

### 2.3. Personalización de la Rama
```powershell
git branch -m feature/registro-cristian-agudelo
```
*   **¿Por qué?**: Se renombró la rama para adaptarla con tu nombre (`cristian-agudelo`) conforme al ejemplo de la guía.

---

## 3. Fase 2: Inicialización de la Feature con Specify (Scripts Internos)

### 3.1. Creación del Entorno del Feature
```powershell
powershell -File .specify/scripts/powershell/create-new-feature.ps1 "Registro de Usuarios" -ShortName "registro-cristian-agudelo" -AllowExistingBranch
```
*   **¿Por qué?**: Es el script interno invocado por el CLI de Specify para inicializar la feature del registro de usuarios. Este script de forma automática creó la carpeta `specs/002-registro-cristian-agudelo` y copió la plantilla base `spec.md` (las especificaciones del producto), además de configurar la rama local secuencial `002-registro-cristian-agudelo`.

### 3.2. Enlace al Fork de GitHub Personal
```powershell
git remote set-url origin https://github.com/cristian3165/kyn-wallet.git
git remote -v
```
*   **¿Por qué?**: Como habías realizado el **fork** en la web de GitHub, redirigimos el remoto `origin` local a tu cuenta personal (`cristian3165/kyn-wallet.git`). Esto garantiza que los cambios se guarden en tu perfil y no en el del tutor.

---

## 4. Fase 3: Instalación de Dependencias del Proyecto

### 4.1. Instalación de Paquetes Locales (Fijar Directorio)
```powershell
npm install --prefix . --legacy-peer-deps
```
*   **¿Por qué?**: Al existir un archivo `package.json` en tu carpeta de usuario raíz (`C:\Users\CristianDanielAgudel`), npm por defecto intentaba resolver la instalación en esa ruta superior. El parámetro `--prefix .` obligó a npm a crear la carpeta `node_modules` de forma local dentro del proyecto `kyn-wallet`. El parámetro `--legacy-peer-deps` resolvió conflictos de versiones entre dependencias de React y Next.js.

### 4.2. Instalación de Dependencias Faltantes de Desarrollo
```powershell
npm install -D autoprefixer
npm install -D @typescript-eslint/eslint-plugin @typescript-eslint/parser --legacy-peer-deps
npm install -D vite --legacy-peer-deps
```
*   **¿Por qué?**:
    *   `autoprefixer`: Requerido por PostCSS para el correcto procesamiento de estilos CSS/Tailwind de Next.js.
    *   `@typescript-eslint/eslint-plugin` y `@typescript-eslint/parser`: Requeridos para que ESLint pudiera interpretar y hacer cumplir las reglas de nomenclatura estricta del taller (como la convención `PascalCase`).
    *   `vite`: Requerido como dependencia directa para ejecutar las pruebas de Vitest.

---

## 5. Fase 4: Verificación y Compilación (TDD)

### 5.1. Pruebas de Compilación de Producción
```powershell
npm run build
```
*   **¿Por qué?**: Ejecuta el comando `next build` para compilar la aplicación, haciendo un análisis estático de TypeScript y ESLint sobre todo el código implementado, garantizando que el build de producción se complete sin ningún error.

### 5.2. Ejecución de la Suite de Pruebas
```powershell
npx vitest run
```
*   **¿Por qué?**: Corre las pruebas de Vitest una sola vez. Verificamos que las **21 pruebas** (las 11 originales de inicio de sesión y las 10 nuevas que creamos para validar el comportamiento del registro) pasaron exitosamente en verde.

---

## 6. Fase 5: Entrega y Subida a GitHub

### 6.1. Renombrado y Limpieza de Ramas
```powershell
git branch -D feature/registro-cristian-agudelo
git branch -m feature/registro-cristian-agudelo
```
*   **¿Por qué?**: Borramos la rama temporal vacía creada al inicio y renombramos la rama activa actual a `feature/registro-cristian-agudelo` para cumplir exactamente con la entrega.

### 6.2. Guardar Cambios en Git (Commit)
```powershell
git add .
git commit -m "feat: implement user registration flow following SDD and TDD"
```
*   **¿Por qué?**: Agregamos todos los archivos nuevos y modificados al área de preparación de Git y creamos el commit definitivo.

### 6.3. Subir Código a GitHub
```powershell
git push -u origin feature/registro-cristian-agudelo
```
*   **¿Por qué?**: Envía todos tus commits locales a tu repositorio fork remoto en GitHub, dejando la rama disponible para crear el Pull Request.

---

## 7. Levantar Servidor para Demostración

```powershell
npm run dev
```
*   **¿Por qué?**: Levanta el servidor local de desarrollo de Next.js en el puerto 3000 para demostraciones interactivas en vivo en la URL: `http://localhost:3000/register`.
