import { map, find, get, flatten } from 'lodash'
import { getName, getCodes } from 'country-list'
import { formatAsTitleCase } from './formatting'

const ENDPOINT = 'https://api.tiles.mapbox.com'
const SOURCE = 'mapbox.places'
const HEADERS = {
  'Content-Type': 'application/json',
}

export interface LocationData {
  id: string
  longitude: number
  latitude: number
  bounds: any
  city: string
  region: string
  country: string
  postcode: string
  placeName: string
}

export async function autocompleteLocation(query: string, types: string = 'place') : Promise<LocationData[]> {
  if (!query) return []

  let accessToken = process.env.MAPBOX_KEY
  let url = `${ENDPOINT}/geocoding/v5/${SOURCE}/${encodeURIComponent(query)}.json?types=${types}&access_token=${accessToken}`
  let response = await fetch(url, { headers: HEADERS })
  let responseJson = await response.json()

  if (responseJson.features) {
    return map(responseJson.features, (feature) => {
      let center = get(feature, 'center', [0, 0])
      let bounds = get(feature, 'bounds', [center[0] - 1, center[1] - 1, center[0] + 1, center[1] + 1])
      let featureType = get(feature, 'place_type[0]', '')

      let city = (featureType === 'place') ? get(feature, 'text') : undefined

      if (!city) {
        city = find(feature.context, ctx => ctx.id.startsWith('place'))
        city = get(city, 'text', '')
      }

      let country = find(feature.context, ctx => ctx.id.startsWith('country'))
      let region = find(feature.context, ctx => ctx.id.startsWith('region'))
      let postcode = find(feature.context, ctx => ctx.id.startsWith('postcode'))

      return {
        id: `${center[0]},${center[1]}`,
        longitude: center[0],
        latitude: center[1],
        bounds,
        city,
        region: get(region, 'text', ''),
        country: get(country, 'text', ''),
        postcode: get(postcode, 'text', ''),
        placeName: get(feature, 'place_name', ''),
      }
    })
  }
  return []
}

export function adjustCountryName(name: string) : string {
  // Note: only use this when viewing names.
  // This is to display names in a prettier way for some specific countries
  if (!name) return null
  const l = name.toLowerCase().trim()
  if (l === 'russian federation') return 'Russia'
  if (l === 'czechia') return 'Czech Republic'
  if (l === 'moldova, republic of') return 'Moldova'
  if (l === 'united states of america') return 'United States'
  if (l === 'united kingdom of great britain and northern ireland') return 'United Kingdom'
  if (l === 'bolivia, plurinational state of') return 'Bolivia'
  return formatAsTitleCase(l)
}

export function getCountryCodes() : string[] {
  return getCodes()
}

export function getCountryName(code: string) {
  if (!code) return null
  return adjustCountryName(getName(code)) || code
}

export function getCountryGroups() {
  return {
    Europe: [
      'at', 'be', 'bg', 'hr', 'cy', 'cz', 'dk', 'ee', 'fi', 'fr', 'de', 'gr', 'hu', 'ie',
      'it', 'lv', 'lt', 'lu', 'mt', 'nl', 'pl', 'pt', 'ro', 'sk', 'si', 'es', 'se',
      'al', 'ad', 'am', 'by', 'ba', 'fo', 'ge', 'gi', 'is', 'im', 'xk', 'li', 'mk', 'md',
      'mc', 'me', 'no', 'ru', 'sm', 'rs', 'ch', 'tr', 'ua', 'gb', 'va',
    ],
    'European Union': [
      'at', 'be', 'bg', 'hr', 'cy', 'cz', 'dk', 'ee', 'fi', 'fr', 'de', 'gr', 'hu', 'ie',
      'it', 'lv', 'lt', 'lu', 'mt', 'nl', 'pl', 'pt', 'ro', 'sk', 'si', 'es', 'se',
    ],
    'North America': ['us', 'ca'],
    'Central America': ['bz', 'gt', 'ni', 'pa', 'cr', 'sv', 'mx', 'hn'],
    'South America': [
      'br', 'co', 'ar', 'pe', 've', 'cl', 'ec', 'bo', 'py', 'uy',
      'gy', 'gf', 'sr', 'fk', 'mx',
    ],
    Africa: [
      // Note: BI is Burundi but it does not work
      'ng', 'ne', 'et', 'cd', 'cf', 'cg', 'eg', 'eh', 'ke', 'tz', 'ug', 'ma',
      'dz', 'za', 'sd', 'mz', 'gh', 'ao', 'so', 'ci', 'mg', 'cm', 'bf', 'mw',
      'zm', 'ml', 'sn', 'zw', 'td', 'tn', 'gn', 'rw', 'bi', 'ss',
      'er', 'sl', 'tg', 'ly', 'mr', 'lr', 'na', 'bw', 'ls', 'gm', 'ga',
      'gw', 'gq', 'sz', 'dj', 're', 'km', 'me', 'cv', 'yt', 'st', 'sc', 'sh',
    ],
    'Eastern Europe & Russia': [
      'ru', 'ad', 'ee', 'by', 'ge', 'mk', 'ua', 'rs', 'md', 'al',
    ],
    Asia: [
      'cn', 'in', 'kz', 'ir', 'mn', 'id', 'pk', 'tr',
      'mm', 'af', 'ye', 'th', 'tm', 'uz', 'iq', 'jp',
      'vn', 'my', 'om', 'ph', 'la', 'kg', 'sy', 'kh', 'bd',
      'np', 'tj', 'kp', 'kr', 'jo', 'az', 'ge',
      'ae', 'lk', 'bt', 'tw', 'am', 'il', 'kw', 'tl',
      'qa', 'lb', 'cy', 'ps', 'bn', 'bh', 'sg', 'mv',
    ],
  }
}

export function getCountryGroupNames() {
  return Object.keys(getCountryGroups())
}

export function getCountryGroup(name: string) {
  return getCountryGroups()[name]
}

export function flattenCountryGroups(list: string[]) {
  const groups = getCountryGroups()
  return flatten(list.map(l => groups[l] || l))
}
