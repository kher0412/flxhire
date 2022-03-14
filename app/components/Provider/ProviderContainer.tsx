import { connect, ConnectedProps } from 'react-redux'
import { createAction } from 'redux-actions'
import { PROVIDER_AUTH_START } from 'reducers/Auth'
import { withRouter } from 'next/router'
import { WithRouterProps } from 'next/dist/client/with-router'
import { RootState } from 'reducers'
import Provider from './Provider'

const mapStateToProps = (state: RootState) => ({
  user: state.auth.currentUser,
  provider: state.auth.providerInProgress,
  status: state.auth.status,
  error: state.auth.serverError,
})

const mapDispatchToProps = dispatch => ({
  startAuth: (provider: string, userType: string, accessToken: string) => {
    dispatch(createAction(PROVIDER_AUTH_START)({
      provider: provider,
      user_type: userType,
      code: accessToken,
    }))
  },
})

const connector = connect(mapStateToProps, mapDispatchToProps)

export type ContainerProps = ConnectedProps<typeof connector> & WithRouterProps

export default withRouter(connector(Provider))
