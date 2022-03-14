import { useCallback } from 'react'
import { IAPIError } from 'types'
import { trackError } from 'services/analytics'
import { getErrorText } from 'services/error'
import { PayloadError } from 'relay-runtime'
import { useSnackbar } from './redux'

export function useErrorDisplayer(options: { track?: boolean } = { track: true }) {
  const showSnackbarMessage = useSnackbar()
  const displayError = useCallback((error: IAPIError | Error) => {
    if (options?.track) trackError(error)
    showSnackbarMessage(getErrorText(error))
  }, [showSnackbarMessage])
  const displayMutationErrors = useCallback((errors: readonly PayloadError[]) => {
    // TODO: handle multiple errors
    if (errors?.length > 0) {
      if (options?.track) trackError(errors[0])
      showSnackbarMessage(getErrorText(errors[0]))
      return true
    }
    return false
  }, [showSnackbarMessage])
  return {
    displayError,
    displayMutationErrors,
  }
}
