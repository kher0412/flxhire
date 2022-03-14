import { LoadingPage } from 'components'
import { pageRedirect } from 'services/router'
import { INextPageContext } from 'types'

const Redirector = () => <LoadingPage />

Redirector.getInitialProps = async ({ res, asPath }: INextPageContext) => {
  pageRedirect(res, asPath.replace(/\/freelancer\//, '/member/'))
  return {}
}

export default Redirector
