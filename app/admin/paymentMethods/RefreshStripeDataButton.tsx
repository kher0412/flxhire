import React, { Component } from 'react'
import { connect, ConnectedProps } from 'react-redux'
import Button from '@material-ui/core/Button'
import { trackError } from 'services/analytics'
import { showNotification as showNotificationAction } from 'react-admin'
import { httpClient, getBaseURL } from 'admin/api'

class RefreshStripeDataButton extends Component<ConnectedProps<typeof connector> & { record: any }> {
  handleClick = async () => {
    const { record, showNotification } = this.props
    try {
      await httpClient(`${getBaseURL()}/payment_methods/${record.id}/refresh_stripe_data`, {
        method: 'POST',
      })
      showNotification('Refresh completed')
    } catch (error) {
      trackError(error)
      showNotification(`Error: ${error}`, 'warning')
    }
  }

  render() {
    return <Button color="primary" onClick={this.handleClick}>Refresh Stripe Data</Button>
  }
}

const connector = connect(null, {
  showNotification: showNotificationAction,
})

export default connector(RefreshStripeDataButton)
