import { LoadingPage } from 'components'
import { pageRedirect } from 'services/router'
import { INextPageContext } from 'types'

const Redirector = () => <LoadingPage />

Redirector.getInitialProps = async ({ res, asPath }: INextPageContext) => {
  pageRedirect(res, asPath.replace(/\/client\/add_job(\/|$)/, '/client/job/add_job/job'))
  return {}
}

export default Redirector
