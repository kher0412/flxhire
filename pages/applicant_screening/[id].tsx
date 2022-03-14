import { LoadingPage } from 'components'
import { pageRedirect } from 'services/router'
import { INextPageContext } from 'types'

const Redirector = () => <LoadingPage />

Redirector.getInitialProps = async ({ res, asPath }: INextPageContext) => {
  pageRedirect(res, asPath.replace(/\/applicant_screening\//, '/pre_interview_questions/'))
  return {}
}

export default Redirector
