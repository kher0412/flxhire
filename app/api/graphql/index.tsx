import { isPrerendering } from 'services/prerender'
import {
  fetchQuery as fetchRelayQuery,
  commitMutation as commitRelayMutation,
  requestSubscription as requestRelaySubscription,
  commitLocalUpdate,
  GraphQLTaggedNode,
  Variables,
} from 'react-relay'
import { GraphQLResponseWithData, GraphQLSubscriptionConfig, MutationConfig, MutationParameters, OperationType } from 'relay-runtime'
import { trackError } from 'services/analytics'
import { isCypress } from 'services/browserAgent'
import { getAPIClient, getBaseURL as getRESTAPIBaseURL } from '../rest'
import { getClientEnvironment, clearRelayStore } from './relay/clientEnvironment'
import { clearSavedRecords } from './relay/recordSource'

export function getGraphQLBaseURL(): string {
  return getRESTAPIBaseURL().replace('/api/v1', '/api/v2')
}

/**
 * This method is only used by Relay to connect to our backend
 * @param query query as string
 * @param variables variables (if any)
 * @param cookie cookie to use for authentication. This won't be automatically set.
 */
export async function fetchGraphQLRaw(query: string, variables: any = {}, cookie?: string) {
  const headers: HeadersInit = {
    'Content-Type': 'application/json',
    Cookie: cookie, // used in SSR
  }
  if (isCypress()) headers.Cypress = 'true'
  const settings: RequestInit = {
    method: 'POST',
    headers,
    credentials: 'include', // https://github.com/developit/unfetch#fetchurl-string-options-object
    body: JSON.stringify({
      query,
      variables,
    }),
  }
  return fetch(getGraphQLBaseURL(), settings)
}

/**
 * Method to execute a GraphQL query outside of the Relay context. Meant to be used in the browser console, where it is
 * exposed as fetchGraphQL.
 * @param query the query to fetch
 * @param variables variables (if any)
 * @param cookie cookie to use for authentication. This won't be automatically set.
 */
export async function fetchGraphQL(query: string, variables: any = {}, cookie?: string) {
  const responseData: GraphQLResponseWithData = await (await fetchGraphQLRaw(query, variables, cookie)).json()
  if (responseData?.errors?.length > 0) {
    throw new Error(responseData?.errors?.[0]?.message)
  }
  return responseData?.data
}

type RelayCacheConfig = Parameters<typeof fetchRelayQuery>[3]

export async function fetchQuery<T extends OperationType>(gql: GraphQLTaggedNode, variables: T['variables'], config: RelayCacheConfig = {}) {
  const environment = getClientEnvironment()
  return fetchRelayQuery<T>(environment, gql, variables, config).toPromise()
}

export async function commitMutation<T extends MutationParameters>(config: Omit<MutationConfig<T>, 'onCompleted' | 'onError'>): Promise<T['response']> {
  const environment = getClientEnvironment()
  return new Promise((resolve, reject) => {
    commitRelayMutation<T>(environment, {
      ...config,
      onCompleted: (response: any, errors) => {
        if (response?.errors?.length > 0) {
          reject(response.errors[0])
        } else if (errors?.length > 0) {
          reject(errors[0])
        } else {
          resolve(response as T['response'])
        }
      },
      onError: (error) => {
        trackError(error)
        reject(error)
      },
    })
  })
}

export async function requestSubscription<T extends OperationType>(options: GraphQLSubscriptionConfig<T>) {
  const environment = getClientEnvironment()
  return requestRelaySubscription(environment, options)
}

export function invalidateRelayStore() {
  const environment = getClientEnvironment()
  // TODO: figure out why invalidateStore is missing from the typescript types
  // Looks like the cause is outdated @types package.
  // Docs: https://relay.dev/docs/api-reference/store/
  // TODO: figure out why invalidateStore seems to not actually trigger a refresh of all the queries
  commitLocalUpdate(environment, store => (store as any).invalidateStore())
}

export function cleanUpRelayEnvironment() {
  invalidateRelayStore()
  clearRelayStore()
  clearSavedRecords()
}

export function init() {
  if (!isPrerendering()) {
    (window as any).fetchGraphQL = fetchGraphQL
  }
}

// These two functions are for compatibility between the two APIs.
// Usage of them is VERY discouraged, only use them as a last resort
// when there is no time to properly update the code to use the new
// graphql API

export async function getRelayID(tableName: string, rawId: number) {
  const response = await getAPIClient().getRelayId(tableName, rawId)
  return response?.id as string
}

export async function getRawId(relayId: string) {
  const response = await getAPIClient().getRawId(relayId)
  return response?.id as number
}
