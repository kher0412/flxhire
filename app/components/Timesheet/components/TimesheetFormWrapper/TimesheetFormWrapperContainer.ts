import { connect, ConnectedProps } from 'react-redux'
import { reduxForm, InjectedFormProps } from 'redux-form'
import { RootState } from 'reducers'
import { ITimesheet } from 'types'
import TimesheetFormWrapper from './TimesheetFormWrapper'

const readonlyTimesheetForm = {
  form: 'timesheetForm',
  destroyOnUnmount: true,
  enableReinitialize: true,
}

const mapStateToProps = (state: RootState, ownProps: { timesheet?: ITimesheet }) => {
  const timesheet: Partial<ITimesheet> = ownProps.timesheet || {}

  return {
    initialValues: timesheet,
  }
}

const connector = connect(mapStateToProps)

export type ContainerProps = ConnectedProps<typeof connector> & InjectedFormProps

export default connector(reduxForm(readonlyTimesheetForm)(TimesheetFormWrapper)) as any
