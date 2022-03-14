import { Environment, Network, RecordSource, RequestParameters, Store, Variables } from 'relay-runtime'
import { withHydrateDatetime } from 'relay-nextjs/date'
import { fetchGraphQLRaw } from '..'

export function createServerNetwork(cookie?: string) {
  // TODO: pass the Cookie header here to make authentication work
  return Network.create(async (params: RequestParameters, variables: Variables) => {
    const response = await fetchGraphQLRaw(params.text, variables, cookie)
    const text = await response.text()
    return JSON.parse(text, withHydrateDatetime)
  })
}

export function createServerEnvironment(cookie?: string) {
  return new Environment({
    network: createServerNetwork(cookie),
    store: new Store(new RecordSource()),
    isServer: true,
  })
}
