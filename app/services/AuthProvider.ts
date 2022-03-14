import { AuthProvider } from 'react-admin'
import { getAPIClient } from 'api'
import { getRealUser, canAccessAdminConsole, isRealAdmin } from 'services/user'

// Docs: https://marmelab.com/react-admin/Authentication.html#building-your-own-auth-provider

const authProvider: AuthProvider = {
  login: async ({ username, password }) => (
    getAPIClient().sendLoginForm({ email: username, password })
      .catch(error => Promise.reject(new Error(error.response || error.message)))
  ),
  checkError: (error) => {
    if (error.status === 401) return Promise.reject(new Error(error.response || error.message))
    return Promise.resolve()
  },
  checkAuth: () => getAPIClient().getCurrentUser().then((user) => {
    if (!canAccessAdminConsole(user)) {
      return Promise.reject(new Error('Permission Denied'))
    }
    return Promise.resolve()
  }),
  logout: async () => {
    await getAPIClient().sendLogout().catch(error => console.log(error))
    return '/login'
  },
  getIdentity: () => getAPIClient().getCurrentUser().then((currentUser) => {
    const user = getRealUser(currentUser)
    return { fullName: user.name, id: user.id, avatar: user.avatar_url }
  }),
  getPermissions: () => getAPIClient().getCurrentUser().then((user) => {
    if (isRealAdmin(user)) return 'admin'
    const roles = getRealUser(user).roles
    if (roles.indexOf('sales')) return 'sales'
    if (roles.indexOf('screening')) return 'screening'
    return null
  }),
}

export default authProvider
