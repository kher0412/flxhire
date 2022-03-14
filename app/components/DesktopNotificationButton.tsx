import React, { CSSProperties, useEffect, useState, useCallback } from 'react'
import {
  desktopNotificationsEnabled,
  desktopNotificationsAvailable,
  desktopNotificationsDenied,
  requestDesktopNotificationPermissions,
} from 'services/notifications'
import { trackError, trackEvent } from 'services/analytics'
import { ConfirmButton } from 'components'
import { Badge, Zoom } from '@material-ui/core'
import { NotificationsNone } from '@material-ui/icons'

export type IDesktopNotificationsStatus = 'denied' | 'enabled' | 'available'

export const useDesktopNotifications = () => {
  const [desktopNotificationsStatus, setDesktopNotificationsStatus] = useState(null as IDesktopNotificationsStatus)
  useEffect(() => {
    if (desktopNotificationsDenied()) {
      setDesktopNotificationsStatus('denied')
    } else if (desktopNotificationsEnabled()) {
      setDesktopNotificationsStatus('enabled')
    } else if (desktopNotificationsAvailable()) {
      setDesktopNotificationsStatus('available')
    }
  })
  const enableDesktopNotifications = useCallback(() => {
    requestDesktopNotificationPermissions().then((result) => {
      if (result) {
        setDesktopNotificationsStatus('enabled')
        trackEvent('Enabled Desktop Notifications')
      }
    }).catch(err => trackError(err))
  }, [])
  return [
    desktopNotificationsStatus,
    enableDesktopNotifications,
  ] as [IDesktopNotificationsStatus, () => void]
}

const DesktopNotificationButton = ({ style }: { style?: CSSProperties }) => {
  const [desktopNotificationsStatus, enableDesktopNotifications] = useDesktopNotifications()
  return (
    <Zoom
      in={desktopNotificationsStatus === 'available'}
      mountOnEnter
      unmountOnExit
    >
      <ConfirmButton
        icon
        tooltip="Enable Desktop Notifications"
        dialogTitle="Enable Desktop Notifications"
        dialogMessage="After confirming, you'll receive a prompt from your browser to enable Desktop Notifications for Flexhire. By doing so, you'll be notified if you receive a message while Flexhire is open in the background."
        dialogConfirmLabel="Confirm"
        onClick={enableDesktopNotifications}
        style={style}
        size="small"
      >
        <Badge variant="dot" color="secondary" overlap="circle" anchorOrigin={{ vertical: 'top', horizontal: 'right' }}>
          <NotificationsNone />
        </Badge>
      </ConfirmButton>
    </Zoom>
  )
}

export default DesktopNotificationButton
