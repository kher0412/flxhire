import { PageBundlePlaceholder } from 'components'
import { pageRedirect } from 'services/router'

const Redirector = () => <PageBundlePlaceholder />

Redirector.getInitialProps = async ({ res }) => {
  pageRedirect(res, '/client/hire?tab=offers')
  return {}
}

export default Redirector
