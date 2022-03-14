import fetchMultipart from 'fetch-multipart-graphql'
import createRelaySubscriptionHandler from 'graphql-ruby-client/subscriptions/createRelaySubscriptionHandler'
import { Environment, Network, RecordSource, RequestParameters, Store, Variables, Observable, SubscribeFunction } from 'relay-runtime'
import { trackError } from 'services/analytics'
import { isCypress } from 'services/browserAgent'
import { isPrerendering } from 'services/prerender'
import { getWebsocketBaseURL } from 'services/websockets'
import { getGraphQLBaseURL } from '..'
import { loadSavedRecords, startPeriodicSaving } from './recordSource'

function createSubscriptionHandler(): SubscribeFunction {
  // NOTE: do not move actioncable import to an "import" statement:
  // that will make Next.js crash server side.
  // See: https://github.com/rails/rails/pull/39543
  // eslint-disable-next-line global-require
  const ActionCable = require('@rails/actioncable')
  const consumer = ActionCable.createConsumer(getWebsocketBaseURL())
  return createRelaySubscriptionHandler({
    cable: consumer,
  })
}

function clientFetchFunction(params: RequestParameters, variables: Variables) {
  return Observable.create((sink) => {
    fetchMultipart(getGraphQLBaseURL(), {
      method: 'POST',
      headers: {
        'content-type': 'application/json',
      },
      body: JSON.stringify({
        query: params.text,
        variables,
      }),
      credentials: 'include', // https://github.com/developit/unfetch#fetchurl-string-options-object
      onNext: (parts: any) => sink.next(parts),
      onError: (err: any) => sink.error(err),
      onComplete: () => sink.complete(),
    })
  })
}

export function createClientNetwork() {
  return Network.create(clientFetchFunction, createSubscriptionHandler())
}

export function enablePersistence() {
  // On cypress, we turn off persistence to make sure it does not interfere with tests
  return !isCypress()
}

export function getClientEnvironment(): Environment {
  if (isPrerendering()) return null

  const w = window as any
  if (w.relayEnvironment) return w.relayEnvironment as Environment

  let recordSource

  if (enablePersistence()) {
    const loadedData = loadSavedRecords()
    recordSource = new RecordSource(loadedData?.records)

    if (loadedData?.records) {
      // For some reason Relay just ignores the records we pass to the RecordSource constructor
      const dirtyRecordSource = recordSource as any
      dirtyRecordSource._records = loadedData?.records
    }

    startPeriodicSaving(recordSource)
  } else {
    recordSource = new RecordSource()
  }

  w.relayEnvironment = new Environment({
    network: createClientNetwork(),
    store: new Store(recordSource, {
      gcReleaseBufferSize: 50, // Unneeded query cache to keep in memory
      queryCacheExpirationTime: 24 * 60 * 60 * 1000, // Expiration time in milliseconds for query cache
    }),
  })

  return w.relayEnvironment as Environment
}

export function clearRelayStore() {
  if (!enablePersistence()) return

  try {
    // NOTE: the Relay type definition is wrong but the clear() method is there.
    (getClientEnvironment().getStore().getSource() as any)?.clear()
  } catch (error) {
    trackError(error)
  }
}
