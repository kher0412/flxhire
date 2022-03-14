import React from 'react'
import { getBaseURL, httpClient } from 'admin/api'
import { ConfirmButton } from 'components'
import { showNotification as showNotificationAction } from 'ra-core/esm/actions/notificationActions'
import { connect, ConnectedProps } from 'react-redux'

class SyncFinancialsButton extends React.Component<ConnectedProps<typeof connector>> {
  send = async () => {
    const { showNotification } = this.props
    try {
      showNotification('Starting...')
      await httpClient(`${getBaseURL()}/financials/sync`, {
        method: 'POST',
      })
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
        dialogTitle="Sync financials"
        dialogMessage={(
          <div>
            <p>All financials will be updated with actual value, except custom financial type</p>
            <p><b>Are you Sure?</b></p>
          </div>
        )}
        onClick={this.send}
      >
        Sync Financials
      </ConfirmButton>
    )
  }
}

const mapDispatchToProps = dispatch => ({
  showNotification: notification => dispatch(showNotificationAction(notification)),
})

const connector = connect(null, mapDispatchToProps)

export default connector(SyncFinancialsButton)
