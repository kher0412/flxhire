import React from 'react'
import { getBaseURL, httpClient } from 'admin/api'
import { trackError } from 'services/analytics'
import Button from '@material-ui/core/Button'
import { connect } from 'react-redux'
import { showNotification as showNotificationAction } from 'react-admin'

const connector = connect(null, {
  showNotification: showNotificationAction,
})

const RefreshExchangeRates = ({ showNotification }: { showNotification: any }) => {
  const handleClick = async () => {
    try {
      await httpClient(`${getBaseURL()}/exchange_rates/refresh`, {
        method: 'POST',
      })
      showNotification('Rates will be refreshed')
    } catch (err) {
      trackError(err)
      showNotification(`Error: ${err}`, 'warning')
    }
  }

  return <Button color="primary" onClick={handleClick}>Refresh Rates</Button>
}

export default connector(RefreshExchangeRates)
