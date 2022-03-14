import update from 'immutability-helper'
import { createAction, ActionFunctionAny } from 'redux-actions'
import { ActionWithPayload, ICurrentUser } from 'types'
import { Action } from 'redux'
import { hasCompletedBillingSetup } from 'services/user'
import { isPrerendering } from 'services/prerender'
import { getBuildID } from 'services/versioning'
import { SET_CURRENT_USER } from './Auth'

export const TOGGLE_SNACKBAR = 'flexhire/common/TOGGLE_SNACKBAR'
export const SET_ONLINE = 'flexhire/common/SET_ONLINE'
export const SET_OFFLINE = 'flexhire/common/SET_OFFLINE'
export const PROMPT_PWA_INSTALL = 'flexhire/common/PROMPT_PWA_INSTALL'
export const SET_IS_PWA = 'flexhire/common/SET_IS_PWA'
export const PWA_INSTALLED = 'flexhire/common/PWA_INSTALLED'
export const SET_IFRAME = 'flexhire/common/SET_IFRAME'
export const REFRESH_TIMEZONE = 'flexhire/common/REFRESH_TIMEZONE'
export const OPEN_MASK_DIALOG = 'flexhire/common/OPEN_MASK_DIALOG'
export const CLOSE_MASK_DIALOG = 'flexhire/common/CLOSE_MASK_DIALOG'
export const CLOSE_INVOICE_BLOCKED_DIALOG = 'flexhire/common/CLOSE_INVOICE_BLOCKED_DIALOG'
export const CLOSE_BILLING_SETUP_DIALOG = 'flexhire/common/CLOSE_BILLING_SETUP_DIALOG'
export const SET_AVOID_BILLING_SETUP_DIALOG = 'flexhire/common/SET_AVOID_BILLING_SETUP_DIALOG'
export const FRONTEND_VERSION_DEPLOYED = 'flexhire/common/FRONTEND_VERSION_DEPLOYED'
export const SERVICE_UNAVAILABLE = 'flexhire/common/SERVICE_UNAVAILABLE'

export const toggleSnackbar: ActionFunctionAny<ActionWithPayload<{ message: string }>> = createAction(TOGGLE_SNACKBAR)
export const setOnline: ActionFunctionAny<Action> = createAction(SET_ONLINE)
export const setOffline: ActionFunctionAny<Action> = createAction(SET_OFFLINE)
export const promptPWAInstall: ActionFunctionAny<Action> = createAction(PROMPT_PWA_INSTALL)
export const setIsPWA: ActionFunctionAny<ActionWithPayload<boolean>> = createAction(SET_IS_PWA)
export const pwaInstalled: ActionFunctionAny<Action> = createAction(PWA_INSTALLED)
export const setIsIframe: ActionFunctionAny<ActionWithPayload<boolean>> = createAction(SET_IFRAME)
export const openMaskDialog: ActionFunctionAny<Action> = createAction(OPEN_MASK_DIALOG)
export const closeMaskDialog: ActionFunctionAny<Action> = createAction(CLOSE_MASK_DIALOG)
export const closeInvoiceBlockedDialog: ActionFunctionAny<Action> = createAction(CLOSE_INVOICE_BLOCKED_DIALOG)
export const closeBillingSetupDialog: ActionFunctionAny<Action> = createAction(CLOSE_BILLING_SETUP_DIALOG)
export const setAvoidBillingSetupDialog: ActionFunctionAny<Action> = createAction(SET_AVOID_BILLING_SETUP_DIALOG)

const initialState = {
  snackbar: {
    open: false,
    message: '',
  },
  globalError: null as string,
  online: true,
  pwaInstallable: false,
  updateAvailable: false,
  userDelayedUpdate: false,
  serverBuildId: isPrerendering() ? getBuildID() : null,
  isPWA: false,
  isIframe: true,
  maskDialogOpen: false,
  invoiceBlockedDialogOpen: false,
  invoiceBlockedDialogDismissed: false,
  billingSetupDialogOpen: false,
  billingSetupDialogDismissed: false,
  billingSetupDialogAvoid: false,
}

export default function reducer(state = initialState, action: ActionWithPayload<any>) {
  const p = action.payload
  switch (action.type) {
    case TOGGLE_SNACKBAR:
      return update(state, {
        snackbar: {
          open: { $set: p.message ? true : (p.open || false) },
          message: { $set: p.message },
        },
      })
    case SET_ONLINE:
      return update(state, {
        online: { $set: true },
      })
    case SET_OFFLINE:
      return update(state, {
        online: { $set: false },
      })
    case PROMPT_PWA_INSTALL:
      return update(state, {
        pwaInstallable: { $set: true },
      })
    case PWA_INSTALLED:
      return update(state, {
        pwaInstallable: { $set: false },
      })
    case SET_IS_PWA:
      return update(state, {
        isPWA: { $set: p },
      })
    case SET_IFRAME:
      return update(state, {
        isIframe: { $set: p },
      })
    case OPEN_MASK_DIALOG:
      return update(state, {
        maskDialogOpen: { $set: true },
      })
    case CLOSE_MASK_DIALOG:
      return update(state, {
        maskDialogOpen: { $set: false },
      })
    case SET_CURRENT_USER: {
      const user = p.currentUser as ICurrentUser

      return update(state, {
        invoiceBlockedDialogOpen: {
          $set: !state.invoiceBlockedDialogDismissed && Boolean(user?.block_platform_access_due_to_unpaid_invoices_date),
        },
        billingSetupDialogOpen: {
          $set: !state.billingSetupDialogDismissed && !hasCompletedBillingSetup(user),
        },
      })
    }
    case CLOSE_INVOICE_BLOCKED_DIALOG:
      return update(state, {
        invoiceBlockedDialogOpen: { $set: false },
        invoiceBlockedDialogDismissed: { $set: true },
      })
    case CLOSE_BILLING_SETUP_DIALOG:
      return update(state, {
        billingSetupDialogOpen: { $set: false },
        billingSetupDialogDismissed: { $set: true },
      })
    case SET_AVOID_BILLING_SETUP_DIALOG:
      return update(state, {
        billingSetupDialogAvoid: { $set: p },
      })
    case FRONTEND_VERSION_DEPLOYED:
      return update(state, {
        serverBuildId: { $set: p?.buildId },
      })
    case SERVICE_UNAVAILABLE:
      return update(state, {
        globalError: { $set: p?.message || 'Flexhire is unavailable at this time. If this issue persists, contact us at info@flexhire.com' },
      })
    default:
      return state
  }
}
