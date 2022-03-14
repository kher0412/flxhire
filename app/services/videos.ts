export function convertVideoURLToUseCDN(url: string, cdnUrl: string) {
  if (!url || !cdnUrl) return url
  let replacementUrl = cdnUrl
  if (!cdnUrl.endsWith('/')) replacementUrl += '/'
  return url.replace(/^https?:\/\/s3\.amazonaws\.com\/flexhire-video-uploads\//, replacementUrl)
}
