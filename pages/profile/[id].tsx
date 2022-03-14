import { LoadingPage } from 'components'
import { pageRedirect } from 'services/router'

const Redirector = () => <LoadingPage />

Redirector.getInitialProps = async ({ res }) => {
  pageRedirect(res, '/profile')
  return {}
}

export default Redirector
