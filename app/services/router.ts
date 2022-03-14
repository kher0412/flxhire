import { pickBy, isEmpty, isUndefined } from 'lodash'
import Router, { NextRouter } from 'next/router'
import { stringify, parse } from 'qs'
import { isPrerendering } from 'services/prerender'
import { trackError } from 'services/analytics'
import { NextPageContext } from 'next'
import { ServerResponse } from 'http'
import { ICurrentUser, IUserType } from 'types'
import { isIframe } from './iframe'
import { isClient, isMember } from './user'

export const isParamValid = (p: any): boolean => !isUndefined(p) && p !== null && p !== ''

export const buildQueryParams = (params: { [param: string] : any }): string => {
  const filtered = pickBy(params, isParamValid)
  return stringify(filtered)
}

export const extractQueryParams = (url?: string): { [key: string]: string } => {
  if (!url) return {}
  if (url.indexOf('?') < 0) return {}
  const result = parse(url.slice(url.indexOf('?') + 1))
  return pickBy(result, val => typeof val === 'string') as { [key: string]: string }
}

export function getLocationPathname(router?: NextRouter) {
  if (router) {
    const fullPath = router.asPath
    if (fullPath.indexOf('?') > 0) {
      return fullPath.slice(0, fullPath.indexOf('?'))
    }
    return fullPath
  }
  try {
    return window.location.pathname || '/'
  } catch (error) {
    throw new Error('Method unavailable on server')
  }
}

export function getLocationWithSearch(router?: NextRouter) {
  if (router) return router.asPath
  try {
    return getLocationPathname() + window.location.search
  } catch (error) {
    throw new Error('Method unavailable on server')
  }
}

const updateRoute = (newPath: string, asPath?: string, options?: any, router: NextRouter = Router) => {
  if (newPath && typeof newPath === 'string') {
    if ((asPath || newPath) === getLocationWithSearch()) {
      console.warn('Cannot push current path')
    } else {
      const method = options?.replace ? 'replace' : 'push'
      console.log(`Router ${method}`, newPath, asPath)

      if (isIframe()) {
        window.open(asPath || newPath, '_parent')
      } else {
        // Note: if asPath is null then the Router.push call will crash!!
        // Also, if asPath is undefined and options are passed the router navigation won't be smooth
        router[method](newPath, asPath || newPath, options).catch((error) => {
          trackError(error).then(() => {
            // When the router crashes, we fall back to cavemen routing
            // However we need to make sure Sentry reported the error before doing so
            window.location = (asPath || newPath) as any
          })
        })
      }
    }
  } else {
    console.warn('Cannot push invalid path')
  }
}

export function getLocationHash(router?: NextRouter) {
  if (router?.asPath && router.asPath.indexOf('#') >= 0) {
    return router.asPath.slice(router.asPath.indexOf('#') + 1)
  }
  try {
    return window.location.hash && window.location.hash.substring(1)
  } catch (error) {
    console.warn('getLocationHash is not available without router')
  }
  return ''
}

export function getBaseURL() {
  try {
    return `${window.location.protocol}//${window.location.host}`
  } catch (error) {
    // Does not work on server
    return process.env.ROOT_URL
  }
}

export function getCurrentLocationFull(router?: NextRouter) {
  let pathname = getLocationPathname(router)
  if (pathname === '/') pathname = ''
  return getBaseURL() + pathname
}

export function getLocationSearch(router: Pick<NextRouter, 'asPath'>) {
  const fullPath = router.asPath
  if (fullPath.indexOf('?') > 0) return fullPath.slice(fullPath.indexOf('?'))
  return ''
}

export function getSignupAndLoginQueryString(router: NextRouter, redirect = false) {
  const pathname = getLocationPathname(router)
  const isSignupOrLogin = /^\/(signup|login)/.test(pathname)
  // If on signup or login pages, then keep search parameters
  if (isSignupOrLogin) {
    const params = extractQueryParams(router.asPath)
    if (!redirect) delete params.url
    if (isEmpty(params)) return ''
    return `?${buildQueryParams(params)}`
  }
  // Otherwise if the user was not on the homepage and they want to login make sure user is redirected to the page they were
  if (pathname !== '/' && redirect) return `?url=${pathname}`
  return ''
}

export function getLoginRoute(router: NextRouter) {
  return { href: '/login', as: `/login${getSignupAndLoginQueryString(router, true)}` }
}

export function goToLogin(router: NextRouter) {
  const route = getLoginRoute(router)
  return updateRoute(route.href, route.as)
}

// Company and Freelancer are for retrocompatibility
export type UserTypePreference = 'client' | 'member' | 'company' | 'freelancer'

function userTypePreferenceToUserType(userTypePreference: UserTypePreference) : IUserType {
  if (userTypePreference === 'company') return 'client'
  if (userTypePreference === 'freelancer') return 'member'
  return userTypePreference
}

export function getSignupRoute(router, userTypePreference?: UserTypePreference, redirect = false) {
  let userType = userTypePreference
  const queryString = getSignupAndLoginQueryString(router, redirect)
  const query = parse(queryString.length > 0 && queryString[0] === '?' ? queryString.slice(1) : queryString)
  if (query?.job) userType = 'member'
  const signupType = userTypePreferenceToUserType(userType)
  const isGenericSignup = !['member', 'client'].includes(signupType)
  const href = isGenericSignup ? '/signup' : '/signup/[user_type]'
  const as = (isGenericSignup ? '/signup' : `/signup/${signupType}`) + queryString
  return { href, as }
}

export function goToSignup(router: NextRouter, userTypePreference?: UserTypePreference, redirect = false) {
  const route = getSignupRoute(router, userTypePreferenceToUserType(userTypePreference), redirect)
  return updateRoute(route.href, route.as)
}

export function getHomeLink(user: ICurrentUser) {
  if (isClient(user)) return { href: '/client/dashboard' }
  if (isMember(user)) return { href: '/member/dashboard' }
  return { href: '/' }
}

export function pageRedirect(res: ServerResponse, path = '/', as?: string, cacheControl?: string) {
  try {
    if (!path) throw new Error('Path required')
    if (res?.writeHead) {
      // If res is passed then we are on the server
      // we send a 302 Temporarily Moved
      if (cacheControl) res.setHeader('Cache-Control', cacheControl)
      const destination = as || path
      res.writeHead(302, {
        Location: destination,
      })
      console.log(`Server Side redirecting to ${destination}`)
      res.end()
    } else {
      if (isPrerendering()) throw new Error('Missing response for redirect')
      console.log(`Client Side redirecting to ${path} ${as}`)
      updateRoute(path, as)
    }
  } catch (error) {
    trackError(error)
  }
}

export function getRouterFromContext(ctx: NextPageContext) {
  if (!ctx) return undefined
  return {
    asPath: ctx.asPath,
    query: ctx.query,
    pathname: ctx.pathname,
  }
}

export function redirectOpener(destination: string) {
  try {
    // This will try opening the link in the opener tab for this tab, then closes this tab.
    // However, this can fail on iOS. In that case, we fall back to redirecting on this tab
    window.opener.location = destination as any
    window.close()
  } catch (error) {
    window.location = destination as any
  }
}

export const browserHistory = {
  push: updateRoute,
}
