import { connect, ConnectedProps } from 'react-redux'
import { withRouter } from 'next/router'
import { RootState } from 'reducers'
import { WithRouterProps } from 'next/dist/client/with-router'
import AuthGate from './AuthGate'

const mapStateToProps = (state: RootState) => ({
  user: state.auth.currentUser,
})

const connector = connect(mapStateToProps)

export type ContainerProps = ConnectedProps<typeof connector> & WithRouterProps

export default withRouter(connector(AuthGate))
