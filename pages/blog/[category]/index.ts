import BlogPostList from 'scenes/Blog/components/BlogPostList'
import { withLayout } from 'withLayout'
import { trackError, ctxErrorInfo } from 'services/analytics'
import { setCategory } from 'scenes/Blog/BlogCategoryDucks'
import { INextPageContext } from 'types'

(BlogPostList as any).getInitialProps = async (ctx: INextPageContext) => {
  const dispatch = ctx.store.dispatch
  const slug = ctx.query.category as any
  try {
    const blogPost = await ctx.api.getBlogCategory(slug)
    dispatch(setCategory(blogPost))
  } catch (error) {
    trackError(error, ctxErrorInfo(ctx))
    return { error }
  }
}

export default withLayout(BlogPostList)
