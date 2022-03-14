import { ICurrentUser, IUserRole } from 'types'

type UserWithRole = Pick<ICurrentUser, 'roles'>
type UserWithRealUser = Pick<ICurrentUser, 'real_user'>

export const isMasked = (user: UserWithRealUser) => Boolean(user?.real_user)

export const getRealUser = (user: ICurrentUser) => user?.real_user || user

export const hasRole = (user: UserWithRole, role: IUserRole) => user?.roles?.indexOf(role) >= 0

export const isMember = (user: UserWithRole) => hasRole(user, 'member')

export const isClient = (user: UserWithRole) => hasRole(user, 'client')

export const isRecruiter = (user: UserWithRole) => hasRole(user, 'recruiter')

export const isSales = (user: UserWithRole) => hasRole(user, 'sales')

export const isScreening = (user: UserWithRole) => hasRole(user, 'screening')

export const isMaskedAdmin = (user: UserWithRole & UserWithRealUser) => isMasked(user) && hasRole(user.real_user, 'admin')

export const isRealAdmin = (user: UserWithRole & UserWithRealUser) => isMaskedAdmin(user) || hasRole(user, 'admin')

export const isGuest = (user: Partial<Pick<ICurrentUser, 'roles'>>) => !user?.roles?.length

export const canAccessAdminConsole = (user: ICurrentUser) => {
  const realUser = getRealUser(user)
  return hasRole(realUser, 'admin') || hasRole(realUser, 'sales') || hasRole(realUser, 'screening')
}

export const canAccessMembersPipeline = (user: ICurrentUser) => {
  const realUser = getRealUser(user)
  return hasRole(realUser, 'admin') || hasRole(realUser, 'recruiter')
}

export const canAccessHireAdminTools = (user: ICurrentUser) => canAccessMembersPipeline(user)

export const hasCompletedBillingSetup = (user: ICurrentUser) => {
  if (!isClient(user) || user?.firm?.legacy_billing) return true
  if (!user?.firm?.payment_method && !user?.firm?.allow_no_payment_method) return false
  if (!user?.firm?.billing_plan) return false

  return true
}
