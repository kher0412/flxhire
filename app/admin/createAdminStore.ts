// FROM: https://marmelab.com/react-admin/doc/2.9/CustomApp.html

import { applyMiddleware, combineReducers, compose, createStore } from 'redux'
import { routerMiddleware, connectRouter } from 'connected-react-router'
import createSagaMiddleware from 'redux-saga'
import { all, fork } from 'redux-saga/effects'
import {
  adminReducer,
  adminSaga,
  USER_LOGOUT,
} from 'react-admin'

function addDevtools() {
  const w = window as any
  return typeof w !== 'undefined' && w.__REDUX_DEVTOOLS_EXTENSION__ ?
    w.__REDUX_DEVTOOLS_EXTENSION__() :
    f => f
}

const createAdminStore =  ({
  authProvider,
  dataProvider,
  history,
}) => {
  const reducer = combineReducers({
    admin: adminReducer,
    router: connectRouter(history),
    // add your own reducers here
  })
  const resettableAppReducer = (state, action) => reducer(action.type !== USER_LOGOUT ? state : undefined, action)

  const saga = function* rootSaga() {
    yield all(
      [
        adminSaga(dataProvider, authProvider),
        // add your own sagas here
      ].map(fork),
    )
  }
  const sagaMiddleware = createSagaMiddleware()

  const store = createStore(
    resettableAppReducer,
    { /* set your initial state here */ },
    compose(
      applyMiddleware(
        sagaMiddleware,
        routerMiddleware(history),
        // add your own middlewares here
      ),
      addDevtools(),
      // add your own enhancers here
    ),
  )
  sagaMiddleware.run(saga)
  return store
}

export default createAdminStore
