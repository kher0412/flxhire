import React, {
  // eslint-disable-next-line no-restricted-imports
  Suspense as ReactSuspense,
  SuspenseProps as ReactSuspenseProps,
} from 'react'
import { useIsPrerendering } from 'hooks'
import { IAPIError } from 'types'
import ErrorBoundary from './ErrorBoundary'

interface SuspenseProps extends Omit<ReactSuspenseProps, 'fallback'> {
  fallback?: any
  ErrorFallbackComponent?: React.ElementType<{ error: IAPIError }> | false
  showErrorReportDialog?: boolean
  forceSuspend?: boolean

  /** If set, render children during SSR. Note: this requires that no lazy loaded graph queries are used in the rendered subtree. */
  ssr?: boolean
}

const Suspense = ({ children, ssr = false, fallback = null, showErrorReportDialog, ErrorFallbackComponent, forceSuspend, ...props }: SuspenseProps) => {
  const prerendering = useIsPrerendering()
  let element = children
  if (forceSuspend || (prerendering && !ssr)) {
    if (fallback) return fallback
    return null
  }

  if (!prerendering || !ssr) {
    element = <ReactSuspense fallback={fallback} {...props}>{element}</ReactSuspense>
  }

  // NOTE: make sure to NOT pass undefined as fallback to React's Suspense or it will error out!!!
  return (
    <ErrorBoundary
      FallbackComponent={ErrorFallbackComponent === false ? null : ErrorFallbackComponent || fallback}
      showErrorReportDialog={showErrorReportDialog}
    >
      {element}
    </ErrorBoundary>
  )
}

export default Suspense
