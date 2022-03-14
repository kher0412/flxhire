import { connect, ConnectedProps } from 'react-redux'
import { createAction } from 'redux-actions'
import { RootState } from 'reducers'
import Snackbar from './DashboardTour'
import { CLOSE_SNACKBAR } from '../../../ClientDashboardDucks'

const mapStateToProps = (state: RootState) => {
  return {
    isOpen: state.clientDashboard.closedSnackbars && !state.clientDashboard.closedSnackbars?.includes('dashboard-tour'),
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    onClose: () => dispatch(createAction(CLOSE_SNACKBAR)({ name: 'dashboard-tour' })),
  }
}

const connector = connect(mapStateToProps, mapDispatchToProps)

export type DashboardTourContainerProps = ConnectedProps<typeof connector>

export default connector(Snackbar)
