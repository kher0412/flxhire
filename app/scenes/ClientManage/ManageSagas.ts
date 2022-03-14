import { takeEvery, takeLatest, put, select, call, debounce } from 'redux-saga/effects'
import moment from 'moment'
import { isDate } from 'lodash'
import { getAPIClient } from 'api'
import { createAction } from 'redux-actions'
import { trackError, trackEvent } from 'services/analytics'
import { DATE_PATTERN } from 'services/timeKeeping'
import { TOGGLE_SNACKBAR } from 'reducers/Common'
import storage from 'services/localStorage'
import { RootState } from 'reducers'
import { completePayment, redirectToCheckout } from 'services/stripe'
import { PaymentIntent } from '@stripe/stripe-js'
import { IClientInvoice, ICurrentUser } from 'types'
import { graphql } from 'react-relay'
import { commitMutationEffect } from 'sagas/__helpers'
import { ManageSagas_ExpireContractMutation } from '__generated__/ManageSagas_ExpireContractMutation.graphql'
import { ManageSagas_PauseContractMutation } from '__generated__/ManageSagas_PauseContractMutation.graphql'
import { ManageSagas_ResumeContractMutation } from '__generated__/ManageSagas_ResumeContractMutation.graphql'
import { SET_CURRENT_USER } from 'reducers/Auth'
import {
  DELETE_CONTRACT,
  END_CONTRACT,
  CONTRACT_DELETED,
  PAUSE_CONTRACT,
  RESUME_CONTRACT,
  SET_FILTER_PARAMS,
  REPLACE_FILTER_PARAMS,
  CLEAR_FILTER_PARAMS,
  PERFORM_BULK_ACTION,
  PERFORM_BULK_EMAIL,
  CLEAR_SELECTION,
  CONTRACTS_BULK_UPDATED,
  ALL_TIMESHEETS_VALUE,
  NOT_INVOICED_VALUE,
  GET_INVOICES,
  SET_INVOICES,
  PAGINATION_ON_PAGE_CHANGE,
  PAGINATION_ON_ROWS_PER_PAGE_CHANGE,
  PAGINATION_SORT,
  IManageFilterParams,
} from './ManageDucks'

function* performPauseContract(action) {
  try {
    yield commitMutationEffect<ManageSagas_PauseContractMutation>({
      mutation: graphql`
        mutation ManageSagas_PauseContractMutation($input: PauseContractInput!) {
          pauseContract(input: $input) {
            contract {
              lastInteractionAt
              status
            }
          }
        }
      `,
      variables: {
        input: {
          contractId: action.payload.contract.id,
        },
      },
    })
    trackEvent('Client Pause Contract')
  } catch (err) {
    yield put(createAction(TOGGLE_SNACKBAR)({ message: err.response || err.message || err }))
    trackError(err)
  }
}

function* performResumeContract(action) {
  try {
    yield commitMutationEffect<ManageSagas_ResumeContractMutation>({
      mutation: graphql`
        mutation ManageSagas_ResumeContractMutation($input: ResumeContractInput!) {
          resumeContract(input: $input) {
            contract {
              lastInteractionAt
              status
            }
          }
        }
      `,
      variables: {
        input: {
          contractId: action.payload.contract.id,
        },
      },
    })
    trackEvent('Client Resume Contract')
  } catch (err) {
    yield put(createAction(TOGGLE_SNACKBAR)({ message: err.response || err.message || err }))
    trackError(err)
  }
}

function* performEndContract(action) {
  try {
    yield commitMutationEffect<ManageSagas_ExpireContractMutation>({
      mutation: graphql`
        mutation ManageSagas_ExpireContractMutation($input: ExpireContractInput!) {
          expireContract(input: $input) {
            contract {
              lastInteractionAt
              status
              endDate
            }
          }
        }
      `,
      variables: {
        input: {
          contractId: action.payload.contract.id,
        },
      },
    })
    trackEvent('Client End Contract')
  } catch (err) {
    yield put(createAction(TOGGLE_SNACKBAR)({ message: err.response || err.message || err }))
    trackError(err)
  }
}

function* performDeleteContract(action) {
  try {
    const { id } = action.payload.contract
    yield getAPIClient().deleteContract(id)
    yield put(createAction(CONTRACT_DELETED)({ id }))
    trackEvent('Client Delete Contract')
  } catch (err) {
    yield put(createAction(TOGGLE_SNACKBAR)({ message: err.response || err.message || err }))
    trackError(err)
  }
}

function* performTeamBulkAction() {
  const bulkParams = yield select(state => state.clientManage.team.bulkActions.params)
  const bulkActionIds = yield select(state => state.clientManage.team.bulkActions.ids)
  const user: ICurrentUser = yield select((state: RootState) => state.auth.currentUser)

  yield put(createAction(CLEAR_SELECTION)())

  try {
    const response = yield getAPIClient().updateContracts({
      id: bulkActionIds.join(','),
      firm_id: user?.firm?.id,
      update: bulkParams,
    })

    yield put(createAction(CONTRACTS_BULK_UPDATED)(response))
    yield put(createAction(TOGGLE_SNACKBAR)({ message: `${response.count} contracts updated` }))
  } catch (err) {
    yield put(createAction(TOGGLE_SNACKBAR)({ message: err.response || err.message || err }))
    trackError(err)
  }
}

function* performTeamBulkEmail() {
  const bulkActionIds = yield select(state => state.clientManage.team.bulkActions.ids)
  const user: ICurrentUser = yield select((state: RootState) => state.auth.currentUser)

  yield put(createAction(CLEAR_SELECTION)())

  try {
    const response = yield getAPIClient().generateEmailList({
      firm_id: user?.firm?.id,
      id: bulkActionIds.join(','),
    })

    yield put(createAction(TOGGLE_SNACKBAR)({ message: `E-mail address list for ${response.count} contacts generated` }))
    window.location.href = `mailto:?bcc=${response.emails}`
  } catch (err) {
    yield put(createAction(TOGGLE_SNACKBAR)({ message: err.response || err.message || err }))
    trackError(err)
  }
}

/*
// TODO: make sure new API version of this has all the same features
function prepareTimesheetsFilterParams(filterParams: IManageFilterParams) {
  const fromDate = filterParams.fromDate || filterParams.toDate
  const toDate = filterParams.toDate || filterParams.fromDate
  const invoiceId = filterParams.invoiceId || ALL_TIMESHEETS_VALUE
  let invoiceNum = null
  if (invoiceId === NOT_INVOICED_VALUE) {
    invoiceNum = 'not_invoiced'
  } else if (invoiceId !== ALL_TIMESHEETS_VALUE) {
    invoiceNum = filterParams.invoiceId
  }
  return {
    freelancer_name: filterParams.name,
    client_id: (filterParams.clientId as any) > 0 ? filterParams.clientId : undefined,
    status: filterParams.timesheetsStatus,
    from_date: fromDate ? moment(fromDate).format('YYYY-MM-DD') : null,
    to_date: toDate ? moment(toDate).format('YYYY-MM-DD') : null,
    tag_ids: (filterParams.tags || []).map(v => v.id).join(','),
    invoice_num: invoiceNum,
  }
}

function* performGetTimesheets() {
  try {
    const pagination = yield select(state => state.clientManage.timesheets.pagination)
    const filterParams = yield select(state => state.clientManage.filterParams)
    const filters = prepareTimesheetsFilterParams(filterParams)
    const params = {
      page: pagination.page + 1,
      per_page: pagination.rowsPerPage,
      _order: pagination.order,
      _sort: pagination.orderBy,
      ...filters,
    }
    const response = yield call([getAPIClient(), 'getClientTimesheets'], params)
    const responseStats = yield call([getAPIClient(), 'getClientTimesheetsSummary'], { ...params, status: 'submitted' })

    const result = {
      timesheets: response.body.map(timesheet => ({
        ...timesheet,
        start_date: moment(timesheet.start_date).format(DATE_PATTERN),
        end_date: moment(timesheet.end_date).format(DATE_PATTERN),
      })),
      totalCount: response.headers.totalCount,
      highlightedCount: responseStats.body.count,
    }

    yield put(createAction(SET_TIMESHEETS)({
      timesheets: result.timesheets,
      count: result.totalCount,
      highlightedCount: result.highlightedCount,
    }))
  } catch (error) {
    trackError(error)
    yield put(createAction(TOGGLE_SNACKBAR)({ message: 'Something went wrong' }))
  }
}
 */

function prepareInvoicesFilterParams(filterParams) {
  const {
    fromDate,
    toDate,
  } = filterParams
  const dateParams: any = {}
  if (fromDate && isDate(fromDate)) {
    dateParams.from_due_date = moment(fromDate).format('YYYY-MM-DD')
  }
  if (toDate && isDate(toDate)) {
    dateParams.to_due_date = moment(toDate).format('YYYY-MM-DD')
  }
  // If only one end is selected in the date range picker, we treat it as if a single day was selected.
  if (fromDate && !toDate) {
    dateParams.to_due_date = dateParams.from_due_date
  }
  if (!fromDate && toDate) {
    dateParams.from_due_date = dateParams.to_due_date
  }

  return {
    ...dateParams,
    invoice_no: filterParams.invoiceNo,
    total: filterParams.total,
    status: filterParams.invoicesStatus,
    client_id: filterParams.clientId > 0 ? filterParams.clientId : undefined,
  }
}

function* performGetInvoices() {
  try {
    const filterParams = yield select((state: RootState) => state.clientManage.filterParams)
    const pagination = yield select((state: RootState) => state.clientManage.invoices.pagination)
    const filters = prepareInvoicesFilterParams(filterParams)
    const apiParams = {
      page: pagination.page + 1,
      per_page: pagination.rowsPerPage,
      order: pagination.order,
      sort: pagination.orderBy,
      ...filters,
    }

    const response = yield call([getAPIClient(), 'getClientInvoices'], apiParams)
    const statsResponse = yield call([getAPIClient(), 'getClientInvoicesSummary'], filters)

    const propsToUpdate = {
      invoices: response.body,
      count: response.headers.totalCount,
      highlightedCount: (statsResponse.body.overdueCount || 0) + (statsResponse.body.unpaidCount || 0),
      totalUnpaid: statsResponse.body.unpaidBalance,
      totalOverdue: statsResponse.body.overdueBalance,
      totalCurrency: statsResponse.body.currency,
    }

    yield put(createAction(SET_INVOICES)(propsToUpdate))
  } catch (error) {
    trackError(error)
  }
}

function* performRefreshResults() {
  yield performGetInvoices()
}

// IMPORTANT: Increase this if something has changed in the format of the filterParams.
const FILTER_FORMAT_VERSION = 3
const FILTER_STORAGE_NAME = 'client_manage_filter_params'

function* performSaveFilterParams() {
  try {
    const email = yield select((state: RootState) => state.auth.currentUser.email)
    const filterParams = yield select((state: RootState) => state.clientManage.filterParams)
    storage.setItem(FILTER_STORAGE_NAME, JSON.stringify({
      formatVersion: FILTER_FORMAT_VERSION,
      value: filterParams,
      email,
    }))
  } catch (error) {
    console.log(error)
  }
}

function* performLoadFilterParams() {
  try {
    const email = yield select((state: RootState) => state.auth.currentUser.email)
    if (email) {
      const toParse = storage.getItem(FILTER_STORAGE_NAME)
      if (toParse) {
        const filterParams = JSON.parse(toParse)
        if (filterParams?.formatVersion === FILTER_FORMAT_VERSION && filterParams.email === email) {
          yield put(createAction(REPLACE_FILTER_PARAMS)(filterParams.value))
        }
      }
    }
  } catch (error) {
    console.log(error)
  }
}

const DEBOUNCE_INTERVAL = 500

function* watch() {
  yield debounce(DEBOUNCE_INTERVAL, GET_INVOICES, performGetInvoices)
  yield debounce(DEBOUNCE_INTERVAL, [
    CONTRACTS_BULK_UPDATED,
    SET_FILTER_PARAMS,
    CLEAR_FILTER_PARAMS,
    PAGINATION_ON_PAGE_CHANGE,
    PAGINATION_ON_ROWS_PER_PAGE_CHANGE,
    PAGINATION_SORT,
  ], performRefreshResults)
  yield takeEvery(PAUSE_CONTRACT, performPauseContract)
  yield takeEvery(RESUME_CONTRACT, performResumeContract)
  yield takeEvery(END_CONTRACT, performEndContract)
  yield takeEvery(DELETE_CONTRACT, performDeleteContract)
  yield takeEvery(PERFORM_BULK_ACTION, performTeamBulkAction)
  yield takeEvery(PERFORM_BULK_EMAIL, performTeamBulkEmail)
  yield debounce(DEBOUNCE_INTERVAL, [
    SET_FILTER_PARAMS,
    CLEAR_FILTER_PARAMS,
  ], performSaveFilterParams)
  yield takeLatest(SET_CURRENT_USER, performLoadFilterParams)
}

export default watch
