import { getRealUser, isGuest, isRealAdmin, isMember, isClient, hasRole } from 'services/user'
import { ICurrentUser } from 'types'

export const userSetupCompleted = (user: ICurrentUser) => user.confirmed_email && !user.password_setup_required && !isGuest(user)

export const unconfirmed_email_allowed = (user: ICurrentUser) => !isGuest(user) && (!user.confirmed_email || user.unconfirmed_email)
export const password_setup_required_allowed = (user: ICurrentUser) => Boolean(user.id) && user.password_setup_required

export const all_allowed = (user: ICurrentUser) => true
export const guest_allowed = (user: ICurrentUser) => isGuest(user)

export const freelancer_pending_allowed = (user: ICurrentUser) => isMember(user) && user.status === 'pending' && userSetupCompleted(user)
export const freelancer_accepted_allowed = (user: ICurrentUser) => isMember(user) && user.status === 'accepted' && userSetupCompleted(user)
export const freelancer_applied_allowed = (user: ICurrentUser) => isMember(user) && user.status === 'applied' && userSetupCompleted(user)
export const freelancer_interviewing_allowed = (user: ICurrentUser) => isMember(user) && user.status === 'interview' && userSetupCompleted(user)
const freelancer_applying_allowed = (user: ICurrentUser) => isMember(user) && user.status === 'applying' && userSetupCompleted(user)
export const freelancer_in_screening_allowed = (user) => {
  return (freelancer_applied_allowed(user) ||
    freelancer_applying_allowed(user) ||
    freelancer_interviewing_allowed(user)) && userSetupCompleted(user)
}
export const freelancer_allowed = (user: ICurrentUser) => isMember(user) && userSetupCompleted(user)

export const freelancer_to_onboard_allowed = (user: ICurrentUser) => isMember(user) && user.status === 'accepted' && userSetupCompleted(user)

// NOTE: we treat as "unverified" a pending freelancer imported from an integration
export const freelancer_unverified_allowed = (user: ICurrentUser) => isMember(user) && ((user.status === 'pending' && user.integration_name) || ['unverified', 'applied', 'applying', 'interview', 'accepted', 'rejected'].indexOf(user.status) >= 0) && userSetupCompleted(user)

export const freelancer_deleted_allowed = (user: ICurrentUser) => isMember(user) && ['deleted'].indexOf(user.status) >= 0 && userSetupCompleted(user)

export const client_allowed = (user: ICurrentUser) => isClient(user) && userSetupCompleted(user)

export const admin_allowed = (user: ICurrentUser) => isRealAdmin(user) && userSetupCompleted(getRealUser(user))
export const recruiter_allowed = (user: ICurrentUser) => (isRealAdmin(user) || hasRole(getRealUser(user), 'recruiter')) && userSetupCompleted(getRealUser(user))
export const sales_allowed = (user: ICurrentUser) => hasRole(getRealUser(user), 'sales') && userSetupCompleted(getRealUser(user))

export function oneOf(...fns) {
  return (...args) => fns.map(fn => fn(...args)).reduce((prev, current) => prev || current)
}
