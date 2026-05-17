export function formatPopulation(value) {
  return new Intl.NumberFormat('es-PE').format(value || 0)
}

export function formatArea(value) {
  if (!value) {
    return 'Sin dato disponible'
  }

  return `${new Intl.NumberFormat('es-PE').format(value)} km2`
}

export function formatLanguages(languages) {
  const values = Object.values(languages || {})
  return values.length > 0 ? values.join(', ') : 'Sin datos de idioma'
}

export function formatCurrencies(currencies) {
  const values = Object.values(currencies || {})

  if (values.length === 0) {
    return 'Sin datos de moneda'
  }

  return values
    .map((currency) =>
      currency.symbol ? `${currency.name} (${currency.symbol})` : currency.name,
    )
    .join(', ')
}

export function formatBorders(borders) {
  return borders?.length ? borders.join(', ') : 'Sin fronteras registradas'
}

export function formatTimezones(timezones) {
  return timezones?.length ? timezones.join(', ') : 'Sin zona horaria registrada'
}

export function formatDomains(tld) {
  return tld?.length ? tld.join(', ') : 'Sin dominio registrado'
}

export function formatContinents(continents) {
  return continents?.length ? continents.join(', ') : 'Sin continente registrado'
}

export function formatIndependence(independent) {
  return independent ? 'Si' : 'No'
}
