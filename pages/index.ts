import HomePage from 'scenes/Home'
import { withLayout } from 'withLayout'
import { trackError, ctxErrorInfo } from 'services/analytics'
import { createAction } from 'redux-actions'
import { INextPageContext } from 'types'
import { SET_TOP_FREELANCERS } from '../app/scenes/Home/HomeDucks'

function shuffle(a: any[]) {
  let i
  let j
  let temp

  a = a.slice()

  for (i = a.length - 1; i > 0; i--) {
    j = Math.floor(Math.random() * (i + 1))
    temp = a[i]
    a[i] = a[j]
    a[j] = temp
  }

  return a
}

(HomePage as any).getInitialProps = async (ctx: INextPageContext) => {
  try {
    const api = ctx.api
    let [skills, categories, freelancers] = await Promise.all([api.getFeaturedSkills(), api.getFeaturedQuestionCategories(), api.getTopFreelancers()])

    freelancers = shuffle(freelancers)

    ctx.store.dispatch(createAction(SET_TOP_FREELANCERS)({ freelancers }))
    return { skills, categories, freelancers }
  } catch (error) {
    trackError(error, ctxErrorInfo(ctx))
  }
  return {}
}

export default withLayout(HomePage, { name: 'Home' })
