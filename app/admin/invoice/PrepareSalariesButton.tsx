import React from 'react'
import { connect, ConnectedProps } from 'react-redux'
import AssignmentIcon from '@material-ui/icons/Assignment'
import { httpClient, getBaseURL } from 'admin/api'
import { showNotification as showNotificationAction } from 'react-admin'
import ConfirmButton from '../components/ConfirmButton'

class EmailInvoicesButton extends React.Component<ConnectedProps<typeof connector>> {
  send = async () => {
    const { showNotification } = this.props
    try {
      showNotification('Starting...')
      await httpClient(`${getBaseURL()}/invoices/prepare_salaries`)
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
        dialogTitle="Prepare Salaries"
        dialogMessage={(
          <div>
            <p>For all active salary contracts, new salary payroll items will be generated for this month.</p>
            <p><b>Are you Sure?</b></p>
          </div>
        )}
        onClick={this.send}
      >
        <AssignmentIcon style={{ marginRight: '10px' }} />
        Prepare Salaries
      </ConfirmButton>
    )
  }
}

const mapDispatchToProps = dispatch => ({
  showNotification: notification => dispatch(showNotificationAction(notification)),
})

const connector = connect(null, mapDispatchToProps)

export default connector(EmailInvoicesButton)
