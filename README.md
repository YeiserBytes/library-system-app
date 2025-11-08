# Bibliotech

[![License: MIT](https://img.shields.io/badge/license-MIT-green)]()
[![Node](https://img.shields.io/badge/node-22+-blue)]()
[![Status](https://img.shields.io/badge/status-beta-yellow)]()

Sistema de gestión de biblioteca para registrar y catalogar libros, gestionar préstamos y reservas, controlar disponibilidad y otorgar permisos diferenciados (estudiante, docente, administrador).

## Tabla de contenidos

- [Resumen](#resumen)
- [Características](#caracter%C3%ADsticas)
- [Requisitos](#requisitos)
- [Inicio rápido](#inicio-r%C3%A1pido)
- [Estructura del proyecto](#estructura-del-proyecto)
- [Variables de entorno](#variables-de-entorno)
- [Desarrollo y scripts útiles](#desarrollo-y-scripts-%C3%BAtiles)
- [Construcción y despliegue](#construcci%C3%B3n-y-despliegue)
- [Testing y calidad](#testing-y-calidad)
- [Contribuir](#contribuir)
- [Contacto y licencia](#contacto-y-licencia)

## Resumen

Bibliotech centraliza la gestión de préstamos en una institución educativa, facilita la trazabilidad de ejemplares, notifica vencimientos y permite priorizar permisos según rol.

## Características

- Registro y búsqueda por ISBN, título, autor y categoría.
- Gestión de préstamos, reservas y devoluciones.
- Estados de ejemplares: disponible, prestado, reservado.
- Notificaciones de vencimiento y alertas por retraso.
- Roles: estudiante, docente, administrador.
- Paneles básicos para usuarios y administración.

## Requisitos

- Node.js 22+ (recomendado)
- bun / npm / pnpm (opcional)
- Git

## Inicio rápido

Clona el repositorio:

```sh
git clone https://github.com/YeiserBytes/library-system-app.git
cd library-system-app
```

Instala dependencias (elige uno):

```sh
npm install
# o
pnpm install
# o
bun install
```

Arrancar en modo desarrollo (ejecuta los scripts definidos en package.json):

```sh
# Si hay un meta-script dev que arranca el monorepo
npm run dev
# o con pnpm / bun
pnpm run dev
bun run dev
```

Ejecutar apps individualmente (si aplica):

```sh
# Frontend (client)
cd apps/client
npm run dev

# Backend (Strapi/server)
cd apps/server
npm run develop
```

(Si el repo usa Turborepo, puedes usar `npx turbo dev` o `turbo dev` si lo tienes instalado globalmente.)

## Estructura del proyecto

- apps/
  - client/ -> Frontend (Next.js)
  - server/ -> Backend (Strapi u otro)
- packages/
  - @repo/ui
  - @repo/eslint-config
  - @repo/typescript-config

(Todo en TypeScript)

## Variables de entorno (ejemplo)

Crea un archivo `.env` en la raíz o en cada app según corresponda.

Ejemplo para el servidor (apps/server/.env):

```sh
HOST=0.0.0.0
PORT=1337
APP_KEYS="toBeModified1,toBeModified2"
API_TOKEN_SALT=tobemodified
ADMIN_JWT_SECRET=tobemodified
TRANSFER_TOKEN_SALT=tobemodified
JWT_SECRET=tobemodified
ENCRYPTION_KEY=tobemodified
```

Ejemplo para el cliente (apps/client/.env.local):

```sh
STRAPI_BASE_URL="http://localhost:1337"
STRAPI_API_URL="http://localhost:1337/api"
STRAPI_API_TOKEN=""
```

## Desarrollo y scripts útiles

- Lint: npm run lint
- Formatear: npm run format
- Tests: npm run test
- Construir todo: npx turbo build
- Construir paquete específico: npx turbo build --filter=client

Ejemplos:

```sh
# Lint y formateo
npm run lint
npm run format

# Ejecutar tests (si existen)
npm run test
```

## Testing y calidad

- Mantener linters y formateo activos.
- Agregar pruebas unitarias e integradas según crezca el proyecto.
- Añadir CI (GitHub Actions) para lint/build/test en PRs.

## Contribuir

1. Abre un issue describiendo el problema o la mejora.
2. Crea una rama feature/tu-descripcion.
3. Añade tests si corresponde y mantén lint/format.
4. Envía un PR con descripción clara y capturas/ejemplos.

## Contacto y licencia

- Licencia: MIT

## Recursos

- Turborepo: https://turborepo.com/
- Next.js: https://nextjs.org/
- Strapi: https://strapi.io/
- TypeScript: https://www.typescriptlang.org/
