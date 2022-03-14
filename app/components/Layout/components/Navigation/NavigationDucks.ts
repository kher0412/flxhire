import update from 'immutability-helper'
import get from 'lodash/get'
import { createAction } from 'redux-actions'
import { INVOICE_PAYMENT_SUBMITTED } from 'scenes/ClientManage/ManageDucks'
import { IClientInvoice } from 'types'

export const GET_BADGE_DATA = 'flexhire/client/GET_MENU_BADGE_DATA'
export const SET_BADGE_DATA = 'flexhire/client/SET_MENU_BADGE_DATA'
export const TIMESHEET_APPROVED_SUCCESS = 'flexhire/client/TIMESHEET_APPROVED_SUCCESS'

export const getBadgeData = createAction(GET_BADGE_DATA)

export interface IBadgeData {
  timesheetCount: number
  allTimesheetCount: number
  overdueInvoices: number
  unpaidInvoices: number
}

function getDefaultState() {
  return {
    badgeData: {
      timesheetCount: 0,
      allTimesheetCount: 0,
      overdueInvoices: 0,
      unpaidInvoices: 0,
    } as IBadgeData,
  }
}

function decrement(val: number) {
  if (val > 0) return val - 1
  return val
}

type State = ReturnType<typeof getDefaultState>

function markTimesheetApproved(state: State) {
  return update(state, {
    badgeData: {
      timesheetCount: {
        $set: decrement(get(state, 'badgeData.timesheetCount', 0)),
      },
    },
  })
}

function markInvoicePaid(state: State, invoice: IClientInvoice) {
  if (invoice['client_paid?']) {
    const field = invoice['overdue?'] ? 'overdueInvoices' : 'unpaidInvoices'
    return update(state, {
      badgeData: {
        [field]: {
          $set: decrement(get(state, `badgeData.${field}`, 0)),
        },
      },
    })
  }
  return state
}

export default function navigationReducer(state: State = getDefaultState(), action) {
  switch (action.type) {
    case SET_BADGE_DATA:
      return update(state, { badgeData: { $set: action.payload.badgeData } })
    case TIMESHEET_APPROVED_SUCCESS:
      return markTimesheetApproved(state)
    case INVOICE_PAYMENT_SUBMITTED:
      return markInvoicePaid(state, action.payload.invoice)
    default:
      return state
  }
}
