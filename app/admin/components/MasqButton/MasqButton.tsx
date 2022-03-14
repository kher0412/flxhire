import { useCallback } from 'react'
import { showNotification as showNotificationAction } from 'react-admin'
import { Button } from '@material-ui/core'
import { closeConnection } from 'services/websockets'
import { useDispatchAction } from 'hooks'
import { getAPIClient } from 'api'

const MasqButton = ({ record }) => {
  const showNotification = useDispatchAction(showNotificationAction, [])
  const handleClick = useCallback(async () => {
    try {
      await getAPIClient().masq({ id: record.id })
      closeConnection()
      showNotification('Masqing setup')
      document.location.href = '/'
    } catch (error) {
      showNotification(`Error: ${error}`, 'warning')
      console.error(error)
    }
  }, [])
  return (
    <Button onClick={handleClick}>Masq</Button>
  )
}

export default MasqButton
