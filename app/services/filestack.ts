import type { PickerOptions, PickerFileMetadata } from 'filestack-js/build/main/lib/picker'
import type { Client } from 'filestack-js'
import { trackError, trackEvent } from './analytics'

export async function init() : Promise<Client> {
  const w = window as any
  if (!w.flexhireFilepicker) {
    try {
      const filestack = await import(/* webpackChunkName: "Filestack" */'filestack-js')
      w.flexhireFilepicker = filestack.init(process.env.FILESTACK_KEY)
    } catch (error) {
      trackError(error)
    }
  }
  return w.flexhireFilepicker
}

export async function pickAndStore(options: PickerOptions = {}, callback: (file: PickerFileMetadata) => void) : Promise<void> {
  const filepicker = await init()
  try {
    return filepicker.picker({
      maxFiles: 1,
      accept: 'image/*',
      maxSize: 10 * 1024 * 1024, // 10 MB
      ...(options || {}),
      onUploadStarted: () => trackEvent('Filestack Upload Started'),
      onFileSelected: () => trackEvent('Filestack File Selected'),
      onFileCropped: () => trackEvent('Filestack File Cropped'),
      onClose: () => trackEvent('Filestack Close'),
      onCancel: () => trackEvent('Filestack Cancel'),
      onFileUploadStarted: () => trackEvent('Filestack File Upload Started'),
      onFileUploadFinished: () => trackEvent('Filestack File Upload Finished'),
      onFileUploadCancel: () => trackEvent('Filestack File Upload Cancel'),
      onFileUploadFailed: (file, error) => {
        try {
          console.log(`File upload for file ${file?.filename || '?'} failed`)
          trackError(error, {
            filename: file?.filename || '?',
          })
        } catch (err) {
          trackError(err)
        }
      },
      onUploadDone: (result) => {
        try {
          if (result.filesUploaded.length > 0) callback(result.filesUploaded[0])
          trackEvent('Filestack Upload Completed')
        } catch (error) {
          trackError(error)
        }
      },
    }).open()
  } catch (error) {
    trackError(error)
  }
  return null
}

function isFilestackUrl(url: string) {
  return /https?:\/\/cdn\.filestackcontent\.com/.test(url)
}

function getFileStackId(url: string) {
  return url.slice(url.lastIndexOf('/') + 1)
}

export function optimizeSrc(src: string, opt?: { width: number }) {
  if (!isFilestackUrl(src) || !getFileStackId(src)) return src
  let resizeSection = ''
  if (opt?.width > 0) {
    resizeSection = `resize=w:${opt.width}/`
  }
  return `https://cdn.filestackcontent.com/${resizeSection}auto_image/compress/${getFileStackId(src)}`
}

export function circleAvatarOptions(): PickerOptions {
  return {
    transformations: {
      circle: true,
      force: true,
    },
  }
}
