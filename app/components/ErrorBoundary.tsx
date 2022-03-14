import React from 'react'
import { showErrorReportDialog, trackError } from 'services/analytics'
import { IAPIError } from 'types'

interface IErrorBoundaryProps {
  children: React.ReactNode
  showErrorReportDialog?: boolean
  FallbackComponent?: React.ElementType<{ error: IAPIError }> | React.ReactElement
}

interface IErrorBoundaryState {
  error: any
  eventId: string
}

class ErrorBoundary extends React.PureComponent<IErrorBoundaryProps, IErrorBoundaryState> {
  state = {
    error: null,
    eventId: null,
  }

  static getDerivedStateFromError(error) {
    // Catch error
    return { error }
  }

  componentDidCatch(error, errorInfo) {
    // Track error then open error report dialog
    trackError(error, errorInfo)
      .then(eventId => this.setState({ eventId }, this.showErrorReportDialog))
  }

  render() {
    const { children, FallbackComponent } = this.props
    const { error } = this.state
    if (error) {
      // Do not render children because there has been a rendering error
      if (FallbackComponent) {
        if (React.isValidElement(FallbackComponent)) return FallbackComponent
        return <FallbackComponent error={error} />
      }
      return null
    }
    // when there's not an error, render children
    return children
  }

  showErrorReportDialog = () => {
    if (this.props.showErrorReportDialog) {
      const { eventId } = this.state
      console.log('Opening Sentry error report Dialog')
      showErrorReportDialog({ eventId })
    }
  }
}

export default ErrorBoundary
