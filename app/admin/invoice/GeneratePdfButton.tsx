import React, { Component } from 'react'
import { connect, ConnectedProps } from 'react-redux'
import Button from '@material-ui/core/Button'
import { trackError } from 'services/analytics'
import { showNotification as showNotificationAction } from 'react-admin'
import { httpClient, getBaseURL } from 'admin/api'

class GeneratePdfButton extends Component<ConnectedProps<typeof connector> & { record: any }> {
  handleClick = async () => {
    const { record, showNotification } = this.props
    try {
      await httpClient(`${getBaseURL()}/invoices/${record.id}`, {
        method: 'PUT',
        body: JSON.stringify({ generate_pdf: true }),
      })
      showNotification('PDF Generation Started')
    } catch (error) {
      trackError(error)
      showNotification(`Error: ${error}`, 'warning')
    }
  }

  render() {
    return <Button color="primary" onClick={this.handleClick}>(Re)Generate PDF</Button>
  }
}

const connector = connect(null, {
  showNotification: showNotificationAction,
})

export default connector(GeneratePdfButton)
