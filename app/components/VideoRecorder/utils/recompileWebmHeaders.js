import EBML from 'ts-ebml'
import readFileAsArrayBuffer from 'services/readFile'

/**
 * Fixes incomplete MediaRecorder output in some Chromium-based browsers by recompiling WEBM headers.
 * Has no effect for non-WEBM files.
 *
 * @param {File} file
 */
export default async function recompileWebmHeaders(file) {
  if (!file.type.includes('video/webm') && (!file.name || !file.name.toLowerCase().includes('webm'))) {
    // Video definitely does not appear to be a WEBM, skip.
    return file
  }

  try {
    const fileBuffer = await readFileAsArrayBuffer(file)
    const decoder = new EBML.Decoder()
    const reader = new EBML.Reader()

    reader.drop_default_duration = false

    const elms = decoder.decode(fileBuffer)

    elms.forEach(elm => reader.read(elm))

    reader.stop()

    const refinedMetadataBuffer = EBML.tools.makeMetadataSeekable(reader.metadatas, reader.duration, reader.cues)
    const body = fileBuffer.slice(reader.metadataSize)

    return new File([refinedMetadataBuffer, body], file.name, {
      type: 'video/webm',
    })
  } catch (err) {
    console.warn(`Failed to recompile WEBM headers: ${err.message}`)
    return file
  }
}
