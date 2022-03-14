import { IUserType } from 'types'
import { acquireLinkedInAccessToken } from './linkedin'
import { redirectOpener } from './router'
import { trackError } from './analytics'

export async function performOAuth(provider: string, userType: IUserType) {
  try {
    const readOnly = userType !== 'client'
    redirectOpener(`${window.location.origin}/auth/provider?code=${await acquireLinkedInAccessToken(readOnly)}&provider=${provider}&user_type=${userType}`)
  } catch (error) {
    // Do not track error if user canceled the operation
    if (error.message !== 'canceled') trackError(error)
  }
}
