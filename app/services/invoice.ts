import moment from 'moment'
import { IClientInvoice, IFlexhireConfiguration, IPaymentMethod } from 'types'
import { formatAsCurrency, formatAsDate } from './formatting'
import { isStripeCard } from './stripe'

export const statusTextMap = {
  paid: 'Paid',
  payment_processing: 'Processing',
  not_requested: 'Not Requested',
  requested: 'Requested',
  overdue: 'Overdue',
  not_needed: 'Empty',
}

export function getInvoiceStatusText(invoice: IClientInvoice) {
  return statusTextMap[invoice?.status] || invoice?.status || 'Unknown'
}

export function paymentFeeText(configuration: IFlexhireConfiguration, paymentMethod: IPaymentMethod, invoice: IClientInvoice) {
  let feesParts = []

  const currency = paymentMethod?.currency || invoice?.currency

  if (isStripeCard(paymentMethod)) {
    if (configuration?.credit_card_fixed_fee) {
      feesParts.push(`${formatAsCurrency(configuration.credit_card_fixed_fee, { currency })}`)
    }
    if (configuration?.credit_card_percentage_fee) {
      if (feesParts.length > 0) feesParts.push('plus')
      feesParts.push(`${configuration?.credit_card_percentage_fee}%`)
    }
  }
  if (configuration?.currency_conversion_percentage_fee) {
    const exempt = (configuration?.currencies_exempt_from_conversion_fee || []).indexOf(currency) >= 0
    if (!exempt) {
      if (feesParts.length > 0) feesParts.push('and')
      feesParts.push(`${configuration?.currency_conversion_percentage_fee}% for currency conversion`)
    }
  }

  if (feesParts.length === 0) return null

  return feesParts.join(' ')
}

export function creditCardFeeText(configuration: IFlexhireConfiguration) {
  let creditCardFeesParts = []

  if (configuration?.credit_card_fixed_fee) {
    creditCardFeesParts.push(`${formatAsCurrency(configuration.credit_card_fixed_fee, { symbol: false, currency: 'USD' })}`)
  }
  if (configuration?.credit_card_percentage_fee) {
    if (creditCardFeesParts.length > 0) creditCardFeesParts.push('plus')
    creditCardFeesParts.push(`${configuration?.credit_card_percentage_fee}%`)
  }
  if (configuration?.currency_conversion_percentage_fee) {
    const exemptList = configuration?.currencies_exempt_from_conversion_fee || []
    const nonExemptList = (configuration?.supported_currencies || []).filter(c => exemptList.indexOf(c.code) < 0)
    if (nonExemptList.length > 0) {
      if (creditCardFeesParts.length > 0) creditCardFeesParts.push('and an additional')
      creditCardFeesParts.push(`${configuration?.currency_conversion_percentage_fee}% when paying invoices in ${nonExemptList.join(', ')}`)
    }
  }

  if (creditCardFeesParts.length === 0) return null

  return creditCardFeesParts.join(' ')
}

export function getNextPayoutMoment() {
  const m = moment().utc().startOf('day').add(15, 'hours')
  if (m.isBefore(moment())) return m.add(1, 'days')
  return m
}

export function dueDateText(invoiceDate: string, dueDate: string) {
  if (!dueDate) return null
  if (invoiceDate && dueDate && moment(invoiceDate).isSameOrAfter(moment(dueDate))) {
    return 'Upon receipt'
  }
  return formatAsDate(dueDate)
}

export function dateRangeText(startDate: string, endDate: string) {
  if (!startDate && !endDate) return null
  if (endDate && startDate && startDate !== endDate) {
    return `${formatAsDate(startDate)} - ${formatAsDate(endDate)}`
  }
  if (startDate) return formatAsDate(startDate)
  return formatAsDate(endDate)
}
