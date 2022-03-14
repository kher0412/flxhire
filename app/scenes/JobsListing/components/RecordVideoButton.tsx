import { Button } from 'components/themed'
import { useCurrentUser, useVideoRecorder } from 'hooks'
import React, { useCallback, useState, useEffect, CSSProperties } from 'react'
import { VideoRecorder } from 'components'
import { IFirm, IVideo } from 'types'
import { VideoCall } from '@material-ui/icons'

const RecordVideoButton = ({ firm, onVideoRecorded, style = {} }: { firm: IFirm, onVideoRecorded: (video: IVideo) => void, style?: CSSProperties }) => {
  const [user, refreshUser] = useCurrentUser()
  const [hasVideo, setHasVideo] = useState(false)
  useEffect(() => { if (firm?.video) setHasVideo(true) }, [firm?.video])
  const onUploadCompleted = useCallback((video: IVideo) => {
    setHasVideo(true)
    onVideoRecorded(video)
    if (firm?.slug === user?.firm?.slug) refreshUser()
  }, [refreshUser, firm?.slug, user?.firm?.slug])
  const videoRecording = useVideoRecorder({ videoParams: { firm_id: firm?.id }, onUploadCompleted })

  if (!firm?.slug || !user?.firm?.slug || firm.slug !== user?.firm?.slug) return null

  return (
    <React.Fragment>
      <Button color="primary" onClick={videoRecording.openVideoRecorder} disabled={videoRecording.isUploading} style={style}>
        <VideoCall />
        {videoRecording.isUploading && 'Uploading...'}
        {!videoRecording.isUploading && (hasVideo ? 'Replace Video' : 'Add Video')}
      </Button>
      {videoRecording.isVideoRecorderOpen && (
        <VideoRecorder
          title="Company Video"
          {...videoRecording.videoRecorderProps}
        />
      )}
    </React.Fragment>
  )
}

export default RecordVideoButton
