import { useState, useCallback, useMemo } from 'react'
import { IAPIError, IVideo } from 'types'
import { getErrorText } from 'services/error'
import { trackError } from 'services/analytics'
import { getAPIClient } from 'api'
import { useCurrentUser } from './useCurrentUser'
import { useSnackbar } from './redux'

export interface useVideoRecorderOptions {
  videoParams?: any
  onUploadCompleted?: (video: IVideo) => void
  onUploadFailed?: (error: IAPIError) => void
}

export function useVideoRecorder(options: useVideoRecorderOptions = {}) {
  const [isUploading, setIsUploading] = useState(false)
  const [isVideoRecorderOpen, setIsVideoRecorderOpen] = useState(false)
  const openVideoRecorder = useCallback(() => setIsVideoRecorderOpen(true), [setIsVideoRecorderOpen])
  const onClose = useCallback(() => setIsVideoRecorderOpen(false), [setIsVideoRecorderOpen])
  const showSnackbarMessage = useSnackbar()
  const onVideoAvailable = useCallback(async (file: any) => {
    setIsUploading(true)
    setIsVideoRecorderOpen(false)

    try {
      const videoFormData = new FormData()
      videoFormData.append('file', file)
      Object.keys(options.videoParams).forEach(key => videoFormData.append(key, options.videoParams[key]))
      const video = await getAPIClient().postVideoUpload(videoFormData)
      if (video && typeof options.onUploadCompleted === 'function') options.onUploadCompleted(video)
    } catch (error) {
      showSnackbarMessage(getErrorText(error))
      trackError(error)
      if (typeof options.onUploadFailed === 'function') options.onUploadFailed(error)
    }

    setIsUploading(false)
  }, [setIsUploading, setIsVideoRecorderOpen, options.videoParams, options.onUploadCompleted, options.onUploadFailed])
  const [user] = useCurrentUser()
  const maxDuration = useMemo(() => {
    if (options?.videoParams?.firm_id || options?.videoParams?.job_id) return user?.configuration?.video_max_duration_company
    return user?.configuration?.video_max_duration
  }, [options?.videoParams])
  return {
    isUploading,
    isVideoRecorderOpen,
    openVideoRecorder,
    videoRecorderProps: {
      onVideoAvailable,
      onClose,
      maxDuration,
    },
  }
}
