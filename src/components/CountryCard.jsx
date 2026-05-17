import {
  formatArea,
  formatBorders,
  formatContinents,
  formatCurrencies,
  formatDomains,
  formatIndependence,
  formatLanguages,
  formatPopulation,
  formatTimezones,
} from '../utils/countryFormatters'

function CountryCard({ country }) {
  return (
    <article className="group overflow-hidden rounded-[2rem] border border-white/10 bg-white/7 p-5 shadow-xl shadow-slate-950/20 transition duration-300 hover:-translate-y-1 hover:border-sky-300/30 hover:shadow-2xl hover:shadow-slate-950/30">
      <div className="grid gap-4 sm:grid-cols-[1.2fr_0.8fr]">
        <img
          src={country.flags?.svg || country.flags?.png}
          alt={`Bandera de ${country.name.common}`}
          className="h-48 w-full rounded-[1.5rem] object-cover"
        />

        <div className="flex items-center justify-center rounded-[1.5rem] border border-white/10 bg-slate-950/45 p-4">
          {country.coatOfArms?.svg || country.coatOfArms?.png ? (
            <img
              src={country.coatOfArms.svg || country.coatOfArms.png}
              alt={`Escudo de ${country.name.common}`}
              className="max-h-36 w-auto object-contain"
            />
          ) : (
            <span className="text-center text-sm text-slate-400">
              Escudo no disponible
            </span>
          )}
        </div>
      </div>

      <div className="mt-5 flex items-start justify-between gap-4">
        <div>
          <h3 className="font-display text-2xl font-semibold text-white">
            {country.name.common}
          </h3>
          <p className="mt-1 text-sm text-slate-400">
            {country.name.official || 'Sin nombre oficial'}
          </p>
        </div>
        <span className="rounded-full border border-white/10 bg-white/6 px-3 py-1 text-xs uppercase tracking-[0.2em] text-slate-300">
          {country.cca3 || '---'}
        </span>
      </div>

      <div className="mt-5 grid gap-3 text-sm text-slate-200 sm:grid-cols-2">
        <InfoItem label="Capital" value={country.capital?.join(', ') || 'Sin capital registrada'} />
        <InfoItem label="Region" value={country.region || 'Sin region'} />
        <InfoItem label="Subregion" value={country.subregion || 'Sin subregion'} />
        <InfoItem label="Continente" value={formatContinents(country.continents)} />
        <InfoItem label="Poblacion" value={formatPopulation(country.population)} />
        <InfoItem label="Area territorial" value={formatArea(country.area)} />
        <InfoItem label="Idiomas" value={formatLanguages(country.languages)} />
        <InfoItem label="Monedas" value={formatCurrencies(country.currencies)} />
        <InfoItem label="Zona horaria" value={formatTimezones(country.timezones)} />
        <InfoItem label="Dominio" value={formatDomains(country.tld)} />
        <InfoItem label="Codigo" value={[country.cca2, country.cca3].filter(Boolean).join(' / ') || 'Sin codigo'} />
        <InfoItem label="Independiente" value={formatIndependence(country.independent)} />
        <InfoItem label="Fronteras" value={formatBorders(country.borders)} fullWidth />
      </div>

      <div className="mt-5 flex flex-wrap gap-3">
        <a
          href={country.maps?.googleMaps || country.maps?.openStreetMaps}
          target="_blank"
          rel="noreferrer"
          className="inline-flex items-center justify-center rounded-2xl bg-gradient-to-r from-sky-300 to-amber-200 px-4 py-3 text-sm font-semibold text-slate-950 transition hover:-translate-y-0.5"
        >
          Abrir en Google Maps
        </a>
      </div>
    </article>
  )
}

function InfoItem({ label, value, fullWidth = false }) {
  return (
    <div
      className={`rounded-2xl border border-white/8 bg-slate-950/35 p-3 ${
        fullWidth ? 'sm:col-span-2' : ''
      }`}
    >
      <p className="text-[11px] uppercase tracking-[0.18em] text-slate-500">
        {label}
      </p>
      <p className="mt-2 leading-6 text-slate-100">{value}</p>
    </div>
  )
}

export default CountryCard
