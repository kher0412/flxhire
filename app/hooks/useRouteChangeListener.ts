import { useEffect } from 'react'
import { Router } from 'next/router'

interface RouteChangeListenerOptions {
  onRouteChangeStart?: () => void
  onRouteChangeDone?: () => void
  onRouteChangeError?: () => void
}

export const useRouteChangeListener = (options: RouteChangeListenerOptions) => {
  useEffect(() => {
    Router.events.on('routeChangeStart', options.onRouteChangeStart)
    Router.events.on('routeChangeComplete', options.onRouteChangeDone)
    // NOTE: routeChangeError event passes a 'error' argument to the callback. Noting this here in case
    // we need this in the future
    Router.events.on('routeChangeError', options.onRouteChangeError)

    return () => {
      Router.events.off('routeChangeStart', options.onRouteChangeStart)
      Router.events.off('routeChangeComplete', options.onRouteChangeDone)
      Router.events.off('routeChangeError', options.onRouteChangeError)
    }
  }, [])
}
