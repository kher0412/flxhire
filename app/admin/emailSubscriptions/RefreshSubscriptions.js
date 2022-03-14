import React from 'react'
import { connect } from 'react-redux'
import { Button } from '@material-ui/core'
import SettingsIcon from '@material-ui/icons/Settings'
import { httpClient, getBaseURL } from 'admin/api'
import { showNotification as showNotificationAction } from 'react-admin'
import { trackError } from 'services/analytics'

class RefreshSubscriptionsButton extends React.Component {
  send = async () => {
    const { showNotification } = this.props
    try {
      showNotification('Updating...')
      await httpClient(`${getBaseURL()}/email_subscriptions/refresh`)
      showNotification('Done')
    } catch (error) {
      console.log(error)
      showNotification(`Error: ${error.message || error}`)
      trackError(error)
    }
  }

  render() {
    return (
      <Button
        color="primary"
        onClick={this.send}
      >
        <SettingsIcon style={{ marginRight: '10px' }} /> Update
      </Button>
    )
  }
}

const mapDispatchToProps = dispatch => ({
  showNotification: notification => dispatch(showNotificationAction(notification)),
})

export default connect(null, mapDispatchToProps)(RefreshSubscriptionsButton)
