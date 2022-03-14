import { Fragment } from 'react'
import { capitalize } from 'lodash'
import { Helmet } from 'react-helmet'
import dynamic from 'next/dynamic'

// Disable SSR for admin console, because it does not work anyway
const AdminConsole = dynamic(() => import(/* webpackChunkName: "AdminConsole" */'admin'), { ssr: false })

function AdminConsoleContainer(props) {
  const environment = capitalize(process.env.FLEXHIRE_ENV || 'development')
  return (
    <Fragment>
      <Helmet>
        <title>{`Admin Console (${environment})`}</title>
      </Helmet>
      <AdminConsole {...props} />
    </Fragment>
  )
}

AdminConsoleContainer.getInitialProps = () => {
  return {
    // Disable app layout when using the admin console
    disableLayout: true,
  }
}

export default AdminConsoleContainer
