import { NextPageContext } from 'next'
import { getAuthCookie } from 'services/cookies'
import { WiredDocument } from 'relay-nextjs/wired/document'
import { getWiredServerContext, WiredServerContext } from 'relay-nextjs/wired/context'
import { WiredSerializedState } from 'relay-nextjs/wired/serialized_state'
import { ServerStyleSheets } from '@material-ui/core'
import serialize from 'serialize-javascript' // this is a dependency of relay-nextjs, so we have it
import { withRelay } from 'relay-nextjs'
import { PageBundlePlaceholder, Suspense } from 'components'
import { ComponentType } from 'react'
import { WiredOptions, WiredProps } from 'relay-nextjs/wired/component'
import { GraphQLTaggedNode } from 'relay-runtime'
import { getClientEnvironment } from 'api/graphql/relay/clientEnvironment'

export async function createServerEnvironmentFromCtx(ctx: NextPageContext) {
  const { createServerEnvironment: createEnvironment } = await import(
    /* webpackChunkName: "RelayServerEnrivonment" */'./api/graphql/relay/serverEnvironment'
  )
  return createEnvironment(getAuthCookie(ctx?.req))
}

// This function is copied from https://github.com/RevereCRE/relay-nextjs/blob/main/src/wired/document.tsx
// The reason we don't just import it is that it must be customized for working with Material-UI
export function createWiredDocument(sheets: ServerStyleSheets): WiredDocument {
  let capturedWiredContext: WiredServerContext | undefined

  const enhance: WiredDocument['enhance'] = (App) => {
    return (props) => {
      // Here we add this "if" condition to prevent `sheets.collect` from not working
      // in pages that do not use withRelay.
      if (props?.pageProps?.__wired__server__context) {
        // console.log('Captured wire context')
        capturedWiredContext = getWiredServerContext(
          props.pageProps.__wired__server__context,
        )
      } else {
        // console.log('Did not capture wire context')
      }

      // console.log('Collecting Sheets')
      // This "sheets.collect" call is the part that has to be customized by us
      return sheets.collect(<App {...props} />)
    }
  }

  const Script = () => {
    if (capturedWiredContext == null) {
      // console.log('No write context. Skipping relay SSR script')
      return null
    }

    // console.log('Preparing relay SSR script')
    const records = capturedWiredContext.preloadedQuery.environment
      .getStore()
      .getSource()
      .toJSON()

    const serializedState: WiredSerializedState = {
      records,
      query: capturedWiredContext.query,
      variables: capturedWiredContext.variables,
    }

    return (
      <script
        // eslint-disable-next-line react/no-danger
        dangerouslySetInnerHTML={{
          __html: `window.__wired__=${serialize(serializedState)}`,
        }}
      />
    )
  }

  return { enhance, Script }
}

export type WithRelayOptions<Props extends WiredProps, ServerSideProps> = Omit<WiredOptions<Props, ServerSideProps>, 'createClientEnvironment' | 'createServerEnvironment'>

export default function withPreloadedQuery<Props extends WiredProps, ServerSideProps>(Component: ComponentType<Props>, query: GraphQLTaggedNode, opts: WithRelayOptions<Props, ServerSideProps> = {}) {
  const WrappedComponent = ({ preloadedQuery, ...props }: any) => (
    preloadedQuery ? (
      <Suspense ssr fallback={<PageBundlePlaceholder />}>
        <Component preloadedQuery={preloadedQuery} {...props} />
      </Suspense>
    ) : null
  )
  return withRelay(
    WrappedComponent,
    query,
    {
      createClientEnvironment: getClientEnvironment,
      createServerEnvironment: createServerEnvironmentFromCtx,
      fallback: <PageBundlePlaceholder />,
      ...opts,
    },
  )
}
