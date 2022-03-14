import { LoadingPage } from 'components'
import { pageRedirect } from 'services/router'
import { isGuest, isMember } from 'services/user'
import { INextPageContext } from 'types'

const Redirector = () => <LoadingPage />

Redirector.getInitialProps = async ({ res, currentUser }: INextPageContext) => {
  if (isMember(currentUser) && currentUser?.profile?.slug) {
    pageRedirect(res, '/[...slugs]', `/${currentUser.profile.slug}`)
  } else if (isGuest(currentUser)) {
    pageRedirect(res, '/login')
  } else {
    pageRedirect(res, '/')
  }
  return {}
}

export default Redirector
