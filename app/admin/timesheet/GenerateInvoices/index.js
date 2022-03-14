import React from 'react'
import { connect } from 'react-redux'
import ConfirmButton from '../../components/ConfirmButton'
import InvoiceIcon from '@material-ui/icons/Assignment'
import { httpClient, getBaseURL } from 'admin/api'
import { showNotification as showNotificationAction } from 'react-admin'

class GenerateInvoicesButton extends React.Component {
  send = async () => {
    const { showNotification } = this.props
    try {
      showNotification('Generating...')
      await httpClient(`${getBaseURL()}/invoices/generate`)
      showNotification('Done')
    } catch (error) {
      console.log(error)
      showNotification(`Error: ${error.message || error}`)
    }
  }

  render() {
    return (
      <ConfirmButton
        color="primary"
        dialogTitle="Generate Invoices"
        dialogMessage={(
          <div>
            <p>Every <b>READY FOR INVOICING</b> Timesheet will be processed:</p>
            <p>All of these Timesheets will be part of newly generated Invoices. This button is meant mostly for testing, if you are on PRODUCTION the invoice generation should happen automatically.</p>
            <p><b>Are you Sure?</b></p>
          </div>
        )}
        onClick={this.send}
      >
        <InvoiceIcon style={{ marginRight: '10px' }} />
        Generate Invoices
      </ConfirmButton>
    )
  }
}

const mapDispatchToProps = dispatch => ({
  showNotification: notification => dispatch(showNotificationAction(notification)),
})

export default connect(null, mapDispatchToProps)(GenerateInvoicesButton)
