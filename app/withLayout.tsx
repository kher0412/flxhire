import { ComponentType } from 'react'
import { NextComponentType } from 'next'
import { getRouterFromContext, pageRedirect } from 'services/router'
import { checkAuthForPage } from 'services/auth'
import AuthGate from 'components/AuthGate'
import { INextPageContext, isNextComponent } from 'types'
import { NextRouter } from 'next/router'
import { GraphQLTaggedNode } from 'relay-runtime'
import { WiredProps } from 'relay-nextjs/wired/component'
import withPreloadedQuery, { WithRelayOptions } from './withPreloadedQuery'

export interface WithLayoutOptions {
  name?: string
}

export function withLayout<Props = {}>(PageComponent: NextComponentType<Props> | ComponentType<Props>, options: WithLayoutOptions = {}) {
  const name = options?.name

  if (!name) return PageComponent

  const WithLayout: NextComponentType = (props: Props) => {
    return <AuthGate name={name}><PageComponent {...props} /></AuthGate>
  }

  WithLayout.getInitialProps = async (ctx: INextPageContext) => {
    const router = getRouterFromContext(ctx)
    const currentUser = ctx.currentUser
    const auth = checkAuthForPage(name, currentUser, router as NextRouter)
    const defaultProps = { user: currentUser, allowed: auth.allowed }

    if (auth.redirect) {
      pageRedirect(ctx.res, auth.redirect, null, 'private, no-cache')
      return defaultProps
    }

    if (isNextComponent(PageComponent)) {
      const pageProps = await PageComponent.getInitialProps(ctx)
      return { ...defaultProps, ...pageProps }
    }
    return defaultProps
  }

  return WithLayout
}

// TODO: Use ComponentType<Props> for the type of PageComponent. Figure out why it causes type errors
export function withLayoutAndPreloadedQuery<Props extends WiredProps, ServerSideProps>(PageComponent: any, query: GraphQLTaggedNode, options: WithRelayOptions<Props, ServerSideProps> & WithLayoutOptions = {}) {
  const wrappedComponent = withLayout<Props>(PageComponent, options)
  // TODO: figure out why cast to any is needed here
  return withPreloadedQuery(wrappedComponent as any, query, options)
}
