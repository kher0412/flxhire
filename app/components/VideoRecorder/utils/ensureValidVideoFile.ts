export async function ensureValidVideoFile(file: File): Promise<void> {
  if (!file) {
    throw new Error('No file specified.')
  }

  if (!file.type.match('video.*')) {
    throw new Error('File does not appear to be a video.')
  }

  let videoTesterElement = document.createElement('video')
  let videoObjectUrl = window.URL.createObjectURL(file)

  try {
    await new Promise((resolve, reject) => {
      videoTesterElement.onloadeddata = () => window.setTimeout(resolve, 200)
      videoTesterElement.onerror = () => reject(new Error('File does not appear to be a playable media file.'))
      videoTesterElement.preload = 'auto'
      videoTesterElement.src = videoObjectUrl
    })

    if (!videoTesterElement.canPlayType(file.type)) {
      throw new Error('File does not appear to be a playable media file.')
    }

    if (videoTesterElement.videoHeight <= 0 || videoTesterElement.videoWidth <= 0) {
      throw new Error('File does not appear to contain video.')
    }
  } finally {
    window.URL.revokeObjectURL(videoObjectUrl)
  }
}
