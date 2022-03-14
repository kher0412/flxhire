import ForTalent from 'scenes/ForTalent'
import { withLayout } from 'withLayout'
import { trackError, ctxErrorInfo } from 'services/analytics'
import { createAction } from 'redux-actions'
import { SET_TOP_FREELANCERS } from 'scenes/Home/HomeDucks'
import { INextPageContext } from 'types'

(ForTalent as any).getInitialProps = async (ctx: INextPageContext) => {
  try {
    const freelancers = await ctx.api.getTopFreelancers()
    ctx.store.dispatch(createAction(SET_TOP_FREELANCERS)({ freelancers }))
    return { freelancers }
  } catch (error) {
    trackError(error, ctxErrorInfo(ctx))
  }

  return {}
}

export default withLayout(ForTalent, { name: 'ForTalent' })
