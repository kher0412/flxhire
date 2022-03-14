import React from 'react'
import { connect, ConnectedProps } from 'react-redux'
import { showNotification as showNotificationAction } from 'ra-core/esm/actions/notificationActions'
import { httpClient } from 'admin/api'
import { trackError } from 'services/analytics'
import { ConfirmButton } from 'components'
import { getBaseURL as getAPIBaseURL } from 'api'

class RotateJobs extends React.Component<{} & ContainerProps> {
  handleClick = async () => {
    const { showNotification } = this.props
    try {
      await httpClient(`${getAPIBaseURL()}/admin/job_integrations/rotate_jobs_admin`, {
        method: 'POST',
      })
      showNotification('Job rotation was queued')
    } catch (error) {
      trackError(error)
      showNotification(`Error: ${error}`, 'warning')
    }
  }

  render() {
    return (
      <ConfirmButton
        style={{ height: 'unset', padding: '3px 0 0 0' }}
        dialogTitle="Rotate Job Integrations"
        dialogMessage={(
          <div>
            <p>Job Integrations will be rotated</p>
            <p><b>Are you Sure?</b></p>
          </div>
        )}
        onClick={this.handleClick}
      >
        Rotate Job Integrations
      </ConfirmButton>
    )
  }
}

const connector = connect(null, { showNotification: showNotificationAction })
type ContainerProps = ConnectedProps<typeof connector>

export default connector(RotateJobs)
