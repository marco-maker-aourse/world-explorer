# World Explorer

World Explorer es un proyecto academico desarrollado con React, Vite y Tailwind CSS. Consume la API REST Countries v3.1 para construir un buscador avanzado de paises con filtros, multiples endpoints y tarjetas detalladas de informacion geografica.

## Funcionalidades principales

- Busqueda por pais
- Busqueda por capital
- Busqueda por idioma
- Busqueda por moneda
- Filtro por region
- Boton de buscar y boton de limpiar
- Carga inicial de todos los paises
- Estados de carga, error y sin resultados
- Tarjetas responsivas con datos completos de cada pais

## Estructura profesional

```text
src/
|-- components/
|   |-- CountryCard.jsx
|   |-- EmptyState.jsx
|   |-- ErrorMessage.jsx
|   |-- Loading.jsx
|   |-- Navbar.jsx
|   |-- RegionFilter.jsx
|   `-- SearchBar.jsx
|-- services/
|   `-- countryApi.js
|-- utils/
|   `-- countryFormatters.js
|-- App.jsx
|-- index.css
`-- main.jsx
```

## Endpoints usados

- `GET /v3.1/all`
- `GET /v3.1/name/{country}`
- `GET /v3.1/name/{country}?fullText=true`
- `GET /v3.1/capital/{capital}`
- `GET /v3.1/currency/{currency}`
- `GET /v3.1/lang/{language}`
- `GET /v3.1/region/{region}`

## Como funciona el buscador

1. Al iniciar la aplicacion, `useEffect` consulta todos los paises.
2. El usuario elige un tipo de busqueda y escribe un valor.
3. Al presionar el boton Buscar o la tecla Enter, se normaliza el texto.
4. `services/countryApi.js` decide que endpoint usar.
5. Si el usuario tambien elige una region, los resultados se filtran o consultan por esa region.
6. React actualiza el estado y renderiza dinamicamente las tarjetas encontradas.

## Manejo de estados en React

- `searchValue`: texto escrito por el usuario
- `searchType`: modo de busqueda
- `selectedRegion`: region elegida
- `countries`: lista actual de resultados
- `loading`: indica si la API sigue respondiendo
- `error`: almacena mensajes de error de la consulta
- `searchNotice`: muestra un resumen informativo del resultado

## Como se consume la API

La integracion se encuentra en `src/services/countryApi.js`. Esa capa:

- centraliza la URL base
- agrega los campos necesarios en cada endpoint
- normaliza el texto de entrada
- maneja respuestas 404 como resultado vacio
- lanza errores claros si la API falla

## Renderizado dinamico

Los paises recibidos desde la API se guardan en el estado `countries`. Luego la aplicacion usa `.map()` para crear una tarjeta por cada pais. Esta tecnica permite que la interfaz se actualice automaticamente cuando cambian los datos.

## Aporte de Tailwind CSS

Tailwind CSS permite construir una interfaz moderna con clases utilitarias, logrando:

- diseno responsive
- sombras y bordes elegantes
- espaciado consistente
- estados hover
- transiciones suaves

## Mejoras futuras

- paginacion
- favoritos
- comparador entre paises
- historial de busquedas
- panel de estadisticas con graficos
- soporte multilenguaje

## Desarrollo local

```bash
npm install
npm run dev
```

## Build de produccion

```bash
npm run build
```

## Deploy en GitHub Pages

El proyecto ya incluye el workflow `.github/workflows/deploy.yml`.

Pasos:

1. En GitHub entra al repositorio `world-explorer`.
2. Ve a `Settings > Pages`.
3. En `Source`, selecciona `GitHub Actions`.
4. Haz push a `main`.
5. GitHub compilara y publicara la aplicacion automaticamente.

La URL esperada sera:

```text
https://marco-maker-aourse.github.io/world-explorer/
```
