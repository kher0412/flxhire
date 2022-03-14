import { PageBundlePlaceholder } from 'components'
import { pageRedirect } from 'services/router'

const Redirector = () => <PageBundlePlaceholder />

Redirector.getInitialProps = async ({ res }) => {
  pageRedirect(res, '/client/manage?tab=invoices')
  return {}
}

export default Redirector
