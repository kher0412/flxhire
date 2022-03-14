import React, { Component } from 'react'
import { connect } from 'react-redux'
import Button from '@material-ui/core/Button'
import { trackError } from 'services/analytics'
import { showNotification } from 'react-admin'
import { httpClient, getBaseURL } from 'admin/api'

class SendInvoiceButton extends Component {
  handleClick = async () => {
    const { record, showNotification } = this.props
    try {
      await httpClient(`${getBaseURL()}/invoices/${record.id}`, {
        method: 'PUT',
        body: JSON.stringify({ send_now: true }),
      })
      showNotification('Invoice sent')
    } catch (error) {
      trackError(error)
      showNotification(`Error: ${error}`, 'warning')
    }
  }

  render() {
    return <Button color="primary" onClick={this.handleClick}>Resend</Button>
  }
}

export default connect(null, {
  showNotification,
})(SendInvoiceButton)
