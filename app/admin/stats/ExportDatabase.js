import React from 'react'
import { connect } from 'react-redux'
import ConfirmButton from '../components/ConfirmButton'
import { httpClient, getBaseURL } from 'admin/api'
import DatabaseIcon from '@material-ui/icons/Storage'
import { showNotification as showNotificationAction } from 'react-admin'
import { isProduction } from 'services/environment'

class ExportDatabaseButton extends React.Component {
  send = async () => {
    const { showNotification } = this.props
    try {
      showNotification('Starting...')
      await httpClient(`${getBaseURL()}/database/export`, { method: 'POST' })
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
        dialogTitle="Export Database Now"
        dialogMessage={(
          <div>
            <p>The PRODUCTION DATABASE will be EXPORTED to the designated S3 BUCKET</p>
            {!isProduction() && (
            <React.Fragment>
              <p>The EXPORT will then be RESTORED to the STAGING database</p>
              <p>The MASK task will then run on the STAGING database, obfuscating financial data</p>
              <p>Finally, the STAGING database will be EXPORTED to the designated S3 BUCKET</p>
            </React.Fragment>
            )}
            <p><b>Are you Sure you want to run this now?</b></p>
          </div>
        )}
        onClick={this.send}
      >
        <DatabaseIcon style={{ marginRight: '10px' }} />
        Export Database
      </ConfirmButton>
    )
  }
}

const mapDispatchToProps = dispatch => ({
  showNotification: notification => dispatch(showNotificationAction(notification)),
})

export default connect(null, mapDispatchToProps)(ExportDatabaseButton)
