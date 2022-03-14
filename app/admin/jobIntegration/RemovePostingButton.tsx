import React, { Component } from 'react'
import { trackError } from 'services/analytics'
import { connect, ConnectedProps } from 'react-redux'
import Button from '@material-ui/core/Button'
import { showNotification as showNotificationAction } from 'react-admin'
import { httpClient, getBaseURL } from 'admin/api'

class RemovePostingButton extends Component<ContainerProps & { record?: any}> {
  handleClick = async () => {
    const { record, showNotification } = this.props
    try {
      await httpClient(`${getBaseURL()}/job_integrations/${record.id}/remove`, {
        method: 'POST',
      })
      showNotification('Job posting removed')
    } catch (error) {
      trackError(error)
      showNotification(`Error: ${error}`, 'warning')
    }
  }

  render() {
    const { record } = this.props
    if (!record?.supported_actions) return null
    if (record.supported_actions.filter(x => x.id === 'remove_job_posting').length > 0) {
      return <Button color="primary" onClick={this.handleClick}>Remove</Button>
    }
    return null
  }
}

const connector = connect(null, { showNotification: showNotificationAction })

type ContainerProps = ConnectedProps<typeof connector>

export default connector(RemovePostingButton)
