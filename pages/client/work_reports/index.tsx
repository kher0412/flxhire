import { PageBundlePlaceholder } from 'components'
import { pageRedirect, buildQueryParams } from 'services/router'

const Redirector = () => <PageBundlePlaceholder />

Redirector.getInitialProps = async ({ res, query }) => {
  const search = buildQueryParams({
    tab: 'work',
    invoice_id: query.invoice_id,
    id: query.id,
  })
  pageRedirect(res, `/client/manage?${search}`)
  return {}
}

export default Redirector
