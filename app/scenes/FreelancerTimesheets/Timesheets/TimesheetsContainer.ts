import { withRouter } from 'next/router'
import { connect, ConnectedProps } from 'react-redux'
import { createAction } from 'redux-actions'
import { browserHistory } from 'services/router'
import { RootState } from 'reducers'
import { WithRouterProps } from 'next/dist/client/with-router'
import {
  GET_TIMESHEETS,
  GET_TIMESHEET_STATS,
  GET_CONTRACTS,
  OPEN_WARNING_DIALOG,
  OPEN_DELETE_DIALOG,
} from '../FreelancerTimesheetsDucks'
import Timesheets from './Timesheets'

const mapStateToProps = (state: RootState) => ({
  timesheets: state.freelancerTimesheets.timesheets,
  timesheetsReceived: state.freelancerTimesheets.timesheetsReceived,
  contracts: state.freelancerTimesheets.contracts,
  contractsReceived: state.freelancerTimesheets.contractsReceived,
  stats: state.freelancerTimesheets.timesheetStats,
  pagination: state.freelancerTimesheets.pagination,
})

const mapDispatchToProps = dispatch => ({
  getContracts: () => dispatch(createAction(GET_CONTRACTS)()),
  getTimesheets: () => dispatch(createAction(GET_TIMESHEETS)()),
  getTimesheetStats: () => dispatch(createAction(GET_TIMESHEET_STATS)()),
  showTimesheet: (id) => { browserHistory.push('/member/work_reports/[id]', `/member/work_reports/${id}`) },
  openWarning: params => dispatch(createAction(OPEN_WARNING_DIALOG)(params)),
  onChangePage: async params => dispatch(createAction(GET_TIMESHEETS)(params)),
  onChangeRowsPerPage: async params => dispatch(createAction(GET_TIMESHEETS)({ ...params, page: 0 })),
  openDeleteDialog: id => dispatch(createAction(OPEN_DELETE_DIALOG)({
    id,
    isUpdatesStore: true,
  })),
})

const connector = connect(mapStateToProps, mapDispatchToProps)

export type ContainerProps = ConnectedProps<typeof connector> & WithRouterProps

export default withRouter(connector(Timesheets))
