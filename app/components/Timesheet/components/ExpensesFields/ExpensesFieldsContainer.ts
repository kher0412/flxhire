import { connect, ConnectedProps } from 'react-redux'
import { getFormSyncErrors, getFormValues, touch } from 'redux-form'
import { RootState } from 'reducers'
import { Currency } from 'types'
import ExpensesFields from './ExpensesFields'

const mapStateToProps = (state: RootState) => ({
  currency: (getFormValues('timesheetForm')(state) as any)?.currency as Currency,
  syncErrors: getFormSyncErrors('timesheetForm')(state) as any,
})

const mapDispatchToProps = dispatch => ({
  touch: (...fields) => dispatch(touch('timesheetForm', ...fields)),
})

const connector = connect(mapStateToProps, mapDispatchToProps)

export type ContainerProps = ConnectedProps<typeof connector>

export default connector(ExpensesFields)
