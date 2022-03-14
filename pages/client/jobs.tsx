import { PageBundlePlaceholder } from 'components'
import { pageRedirect } from 'services/router'

const Redirector: any = () => <PageBundlePlaceholder />

Redirector.getInitialProps = async ({ res }) => {
  pageRedirect(res, '/client/hire?tab=jobs')
  return {}
}

export default Redirector
