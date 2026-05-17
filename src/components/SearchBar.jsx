const SEARCH_OPTIONS = [
  { value: 'name', label: 'Pais' },
  { value: 'capital', label: 'Capital' },
  { value: 'language', label: 'Idioma' },
  { value: 'currency', label: 'Moneda' },
]

function SearchBar({
  searchType,
  searchValue,
  onSearchTypeChange,
  onSearchValueChange,
  onSubmit,
  onClear,
  disabled,
}) {
  return (
    <form className="grid gap-4 lg:grid-cols-[220px_1fr_auto_auto]" onSubmit={onSubmit}>
      <label className="flex flex-col gap-2">
        <span className="text-xs font-semibold uppercase tracking-[0.22em] text-slate-400">
          Tipo de busqueda
        </span>
        <select
          value={searchType}
          onChange={(event) => onSearchTypeChange(event.target.value)}
          className="rounded-2xl border border-white/10 bg-slate-950/70 px-4 py-3 text-sm text-white outline-none transition focus:border-sky-300/40"
        >
          {SEARCH_OPTIONS.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      </label>

      <label className="flex flex-col gap-2">
        <span className="text-xs font-semibold uppercase tracking-[0.22em] text-slate-400">
          Buscador
        </span>
        <div className="flex items-center gap-3 rounded-2xl border border-white/10 bg-slate-950/60 px-4 py-3 transition focus-within:border-sky-300/50 focus-within:shadow-lg focus-within:shadow-sky-500/10">
          <svg
            viewBox="0 0 24 24"
            className="h-5 w-5 text-slate-400"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.8"
            aria-hidden="true"
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="m21 21-4.35-4.35M10.5 18a7.5 7.5 0 1 1 0-15 7.5 7.5 0 0 1 0 15Z" />
          </svg>
          <input
            type="search"
            value={searchValue}
            onChange={(event) => onSearchValueChange(event.target.value)}
            placeholder="Escribe un pais, capital, idioma o moneda"
            className="w-full bg-transparent text-sm text-white outline-none placeholder:text-slate-500"
          />
        </div>
      </label>

      <button
        type="submit"
        disabled={disabled}
        className="self-end rounded-2xl bg-gradient-to-r from-sky-300 to-amber-200 px-5 py-3 text-sm font-semibold text-slate-950 transition hover:-translate-y-0.5 hover:shadow-lg hover:shadow-sky-400/20 disabled:cursor-not-allowed disabled:opacity-60"
      >
        Buscar
      </button>

      <button
        type="button"
        onClick={onClear}
        disabled={disabled}
        className="self-end rounded-2xl border border-white/10 bg-white/6 px-5 py-3 text-sm font-medium text-white transition hover:bg-white/10 disabled:cursor-not-allowed disabled:opacity-60"
      >
        Limpiar
      </button>
    </form>
  )
}

export default SearchBar
