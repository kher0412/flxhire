import { isCypress } from './browserAgent'
import { isPrerendering } from './prerender'

export interface IEmbedOptions {
  showVideo?: boolean
  showText?: boolean
}

export function isIframe() : boolean {
  // In Cypress we want the app to think it's not running in an iframe
  if (isCypress()) return false

  // From https://stackoverflow.com/a/326076
  try {
    return window.self !== window.top
  } catch (e) {
    return true
  }
}

export function getEmbedCodeForJobsListing(firmSlug: string, embedOptions: IEmbedOptions = {}): string {
  if (isPrerendering()) return ''

  // create a HTMLScriptElement and assign its properties so that character escaping is taken care of
  // this is only used to get its computed outerHTML
  const scriptElem = document.createElement('script')

  scriptElem.src = `${process.env.ROOT_URL}/_next/static/scripts/embed-jobs.js` // TODO: maybe this src could be nicer
  scriptElem.dataset.company = firmSlug
  scriptElem.dataset.video = embedOptions.showVideo ? 'true' : 'false'
  scriptElem.dataset.text = embedOptions.showText ? 'true' : 'false'

  return scriptElem.outerHTML
}
