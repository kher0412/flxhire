import BlogPost from 'scenes/Blog/components/BlogPost'
import { withLayout } from 'withLayout'
import { trackError, ctxErrorInfo } from 'services/analytics'
import { setBlogPost } from 'scenes/Blog/BlogPostDucks'
import { INextPageContext } from 'types'

(BlogPost as any).getInitialProps = async (ctx: INextPageContext) => {
  const dispatch = ctx.store.dispatch
  const slug = ctx.query.post as any
  try {
    const blogPost = await ctx.api.getBlogPost(slug)
    dispatch(setBlogPost(blogPost))
  } catch (error) {
    trackError(error, ctxErrorInfo(ctx))
    return { error }
  }
}

export default withLayout(BlogPost)
