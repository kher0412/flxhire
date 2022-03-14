import { withRouter } from 'next/router'
import { connect, ConnectedProps } from 'react-redux'
import { RootState } from 'reducers'
import { WithRouterProps } from 'next/dist/client/with-router'
import Header from './Header'
import { setHeaderVariant } from '../Layout/LayoutDucks'

const mapStateToProps = (state: RootState) => ({
  variant: state.layout.header.variant,
})

const mapDispatchToProps = dispatch => ({
  setVariant: variant => dispatch(setHeaderVariant({ variant })),
})

const connector = connect(mapStateToProps, mapDispatchToProps)

export type ContainerProps = ConnectedProps<typeof connector> & WithRouterProps

export default withRouter(connector(Header))
