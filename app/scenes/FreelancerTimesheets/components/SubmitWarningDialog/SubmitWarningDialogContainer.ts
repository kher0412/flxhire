import { connect, ConnectedProps } from 'react-redux'
import { TOGGLE_SNACKBAR } from 'reducers/Common'
import { createAction } from 'redux-actions'
import { browserHistory } from 'services/router'
import {
  CLOSE_WARNING_DIALOG,
  SUBMIT_TIMESHEET_TO_CLIENT,
  SUBMIT_TIMESHEET_FAILED,
} from '../../FreelancerTimesheetsDucks'
import SubmitWarningDialog from './SubmitWarningDialog'

const mapStateToProps = state => ({
  open: state.freelancerTimesheets.warningDialog.open,
  id: state.freelancerTimesheets.warningDialog.id,
  amount: state.freelancerTimesheets.warningDialog.amount,
  payments_enabled: state.freelancerTimesheets.warningDialog.payments_enabled,
  client_id: state.freelancerTimesheets.warningDialog.client_id,
})

const mapDispatchToProps = dispatch => ({
  handleClose: () => {
    dispatch(createAction(CLOSE_WARNING_DIALOG)())
  },
  handleSubmit: (id, amount, paymentsEnabled, clientID) => {
    dispatch(createAction(CLOSE_WARNING_DIALOG)())

    if (paymentsEnabled && amount > 0 && amount <= 20) {
      const error = 'Timesheets can only be submitted if they total more than $20.'
      dispatch(createAction(SUBMIT_TIMESHEET_FAILED)({ error }))
      dispatch(createAction(TOGGLE_SNACKBAR)({ message: error }))
    } else {
      dispatch(createAction(SUBMIT_TIMESHEET_TO_CLIENT)({
        id,
        client_id: clientID,
      }))

      browserHistory.push('/member/work_reports')
    }
  },
})

const connector = connect(mapStateToProps, mapDispatchToProps)
export type SubmitWarningDialogContainerProps = ConnectedProps<typeof connector>

export default connector(SubmitWarningDialog)
