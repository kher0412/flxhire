import { ComponentProps } from 'react'
import { connect, ConnectedProps } from 'react-redux'
import { withRouter } from 'next/router'
import { createAction } from 'redux-actions'
import { WithRouterProps } from 'next/dist/client/with-router'
import { RootState } from 'reducers'
import { ClientPagePlaceholder, Suspense } from 'components'

import {
  SET_FILTER_PARAMS,
  SET_TAB,
  BULK_ACTION_TOGGLE_SELECTION,
  SET_BULK_ACTIONS_PARAMS,
  SELECT_ALL,
  PERFORM_BULK_ACTION,
  PERFORM_BULK_EMAIL,
  CLEAR_SELECTION,
  GET_INVOICES,
  PAGINATION_SORT,
  PAGINATION_ON_PAGE_CHANGE,
  PAGINATION_ON_ROWS_PER_PAGE_CHANGE,
  IManageFilterParams,
  IBulkActionParams,
  CLEAR_FILTER_PARAMS,
} from './ManageDucks'
import Manage from './ManageWrapper'

const mapStateToProps = (state: RootState) => ({
  tab: state.clientManage.tab,
  teamManagerCount: state.clientPageTitle.teamManagerCount,
  filterParams: state.clientManage.filterParams,
  // Team
  user: state.auth.currentUser,
  teamBulkActions: state.clientManage.team.bulkActions,
  // Invoices
  invoices: state.clientManage.invoices.invoices,
  invoicesReceived: state.clientManage.invoices.invoicesReceived,
  invoicesExist: state.clientManage.invoices.invoicesExist,
  invoicesPagination: state.clientManage.invoices.pagination,
  invoicesTotalUnpaid: state.clientManage.invoices.totalUnpaid,
  invoicesTotalOverdue: state.clientManage.invoices.totalOverdue,
  invoicesTotalCurrency: state.clientManage.invoices.totalCurrency,
})

const mapDispatchToProps = dispatch => ({
  setTab: tab => dispatch(createAction(SET_TAB)({ tab })),
  toggleBulkEdit: () => dispatch(createAction(SELECT_ALL)()),
  clearSelection: () => dispatch(createAction(CLEAR_SELECTION)()),
  performBulkAction: () => dispatch(createAction(PERFORM_BULK_ACTION)()),
  performBulkEmail: () => dispatch(createAction(PERFORM_BULK_EMAIL)()),
  toggleSelection: id => dispatch(createAction(BULK_ACTION_TOGGLE_SELECTION)({ id })),
  setBulkActionParam: (key: keyof IBulkActionParams, value) => dispatch(createAction(SET_BULK_ACTIONS_PARAMS)({ key, value })),
  setFilter: (key: keyof IManageFilterParams, value) => {
    dispatch(createAction(SET_FILTER_PARAMS)({
      key: key,
      value: value,
    }))
  },
  clearFilterParams: () => dispatch(createAction(CLEAR_FILTER_PARAMS)()),
  getInvoices: () => dispatch(createAction(GET_INVOICES)()),
  onChangePage: async (tab, page) => {
    dispatch(createAction(PAGINATION_ON_PAGE_CHANGE)({
      tab,
      page,
    }))
  },
  onChangeRowsPerPage: async (tab, rowsPerPage) => {
    dispatch(createAction(PAGINATION_ON_ROWS_PER_PAGE_CHANGE)({
      tab,
      rowsPerPage,
    }))
  },
  sortBy: async (tab, payload) => {
    dispatch(createAction(PAGINATION_SORT)({
      tab,
      ...payload,
    }))
  },
})

const connector = connect(mapStateToProps, mapDispatchToProps)

export type ContainerProps = ConnectedProps<typeof connector> & WithRouterProps

const ManageContainer = withRouter(connector(Manage))

// TODO: this should be removed and replaced with SSR loading of GraphQL data to avoid suspense on first render
const ManageContainerWrapper = (props: ComponentProps<typeof ManageContainer>) => (
  <Suspense
    fallback={<ClientPagePlaceholder />}
    ErrorFallbackComponent={_props => <ClientPagePlaceholder {..._props} />}
  >
    <ManageContainer {...props} />
  </Suspense>
)

export default ManageContainerWrapper
