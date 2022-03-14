import { connect } from 'react-redux'
import { getAPIClient } from 'api'
import {
  ALL_TIMESHEETS_VALUE,
  NOT_INVOICED_VALUE,
} from '../../../../ManageDucks'
import InvoicesFilterDialog from './InvoicesFilterDialog'

const mapStateToProps = state => ({
  ALL_TIMESHEETS_VALUE: ALL_TIMESHEETS_VALUE,
  NOT_INVOICED_VALUE: NOT_INVOICED_VALUE,
})

const mapDispatchToProps = dispatch => ({
  getClientInvoices: async (params) => {
    const apiParams = {
      page: 0,
      per_page: 5000,
      client_id: params.client_id,
      sort: 'invoice_num',
      order: 'desc',
      ...params,
    }

    const response = await getAPIClient().getClientInvoices(apiParams)

    return response.body
  },
})

export default connect(mapStateToProps, mapDispatchToProps)(InvoicesFilterDialog)
