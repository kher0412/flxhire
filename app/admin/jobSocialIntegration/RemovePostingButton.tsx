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
      await httpClient(`${getBaseURL()}/job_social_integrations/${record.id}/remove`, {
        method: 'POST',
      })
      showNotification('Job social integration removed')
    } catch (error) {
      trackError(error)
      showNotification(`Error: ${error}`, 'warning')
    }
  }

  render() {
    return <Button color="primary" onClick={this.handleClick}>Remove</Button>
  }
}

const connector = connect(null, { showNotification: showNotificationAction })

type ContainerProps = ConnectedProps<typeof connector>

export default connector(RemovePostingButton)
