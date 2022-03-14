import { getAPIClient } from 'api'
import { Button, ConfirmationDialog } from 'components/themed'
import { useActionConfirmation, useCurrentUser, useSnackbar } from 'hooks'
import React, { useCallback } from 'react'
import { trackError } from 'services/analytics'
import { IFirm, IVideo } from 'types'
import { Delete } from '@material-ui/icons'

const RemoveVideoButton = ({ firm, video, onVideoRemoved }: { firm: IFirm, video: IVideo, onVideoRemoved: () => void }) => {
  const [user, refreshUser] = useCurrentUser()
  const showSnackbarMessage = useSnackbar()
  const removeVideo = useCallback(async () => {
    try {
      await getAPIClient().deleteVideo(video.id)
      if (firm?.slug === user?.firm?.slug) refreshUser()
      if (typeof onVideoRemoved === 'function') onVideoRemoved()
      showSnackbarMessage('The Video has been deleted')
    } catch (error) {
      showSnackbarMessage(error)
      trackError(error)
    }
  }, [refreshUser, firm?.slug, user?.firm?.slug, video?.id])
  const confirmation = useActionConfirmation(removeVideo)

  if (!video || !firm?.slug || !user?.firm?.slug || firm.slug !== user?.firm?.slug) return null

  return (
    <React.Fragment>
      <Button color="primary" onClick={confirmation.perform}>
        <Delete />
        Remove Video
      </Button>
      <ConfirmationDialog
        {...confirmation}
      />
    </React.Fragment>
  )
}

export default RemoveVideoButton
