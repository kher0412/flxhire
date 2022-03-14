import React, { Component } from 'react'
import { trackError } from 'services/analytics'
import { connect } from 'react-redux'
import Button from '@material-ui/core/Button'
import { showNotification as showNotificationAction } from 'react-admin'
import { httpClient, getBaseURL } from 'admin/api'

class PayInvoiceButton extends Component {
  handleClick = async () => {
    const { record, showNotification } = this.props
    try {
      await httpClient(`${getBaseURL()}/invoices/${record.id}`, {
        method: 'PUT',
        body: JSON.stringify({ pay_now: true }),
      })
      showNotification('Invoice paid')
    } catch (error) {
      trackError(error)
      showNotification(`Error: ${error}`, 'warning')
    }
  }

  render() {
    return <Button color="primary" onClick={this.handleClick}>Pay</Button>
  }
}

export default connect(null, {
  showNotification: showNotificationAction,
})(PayInvoiceButton)
