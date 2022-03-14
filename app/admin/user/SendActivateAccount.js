import React from 'react'
import { connect } from 'react-redux'
import { Button } from '@material-ui/core'
import EmailIcon from '@material-ui/icons/Email'
import { httpClient, getBaseURL } from 'admin/api'
import { showNotification as showNotificationAction } from 'react-admin'

class SendActivationEmailButton extends React.Component {
  state = {
    loading: false,
  }

  send = async () => {
    const { record, showNotification } = this.props
    const { freelancerType, content } = this.state
    this.setState({ loading: true })
    try {
      await httpClient(`${getBaseURL()}/users/${record.id}/send_activation_email`, {
        method: 'POST',
        body: JSON.stringify({
          id: record.id,
          freelancer_type_id: freelancerType,
          content,
        }),
      })
      this.setState({ loading: false })
      showNotification('Email sent')
    } catch (error) {
      console.log(error)
      showNotification(`Error: ${error.message || error}`)
    }
  }

  render() {
    const { loading } = this.state
    return (
      <React.Fragment>
        <Button
          color="primary"
          onClick={this.send}
          disabled={loading}
        >
          <EmailIcon style={{ marginRight: '10px' }} />
          Send Activation Email
        </Button>
      </React.Fragment>
    )
  }
}

const mapDispatchToProps = dispatch => ({
  showNotification: notification => dispatch(showNotificationAction(notification)),
})

export default connect(null, mapDispatchToProps)(SendActivationEmailButton)
