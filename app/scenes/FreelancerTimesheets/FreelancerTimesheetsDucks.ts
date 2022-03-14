import update from 'immutability-helper'
import { IPagination, IContractForFreelancer, ITimesheetForFreelancer, Currency } from 'types'

export const SUBMIT_TIMESHEET = 'flexhire/freelancer/SUBMIT_TIMESHEET'
export const SUBMIT_TIMESHEET_TO_CLIENT = 'flexhire/freelancer/SUBMIT_TIMESHEET_TO_CLIENT'
export const SUBMIT_TIMESHEET_FAILED = 'flexhire/freelancer/SUBMIT_TIMESHEET_FAILED'
export const SUBMIT_TIMESHEET_SUCCEEDED = 'flexhire/freelancer/SUBMIT_TIMESHEET_SUCCEEDED'
export const GET_CONTRACTS = 'flexhire/freelancer/GET_CONTRACTS'
export const SET_CONTRACTS = 'flexhire/freelancer/SET_CONTRACTS'
export const SUBMIT_DISABLE_DRAFT_DIALOG = 'flexhire/freelancer/SUBMIT_DISABLE_DRAFT_DIALOG'

export const GET_TIMESHEETS = 'flexhire/freelancer/GET_TIMESHEETS'
export const SET_TIMESHEETS = 'flexhire/freelancer/SET_TIMESHEETS'
export const GET_TIMESHEET = 'flexhire/freelancer/GET_TIMESHEET'
export const SET_TIMESHEET = 'flexhire/freelancer/SET_TIMESHEET'
export const GET_TIMESHEET_STATS = 'flexhire/freelancer/GET_TIMESHEET_STATS'
export const SET_TIMESHEET_STATS = 'flexhire/freelancer/SET_TIMESHEET_STATS'

export const SUBMIT_FEEDBACK = 'flexhire/freelancer/SUBMIT_FEEDBACK'

export const OPEN_WARNING_DIALOG = 'flexhire/freelancer/OPEN_WARNING_DIALOG'
export const CLOSE_WARNING_DIALOG = 'flexhire/freelancer/CLOSE_WARNING_DIALOG'

export const OPEN_DELETE_DIALOG = 'flexhire/freelancer/OPEN_DELETE_DIALOG'
export const CLOSE_DELETE_DIALOG = 'flexhire/freelancer/CLOSE_DELETE_DIALOG'
export const SUBMIT_DELETE_TIMESHEET = 'flexhire/freelancer/timesheets/SUBMIT_DELETE_TIMESHEET'
export const DELETE_TIMESHEET = 'flexhire/freelancer/timesheets/DELETE_TIMESHEET'

export const ROWS_PER_PAGE = 25

export interface ITimesheetStats {
  total_pending: number
  total_paid: number
  total_paid_hours: number
  total_paid_minutes: number
  currency: string
}

const initialState = {
  contracts: [] as IContractForFreelancer[],
  contractsReceived: false,
  timesheets: [] as ITimesheetForFreelancer[],
  isSubmitting: false,
  pagination: {
    page: 0,
    rowsPerPage: ROWS_PER_PAGE,
    count: 0,
  } as IPagination,
  timesheet: null as ITimesheetForFreelancer,
  timesheetReceived: false,
  timesheetStats: {
    total_pending: 0,
    total_paid: 0,
    total_paid_hours: 0,
    total_paid_minutes: 0,
    currency: 'USD',
  } as ITimesheetStats,
  timesheetsReceived: false,
  warningDialog: {
    id: null,
    amount: null,
    client_id: null,
    payments_enabled: null,
    open: false,
  },
  deleteDialog: {
    id: null,
    open: false,
    isUpdatesStore: false,
  },
  timeWorkedFormDialog: {
    open: false,
  },
  currentTimeWorked: {},
}

export default function reducer(state = initialState, action) {
  const p = action.payload

  switch (action.type) {
    case SET_TIMESHEETS:
      return update(state, {
        timesheets: { $set: p.timesheets },
        timesheetsReceived: { $set: true },
        pagination: {
          count: { $set: p.count || initialState.pagination.count },
          page: { $set: p.page || 0 },
          rowsPerPage: { $set: p.rowsPerPage },
        },
      })

    case GET_TIMESHEET:
      return update(state, {
        timesheetReceived: { $set: false },
      })

    case SET_TIMESHEET:
      return update(state, {
        timesheet: { $set: p.timesheet },
        timesheetReceived: { $set: true },
      })

    case SET_TIMESHEET_STATS:
      return update(state, { timesheetStats: { $set: p.stats } })

    case GET_CONTRACTS:
      return update(state, {
        contractsReceived: { $set: false },
      })

    case SET_CONTRACTS:
      return update(state, {
        contracts: { $set: p.contracts },
        contractsReceived: { $set: true },
      })

    case SUBMIT_TIMESHEET_SUCCEEDED:
    case SUBMIT_TIMESHEET_FAILED:
      return update(state, {
        isSubmitting: { $set: false },
      })

    case OPEN_WARNING_DIALOG:
      return update(state, {
        warningDialog: {
          open: { $set: true },
          id: { $set: p.id },
          amount: { $set: p.amount },
          client_id: { $set: p.client_id },
          payments_enabled: { $set: p.payments_enabled },
        },
      })

    case CLOSE_WARNING_DIALOG:
      return update(state, {
        warningDialog: {
          open: { $set: false },
          id: { $set: undefined },
          amount: { $set: undefined },
          client_id: { $set: undefined },
        },
      })

    case OPEN_DELETE_DIALOG:
      return update(state, {
        deleteDialog: {
          open: { $set: true },
          id: { $set: p.id },
          isUpdatesStore: { $set: p.isUpdatesStore },
        },
      })

    case CLOSE_DELETE_DIALOG:
      return update(state, {
        deleteDialog: {
          open: { $set: false },
          id: { $set: undefined },
          isUpdatesStore: { $set: false },
        },
      })

    case DELETE_TIMESHEET: {
      const filteredTimesheets = state.timesheets.filter(timesheet => timesheet.id !== p.id)
      return update(state, {
        timesheets: { $set: filteredTimesheets },
      })
    }

    case SUBMIT_TIMESHEET:
      return update(state, {
        isSubmitting: { $set: true },
      })

    default:
      return state
  }
}
