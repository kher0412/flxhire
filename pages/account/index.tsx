import { LoadingPage } from 'components'
import { pageRedirect } from 'services/router'
import { INextPageContext } from 'types'

const Redirector = () => <LoadingPage />

Redirector.getInitialProps = async ({ res }: INextPageContext) => {
  pageRedirect(res, '/account/settings')
  return {}
}

export default Redirector
