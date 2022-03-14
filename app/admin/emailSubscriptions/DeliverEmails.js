import React from 'react'
import { connect } from 'react-redux'
import ConfirmButton from '../components/ConfirmButton'
import SendIcon from '@material-ui/icons/Send'
import { httpClient, getBaseURL } from 'admin/api'
import { showNotification as showNotificationAction } from 'react-admin'
import { trackError } from 'services/analytics'

class DeliverEmailsButton extends React.Component {
  send = async () => {
    const { showNotification } = this.props
    try {
      showNotification('Sending...')
      await httpClient(`${getBaseURL()}/email_subscriptions/deliver_emails`)
      showNotification('Done')
    } catch (error) {
      console.log(error)
      showNotification(`Error: ${error.message || error}`)
      trackError(error)
    }
  }

  render() {
    return (
      <ConfirmButton
        color="primary"
        dialogTitle="Send Subscription Emails"
        dialogMessage={(
          <div>
            <p>Every <b>ACTIVE</b> Subscription will be processed:</p>
            <p>If you are on PRODUCTION, all these people will receive their subscription emails NOW.</p>
            <p><b>Are you Sure?</b></p>
          </div>
        )}
        onClick={this.send}
      >
        <SendIcon style={{ marginRight: '10px' }} />
        Send Now
      </ConfirmButton>
    )
  }
}

const mapDispatchToProps = dispatch => ({
  showNotification: notification => dispatch(showNotificationAction(notification)),
})

export default connect(null, mapDispatchToProps)(DeliverEmailsButton)
