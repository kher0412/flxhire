import moment from 'moment-timezone'

export const generateTimezoneName = (timezone, withExtraText = true, withAbbreviation = true) => {
  const sign = timezone.value < 0 ? '-' : '+'
  const hours = Math.abs(timezone.value).toString().padStart(2, '0')
  const minutes = timezone.minutes || '00'
  const offset = `(UTC${sign}${hours}:${minutes})`
  const abbreviation = timezone.abbreviation && withAbbreviation ? `${timezone.abbreviation} - ` : ''
  return `${offset} ${abbreviation}${timezone.name}${timezone.extraText && withExtraText ? ` ${timezone.extraText}` : ''}`
}

export const setUTCOffset = (date: moment.MomentInput, offset: number) => moment(date).utcOffset(offset, true)

// For aliases, see: https://github.com/rails/rails/blob/master/activesupport/lib/active_support/values/time_zone.rb
export const rawTimezones = [
  { value: -11, name: 'American Samoa', alias: 'Pacific/Pago_Pago' },
  { value: -11, name: 'International Date Line West', alias: 'Etc/GMT+12' }, // ??? https://en.wikipedia.org/wiki/UTC−12:00
  { value: -11, name: 'Midway Island', alias: 'Pacific/Pago_Pago' },
  { value: -11, name: 'Samoa', alias: 'Pacific/Apia' },
  { value: -10, name: 'Hawaii', alias: 'Pacific/Honolulu' },
  { value: -9, name: 'Alaska', alias: 'America/Anchorage' },
  { value: -8, name: 'Pacific Time', extraText: '(US & Canada)', alias: 'America/Los_Angeles', abbreviation: 'PST' },
  { value: -8, name: 'Tijuana', alias: 'America/Tijuana' },
  { value: -7, name: 'Mountain Time', extraText: '(US & Canada)', alias: 'America/Denver', abbreviation: 'PDT' },
  { value: -7, name: 'Arizona', alias: 'America/Phoenix' },
  { value: -7, name: 'America/Phoenix' },
  { value: -7, name: 'Mazatlan', alias: 'America/Mazatlan' },
  { value: -6, name: 'Central America', alias: 'America/Guatemala' },
  { value: -6, name: 'Guadalajara', alias: 'America/Mexico_City' },
  { value: -6, name: 'Mexico City', alias: 'America/Mexico_City' },
  { value: -6, name: 'Monterrey', alias: 'America/Monterrey' },
  { value: -6, name: 'Saskatchewan', alias: 'America/Regina' },
  { value: -5, name: 'Eastern Time', extraText: '(US & Canada)', alias: 'America/New_York', abbreviation: 'EST' },
  { value: -5, name: 'Bogota', alias: 'America/Bogota' },
  { value: -5, name: 'Indiana', extraText: '(East)', alias: 'America/Fort_Wayne' }, // ???
  { value: -5, name: 'Lima', alias: 'America/Lima' },
  { value: -5, name: 'Quito', alias: 'America/Lima' },
  { value: -4, name: 'Central Time', extraText: '(US & Canada)', alias: 'America/Chicago', abbreviation: 'EDT' },
  { value: -4, name: 'Atlantic Time', extraText: 'Canada', alias: 'America/Halifax' },
  { value: -4, name: 'Caracas', alias: 'America/Caracas' },
  { value: -4, name: 'Georgetown', alias: 'America/Guyana' },
  { value: -4, name: 'La Paz', alias: 'America/La_Paz' },
  { value: -4, name: 'Santiago', alias: 'America/Santiago' },
  { value: -3, minutes: 30, name: 'Newfoundland', alias: 'America/St_Johns' },
  { value: -3, name: 'Brasilia', alias: 'America/Sao_Paulo' },
  { value: -3, name: 'Buenos Aires', alias: 'America/Argentina/Buenos_Aires' },
  { value: -3, name: 'Greenland', alias: 'America/Godthab' },
  { value: -3, name: 'Montevideo', alias: 'America/Montevideo' },
  { value: -2, name: 'Mid-Atlantic', alias: 'Atlantic/South_Georgia' },
  { value: -1, name: 'Azores', alias: 'Atlantic/Azores' },
  { value: -1, name: 'Cape Verde Is.', alias: 'Atlantic/Cape_Verde' },
  { value: 0, name: 'Casablanca', alias: 'Africa/Casablanca' },
  { value: 0, name: 'Dublin', alias: 'Europe/Dublin' },
  { value: 0, name: 'Edinburgh', alias: 'Europe/London' },
  { value: 0, name: 'Lisbon', alias: 'Europe/Lisbon' },
  { value: 0, name: 'London', alias: 'Europe/London' },
  { value: 0, name: 'Monrovia', alias: 'Africa/Monrovia' },
  { value: 0, name: 'UTC', alias: 'Etc/UTC' },
  { value: 1, name: 'Amsterdam', alias: 'Europe/Amsterdam', abbreviation: 'CET' },
  { value: 1, name: 'Belgrade', alias: 'Europe/Belgrade' },
  { value: 1, name: 'Berlin', alias: 'Europe/Berlin' },
  { value: 1, name: 'Bern', alias: 'Europe/Zurich' },
  { value: 1, name: 'Bratislava', alias: 'Europe/Prague' },
  { value: 1, name: 'Brussels', alias: 'Europe/Brussels' },
  { value: 1, name: 'Budapest', alias: 'Europe/Budapest' },
  { value: 1, name: 'Copenhagen', alias: 'Europe/Copenhagen' },
  { value: 1, name: 'Ljubljana', alias: 'Europe/Belgrade' },
  { value: 1, name: 'Madrid', alias: 'Europe/Madrid' },
  { value: 1, name: 'Paris', alias: 'Europe/Paris' },
  { value: 1, name: 'Prague', alias: 'Europe/Prague' },
  { value: 1, name: 'Rome', alias: 'Europe/Rome' },
  { value: 1, name: 'Sarajevo', alias: 'Europe/Belgrade' },
  { value: 1, name: 'Skopje', alias: 'Europe/Belgrade' },
  { value: 1, name: 'Stockholm', alias: 'Europe/Stockholm' },
  { value: 1, name: 'Vienna', alias: 'Europe/Vienna' },
  { value: 1, name: 'Warsaw', alias: 'Europe/Warsaw' },
  { value: 1, name: 'West Central Africa', alias: 'Africa/Algiers' },
  { value: 1, name: 'Zagreb', alias: 'Europe/Belgrade' },
  { value: 1, name: 'Zurich', alias: 'Europe/Zurich' },
  { value: 2, name: 'Athens', alias: 'Europe/Athens', abbreviation: 'CEST' },
  { value: 2, name: 'Bucharest', alias: 'Europe/Bucharest' },
  { value: 2, name: 'Cairo', alias: 'Africa/Cairo' },
  { value: 2, name: 'Harare', alias: 'Africa/Maputo' },
  { value: 2, name: 'Helsinki', alias: 'Europe/Helsinki' },
  { value: 2, name: 'Jerusalem', alias: 'Asia/Jerusalem' },
  { value: 2, name: 'Kaliningrad', alias: 'Europe/Kaliningrad' },
  { value: 2, name: 'Kyiv', alias: 'Europe/Kiev' },
  { value: 2, name: 'Pretoria', alias: 'Africa/Johannesburg' },
  { value: 2, name: 'Riga', alias: 'Europe/Riga' },
  { value: 2, name: 'Sofia', alias: 'Europe/Sofia' },
  { value: 2, name: 'Tallinn', alias: 'Europe/Tallinn' },
  { value: 2, name: 'Vilnius', alias: 'Europe/Vilnius' },
  { value: 3, name: 'Baghdad', alias: 'Asia/Baghdad' },
  { value: 3, name: 'Instanbul', alias: 'Europe/Istanbul' },
  { value: 3, name: 'Kuwait', alias: 'Asia/Kuwait' },
  { value: 3, name: 'Minsk', alias: 'Europe/Minsk' },
  { value: 3, name: 'Moscow', alias: 'Europe/Moscow' },
  { value: 3, name: 'Nairobi', alias: 'Africa/Nairobi' },
  { value: 3, name: 'Riydah', alias: 'Asia/Riyadh' },
  { value: 3, name: 'St. Petersburg', alias: 'Europe/Moscow' },
  { value: 3, name: 'Volgograd', alias: 'Europe/Volgograd' },
  { value: 3, name: 'Tehran', alias: 'Asia/Tehran' },
  { value: 4, name: 'Abu Dhabi', alias: 'Asia/Dubai' },
  { value: 4, name: 'Baku', alias: 'Asia/Baku' },
  { value: 4, name: 'Muscat', alias: 'Asia/Dubai' },
  { value: 4, name: 'Samara', alias: 'Europe/Samara' },
  { value: 4, name: 'Tbilisi', alias: 'Asia/Tbilisi' },
  { value: 4, name: 'Yerevan', alias: 'Asia/Yerevan' },
  { value: 4, minutes: 30, name: 'Kabul', alias: 'Asia/Kabul' },
  { value: 5, name: 'Ekaterinburg', alias: 'Asia/Yekaterinburg' },
  { value: 5, name: 'Islamabad', alias: 'Europe/Istanbul' },
  { value: 5, name: 'Karachi', alias: 'Asia/Karachi' },
  { value: 5, name: 'Tashkent', alias: 'Asia/Tashkent' },
  { value: 5, minutes: 30, name: 'Chennai', alias: 'Asia/Kolkata' },
  { value: 5, minutes: 30, name: 'Kolkata', alias: 'Asia/Kolkata' },
  { value: 5, minutes: 30, name: 'Mumbai', alias: 'Asia/Kolkata' },
  { value: 5, minutes: 30, name: 'New Dehli', alias: 'Asia/Kolkata' },
  { value: 5, minutes: 30, name: 'Sri Jayawardenepura', alias: 'Asia/Colombo' },
  { value: 5, minutes: 45, name: 'Kathmandu', alias: 'Asia/Kathmandu' },
  { value: 6, name: 'Almaty', alias: 'Asia/Almaty' },
  { value: 6, name: 'Astana', alias: 'Asia/Dhaka' },
  { value: 6, name: 'Dhaka', alias: 'Asia/Dhaka' },
  { value: 6, name: 'Urumqi', alias: 'Asia/Urumqi' },
  { value: 6, minutes: 30, name: 'Rangoon', alias: 'Asia/Rangoon' },
  { value: 7, name: 'Bangkok', alias: 'Asia/Bangkok' },
  { value: 7, name: 'Hanoi', alias: 'Asia/Bangkok' },
  { value: 7, name: 'Jakarta', alias: 'Asia/Jakarta' },
  { value: 7, name: 'Krasno', alias: 'Asia/Krasnoyarsk' },
  { value: 7, name: 'Krasnoyarsk', alias: 'Asia/Krasnoyarsk' },
  { value: 7, name: 'Novosibirsk', alias: 'Asia/Novosibirsk' },
  { value: 8, name: 'Beijing', alias: 'Asia/Shanghai' },
  { value: 8, name: 'Chongqing', alias: 'Asia/Shanghai' },
  { value: 8, name: 'Hong Kong', alias: 'Asia/Hong_Kong' },
  { value: 8, name: 'Irkutsk', alias: 'Asia/Irkutsk' },
  { value: 8, name: 'Kuala Lumpur', alias: 'Asia/Kuala_Lumpur' },
  { value: 8, name: 'Perth', alias: 'Australia/Perth' },
  { value: 8, name: 'Singapore', alias: 'Asia/Kuala_Lumpur' },
  { value: 8, name: 'Taipei', alias: 'Asia/Taipei' },
  { value: 8, name: 'Ulaanbaatar', alias: 'Asia/Ulaanbaatar' },
  { value: 9, name: 'Osaka', alias: 'Asia/Tokyo' },
  { value: 9, name: 'Sapporo', alias: 'Asia/Tokyo' },
  { value: 9, name: 'Seoul', alias: 'Asia/Seoul' },
  { value: 9, name: 'Tokyo', alias: 'Asia/Tokyo' },
  { value: 9, name: 'Yakutsk', alias: 'Asia/Yakutsk' },
  { value: 9, minutes: 30, name: 'Adelaide', alias: 'Australia/Adelaide' },
  { value: 9, minutes: 30, name: 'Darwin', alias: 'Australia/Darwin' },
  { value: 10, name: 'Brisbane', alias: 'Australia/Brisbane' },
  { value: 10, name: 'Canberra', alias: 'Australia/Melbourne' },
  { value: 10, name: 'Guam', alias: 'Pacific/Guam' },
  { value: 10, name: 'Hobart', alias: 'Australia/Hobart' },
  { value: 10, name: 'Melbourne', alias: 'Australia/Melbourne' },
  { value: 10, name: 'Port Moresby', alias: 'Pacific/Port_Moresby' },
  { value: 10, name: 'Sydney', alias: 'Australia/Sydney' },
  { value: 10, name: 'Vladivostok', alias: 'Asia/Vladivostok' },
  { value: 11, name: 'Magadan', alias: 'Asia/Magadan' },
  { value: 11, name: 'New Caledonia', alias: 'Pacific/Noumea' },
  { value: 11, name: 'Solomon Is.', alias: 'Pacific/Guadalcanal' },
  { value: 11, name: 'Srednekolymsk', alias: 'Asia/Srednekolymsk' },
  { value: 12, name: 'Auckland', alias: 'Pacific/Auckland' },
  { value: 12, name: 'Fiji', alias: 'Pacific/Fiji' },
  { value: 12, name: 'Kamchatka', alias: 'Asia/Kamchatka' },
  { value: 12, name: 'Marshall Is.', alias: 'Pacific/Majuro' },
  { value: 12, name: 'Wellington', alias: 'Pacific/Auckland' },
  { value: 12, minutes: 45, name: 'Chatham Is.', alias: 'Pacific/Chatham' },
  { value: 13, name: 'Nukuʻalofa', alias: 'Pacific/Tongatapu' },
  { value: 13, name: 'Tokelau Is.', alias: 'Pacific/Fakaofo' },
]

export const timezones = rawTimezones.map(timezone => ({ ...timezone, title: generateTimezoneName(timezone, true, false) }))

const MAX_NAME_LENGTH = 40

export const compactTimezones = (rawTimezones.reduce((list: any = [], current) => {
  if (list.length > 0) {
    const last = list[list.length - 1]
    if (last.value === current.value && last.minutes === current.minutes) {
      let alias = last.alias || []
      let abbreviation = last.abbreviation || current.abbreviation
      if (current.alias) alias.push(current.alias)
      let name = last.name
      if (name.length < MAX_NAME_LENGTH) {
        name += `, ${current.name}`
      } else if (!/\.\.\.$/.test(name)) {
        name += '...'
      }
      return list.slice(0, -1).concat({ ...last, name, alias, abbreviation })
    }
    return list.concat({ ...current, alias: [current.alias], abbreviation: current.abbreviation })
  }
  return [{ ...current, alias: [current.alias], abbreviation: current.abbreviation }]
}) as any).map(timezone => ({ ...timezone, title: generateTimezoneName(timezone, false, true) }))
  .sort((first, second) => first.value - second.value)

// NOTE: using `moment()` here without `new` makes this crash in Jest for some reason
export const defaultTimezone = parseInt((new (moment as any)()).format('Z') as string, 10)

export const initializeTimezones = () => {
  moment.tz.link(timezones.map(timezone => `${timezone.title}|${timezone.alias}`))
  moment.tz.link(compactTimezones.map(timezone => `${timezone.title}|${timezone.alias}`))
}

export const detectTimezoneName = () => moment.tz.guess()

export const detectTimezoneOffset = () => {
  try {
    // see https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date/getTimezoneOffset
    const negativeOffsetInMinutes = moment().toDate().getTimezoneOffset()
    return (-1 * negativeOffsetInMinutes) / 60
  } catch (error) {
    console.error(error)
  }
  return null
}

export const timezoneStringToValue = (str) => {
  if (typeof str !== 'string') return null
  if (str === 'GMT' || str === 'UTC') return 0
  const match = str.match(/[+-]\d{2}/)
  if (match && match[0]) return parseInt(match[0], 10)
  return null
}

export const timezoneValueToString = (offset) => {
  if (offset === null || offset === undefined) return null
  if (offset === 0) return 'UTC'
  return `UTC${offset > 0 ? '+' : ''}${offset}`
}

export const timezoneValueToObject = (offset) => {
  if (offset === null || offset === undefined) return null
  const i = parseInt(offset, 10)
  return compactTimezones.find(obj => obj.value === i)
}

export const DATE_PATTERN = 'YYYY-MM-DD'
