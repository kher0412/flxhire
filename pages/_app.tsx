import React, { memo } from 'react'
import App, { AppProps } from 'next/app'
import { IAPIError, ICurrentUser, INextPageContext } from 'types'
import { connect, ConnectedProps } from 'react-redux'
import { Helmet } from 'react-helmet'
import { getLocationPathname, getBaseURL, extractQueryParams } from 'services/router'
import { init as initAnalytics, trackError, showErrorReportDialog, ctxErrorInfo, setUserInfo, logPageView, trackEvent } from 'services/analytics'
import { registerServiceWorkerOnLoad, initPWAStatus, listenToEvents as listenToPWAEvents } from 'services/pwa'
import { getAuthCookie } from 'services/cookies'
import { getCurrentUser as getCurrentUserAction, setCurrentUser, setConfiguration } from 'reducers/Auth'
import { isDevelopment } from 'services/environment'
import { Layout, RouteChangeListener, ComponentEnvironment } from 'components'
import { nextReduxWrapper, ReduxStore } from 'Store'
import { isIframe } from 'services/iframe'
import { setIsIframe as setIsIframeAction } from 'reducers/Common'
import { setReferer as setRefererAction, setRef as setRefAction } from 'reducers/Tracking'
import { storeRefererInfo, trackTimeSincePageLoad, getRefererFromDocument, storeRefInfo } from 'services/tracking'
import FlexhireAPI from 'api'
import { RootState } from 'reducers'
import { isCypress } from 'services/browserAgent'
import { initializeTimezones } from 'services/timeKeeping'
import { init as initGraphQL } from 'api/graphql'
import { getInitialPreloadedQuery, getRelayProps } from 'relay-nextjs/app'
import { getClientEnvironment } from 'api/graphql/relay/clientEnvironment'
import { isGuest } from 'services/user'
import { isPrerendering } from 'services/prerender'
import { getBuildID, registerFrontendVersion } from 'services/versioning'
import '../app/assets/styles/global.css' // global app styles

// Stuff that needs to run once on both the client and the server

try {
  initializeTimezones()
} catch (error) {
  console.log('Failed to initialize timezones', error)
}

try {
  // On the client side, we init analytics after we have current user data
  if (isPrerendering()) initAnalytics()
} catch (error) {
  console.error(error)
}

try {
  // Run this after initAnalytics for best results
  if (isPrerendering()) registerFrontendVersion().catch(error => trackError(error))
} catch (error) {
  console.error(error)
}

try {
  initGraphQL()
} catch (error) {
  console.error(error)
}

const initialPreloadedQuery = getInitialPreloadedQuery({
  createClientEnvironment: () => getClientEnvironment()!,
})

interface IAppState {
  error: IAPIError
  errorEventId: string
}

const Head = memo(({ unreadMessages, pageUrl }: { unreadMessages: string, pageUrl: string }) => (
  <Helmet
    titleTemplate={`${unreadMessages}%s - Flexhire`}
    defaultTitle={`${unreadMessages}Flexhire - Connecting Talent & Opportunity`}
  >
    <meta charSet="utf-8" />
    <meta name="google-site-verification" content="cicyK9Td3Cp4dM35cFWHOuRaBvmTYANi_73H9oEvjKA" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no" />
    <meta name="title" property="og:title" content="Flexhire - Connecting Talent & Opportunity" />
    <meta name="description" property="og:description" content="Flexhire is a global community of top pre-screened technology talent available for hire." />
    <meta name="theme-color" content="#0057ff" />
    <meta property="og:url" content={pageUrl} />
    <meta property="og:type" content="website" />
    <meta property="og:image" content={`${getBaseURL()}${require('../app/assets/images/logos/flexhire-logo-white.png?url')}`} />
    <meta property="og:site_name" content="Flexhire" />
  </Helmet>
))

const Content = memo(({ Component, disableLayout = false, ...componentProps }: any) => {
  const relayProps = getRelayProps(componentProps, initialPreloadedQuery)
  const env = relayProps.preloadedQuery?.environment ?? getClientEnvironment()

  return (
    <div style={{ height: '100%', overflowY: 'auto' }}>
      {disableLayout ? (
        <Component {...componentProps} {...relayProps} />
      ) : (
        <ComponentEnvironment relayEnvironment={env}>
          <Layout>
            <RouteChangeListener>
              <Component {...componentProps} {...relayProps} />
            </RouteChangeListener>
          </Layout>
        </ComponentEnvironment>
      )}
    </div>
  )
})

class MyApp extends App<AppProps & PropsFromRedux, IAppState> {
  static async getInitialProps({ Component, ctx: nextCtx }) {
    const ctx = nextCtx as INextPageContext
    // If iframe mode is forced, set it now, so that the first render is done in iframe mode.
    const forceIframe = extractQueryParams(ctx.asPath)?.iframe === 'true'
    ctx.store.dispatch(setIsIframeAction(forceIframe))
    const cookie = getAuthCookie(ctx?.req)
    const api = new FlexhireAPI(cookie, ctx.store)
    let currentUser: Partial<ICurrentUser> = { roles: [] }
    if (cookie) {
      try {
        currentUser = await api.getCurrentUser()
        setUserInfo(currentUser)
        ctx.store.dispatch(setCurrentUser({ currentUser }))
      } catch (error) {
        if (error.code !== 401) trackError(error, ctxErrorInfo(ctx))
      }
    }
    if (!currentUser || isGuest(currentUser)) {
      try {
        const configuration = await api.getConfiguration()
        ctx.store.dispatch(setConfiguration({ configuration }))
      } catch (error) {
        trackError(error, ctxErrorInfo(ctx))
      }
    }
    try {
      // Set Cache-Control for pages
      // Can be overridden by the invidual page
      if (ctx?.res) {
        ctx.res.setHeader('Cache-Control', 'max-age=0')
      }

      const pageProps = Component.getInitialProps ? await Component.getInitialProps({ api, currentUser, ...ctx }) : {}

      return { pageProps }
    } catch (error) {
      if (isDevelopment()) throw error
      trackError(error, ctxErrorInfo(ctx))
      return { pageProps: {} }
    }
  }

  state = {
    hasError: false,
    errorEventId: null,
  }

  componentDidMount() {
    const { currentUser, getCurrentUser, setIsIframe, router, referer, setReferer, setRef } = this.props

    try {
      if (!isPrerendering()) initAnalytics(currentUser)
    } catch (error) {
      console.error(error)
    }

    router.events.on('routeChangeComplete', url => logPageView(url))

    // Remove the server-side injected CSS.
    const jssStyles = document.querySelector('#jss-server-side')
    if (jssStyles) {
      jssStyles.parentNode.removeChild(jssStyles)
    }

    const forceIframe = extractQueryParams(router.asPath)?.iframe === 'true'
    setIsIframe(isIframe() || forceIframe)

    // Init browser analytics
    let currentReferer = referer
    if (!currentReferer) {
      currentReferer = getRefererFromDocument()
      setReferer({ referer: currentReferer })
    }
    storeRefererInfo(currentReferer)
    const ref = extractQueryParams(router.asPath).ref
    if (ref) {
      setRef({ ref })
      storeRefInfo(ref)
    }
    try {
      if (currentUser && !isGuest(currentUser)) {
        setUserInfo(currentUser)
      }
    } catch (error) {
      trackError(error)
    }
    const store = (window as any).reduxStore as ReduxStore
    // Init PWA Systems
    try {
      registerServiceWorkerOnLoad(store)
      listenToPWAEvents(store)
      initPWAStatus(store)
    } catch (error) {
      trackError(error)
    }
    // Disable animations in cypress
    try {
      if (isDevelopment() && isCypress()) {
        // When running the app through Cypress, force-disable all animations to improve test speed and reduce animation interference.
        document.body.classList.add('force-disable-anims')
        const originalAnimate = Element.prototype.animate

        Element.prototype.animate = function animate(keyframes, options) {
          originalAnimate.apply(this, [keyframes, { ...options, duration: 0 }])
        } as any
      }
    } catch (error) {
      console.log(error)
    }

    console.log(`Build ID: ${getBuildID() || 'unknown'}`)
    trackEvent(`Build ID: ${getBuildID() || 'unknown'}`)

    getCurrentUser()

    trackTimeSincePageLoad('Application Finished Mounting')
  }

  static getDerivedStateFromProps(props, state) {
    // If there was an error generated within getInitialProps, and we haven't
    // yet seen an error, we add it to this.state here
    return {
      hasError: props.hasError || state.hasError || false,
      errorEventId: props.errorEventId || state.errorEventId || undefined,
    }
  }

  static getDerivedStateFromError() {
    // React Error Boundary here allows us to set state flagging the error (and
    // later render a fallback UI).
    return { hasError: true }
  }

  componentDidCatch(error: Error | IAPIError, errorInfo: any) {
    // Store the event id at this point as we don't have access to it within
    // `getDerivedStateFromError`.
    trackError(error, errorInfo)
      .then(errorEventId => this.setState({ errorEventId, hasError: true }, this.showErrorReportDialog))
  }

  render() {
    const { router, unreadMessagesCount, Component, pageProps = {} } = this.props
    const { hasError } = this.state
    let pageUrl = getBaseURL()
    const pathname = getLocationPathname(router)
    if (pathname !== '/') {
      pageUrl += pathname
    }
    const unreadMessages = unreadMessagesCount > 0 ? `(${unreadMessagesCount}) ` : ''
    return (
      <React.Fragment>
        <Head unreadMessages={unreadMessages} pageUrl={pageUrl} />
        {!hasError && <Content Component={Component} {...pageProps} /> }
      </React.Fragment>
    )
  }

  showErrorReportDialog() {
    const { errorEventId } = this.state
    console.log('Opening Sentry error report Dialog')
    showErrorReportDialog({ eventId: errorEventId })
  }
}

const mapStateToProps = (state: RootState) => ({
  currentUser: state.auth.currentUser,
  referer: state.tracking.referer,
  unreadMessagesCount: state.chat.stats.unread_count,
})

const mapDispatchToProps = dispatch => ({
  getCurrentUser: () => dispatch(getCurrentUserAction()),
  setIsIframe: value => dispatch(setIsIframeAction(value)),
  setReferer: value => dispatch(setRefererAction(value)),
  setRef: value => dispatch(setRefAction(value)),
})

const connector = connect(mapStateToProps, mapDispatchToProps)

export type PropsFromRedux = ConnectedProps<typeof connector>

export default nextReduxWrapper.withRedux(connector(MyApp))
