/**
 * Reads the contents of a File into an ArrayBuffer.
 * @param {File} file
 * @returns {Promise<ArrayBuffer>}
 */
export default async function readFileAsArrayBuffer(file) {
  return new Promise((resolve, reject) => {
    let fileReader = new FileReader()

    fileReader.onload = () => resolve(fileReader.result)
    fileReader.onerror = () => reject(fileReader.error)
    fileReader.onabort = () => reject(new Error('Aborted.'))

    fileReader.readAsArrayBuffer(file)
  })
}
