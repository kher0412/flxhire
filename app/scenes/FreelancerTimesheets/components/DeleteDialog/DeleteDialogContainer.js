import { connect } from 'react-redux'
import { createAction } from 'redux-actions'
import { CLOSE_DELETE_DIALOG, SUBMIT_DELETE_TIMESHEET } from '../../FreelancerTimesheetsDucks'
import DeleteDialog from './DeleteDialog'

const mapStateToProps = (state) => {
  return {
    open: state.freelancerTimesheets.deleteDialog.open,
    id: state.freelancerTimesheets.deleteDialog.id,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    handleClose: () => {
      dispatch(createAction(CLOSE_DELETE_DIALOG)())
    },
    handleSubmit: async (id) => {
      dispatch(createAction(SUBMIT_DELETE_TIMESHEET)({ id }))
    },
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(DeleteDialog)
