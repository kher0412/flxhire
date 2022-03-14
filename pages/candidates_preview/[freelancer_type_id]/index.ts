import { withLayout } from 'withLayout'
import { trackError, ctxErrorInfo } from 'services/analytics'
import CandidatesPreview from 'scenes/CandidatesPreview'
import { INextPageContext } from 'types'

(CandidatesPreview as any).getInitialProps = async (ctx: INextPageContext) => {
  try {
    const freelancerTypeSlug = ctx.query.freelancer_type_id as string | number
    const freelancerTypes = await ctx.api.getFreelancerTypes()
    const freelancerType = freelancerTypes.find(flType => flType.slug === freelancerTypeSlug)

    return {
      freelancers: await ctx.api.getTopFreelancers({ freelancer_type_slug: freelancerTypeSlug }),
      freelancerType: freelancerType || {},
      freelancerSubtype: {},
    }
  } catch (error) {
    trackError(error, ctxErrorInfo(ctx))

    return {
      freelancers: [],
      freelancerType: {},
      freelancerSubtype: {},
    }
  }
}

export default withLayout(CandidatesPreview)
