# Bibliotech

Sistema de gestión de biblioteca que facilita el registro de libros, la gestión de préstamos para estudiantes y docentes, y la visualización de disponibilidad, plazos de entrega y retrasos. Además incorpora roles de acceso diferenciados (estudiante, docente, administrador).

## Propósito

La biblioteca de una institución educativa suele enfrentar dificultades en el control y la trazabilidad de los préstamos: procesos manuales, registros dispersos y falta de visibilidad en tiempo real sobre la disponibilidad del material. Bibliotech ofrece una solución centralizada para:
- Registrar y catalogar ejemplares.
- Gestionar préstamos y devoluciones.
- Priorizar y diferenciar privilegios entre roles (ej. docentes vs. estudiantes).
- Mostrar tiempos de entrega y alertas por retrasos.

## Características principales

- Registro y búsqueda de libros (ISBN, autor, categoría).
- Gestión de préstamos y reservas.
- Control de disponibilidad y estado (disponible, prestado, reservado).
- Notificaciones de vencimiento y retraso.
- Roles y permisos (estudiante, docente, administrador).
- Paneles básicos para usuarios y administración.

## Requisitos

- Node.js (16+ recomendado)
- npm / yarn / pnpm

## Inicio rápido

Clona el repositorio y arranca el monorepo con Turborepo:

```sh
git clone https://github.com/YeiserBytes/library-system-app
cd ./library-system-app

# Instalar dependencias (elige tu gestor)
npm install
# o
pnpm install
# o
bun install

# Ejecutar en modo desarrollo (turborepo)
npx turbo dev
# o si tienes turbo global:
# turbo dev
```

## Estructura del proyecto

- apps/
  - client/      -> Frontend (Next.js)
  - server/     -> Documentación (Next.js)

(Todas las apps y paquetes están escritas en TypeScript.)

## Desarrollo

- Ejecuta linters y formateo:
  - npm run lint
  - npm run format

- Construir todo:
  - npx turbo build
  - Para construir un paquete específico: npx turbo build --filter=web

- Correr sólo una app en desarrollo:
  - npx turbo dev --filter=web

## Caché remoto (opcional)

Turborepo admite remote caching (p. ej. con Vercel) para compartir artefactos entre máquinas:

```sh
npx turbo login
npx turbo link
```

## Contribuir

1. Abre un issue describiendo el cambio o bug.
2. Crea una rama feature/issue-descripción.
3. Haz un PR explicando los cambios.
4. Mantén tests y linters verdes antes de solicitar revisión.

<!--
## Licencia y contacto
- Licencia: MIT (ajusta según corresponda).
- Contacto: maintainer@example.com
-->

## Recursos útiles

- Turborepo: https://turborepo.com/
- Next.js: https://nextjs.org/
- TypeScript: https://www.typescriptlang.org/
