# ABM de Usuarios – Challenge Dux Software

Este proyecto es la solución al challenge técnico de Dux Software.  
Consiste en un ABM de usuarios desarrollado con **Next.js 14**, **React**, **Typescript** y **PrimeReact**.

La aplicación permite listar, crear, editar y eliminar usuarios, además de filtrar y buscar por nombre/apellido.  
También incluye paginación y validaciones en los formularios.

---

## Tecnologías

- Next.js 14 (App Router)
- React 18
- Typescript
- PrimeReact + PrimeFlex
- CSS
- API rest (json-server)

---

## API

La API utilizada es:

https://staging.duxsoftware.com.ar/api-test/personal


El parámetro **sector** es obligatorio en todas las peticiones.  
En mi caso, el sector asignado fue:

sector=7000


Ejemplo de endpoint usado:

https://staging.duxsoftware.com.ar/api-test/personal?sector=7000&_page=1&_limit=10


---

## Funcionalidades

- Listado de usuarios
- Crear usuario
- Editar usuario
- Eliminar usuario
- Búsqueda por nombre o apellido
- Filtro por estado (Habilitado / Deshabilitado)
- Paginación
- Formularios con validaciones
- Refresco automático del listado después de cada operación

---

## Notas técnicas

- Las llamadas a la API se hacen en componentes **server-side**, como pide la consigna.
- Para manejar el estado de carga, el proyecto utiliza **React Suspense** desde `layout.tsx`.
- Se usó una estructura inspirada en Atomic Design para organizar los componentes.
- La tabla y los formularios están construidos con PrimeReact para mantener el estilo del diseño de Figma.

---

## Instalación

1. Clonar el repositorio:

```bash
git clone https://github.com/tuUsuario/AlisonRoa-ChallengeDux.git

Instalar dependencias:

cd client
npm install

Levantar el proyecto:

npm run dev

Desarrollado por Alison Roa para el challenge técnico de Dux Software.