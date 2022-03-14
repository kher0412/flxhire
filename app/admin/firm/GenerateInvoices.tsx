import React, { Component } from 'react'
import { trackError } from 'services/analytics'
import { connect, ConnectedProps } from 'react-redux'
import { showNotification as showNotificationAction } from 'react-admin'
import { httpClient, getBaseURL } from 'admin/api'
import { ConfirmButton } from 'components'

class GenerateInvoicesButton extends Component<ContainerProps & { record: any }> {
  handleClick = async () => {
    const { record, showNotification } = this.props
    try {
      await httpClient(`${getBaseURL()}/firms/${record.id}/generate_invoices`, {
        method: 'POST',
      })
      showNotification('Invoice generation completed')
    } catch (error) {
      trackError(error)
      showNotification(`Error: ${error}`, 'warning')
    }
  }

  render() {
    return (
      <ConfirmButton
        color="primary"
        dialogTitle="Generate Invoices"
        dialogMessage={(
          <div>
            <p>Invoices will be generated right now for the company you selected, with the same logic as the scheduled invoice generation date.</p>
            <p><b>Are you Sure?</b></p>
          </div>
        )}
        onClick={this.handleClick}
      >
        Generate Invoices
      </ConfirmButton>
    )
  }
}

const connector = connect(null, {
  showNotification: showNotificationAction,
})

type ContainerProps = ConnectedProps<typeof connector>

export default connector(GenerateInvoicesButton)
