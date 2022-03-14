import React, { useRef, useCallback, useMemo } from 'react'
import { Button, Tooltip } from '@material-ui/core'
import { ResponsiveButton } from 'components'
import { ConfirmationDialog } from 'components/themed'
import { trackEvent } from 'services/analytics'
import { useActionConfirmation } from 'hooks'
import { formatDurationInSeconds } from 'services/formatting'
import { AttachFile } from '@material-ui/icons'
import styles from './UploadFileButton.module.css'

const MAX_FILE_SIZE_MB = 100

interface IUploadFileButtonProps {
  onFileAvailable: (file: File) => void
  onFileError: (error: string) => void
  isRecordingStarted: boolean
  maxDuration: number
  big?: boolean
  style?: React.CSSProperties
}

const UploadFileButton = (props: IUploadFileButtonProps) => {
  const { isRecordingStarted, big, maxDuration, onFileAvailable, onFileError, style = {} } = props
  const input: React.MutableRefObject<HTMLInputElement> = useRef()
  const confirmationProps = useActionConfirmation(useCallback(() => input.current.click(), []))
  const confirmationDialogProps = useMemo(() => ({
    ...confirmationProps,
    title: 'Video limits',
    text: `Video file size must not exceed 100 MB and the recording length must be within ${formatDurationInSeconds(maxDuration) || '(no limit)'}`,
    confirmLabel: 'OK',
  }), [confirmationProps])

  const handleInputFileChange = useCallback((e) => {
    const fileInput = e.target || input.current

    if (fileInput.files && fileInput.files[0]) {
      const file: File = fileInput.files[0]
      if (file.size / 1000000 > MAX_FILE_SIZE_MB) {
        trackEvent('Video Recorder Upload File Too Big')
        if (onFileError) onFileError(`File too big. The maximum file size is ${MAX_FILE_SIZE_MB} MB`)
      } else {
        trackEvent('Video Recorder Upload File Selected')
        if (onFileAvailable) onFileAvailable(file)
      }
    }
  }, [onFileAvailable, onFileError, input.current])

  const InputElement = (
    <input
      className={styles.input}
      type="file"
      accept="video/mp4,video/x-m4v,video/*"
      ref={value => input.current = value}
      onChange={handleInputFileChange}
      data-cy="input-upload-video"
    />
  )

  if (big) {
    return (
      <Button
        onClick={confirmationProps.perform}
        disabled={isRecordingStarted}
        variant="outlined"
        style={{ borderColor: '#fff', color: '#fff', ...style }}
        data-cy="upload-video"
      >
        <AttachFile style={{ color: '#fff', marginRight: 12 }} />

        Upload local file

        {InputElement}

        <ConfirmationDialog {...confirmationDialogProps} />
      </Button>
    )
  }

  return (
    <Tooltip title="Upload local file">
      <ResponsiveButton
        onClick={confirmationProps.perform}
        disabled={isRecordingStarted}
        data-cy="upload-video"
        mobileLabel="Upload"
        variant="outlined"
        icon={<AttachFile />}
        style={style}
      >
        {InputElement}

        <ConfirmationDialog {...confirmationDialogProps} />
      </ResponsiveButton>
    </Tooltip>
  )
}

export default UploadFileButton
