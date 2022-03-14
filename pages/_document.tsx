import React from 'react'
import { trackError, showErrorReportDialog, ctxErrorInfo } from 'services/analytics'
import Document, { Head, Html, Main, NextScript } from 'next/document'
import Helmet from 'react-helmet'
import { ServerStyleSheets } from '@material-ui/styles'
import { RelayDocument } from 'relay-nextjs/document'
import { createWiredDocument } from 'withPreloadedQuery'

class MyDocument extends Document<{ helmet: Helmet.HelmetData, relayDocument: RelayDocument }> {
  // should render on <html>
  get helmetHtmlAttrComponents() {
    return this.props.helmet.htmlAttributes.toComponent()
  }

  // should render on <body>
  get helmetBodyAttrComponents() {
    return this.props.helmet.bodyAttributes.toComponent()
  }

  // should render on <head>
  get helmetHeadComponents() {
    return Object.keys(this.props.helmet)
      .filter(el => el !== 'htmlAttributes' && el !== 'bodyAttributes')
      .map(el => this.props.helmet[el].toComponent())
  }

  render() {
    const { relayDocument } = this.props

    return (
      <Html lang="en">
        <Head>
          {this.helmetHeadComponents}

          <style>{`
            html {
              display: none;
            }
          `}
          </style>

          <link rel="manifest" href="/manifest.json" />

          <link rel="shortcut icon" type="image/png" href={require('../app/assets/app-icons/favicons/favicon-red.png')} />

          <link rel="apple-touch-icon" href={require('../app/assets/app-icons/ios/Red/app-icon-ipad.png')} />
          <link rel="icon" sizes="192x192" href={require('../app/assets/app-icons/android/Red/ic_launcher_xxxhdpi.png')} />

          <link rel="apple-touch-icon" sizes="152x152" href={require('../app/assets/app-icons/ios/Red/app-icon-ipad.png')} />
          <link rel="apple-touch-icon" sizes="76x76" href={require('../app/assets/app-icons/ios/Red/app-icon-ipad.png')} />
          <link rel="apple-touch-icon" sizes="120x120" href={require('../app/assets/app-icons/ios/Red/app-icon-iphone@2x.png')} />
          <link rel="apple-touch-icon" sizes="180x180" href={require('../app/assets/app-icons/ios/Red/app-icon-iphone@3x.png')} />
          <link rel="apple-touch-icon" sizes="167x167" href={require('../app/assets/app-icons/ios/Red/app-icon-ipad.png')} />

          <link href="https://cdnjs.cloudflare.com/ajax/libs/slick-carousel/1.3.15/slick.css" rel="stylesheet" />
          <link href="https://fonts.googleapis.com/css?family=Roboto:300,400,500&display=swap" rel="stylesheet" type="text/css" />

          <script src="https://www.google.com/recaptcha/api.js?render=explicit&hl=en" async defer />

          {process.env.GA_TRACKING_ID && (
            <React.Fragment>
              <script
                async
                src={`https://www.googletagmanager.com/gtag/js?id=${process.env.GA_TRACKING_ID}`}
              />
              <script
                dangerouslySetInnerHTML={{
                  __html: `
                  window.dataLayer = window.dataLayer || [];
                  function gtag(){dataLayer.push(arguments);}
                  gtag('js', new Date());
                  gtag('config', '${process.env.GA_TRACKING_ID}', {
                    page_path: window.location.pathname,
                  });
                `,
                }}
              />
            </React.Fragment>
          )}

          <relayDocument.Script />
        </Head>
        <body {...this.helmetBodyAttrComponents}>
          <Main />
          <NextScript />
        </body>
      </Html>
    )
  }
}

MyDocument.getInitialProps = async (ctx) => {
  // Resolution order
  //
  // On the server:
  // 1. app.getInitialProps
  // 2. page.getInitialProps
  // 3. document.getInitialProps
  // 4. app.render
  // 5. page.render
  // 6. document.render
  //
  // On the server with error:
  // 1. document.getInitialProps
  // 2. app.render
  // 3. page.render
  // 4. document.render
  //
  // On the client
  // 1. app.getInitialProps
  // 2. page.getInitialProps
  // 3. app.render
  // 4. page.render

  // Render app and page and get the context of the page with collected side effects.
  const originalRenderPage = ctx.renderPage
  const sheets = new ServerStyleSheets()
  // We use our custom function to create the "relayDocument" because the original one has issues and limitations
  const relayDocument = createWiredDocument(sheets)

  ctx.renderPage = () => {
    try {
      return originalRenderPage({
        // Here we combine the Material-UI SSR Style enhancement with the Relay enhancement
        enhanceApp: App => relayDocument.enhance(App),
      })
    } catch (error) {
      // This error is quite fatal
      trackError(error, ctxErrorInfo(ctx)).then(errorId => showErrorReportDialog({ errorId }))
      return originalRenderPage()
    }
  }

  const initialProps = await Document.getInitialProps(ctx)

  return {
    ...initialProps,
    // Styles fragment is rendered after the app and page rendering finish.
    styles: [...React.Children.toArray(initialProps.styles), sheets.getStyleElement()],
    // Helmet
    helmet: Helmet.renderStatic(),
    // Relay
    relayDocument,
  }
}

export default MyDocument
