import React, { Component } from 'react'
import { trackError } from 'services/analytics'
import { connect, ConnectedProps } from 'react-redux'
import Button from '@material-ui/core/Button'
import { showNotification as showNotificationAction } from 'react-admin'
import { httpClient, getBaseURL } from 'admin/api'

const connector = connect(null, {
  showNotification: showNotificationAction,
})

type ContainerProps = ConnectedProps<typeof connector>

class PayInvoiceButton extends Component<{ record: any } & ContainerProps> {
  handleClick = async () => {
    const { record, showNotification } = this.props
    try {
      await httpClient(`${getBaseURL()}/payouts/${record.id}/perform`, {
        method: 'POST',
      })
      showNotification('Payout performed')
    } catch (error) {
      trackError(error)
      showNotification(`Error: ${error}`, 'warning')
    }
  }

  render() {
    return <Button color="primary" onClick={this.handleClick}>Perform</Button>
  }
}

export default connector(PayInvoiceButton)
