import React from 'react'
import { connect } from 'react-redux'
import ConfirmButton from '../components/ConfirmButton'
import EmailIcon from '@material-ui/icons/Email'
import { httpClient, getBaseURL } from 'admin/api'
import { showNotification as showNotificationAction } from 'react-admin'

class EmailInvoicesButton extends React.Component {
  send = async () => {
    const { showNotification } = this.props
    try {
      showNotification('Starting...')
      await httpClient(`${getBaseURL()}/invoices/email_clients`)
      showNotification('Job Started')
    } catch (error) {
      console.log(error)
      showNotification(`Error: ${error.message || error}`)
    }
  }

  render() {
    return (
      <ConfirmButton
        color="primary"
        dialogTitle="Email Invoices"
        dialogMessage={(
          <div>
            <p>Every <b>READY TO EMAIL</b> Invoice will be processed:</p>
            <p>The processed invoices will be EMAILED OUT TO CLIENTS NOW</p>
            <p><b>Are you Sure?</b></p>
          </div>
        )}
        onClick={this.send}
      >
        <EmailIcon style={{ marginRight: '10px' }} />
        Email Invoices
      </ConfirmButton>
    )
  }
}

const mapDispatchToProps = dispatch => ({
  showNotification: notification => dispatch(showNotificationAction(notification)),
})

export default connect(null, mapDispatchToProps)(EmailInvoicesButton)
