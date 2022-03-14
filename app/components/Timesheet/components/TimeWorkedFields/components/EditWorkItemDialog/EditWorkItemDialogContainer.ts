import { connect, ConnectedProps } from 'react-redux'
import { RootState } from 'reducers'
import { getFormValues } from 'redux-form'
import EditWorkItemDialog from './EditWorkItemDialog'

const mapStateToProps = (state: RootState) => ({
  entries: (getFormValues('timesheetForm')(state) as any)?.timesheet_entries,
})

const connector = connect(mapStateToProps)

export type ContainerProps = ConnectedProps<typeof connector>

export default connector(EditWorkItemDialog)
