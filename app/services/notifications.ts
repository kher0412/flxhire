export function desktopNotificationsAvailable() {
  if (!('Notification' in window)) return false
  return true
}

export function desktopNotificationsEnabled() {
  if (!desktopNotificationsAvailable()) return false
  return Notification.permission === 'granted'
}

export function desktopNotificationsDenied() {
  if (!desktopNotificationsAvailable()) return false
  return Notification.permission === 'denied'
}

export async function requestDesktopNotificationPermissions() {
  if (!desktopNotificationsAvailable()) return false
  if (desktopNotificationsEnabled()) return true
  const permission = await Notification.requestPermission()
  return permission === 'granted'
}

export function createDesktopNotification(title: string, options?: NotificationOptions) {
  if (!desktopNotificationsEnabled()) return null
  return new Notification(title, options)
}
