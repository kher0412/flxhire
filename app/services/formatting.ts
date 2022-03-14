import { capitalize } from 'lodash'
import accounting from 'accounting'
import { Moment, MomentInput } from 'moment'
import moment from 'moment-timezone'
import { Currency } from 'types'

// Keep these in sync with the formats on the backend (see intializers/date_formats.rb file)
export const DATE_FORMAT_INTERNAL = 'YYYY-MM-DD'
export const DATE_TIME_FORMAT_SHORT = 'MMM DD h:mm a'
export const DATE_TIME_FORMAT = 'MMM Do YYYY h:mm a'
export const DATE_FORMAT_SHORT = 'MMM DD, YYYY'
export const DATE_FORMAT = 'MMM Do YYYY'

const DOLLAR_SYMBOL = '$'

export type CurrencyInput = string | Currency

export type CurrencyFormattingOptions = {
  withCents?: boolean
  removeEmptyCents?: boolean
  roundToThousands?: boolean
  currency: CurrencyInput
  symbol?: false | string
}

export const normalizeCurrency = (input: CurrencyInput): Currency => typeof input === 'string' ? { code: input } : input

export const currencyToSymbol = (currencyInput: CurrencyInput) => {
  const currency = normalizeCurrency(currencyInput)
  if (!currency || (typeof currency !== 'string' && typeof currency !== 'object')) return DOLLAR_SYMBOL

  // This trick leverages the browser's locale based formatting to get the symbol
  // From: https://stackoverflow.com/a/19374099
  try {
    const num = 0
    return num.toLocaleString('en', { style: 'currency', currency: currency.code.toUpperCase() }).replace(/\d+([,.]\d+)?/g, '')
  } catch (err) {
    console.error(err)
  }

  return DOLLAR_SYMBOL
}

export const currencyToShortSymbol = (currency: CurrencyInput) => {
  const symbol = currencyToSymbol(currency)

  // Manually shorten the symbol if it's too long
  if (symbol === 'MX$') return '$'
  if (symbol?.length > 1) return DOLLAR_SYMBOL

  return symbol
}

export const roundCurrency = (amount: number) => {
  if (!amount) return amount

  return Math.round(amount * 100) / 100
}

const getDefaultCurrencyFormattingOptions = () => ({
  withCents: true,
  removeEmptyCents: true,
} as CurrencyFormattingOptions)

export const formatAsCurrency = (value: number, optionsOverride: CurrencyFormattingOptions) : string => {
  if (!optionsOverride.currency) return null
  if (isNaN(value)) return null
  const options = { ...getDefaultCurrencyFormattingOptions(), ...optionsOverride }

  if (options?.roundToThousands) {
    value = Math.round(value / 1000)
  }

  // accounting docs: http://openexchangerates.github.io/accounting .js/#methods
  let formatted = accounting.formatMoney(value, {
    symbol: options?.symbol === false ? '' : (currencyToSymbol(options?.currency) || '$'),
    decimal: '.',
    thousand: ',',
    precision: options?.withCents ? 2 : 0,
  })
  if (options?.removeEmptyCents) formatted = formatted.replace(/\.00$/, '')

  if (options?.roundToThousands) {
    formatted += 'k'
  }

  return formatted
}

export const unformatCurrency = (formattedText: string) : number => {
  return accounting.unformat(formattedText)
}

export const formatAsReadableFileSize = (bytes: number, isSi = true) => {
  const multiplication = isSi ? 1000 : 1024
  if (Math.abs(bytes) < multiplication) {
    return `${bytes} B`
  }
  const units = isSi ? ['kB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'] : ['KiB', 'MiB', 'GiB', 'TiB', 'PiB', 'EiB', 'ZiB', 'YiB']
  let unitIndex = -1
  do {
    bytes /= multiplication
    ++unitIndex
  } while (Math.abs(bytes) >= multiplication && unitIndex < units.length - 1)
  return `${bytes.toFixed(1)}  ${units[unitIndex]}`
}

const isValidInput = (date: MomentInput) => moment(date).isValid()

export const formatAsDateTime = (date: MomentInput) => isValidInput(date) ? moment(date).format(DATE_TIME_FORMAT) : date

export const formatAsShortDateTime = (date: MomentInput) => isValidInput(date) ? moment(date).format(DATE_TIME_FORMAT_SHORT) : date

export const formatAsDate = (date: MomentInput) => isValidInput(date) ? moment(date).format(DATE_FORMAT) : date

export const formatAsShortDate = (date: MomentInput) => isValidInput(date) ? moment(date).format(DATE_FORMAT_SHORT) : date

export const formatAsTitleCase = (text: string) => text?.split(' ')?.map((part: any) => capitalize(part))?.join(' ')

export const normalizeEmail = (value: string) => value?.trim()?.toLowerCase()

export type DateLike = string | Date | Moment | MomentInput

export const ensureMoment = (value: DateLike) => isValidInput(value) ? moment(value) : null

export const ensureDate = (value: DateLike) => ensureMoment(value)?.toDate()

// it's important to keep the timezone offset. If we don't, we'll send the wrong date to the server
export const ensureDateAsString = (value: DateLike) => ensureMoment(value)?.toISOString(true)

export const ensureDateTimeAsString = ensureDateAsString

export const getTimeParts = (durationInSeconds: number) => {
  if (!durationInSeconds || durationInSeconds < 0) return null

  const hours = Math.floor(durationInSeconds / 3600)
  const minutes = Math.floor(durationInSeconds / 60)
  const seconds = durationInSeconds % 60

  return {
    hours,
    minutes,
    seconds,
  }
}

export const formatDuration = (hours: number, minutes: number) => {
  if (!hours && !minutes) return null
  if (!minutes) return `${hours}h`
  if (!hours) return `${minutes}m`

  return `${hours}h ${minutes}m`
}

export const formatDurationInSeconds = (durationInSeconds: number) : string => {
  const parts = getTimeParts(durationInSeconds)
  if (!parts) return null

  const stringParts = []
  if (parts.hours > 0) stringParts.push(`${parts.hours} hour${parts.hours > 1 ? 's' : ''}`)
  if (parts.minutes > 0) stringParts.push(`${parts.minutes} minute${parts.minutes > 1 ? 's' : ''}`)
  if (parts.seconds > 0) stringParts.push(`${parts.seconds} second${parts.seconds > 1 ? 's' : ''}`)

  if (stringParts.length > 0) return stringParts.join(', ')

  return null
}

export function formatAsShortDateRange(startDate: MomentInput, endDate: MomentInput) {
  const startText = formatAsShortDate(startDate) || 'N/A'
  const endText = formatAsShortDate(endDate) || 'N/A'
  if (startText === endText) return startText

  return `${startText} - ${endText}`
}
