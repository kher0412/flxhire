import { loadStripe, Stripe } from '@stripe/stripe-js'
import { getAPIClient } from 'api'
import { IClientInvoice, IFlexhireConfiguration, IPaymentMethod } from 'types'

export function getStripe(): Promise<Stripe> {
  const w = window as any
  let stripePromise: Promise<Stripe> = w.stripePromise
  if (!stripePromise) {
    stripePromise = loadStripe(process.env.STRIPE_KEY)
    w.stripePromise = stripePromise
  }
  return stripePromise
}

export async function redirectToCheckout(sessionId: string) {
  const stripe = await getStripe()
  const { error } = await stripe.redirectToCheckout({ sessionId })

  if (error) throw error // if the operation fails due to network or browser error

  return sessionId
}

export async function setupCreditCard(callbackUrl?: string) {
  const { session_id: sessionId } = await getAPIClient().setupPaymentMethod('card', callbackUrl)
  await redirectToCheckout(sessionId)
  return sessionId
}

export async function setupSepaDebitBankAccount(callbackUrl?: string) {
  const { session_id: sessionId } = await getAPIClient().setupPaymentMethod('sepa_debit', callbackUrl)
  await redirectToCheckout(sessionId)
  return sessionId
}

export async function completePayment(clientSecret: string, paymentMethodType: string) {
  const stripe = await getStripe()
  let result
  if (paymentMethodType === 'sepa_debit') {
    result = await stripe.confirmSepaDebitPayment(clientSecret)
  } else {
    result = await stripe.confirmCardPayment(clientSecret)
  }
  if (result.error) throw result.error // if the operation fails due to network or browser error
  return result.paymentIntent
}

export function isStripeCard(paymentMethod: IPaymentMethod) {
  return paymentMethod?.payment_method_type === 'card'
}

export function isStripeBankAccount(paymentMethod: IPaymentMethod) {
  return paymentMethod?.payment_method_type && paymentMethod?.payment_method_type !== 'card'
}

export function isCurrencyCompatible(paymentMethod: IPaymentMethod, invoice: IClientInvoice) {
  if (!paymentMethod || !invoice) return null

  const paymentMethodCurrency = paymentMethod?.currency
  if (!paymentMethodCurrency) return true

  return paymentMethodCurrency === invoice.currency
}

export function doesCurrencyForPaymentMethodHaveConversionFees(paymentMethod: IPaymentMethod, configuration: IFlexhireConfiguration) {
  const currency = paymentMethod?.currency || 'USD'

  const exempt = configuration?.currencies_exempt_from_conversion_fee?.indexOf(currency) >= 0
  return !exempt
}

export function hasInsufficientFunds(paymentMethod: IPaymentMethod, invoice: IClientInvoice) {
  if (paymentMethod?.payment_method_type !== 'ach_credit_transfer') return false
  if (!invoice.total_to_pay_client) return false
  if (!paymentMethod.amount_available) return true

  // NOTE: this will mess up if currencies are different

  return invoice.total_to_pay_client > paymentMethod.amount_available
}

export function overSepaLimit(paymentMethod: IPaymentMethod, invoice: IClientInvoice, configuration: IFlexhireConfiguration) {
  if (paymentMethod?.payment_method_type !== 'sepa_debit') return false
  if (!invoice.total_to_pay_client) return false

  return invoice.total_to_pay_client > configuration.sepa_limit
}
