import SlugViewer from 'scenes/SlugViewer'
import { INextPageContext, isFreelancer, isJob, isFirm } from 'types'
import { withLayout } from 'withLayout'
import { createAction } from 'redux-actions'
import { ctxErrorInfo, trackError } from 'services/analytics'
import { SET_LOADING, SET_RESOURCE, SET_ERROR } from 'scenes/SlugViewer/SlugViewerDucks'
import { setFreelancer } from 'scenes/FreelancerProfile/FreelancerProfileDucks'
import { SET_JOB } from 'scenes/Job/JobDucks'
import { SET_JOBS } from 'scenes/JobsListing/JobsListingDucks'
import { extractQueryParams, pageRedirect } from 'services/router'
import { setHeaderVariant } from 'components/Layout/LayoutDucks'
import { isPrerendering } from 'services/prerender'
import { isClient } from 'services/user'

const validSlugRegex = /^[a-zA-Z0-9-]+$/

const Component = SlugViewer as any

Component.getInitialProps = async (ctx: INextPageContext) => {
  const { res, query, asPath, store, api, currentUser } = ctx
  const dispatch = store.dispatch
  let id = query.slugs[0]
  let subid = query.slugs[1]
  const params = extractQueryParams(asPath)
  try {
    // Make `/careers` page be the Flexhire jobs listing
    if (id === 'careers') id = 'flexhire'
    // Test slug validity to avoid getting a Sentry report when bots try to
    // open nonsense pages like wp-login.php
    if (validSlugRegex.test(id) && (!subid || validSlugRegex.test(subid))) {
      // If the user is a client and there is a token for a candidate link
      // then redirect to the /view/[token] URL but only if the candidate link is from the same company
      if (params.token && isClient(currentUser)) {
        try {
          const candidateLink = await api.getLink(params.token)
          if (candidateLink.firm_id === currentUser.firm?.id) {
            pageRedirect(res, `/view/${params.token}`)
            return {}
          }
        } catch (error) {
          trackError(error, ctxErrorInfo(ctx))
        }
      }
      dispatch(createAction(SET_LOADING)({ id, subid }))
      const resource = await api.getMember(params.token || id, subid, { token: params.token })
      dispatch(createAction(SET_RESOURCE)({ id, subid, resource }))
      if (isFreelancer(resource)) dispatch(setFreelancer(resource))
      if (isJob(resource)) {
        if (resource.company_background_theme === 'light' && isPrerendering()) dispatch(setHeaderVariant({ variant: 'default' }))
        dispatch(createAction(SET_JOB)(resource))
      }
      if (isFirm(resource)) {
        if (resource.background_theme === 'light' && isPrerendering()) dispatch(setHeaderVariant({ variant: 'default' }))
        const jobs = await api.getJobs({ firm_id: resource.id, status: 'opened' })
        dispatch(createAction(SET_JOBS)({ jobs, id: resource.id }))
      }
      return { resource }
    }
    const error = { message: 'Invalid URL' }
    dispatch(createAction(SET_ERROR)(error))
    return { error }
  } catch (error) {
    // Do not track every 404 otherwise we get a lot of error reports from bots hitting random URLs
    // Also don't track 401 as it's used when a profile is private
    if (error.code !== 404 && error.code !== 401) trackError(error, ctxErrorInfo(ctx))
    dispatch(createAction(SET_ERROR)({
      response: error.response,
      message: error.message,
    }))
    return { error }
  }
}

export default withLayout(Component)
