// There are actually more error types. Add them here when needed by consumer code
export type IErrorType = 'Error' | 'GenericAPIError' | 'BillingSetupRequiredError' | 'BillingPlanIncompatibleError'

export interface IAPIError extends Error {
  response?: string
  code?: number
  name: IErrorType
}
