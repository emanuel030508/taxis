# Estructura del Proyecto Taxi

Este documento describe la estructura de carpetas y archivos del proyecto **Taxi**, una aplicación Angular generada con Angular CLI v21.1.2.

---

## 📁 Estructura de Carpetas

```
Taxi/
├── .vscode/                    # Configuración de Visual Studio Code
├── public/                     # Archivos públicos estáticos
├── src/                        # Código fuente de la aplicación
│   └── app/                    # Módulo principal de la aplicación
├── .editorconfig               # Configuración del editor
├── .gitignore                  # Archivos ignorados por Git
├── .postcssrc.json             # Configuración de PostCSS
├── angular.json                # Configuración de Angular CLI
├── package.json                # Dependencias y scripts de npm
├── package-lock.json           # Bloqueo de versiones de dependencias
├── README.md                   # Documentación del proyecto
├── tsconfig.json               # Configuración base de TypeScript
├── tsconfig.app.json           # Configuración de TypeScript para la app
└── tsconfig.spec.json          # Configuración de TypeScript para tests
```

---

## 📄 Descripción de Archivos y Carpetas

### Configuración del Proyecto

| Archivo                                      | Descripción                                                                                                                                                                       |
| -------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| [`package.json`](package.json:1)             | Define las dependencias del proyecto, scripts de npm (start, build, test, watch) y configuración de Prettier. Incluye Angular v21.1.0, TailwindCSS v4.1.12 y Vitest para testing. |
| [`angular.json`](angular.json:1)             | Configuración de Angular CLI. Define el builder, opciones de compilación, assets, estilos y configuraciones para desarrollo y producción.                                         |
| [`tsconfig.json`](tsconfig.json:1)           | Configuración base de TypeScript con opciones estrictas habilitadas, target ES2022 y referencias a tsconfig.app.json y tsconfig.spec.json.                                        |
| [`tsconfig.app.json`](tsconfig.app.json:1)   | Configuración específica de TypeScript para la aplicación. Excluye archivos de test (\*.spec.ts).                                                                                 |
| [`tsconfig.spec.json`](tsconfig.spec.json:1) | Configuración de TypeScript para pruebas unitarias. Incluye tipos de Vitest.                                                                                                      |
| [`.postcssrc.json`](.postcssrc.json:1)       | Configuración de PostCSS con el plugin de TailwindCSS.                                                                                                                            |
| [`.editorconfig`](.editorconfig:1)           | Configuración del editor: UTF-8, indentación con 2 espacios, comillas simples para TypeScript.                                                                                    |
| [`.gitignore`](.gitignore:1)                 | Lista de archivos y carpetas ignorados por Git (node_modules, dist, .angular/cache, etc.).                                                                                        |

### Configuración de VS Code

| Archivo                                                | Descripción                                                                                    |
| ------------------------------------------------------ | ---------------------------------------------------------------------------------------------- |
| [`.vscode/extensions.json`](.vscode/extensions.json:1) | Recomienda la extensión oficial de Angular para VS Code (`angular.ng-template`).               |
| [`.vscode/launch.json`](.vscode/launch.json:1)         | Configuraciones de depuración para Chrome: `ng serve` (puerto 4200) y `ng test` (puerto 9876). |
| [`.vscode/tasks.json`](.vscode/tasks.json:1)           | Tareas de npm integradas en VS Code para ejecutar el servidor de desarrollo.                   |
| [`.vscode/mcp.json`](.vscode/mcp.json:1)               | Configuración de Model Context Protocol (MCP).                                                 |

### Archivos Públicos

| Archivo                                      | Descripción                          |
| -------------------------------------------- | ------------------------------------ |
| [`public/favicon.ico`](public/favicon.ico:1) | Icono de favoritos de la aplicación. |

### Código Fuente (`src/`)

| Archivo                              | Descripción                                                                                                                            |
| ------------------------------------ | -------------------------------------------------------------------------------------------------------------------------------------- |
| [`src/index.html`](src/index.html:1) | Plantilla HTML principal. Contiene el selector `<app-root>` donde se monta la aplicación Angular.                                      |
| [`src/main.ts`](src/main.ts:1)       | Punto de entrada de la aplicación. Inicializa la aplicación Angular usando `bootstrapApplication` con la configuración de `appConfig`. |
| [`src/styles.css`](src/styles.css:1) | Estilos globales de la aplicación. Importa TailwindCSS (`@import "tailwindcss"`).                                                      |

### Módulo Principal (`src/app/`)

| Archivo                                            | Descripción                                                                                                                                   |
| -------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------- |
| [`src/app/app.ts`](src/app/app.ts:1)               | Componente raíz de la aplicación. Define el selector `app-root`, importa `RouterOutlet` y contiene una señal (`signal`) con el título "Taxi". |
| [`src/app/app.html`](src/app/app.html:1)           | Template HTML del componente raíz. Contiene el contenido por defecto generado por Angular CLI con estilos de ejemplo.                         |
| [`src/app/app.css`](src/app/app.css:1)             | Estilos específicos del componente raíz (archivo vacío inicialmente).                                                                         |
| [`src/app/app.config.ts`](src/app/app.config.ts:1) | Configuración de la aplicación. Provee el enrutador (`provideRouter`) y listeners de errores globales (`provideBrowserGlobalErrorListeners`). |
| [`src/app/app.routes.ts`](src/app/app.routes.ts:1) | Definición de rutas de la aplicación. Actualmente vacío (`Routes = []`).                                                                      |
| [`src/app/app.spec.ts`](src/app/app.spec.ts:1)     | Pruebas unitarias del componente raíz usando Vitest. Incluye tests básicos de creación y renderizado del título.                              |

---

## 🛠️ Tecnologías Principales

- **Framework**: Angular v21.1.0
- **Lenguaje**: TypeScript v5.9.2
- **UI Components**: PrimeNG v21.1.1
- **Iconos**: PrimeIcons v7.0.0
- **Utilidades CSS**: PrimeFlex v4.0.0
- **Estilos**: TailwindCSS v4.1.12 + PostCSS
- **Testing**: Vitest v4.0.8 + jsdom
- **Bundler**: Angular Build (@angular/build)
- **Package Manager**: npm v11.6.2

---

## 🚀 Scripts Disponibles

| Comando                      | Descripción                                                  |
| ---------------------------- | ------------------------------------------------------------ |
| `npm start` / `ng serve`     | Inicia el servidor de desarrollo en `http://localhost:4200/` |
| `npm run build` / `ng build` | Compila la aplicación para producción (salida en `dist/`)    |
| `npm run watch`              | Compila en modo desarrollo con watch                         |
| `npm test` / `ng test`       | Ejecuta las pruebas unitarias con Vitest                     |

---

## 📌 Notas

- El proyecto utiliza **Angular Standalone Components** (sin NgModules).
- La configuración de TypeScript es **estricta** (strict: true).
- Se usa **signals** de Angular para el manejo de estado reactivo.
- El enrutador está configurado pero no tiene rutas definidas aún.
- **PrimeNG** está instalado para componentes UI (botones, tablas, formularios, etc.).
- **PrimeIcons** proporciona iconos para los componentes.
- **PrimeFlex** ofrece utilidades CSS para layout (grid, flexbox, spacing).
- TailwindCSS está integrado para el manejo de estilos utilitarios.
