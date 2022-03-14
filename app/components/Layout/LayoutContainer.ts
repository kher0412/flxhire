import { withRouter } from 'next/router'
import { RootState } from 'reducers'
import { connect, ConnectedProps } from 'react-redux'
import { WithRouterProps } from 'next/dist/client/with-router'
import { closeBillingSetupDialog, closeInvoiceBlockedDialog, closeMaskDialog } from 'reducers/Common'
import Layout from './Layout'

const mapStateToProps = (state: RootState) => ({
  drawer: state.layout.drawer,
  snackbar: state.common.snackbar,
  isIframe: state.common.isIframe,
  maskDialogOpen: state.common.maskDialogOpen,
  invoiceBlockedDialogOpen: state.common.invoiceBlockedDialogOpen,
  billingSetupDialogOpen: state.common.billingSetupDialogOpen && !state.common.billingSetupDialogAvoid && state.auth.currentUser.confirmed_email,
  user: state.auth.currentUser,
  globalError: state.common.globalError,
})

const mapDispatchToProps = dispatch => ({
  closeMaskDialog: () => dispatch(closeMaskDialog()),
  closeInvoiceBlockedDialog: () => dispatch(closeInvoiceBlockedDialog()),
  closeBillingSetupDialog: () => dispatch(closeBillingSetupDialog()),
})

const connector = connect(mapStateToProps, mapDispatchToProps)

export type ContainerProps = ConnectedProps<typeof connector> & WithRouterProps

export default withRouter(connector(Layout))
