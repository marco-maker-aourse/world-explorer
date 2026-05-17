const BASE_URL = 'https://restcountries.com/v3.1'
const COUNTRY_FIELDS = [
  'name',
  'flags',
  'capital',
  'region',
  'subregion',
  'continents',
  'population',
  'languages',
  'currencies',
  'maps',
  'timezones',
  'borders',
  'area',
  'coatOfArms',
  'cca2',
  'cca3',
  'tld',
  'independent',
].join(',')

function normalizeText(text) {
  return text.trim().replace(/\s+/g, ' ')
}

async function requestCountries(endpoint, signal) {
  const response = await fetch(`${BASE_URL}${endpoint}`, { signal })

  if (response.status === 404) {
    return []
  }

  if (!response.ok) {
    throw new Error('No fue posible consultar la informacion de paises.')
  }

  return response.json()
}

function withFields(endpoint) {
  const separator = endpoint.includes('?') ? '&' : '?'
  return `${endpoint}${separator}fields=${COUNTRY_FIELDS}`
}

export function normalizeSearchValue(value) {
  return normalizeText(value).toLowerCase()
}

export function getAllCountries(signal) {
  return requestCountries(withFields('/all'), signal)
}

export function getCountriesByRegion(region, signal) {
  return requestCountries(
    withFields(`/region/${encodeURIComponent(region)}`),
    signal,
  )
}

export async function searchCountries({
  query,
  searchType,
  region = 'all',
  signal,
}) {
  const normalizedQuery = normalizeText(query)
  let results = []

  if (!normalizedQuery) {
    results =
      region === 'all'
        ? await getAllCountries(signal)
        : await getCountriesByRegion(region, signal)
  } else {
    if (searchType === 'name') {
      const exactMatch = await requestCountries(
        withFields(
          `/name/${encodeURIComponent(normalizedQuery)}?fullText=true`,
        ),
        signal,
      )

      results =
        exactMatch.length > 0
          ? exactMatch
          : await requestCountries(
              withFields(`/name/${encodeURIComponent(normalizedQuery)}`),
              signal,
            )
    }

    if (searchType === 'capital') {
      results = await requestCountries(
        withFields(`/capital/${encodeURIComponent(normalizedQuery)}`),
        signal,
      )
    }

    if (searchType === 'currency') {
      results = await requestCountries(
        withFields(`/currency/${encodeURIComponent(normalizedQuery)}`),
        signal,
      )
    }

    if (searchType === 'language') {
      results = await requestCountries(
        withFields(`/lang/${encodeURIComponent(normalizedQuery)}`),
        signal,
      )
    }

    if (region !== 'all') {
      results = results.filter(
        (country) => country.region?.toLowerCase() === region,
      )
    }
  }

  return [...results].sort((left, right) =>
    left.name.common.localeCompare(right.name.common),
  )
}
