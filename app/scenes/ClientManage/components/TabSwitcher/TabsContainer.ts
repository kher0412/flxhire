import { connect, ConnectedProps } from 'react-redux'
import { RootState } from 'reducers'
import Tabs from './Tabs'

const mapStateToProps = (state: RootState) => ({
  invoicesCount: state.clientManage.invoices.pagination.count,
  highlightedInvoicesCount: state.clientManage.invoices.highlightedCount,
  xEnablePayrollPage: state.auth.currentUser?.configuration?.enable_payroll_page,
  xEnableExpensesPage: state.auth.currentUser?.configuration?.enable_expenses_page,
  xEnableBonusesPage: state.auth.currentUser?.configuration?.enable_bonuses_page,
})

const connector = connect(mapStateToProps)

export type ContainerProps = ConnectedProps<typeof connector>

export default connector(Tabs)
