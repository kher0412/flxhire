import { createStore, applyMiddleware, compose } from 'redux'
import { createWrapper } from 'next-redux-wrapper'
import createSagaMiddleware from 'redux-saga'
import { createLogger } from 'redux-logger'
import { trackError } from 'services/analytics'
import { isProduction } from 'services/environment'
import { isPrerendering } from 'services/prerender'
import LogRocket from 'logrocket'
import { omitBy } from 'lodash'
import reducer, { getInitialState, RootState } from './reducers'
import sagas from './sagas'

export function createExtendedStore() {
  // Create Saga middleware
  const sagaMiddleware = createSagaMiddleware({
    onError: (error, { sagaStack }) => trackError(error, { sagaStack }),
  })

  // Prepare extra Middlewares depending on environment
  let extraMiddlewares = []

  if (!isProduction() && !isPrerendering()) {
    extraMiddlewares.push(createLogger({
      collapsed: true,
    }))
  }

  if (process.env.LOGROCKET_APP_ID) {
    extraMiddlewares.push(LogRocket.reduxMiddleware({
      // Make sure we wipe passwords from redux actions and state
      actionSanitizer: (action) => {
        try {
          if (action?.payload) {
            const field = action?.meta?.field
            if (typeof field === 'string' && field.indexOf('password') >= 0) {
              return {
                ...action,
                payload: '(REDACTED)',
              }
            }

            // TODO: here we should probably keep the payload in most cases
            // However, it might be we are dispatching an action to submit a form that contains a password
            // Figure out a way to accurately detect that, or keep this code.
            return {
              ...action,
              payload: '(REDACTED)',
            }
          }
          return action
        } catch (error) {
          console.log(error)
          return null
        }
      },
      stateSanitizer: (state: RootState) => {
        try {
          let form = {}
          Object.keys(state?.form || {}).forEach((formName: string) => {
            if (typeof form[formName]?.values === 'object' && form[formName]?.values) {
              form[formName].values = omitBy(state.form[formName].values, k => typeof k === 'string' && k.indexOf('password') >= 0)
            }
          })
          return {
            ...state,
            form,
          }
        } catch (error) {
          console.log(error)
          return null
        }
      },
    }))
  }

  // Prepare redux store
  const devtool = isPrerendering() ? null : (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
  const composeEnhancers = isProduction() ? compose : (devtool || compose)
  const enhancers = composeEnhancers(applyMiddleware(sagaMiddleware, ...extraMiddlewares))
  const store = createStore(reducer, getInitialState(), enhancers)

  if (!isPrerendering()) {
    const w = window as any
    w.reduxStore = store
    if (w.flexhireAPI) w.flexhireAPI.store = store
    // Start Saga
    const sagaTaskContainer = store as any
    sagaTaskContainer.sagaTask = sagaMiddleware.run(sagas)
  }
  return store
}

export function createMinimalStore(initialState = getInitialState()) {
  return createStore(reducer, initialState)
}

export type ReduxStore = ReturnType<typeof createExtendedStore>

export const nextReduxWrapper = createWrapper(createExtendedStore, { debug: false })
