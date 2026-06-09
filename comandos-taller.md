# Historial y Guía de Comandos - Taller de Registro KynWallet

Este documento contiene el orden cronológico exacto de los comandos ejecutados para realizar el taller de registro, junto con la justificación técnica de cada uno. Te servirá como guía para tu socialización y presentación.

---

## 1. Fase de Preparación y Enrutamiento de Git

### 1.1. Inspección del Estado Inicial
```powershell
git status
git remote -v
git branch -a
```
*   **¿Por qué?**: Se utilizó para verificar en qué estado se encontraba la carpeta clonada originalmente. Identificamos que el repositorio apuntaba al origen oficial del tutor (`steven-sanchez-brazil`) y que solo existía la rama `main`.

### 1.2. Creación de la Rama de Trabajo Inicial
```powershell
git checkout -b feature/registro-nombre-apellido
```
*   **¿Por qué?**: Se creó la rama inicial solicitada por la guía del taller.

### 1.3. Personalización de la Rama
```powershell
git branch -m feature/registro-cristian-agudelo
```
*   **¿Por qué?**: Se renombró la rama para adaptarla con tu nombre (`cristian-agudelo`) conforme al ejemplo de la guía.

---

## 2. Fase de Inicialización de Especificaciones (Specify CLI)

### 2.1. Creación del Entorno del Feature
```powershell
powershell -File .specify/scripts/powershell/create-new-feature.ps1 "Registro de Usuarios" -ShortName "registro-cristian-agudelo" -AllowExistingBranch
```
*   **¿Por qué?**: Es el script provisto por la plantilla del proyecto para inicializar la carpeta de especificaciones (`specs/002-registro-cristian-agudelo`) y crear la plantilla base de `spec.md`. Este script de forma automática asignó el identificador secuencial `002` y creó la rama local `002-registro-cristian-agudelo`.

### 2.2. Enlace al Fork de GitHub Personal
```powershell
git remote set-url origin https://github.com/cristian3165/kyn-wallet.git
git remote -v
```
*   **¿Por qué?**: Como habías realizado el **fork** en la web de GitHub, redirigimos el remoto `origin` local a tu cuenta personal (`cristian3165/kyn-wallet.git`). Esto garantiza que los cambios se guarden en tu perfil y no en el del tutor.

---

## 3. Fase de Instalación de Dependencias

### 3.1. Instalación de Paquetes Locales (Fijar Directorio)
```powershell
npm install --prefix . --legacy-peer-deps
```
*   **¿Por qué?**: Al existir un archivo `package.json` en tu carpeta de usuario raíz (`C:\Users\CristianDanielAgudel`), npm por defecto intentaba resolver la instalación en esa ruta superior. El parámetro `--prefix .` obligó a npm a crear la carpeta `node_modules` de forma local dentro del proyecto `kyn-wallet`. El parámetro `--legacy-peer-deps` resolvió conflictos de versiones entre dependencias de React y Next.js.

### 3.2. Instalación de Dependencias Faltantes de Desarrollo
```powershell
npm install -D autoprefixer
npm install -D @typescript-eslint/eslint-plugin @typescript-eslint/parser --legacy-peer-deps
npm install -D vite --legacy-peer-deps
```
*   **¿Por qué?**:
    *   `autoprefixer`: Requerido por PostCSS para el correcto procesamiento de estilos CSS/Tailwind de Next.js.
    *   `@typescript-eslint/eslint-plugin` y `@typescript-eslint/parser`: Requeridos para que ESLint pudiera interpretar y hacer cumplir las reglas de nomenclatura estricta del taller (como la convención `PascalCase`).
    *   `vite`: Requerido como dependencia directa para ejecutar las pruebas unitarias con Vitest.

---

## 4. Fase de Verificación y Compilación (TDD)

### 4.1. Pruebas de Compilación de Producción
```powershell
npm run build
```
*   **¿Por qué?**: Ejecuta el comando `next build` para compilar la aplicación, haciendo un análisis estático de TypeScript y ESLint sobre todo el código implementado, garantizando que el build de producción se complete sin ningún error.

### 4.2. Ejecución de la Suite de Pruebas
```powershell
npx vitest run
```
*   **¿Por qué?**: Corre las pruebas de Vitest una sola vez (sin modo observador). Verificamos que las **21 pruebas** (las 11 originales de inicio de sesión y las 10 nuevas que creamos para validar el comportamiento del registro) pasaron exitosamente en verde.

---

## 5. Fase de Entrega y Subida a GitHub

### 5.1. Renombrado y Limpieza de Ramas
```powershell
git branch -D feature/registro-cristian-agudelo
git branch -m feature/registro-cristian-agudelo
```
*   **¿Por qué?**: Borramos la rama temporal vacía creada al inicio y renombramos la rama activa actual a `feature/registro-cristian-agudelo` para cumplir exactamente con la entrega.

### 5.2. Guardar Cambios en Git (Commit)
```powershell
git add .
git commit -m "feat: implement user registration flow following SDD and TDD"
```
*   **¿Por qué?**: Agregamos todos los archivos nuevos y modificados al área de preparación de Git y creamos el commit definitivo.

### 5.3. Subir Código a GitHub
```powershell
git push -u origin feature/registro-cristian-agudelo
```
*   **¿Por qué?**: Envía todos tus commits locales a tu repositorio fork remoto en GitHub, dejando la rama disponible para crear el Pull Request.

---

## 6. Levantar Servidor para Demostración

```powershell
npm run dev
```
*   **¿Por qué?**: Levanta el servidor local de desarrollo de Next.js en el puerto 3000 para demostraciones interactivas en vivo en la URL: `http://localhost:3000/register`.
