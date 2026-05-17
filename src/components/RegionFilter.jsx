const REGION_OPTIONS = [
  { value: 'all', label: 'Todas' },
  { value: 'africa', label: 'Africa' },
  { value: 'americas', label: 'America' },
  { value: 'asia', label: 'Asia' },
  { value: 'europe', label: 'Europa' },
  { value: 'oceania', label: 'Oceania' },
]

function RegionFilter({ selectedRegion, onRegionChange }) {
  return (
    <label className="flex flex-col gap-2">
      <span className="text-xs font-semibold uppercase tracking-[0.22em] text-slate-400">
        Region
      </span>
      <select
        value={selectedRegion}
        onChange={(event) => onRegionChange(event.target.value)}
        className="rounded-2xl border border-white/10 bg-slate-950/70 px-4 py-3 text-sm text-white outline-none transition focus:border-sky-300/40"
      >
        {REGION_OPTIONS.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </label>
  )
}

export default RegionFilter
