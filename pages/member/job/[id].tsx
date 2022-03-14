import { PageBundlePlaceholder } from 'components'
import { pageRedirect } from 'services/router'

const Redirector = () => <PageBundlePlaceholder />

Redirector.getInitialProps = async ({ res, query }) => {
  pageRedirect(res, `/job/${query.id}`)
  return {}
}

export default Redirector
