import { PageBundlePlaceholder } from 'components'
import { pageRedirect, buildQueryParams } from 'services/router'

const Redirector = () => <PageBundlePlaceholder />

Redirector.getInitialProps = async ({ res, query }) => {
  const search = buildQueryParams({
    job: query.id,
    tab: query.tab || 'applicants',
  })
  pageRedirect(res, `/client/hire?${search}`)
  return {}
}

export default Redirector
