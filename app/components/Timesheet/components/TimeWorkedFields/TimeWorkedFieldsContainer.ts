import { connect, ConnectedProps } from 'react-redux'
import { touch, getFormSyncErrors, formValueSelector } from 'redux-form'
import { RootState } from 'reducers'
import TimeWorkedFields from './TimeWorkedFields'

const mapStateToProps = (state: RootState) => ({
  syncErrors: getFormSyncErrors('timesheetForm')(state) as any,
  // TODO: this `values` exists as a workaround to fix a specific bug:
  // the component does not get rerendered when there is a change in an array item of "timesheet_entries"
  // this causes the totals in the table to not be updated in the UI.
  // Reading it like this solves that problem. Feel free to clean this up
  values: formValueSelector('timesheetForm')(state, 'timesheet_entries'),
})

const mapDispatchToProps = dispatch => ({
  touch: (...fields) => dispatch(touch('timesheetForm', ...fields)),
})

const connector = connect(mapStateToProps, mapDispatchToProps)

export type ContainerProps = ConnectedProps<typeof connector>

export default connector(TimeWorkedFields)
