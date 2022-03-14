import { connect, ConnectedProps } from 'react-redux'
import { RootState } from 'reducers'
import Clients from './Clients'

const mapStateToProps = (state: RootState) => ({
  runningContracts: state.freelancerDashboard.interviewRequest.interviews
    .filter(x => x.status === 'active' || x.status === 'paused')
    .map(interview => ({
      ...interview,
      timesheets: (state.freelancerTimesheets.timesheets || []).filter(timesheet => (
        timesheet?.client_id === interview?.client?.id
      )),
    })),
})

const connector = connect(mapStateToProps)

export type ContainerProps = ConnectedProps<typeof connector>

export default connector(Clients)
