import { useEffect } from 'react'
import { DialogContentText, DialogTitle, DialogContent } from '@material-ui/core'
import { ResponsiveDialog } from 'components'
import { skipWaitingNewServiceWorker } from 'services/pwa'
import { useCurrentUser, useFrontendVersion, useQueryParams } from 'hooks'
import { buildQueryParams } from 'services/router'
import { trackEvent } from 'services/analytics'
import { isStaging } from 'services/environment'

const UpdateAvailable = () => {
  const [user] = useCurrentUser()
  const { updateAvailable } = useFrontendVersion()
  const query = useQueryParams()
  const enableUpdateDetection = user?.configuration?.enable_service_worker_update_detection ?? true

  const canUpdate = enableUpdateDetection && updateAvailable && !isStaging()

  useEffect(() => {
    let timeout = null
    if (canUpdate) {
      trackEvent('Frontend Update Available')
      // Force Service Worker to update (if any is waiting to activate)
      skipWaitingNewServiceWorker()
      // Wait some time to make sure the skip waiting goes through if needed
      // TODO: exponential backoff
      const attemptCount = parseInt(query?.update_apply_attempt || '0', 10)
      const step = 1000
      const waitTime = step + attemptCount * attemptCount * step
      console.log(`Waiting ${waitTime} to redirect`)
      timeout = setTimeout(() => {
        const target = `${window.location.origin + window.location.pathname}?${buildQueryParams({ ...query, update_apply_attempt: attemptCount + 1 })}`
        console.log(`Redirecting now to ${target}`)
        window.location.href = target
      }, waitTime)
    }
    return () => clearTimeout(timeout)
  }, [canUpdate])

  if (!canUpdate) return null

  return (
    <ResponsiveDialog open>
      <DialogTitle>Flexhire Update</DialogTitle>
      <DialogContent>
        <DialogContentText>
          A Flexhire update has been deployed. Please wait while the update is applied.
        </DialogContentText>
      </DialogContent>
    </ResponsiveDialog>
  )
}

export default UpdateAvailable
