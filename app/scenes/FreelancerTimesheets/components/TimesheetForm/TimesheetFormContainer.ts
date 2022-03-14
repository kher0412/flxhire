import { connect, ConnectedProps } from 'react-redux'
import { withRouter } from 'next/router'
import { WithRouterProps } from 'next/dist/client/with-router'
import { browserHistory } from 'services/router'
import { reduxForm, InjectedFormProps } from 'redux-form'
import { createAction } from 'redux-actions'
import { isValidPeriod } from 'services/timesheets'
import moment from 'moment'
import { RootState } from 'reducers'
import TimesheetForm from './TimesheetForm'
import {
  SUBMIT_TIMESHEET,
  GET_TIMESHEETS,
  GET_TIMESHEET,
  SUBMIT_DISABLE_DRAFT_DIALOG,
  GET_CONTRACTS,
  OPEN_WARNING_DIALOG,
  OPEN_DELETE_DIALOG,
  SET_TIMESHEET,
} from '../../FreelancerTimesheetsDucks'

export const validate = (values) => {
  const errors: any = {}
  const allWorkEntryErrors = []
  const allExpensesErrors = []
  const requiredFields = ['client_id']

  requiredFields.forEach((field) => {
    if (!values[field]) {
      errors[field] = 'Required'
    }
  })

  if (values.timesheet_entries) {
    values.timesheet_entries.forEach((workEntry, i) => {
      const workEntryErrors: any = {}

      if (!workEntry.start_time) {
        workEntryErrors.start_time = 'Required'
      }

      if (!workEntry.end_time) {
        workEntryErrors.end_time = 'Required'
      } else if (!isValidPeriod(workEntry)) {
        workEntryErrors.end_time = 'Must be after the time started'
      }

      if (!workEntry.description) {
        workEntryErrors.description = 'Required'
      }

      if (Object.keys(workEntryErrors).length > 0) {
        allWorkEntryErrors[i] = workEntryErrors
      }
    })
  }

  if (values.expenses) {
    values.expenses.forEach((expense, i) => {
      const expenseErrors: any = {}

      if (!expense.description) {
        expenseErrors.description = 'Required'
      }

      if (!expense.expense_date) {
        expenseErrors.expense_date = 'Required'
      }

      if (!expense.amount) {
        expenseErrors.amount = 'Required'
      }

      if (!expense.receipt_url) {
        expenseErrors.receipt_url = 'Required'
      }

      if (Object.keys(expenseErrors).length > 0) {
        allExpensesErrors[i] = expenseErrors
      }
    })
  }

  if (allWorkEntryErrors.length > 0) {
    errors.timesheet_entries = allWorkEntryErrors
  }

  if (allExpensesErrors.length > 0) {
    errors.expenses = allExpensesErrors
  }

  return errors
}

const form = {
  form: 'timesheetForm',
  enableReinitialize: true,
  validate,
}

export function getDefaultStartDate() {
  return moment().startOf('isoWeek').format('YYYY-MM-DD') // monday
}

export function getDefaultEndDate() {
  return moment().endOf('isoWeek').format('YYYY-MM-DD') // sunday
}

export function getInitialValues(state: RootState) {
  const timesheet = state.freelancerTimesheets.timesheet
  const contracts = state.freelancerTimesheets.contracts.filter(c => c.enable_timesheets)

  if (timesheet?.id) {
    return timesheet
  }

  const contract = contracts.length === 1 ? contracts[0] : null

  return {
    client_id: contract?.client?.id,
    currency: contract?.currency || 'USD',
  }
}

const mapStateToProps = (state: RootState) => {
  const contracts = state.freelancerTimesheets.contracts.filter(c => c.enable_timesheets)

  return {
    currentUser: state.auth.currentUser,
    isSubmitting: state.freelancerTimesheets.isSubmitting,
    // Computed
    initialValues: getInitialValues(state),
    // Timesheets
    timesheet: state.freelancerTimesheets.timesheet,
    timesheetReceived: state.freelancerTimesheets.timesheetReceived,
    // Clients
    contracts,
    contractsReceived: state.freelancerTimesheets.contractsReceived,
  }
}

const mapDispatchToProps = dispatch => ({
  getContracts: () => dispatch(createAction(GET_CONTRACTS)()),
  getTimesheet: id => dispatch(createAction(GET_TIMESHEET)({ id })),
  resetTimesheet: () => dispatch(createAction(SET_TIMESHEET)({ timesheet: null })),
  onSubmit: formData => dispatch(createAction(SUBMIT_TIMESHEET)({ formData })),
  getTimesheets: () => dispatch(createAction(GET_TIMESHEETS)()),
  setupPayoneer: () => browserHistory.push('/account/paying_you'),
  disableDraftDialog: () => dispatch(createAction(SUBMIT_DISABLE_DRAFT_DIALOG)()),
  back: () => browserHistory.push('/member/work_reports/'),
  openWarning: params => dispatch(createAction(OPEN_WARNING_DIALOG)(params)),
  openDeleteDialog: id => dispatch(createAction(OPEN_DELETE_DIALOG)({ id })),
})

const connector = connect(mapStateToProps, mapDispatchToProps)

export type ContainerProps = ConnectedProps<typeof connector> & WithRouterProps & InjectedFormProps

export default withRouter(connector(reduxForm(form)(TimesheetForm) as any))
