import Cookies from 'js-cookie'
import { INextPageContext } from 'types/next'
import { trackError } from 'services/analytics'
import { isPrerendering } from 'services/prerender'
import { getFlexhireEnvironment, isProduction } from './environment'

function getCookieName() {
  if (isProduction()) return 'flexhire'
  return `flexhire_${getFlexhireEnvironment()}`
}

export function getAuthCookie(req?: INextPageContext['req']) {
  try {
    if (!isPrerendering()) return Cookies.get(getCookieName())
    return req?.headers?.cookie || document?.cookie
  } catch (error) {
    return null
  }
}

export function deleteAuthCookie() {
  try {
    Cookies.remove(getCookieName()) // For development
    Cookies.remove(getCookieName(), { domain: '.flexhire.com' }) // For staging/prod
  } catch (error) {
    trackError(error)
  }
}
