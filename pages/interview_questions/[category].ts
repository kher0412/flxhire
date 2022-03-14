import { createAction } from 'redux-actions'
import { trackError, ctxErrorInfo } from 'services/analytics'
import Questions from 'scenes/Questions'
import { withLayout } from 'withLayout'
import { SET_QUESTIONS } from 'scenes/Questions/QuestionDucks'
import { INextPageContext } from 'types'

(Questions as any).getInitialProps = async (ctx: INextPageContext) => {
  try {
    const { query, store } = ctx
    if (query?.category) {
      const response = await ctx.api.getQuestionsFeaturedInCategory(query.category as string)
      store.dispatch(createAction(SET_QUESTIONS)({ questions: response.list, categoryName: response.category_name }))
    } else {
      const response = await ctx.api.getQuestions({ featured: true })
      store.dispatch(createAction(SET_QUESTIONS)({ questions: response.body }))
    }
  } catch (error) {
    trackError(error, ctxErrorInfo(ctx))
  }
}

export default withLayout(Questions)
