import React from 'react'
import { connect, ConnectedProps } from 'react-redux'
import { formValueSelector } from 'redux-form'
import { RootState } from 'reducers'
import { ITimesheet, IContractForFreelancer, Currency } from 'types'
import TimesheetWrapper from './TimesheetWrapper'

const mapStateToProps = (state: RootState) => ({
  user: state.auth.currentUser,
  clientId: formValueSelector('timesheetForm')(state, 'client_id'),
  currency: formValueSelector('timesheetForm')(state, 'currency') as Currency,
})

const connector = connect(mapStateToProps)

export type ContainerProps = ConnectedProps<typeof connector> & {
  editable?: boolean
  timesheet: ITimesheet
  contracts?: IContractForFreelancer[]
  actions?: React.ReactNode
  disableCardBorders: boolean
}

export default connector(TimesheetWrapper)
