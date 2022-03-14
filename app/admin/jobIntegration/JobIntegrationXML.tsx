import React from 'react'
import { connect, ConnectedProps } from 'react-redux'
import Button from '@material-ui/core/Button'
import { showNotification as showNotificationAction } from 'ra-core/esm/actions/notificationActions'
import FlexhireAPI from 'api'

class JobIntegrationXML extends React.Component<ContainerProps> {
  clickHandler = (ev: React.MouseEvent<HTMLButtonElement>) => {
    return new FlexhireAPI().downloadJobIntegrationsXML()
  }

  render() {
    return (
      <Button
        style={{ height: 'unset', padding: '3px 0 0 0' }}
        onClick={this.clickHandler}
      >Get Job Integration XML
      </Button>
    )
  }
}

const connector = connect(null, { showNotification: showNotificationAction })
type ContainerProps = ConnectedProps<typeof connector>

export default connector(JobIntegrationXML)
