import React from 'react'
import { Provider } from 'react-redux'
import { createHashHistory } from 'history'
import AdminDashboard from './AdminDashboard'
import { dataProvider } from './api'
import authProvider from '../services/AuthProvider'
import createAdminStore from './createAdminStore'

function getAdminConsoleProps() {
  // Note: this will crash on the server. Only works in the browser
  const w = window as any
  if (w?.adminConsole) return w?.adminConsole

  const history = createHashHistory()

  const store = createAdminStore({
    authProvider,
    dataProvider,
    history,
  })

  w.adminConsole = { history, store }

  return { store, history }
}

export default function AdminConsole() {
  const { store, history } = getAdminConsoleProps()
  return (
    <Provider store={store}>
      <AdminDashboard authProvider={authProvider} dataProvider={dataProvider} history={history} />
    </Provider>
  )
}
