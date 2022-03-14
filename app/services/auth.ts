import Acl from 'components/AuthGate/Acl'
import { omit } from 'lodash'
import { NextRouter } from 'next/router'
import { buildQueryParams, getLocationPathname, extractQueryParams } from 'services/router'
import { ICurrentUser } from 'types'
import { isClient, isGuest, isMember } from './user'

export const unauthenticatedPaths = {
  guest: '/login',
  member: {
    pending: '/profile',
    dashboard: '/member/dashboard',
  },
  client: {
    dashboard: '/client/dashboard',
  },
  admin: '/client/hire',
  unconfirmed: '/confirm_email',
  password_setup_required: '/password_setup',
}

export function getDefaultPath(user: ICurrentUser) {
  const defaultPath = '/'
  if (!user) return defaultPath
  let userType = isClient(user) ? 'client' : 'guest'
  if (isMember(user)) userType = 'member'
  let path = unauthenticatedPaths[userType] || defaultPath
  if (typeof path !== 'string') {
    if (!user.confirmed_email) {
      path = unauthenticatedPaths.unconfirmed
    } else if (user.password_setup_required) {
      path = unauthenticatedPaths.password_setup_required
    } else if (!isGuest(user)) {
      path = path[user.status] || path.dashboard
    } else {
      path = path.dashboard
    }
  }

  if (typeof path !== 'string') path = defaultPath

  return path
}

export function getRedirectUrl(query: any) {
  if (!query?.url) return null
  const params = buildQueryParams(omit(query, 'url'))
  return `${query.url}${params ? `?${params}` : ''}`
}

// This function is called to move the user away from a page the moment they
// are not allowed to be on it anymore
export function getRedirectPath(user: ICurrentUser, router: NextRouter) {
  const query = extractQueryParams(router.asPath)
  const currentUrl = getLocationPathname(router)

  if (user.password_setup_required) {
    // If the user does not have a password set then send them to password setup page
    return unauthenticatedPaths.password_setup_required
  }

  if (isMember(user) && user.status !== 'pending' && query.job) {
    // This is for users signing up or logging in for a job, we send them straight to the apply dialog
    return `/job/${query.job}?applying=true`
  }

  if (isClient(user) && currentUrl === '/flexmanage') {
    // This is for users signing up for "FlexManage", we send them to the team invitation page
    return '/client/invitation_team'
  }

  if (!isGuest(user) && currentUrl === unauthenticatedPaths.guest && query.url) {
    // If the user it at /login?url=... but they are logged in and have a "url" param, we send them there
    return getRedirectUrl(query)
  }

  if ((user.confirmed_email && !user.unconfirmed_email) && currentUrl === unauthenticatedPaths.unconfirmed && query.url) {
    // If the user it at /confirm_email?url=... but they are fully confirmed and have a "url" param, we send them there
    return getRedirectUrl(query)
  }

  if (isMember(user) && user.status === 'pending' && user.integration_name) {
    // This user was imported from greenhouse, they should go complete their profile
    return '/profile'
  }

  // At this point no special case is happening so we send the user to the default path
  const path = getDefaultPath(user)

  if ([unauthenticatedPaths.guest, unauthenticatedPaths.unconfirmed].includes(path)) {
    // If we are sending the user to login or confirm their email
    // we add a ?url= param so we can keep track of where they are coming from
    const search = buildQueryParams({
      url: currentUrl,
      ...query,
    })

    return `${path}?${search}`
  }

  // Otherwise we just redirect them to the default page for their type
  // while keeping the query params.
  const newQuery = buildQueryParams(query)
  return newQuery ? `${path}?${newQuery}` : path
}

export function isAllowed(name: string, user: ICurrentUser, router?: NextRouter) {
  const acl = Acl[name]
  const authorizer = acl?.authorizer || acl
  if (!authorizer) {
    throw new Error(`There is no ACL defined for the ${name} component. Add a rule in auth/authorization/Acl.js`)
  }
  return authorizer(user, { name, router })
}

export function checkAuthForPage(name: string, user: ICurrentUser, router: NextRouter) {
  const allowed = isAllowed(name, user)
  if (allowed) return { allowed: true }
  const redirectPath = getRedirectPath(user, router)
  if (router.asPath === redirectPath) throw new Error(`Infinite auth redirect loop to page ${name} with url: ${redirectPath} for user ${user?.id}`)
  return {
    allowed: false,
    redirect: redirectPath,
  }
}
