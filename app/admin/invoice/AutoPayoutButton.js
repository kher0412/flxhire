import React from 'react'
import { connect } from 'react-redux'
import PaymentIcon from '@material-ui/icons/Payment'
import { httpClient, getBaseURL } from 'admin/api'
import { showNotification as showNotificationAction } from 'react-admin'
import ConfirmButton from '../components/ConfirmButton'

class AutoPayoutButton extends React.Component {
  send = async () => {
    const { showNotification } = this.props
    try {
      showNotification('Starting...')
      await httpClient(`${getBaseURL()}/invoices/run_payouts`)
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
        dialogTitle="Run Auto Payouts"
        dialogMessage={(
          <div>
            <p>Every <b>READY FOR AUTO PAYOUT</b> Invoice will be processed:</p>
            <p>Any <b>UNPAID INVOICED</b> Timesheets will be <b>PAID OUT NOW</b></p>
            <p><b>Are you Sure?</b></p>
          </div>
        )}
        onClick={this.send}
      >
        <PaymentIcon style={{ marginRight: '10px' }} />
        Run Payouts
      </ConfirmButton>
    )
  }
}

const mapDispatchToProps = dispatch => ({
  showNotification: notification => dispatch(showNotificationAction(notification)),
})

export default connect(null, mapDispatchToProps)(AutoPayoutButton)
