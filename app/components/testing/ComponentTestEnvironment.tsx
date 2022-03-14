import { memo, ComponentProps, useMemo, useEffect } from 'react'
import { MockPayloadGenerator } from 'relay-test-utils'
import { Provider } from 'react-redux'
import { Router } from 'next/router'
import { RouterContext } from 'next/dist/shared/lib/router-context'
import { createMinimalStore } from 'Store'
import { RootState } from 'reducers'
import { useOnMount } from 'hooks'
import { MemoryRouter } from 'next-router-mock'
import Suspense from '../Suspense'
import ComponentEnvironment from '../ComponentEnvironment'

declare global {
  interface Window {
    Cypress: any;
    store: any;
  }
}

interface IComponentTestEnvironmentProps extends ComponentProps<typeof ComponentEnvironment> {
  relayEnvironment?: any
  withSuspense?: boolean
  withRedux?: boolean | Partial<RootState>

  /**
   * When set, overrides the nextjs RouterContext with the provided router.
   * The provided router will replace the native nextjs router for useRouter and withRouter calls.
   */
  withRouter?: Router | MemoryRouter

  /**
   * When set to a truthy value (literal true, object, or function), automatically resolve every query with generated mock data.
   * When set to an object, use that object as a custom mock resolver.
   * When set to a function, use that function to return a custom mock resolver for the current operation.
   */
  autoResolve?: boolean | { [key: string]: (context?: any) => any } | ((operation?: any) => { [key: string]: (context?: any) => any })
}

const ComponentTestEnvironment = memo(({ children, withSuspense = false, withRedux = false, withRouter = null, autoResolve = false, relayEnvironment, ...props }: IComponentTestEnvironmentProps) => {
  let store = useMemo(() => withRedux ? createMinimalStore(typeof withRedux === 'object' ? withRedux : undefined) : null, [!!withRedux])
  let content = children

  useOnMount(() => {
    let doneIndex = 0
    let autoResolveInterval = 0

    if (autoResolve) {
      doneIndex = 0
      autoResolveInterval = window.setInterval(() => {
        let operations = relayEnvironment.mock.getAllOperations()

        for (let i = doneIndex; i < operations.length; i++) {
          try {
            relayEnvironment.mock.resolve(operations[i], relayEnvironment.mock.resolveMostRecentOperation((operation) => {
              switch (typeof autoResolve) {
                case 'function':
                  return MockPayloadGenerator.generate(operation, autoResolve(operation))

                case 'object':
                  return MockPayloadGenerator.generate(operation, autoResolve)

                default:
                  // assume 'boolean'
                  return MockPayloadGenerator.generate(operation)
              }
            }))

            doneIndex = i
          } catch (err) {
            break
          }
        }
      }, 25)
    }

    return () => {
      if (autoResolve) {
        window.clearInterval(autoResolveInterval)
      }
    }
  })

  if (withSuspense) {
    content = (
      <Suspense>
        {content}
      </Suspense>
    )
  }

  if (store) {
    content = (
      <Provider store={store}>
        {content}
      </Provider>
    )
  }

  if (window.Cypress) {
    window.store = store
  }

  if (withRouter) {
    content = (
      <RouterContext.Provider value={withRouter}>
        {content}
      </RouterContext.Provider>
    )
  }

  return (
    <ComponentEnvironment relayEnvironment={relayEnvironment} {...props}>
      {content}
    </ComponentEnvironment>
  )
})

export default ComponentTestEnvironment
