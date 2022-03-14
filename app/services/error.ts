import { PayloadError } from 'relay-runtime'
import { IAPIError } from 'types'
import { isProduction } from './environment'

export function isPayloadError(error: any) : error is PayloadError {
  return Boolean(error?.locations && error?.path)
}

export function getErrorTitle(error: IAPIError | Error | PayloadError) : string {
  const defaultMessage = 'Something went wrong'
  if (isPayloadError(error)) return defaultMessage
  if (error?.name === 'BillingPlanIncompatibleError') return 'Upgrade your Plan to access this feature'
  if (error?.name === 'BillingSetupRequiredError') return 'Set up your account first'
  return defaultMessage
}

export function getErrorDescription(error: IAPIError | Error | PayloadError) : string {
  if (!error) return null
  if (isPayloadError(error) && ((error as any)?.extensions?.name) === 'ActiveRecord::RecordInvalid') return error.message
  if (isPayloadError(error) || (error.name === 'RelayNetwork' && isProduction())) return 'An error has occured while communicating to Flexhire'
  if (error.name === 'BillingPlanIncompatibleError') return 'This feature is not available in your current billing plan. Use the button below to check upgrade options.'
  if (error.name === 'BillingSetupRequiredError') return 'Before continuing, finish your account setup using the button below'
  if (error.name === 'BillingOverdueInvoicesError') return 'Before continuing, you must pay overdue invoices'
  return (error as any).response || error.message
}

export function getErrorText(error: IAPIError | Error | PayloadError) {
  // Use this if you want to display a unified error text, instead of separated title and description
  return getErrorDescription(error) || getErrorTitle(error)
}

export function errorToObject(error: IAPIError | Error | PayloadError) : IAPIError {
  // This method is useful to normalize / strip out unwanted properties from an error, for example to put it in redux

  if (!error) return null

  let name = isPayloadError(error) ? 'RelayNetwork' : error.name
  name = name || 'Error'

  return {
    name,
    message: error.message || 'Unknown Error',
    response: (error as IAPIError).response,
    code: (error as IAPIError).code,
  } as IAPIError
}
