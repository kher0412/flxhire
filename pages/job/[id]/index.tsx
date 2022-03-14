import { IAPIError, INextPageContext } from 'types'
import { PageBundlePlaceholder } from 'components'
import { setCookie } from 'nookies'
import { pageRedirect, getLocationSearch } from 'services/router'
import { ctxErrorInfo, trackError } from 'services/analytics'
import { isDevelopment } from 'services/environment'

const Redirector = ({ error }: { error?: string }) => <PageBundlePlaceholder error={error} />

Redirector.getInitialProps = async (ctx: INextPageContext) => {
  let slug : string
  let firmSlug : string
  let referralError: IAPIError
  let getJobError: IAPIError
  try {
    const referral = await ctx.api.getReferral(ctx.query.id as string)
    slug = referral.job?.slug
    firmSlug = referral.job?.firm_slug
    if (ctx.res) {
      // If this is running on the server, set the cookie now
      setCookie(ctx, 'referral', referral.token, {
        maxAge: 30 * 24 * 60 * 60,
        path: '/',
        domain: isDevelopment() ? undefined : 'flexhire.com',
      })
    }
  } catch (e) {
    referralError = e
  }
  if (!slug) {
    try {
      const job = await ctx.api.getJob(ctx.query.id)
      slug = job.slug
      firmSlug = job.firm_slug
    } catch (e) {
      getJobError = e
    }
  }
  if (slug && firmSlug) {
    const search = getLocationSearch({ asPath: ctx.asPath })
    pageRedirect(ctx.res, '/[...slugs]', `/${firmSlug}/${slug}${search}`)
    return {}
  }
  // If we get here, then finding the data failed.
  if (referralError && referralError?.code !== 404) trackError(referralError, ctxErrorInfo(ctx))
  if (getJobError && getJobError?.code !== 404) trackError(getJobError, ctxErrorInfo(ctx))
  let error = getJobError || referralError
  return {
    error: error.response || error.message,
  }
}

export default Redirector
