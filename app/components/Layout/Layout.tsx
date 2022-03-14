import React from 'react'
import clsx from 'clsx'
import { Snackbar } from '@material-ui/core'
import dynamic from 'services/dynamic'
import { extractQueryParams } from 'services/router'
import { isInteger } from 'services/numbers'
import { isClient, isGuest } from 'services/user'
import Condition from 'components/Condition'
import ConditionSwitch from 'components/ConditionSwitch'
import { Footer } from './components/Footer'
import Header from './components/Header'
import UpdateAvailable from './components/UpdateAvailable'
import styles from './Layout.module.css'
import { ContainerProps } from './LayoutContainer'
import InvoiceBlockedDialog from './components/InvoiceBlockedDialog'
import BillingSetupDialog from './components/BillingSetupDialog'
import Sidebar from './components/Sidebar'

const ChatBubble = dynamic(() => import(/* webpackChunkName: "ChatBubble" */'components/ChatBubble')) as any
const MaskDialog = dynamic(() => import(/* webpackChunkName: "MaskDialog" */'components/MaskDialog')) as any
const GlobalErrorDisplay = dynamic(() => import(/* webpackChunkName: "GlobalErrorDisplay" */'./components/GlobalErrorDisplay')) as any

class Layout extends React.Component<ContainerProps, {}> {
  resizeObserver: ResizeObserver

  wrapper: HTMLDivElement

  componentDidMount() {
    if (this.props.isIframe) {
      this.createResizeObserver()
    }
  }

  componentDidUpdate() {
    if (this.props.isIframe && !this.resizeObserver) {
      this.createResizeObserver()
    }
  }

  componentWillUnmount() {
    if (this.resizeObserver) {
      this.resizeObserver.unobserve(this.wrapper)
    }
  }

  renderSnackbar() {
    const { snackbar, isIframe } = this.props

    if (isIframe) return null

    return (
      <Snackbar
        open={snackbar.open}
        key={snackbar.message}
        message={snackbar.message}
        // we use className instead of data-cy because with className we can
        // force cypress to wait for the snackbar to be open before running assertions
        // and that improves stability of the tests
        className={`snackbar snackbar-${snackbar.open ? 'open' : 'closed'}`}
      />
    )
  }

  renderPWAStatus() {
    const { isIframe } = this.props

    if (!isIframe) {
      return (
        <UpdateAvailable />
      )
    }

    return null
  }

  render() {
    const {
      drawer,
      user,
      children,
      router,
      isIframe,
      maskDialogOpen,
      invoiceBlockedDialogOpen,
      billingSetupDialogOpen,
      globalError,
      closeMaskDialog,
      closeInvoiceBlockedDialog,
      closeBillingSetupDialog,
    } = this.props

    const query = extractQueryParams(router.asPath)
    const guest = !user || isGuest(user)
    let autoOpenChatThread: any = guest ? null : query.chat_thread

    if (isInteger(autoOpenChatThread)) autoOpenChatThread = parseInt(autoOpenChatThread, 10)

    let autoOpenChatUser: any = guest ? null : query.chat_user

    if (isInteger(autoOpenChatUser)) autoOpenChatUser = parseInt(autoOpenChatUser, 10)

    const autoOpenProfileFeedbackChat = guest ? null : query.open_profile_feedback_chat === 'true'
    const autoOpenChat = guest ? null : query.open_chat === 'true'
    const noLayout = Boolean(query.layout === 'false' || isIframe || globalError)

    return (
      <div
        className={styles['app-container']}
        id="app-container"
        style={noLayout ? { padding: '6px 6px 0 6px', boxSizing: 'border-box', overflowY: 'hidden' } : undefined}
      >
        {!noLayout && (
          isClient(user) ? (<Sidebar />) : (<Header />)
        )}

        <div
          className={clsx(styles.contentContainer, {
            [styles.contentContainerShift]: (drawer.desktop && isClient(user)),
          })}
          ref={div => this.wrapper = div}
        >
          <ConditionSwitch>
            <Condition condition={Boolean(globalError)}>
              <GlobalErrorDisplay globalError={globalError} />
            </Condition>
            <Condition condition={!globalError}>
              {children}
            </Condition>
          </ConditionSwitch>
          {this.renderSnackbar()}
        </div>

        {!noLayout && (
          <React.Fragment>
            <div className={styles['fab-container']}>
              {this.renderPWAStatus()}

              <InvoiceBlockedDialog
                open={invoiceBlockedDialogOpen}
                onClose={closeInvoiceBlockedDialog}
              />

              {isClient(user) && (
                <BillingSetupDialog
                  open={billingSetupDialogOpen}
                  onClose={closeBillingSetupDialog}
                />
              )}

              <ChatBubble
                autoOpenChat={autoOpenChat}
                autoOpenProfileFeedbackChat={autoOpenProfileFeedbackChat}
                autoOpenChatThreadId={autoOpenChatThread}
                autoOpenChatUserId={autoOpenChatUser}
              />

              {maskDialogOpen && <MaskDialog open onClose={closeMaskDialog} />}
            </div>

            <Footer />
          </React.Fragment>
        )}
      </div>
    )
  }

  async createResizeObserver() {
    const padding = 24

    await new Promise(r => window.setTimeout(r, 0))

    this.resizeObserver = new ResizeObserver((entries) => {
      if (entries.length !== 1) return
      window.top.postMessage(entries[0].contentRect.height + padding, '*')
    })

    this.resizeObserver.observe(this.wrapper)
    window.top.postMessage(this.wrapper.clientHeight + padding, '*')
  }
}

export default Layout
