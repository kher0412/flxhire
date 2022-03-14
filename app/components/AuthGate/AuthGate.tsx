import React from 'react'
import { pageRedirect } from 'services/router'
import { PageBundlePlaceholder } from 'components'
import { checkAuthForPage, getRedirectPath } from 'services/auth'
import { ContainerProps } from './AuthGateContainer'

interface IAuthGateProps extends ContainerProps {
  name: string
  renderIfNotAllowed?: boolean
}

function checkAuth(props) {
  const { user, name, router } = props
  return checkAuthForPage(name, user, router).allowed
}

class AuthGate extends React.Component<IAuthGateProps> {
  componentDidMount() {
    this.refresh()
  }

  componentDidUpdate(prevProps) {
    const allowed = checkAuth(this.props)
    const wasAllowed = checkAuth(prevProps)
    if (!allowed && wasAllowed) this.refresh()
  }

  refresh = () => {
    const allowed = checkAuth(this.props)
    if (!allowed) this.redirect()
  }

  redirect = () => {
    const { user, router } = this.props
    const redirectPath = getRedirectPath(user, router)
    console.log('Auth redirecting user to', redirectPath)
    return pageRedirect(null, redirectPath, null, 'no-cache')
  }

  render = () => {
    const { renderIfNotAllowed = false } = this.props
    const allowed = checkAuth(this.props)
    if (allowed || renderIfNotAllowed) return this.props.children
    return <PageBundlePlaceholder />
  }
}

export default AuthGate
