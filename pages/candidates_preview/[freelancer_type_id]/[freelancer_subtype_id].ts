import { withLayout } from 'withLayout'
import { trackError, ctxErrorInfo } from 'services/analytics'
import CandidatesPreview from 'scenes/CandidatesPreview'
import { INextPageContext } from 'types'

(CandidatesPreview as any).getInitialProps = async (ctx: INextPageContext) => {
  try {
    const freelancerTypeSlug = ctx.query.freelancer_type_id as string | number
    const freelancerSubtypeSlug = ctx.query.freelancer_subtype_id as string | number
    const freelancerTypes = await ctx.api.getFreelancerTypes()
    const freelancerType = freelancerTypes.find(flType => flType.slug === freelancerTypeSlug)
    const freelancerSubtypes = await ctx.api.getFreelancerSubtypes(freelancerType?.id as number)

    return {
      freelancers: await ctx.api.getTopFreelancers({ freelancer_type_slug: freelancerTypeSlug, freelancer_subtype_slug: freelancerSubtypeSlug }),
      freelancerType: freelancerType || {},
      freelancerSubtype: freelancerSubtypes.find(flSubtype => flSubtype.slug === freelancerSubtypeSlug) || {},
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
