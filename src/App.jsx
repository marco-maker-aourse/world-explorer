import { useEffect, useState } from 'react'
import CountryCard from './components/CountryCard'
import EmptyState from './components/EmptyState'
import ErrorMessage from './components/ErrorMessage'
import Loading from './components/Loading'
import Navbar from './components/Navbar'
import RegionFilter from './components/RegionFilter'
import SearchBar from './components/SearchBar'
import { getAllCountries, normalizeSearchValue, searchCountries } from './services/countryApi'
import { formatPopulation } from './utils/countryFormatters'

function App() {
  const [countries, setCountries] = useState([])
  const [searchValue, setSearchValue] = useState('')
  const [submittedQuery, setSubmittedQuery] = useState('')
  const [searchType, setSearchType] = useState('name')
  const [selectedRegion, setSelectedRegion] = useState('all')
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [searchNotice, setSearchNotice] = useState('')

  useEffect(() => {
    const controller = new AbortController()

    const loadInitialCountries = async () => {
      setLoading(true)
      setError('')

      try {
        const data = await getAllCountries(controller.signal)
        setCountries(data.sort((left, right) =>
          left.name.common.localeCompare(right.name.common),
        ))
        setSearchNotice('Mostrando el listado general de paises.')
      } catch (fetchError) {
        if (fetchError.name !== 'AbortError') {
          setError(fetchError.message || 'No fue posible cargar los paises.')
        }
      } finally {
        if (!controller.signal.aborted) {
          setLoading(false)
        }
      }
    }

    loadInitialCountries()

    return () => controller.abort()
  }, [])

  const totalPopulation = countries.reduce(
    (accumulator, country) => accumulator + (country.population || 0),
    0,
  )

  const handleSearch = async (event) => {
    event.preventDefault()

    const normalizedQuery = normalizeSearchValue(searchValue)

    if (!normalizedQuery && selectedRegion === 'all') {
      setError('Escribe un valor de busqueda o selecciona una region.')
      return
    }

    const controller = new AbortController()

    setLoading(true)
    setError('')
    setSubmittedQuery(normalizedQuery)

    try {
      const data = await searchCountries({
        query: normalizedQuery,
        searchType,
        region: selectedRegion,
        signal: controller.signal,
      })

      setCountries(data)
      setSearchNotice(buildSearchNotice(normalizedQuery, searchType, selectedRegion, data.length))
    } catch (fetchError) {
      if (fetchError.name !== 'AbortError') {
        setCountries([])
        setError(fetchError.message || 'Ocurrio un error al buscar paises.')
      }
    } finally {
      setLoading(false)
    }
  }

  const handleClear = async () => {
    const controller = new AbortController()

    setSearchValue('')
    setSubmittedQuery('')
    setSearchType('name')
    setSelectedRegion('all')
    setLoading(true)
    setError('')

    try {
      const data = await getAllCountries(controller.signal)
      setCountries(data.sort((left, right) =>
        left.name.common.localeCompare(right.name.common),
      ))
      setSearchNotice('Se restablecio el listado completo de paises.')
    } catch (fetchError) {
      if (fetchError.name !== 'AbortError') {
        setError(fetchError.message || 'No fue posible limpiar la consulta.')
      }
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="relative min-h-screen overflow-hidden bg-slate-950 text-slate-100">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_left,_rgba(56,189,248,0.16),_transparent_30%),radial-gradient(circle_at_top_right,_rgba(251,191,36,0.16),_transparent_28%),radial-gradient(circle_at_bottom,_rgba(14,165,233,0.12),_transparent_26%)]" />
      <div className="pointer-events-none absolute inset-x-0 top-0 h-96 bg-gradient-to-b from-sky-400/10 to-transparent blur-3xl" />

      <Navbar />

      <main className="relative mx-auto flex w-full max-w-7xl flex-col gap-8 px-4 py-8 sm:px-6 lg:px-8 lg:py-12">
        <section className="grid gap-6 xl:grid-cols-[1.25fr_0.75fr]">
          <article className="rounded-[2rem] border border-white/12 bg-white/8 p-6 shadow-2xl shadow-slate-950/30 backdrop-blur-xl sm:p-8">
            <span className="inline-flex rounded-full border border-sky-300/25 bg-sky-300/10 px-3 py-1 text-xs font-semibold uppercase tracking-[0.25em] text-sky-100/80">
              Exploracion mundial
            </span>
            <h1 className="mt-5 max-w-4xl font-display text-4xl font-semibold leading-tight text-white sm:text-5xl">
              Consulta paises por nombre, capital, idioma, moneda o region.
            </h1>
            <p className="mt-4 max-w-3xl text-sm leading-7 text-slate-300 sm:text-base">
              El buscador avanzado de World Explorer permite comparar datos
              territoriales, simbolos oficiales, zonas horarias y codigos de
              cada pais desde una sola interfaz.
            </p>

            <div className="mt-8 grid gap-4 sm:grid-cols-3">
              <MetricCard label="Resultados actuales" value={loading ? '--' : countries.length} />
              <MetricCard
                label="Poblacion acumulada"
                value={loading ? '--' : formatPopulation(totalPopulation)}
              />
              <MetricCard label="Estado de consulta" value={loading ? 'Cargando' : 'Listo'} />
            </div>
          </article>

          <aside className="rounded-[2rem] border border-amber-200/20 bg-gradient-to-br from-amber-300/12 via-white/6 to-sky-300/12 p-6 shadow-2xl shadow-slate-950/20 backdrop-blur-xl">
            <p className="text-xs font-semibold uppercase tracking-[0.25em] text-amber-100/75">
              Que puedes consultar
            </p>
            <div className="mt-5 space-y-4 text-sm leading-7 text-slate-200">
              <p>Busca por pais, capital, idioma o moneda con un solo formulario.</p>
              <p>Refina el resultado por region y revisa datos geograficos completos.</p>
              <p>Cada tarjeta resume informacion oficial y enlaza directamente al mapa.</p>
            </div>
          </aside>
        </section>

        <section className="rounded-[2rem] border border-white/10 bg-slate-900/70 p-5 shadow-xl shadow-slate-950/20 backdrop-blur-xl sm:p-6">
          <div className="grid gap-4 xl:grid-cols-[1fr_260px]">
            <SearchBar
              searchType={searchType}
              searchValue={searchValue}
              onSearchTypeChange={setSearchType}
              onSearchValueChange={setSearchValue}
              onSubmit={handleSearch}
              onClear={handleClear}
              disabled={loading}
            />
            <RegionFilter
              selectedRegion={selectedRegion}
              onRegionChange={setSelectedRegion}
            />
          </div>

          {error ? <div className="mt-4"><ErrorMessage message={error} /></div> : null}

          {!error ? (
            <div className="mt-4 rounded-2xl border border-white/8 bg-slate-950/35 px-4 py-3 text-sm text-slate-300">
              {searchNotice}
            </div>
          ) : null}
        </section>

        <section className="space-y-6">
          {loading ? <Loading /> : null}

          {!loading && countries.length === 0 ? (
            <EmptyState
              title="No se encontraron resultados"
              description="Verifica el termino ingresado, prueba otro tipo de busqueda o cambia la region seleccionada."
            />
          ) : null}

          {!loading && countries.length > 0 ? (
            <div className="grid gap-6 xl:grid-cols-2">
              {countries.map((country) => (
                <CountryCard key={country.cca3 || country.name.common} country={country} />
              ))}
            </div>
          ) : null}
        </section>

        <section className="rounded-[2rem] border border-white/10 bg-white/7 p-6 shadow-xl shadow-slate-950/20 backdrop-blur-xl">
          <h2 className="font-display text-2xl font-semibold text-white">
            Explicacion academica
          </h2>
          <div className="mt-5 grid gap-4 lg:grid-cols-2">
            <AcademicItem
              title="Como funciona el buscador"
              text="El usuario selecciona un tipo de busqueda, escribe un termino y opcionalmente aplica una region. Al enviar el formulario, React ejecuta una consulta a la API y actualiza el estado con los resultados."
            />
            <AcademicItem
              title="Como se consume la API"
              text="La logica HTTP se centraliza en services/countryApi.js. Desde ahi se construyen los endpoints, se normaliza el texto, se manejan errores y se filtran los resultados por region cuando es necesario."
            />
            <AcademicItem
              title="Endpoints utilizados"
              text="La aplicacion usa /all para la carga inicial, /name y /name?fullText=true para nombres, /capital para capitales, /currency para monedas, /lang para idiomas y /region para filtros regionales."
            />
            <AcademicItem
              title="Estados en React"
              text="useState controla el valor buscado, el tipo de consulta, la region, la lista de paises, el estado de carga, los errores y los mensajes informativos. useEffect se usa para cargar todos los paises al iniciar."
            />
            <AcademicItem
              title="Resultados dinamicos"
              text="Cuando la API responde, React vuelve a renderizar la interfaz y genera las tarjetas de forma dinamica con map(). Si no hay resultados, se muestra un estado vacio; si falla la consulta, aparece un mensaje de error."
            />
            <AcademicItem
              title="Aporte de Tailwind CSS"
              text="Tailwind CSS acelera el diseno responsive con clases utilitarias, permitiendo crear componentes modernos, consistentes y con transiciones suaves sin escribir grandes hojas de estilo personalizadas."
            />
            <AcademicItem
              title="Mejoras futuras"
              text="Se podria agregar paginacion, favoritos, comparacion entre paises, historial de busquedas, temas de color, traducciones adicionales y un panel estadistico con graficos."
            />
            <AcademicItem
              title="Consulta actual"
              text={
                submittedQuery
                  ? `Ultima busqueda: ${submittedQuery} en el modo ${searchType}.`
                  : 'La aplicacion se encuentra mostrando el listado general o resultados filtrados por region.'
              }
            />
          </div>
        </section>
      </main>
    </div>
  )
}

function MetricCard({ label, value }) {
  return (
    <div className="rounded-3xl border border-white/10 bg-slate-900/70 p-4">
      <p className="text-sm text-slate-400">{label}</p>
      <p className="mt-2 text-2xl font-semibold text-white">{value}</p>
    </div>
  )
}

function AcademicItem({ title, text }) {
  return (
    <article className="rounded-3xl border border-white/8 bg-slate-950/35 p-4">
      <h3 className="font-display text-lg font-semibold text-white">{title}</h3>
      <p className="mt-2 text-sm leading-7 text-slate-300">{text}</p>
    </article>
  )
}

function buildSearchNotice(query, searchType, region, total) {
  const searchLabels = {
    name: 'pais',
    capital: 'capital',
    language: 'idioma',
    currency: 'moneda',
  }

  const regionLabels = {
    all: 'todas las regiones',
    africa: 'Africa',
    americas: 'America',
    asia: 'Asia',
    europe: 'Europa',
    oceania: 'Oceania',
  }

  if (!query) {
    return `Mostrando ${total} resultados para la region ${regionLabels[region]}.`
  }

  return `Busqueda por ${searchLabels[searchType]}: "${query}" en ${regionLabels[region]}. Resultados encontrados: ${total}.`
}

export default App
