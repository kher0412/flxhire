import React from 'react'
import dynamic from 'services/dynamic'
import { MenuItem } from '@material-ui/core'
import { SelectField } from 'components/themed'
import { trackError } from 'services/analytics'
import { getAPIClient } from 'api'
import {
  ALL_TIMESHEETS_VALUE,
  NOT_INVOICED_VALUE,
} from '../../ManageDucks'

export const OLDER_INVOICES = -3

const InvoicesFilterDialog = dynamic(() => import(/* webpackChunkName: "InvoicesFilterDialog" */'./components/InvoicesFilterDialog'), { ssr: false })

export default class InvoicesFilter extends React.Component {
  state = {
    isDialogOpen: false,
    invoiceIds: [],
  }

  componentDidMount() {
    const { clientId } = this.props

    this.getClientInvoices({
      client_id: clientId,
    }).then((invoices) => {
      this.setState({
        invoiceIds: invoices.map(invoice => invoice.invoice_num),
      })
    })
  }

  render() {
    const { value, clientId, ...otherProps } = this.props
    const { isDialogOpen } = this.state

    return (
      <React.Fragment>
        <SelectField
          fullWidth
          reverseOptions
          data-cy="select-invoice"
          label="Invoice"
          numeric
          input={{
            value: value === ALL_TIMESHEETS_VALUE ? undefined : value,
            onChange: event => this.handleChange(event.target.value),
          }}
          {...otherProps}
        >
          {this.getInvoiceSelectOptions()}
        </SelectField>

        {isDialogOpen && (
          <InvoicesFilterDialog
            open
            onChange={this.handleChange}
            onClose={this.handleDialogClose}
            clientId={clientId}
          />
        )}
      </React.Fragment>
    )
  }

  handleDialogClose = () => {
    this.setState({
      isDialogOpen: false,
    })
  }

  handleChange = (value) => {
    const { onChange } = this.props
    const { isDialogOpen } = this.state

    if (value === OLDER_INVOICES) {
      this.setState({
        isDialogOpen: true,
      })
    } else if (onChange) {
      onChange(value)

      if (isDialogOpen) {
        this.setState({
          isDialogOpen: false,
        })
      }
    }
  }

  getInvoiceSelectOptions() {
    const { value } = this.props
    const { invoiceIds = [] } = this.state

    const options = []

    if (invoiceIds.length >= 6) {
      options.push({ value: OLDER_INVOICES, label: 'Older invoices...' })
    }

    for (const invoiceNum of invoiceIds.slice(0, 5)) {
      options.push({ value: invoiceNum, label: `Invoice #${invoiceNum}` })
    }

    options.push({ value: NOT_INVOICED_VALUE, label: 'Not yet invoiced' })
    options.push({ value: ALL_TIMESHEETS_VALUE, label: 'All invoices' })

    if (!options.find(o => o.value === value)) {
      options.push({ value, label: `Invoice #${value}` })
    }

    return options.map(o => (
      <MenuItem
        key={o.value}
        value={o.value}
        data-cy={`select-invoice-option-${o.value}`}
      >
        {o.label}
      </MenuItem>
    ))
  }

  getClientInvoices = async (params) => {
    const apiParams = {
      page: 0,
      per_page: 6,
      client_id: params.client_id,
      sort: 'invoice_num',
      order: 'desc',
      ...params,
    }

    try {
      const response = await getAPIClient().getClientInvoices(apiParams)
      return response.body
    } catch (error) {
      trackError(error)
    }

    return []
  }
}
