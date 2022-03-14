import { withLayout } from 'withLayout'
import { trackError, ctxErrorInfo } from 'services/analytics'
import { createAction } from 'redux-actions'
import { SET_SKILL, SET_TOP_FREELANCERS } from 'scenes/SampleSkills/SampleSkillsDucks'
import SampleSkills from 'scenes/SampleSkills'
import { INextPageContext } from 'types'

(SampleSkills as any).getInitialProps = async (ctx: INextPageContext) => {
  try {
    const { query, store } = ctx
    const slug = query.slug
    const freelancerTypeName = query.freelancer_type_id as any
    const skill = await ctx.api.getSkillBySlug(slug)
    store.dispatch(createAction(SET_SKILL)(skill))
    const topFreelancers = await ctx.api.getTopFreelancersBySkill(skill.id, freelancerTypeName)
    store.dispatch(createAction(SET_TOP_FREELANCERS)(topFreelancers))
  } catch (error) {
    trackError(error, ctxErrorInfo(ctx))
  }
}

export default withLayout(SampleSkills)
