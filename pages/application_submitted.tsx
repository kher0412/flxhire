import { PageBundlePlaceholder } from 'components'
import { pageRedirect } from 'services/router'

const Redirector = () => <PageBundlePlaceholder />

Redirector.getInitialProps = async ({ res }) => {
  pageRedirect(res, '/application/interview')
  return {}
}

export default Redirector
