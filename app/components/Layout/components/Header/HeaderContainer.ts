import { withRouter } from 'next/router'
import { RootState } from 'reducers'
import { connect, ConnectedProps } from 'react-redux'
import { WithRouterProps } from 'next/dist/client/with-router'
import Header from './Header'

const mapStateToProps = (state: RootState) => ({
  variant: state.layout.header.variant,
  type: state.layout.type,
})

const connector = connect(mapStateToProps)

export type ContainerProps = ConnectedProps<typeof connector> & WithRouterProps

export default withRouter(connector(Header))
