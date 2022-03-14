import { reject } from 'lodash'
import update from 'immutability-helper'
import { IContractStatus, IContractForClient, ISortablePagination, IFreelancer, ITimesheetForClient, ISkill, IClientInvoice, ActionWithPayload } from 'types'
import { createAction, ActionFunctionAny } from 'redux-actions'

import { DEFAULT_TAB } from './Manage'

export const SET_TAB = 'flexhire/client/SET_MANAGE_TAB'

export const CONTRACT_DELETED = 'flexhire/client/CONTRACT_DELETED'

export const SET_FILTER_PARAMS = 'flexhire/client/SET_MANAGE_FILTER_PARAMS'
export const REPLACE_FILTER_PARAMS = 'flexhire/client/REPLACE_MANAGE_FILTER_PARAMS'
export const CLEAR_FILTER_PARAMS = 'flexhire/client/CLEAR_MANAGE_FILTER_PARAMS'

export const PAUSE_CONTRACT = 'flexhire/client/PAUSE_CONTRACT'
export const RESUME_CONTRACT = 'flexhire/client/RESUME_CONTRACT'
export const END_CONTRACT = 'flexhire/client/END_CONTRACT'
export const DELETE_CONTRACT = 'flexhire/client/DELETE_CONTRACT'

export const SET_MODAL_TIMESHEET_TRACKING = 'flexhire/client/SET_MODAL_TIMESHEET_TRACKING'

export const SELECT_ALL = 'flexhire/client/SELECT_ALL'
export const PERFORM_BULK_ACTION = 'flexhire/client/PERFORM_BULK_ACTION'
export const PERFORM_BULK_EMAIL = 'flexhire/client/PERFORM_BULK_EMAIL'
export const SET_BULK_ACTIONS_PARAMS = 'flexhire/client/SET_BULK_ACTIONS_PARAMS'
export const BULK_ACTION_TOGGLE_SELECTION = 'flexhire/client/BULK_ACTION_TOGGLE_SELECTION'
export const CONTRACTS_BULK_UPDATED = 'flexhire/client/CONTRACTS_BULK_UPDATED'
export const CLEAR_SELECTION = 'flexhire/client/BULK_ACTION_CLEAR_SELECTION'

export const SET_TIMESHEET = 'flexhire/client/SET_TIMESHEET'

export const PAGINATION_ON_PAGE_CHANGE = 'flexhire/client/PAGINATION_ON_PAGE_CHANGE'
export const PAGINATION_ON_ROWS_PER_PAGE_CHANGE = 'flexhire/client/PAGINATION_ON_ROWS_PER_PAGE_CHANGE'
export const PAGINATION_SORT = 'flexhire/client/PAGINATION_SORT'

export const ALL_TIMESHEETS_VALUE = 0
export const INVOICED_VALUE = -1
export const NOT_INVOICED_VALUE = -2

export const GET_INVOICES = 'flexhire/client/GET_INVOICES'
export const SET_INVOICES = 'flexhire/client/SET_INVOICES'

export const SET_SORT_INVOICE = 'flexhire/client/invoices/SET_SORT_INVOICE'

export const INVOICE_PAYMENT_SUBMITTED = 'flexhire/client/INVOICE_PAYMENT_SUBMITTED'

export const submitInvoicePayment: ActionFunctionAny<ActionWithPayload<{ invoice: IClientInvoice }>> = createAction(INVOICE_PAYMENT_SUBMITTED)

export type IManageFilterParams = Partial<{
  contractsStatus: IContractStatus
  timesheetsStatus: string
  name: string
  clientId: number
  tags: { id: number }[]
  jobId: string
  skills: ISkill[]
  invoicesStatus: string
  invoiceNo: number
  fromDate: Date
  toDate: Date
  invoiceId: number
  total: number
}>

export type IBulkActionParams = Partial<{
  end_date: Date
  client_id: number
  status: 'active' | 'paused' | 'expired'
}>

export type IManageTab = 'team' | 'expenses' | 'work' | 'payroll' | 'bonuses' | 'invoices'

export function getInitialState() {
  return {
    tab: 'team' as IManageTab,
    team: {
      bulkActions: {
        show: false,
        invert: false,
        graphFetchKey: 1,
        params: {
          end_date: undefined,
          client_id: undefined,
          status: undefined,
        } as IBulkActionParams,
        ids: [] as number[],
      },
      deleteDialog: {
        open: false,
        freelancer: null as IFreelancer,
        contract: null as IContractForClient,
      },
    },
    payroll: {
      bulkActions: {
        show: false,
        ids: [] as string[],
      },
    },
    timesheets: {
      timesheet: { expenses: [], timesheet_entries: [] } as ITimesheetForClient,
      highlightedCount: 0,
      queryDialog: {
        open: false,
        timesheetId: null as number,
      },
      approveDialog: {
        open: false,
        timesheetId: null as number,
      },
    },
    invoices: {
      serverError: null,
      invoices: [],
      invoicesReceived: false,
      invoicesExist: false, // if true then we have received at least 1 invoice at least once
      highlightedCount: 0,
      totalUnpaid: 0,
      totalOverdue: 0,
      totalCurrency: 'USD',
      pagination: {
        page: 0,
        rowsPerPage: 25,
        count: 0,
        orderBy: 'invoice_num',
        order: 'desc',
      } as ISortablePagination,
    },
    filterParams: {
      contractsStatus: 'active' as IContractStatus,
      name: '',
    } as IManageFilterParams,
  }
}

export type ManageState = ReturnType<typeof getInitialState>

function convertTabToDataset(tab: IManageTab) {
  if (tab === 'work') return 'timesheets'
  return tab || DEFAULT_TAB
}

export default function ManageReducer(state: ManageState, action) {
  state = state || getInitialState()
  const p = action.payload

  switch (action.type) {
    case SET_TAB:
      return update(state, {
        tab: {
          $set: p.tab,
        },
      })

    case SELECT_ALL:
      return update(state, {
        team: {
          bulkActions: {
            params: { $set: { ...getInitialState().team.bulkActions.params } },
            show: { $set: true },
            invert: { $set: true },
            ids: { $set: [] },
          },
        },
      })

    case CLEAR_SELECTION:
      return update(state, {
        team: {
          bulkActions: {
            ids: { $set: [] },
            show: { $set: false },
            invert: { $set: false },
          },
        },
      })

    case SET_BULK_ACTIONS_PARAMS:
      return update(state, {
        team: {
          bulkActions: {
            params: {
              $set: {
                ...state.team.bulkActions.params,
                [p.key]: p.value,
              },
            },
          },
        },
      })

    case CONTRACTS_BULK_UPDATED:
      return update(state, {
        team: {
          bulkActions: {
            graphFetchKey: {
              $set: state.team.bulkActions.graphFetchKey + 1,
            },
          },
        },
      })

    case BULK_ACTION_TOGGLE_SELECTION: {
      let shouldSelectItem = !state.team.bulkActions.ids.includes(p.id)
      let numSelectedItemsWithoutTarget = state.team.bulkActions.ids.filter(id => id !== p.id).length

      if (state.team.bulkActions.invert) {
        // TODO: replace 0 with current total count of items in the list
        numSelectedItemsWithoutTarget = 0 - numSelectedItemsWithoutTarget
      }

      let shouldShow = shouldSelectItem ? true : (numSelectedItemsWithoutTarget > 0)

      return update(state, {
        team: {
          bulkActions: {
            ids: {
              $set: shouldSelectItem ? [...state.team.bulkActions.ids, p.id] : reject(state.team.bulkActions.ids, id => id === p.id),
            },
            show: {
              $set: shouldShow,
            },
            invert: {
              $set: state.team.bulkActions.invert && shouldShow,
            },
          },
        },
      })
    }

    case REPLACE_FILTER_PARAMS:
      return update(state, {
        filterParams: { $set: p },
      })

    case SET_FILTER_PARAMS:
      return update(state, {
        filterParams: {
          $set: {
            ...state.filterParams,
            [p.key]: p.value,
          },
        },
        team: {
          bulkActions: {
            ids: { $set: [] },
          },
        },
        invoices: {
          pagination: {
            page: { $set: 0 },
            count: { $set: 0 },
          },
        },
      })

    case CLEAR_FILTER_PARAMS:
      return update(state, {
        filterParams: { $set: {} },
        invoices: {
          pagination: {
            page: { $set: 0 },
          },
        },
      })

    case END_CONTRACT:
      return update(state, {
        team: {
          deleteDialog: {
            open: { $set: false },
          },
        },
      })

    case SET_TIMESHEET:
      return update(state, {
        timesheets: {
          timesheet: { $set: p.timesheet } } })

    case PAGINATION_ON_PAGE_CHANGE:
      return update(state, {
        [convertTabToDataset(p.tab)]: {
          pagination: {
            page: { $set: p.page },
          },
        },
      })
    case PAGINATION_ON_ROWS_PER_PAGE_CHANGE:
      return update(state, {
        [convertTabToDataset(p.tab)]: {
          pagination: {
            rowsPerPage: { $set: p.rowsPerPage },
          },
        },
      })

    case PAGINATION_SORT:
      return update(state, {
        [convertTabToDataset(p.tab)]: {
          pagination: {
            orderBy: { $set: p.orderBy },
            order: { $set: p.order },
          },
        },
      })

    case INVOICE_PAYMENT_SUBMITTED:
      return update(state, {
        invoices: {
          invoices: { $set: state.invoices.invoices.map(i => ({ ...i, status: i.id === p.invoice.id ? p.invoice.status : i.status })) },
        },
      })

    case SET_INVOICES:
      return update(state, {
        invoices: {
          invoices: { $set: p.invoices },
          invoicesReceived: { $set: true },
          invoicesExist: { $set: (p.invoices && p.invoices.length > 0) || state.invoices.invoicesExist },
          highlightedCount: { $set: p.highlightedCount || 0 },
          totalUnpaid: { $set: p.totalUnpaid || 0 },
          totalOverdue: { $set: p.totalOverdue || 0 },
          totalCurrency: { $set: p.totalCurrency || 'USD' },
          pagination: {
            count: { $set: p.count || p.invoices.length },
          },
        },
      })

    default:
      return state
  }
}
